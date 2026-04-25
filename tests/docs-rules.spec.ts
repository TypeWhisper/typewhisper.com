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

  test("windows docs still use profiles", async ({ page }) => {
    await page.goto("/en/docs/windows");
    await expect(
      page.getByRole("link", { name: "Profiles" }).first(),
    ).toBeVisible();

    await page.goto("/de/docs/windows");
    await expect(
      page.getByRole("link", { name: "Profile" }).first(),
    ).toBeVisible();
  });
});
