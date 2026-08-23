import { defineConfig, devices } from "@playwright/test";

export function parsePlaywrightPort(value: string | undefined): number {
  const configuredValue = value ?? "4321";

  if (!/^\d+$/.test(configuredValue)) {
    throw new Error(
      "PLAYWRIGHT_PORT must be an integer between 1 and 65535.",
    );
  }

  const port = Number(configuredValue);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
      "PLAYWRIGHT_PORT must be an integer between 1 and 65535.",
    );
  }

  return port;
}

const testPort = parsePlaywrightPort(process.env.PLAYWRIGHT_PORT);
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
