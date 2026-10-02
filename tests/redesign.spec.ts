import { expect, test } from "@playwright/test";

test.describe("hero waveform headline", () => {
  test.use({ locale: "en-US" });

  test("the waveform hands over to the real headline", async ({ page }) => {
    await page.goto("/en/?platform=mac");
    const hero = page.getByTestId("landing-hero");
    const headline = hero.getByRole("heading", { level: 1 });

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(headline).toHaveAccessibleName(
      "Speak once. Keep writing everywhere.",
    );
    await expect(
      hero.locator("xpath=ancestor::astro-island"),
    ).not.toHaveAttribute("ssr", "");
    await expect(hero.locator("canvas")).toHaveAttribute("aria-hidden", "true");
    await expect(hero).toHaveAttribute("data-wave", "on");
    await expect(hero).toHaveAttribute("data-phase", "done", { timeout: 4000 });
    await expect(headline).toHaveCSS("opacity", "1");
  });

  test("switching the platform plays the sequence again", async ({ page }) => {
    await page.goto("/en/?platform=mac");
    const hero = page.getByTestId("landing-hero");
    const headline = hero.getByRole("heading", { level: 1 });
    await expect(hero).toHaveAttribute("data-phase", "done", { timeout: 4000 });
    await expect(hero.getByRole("button", { name: "Play again" })).toHaveCount(
      0,
    );

    await hero.evaluate((element) => {
      const phases: string[] = [];
      new MutationObserver(() =>
        phases.push(element.getAttribute("data-phase") ?? ""),
      ).observe(element, { attributeFilter: ["data-phase"] });
      Object.assign(window, { __heroPhases: phases });
    });
    const phases = () =>
      page.evaluate(
        () =>
          (window as typeof window & { __heroPhases: string[] }).__heroPhases,
      );
    const resetPhases = () =>
      page.evaluate(() => {
        (
          window as typeof window & { __heroPhases: string[] }
        ).__heroPhases.length = 0;
      });

    // macOS and Windows share the headline: the same text is typed again.
    await page.getByTestId("landing-hero-tab-windows").click();
    await expect(page.getByTestId("landing-hero-download")).toHaveText(
      "Install from Microsoft Store",
    );
    await expect.poll(phases).toContain("listening");
    await expect(hero).toHaveAttribute("data-phase", "done", { timeout: 5000 });
    await expect(headline).toHaveAccessibleName(
      "Speak once. Keep writing everywhere.",
    );
    await expect(headline).toHaveCSS("opacity", "1");

    // iOS has its own headline.
    await resetPhases();
    await page.getByTestId("landing-hero-tab-ios").click();
    await expect(headline).toHaveAccessibleName("Speak. Capture. Keep moving.");
    await expect.poll(phases).toContain("listening");
    await expect(hero).toHaveAttribute("data-phase", "done", { timeout: 5000 });
    await expect(headline).toHaveCSS("opacity", "1");
  });

  test("reduced motion keeps the headline still when the platform changes", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/?platform=mac");
    const hero = page.getByTestId("landing-hero");
    const headline = hero.getByRole("heading", { level: 1 });
    await expect(hero).toHaveAttribute("data-phase", "done");

    await page.getByTestId("landing-hero-tab-windows").click();
    await expect(page.getByTestId("landing-hero-download")).toHaveText(
      "Install from Microsoft Store",
    );
    await expect(hero).toHaveAttribute("data-phase", "done");
    await expect(headline).toHaveCSS("opacity", "1");
  });

  test("reduced motion shows the headline at once", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/?platform=mac");

    const hero = page.getByTestId("landing-hero");
    const headline = hero.getByRole("heading", { level: 1 });
    await expect(headline).toBeVisible();
    await expect(headline).toHaveCSS("opacity", "1");
    await expect(hero).toHaveAttribute("data-phase", "done");
  });

  test("the headline stays readable without the canvas script", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/en/");

    const headline = page.getByRole("heading", { level: 1 });
    await expect(headline).toHaveText(
      /Speak once\.\s*Keep writing everywhere\./,
    );
    await expect(headline).toHaveCSS("opacity", "1");
    await context.close();
  });
});

