import { expect, test } from "@playwright/test";

const optInUrl = "https://play.google.com/apps/testing/com.typewhisper.android";
const storeUrl = {
  en: "https://play.google.com/store/apps/details?id=com.typewhisper.android&hl=en",
  de: "https://play.google.com/store/apps/details?id=com.typewhisper.android&hl=de",
} as const;

const copy = {
  en: {
    title: "TypeWhisper for Android",
    deleteTitle: "Delete your TypeWhisper account",
    android: "Android",
    deleteLink: "Delete account",
  },
  de: {
    title: "TypeWhisper für Android",
    deleteTitle: "TypeWhisper-Konto löschen",
    android: "Android",
    deleteLink: "Konto löschen",
  },
} as const;

for (const locale of ["en", "de"] as const) {
  test.describe(`${locale} Android page and account deletion`, () => {
    test("the Android page links the Play listing, the guide and the beta program", async ({
      page,
    }) => {
      await page.goto(`/${locale}/android/`);

      await expect(
        page.getByRole("heading", { level: 1, name: copy[locale].title }),
      ).toBeVisible();
      await expect(page.getByTestId("android-play")).toHaveAttribute(
        "href",
        storeUrl[locale],
      );
      await expect(
        page.getByTestId("android-get").locator(`a[href="/${locale}/docs/android/"]`),
      ).toBeVisible();
      await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
      const beta = page.getByTestId("android-beta-program");
      await expect(page.getByTestId("android-beta-optin")).toHaveAttribute(
        "href",
        optInUrl,
      );
      await expect(
        beta.locator('a[href="mailto:hello@typewhisper.com"]'),
      ).toBeVisible();
      await expect(beta.locator('a[href^="https://discord.gg/"]')).toBeVisible();
    });

    test("the account deletion page names the app path and the web page", async ({
      page,
    }) => {
      await page.goto(`/${locale}/delete-account/`);

      await expect(
        page.getByRole("heading", { level: 1, name: copy[locale].deleteTitle }),
      ).toBeVisible();
      const body = page.getByTestId("delete-account");
      await expect(body).toContainText("Premium →");
      await expect(
        body.locator('a[href="https://app.typewhisper.com/account/delete"]'),
      ).toBeVisible();
      await expect(
        body.locator('a[href="mailto:hello@typewhisper.com"]'),
      ).toBeVisible();
      await expect(
        body.locator(`a[href="/${locale}/privacy/"]`),
      ).toBeVisible();
    });

    test("privacy and footer link the deletion page; footer and release status list Android", async ({
      page,
    }) => {
      await page.goto(`/${locale}/privacy/`);
      await expect(page.locator("#android")).toBeVisible();
      await expect(
        page.locator(`.site-prose a[href="/${locale}/delete-account/"]`),
      ).toBeVisible();

      const footer = page.locator("footer");
      await expect(
        footer.getByRole("link", { name: copy[locale].android }),
      ).toHaveAttribute("href", `/${locale}/android/`);
      await expect(
        footer.getByRole("link", { name: copy[locale].deleteLink }),
      ).toHaveAttribute("href", `/${locale}/delete-account/`);

      await page.goto(`/${locale}/release-status/`);
      const status = page.getByTestId("release-status-android");
      await expect(status).toBeVisible();
      await expect(status.locator(`a[href="${storeUrl[locale]}"]`)).toBeVisible();
      await expect(status.locator(`a[href="/${locale}/docs/android/"]`)).toBeVisible();
    });
  });
}

test("the unprefixed URLs forward to a locale", async ({ page }) => {
  await page.goto("/android/");
  await expect(page).toHaveURL(/\/(en|de)\/android\/$/);

  await page.goto("/delete-account/");
  await expect(page).toHaveURL(/\/(en|de)\/delete-account\/$/);
});
