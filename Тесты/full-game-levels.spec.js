import { expect, test } from "@playwright/test";
import { openFresh } from "./helpers.js";

test("all 100 levels satisfy the data contract and representative geometry audit", async ({ page }) => {
  test.setTimeout(90_000);
  await page.route("**/script.js", async (route) => {
    const response = await route.fetch();
    const source = await response.text();
    const instrumented = source.replace(
      "window.JezzBallChapterMap = {",
      `window.JezzBallChapterMap = {
      levelConfigsForTest() {
        return Array.from({ length: TOTAL_LEVELS }, (_, index) => ({
          level: index + 1,
          ...getLevelConfig(index + 1),
          obstacles: (getLevelConfig(index + 1).obstacles || []).map((obstacle) => ({ ...obstacle }))
        }));
      },`
    );
    await route.fulfill({ response, body: instrumented });
  });
  await openFresh(page);

  const configs = await page.evaluate(() => window.JezzBallChapterMap.levelConfigsForTest());
  expect(configs).toHaveLength(100);
  expect(configs.map(({ level }) => level)).toEqual(Array.from({ length: 100 }, (_, index) => index + 1));
  expect(configs.filter(({ target }) => !Number.isFinite(target) || target < 50 || target > 100)).toEqual([]);
  expect(configs.filter(({ balls }) => !Number.isInteger(balls) || balls < 1 || balls > 4)).toEqual([]);
  expect(configs.filter(({ speed }) => !["slow", "medium", "fast"].includes(speed))).toEqual([]);
  expect(configs.filter(({ purpose }) => typeof purpose !== "string" || !purpose.trim())).toEqual([]);

  const badObstacles = configs.flatMap(({ level, obstacles }) => obstacles
    .filter((obstacle) => {
      if (!["vertical", "horizontal"].includes(obstacle.orientation)) return true;
      if (!["static", "moving"].includes(obstacle.type)) return true;
      if (typeof obstacle.safe !== "boolean" || !obstacle.color) return true;
      const values = obstacle.orientation === "vertical"
        ? [obstacle.x, obstacle.y1, obstacle.y2]
        : [obstacle.y, obstacle.x1, obstacle.x2];
      return values.some((value) => !Number.isFinite(value) || value < 0 || value > 1);
    })
    .map((obstacle) => ({ level, obstacle })));
  expect(badObstacles).toEqual([]);

  const representative = [1, 10, 20, 30, 31, 40, 50, 60, 70, 80, 90, 100];
  const geometry = await page.evaluate((levels) => window.auditJezzBallLevels(levels), representative);
  expect(geometry).toHaveLength(representative.length);
  expect(geometry.filter(({ validStarts }) => validStarts < 1)).toEqual([]);
  expect(geometry.filter(({ verticalStarts, horizontalStarts }) => verticalStarts < 1 || horizontalStarts < 1)).toEqual([]);
});