test.describe("spoken and written examples", () => {
  test.use({ locale: "en-US" });

  test("each example pairs the raw dictation with the finished text", async ({
    page,
  }) => {
    await page.goto("/en/");
    const section = page.getByTestId("spoken-written");

    await expect(section.getByRole("listitem")).toHaveCount(3);
    await expect(section.getByText("You say")).toHaveCount(3);
    await expect(section.getByText("TypeWhisper types")).toHaveCount(3);
    await expect(section).toContainText("Hi Sarah, the new design is done.");
    await expect(section).toContainText("Meeting note");
    // Filler words are marked as removed, everything else stays plain.
    await expect(section.locator("del").first()).toHaveText("um");
    await expect(section.locator("del")).toHaveCount(6);
    await expect(section.locator("xpath=ancestor::astro-island")).toHaveCount(
      0,
    );
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
      "Sync Dictionary & Snippets",
    );
    await expect(page.getByTestId("pricing-teaser")).toBeVisible();
    await expect(
      page
        .getByTestId("pricing-teaser")
        .locator('a[href="/en/pricing"]')
        .first(),
    ).toBeVisible();
  });

  test("landing page explains, links use cases, answers questions, and lists every edition", async ({
    page,
  }) => {
    await page.goto("/en/");

    await expect(page.getByTestId("why-typewhisper")).toContainText(
      "Private by default.",
    );
    await expect(
      page
        .getByTestId("use-cases-teaser")
        .locator('a[href="/en/use-cases/emails"]'),
    ).toBeVisible();

    const faq = page.getByTestId("landing-faq");
    await faq.getByText("Does my voice leave my device?").click();
    await expect(faq.getByText("Not with local engines")).toBeVisible();
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(jsonLd.join("")).toContain('"FAQPage"');

    await expect(
      page.getByTestId("landing-platform-grid").locator("a"),
    ).toHaveCount(3);
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
      "Wörterbuch & Snippets synchronisieren",
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
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "userAgent", {
        get: () => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      });
    });
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
    await expect(page.locator("html")).toHaveAttribute(
      "data-landing-platform",
      "mac",
    );

    await page.getByTestId("landing-hero-tab-windows").click();

    await expect(section).toContainText("TypeWhisper unter Windows einrichten");
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
        media.addEventListener(
          "loadedmetadata",
          () => resolve(media.duration),
          {
            once: true,
          },
        );
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
      "aria-pressed",
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

    await expect(video).toHaveAttribute(
      "poster",
      "/landing/demo-poster-en.jpg",
    );
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

  test("landing page does not overflow the mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/de/");
    await page.getByTestId("landing-platform-grid").scrollIntoViewIfNeeded();

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));

    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
});

test("landing islands hydrate before scroll reveal classes change", async ({
  page,
}) => {
  const browserErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  await page.goto("/de/");
  const premiumFeatures = page.getByTestId("premium-features");
  const premiumIsland = premiumFeatures.locator("xpath=ancestor::astro-island");
  const premiumHead = premiumFeatures.locator(".site-head");

  await premiumFeatures.scrollIntoViewIfNeeded();
  await expect(premiumIsland).not.toHaveAttribute("ssr", "");
  await premiumHead.scrollIntoViewIfNeeded();
  await expect(premiumHead).toHaveClass(/\breveal-visible\b/);
  await expect(premiumHead).not.toHaveClass(/\breveal-hidden\b/);

  expect(browserErrors).toEqual([]);
});

