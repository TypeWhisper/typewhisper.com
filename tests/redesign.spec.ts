import { expect, test } from "@playwright/test";

test.describe("hero dictation demo", () => {
  test.use({ locale: "en-US" });

  test("demo renders and animates through to the inserted state", async ({
    page,
  }) => {
    await page.goto("/en/");

    const demo = page.getByTestId("hero-demo");
    await expect(demo).toBeVisible();

    // The animation keeps the target field untouched until insertion.
    const status = page.getByTestId("hero-demo-status");
    await expect(status).toHaveText(/Listening/);
    await expect(demo).not.toContainText("new design is done");
    await expect(status).toHaveText(/Inserted/, { timeout: 20000 });
    await expect(demo).toContainText("Hi Sarah, the new design is done.");
  });

  test("reduced motion shows the static before/after state", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/");

    const demo = page.getByTestId("hero-demo");
    await expect(demo).toBeVisible();
    await expect(demo.getByText("You say")).toBeVisible();
    await expect(demo.getByText("TypeWhisper types")).toBeVisible();
  });
});

test.describe("new landing sections", () => {
  test.use({ locale: "en-US" });

  test("landing page shows add-on showcase, wall of love, and pricing teaser", async ({
    page,
  }) => {
    await page.goto("/en/");

    await expect(page.getByTestId("addons-showcase")).toBeVisible();

    const addonCards = page
      .getByTestId("addons-showcase")
      .locator('[data-testid="addon-card"]');
    expect(await addonCards.count()).toBeGreaterThanOrEqual(4);

    await expect(page.getByTestId("wall-of-love")).toBeVisible();
    await expect(page.getByTestId("pricing-teaser")).toBeVisible();
    await expect(
      page.getByTestId("pricing-teaser").locator('a[href="/en/pricing"]').first(),
    ).toBeVisible();
  });

  test("German landing page localizes the new sections", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "language", { get: () => "de-DE" });
      Object.defineProperty(navigator, "languages", {
        get: () => ["de-DE", "de"],
      });
    });
    await page.goto("/de/");

    await expect(page.getByTestId("addons-showcase")).toContainText(
      "Ein offenes Ökosystem",
    );
    await expect(page.getByTestId("pricing-teaser")).toContainText(
      "Kostenlos für alle",
    );
  });
});
