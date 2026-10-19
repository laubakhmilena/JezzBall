import { expect, test } from "@playwright/test";
import { openFresh, startFirstLevel } from "./helpers.js";

const viewports = [
  [320, 568], [360, 640], [375, 667], [390, 844], [412, 915],
  [768, 1024], [1024, 768], [1366, 768], [1920, 1080], [812, 375]
];

test("required viewport matrix has no document overflow or clipped playfield", async ({ browser }) => {
  test.setTimeout(60_000);
  const failures = [];
  for (const [width, height] of viewports) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    await page.goto(`${process.env.QA_BASE_URL || "http://127.0.0.1:43188"}/?debug`);
    await page.getByRole("button", { name: "Играть", exact: true }).click();
    await page.getByRole("button", { name: "Текущий уровень 1", exact: true }).click();
    await page.waitForTimeout(700);

    const geometry = await page.evaluate(() => {
      const canvas = document.querySelector("#jezzCanvas").getBoundingClientRect();
      const playfield = document.querySelector("#levelPlayfield").getBoundingClientRect();
      return {
        viewport: { width: innerWidth, height: innerHeight },
        document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
        canvas: { left: canvas.left, top: canvas.top, right: canvas.right, bottom: canvas.bottom },
        playfield: { left: playfield.left, top: playfield.top, right: playfield.right, bottom: playfield.bottom }
      };
    });

    if (geometry.document.width > width + 1 || geometry.document.height > height + 1
      || geometry.playfield.left < -1 || geometry.playfield.top < -1
      || geometry.playfield.right > width + 1 || geometry.playfield.bottom > height + 1
      || geometry.canvas.left < -1 || geometry.canvas.top < -1
      || geometry.canvas.right > width + 1 || geometry.canvas.bottom > height + 1) {
      failures.push({ width, height, geometry });
    }
    await context.close();
  }
  expect(failures).toEqual([]);
});

test("restart remains available on 320x568 and low landscape", async ({ page }) => {
  const unavailable = [];
  for (const [width, height] of [[320, 568], [812, 375]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/?debug");
    await page.getByRole("button", { name: "Играть", exact: true }).click();
    await page.getByRole("button", { name: "Текущий уровень 1", exact: true }).click();
    const restart = page.locator("#level-screen [data-action='restart-level']");
    if (!await restart.isVisible()) unavailable.push(`${width}x${height}`);
  }
  expect(unavailable).toEqual([]);
});

test("critical touch controls meet a 44px target at 320x568", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await openFresh(page);
  await startFirstLevel(page);
  const undersized = await page.locator("#level-screen button:visible").evaluateAll((buttons) => buttons
    .map((button) => {
      const rect = button.getBoundingClientRect();
      return { name: button.getAttribute("aria-label") || button.textContent.trim(), width: rect.width, height: rect.height };
    })
    .filter(({ width, height }) => width < 44 || height < 44));
  expect(undersized).toEqual([]);
});

test("menu, chapter, shop and final screen families keep their CTA in required viewports", async ({ page }) => {
  test.setTimeout(60_000);
  const failures = [];
  const sizes = [[320, 568], [812, 375], [1366, 768]];
  const check = async (name, locator, width, height) => {
    const box = await locator.boundingBox();
    if (!box || box.x < -1 || box.y < -1 || box.x + box.width > width + 1 || box.y + box.height > height + 1) {
      failures.push({ name, width, height, box });
    }
  };

  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await openFresh(page);
    await check("main-play", page.locator("#playButton"), width, height);
    await page.locator("#playButton").click();
    await check("chapter-continue", page.locator("#chapter-1-screen [data-action='continue-play']"), width, height);
    await page.locator("#chapter-1-screen [data-action='shop']").click();
    await check("shop-dialog", page.locator("#inventoryModal .inventory-panel"), width, height);
    await page.locator("#inventoryCloseButton").click();
    await page.evaluate(() => window.showScreen("final-screen"));
    await check("final-menu", page.locator("#final-screen [data-action='main-menu']"), width, height);
  }
  expect(failures).toEqual([]);
});