test.describe("feature tour", () => {
  test.use({ locale: "en-US" });

  const centerStep = async (
    page: import("@playwright/test").Page,
    index: number,
  ) => {
    await page
      .getByTestId("feature-tour-step")
      .nth(index)
      .locator(".landing-tour__text")
      .evaluate((element) =>
        element.scrollIntoView({ block: "center", behavior: "instant" }),
      );
  };

  test("the pinned screenshot follows the text in the middle of the viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/?platform=mac");
    const tour = page.getByTestId("feature-tour");
    await tour.scrollIntoViewIfNeeded();
    await expect(
      tour.locator("xpath=ancestor::astro-island"),
    ).not.toHaveAttribute("ssr", "");

    const stage = page.getByTestId("feature-tour-stage");
    const layers = page.getByTestId("feature-tour-layer");
    await expect(stage).toBeVisible();
    await expect(page.getByTestId("feature-tour-step")).toHaveCount(5);
    await expect(layers).toHaveCount(5);

    await centerStep(page, 2);
    await expect(layers.nth(2)).toHaveClass(/\bis-active\b/);
    await expect(layers.nth(2)).toHaveCSS("opacity", "1");
    await expect(layers.nth(2).locator("img")).toHaveAttribute(
      "src",
      "/screenshots/en/mac/workflows.png",
    );
    await expect(layers.nth(2).locator("img")).toHaveAttribute(
      "alt",
      "Settings, Workflows: three active workflows with their triggers",
    );
    await expect(
      page.locator('[data-testid="feature-tour-layer"].is-active'),
    ).toHaveCount(1);
    await expect(
      stage.getByRole("button", { name: "Show screenshot 3" }),
    ).toHaveAttribute("aria-current", "step");

    // The indicator scrolls natively to the chosen step.
    await stage.getByRole("button", { name: "Show screenshot 5" }).click();
    await expect(layers.nth(4)).toHaveClass(/\bis-active\b/);
    await expect(page.getByTestId("feature-tour-step").nth(4)).toBeInViewport();
  });

  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    for (const platform of ["mac", "windows", "ios"]) {
      test(`the pinned ${platform} screenshot fits ${viewport.width}x${viewport.height} below the header`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.goto(`/en/?platform=${platform}`);
        const tour = page.getByTestId("feature-tour");
        await tour.scrollIntoViewIfNeeded();
        await expect(tour).toHaveAttribute("data-platform", platform);

        for (const index of [0, 2, 4]) {
          await centerStep(page, index);
          const layer = page.getByTestId("feature-tour-layer").nth(index);
          await expect(layer).toHaveCSS("opacity", "1");
          const image = await layer.boundingBox();
          const meta = await page.locator(".landing-tour__meta").boundingBox();
          const header = await page.getByTestId("site-header").boundingBox();
          expect(image).not.toBeNull();
          expect(meta).not.toBeNull();
          expect(header).not.toBeNull();
          expect(image!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
          expect(meta!.y + meta!.height).toBeLessThanOrEqual(viewport.height);
          expect(image!.x + image!.width).toBeLessThanOrEqual(viewport.width);

          // The frame has the shape of the capture: the image is not stretched.
          const shot = layer.locator("img");
          const rendered = await shot.boundingBox();
          const proportion = await shot.evaluate(
            (element: HTMLImageElement) =>
              Number(element.getAttribute("width")) /
              Number(element.getAttribute("height")),
          );
          expect(rendered).not.toBeNull();
          expect(
            Math.abs(rendered!.width / rendered!.height / proportion - 1),
          ).toBeLessThan(0.005);
          expect(rendered!.y).toBeGreaterThanOrEqual(
            header!.y + header!.height,
          );
        }
      });
    }
  }

  test("screenshots follow the selected platform", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/?platform=mac");
    await expect(
      page.getByTestId("landing-hero").locator("xpath=ancestor::astro-island"),
    ).not.toHaveAttribute("ssr", "");
    await page.getByTestId("landing-hero-tab-ios").click();

    const tour = page.getByTestId("feature-tour");
    await tour.scrollIntoViewIfNeeded();
    await expect(tour).toHaveAttribute("data-platform", "ios");
    await centerStep(page, 1);
    const layer = page.getByTestId("feature-tour-layer").nth(1);
    await expect(layer).toHaveClass(/\bis-active\b/);
    await expect(layer.locator("img")).toHaveAttribute(
      "src",
      "/screenshots/en/ios/03-keyboard.png",
    );
    await expect(page.getByTestId("features")).toContainText(
      "A voice keyboard for other apps.",
    );
  });

  test("small screens stack text and figure", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/?platform=mac");
    const tour = page.getByTestId("feature-tour");
    await tour.scrollIntoViewIfNeeded();

    await expect(page.getByTestId("feature-tour-stage")).toBeHidden();
    const figures = tour.locator("figure");
    await expect(figures).toHaveCount(5);
    await figures.first().scrollIntoViewIfNeeded();
    await expect(figures.first().locator("img")).toBeVisible();
    await expect(figures.first().locator("figcaption")).toHaveText(
      "Settings, Integrations, Discover: filtered to add-ons that run locally on your Mac",
    );
    // The panned strip starts at its right end: the window closes with the content edge.
    const frame = await figures.first().locator(".landing-shot").boundingBox();
    expect(frame).not.toBeNull();
    expect(Math.abs(frame!.x + frame!.width - 370)).toBeLessThanOrEqual(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
  });

  test("reduced motion shows static pairs instead of the pinned stage", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/?platform=mac");
    const tour = page.getByTestId("feature-tour");
    await tour.scrollIntoViewIfNeeded();

    await expect(page.getByTestId("feature-tour-stage")).toBeHidden();
    await expect(tour.locator("figure").first()).toBeVisible();
  });
});

