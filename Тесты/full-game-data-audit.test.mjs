import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "style.css"), "utf8");
const script = readFileSync(join(root, "script.js"), "utf8");
const productionText = `${html}\n${css}\n${script}`;

test("production JavaScript parses", () => {
  execFileSync(process.execPath, ["--check", join(root, "script.js")], { stdio: "pipe" });
});

test("all 100 level identifiers are present exactly once", () => {
  const curated = script.slice(
    script.indexOf("const curatedProgressionLevelConfigs = {"),
    script.indexOf("const LEVEL_CONFIGS = {")
  );
  const early = script.slice(
    script.indexOf("const LEVEL_CONFIGS = {"),
    script.indexOf("const BALL_STARTS = [")
  );
  const ids = [
    ...early.matchAll(/^\s*(\d+):\s*\{/gm),
    ...curated.matchAll(/^\s*(\d+):\s*level\(/gm)
  ].map((match) => Number(match[1]));

  assert.deepEqual([...new Set(ids)].sort((a, b) => a - b), Array.from({ length: 100 }, (_, i) => i + 1));
  assert.equal(ids.length, 100, "level ids must not be duplicated");
});

test("chapter ids and slugs are unique and complete", () => {
  const block = script.slice(script.indexOf("const chapters = ["), script.indexOf("const SUPPORTED_LANGUAGES"));
  const chapters = [...block.matchAll(/\{ id: (\d+), title: "([^"]+)", slug: "([^"]+)"/g)]
    .map((match) => ({ id: Number(match[1]), title: match[2], slug: match[3] }));
  assert.equal(chapters.length, 10);
  assert.equal(new Set(chapters.map(({ id }) => id)).size, 10);
  assert.equal(new Set(chapters.map(({ slug }) => slug)).size, 10);
  assert.ok(chapters.every(({ title, slug }) => title.trim() && slug.trim()));
});

test("every statically referenced game asset exists", () => {
  const references = [...new Set(
    [...productionText.matchAll(/objects\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|svg|webp|mp3|ogg|wav)/g)]
      .map((match) => match[0])
  )];
  const missing = references.filter((asset) => !existsSync(join(root, ...asset.split("/"))));
  assert.ok(references.length >= 36, "runtime asset references were not extracted");
  assert.deepEqual(missing, []);
});

test("asset files are non-empty and use declared image extensions", async () => {
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }));
    return nested.flat();
  }

  const assets = await walk(join(root, "objects"));
  assert.equal(assets.length, 78);
  assert.ok(assets.every((asset) => statSync(asset).size > 0));
  assert.deepEqual([...new Set(assets.map((asset) => extname(asset).toLowerCase()))].sort(), [".jpg", ".png", ".svg"]);
});

test("runtime files remain below the 100 MB package budget", async () => {
  async function size(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    let total = 0;
    for (const entry of entries) {
      if (["node_modules", "qa-artifacts"].includes(entry.name)) continue;
      const path = join(directory, entry.name);
      total += entry.isDirectory() ? await size(path) : statSync(path).size;
    }
    return total;
  }
  const runtimeBytes = await size(join(root, "objects"))
    + ["index.html", "style.css", "script.js", "load-sdk.js"]
      .reduce((total, name) => total + statSync(join(root, name)).size, 0);
  assert.ok(runtimeBytes < 100 * 1024 * 1024);
});

test("local launch does not reference a guaranteed 404 SDK file", () => {
  const sdkSrc = html.match(/<script\s+src="([^"]*sdk\.js)"/i)?.[1];
  assert.ok(sdkSrc, "SDK script reference is expected for the platform build");
  assert.ok(existsSync(resolve(root, sdkSrc.replace(/^\/+/, ""))), `${sdkSrc} must resolve in a direct/local launch`);
});

test("no backup, build or dist artifacts are mixed with source", async () => {
  const names = (await readdir(root)).map((name) => name.toLowerCase());
  assert.deepEqual(names.filter((name) => /^(dist|build|backup|backups)$/.test(name)), []);
});

test("declared localization is Russian-only and the document encoding is explicit", () => {
  assert.match(html, /<html lang="ru">/);
  assert.match(html, /<meta charset="utf-8">/i);
  assert.match(script, /const SUPPORTED_LANGUAGES = \["ru"\]/);
});

test("source does not contain common placeholder copy", () => {
  assert.doesNotMatch(productionText, /\b(?:lorem ipsum|todo text|placeholder text)\b/i);
});
