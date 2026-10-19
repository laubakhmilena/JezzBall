import { expect, test } from "@playwright/test";
import { captureWithVerticalLine, openFresh, SAVE_KEY, startFirstLevel } from "./helpers.js";

test("active attempt is restored after reload without consuming another life", async ({ page }) => {
  await openFresh(page);
  const livesBeforeStart = await page.evaluate(() => window.JezzBallChapterMap.state.lives);
  expect(livesBeforeStart).toBe(5);

  await startFirstLevel(page);
  const livesAfterStart = await page.evaluate(() => window.JezzBallChapterMap.state.lives);
  expect(livesAfterStart).toBe(livesBeforeStart - 1);
  expect(livesAfterStart).toBe(4);
  await expect.poll(() => page.evaluate((key) => {
    try {
      return JSON.parse(window.localStorage.getItem(key) || "null")?.activeAttempt?.lifeSpent === true;
    } catch (_error) {
      return false;
    }
  }, SAVE_KEY)).toBe(true);

  await captureWithVerticalLine(page, 0.3);

  const captured = await page.locator("#capturePercent").textContent();
  const lives = await page.locator("#level-screen [data-resource='lives']").textContent();
  expect(captured).not.toBe("0%");
  expect(lives.trim()).toBe("4");
  expect(await page.evaluate(() => window.JezzBallChapterMap.state.lives)).toBe(4);

  await page.reload();

  await expect(page.locator(".screen.is-active")).toHaveCount(1);
  await expect(page.locator("#level-screen")).toHaveClass(/is-active/);
  await expect(page.locator("#main-menu")).not.toHaveClass(/is-active/);
  await expect(page.locator("#main-menu")).toBeHidden();
  await expect(page.locator("#capturePercent")).toHaveText(captured.trim());
  await expect(page.locator("#level-screen [data-resource='lives']")).toHaveText(lives.trim());
  expect(await page.evaluate(() => window.JezzBallChapterMap.state.lives)).toBe(4);
  await expect(page.locator("#level-screen [data-resource='lives']")).toHaveText("4");
});

test("corrupt save does not crash the game", async ({ page }) => {
  await page.addInitScript(({ key }) => localStorage.setItem(key, "{not-json"), { key: SAVE_KEY });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto("/?debug");
  await expect(page.getByRole("button", { name: "Играть", exact: true })).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test("out-of-range and negative save values are normalized", async ({ page }) => {
  await page.addInitScript(({ key }) => localStorage.setItem(key, JSON.stringify({
    currentChapter: 99,
    currentLevel: 999,
    selectedLevel: -20,
    coins: -500,
    lives: 999,
    starsByLevel: { 0: 3, 1: 9, 101: 2 }
  })), { key: SAVE_KEY });
  await page.goto("/?debug");
  await page.getByRole("button", { name: "Играть", exact: true }).click();
  await expect(page.locator(".screen.is-active [data-resource='coins']")).toHaveText("0");
  await expect(page.locator(".screen.is-active [data-resource='lives']")).toContainText("5");
  await expect(page.locator("#chapter-10-screen")).toHaveClass(/is-active/);
});

test("completed progress has an explicit confirmation-protected reset control", async ({ page }) => {
  await openFresh(page);
  await page.getByRole("button", { name: "Играть", exact: true }).click();
  await expect(page.getByRole("button", { name: /сброс|очистить прогресс/i })).toBeVisible();
});
