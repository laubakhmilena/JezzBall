import { createServer } from "node:http";
import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const screenshotRoot = join(root, "assets", "screenshots");
const videoRoot = join(root, "assets", "videos");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ffmpegPath = "C:\\Program Files\\BlueStacks_nxt\\ffmpeg.exe";
const saveKey = "jezzball-progress-v1";
const targetLevel = 10;

mkdirSync(screenshotRoot, { recursive: true });
mkdirSync(videoRoot, { recursive: true });

const wait = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

const getFreePort = () => new Promise((resolvePromise, reject) => {
  const server = createServer();
  server.once("error", reject);
  server.listen(0, "127.0.0.1", () => {
    const port = server.address().port;
    server.close(() => resolvePromise(port));
  });
});

const waitForHttp = async (url, timeoutMs = 15_000) => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The local server or DevTools endpoint is still starting.
    }
    await wait(80);
  }
  throw new Error(`Timed out waiting for ${url}`);
};

class CdpSession {
  constructor(webSocketUrl) {
    this.socket = new WebSocket(webSocketUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.handlers = new Map();
    this.ready = new Promise((resolvePromise, reject) => {
      this.socket.addEventListener("open", resolvePromise, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${message.error.code}: ${message.error.message}`));
        else pending.resolve(message.result || {});
        return;
      }
      const handler = this.handlers.get(message.method);
      if (handler) handler(message.params || {});
    });
  }

  on(method, handler) {
    this.handlers.set(method, handler);
  }

  async send(method, params = {}) {
    await this.ready;
    const id = this.nextId++;
    const result = new Promise((resolvePromise, reject) => {
      this.pending.set(id, { resolve: resolvePromise, reject });
    });
    this.socket.send(JSON.stringify({ id, method, params }));
    return result;
  }

  async close() {
    for (const pending of this.pending.values()) pending.reject(new Error("CDP session closed"));
    this.pending.clear();
    try { this.socket.close(); } catch { /* already closed */ }
  }
}

const makeSave = () => ({
  currentChapter: 1,
  currentLevel: targetLevel,
  selectedLevel: targetLevel,
  coins: 2245,
  lives: 5,
  nextLifeAt: null,
  starsByLevel: {},
  perfectChapters: [],
  chapterChests: {},
  expandedChapters: [1],
  activeAttempt: null,
  unlockedAchievements: [],
  claimedAchievements: [],
  boosters: { fastLine: 2, slowBalls: 2, lineShield: 1, targetEase: 2, penaltyRepair: 1 },
  cosmetics: {}
});

const jsonForScript = (value) => JSON.stringify(JSON.stringify(value));

const openTarget = async (debugBase, gameUrl, width, height, { record = false, mobile = height > width } = {}) => {
  const encodedUrl = encodeURIComponent("about:blank");
  let response = await fetch(`${debugBase}/json/new?${encodedUrl}`, { method: "PUT" });
  if (!response.ok) response = await fetch(`${debugBase}/json/new?${encodedUrl}`);
  if (!response.ok) throw new Error(`Could not create Chrome target: ${response.status}`);
  const target = await response.json();
  const cdp = new CdpSession(target.webSocketDebuggerUrl);
  await cdp.ready;
  const errors = [];
  cdp.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
    errors.push(exceptionDetails?.exception?.description || exceptionDetails?.text || "Runtime exception");
  });
  cdp.on("Log.entryAdded", ({ entry }) => {
    if (entry?.level === "error") errors.push(entry.text || "Console error");
  });
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");
  const isPortrait = height > width;
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
    screenOrientation: { type: isPortrait ? "portraitPrimary" : "landscapePrimary", angle: 0 }
  });
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `(() => { try { localStorage.clear(); sessionStorage.clear(); localStorage.setItem(${JSON.stringify(saveKey)}, ${jsonForScript(makeSave())}); } catch (_) {} })();`
  });

  const frameState = { active: false, directory: null, index: 0, frameCount: 0 };
  if (record) {
    frameState.directory = mkdtempSync(join(tmpdir(), "jezzball-video-"));
    cdp.on("Page.screencastFrame", ({ data, sessionId }) => {
      if (frameState.active) {
        frameState.index += 1;
        const file = join(frameState.directory, `frame-${String(frameState.index).padStart(6, "0")}.jpg`);
        writeFileSync(file, Buffer.from(data, "base64"));
        frameState.frameCount = frameState.index;
      }
      void cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
    });
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 86, maxWidth: width, maxHeight: height, everyNthFrame: 2 });
    frameState.active = true;
  }

  await cdp.send("Page.navigate", { url: gameUrl });
  await waitForCondition(cdp, "document.readyState === 'complete'", 10_000);
  await waitForCondition(cdp, "document.querySelector('#main-menu.is-active')", 10_000);
  return { cdp, errors, frameState, targetId: target.id, width, height };
};

const evaluate = async (cdp, expression) => {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Runtime evaluation failed");
  return result.result?.value;
};

const waitForCondition = async (cdp, expression, timeoutMs = 5_000) => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if (await evaluate(cdp, `Boolean(${expression})`)) return;
    } catch {
      // The document is still navigating.
    }
    await wait(50);
  }
  throw new Error(`Timed out waiting for ${expression}`);
};

const clickSelector = async (cdp, selector) => {
  const clicked = await evaluate(cdp, `(() => { const node = document.querySelector(${JSON.stringify(selector)}); if (!node) return false; node.focus({ preventScroll: true }); node.click(); return true; })()`);
  if (!clicked) throw new Error(`Cannot click ${selector}`);
};

const openLevel = async (cdp) => {
  await clickSelector(cdp, "#playButton");
  await waitForCondition(cdp, "document.querySelector('#chapter-1-screen.is-active')", 5_000);
  await waitForCondition(cdp, `document.querySelector('#chapter-1-screen [data-level=\"${targetLevel}\"]')`, 5_000);
  await clickSelector(cdp, `#chapter-1-screen [data-level=\"${targetLevel}\"]`);
  await waitForCondition(cdp, "document.querySelector('#level-screen.is-active') && document.querySelector('#jezzCanvas')", 5_000);
  await wait(850);
};

const canvasPoint = async (cdp, worldX, worldY) => {
  const box = await evaluate(cdp, "(() => { const r = document.querySelector('#jezzCanvas').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()");
  const scale = Math.min(box.width / 384, box.height / 640);
  return {
    x: box.x + (box.width - 384 * scale) / 2 + worldX * scale,
    y: box.y + (box.height - 640 * scale) / 2 + worldY * scale
  };
};

const drawLine = async (cdp, action) => {
  const start = await canvasPoint(cdp, action.x, action.y);
  const end = await canvasPoint(cdp, action.x + (action.orientation === "horizontal" ? 20 : 0), action.y + (action.orientation === "vertical" ? 20 : 0));
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: start.x, y: start.y });
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: start.x, y: start.y, button: "left", clickCount: 1 });
  for (let step = 1; step <= 8; step += 1) {
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: start.x + (end.x - start.x) * step / 8, y: start.y + (end.y - start.y) * step / 8, button: "left", buttons: 1 });
  }
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: end.x, y: end.y, button: "left", clickCount: 1 });
  await wait(850);
};

