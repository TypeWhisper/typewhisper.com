import { expect, test } from "@playwright/test";

/*
 * TypeWhisper 1.8 for macOS adds silence stop for toggle dictations, the model
 * switcher in the indicator, local term packs, a configurable Recorder folder
 * with background transcription, LLM usage in History, Always workflow
 * exclusions, workflow effort for OpenAI, and GigaAM in the App Store edition.
 */

const copy = {
  en: {
    features: [
      "Stop after silence",
      "Switch the model from the indicator",
      "Local term packs",
      "Recordings folder",
      "Back-to-back recordings",
    ],
    recorder: "Recorder",
    usage: "When a workflow processed the text with a language model",
    exclusions: "Exclusions only affect the Always step",
    effort: "Effort",
    apiUsage: "LLM usage",
    gigaam: "the Mac App Store edition includes it as a built-in plugin",
  },
  de: {
    features: [
      "Nach Stille beenden",
      "Modell im Indikator wechseln",
      "Lokale Begriff-Pakete",
      "Aufnahmeordner",
      "Aufnahmen direkt nacheinander",
    ],
    recorder: "Recorder",
    usage: "Hat ein Workflow den Text mit einem Sprachmodell bearbeitet",
    exclusions: "Ausschlüsse wirken nur im Schritt Immer",
    effort: "Effort",
    apiUsage: "LLM-Nutzung",
    gigaam: "enthält die Mac-App-Store-Edition es als eingebautes Plugin",
  },
} as const;

for (const locale of ["en", "de"] as const) {
  const text = copy[locale];

  test(`${locale}: the features page describes the 1.8 additions`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/docs/mac/features/`);
    const main = page.locator("main");
    for (const heading of text.features) {
      await expect(main.getByRole("heading", { name: heading, level: 3 })).toBeVisible();
    }
    await expect(
      main.getByRole("heading", { name: text.recorder, level: 2 }),
    ).toBeVisible();
    await expect(main.locator("#local-term-packs ~ div pre").first()).toContainText(
      '"id": "acme-team-terms"',
    );
    await expect(main).toContainText(text.usage);
  });

  test(`${locale}: workflows describe Always exclusions and effort`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/docs/mac/workflows/`);
    const main = page.locator("main");
    await expect(main.locator("#priority")).toContainText(text.exclusions);
    await expect(
      main
        .locator("#creating")
        .getByRole("heading", { name: text.effort, exact: true, level: 3 }),
    ).toHaveCount(1);
  });

  test(`${locale}: the API page lists llm_usage`, async ({ page }) => {
    await page.goto(`/${locale}/docs/mac/api/`);
    const section = page.locator("#history");
    await expect(
      section.getByRole("heading", { name: text.apiUsage, level: 3 }),
    ).toBeVisible();
    await expect(section).toContainText('"output_tokens": 18');
  });

  test(`${locale}: GigaAM names the App Store edition`, async ({ page }) => {
    await page.goto(`/${locale}/addons/gigaam/macos/`);
    await expect(page.locator("main")).toContainText(text.gigaam);
  });
}
