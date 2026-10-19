import { expect, test } from "@playwright/test";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { openFresh, openChapterOne } from "./helpers.js";

test("local launch has no failed requests, console errors or page errors", async ({ page }) => {
  const failedResponses = [];
  const requestFailures = [];
  const consoleErrors = [];
  const pageErrors = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() });
  });
  page.on("requestfailed", (request) => requestFailures.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await openFresh(page);
  await openChapterOne(page);
  await page.waitForLoadState("networkidle");

  expect(failedResponses).toEqual([]);
  expect(requestFailures).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("game remains usable when Yandex SDK is absent", async ({ page }) => {
  await openFresh(page);
  await openChapterOne(page);
  await expect(page.getByRole("button", { name: "Текущий уровень 1", exact: true })).toBeEnabled();
  await page.locator("#chapter-1-screen [data-action='shop']").click();
  await expect(page.getByText("Реклама недоступна", { exact: true })).toBeVisible();
});

test("index.html can be opened directly from disk", async ({ page }) => {
  const url = pathToFileURL(resolve(import.meta.dirname, "..", "index.html")).href;
  await page.goto(url);
  await expect(page.getByRole("button", { name: "Играть", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Играть", exact: true }).click();
  await expect(page.locator("#chapter-1-screen")).toHaveClass(/is-active/);
});

test("Yandex LoadingAPI and GameplayAPI lifecycle is called", async ({ page }) => {
  await page.addInitScript(() => {
    window.__sdkCalls = { ready: 0, start: 0, stop: 0 };
    window.YaGames = {
      init: async () => ({
        environment: { i18n: { lang: "ru" } },
        features: {
          LoadingAPI: { ready: () => { window.__sdkCalls.ready += 1; } },
          GameplayAPI: {
            start: () => { window.__sdkCalls.start += 1; },
            stop: () => { window.__sdkCalls.stop += 1; }
          }
        },
        getPlayer: async () => ({ getData: async () => ({}), setData: async () => {} }),
        getPayments: async () => ({ getCatalog: async () => [], getPurchases: async () => [] }),
        on: () => {}
      })
    };
  });
  await page.goto("/?debug");
  await expect.poll(() => page.evaluate(() => window.__sdkCalls.ready)).toBe(1);
  await page.getByRole("button", { name: "Играть", exact: true }).click();
  await page.getByRole("button", { name: "Текущий уровень 1", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__sdkCalls.start)).toBeGreaterThan(0);
  await page.locator("#level-screen [data-action='restart-level']").click();
  await expect.poll(() => page.evaluate(() => window.__sdkCalls.stop)).toBeGreaterThan(0);
});
