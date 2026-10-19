import { expect, test } from "@playwright/test";

async function installRewardedSdk(page, mode) {
  await page.addInitScript((rewardMode) => {
    window.__rewardedCalls = 0;
    window.YaGames = {
      init: async () => ({
        environment: { i18n: { lang: "ru" } },
        features: { LoadingAPI: { ready: () => {} }, GameplayAPI: { start: () => {}, stop: () => {} } },
        getPlayer: async () => ({ getData: async () => ({}), setData: async () => {} }),
        getPayments: async () => ({ getCatalog: async () => [], getPurchases: async () => [] }),
        on: () => {},
        adv: {
          showRewardedVideo: ({ callbacks }) => {
            window.__rewardedCalls += 1;
            callbacks.onOpen?.();
            setTimeout(() => {
              if (rewardMode === "error") callbacks.onError?.(new Error("simulated"));
              else {
                callbacks.onRewarded?.();
                if (rewardMode === "duplicate-reward") callbacks.onRewarded?.();
                callbacks.onClose?.();
              }
            }, 40);
          }
        }
      })
    };
  }, mode);
}

async function openRewardedBooster(page) {
  await page.goto("/?debug");
  await page.getByRole("button", { name: "Играть", exact: true }).click();
  await page.locator("#chapter-1-screen [data-action='shop']").click();
  const button = page.locator("[data-inventory-action='watch-ad'][data-ad-id='ad_random_booster']");
  await expect(button).toBeEnabled();
  return button;
}

test("rewarded completion grants exactly one booster", async ({ page }) => {
  await installRewardedSdk(page, "success");
  const button = await openRewardedBooster(page);
  await button.click();
  await expect.poll(() => page.evaluate(() => Object.values(window.JezzBallChapterMap.state.boosters)
    .reduce((sum, value) => sum + value, 0))).toBe(1);
  await expect.poll(() => page.evaluate(() => window.__rewardedCalls)).toBe(1);
});

test("rewarded error grants nothing", async ({ page }) => {
  await installRewardedSdk(page, "error");
  const button = await openRewardedBooster(page);
  await button.click();
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => Object.values(window.JezzBallChapterMap.state.boosters)
    .reduce((sum, value) => sum + value, 0))).toBe(0);
});

test("rapid repeated rewarded CTA cannot open two ads or grant twice", async ({ page }) => {
  await installRewardedSdk(page, "success");
  const button = await openRewardedBooster(page);
  await button.dblclick();
  await page.waitForTimeout(150);
  expect(await page.evaluate(() => window.__rewardedCalls)).toBe(1);
  expect(await page.evaluate(() => Object.values(window.JezzBallChapterMap.state.boosters)
    .reduce((sum, value) => sum + value, 0))).toBe(1);
});

test("rewarded CTA can be used again after the first ad closes", async ({ page }) => {
  await installRewardedSdk(page, "success");
  const button = await openRewardedBooster(page);

  await button.click();
  await expect.poll(() => page.evaluate(() => window.__rewardedCalls)).toBe(1);
  await expect.poll(() => page.evaluate(() => Object.values(window.JezzBallChapterMap.state.boosters)
    .reduce((sum, value) => sum + value, 0))).toBe(1);

  await button.click();
  await expect.poll(() => page.evaluate(() => window.__rewardedCalls)).toBe(2);
  await expect.poll(() => page.evaluate(() => Object.values(window.JezzBallChapterMap.state.boosters)
    .reduce((sum, value) => sum + value, 0))).toBe(2);
});

test("rewarded error releases the in-flight lock", async ({ page }) => {
  await installRewardedSdk(page, "error");
  const button = await openRewardedBooster(page);

  await button.click();
  await expect.poll(() => page.evaluate(() => window.__rewardedCalls)).toBe(1);
  await expect.poll(() => page.evaluate(() => Object.values(window.JezzBallChapterMap.state.boosters)
    .reduce((sum, value) => sum + value, 0))).toBe(0);

  await button.click();
  await expect.poll(() => page.evaluate(() => window.__rewardedCalls)).toBe(2);
  expect(await page.evaluate(() => Object.values(window.JezzBallChapterMap.state.boosters)
    .reduce((sum, value) => sum + value, 0))).toBe(0);
});

test("duplicate rewarded callbacks grant only one booster", async ({ page }) => {
  await installRewardedSdk(page, "duplicate-reward");
  const button = await openRewardedBooster(page);

  await button.click();
  await expect.poll(() => page.evaluate(() => window.__rewardedCalls)).toBe(1);
  await expect.poll(() => page.evaluate(() => Object.values(window.JezzBallChapterMap.state.boosters)
    .reduce((sum, value) => sum + value, 0))).toBe(1);
});
