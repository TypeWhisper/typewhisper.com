import { expect, test } from "@playwright/test";

/*
 * TypeWhisper 1.8.0 for macOS: the features page describes the Recorder, and
 * the workflows guide describes the Effort picker of workflows and fallbacks.
 */

const copy = {
  en: {
    recorder: "Recorder",
    recorderText: "The Recorder records the microphone, system audio, or both",
    effort: "Effort",
    fallbackEffort: "Provider Default (Medium)",
  },
  de: {
    recorder: "Recorder",
    recorderText: "Der Recorder nimmt das Mikrofon, das Systemaudio oder beides auf",
    effort: "Effort",
    fallbackEffort: "Provider-Standard (Mittel)",
  },
} as const;

for (const locale of ["en", "de"] as const) {
  const text = copy[locale];

  test(`${locale}: the features page describes the Recorder`, async ({ page }) => {
    await page.goto(`/${locale}/docs/mac/features/`);
    const main = page.locator("main");
    await expect(
      main.getByRole("heading", { name: text.recorder, level: 2 }),
    ).toBeVisible();
    await expect(main.locator("#recorder")).toContainText(text.recorderText);
  });

  test(`${locale}: workflows describe the Effort picker`, async ({ page }) => {
    await page.goto(`/${locale}/docs/mac/workflows/`);
    const main = page.locator("main");
    await expect(
      main
        .locator("#creating")
        .getByRole("heading", { name: text.effort, exact: true, level: 3 }),
    ).toHaveCount(1);
    await expect(main.locator("#global-llm-fallbacks")).toContainText(
      text.fallbackEffort,
    );
  });
}
