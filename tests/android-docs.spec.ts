import { expect, test } from "@playwright/test";
import { androidDocSlugs, getAndroidDocPage } from "../src/data/android-docs";

const guidePages = androidDocSlugs.map(
  (slug) =>
    [
      slug,
      getAndroidDocPage("en", slug).title,
      getAndroidDocPage("de", slug).title,
    ] as const,
);

const playUrl = (locale: "en" | "de") =>
  `https://play.google.com/store/apps/details?id=com.typewhisper.android&hl=${locale}`;

test.describe("Android documentation", () => {
  for (const locale of ["en", "de"] as const) {
    test(`${locale} overview links every guide page and Google Play`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/android/`);

      for (const [slug, englishTitle, germanTitle] of guidePages) {
        await expect(
          page
            .locator(`a[href="/${locale}/docs/android/${slug}/"]`)
            .filter({ hasText: locale === "de" ? germanTitle : englishTitle })
            .first(),
        ).toBeVisible();
      }

      await expect(
        page.locator(`a[href="${playUrl(locale)}"]`).first(),
      ).toBeVisible();
      await expect(
        page.locator(`source[src="/android-overview-${locale}.mp4"]`),
      ).toHaveCount(1);
      await expect(
        page.locator(
          'a[href="https://play.google.com/apps/testing/com.typewhisper.android"]',
        ),
      ).toBeVisible();
      await expect(
        page
          .locator(".docs-callout--release")
          .getByText(locale === "de" ? "Stabil" : "Stable", { exact: true }),
      ).toBeVisible();
    });

    test(`${locale} guide pages render in the Android sidebar with their images`, async ({
      page,
    }) => {
      for (const [slug, englishTitle, germanTitle] of guidePages) {
        await page.goto(`/${locale}/docs/android/${slug}/`);
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: locale === "de" ? germanTitle : englishTitle,
          }),
        ).toBeVisible();
        await expect(
          page.locator(`nav a[href="/${locale}/docs/android/${slug}/"]`),
        ).toHaveAttribute("aria-current", "page");
        await expect(page.locator(".docs-callout--release")).toHaveCount(0);

        // Every screenshot of the page exists in this language.
        for (const image of await page
          .locator(`img[src^="/screenshots/${locale}/android/"]`)
          .all()) {
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              image.evaluate(
                (element: HTMLImageElement) => element.naturalWidth,
              ),
            )
            .toBeGreaterThan(0);
        }
      }
    });
  }

  test("the bubble guide names the AccessibilityService API and the disclosure", async ({
    page,
  }) => {
    await page.goto("/en/docs/android/dictation-bubble/");
    await expect(page.getByText(/AccessibilityService/).first()).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/en/android/bubble-disclosure.png"]'),
    ).toBeVisible();
  });

  test("the docs index and search list Android", async ({ page }) => {
    await page.goto("/en/docs/");
    await expect(
      page.locator('a[href="/en/docs/android/"]').first(),
    ).toBeVisible();
    await page.goto("/en/docs/search/?platform=android");
    await expect(
      page.getByRole("button", { name: "Android", pressed: true }),
    ).toBeVisible();
  });

  test("the unprefixed Android guide URL forwards to a locale", async ({
    page,
  }) => {
    await page.goto("/docs/android/");
    await expect(page).toHaveURL(/\/(en|de)\/docs\/android\/$/);
  });
});