const firstAction = { orientation: "horizontal", x: 197, y: 421 };
const secondAction = { orientation: "horizontal", x: 297, y: 173 };

const isLevelComplete = async (cdp) => Boolean(await evaluate(cdp, "document.querySelector('#levelCompletePanel.is-visible')"));

const restartLevel = async (cdp) => {
  await clickSelector(cdp, "button[data-action='restart-level']");
  await waitForCondition(cdp, "document.querySelector('#confirmModal.is-open')", 3_000);
  await clickSelector(cdp, "#confirmAcceptButton");
  await waitForCondition(cdp, "!document.querySelector('#confirmModal.is-open') && document.querySelector('#level-screen.is-active')", 5_000);
  await wait(700);
};

const capturePng = async (cdp, outputPath) => {
  const shot = await cdp.send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
  writeFileSync(outputPath, Buffer.from(shot.data, "base64"));
};

const closeTarget = async ({ cdp, frameState }) => {
  if (frameState.active) {
    frameState.active = false;
    try { await cdp.send("Page.stopScreencast"); } catch { /* target may already be gone */ }
  }
  try { await cdp.send("Page.close"); } catch { /* target may already be gone */ }
  await cdp.close();
};

const createScreenshots = async (debugBase, gameUrl) => {
  const jobs = [
    { prefix: "desktop", width: 1920, height: 1080, mobile: false },
    { prefix: "mobile-portrait", width: 1080, height: 1920, mobile: true },
    { prefix: "mobile-landscape", width: 1920, height: 1080, mobile: true }
  ];
  const results = [];
  for (const job of jobs) {
    const session = await openTarget(debugBase, gameUrl, job.width, job.height, { mobile: job.mobile });
    try {
      await openLevel(session.cdp);
      await drawLine(session.cdp, firstAction);
      const firstName = `${job.prefix}-01-gameplay.png`;
      const secondName = `${job.prefix}-02-progress.png`;
      await capturePng(session.cdp, join(screenshotRoot, firstName));
      await drawLine(session.cdp, secondAction);
      if (await isLevelComplete(session.cdp)) {
        await restartLevel(session.cdp);
        await drawLine(session.cdp, firstAction);
      }
      await wait(1_500);
      await capturePng(session.cdp, join(screenshotRoot, secondName));
      results.push(
        { file: firstName, viewport: { width: job.width, height: job.height }, mobile: job.mobile, errors: session.errors.slice() },
        { file: secondName, viewport: { width: job.width, height: job.height }, mobile: job.mobile, errors: session.errors.slice() }
      );
    } finally {
      await closeTarget(session);
    }
  }
  return results;
};

