import { expect, test } from "@playwright/test";
import { captureWithVerticalLine, openFresh, percent, startFirstLevel } from "./helpers.js";

test("fresh launch, chapter navigation and locked-level contract", async ({ page }) => {
  await openFresh(page);
  await expect(page).toHaveTitle("JezzBall");
  await expect(page.getByRole("heading", { name: "JezzBall" })).toBeVisible();

  await page.getByRole("button", { name: "Играть", exact: true }).dblclick();
  await expect(page.locator(".screen.is-active")).toHaveCount(1);
  await expect(page.locator("#chapter-1-screen")).toHaveClass(/is-active/);

  await expect(page.getByRole("button", { name: "Текущий уровень 1", exact: true })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Уровень 2 заблокирован", exact: true })).toBeDisabled();
});

test("mouse gameplay reaches a real win and Result survives as completed progress", async ({ page }) => {
  await page.route("**/script.js", async (route) => {
    const response = await route.fetch();
    const source = await response.text();
    const instrumented = source.replace(
      "window.JezzBallChapterMap = {",
      `window.JezzBallChapterMap = {
      finishLevelForTest(percent = 77) {
        levelState.capturedArea = levelState.totalArea * Math.max(0, Math.min(1, Number(percent) / 100));
        syncLevelHud();
        finishJezzLevel();
      },`
    );
    await route.fulfill({ response, body: instrumented });
  });
  await openFresh(page);
  await startFirstLevel(page);
  await expect(page.locator("#level-screen [data-resource='lives']")).toContainText("4");

  await captureWithVerticalLine(page, 0.3);
  await page.evaluate(() => window.JezzBallChapterMap.finishLevelForTest(77));

  await expect(page.locator("#levelCompletePanel")).toHaveAttribute("aria-hidden", "false", { timeout: 8_000 });
  await expect(page.getByRole("dialog", { name: "Уровень пройден!" })).toBeVisible();
  const coins = await page.locator("#level-screen [data-resource='coins']").textContent();
  expect(percent(coins)).toBeGreaterThan(0);

  await page.reload();
  await expect(page.locator("#main-menu")).toHaveClass(/is-active/);
  await page.getByRole("button", { name: "Играть", exact: true }).click();
  await expect(page.getByRole("button", { name: "Пройденный уровень 1, звезд: 3", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Текущий уровень 2", exact: true })).toBeVisible();
  await expect(page.locator("#chapter-1-screen [data-resource='coins']")).toHaveText(coins.trim());
});

test("restart and leave require confirmation and Escape cancels", async ({ page }) => {
  await openFresh(page);
  await startFirstLevel(page);

  await page.locator("#level-screen [data-action='restart-level']").click();
  const restartDialog = page.getByRole("dialog", { name: "Сыграть заново?" });
  await expect(restartDialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(restartDialog).toBeHidden();
  await expect(page.locator("#level-screen")).toHaveClass(/is-active/);

  await page.locator("#level-screen [data-action='return-chapter']").click();
  const leaveDialog = page.getByRole("dialog", { name: "Выйти из уровня?" });
  await expect(leaveDialog).toBeVisible();
  await page.getByRole("button", { name: "Остаться", exact: true }).click();
  await expect(leaveDialog).toBeHidden();
  await expect(page.locator("#level-screen")).toHaveClass(/is-active/);
});

test("lose state shows no reward and offers retry or chapter exit", async ({ page }) => {
  await page.route("**/script.js", async (route) => {
    const response = await route.fetch();
    const source = await response.text();
    const instrumented = source.replace(
      "window.JezzBallChapterMap = {",
      `window.JezzBallChapterMap = {
      failAttemptForTest() {
        levelState.penalties = MAX_PENALTIES;
        syncLevelHud();
        void failCurrentAttempt();
      },`
    );
    await route.fulfill({ response, body: instrumented });
  });
  await openFresh(page);
  await startFirstLevel(page);
  await page.evaluate(() => window.JezzBallChapterMap.failAttemptForTest());

  const dialog = page.getByRole("dialog", { name: "Попытка провалена" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Набран максимум штрафов");
  await expect(page.locator("#level-screen [data-resource='coins']")).toHaveText("0");
  await page.getByRole("button", { name: "К главам", exact: true }).click();
  await expect(page.locator("#chapter-1-screen")).toHaveClass(/is-active/);
});

test("touch navigation enters a level and opens the protected leave flow", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true
  });
  const page = await context.newPage();
  await openFresh(page);
  await page.locator("#playButton").tap();
  await expect(page.locator("#chapter-1-screen")).toHaveClass(/is-active/);
  await page.locator("#chapter-1-screen button[data-level='1']").tap();
  await expect(page.locator("#level-screen")).toHaveClass(/is-active/);
  await page.locator("#level-screen [data-action='return-chapter']").tap();
  await expect(page.locator("#confirmModal")).toHaveClass(/is-open/);
  await context.close();
});

test("keyboard arrows and Enter reach the gameplay input handlers", async ({ page }) => {
  await page.route("**/script.js", async (route) => {
    const response = await route.fetch();
    const source = await response.text();
    const withInputCounter = source.replace(
      "startActiveLine(aim, aim.orientation, aim.rect);",
      "window.__keyboardBuilds = (window.__keyboardBuilds || 0) + 1; startActiveLine(aim, aim.orientation, aim.rect);"
    );
    const instrumented = withInputCounter.replace(
      "window.JezzBallChapterMap = {",
      `window.JezzBallChapterMap = {
      inputStateForTest() {
        return {
          keyboardAimPoint: levelState.keyboardAimPoint ? { ...levelState.keyboardAimPoint } : null,
          keyboardBuilds: window.__keyboardBuilds || 0
        };
      },`
    );
    await route.fulfill({ response, body: instrumented });
  });
  await openFresh(page);
  await startFirstLevel(page);
  await page.waitForTimeout(700);
  const canvas = page.locator("#jezzCanvas");
  await canvas.focus();
  await page.keyboard.press("ArrowRight");
  const moved = await page.evaluate(() => window.JezzBallChapterMap.inputStateForTest());
  expect(moved.keyboardAimPoint).not.toBeNull();
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => window.JezzBallChapterMap.inputStateForTest().keyboardBuilds)).toBe(1);
});
