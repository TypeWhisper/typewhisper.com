import { expect, test } from "@playwright/test";
import { readCurrentVersions } from "./helpers/current-versions";

test.describe("macOS workflows documentation", () => {
  test("/en/docs/mac/workflows renders the english workflows page", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/workflows/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Workflows" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "App-aware Formatting" }),
    ).toBeVisible();
    await expect(page.getByText("Obsidian with Auto-Detect")).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/en/mac/workflows.png"]'),
    ).toBeVisible();
  });

  test("/de/docs/mac/workflows renders the german workflows page", async ({
    page,
  }) => {
    await page.goto("/de/docs/mac/workflows/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Workflows" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "App-basierte Formatierung",
      }),
    ).toBeVisible();
    await expect(page.getByText("Obsidian mit Auto-Erkennung")).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/de/mac/workflows.png"]'),
    ).toBeVisible();
  });

  test("legacy macOS profile and rules docs redirect to workflows", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/rules/");
    await expect(page).toHaveURL(/\/en\/docs\/mac\/workflows\/$/);

    await page.goto("/en/docs/mac/profiles/");
    await expect(page).toHaveURL(/\/en\/docs\/mac\/workflows\/$/);

    await page.goto("/de/docs/mac/rules/");
    await expect(page).toHaveURL(/\/de\/docs\/mac\/workflows\/$/);

    await page.goto("/de/docs/mac/profiles/");
    await expect(page).toHaveURL(/\/de\/docs\/mac\/workflows\/$/);
  });

  test("macOS prompt docs redirect to workflows", async ({ page }) => {
    await page.goto("/en/docs/mac/prompts/");
    await expect(page).toHaveURL(/\/en\/docs\/mac\/workflows\/$/);

    await page.goto("/de/docs/mac/prompts/");
    await expect(page).toHaveURL(/\/de\/docs\/mac\/workflows\/$/);
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} workflows page carries the palette quick start and the FAQ`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/workflows/`);

      await expect(
        page.locator("#quick-start").getByRole("heading", {
          level: 2,
          name:
            locale === "de"
              ? "Schnellstart mit der Workflow-Palette"
              : "Quick Start with the Workflow Palette",
        }),
      ).toBeVisible();
      await expect(
        page.locator("#faq").getByRole("heading", { level: 2, name: "FAQ" }),
      ).toBeVisible();
      await expect(page.locator("#faq .docs-terms > li")).toHaveCount(6);

      // Both sections are listed in the table of contents.
      for (const anchor of ["quick-start", "faq"]) {
        await expect(
          page.locator(`.docs-toc a[href="#${anchor}"]`),
        ).toHaveCount(1);
      }
    });
  }

  test("macOS docs index links to troubleshooting", async ({ page }) => {
    await page.goto("/en/docs/mac/");
    await expect(
      page
        .locator('a[href="/en/docs/mac/troubleshooting/"]')
        .filter({ hasText: "Fix common issues" }),
    ).toBeVisible();

    await page.goto("/de/docs/mac/");
    await expect(
      page
        .locator('a[href="/de/docs/mac/troubleshooting/"]')
        .filter({ hasText: "Löse typische Probleme" }),
    ).toBeVisible();
  });

  test("macOS troubleshooting explains the Live Transcript plugin panel", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/troubleshooting/");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Live Transcript window stays on screen",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("Integrations > Live Transcript"),
    ).toBeVisible();
    await expect(
      page.getByText("disable Auto-open on recording"),
    ).toBeVisible();
    await expect(page.getByText("assign a Toggle Shortcut")).toBeVisible();

    await page.goto("/de/docs/mac/troubleshooting/");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Live-Transcript-Fenster bleibt auf dem Bildschirm",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("Integrationen > Live Transcript"),
    ).toBeVisible();
    await expect(
      page.getByText("Automatisch bei Aufnahme öffnen deaktivieren"),
    ).toBeVisible();
    await expect(page.getByText("ein Tastenkürzel festlegen")).toBeVisible();
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} macOS docs present the current release and what is new in 1.7`, async ({
      page,
    }) => {
      // The release line comes from the feed, the highlights are written by hand.
      const { series } = readCurrentVersions().mac;

      await page.goto(`/${locale}/docs/mac/`);
      await expect(
        page.getByText(
          locale === "de" ? `${series} Stabil` : `${series} Stable`,
          { exact: true },
        ),
      ).toBeVisible();

      await page.goto(`/${locale}/docs/mac/installation/`);
      await page
        .locator("summary")
        .filter({
          hasText:
            locale === "de"
              ? "Von einer früheren Version aktualisieren"
              : "Upgrade from an earlier version",
        })
        .click();
      await expect(
        page.getByRole("heading", { level: 2, name: `macOS ${series}` }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          level: 2,
          name: locale === "de" ? "Neu in 1.7" : "What's new in 1.7",
        }),
      ).toBeVisible();
      await expect(
        page
          .getByText(
            locale === "de"
              ? "iCloud-Synchronisierung für Verlauf und Posteingang"
              : "iCloud synchronization for History and Inbox",
          )
          .first(),
      ).toBeVisible();
      await expect(
        page.getByText(
          locale === "de"
            ? /Die automatische iCloud-Synchronisierung ist in 1\.7 verfügbar/
            : /Automatic iCloud Sync is available in 1\.7/,
        ),
      ).toBeVisible();
    });
  }
});
