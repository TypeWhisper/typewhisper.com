import { expect, test } from "@playwright/test";

test.describe("macOS rules documentation", () => {
  test("/en/docs/mac/rules renders the english rules page", async ({ page }) => {
    await page.goto("/en/docs/mac/rules");

    await expect(
      page.getByRole("heading", { level: 1, name: "Rules" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "App-aware Formatting" }),
    ).toBeVisible();
    await expect(
      page.getByText("Obsidian with Auto-Detect"),
    ).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/en/mac/rules.png"]'),
    ).toBeVisible();
  });

  test("/de/docs/mac/rules renders the german rules page", async ({ page }) => {
    await page.goto("/de/docs/mac/rules");

    await expect(
      page.getByRole("heading", { level: 1, name: "Regeln" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "App-basierte Formatierung" }),
    ).toBeVisible();
    await expect(
      page.getByText("Obsidian mit Auto-Erkennung"),
    ).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/de/mac/rules.png"]'),
    ).toBeVisible();
  });

  test("legacy macOS profile docs redirect to rules", async ({ page }) => {
    await page.goto("/en/docs/mac/profiles");
    await expect(page).toHaveURL(/\/en\/docs\/mac\/rules\/?$/);

    await page.goto("/de/docs/mac/profiles");
    await expect(page).toHaveURL(/\/de\/docs\/mac\/rules\/?$/);
  });

  test("prompt docs link to rules", async ({ page }) => {
    await page.goto("/en/docs/mac/prompts");
    await expect(page.locator('a[href="/en/docs/mac/rules"]').first()).toBeVisible();

    await page.goto("/de/docs/mac/prompts");
    await expect(page.locator('a[href="/de/docs/mac/rules"]').first()).toBeVisible();
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
