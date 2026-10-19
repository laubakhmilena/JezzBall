import { defineConfig } from "@playwright/test";

const chromePath = process.env.PLAYWRIGHT_CHROME_PATH
  || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const captureFullArtifacts = process.env.QA_FULL_ARTIFACTS === "1";
const baseURL = process.env.QA_BASE_URL || "http://127.0.0.1:43188";
const useExternalServer = process.env.QA_EXTERNAL_SERVER === "1";

export default defineConfig({
  testDir: ".",
  testMatch: /.*\.spec\.js/,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  outputDir: "../QA_тестирование/Артефакты_тестов/test-results",
  reporter: [
    ["list"],
    ["json", { outputFile: "../QA_тестирование/Артефакты_тестов/playwright-results.json" }]
  ],
  use: {
    baseURL,
    headless: true,
    viewport: { width: 1366, height: 768 },
    launchOptions: { executablePath: chromePath },
    screenshot: "only-on-failure",
    trace: captureFullArtifacts ? "retain-on-failure" : "off",
    video: captureFullArtifacts ? "retain-on-failure" : "off"
  },
  webServer: useExternalServer ? undefined : {
    command: "node serve.mjs",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 15_000
  }
});
