import { expect, test } from "@playwright/test";

const pages = [
  { path: "docs/mac/installation/", section: "#iphone" },
  { path: "docs/ios/", section: "#mac" },
] as const;

test.describe("Studio release video", () => {
  for (const locale of ["en", "de"] as const) {
    for (const { path, section } of pages) {
      test(`${locale} ${path} plays the video in the page language`, async ({
        page,
      }) => {
        await page.goto(`/${locale}/${path}`);
        const video = page.locator(`${section} [data-testid="studio-video"]`);
        await expect(video).toHaveCount(1);
        await expect(video).toHaveAttribute("preload", "none");
        await expect(video).toHaveAttribute(
          "poster",
          `/videos/mac-ios-release-${locale}-poster.jpg`,
        );
        await expect(video.locator("source")).toHaveAttribute(
          "src",
          `/videos/mac-ios-release-${locale}.mp4`,
        );
        await expect(video.locator("track")).toHaveAttribute(
          "src",
          `/videos/mac-ios-release-${locale}.vtt`,
        );
        await expect(video.locator("track")).toHaveAttribute(
          "srclang",
          locale,
        );
      });
    }
  }

  test("video, poster, and captions are served", async ({ request }) => {
    for (const locale of ["en", "de"]) {
      for (const [file, type] of [
        [`mac-ios-release-${locale}.mp4`, "video/mp4"],
        [`mac-ios-release-${locale}-poster.jpg`, "image/jpeg"],
        [`mac-ios-release-${locale}.vtt`, "text/vtt"],
      ]) {
        const response = await request.get(`/videos/${file}`);
        expect(response.ok(), file).toBe(true);
        expect(response.headers()["content-type"], file).toContain(type);
      }
    }
  });

  test("the Mac and iOS pairing sections link to each other", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/installation/");
    await expect(
      page.locator('#iphone a[href="/en/docs/ios/#mac"]'),
    ).toBeVisible();
    await page.goto("/de/docs/ios/");
    await expect(
      page.locator('#mac a[href="/de/docs/mac/installation/#iphone"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Neu in 1.2" }),
    ).toBeVisible();
  });
});
