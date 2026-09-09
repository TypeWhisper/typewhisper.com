import { expect, test } from "@playwright/test";

test("combined filters use the selected platform's capabilities", async ({ page }) => {
  const card = (slug: string) => page.locator(`[data-testid="addon-card"][data-slug="${slug}"]`);

  await page.goto("/en/addons/?platform=windows&category=transcription");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card("gemini")).toBeVisible();
  await expect(card("openrouter")).toBeVisible();
  await expect(card("cohere")).toHaveCount(0);
  await expect(card("fireworks")).toHaveCount(0);
  await expect(card("whisperkit")).toHaveCount(0);

  await page.goto("/en/addons/?platform=windows&category=llm");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card("cohere")).toBeVisible();
  await expect(card("fireworks")).toBeVisible();
  await expect(card("cohere").getByText("Transcription", { exact: true })).toHaveCount(0);
  await expect(card("cohere").getByText("macOS", { exact: true })).toHaveCount(0);

  await page.goto("/de/addons/?platform=mac&category=transcription");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card("cohere")).toBeVisible();
  await expect(card("whisperkit")).toBeVisible();
  await expect(card("cohere").getByText("LLM", { exact: true })).toHaveCount(0);

  await page.goto("/en/addons/?platform=windows&category=tts");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card("openai")).toBeVisible();
  await expect(card("soniox")).toHaveCount(0);
});

test("utility categories remain consistent across platform filters", async ({ page }) => {
  for (const platform of ["all", "mac", "windows"]) {
    await page.goto(`/en/addons/?platform=${platform}&category=utility`);
    for (const slug of ["live-transcript", "webhook"]) {
      const card = page.locator(`[data-testid="addon-card"][data-slug="${slug}"]`);
      await expect(card).toBeVisible();
      await expect(card.getByText("Utility", { exact: true })).toBeVisible();
    }
  }
});
