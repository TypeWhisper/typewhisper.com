import { expect, test } from "@playwright/test";

const guidePages = [
  ["installation", "Installation and first setup", "Installation und erste Einrichtung"],
  ["dictation-and-keyboard", "Dictation and the voice keyboard", "Diktat und Diktier-Tastatur"],
  ["profiles-and-processing", "Profiles, engines, and processing", "Profile, Engines und Verarbeitung"],
  ["files-history-and-inbox", "Files, History, and Capture Inbox", "Dateien, Verlauf und Capture Inbox"],
  ["dictionary-and-snippets", "Dictionary and snippets", "Wörterbuch und Snippets"],
  ["watch-and-shortcuts", "Apple Watch, Shortcuts, widgets, and Action Button", "Apple Watch, Kurzbefehle, Widgets und Aktionstaste"],
  ["privacy-and-premium", "Privacy, cloud providers, and Premium", "Datenschutz, Cloud-Anbieter und Premium"],
  ["troubleshooting", "Troubleshooting iPhone, iPad, keyboard, and Watch", "Fehlerbehebung für iPhone, iPad, Tastatur und Watch"],
] as const;

test.describe("detailed iOS documentation", () => {
  test("overview links every guide and uses current Studio media", async ({ page }) => {
    await page.goto("/en/docs/ios");

    for (const [slug, englishTitle] of guidePages) {
      await expect(
        page.locator(`a[href="/en/docs/ios/${slug}"]`).filter({ hasText: englishTitle }).first(),
      ).toBeVisible();
    }

    await expect(page.locator('source[src="/ios-app-preview-en.mp4"]')).toHaveCount(1);
    await expect(
      page.locator('img[src="/screenshots/en/ios/ipad/03-inbox.webp"]'),
    ).toBeVisible();
    await expect(page.locator('a[href*="testflight.apple.com"]')).toHaveCount(0);
    await expect(page.locator('a[href*="apps.apple.com"]')).toHaveCount(0);
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} guide routes render with the iOS sidebar`, async ({ page }) => {
      for (const [slug, englishTitle, germanTitle] of guidePages) {
        await page.goto(`/${locale}/docs/ios/${slug}`);
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: locale === "de" ? germanTitle : englishTitle,
          }),
        ).toBeVisible();
        await expect(
          page.locator(`nav a[href="/${locale}/docs/ios/${slug}"]`),
        ).toHaveClass(/border-primary/);
      }
    });
  }

  test("keyboard guide explains Full Access and the iOS return flow", async ({ page }) => {
    await page.goto("/en/docs/ios/dictation-and-keyboard");

    await expect(page.getByText("Settings > General > Keyboard > Keyboards > Add New Keyboard")).toBeVisible();
    await expect(page.getByText(/Normal typing works without it/)).toBeVisible();
    await expect(page.getByText(/iOS keyboard extensions cannot capture microphone audio directly/)).toBeVisible();
    await expect(page.getByText(/previous-app link/).first()).toBeVisible();
  });

  test("Inbox, Shortcuts, privacy, and Premium behavior are documented", async ({ page }) => {
    await page.goto("/en/docs/ios/files-history-and-inbox");
    await expect(page.getByText(/Quick Dictations, Apple Watch recordings, calendar drafts/)).toBeVisible();
    await expect(page.locator('img[src="/screenshots/en/ios/ipad/03-inbox.webp"]')).toBeVisible();

    await page.goto("/en/docs/ios/watch-and-shortcuts");
    await expect(page.getByText(/Get Last Transcription returns/)).toBeVisible();
    await expect(page.getByText(/assign that Shortcut to the Action Button/)).toBeVisible();

    await page.goto("/en/docs/ios/privacy-and-premium");
    await expect(page.getByText(/Normal keyboard typing works without Full Access/)).toBeVisible();
    await expect(page.getByText(/History and Inbox text and metadata/)).toBeVisible();
    await expect(page.getByText(/does not pass through the TypeWhisper entitlement service/)).toBeVisible();
  });

  test("iOS docs do not overflow a phone viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/de/docs/ios/dictation-and-keyboard");

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
});
