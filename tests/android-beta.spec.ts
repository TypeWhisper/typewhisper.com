import { expect, test } from "@playwright/test";

const groupUrl = "https://groups.google.com/g/typewhisper-android-beta";
const playUrl = "https://play.google.com/apps/testing/com.typewhisper.android";

const copy = {
  en: {
    title: "TypeWhisper for Android",
    deleteTitle: "Delete your TypeWhisper account",
    android: "Android Beta",
    deleteLink: "Delete account",
  },
  de: {
    title: "TypeWhisper für Android",
    deleteTitle: "TypeWhisper-Konto löschen",
    android: "Android-Beta",
    deleteLink: "Konto löschen",
  },
} as const;

for (const locale of ["en", "de"] as const) {
  test.describe(`${locale} Android beta and account deletion`, () => {
    test("the Android page leads through the group to the Play opt-in", async ({
      page,
    }) => {
      await page.goto(`/${locale}/android/`);

      await expect(
        page.getByRole("heading", { level: 1, name: copy[locale].title }),
      ).toBeVisible();
      await expect(page.getByTestId("page-head")).toContainText("Beta");
      await expect(page.getByTestId("android-beta-step1")).toHaveAttribute(
        "href",
        groupUrl,
      );
      await expect(page.getByTestId("android-beta-step2")).toHaveAttribute(
        "href",
        playUrl,
      );
      const notice = page.getByTestId("android-beta-notice");
      await expect(notice).toContainText("14");
      await expect(
        notice.locator('a[href="mailto:hello@typewhisper.com"]'),
      ).toBeVisible();
      await expect(notice.locator('a[href^="https://discord.gg/"]')).toBeVisible();
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

    test("privacy and footer link the deletion page; the beta stays unlisted", async ({
      page,
    }) => {
      await page.goto(`/${locale}/privacy/`);
      await expect(page.locator("#android")).toBeVisible();
      await expect(
        page.locator(`.site-prose a[href="/${locale}/delete-account/"]`),
      ).toBeVisible();

      // The beta page is not linked until the closed test is published (androidBeta.listed).
      const footer = page.locator("footer");
      await expect(
        footer.getByRole("link", { name: copy[locale].android }),
      ).toHaveCount(0);
      await expect(
        footer.getByRole("link", { name: copy[locale].deleteLink }),
      ).toHaveAttribute("href", `/${locale}/delete-account/`);

      await page.goto(`/${locale}/release-status/`);
      await expect(page.getByTestId("release-status-android")).toHaveCount(0);
    });
  });
}

test("the unprefixed URLs forward to a locale", async ({ page }) => {
  await page.goto("/android/");
  await expect(page).toHaveURL(/\/(en|de)\/android\/$/);

  await page.goto("/delete-account/");
  await expect(page).toHaveURL(/\/(en|de)\/delete-account\/$/);
});
