import { expect, test } from "@playwright/test";
import { openFresh, openChapterOne, startFirstLevel } from "./helpers.js";

test("canvas does not trap Tab keyboard navigation", async ({ page }) => {
  await openFresh(page);
  await startFirstLevel(page);
  const canvas = page.locator("#jezzCanvas");
  await canvas.focus();
  await expect(canvas).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(canvas).not.toBeFocused();
});

test("shop tablist exposes actual tabs and selected state", async ({ page }) => {
  await openFresh(page);
  await openChapterOne(page);
  await page.locator("#chapter-1-screen [data-action='shop']").click();
  const tablist = page.getByRole("tablist", { name: "Разделы магазина" });
  await expect(tablist).toBeVisible();
  const tabs = tablist.getByRole("tab");
  await expect(tabs).toHaveCount(5);
  await expect(tabs.filter({ hasText: "Рекомендуем" })).toHaveAttribute("aria-selected", "true");
});

test("visible controls have accessible names", async ({ page }) => {
  await openFresh(page);
  await openChapterOne(page);
  const unnamed = await page.locator("#chapter-1-screen button:visible").evaluateAll((buttons) => buttons
    .filter((button) => !button.getAttribute("aria-label") && !button.textContent.trim())
    .map((button) => button.outerHTML));
  expect(unnamed).toEqual([]);
});
