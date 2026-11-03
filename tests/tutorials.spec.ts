import { expect, test, type Page } from "@playwright/test";

const slug = "translate-selected-text";
const video = "mac-translate-selection";
const titles = {
  en: "Translate selected text with a shortcut",
  de: "Markierten Text per Tastenkürzel übersetzen",
} as const;

test.describe("Tutorials", () => {
  for (const locale of ["en", "de"] as const) {
    test(`${locale} index links to the tutorial with its poster`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/tutorials/`);
      await expect(page.locator("h1")).toHaveCount(1);
      const card = page.getByTestId("tutorial-card").first();
      await expect(card).toHaveAttribute(
        "href",
        `/${locale}/tutorials/${slug}/`,
      );
      await expect(card).toContainText(titles[locale]);
      await expect(card.locator("img")).toHaveAttribute(
        "src",
        `/videos/${video}-${locale}-poster.jpg`,
      );
    });

    test(`${locale} tutorial page plays the video in the page language`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/tutorials/${slug}/`);
      await expect(page.locator("h1")).toHaveText(titles[locale]);

      const wide = page.getByTestId("studio-video");
      await expect(wide).toBeVisible();
      await expect(wide).toHaveAttribute("preload", "none");
      await expect(wide.locator("source")).toHaveAttribute(
        "src",
        `/videos/${video}-${locale}.mp4`,
      );
      await expect(page.getByTestId("studio-video-portrait")).toBeHidden();

      for (const player of [wide, page.getByTestId("studio-video-portrait")]) {
        await expect(player.locator("track")).toHaveAttribute(
          "src",
          `/videos/${video}-${locale}.vtt`,
        );
        await expect(player.locator("track")).toHaveAttribute(
          "srclang",
          locale,
        );
      }

      await expect(
        page.getByTestId("tutorial-steps").locator(".site-steps__item"),
      ).toHaveCount(4);
      await expect(
        page.locator(
          `a[href="/${locale}/docs/mac/workflows/#manual-shortcut"]`,
        ),
      ).toBeVisible();

      const data = JSON.parse(
        (await page
          .locator('script[type="application/ld+json"]')
          .textContent()) ?? "{}",
      );
      expect(data["@type"]).toBe("VideoObject");
      expect(data.inLanguage).toBe(locale);
      expect(data.contentUrl).toBe(
        `https://www.typewhisper.com/videos/${video}-${locale}.mp4`,
      );
    });

    test(`${locale} phone held upright gets the portrait cut`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/${locale}/tutorials/${slug}/`);
      const upright = page.getByTestId("studio-video-portrait");
      await expect(upright).toBeVisible();
      await expect(upright).toHaveAttribute(
        "poster",
        `/videos/${video}-${locale}-portrait-poster.jpg`,
      );
      await expect(upright.locator("source")).toHaveAttribute(
        "src",
        `/videos/${video}-${locale}-portrait.mp4`,
      );
      await expect(page.getByTestId("studio-video")).toBeHidden();
      const box = await upright.boundingBox();
      expect(box!.height).toBeLessThanOrEqual(844);

      await page.setViewportSize({ width: 844, height: 390 });
      const wide = page.getByTestId("studio-video");
      await expect(wide).toBeVisible();
      await expect(upright).toBeHidden();
      const wideBox = await wide.boundingBox();
      expect(wideBox!.height).toBeLessThanOrEqual(390);
    });

    test(`${locale} workflow docs show the video under hotkey workflows`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/mac/workflows/`);
      const section = page.locator("#manual-shortcut");
      await expect(section.getByTestId("studio-video")).toHaveCount(1);
      await expect(
        section.locator(`a[href="/${locale}/tutorials/${slug}/"]`),
      ).toBeVisible();
    });

    test(`${locale} iOS docs show the writing models video under writing services`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/ios/profiles-and-processing/`);
      const section = page.locator("#section-4");
      await expect(section.getByTestId("studio-video")).toHaveCount(1);
      await expect(section.getByTestId("studio-video").locator("source")).toHaveAttribute(
        "src",
        `/videos/ios-compare-local-models-${locale}.mp4`,
      );
      await expect(
        section.locator(`a[href="/${locale}/tutorials/compare-local-writing-models/"]`),
      ).toBeVisible();
      await page.goto(`/${locale}/tutorials/`);
      await expect(
        page.locator(`a[href="/${locale}/tutorials/compare-local-writing-models/"]`).first(),
      ).toBeVisible();
    });

    test(`${locale} header and footer link to the tutorials`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/`);
      await expect(
        page.locator(`footer a[href="/${locale}/tutorials/"]`),
      ).toHaveCount(1);
      await page.setViewportSize({ width: 1440, height: 900 });
      await expect(
        page.locator(`[data-testid="site-header"] nav a[href="/${locale}/tutorials/"]`),
      ).toBeVisible();
    });
  }

  test.describe("turning the phone during playback", () => {
    const path = `/en/tutorials/${slug}/`;
    const upright = "studio-video-portrait";
    const wide = "studio-video";

    const playing = (page: Page, testId: string) =>
      page
        .getByTestId(testId)
        .evaluate((element) => !(element as HTMLVideoElement).paused);
    const time = (page: Page, testId: string) =>
      page
        .getByTestId(testId)
        .evaluate((element) => (element as HTMLVideoElement).currentTime);

    async function startAt(page: Page, testId: string, seconds: number) {
      await page.getByTestId(testId).evaluate(async (element, at) => {
        const video = element as HTMLVideoElement;
        video.preload = "metadata";
        await new Promise<void>((resolve, reject) => {
          video.addEventListener("loadedmetadata", () => resolve(), { once: true });
          video.addEventListener("error", () => reject(video.error), { once: true });
          video.load();
        });
        video.muted = true;
        video.playbackRate = 1.5;
        video.textTracks[0].mode = "showing";
        video.currentTime = at;
        await video.play();
      }, seconds);
    }

    test("continues in the other cut with the same settings", async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      await startAt(page, upright, 5);

      await page.setViewportSize({ width: 844, height: 390 });
      await expect.poll(() => playing(page, wide)).toBe(true);
      expect(await time(page, wide)).toBeGreaterThan(4.9);
      expect(await playing(page, upright)).toBe(false);
      const settings = await page.getByTestId(wide).evaluate((element) => {
        const video = element as HTMLVideoElement;
        return {
          muted: video.muted,
          rate: video.playbackRate,
          captions: video.textTracks[0].mode,
        };
      });
      expect(settings).toEqual({ muted: true, rate: 1.5, captions: "showing" });
    });

    test("turning back before the other cut loads keeps the first one playing", async ({
      page,
    }) => {
      let release = () => {};
      const gate = new Promise<void>((resolve) => (release = resolve));
      let requested = () => {};
      const portraitRequested = new Promise<void>(
        (resolve) => (requested = resolve),
      );
      await page.route("**/*-portrait.mp4", async (route) => {
        requested();
        await gate;
        await route.continue();
      });

      await page.setViewportSize({ width: 844, height: 390 });
      await page.goto(path);
      await startAt(page, wide, 5);

      await page.setViewportSize({ width: 390, height: 844 });
      await expect.poll(() => playing(page, wide)).toBe(false);
      // The portrait file is held at the route, so its metadata is pending.
      await portraitRequested;
      await page.setViewportSize({ width: 844, height: 390 });
      await expect.poll(() => playing(page, wide)).toBe(true);

      // The cancelled handoff must not start the portrait cut once it loads.
      // This listener comes after the one of the handoff, so once it has run,
      // a handoff that was not cancelled would have run too.
      // Wrapped in an object: evaluateHandle would wait for a bare promise.
      const metadata = await page.getByTestId(upright).evaluateHandle(
        (element) => ({
          loaded: new Promise<void>((resolve) =>
            element.addEventListener("loadedmetadata", () => resolve(), {
              once: true,
            }),
          ),
        }),
      );
      release();
      await metadata.evaluate(({ loaded }) => loaded);
      expect(await playing(page, wide)).toBe(true);
      expect(await time(page, wide)).toBeGreaterThan(4.9);
      expect(await playing(page, upright)).toBe(false);
    });
  });

  test("tutorial files are served", async ({ request }) => {
    for (const locale of ["en", "de"]) {
      for (const [file, type] of [
        [`${video}-${locale}.mp4`, "video/mp4"],
        [`${video}-${locale}-portrait.mp4`, "video/mp4"],
        [`${video}-${locale}-poster.jpg`, "image/jpeg"],
        [`${video}-${locale}-portrait-poster.jpg`, "image/jpeg"],
        [`${video}-${locale}.vtt`, "text/vtt"],
      ]) {
        const response = await request.get(`/videos/${file}`);
        expect(response.ok(), file).toBe(true);
        expect(response.headers()["content-type"], file).toContain(type);
      }
    }
  });
});