const encodeMp4 = (frameDirectory, outputPath) => {
  const frameCount = readdirSync(frameDirectory).filter((name) => name.endsWith(".jpg")).length;
  if (frameCount < 10) throw new Error(`Too few video frames: ${frameCount}`);
  const args = [
    "-hide_banner", "-loglevel", "error", "-y", "-framerate", "30",
    "-i", join(frameDirectory, "frame-%06d.jpg"), "-t", "12",
    "-an", "-c:v", "libopenh264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", outputPath
  ];
  const result = spawnSync(ffmpegPath, args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`FFmpeg failed: ${result.stderr || result.stdout}`);
  return { frameCount, bytes: readFileSync(outputPath).byteLength };
};

const createVideo = async (debugBase, gameUrl, name, width, height, mobile) => {
  const session = await openTarget(debugBase, gameUrl, width, height, { record: true, mobile });
  try {
    await openLevel(session.cdp);
    await drawLine(session.cdp, firstAction);
    await wait(700);
    await restartLevel(session.cdp);
    await drawLine(session.cdp, secondAction);
    await wait(1200);
    const outputPath = join(videoRoot, name);
    const encoded = encodeMp4(session.frameState.directory, outputPath);
    return { file: name, viewport: { width, height }, ...encoded, errors: session.errors.slice() };
  } finally {
    const directory = session.frameState.directory;
    await closeTarget(session);
    if (directory) rmSync(directory, { recursive: true, force: true });
  }
};

const main = async () => {
  const serverPort = await getFreePort();
  const debugPort = await getFreePort();
  const gameUrl = `http://127.0.0.1:${serverPort}/?media-capture=1`;
  const debugBase = `http://127.0.0.1:${debugPort}`;
  const server = spawn(process.execPath, ["Тесты/serve.mjs"], { cwd: root, env: { ...process.env, PORT: String(serverPort) }, stdio: "ignore" });
  const profileRoot = mkdtempSync(join(tmpdir(), "jezzball-chrome-profile-"));
  const chrome = spawn(chromePath, [
    "--headless=new", "--disable-gpu", "--disable-dev-shm-usage", "--hide-scrollbars", "--mute-audio",
    "--no-sandbox", "--remote-allow-origins=*", `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profileRoot}`, "--window-size=1920,1920", "about:blank"
  ], { stdio: "ignore" });
  try {
    await waitForHttp(`http://127.0.0.1:${serverPort}/`);
    await waitForHttp(`${debugBase}/json/version`);
    const screenshots = await createScreenshots(debugBase, gameUrl);
    const videos = [
      await createVideo(debugBase, gameUrl, "desktop-demo.mp4", 1280, 720, false),
      await createVideo(debugBase, gameUrl, "mobile-demo.mp4", 720, 1280, true)
    ];
    const result = { generatedAt: new Date().toISOString(), screenshots, videos };
    writeFileSync(join(videoRoot, "generation-results.json"), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
  } finally {
    chrome.kill();
    server.kill();
    await wait(250);
    try { rmSync(profileRoot, { recursive: true, force: true }); } catch (error) {
      console.warn(`Temporary Chrome profile was left for cleanup: ${error.message}`);
    }
  }
};

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
