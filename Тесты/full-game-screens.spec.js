import { expect, test } from "@playwright/test";
import { openFresh, openChapterOne, startFirstLevel } from "./helpers.js";

test("all declared screens exist and only one is active", async ({ page }) => {
  await openFresh(page);
  await expect(page.locator(".screen")).toHaveCount(13);
  await expect(page.locator(".screen.is-active")).toHaveCount(1);
  for (const id of ["main-menu", "chapter-1-screen", "chapter-10-screen", "level-screen", "final-screen"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("all ten chapter screens render their complete chapter map and controls", async ({ page }) => {
  await openFresh(page);
  for (let chapter = 1; chapter <= 10; chapter += 1) {
    await page.evaluate((id) => {
      window.JezzBallChapterMap.setCurrentLevel((id - 1) * 10 + 1);
      window.JezzBallChapterMap.openChapter(id);
    }, chapter);
    const screen = page.locator(`#chapter-${chapter}-screen`);
    await expect(screen).toHaveClass(/is-active/);
    await expect(screen.locator(".chapter-card")).toHaveCount(10);
    await expect(screen.locator("[data-action='continue-play']")).toBeVisible();
    await expect(screen.locator("[data-action='shop']")).toBeVisible();
    await expect(screen.locator("[data-action='achievements']")).toBeVisible();
    await expect(page.locator(".screen.is-active")).toHaveCount(1);
  }
});

test("shop dialog has semantics, initial focus, Escape and focus return", async ({ page }) => {
  await openFresh(page);
  await openChapterOne(page);
  const trigger = page.locator("#chapter-1-screen [data-action='shop']");
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Магазин" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(page.locator("#inventoryCloseButton")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("achievements dialog does not duplicate and returns focus", async ({ page }) => {
  await openFresh(page);
  await openChapterOne(page);
  const trigger = page.locator("#chapter-1-screen [data-action='achievements']");

  for (let index = 0; index < 2; index += 1) {
    await trigger.click();
    await expect(page.locator(".achievements-panel")).toHaveCount(1);
    await expect(page.getByRole("dialog", { name: "Достижения" })).toBeVisible();
    await page.getByRole("button", { name: "Закрыть", exact: true }).click();
    await expect(page.locator(".achievements-panel")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test("first-time gameplay exposes the level-specific onboarding hint", async ({ page }) => {
  await openFresh(page);
  await startFirstLevel(page);
  const hint = page.locator(".level-helper-panel");
  await expect(hint).toBeVisible();
  await expect(hint).toContainText("Проведи пальцем вверх или вниз");
});

test("debug-complete progress can open the final screen and return to menu", async ({ page }) => {
  await openFresh(page);
  await page.evaluate(() => {
    window.JezzBallChapterMap.setCurrentLevel(101);
    window.showScreen("final-screen");
  });
  await expect(page.locator("#final-screen")).toHaveClass(/is-active/);
  await expect(page.getByRole("heading", { name: "Врата света пройдены" })).toBeVisible();
  await page.locator("#final-screen [data-action='main-menu']").click();
  await expect(page.locator("#main-menu")).toHaveClass(/is-active/);
});
