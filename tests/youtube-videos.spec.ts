import { expect, test } from "@playwright/test";

const translate = { slug: "translate-selected-text", ids: { en: "yne1dhjyxnk", de: "GH42MUwdnu0" } } as const;

test.describe("Studio videos on YouTube", () => {
  for (const locale of ["en", "de"] as const) {
    test(`${locale} public video shows the poster and loads YouTube only on play`, async ({ page }) => {
      await page.clock.setFixedTime(new Date("2026-12-01T12:00:00+01:00"));
      const youtubeRequests: string[] = [];
      await page.route(/youtube(-nocookie)?\.com|ytimg\.com|googlevideo\.com/, (route) => {
        youtubeRequests.push(route.request().url());
        return route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>YouTube</title>" });
      });

      await page.goto(`/${locale}/tutorials/${translate.slug}/`);
      const start = page.getByTestId("youtube-start");
      await expect(start).toBeVisible();
      await expect(start.locator("img")).toHaveAttribute("src", `/videos/mac-translate-selection-${locale}-poster.jpg`);
      await expect(page.getByTestId("studio-video")).toBeHidden();
      await expect(page.locator(".site-video__youtube-note a")).toHaveAttribute("href", new RegExp(`^/${locale}/privacy/?#thirdParty$`));
      expect(youtubeRequests).toEqual([]);

      await start.click();
      const frame = page.locator("iframe.site-video__youtube-frame");
      await expect(frame).toHaveCount(1);
      const src = new URL((await frame.getAttribute("src")) ?? "");
      expect(src.origin).toBe("https://www.youtube-nocookie.com");
      expect(src.pathname).toBe(`/embed/${translate.ids[locale]}`);
      expect(src.searchParams.get("autoplay")).toBe("1");
      expect(src.searchParams.get("hl")).toBe(locale);
      expect(src.searchParams.get("cc_lang_pref")).toBe(locale);
      await expect(frame).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      await expect.poll(() => youtubeRequests.length).toBeGreaterThan(0);
    });
  }

  test("a phone held upright also gets the YouTube player once public", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-12-01T12:00:00+01:00"));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/en/tutorials/${translate.slug}/`);
    await expect(page.getByTestId("youtube-start")).toBeVisible();
    await expect(page.getByTestId("studio-video-portrait")).toBeHidden();
  });

  test("a video scheduled for later keeps the site's own player until then", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-11-12T12:00:00+01:00"));
    await page.goto("/en/tutorials/compare-local-writing-models/");
    await expect(page.getByTestId("studio-video")).toBeVisible();
    await expect(page.getByTestId("youtube-start")).toBeHidden();
  });
});
