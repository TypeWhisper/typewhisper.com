import { defineConfig, devices } from "@playwright/test";

const testPort = process.env.PLAYWRIGHT_PORT ?? "4321";
const testBaseURL = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["html"], ["list"]] : [["list"]],
  use: {
    baseURL: testBaseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npm run dev -- --host 127.0.0.1 --port ${testPort}`,
    env: {
      ASTRO_DEV_BACKGROUND: "0",
    },
    url: testBaseURL,
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
