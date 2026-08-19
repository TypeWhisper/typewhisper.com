import { expect, test } from "@playwright/test";

test.describe("macOS workflows documentation", () => {
  test("/en/docs/mac/workflows renders the english workflows page", async ({ page }) => {
    await page.goto("/en/docs/mac/workflows");

    await expect(
      page.getByRole("heading", { level: 1, name: "Workflows" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "App-aware Formatting" }),
    ).toBeVisible();
    await expect(
      page.getByText("Obsidian with Auto-Detect"),
    ).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/en/mac/workflows.png"]'),
    ).toBeVisible();
  });

  test("/de/docs/mac/workflows renders the german workflows page", async ({ page }) => {
    await page.goto("/de/docs/mac/workflows");

    await expect(
      page.getByRole("heading", { level: 1, name: "Workflows" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "App-basierte Formatierung" }),
    ).toBeVisible();
    await expect(
      page.getByText("Obsidian mit Auto-Erkennung"),
    ).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/de/mac/workflows.png"]'),
    ).toBeVisible();
  });

  test("legacy macOS profile and rules docs redirect to workflows", async ({ page }) => {
    await page.goto("/en/docs/mac/rules");
    await expect(page).toHaveURL(/\/en\/docs\/mac\/workflows\/?$/);

    await page.goto("/en/docs/mac/profiles");
    await expect(page).toHaveURL(/\/en\/docs\/mac\/workflows\/?$/);

    await page.goto("/de/docs/mac/rules");
    await expect(page).toHaveURL(/\/de\/docs\/mac\/workflows\/?$/);

    await page.goto("/de/docs/mac/profiles");
    await expect(page).toHaveURL(/\/de\/docs\/mac\/workflows\/?$/);
  });

  test("prompt docs link to workflows", async ({ page }) => {
    await page.goto("/en/docs/mac/prompts");
    await expect(page.locator('a[href="/en/docs/mac/workflows"]').first()).toBeVisible();

    await page.goto("/de/docs/mac/prompts");
    await expect(page.locator('a[href="/de/docs/mac/workflows"]').first()).toBeVisible();
  });

  test("macOS docs index links to troubleshooting", async ({ page }) => {
    await page.goto("/en/docs/mac");
    await expect(
      page
        .locator('a[href="/en/docs/mac/troubleshooting"]')
        .filter({ hasText: "Fix common issues" }),
    ).toBeVisible();

    await page.goto("/de/docs/mac");
    await expect(
      page
        .locator('a[href="/de/docs/mac/troubleshooting"]')
        .filter({ hasText: "Löse typische Probleme" }),
    ).toBeVisible();
  });

  test("macOS troubleshooting explains the Live Transcript plugin panel", async ({ page }) => {
    await page.goto("/en/docs/mac/troubleshooting");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Live Transcript window stays on screen",
      }),
    ).toBeVisible();
    await expect(page.getByText("Integrations > Live Transcript")).toBeVisible();
    await expect(page.getByText("disable Auto-open on recording")).toBeVisible();
    await expect(page.getByText("assign a Toggle Shortcut")).toBeVisible();

    await page.goto("/de/docs/mac/troubleshooting");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Live-Transcript-Fenster bleibt auf dem Bildschirm",
      }),
    ).toBeVisible();
    await expect(page.getByText("Integrationen > Live Transcript")).toBeVisible();
    await expect(page.getByText("Auto-open on recording deaktivieren")).toBeVisible();
    await expect(page.getByText("Toggle Shortcut festlegen")).toBeVisible();
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} macOS docs present the 1.6 release`, async ({ page }) => {
      await page.goto(`/${locale}/docs/mac`);
      await expect(
        page.getByText(locale === "de" ? "1.6 Stabil" : "1.6 Stable", {
          exact: true,
        }),
      ).toBeVisible();

      await page.goto(`/${locale}/docs/mac/installation`);
      await expect(
        page.getByRole("heading", { level: 2, name: "macOS 1.6" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          level: 2,
          name: locale === "de" ? "Neu in 1.6" : "What's new in 1.6",
        }),
      ).toBeVisible();
      await expect(page.getByText("Backup & Restore").first()).toBeVisible();
      await expect(
        page.getByText(
          locale === "de"
            ? /Automatischer privater iCloud-Sync bleibt in 1\.6 nicht verfügbar/
            : /Automatic private iCloud sync remains unavailable in 1\.6/,
        ),
      ).toBeVisible();
    });
  }
});
