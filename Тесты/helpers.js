import { expect } from "@playwright/test";

export const SAVE_KEY = "jezzball-progress-v1";

export async function openFresh(page, path = "/?debug") {
  await page.goto(path);
  await expect(page.locator("#main-menu")).toHaveClass(/is-active/);
}

export async function openChapterOne(page) {
  await page.getByRole("button", { name: "Играть", exact: true }).click();
  await expect(page.locator("#chapter-1-screen")).toHaveClass(/is-active/);
}

export async function startFirstLevel(page) {
  await openChapterOne(page);
  await page.getByRole("button", { name: "Текущий уровень 1", exact: true }).click();
  await expect(page.locator("#level-screen")).toHaveClass(/is-active/);
  await expect(page.locator("#jezzCanvas")).toBeVisible();
}

export function percent(text) {
  return Number.parseInt(String(text || "0").replace(/\D/g, ""), 10) || 0;
}

export async function captureWithVerticalLine(page, fraction = 0.3) {
  const canvas = page.locator("#jezzCanvas");
  const before = percent(await page.locator("#capturePercent").textContent());
  const box = await canvas.boundingBox();
  if (!box) throw new Error("Canvas has no bounding box");
  const x = box.x + box.width * fraction;
  const y = box.y + box.height * 0.5;

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x, y - Math.min(120, box.height * 0.22), { steps: 8 });
  await page.mouse.up();

  await expect.poll(async () => percent(await page.locator("#capturePercent").textContent()), {
    timeout: 7_000,
    message: `capture should increase after a vertical line at ${fraction}`
  }).toBeGreaterThan(before);
}
