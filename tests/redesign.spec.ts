import { expect, test } from "@playwright/test";

test.describe("hero dictation demo", () => {
  test.use({ locale: "en-US" });

  test("demo renders and animates through to the inserted state", async ({
    page,
  }) => {
    await page.goto("/en/");

    const demo = page.getByTestId("hero-demo");
    await expect(demo).toBeVisible();

    // The animation keeps the target field untouched until insertion.
    const status = page.getByTestId("hero-demo-status");
    await expect(status).toHaveText(/Listening/);
    await expect(demo).not.toContainText("new design is done");
    await expect(status).toHaveText(/Inserted/, { timeout: 20000 });
    await expect(demo).toContainText("Hi Sarah, the new design is done.");
  });

  test("reduced motion shows the static before/after state", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/");

    const demo = page.getByTestId("hero-demo");
    await expect(demo).toBeVisible();
    await expect(demo.getByText("You say")).toBeVisible();
    await expect(demo.getByText("TypeWhisper types")).toBeVisible();
  });
});

test.describe("new landing sections", () => {
  test.use({ locale: "en-US" });

  test("landing page shows add-on showcase, wall of love, and pricing teaser", async ({
    page,
  }) => {
    await page.goto("/en/");

    await expect(page.getByTestId("addons-showcase")).toBeVisible();

    const addonCards = page
      .getByTestId("addons-showcase")
      .locator('[data-testid="addon-card"]');
    expect(await addonCards.count()).toBeGreaterThanOrEqual(4);

    await expect(page.getByTestId("wall-of-love")).toBeVisible();
    await expect(page.getByTestId("premium-features")).toContainText(
      "iCloud sync",
    );
    await expect(page.getByTestId("pricing-teaser")).toBeVisible();
    await expect(
      page.getByTestId("pricing-teaser").locator('a[href="/en/pricing"]').first(),
    ).toBeVisible();
  });

  test("German landing page localizes the new sections", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "language", { get: () => "de-DE" });
      Object.defineProperty(navigator, "languages", {
        get: () => ["de-DE", "de"],
      });
    });
    await page.goto("/de/");

    await expect(page.getByTestId("addons-showcase")).toContainText(
      "Ein offenes Ökosystem",
    );
    await expect(page.getByTestId("premium-features")).toContainText(
      "iCloud-Sync",
    );
    await expect(page.getByTestId("pricing-teaser")).toContainText(
      "Kostenloser Core",
    );
  });
});

test.describe("localized landing video", () => {
  test("German landing page switches to the setup video with the Windows tab", async ({
    page,
  }) => {
    const youtubeRequests: string[] = [];
    page.on("request", (request) => {
      if (/youtube|googlevideo|ytimg/i.test(request.url())) {
        youtubeRequests.push(request.url());
      }
    });

    await page.goto("/de/");

    const section = page.getByTestId("how-it-works");
    const video = page.getByTestId("how-it-works-video");

    await video.scrollIntoViewIfNeeded();
    await expect(section).toContainText("Sieh es in Aktion");
    await expect(video.locator("source")).toHaveAttribute(
      "src",
      "/demo-de.mp4",
    );
    await expect(video.locator("track")).toHaveCount(0);

    await page.getByTestId("landing-hero-tab-windows").click();

    await expect(section).toContainText(
      "TypeWhisper unter Windows einrichten",
    );
    await expect(video).toHaveAttribute(
      "poster",
      "/windows-first-setup-de.webp",
    );
    await expect(video).toHaveAttribute("preload", "metadata");
    await expect(video.locator("source")).toHaveAttribute(
      "src",
      "/windows-first-setup-de.mp4",
    );
    await expect(video.locator('track[kind="captions"]')).toHaveAttribute(
      "src",
      "/windows-first-setup-de.vtt",
    );

    const duration = await video.evaluate((element) => {
      const media = element as HTMLVideoElement;
      if (media.readyState >= HTMLMediaElement.HAVE_METADATA) {
        return media.duration;
      }

      return new Promise<number>((resolve, reject) => {
        media.addEventListener("loadedmetadata", () => resolve(media.duration), {
          once: true,
        });
        media.addEventListener(
          "error",
          () => reject(new Error(media.error?.message || "Media load failed")),
          {
            once: true,
          },
        );
      });
    });

    expect(duration).toBeCloseTo(101.038, 1);
    expect(youtubeRequests).toEqual([]);
  });

  test("German landing page selects the setup video for Windows visitors", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "userAgent", {
        get: () =>
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      });
    });
    await page.goto("/de/");

    const video = page.getByTestId("how-it-works-video");
    await video.scrollIntoViewIfNeeded();

    await expect(page.getByTestId("landing-hero-tab-windows")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(video.locator("source")).toHaveAttribute(
      "src",
      "/windows-first-setup-de.mp4",
    );
  });

  test("English landing page keeps the existing English demo", async ({
    page,
  }) => {
    await page.goto("/en/");

    const video = page.getByTestId("how-it-works-video");
    await video.scrollIntoViewIfNeeded();
    await page.getByTestId("landing-hero-tab-windows").click();

    await expect(video).toHaveAttribute("poster", "/og-image.png");
    await expect(video.locator("source")).toHaveAttribute(
      "src",
      "/demo-en.mp4",
    );
    await expect(video.locator("track")).toHaveCount(0);
    await expect(
      page.locator('source[src="/windows-first-setup-de.mp4"]'),
    ).toHaveCount(0);
  });

  test("German video stays within the mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "userAgent", {
        get: () =>
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      });
    });
    await page.goto("/de/");

    const video = page.getByTestId("how-it-works-video");
    await video.scrollIntoViewIfNeeded();
    await expect(video.locator("source")).toHaveAttribute(
      "src",
      "/windows-first-setup-de.mp4",
    );

    const bounds = await video.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  });
});