test.describe("premium section", () => {
  test.use({ locale: "en-US" });

  test("macOS pairs each feature with its own detail window", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/?platform=mac");
    const premium = page.getByTestId("premium-features");
    await premium.scrollIntoViewIfNeeded();
    await expect(
      premium.locator("xpath=ancestor::astro-island"),
    ).not.toHaveAttribute("ssr", "");
    await expect(premium).toHaveAttribute("data-platform", "mac");

    const features = premium.getByTestId("premium-feature");
    await expect(features).toHaveCount(2);
    const expected = [
      {
        title: "Sync Dictionary & Snippets",
        src: "/screenshots/en/mac/premium-sync.png",
        caption:
          "Sync Dictionary & Snippets: Cloud Folder mode with Dropbox as provider, folder, last sync, and devices",
        // Half of the pixel size of the window inside the capture.
        width: 640,
        height: 672,
      },
      {
        title: "Learn from Corrections",
        src: "/screenshots/en/mac/premium-learning.png",
        caption:
          "Learn from Corrections: switched on, with the latest activity and correction examples such as “teh” → “the”",
        width: 580,
        height: 592,
      },
    ];

    for (const [index, feature] of expected.entries()) {
      const row = features.nth(index);
      await row.scrollIntoViewIfNeeded();
      await expect(row.getByRole("heading", { level: 3 })).toHaveText(
        feature.title,
      );
      const image = row.locator("img");
      await expect(image).toHaveAttribute("src", feature.src);
      await expect(image).toHaveAttribute("alt", feature.caption);
      await expect(image).toHaveAttribute("width", /^\d+$/);
      await expect(image).toHaveAttribute("height", /^\d+$/);
      await expect(row.locator("figcaption")).toHaveText(feature.caption);

      // The window keeps its natural size and is never scaled up.
      const frame = await row.locator(".landing-premium__frame").boundingBox();
      expect(frame).not.toBeNull();
      expect(Math.abs(frame!.width - feature.width)).toBeLessThanOrEqual(1);
      expect(Math.abs(frame!.height - feature.height)).toBeLessThanOrEqual(1);
    }

    // The window edges line up with the content: right in the first row, left in the second.
    const first = await features
      .nth(0)
      .locator(".landing-premium__frame")
      .boundingBox();
    const second = await features
      .nth(1)
      .locator(".landing-premium__frame")
      .boundingBox();
    expect(Math.abs(first!.x + first!.width - 1264)).toBeLessThanOrEqual(1);
    expect(Math.abs(second!.x - 176)).toBeLessThanOrEqual(1);
  });

  test("macOS stacks text and window on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/?platform=mac");
    const premium = page.getByTestId("premium-features");
    await premium.scrollIntoViewIfNeeded();
    const row = premium.getByTestId("premium-feature").first();
    await row.scrollIntoViewIfNeeded();

    const text = await row.locator(".landing-premium__text").boundingBox();
    const frame = await row.locator(".landing-premium__frame").boundingBox();
    expect(text).not.toBeNull();
    expect(frame).not.toBeNull();
    expect(frame!.y).toBeGreaterThan(text!.y + text!.height);
    expect(Math.abs(frame!.x - 20)).toBeLessThanOrEqual(1);
    expect(Math.abs(frame!.width - 350)).toBeLessThanOrEqual(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
  });

  test("Windows and iOS keep one screenshot beside both features", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/?platform=windows");
    const premium = page.getByTestId("premium-features");
    await premium.scrollIntoViewIfNeeded();
    await expect(premium).toHaveAttribute("data-platform", "windows");
    await expect(premium.getByTestId("premium-feature")).toHaveCount(0);
    await expect(premium.locator("img")).toHaveCount(1);
    await expect(premium.locator("img")).toHaveAttribute(
      "src",
      "/screenshots/en/windows/premium-active.png",
    );
    await expect(premium.getByRole("heading", { level: 3 })).toHaveCount(2);

    await page.goto("/en/?platform=ios");
    await premium.scrollIntoViewIfNeeded();
    await expect(premium).toHaveAttribute("data-platform", "ios");
    await expect(
      page.getByTestId("ios-premium-visual").locator("img"),
    ).toHaveAttribute("src", "/screenshots/en/ios/06-dictionary.png");
    await expect(premium.locator("img")).toHaveCount(1);
  });
});
