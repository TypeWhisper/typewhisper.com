import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const IOS_APP_STORE_URL = "https://apps.apple.com/app/typewhisper/id6759319267";

type GeneratedDownloads = {
  mac: { url: string };
  windows: { url: string };
};

type GeneratedRelease = {
  tag_name: string;
};

function readGeneratedDownloads(): GeneratedDownloads {
  return JSON.parse(
    readFileSync("src/data/downloads.json", "utf8"),
  ) as GeneratedDownloads;
}

function readGeneratedReleases(): GeneratedRelease[] {
  return JSON.parse(
    readFileSync("src/data/releases.json", "utf8"),
  ) as GeneratedRelease[];
}

type LandingScenario = {
  name: string;
  userAgent: string;
  expectedLabel: string;
  expectedHref?: RegExp | string;
  opensNewTab?: boolean;
};

const landingScenarios: LandingScenario[] = [
  {
    name: "macOS",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    expectedLabel: "Download for macOS",
    expectedHref: /TypeWhisper-v\d+\.\d+\.\d+\.dmg$/,
    opensNewTab: false,
  },
  {
    name: "Windows",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    expectedLabel: "Install from Microsoft Store",
    expectedHref:
      "https://apps.microsoft.com/detail/9pf42zcr0jr0?cid=DevShareMCLPCS&hl=en-US&gl=US",
    opensNewTab: true,
  },
  {
    name: "iOS",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1",
    expectedLabel: "Download on the App Store",
    expectedHref: IOS_APP_STORE_URL,
    opensNewTab: true,
  },
];

for (const scenario of landingScenarios) {
  test.describe(`landing download routing (${scenario.name})`, () => {
    test.use({ userAgent: scenario.userAgent });

    test("hero and footer CTA resolve for the detected platform", async ({
      page,
    }) => {
      await page.goto("/en/");

      const heroCta = page.getByTestId("landing-hero-download");
      const footerCta = page.getByTestId("landing-footer-download");

      await expect(heroCta).toBeVisible();
      await expect(footerCta).toBeVisible();
      await expect(heroCta).toHaveText(scenario.expectedLabel);
      await expect(footerCta).toHaveText(scenario.expectedLabel);

      if (!scenario.expectedHref) {
        await expect(heroCta).toBeDisabled();
        await expect(footerCta).toBeDisabled();
        await expect(heroCta).not.toHaveAttribute("href");
        await expect(footerCta).not.toHaveAttribute("href");
        return;
      }

      const expectedHref =
        scenario.name === "macOS"
          ? readGeneratedDownloads().mac.url
          : scenario.expectedHref;
      await expect(heroCta).toHaveAttribute("href", expectedHref);
      await expect(footerCta).toHaveAttribute("href", expectedHref);

      if (scenario.opensNewTab) {
        await expect(heroCta).toHaveAttribute("target", "_blank");
        await expect(footerCta).toHaveAttribute("target", "_blank");
        await expect(heroCta).toHaveAttribute("rel", "noopener noreferrer");
        await expect(footerCta).toHaveAttribute("rel", "noopener noreferrer");
      } else {
        await expect(heroCta).not.toHaveAttribute("target", "_blank");
        await expect(footerCta).not.toHaveAttribute("target", "_blank");
        await expect(heroCta).not.toHaveAttribute("rel", "noopener noreferrer");
        await expect(footerCta).not.toHaveAttribute(
          "rel",
          "noopener noreferrer",
        );
      }
    });
  });
}

test("download clicks show the social follow banner", async ({ page }) => {
  await page.goto("/en/");

  await page.evaluate(() => {
    const element = document.querySelector(
      '[data-testid="landing-hero-download"]',
    );
    element?.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
      capture: true,
    });
    element?.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });

  const banner = page.getByTestId("download-social-banner");
  await expect(banner).toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Stay close to TypeWhisper" }),
  ).toBeVisible();
  await expect(banner).toContainText("Download started");
  await expect(
    banner.getByRole("link", { name: "Follow on X" }),
  ).toHaveAttribute(
    "href",
    "https://x.com/intent/follow?screen_name=Type_Whisper",
  );
  await expect(
    banner.getByRole("link", { name: "Share on Reddit" }),
  ).toHaveAttribute("href", /^https:\/\/www\.reddit\.com\/submit\?/);
  await expect(
    banner.getByRole("link", { name: "Join Discord" }),
  ).toHaveAttribute("href", "https://discord.gg/pUFR4a65SD");
  await expect(banner.locator("[data-social-icon='x'] svg")).toBeVisible();
  await expect(banner.locator("[data-social-icon='reddit'] svg")).toBeVisible();
  await expect(
    banner.locator("[data-social-icon='discord'] svg"),
  ).toBeVisible();
  await expect(banner.locator("[data-social-icon='github'] svg")).toBeVisible();
});

test("attributes download and checkout events without blocking navigation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const events: unknown[][] = [];
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    });
    Object.assign(window, {
      __plausibleEvents: events,
      plausible: (...args: unknown[]) => events.push(args),
    });
  });

  await page.goto(
    "/en/?utm_source=reddit&utm_medium=social&utm_campaign=launch",
  );
  await page.getByTestId("landing-hero-download").evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
      capture: true,
    });
    element.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });

  const downloadEvents = await page.evaluate(
    () =>
      (window as typeof window & { __plausibleEvents: unknown[][] })
        .__plausibleEvents,
  );
  expect(downloadEvents).toHaveLength(1);
  expect(downloadEvents[0]).toEqual([
    "Download",
    {
      props: expect.objectContaining({
        platform: "mac",
        target: "mac_dmg",
        placement: "hero",
        locale: "en",
      }),
    },
  ]);

  await page.goto("/en/pricing");
  const checkout = page.locator(
    "[data-checkout-tier='individual'][data-checkout-billing-period='monthly']",
  );
  await checkout.evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
      capture: true,
    });
    element.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });

  const checkoutURL = new URL((await checkout.getAttribute("href"))!);
  expect(checkoutURL.searchParams.get("utm_source")).toBe("reddit");
  expect(checkoutURL.searchParams.get("utm_medium")).toBe("social");
  expect(checkoutURL.searchParams.get("utm_campaign")).toBe("launch");
  expect(checkoutURL.searchParams.get("utm_content")).toBe(
    "website_pricing_individual_monthly",
  );

  const allEvents = await page.evaluate(
    () =>
      (window as typeof window & { __plausibleEvents: unknown[][] })
        .__plausibleEvents,
  );
  expect(allEvents.at(-1)).toEqual([
    "Checkout Started",
    {
      props: {
        tier: "individual",
        billing_period: "monthly",
        placement: "pricing",
        locale: "en",
      },
    },
  ]);
});

test("uses website checkout defaults when no campaign is present", async ({
  page,
}) => {
  await page.goto("/en/pricing");
  const checkout = page.locator("[data-checkout-tier='bronze']");
  await checkout.evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
      capture: true,
    });
    element.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });

  const checkoutURL = new URL((await checkout.getAttribute("href"))!);
  expect(checkoutURL.searchParams.get("utm_source")).toBe(
    "typewhisper_website",
  );
  expect(checkoutURL.searchParams.get("utm_medium")).toBe("web");
});

test.describe("release status download routing", () => {
  test("/en/release-status uses generated macOS and Windows links", async ({
    page,
  }) => {
    const downloads = readGeneratedDownloads();
    await page.goto("/en/release-status");

    await expect(
      page.getByRole("link", { name: "Download latest release" }),
    ).toHaveAttribute("href", downloads.mac.url);
    await expect(
      page.getByRole("link", { name: "Download latest release" }),
    ).not.toHaveAttribute("target", "_blank");
    await expect(
      page.getByRole("link", { name: "Install from Microsoft Store" }),
    ).toHaveAttribute(
      "href",
      "https://apps.microsoft.com/detail/9pf42zcr0jr0?cid=DevShareMCLPCS&hl=en-US&gl=US",
    );
    await expect(
      page.getByRole("link", { name: "Install from Microsoft Store" }),
    ).toHaveAttribute("target", "_blank");
    await expect(
      page.getByRole("link", { name: "Install from Microsoft Store" }),
    ).toHaveAttribute("rel", "noopener noreferrer");
    await expect(
      page.getByRole("link", { name: "Download GitHub installer" }),
    ).toHaveAttribute("href", downloads.windows.url);
    await expect(
      page.getByRole("link", { name: "Download on the App Store" }),
    ).toHaveAttribute("href", IOS_APP_STORE_URL);
    await expect(page.locator('a[href*="testflight.apple.com"]')).toHaveCount(
      0,
    );
  });

  test("/de/release-status uses generated macOS and Windows links", async ({
    page,
  }) => {
    const downloads = readGeneratedDownloads();
    await page.goto("/de/release-status");

    await expect(
      page.getByRole("link", { name: "Neuestes Release herunterladen" }),
    ).toHaveAttribute("href", downloads.mac.url);
    await expect(
      page.getByRole("link", { name: "Neuestes Release herunterladen" }),
    ).not.toHaveAttribute("target", "_blank");
    await expect(
      page.getByRole("link", { name: "Aus dem Microsoft Store installieren" }),
    ).toHaveAttribute(
      "href",
      "https://apps.microsoft.com/detail/9pf42zcr0jr0?cid=DevShareMCLPCS&hl=de-DE&gl=DE",
    );
    await expect(
      page.getByRole("link", { name: "Aus dem Microsoft Store installieren" }),
    ).toHaveAttribute("target", "_blank");
    await expect(
      page.getByRole("link", { name: "Aus dem Microsoft Store installieren" }),
    ).toHaveAttribute("rel", "noopener noreferrer");
    await expect(
      page.getByRole("link", { name: "GitHub-Installer herunterladen" }),
    ).toHaveAttribute("href", downloads.windows.url);
    await expect(
      page.getByRole("link", { name: "Im App Store laden" }),
    ).toHaveAttribute("href", IOS_APP_STORE_URL);
    await expect(page.locator('a[href*="testflight.apple.com"]')).toHaveCount(
      0,
    );
  });
});

test("public iOS pages expose the stable App Store release without beta links", async ({
  page,
}) => {
  for (const path of ["/en/", "/en/docs", "/en/docs/ios", "/en/support"]) {
    await page.goto(path);
    await expect(page.locator('a[href*="testflight.apple.com"]')).toHaveCount(
      0,
    );
  }

  await page.goto("/en/docs/ios");
  await expect(
    page.getByRole("link", { name: "Download on the App Store" }),
  ).toHaveAttribute("href", IOS_APP_STORE_URL);
  await expect(
    page.getByText("Version 1.0 stable", { exact: true }),
  ).toBeVisible();

  await page.goto("/en/support");
  await expect(
    page.getByRole("link", { name: "Email iOS support" }),
  ).toHaveAttribute("href", "mailto:hello@typewhisper.com");
  const supportAppStoreLink = page.getByRole("link", {
    name: "Open the App Store",
  });
  await expect(supportAppStoreLink).toHaveAttribute(
    "href",
    IOS_APP_STORE_URL,
  );
  await expect(supportAppStoreLink).toHaveAttribute(
    "data-download-target",
    "ios_app_store",
  );
  await expect(supportAppStoreLink).toHaveAttribute(
    "data-download-version",
    "1.0",
  );
  await expect(supportAppStoreLink).toHaveAttribute(
    "data-tracking-placement",
    "support",
  );
});

test.describe("iOS App Store media", () => {
  test("English landing uses the localized App Preview", async ({
    page,
    request,
  }) => {
    await page.goto("/en/");
    await expect(page.locator("html")).toHaveAttribute(
      "data-landing-platform",
      "windows",
    );
    const iosTab = page.getByTestId("landing-hero-tab-ios");
    await iosTab.click();
    await expect(iosTab).toHaveAttribute("aria-selected", "true");

    await expect(page.getByTestId("landing-hero-download")).toHaveAttribute(
      "href",
      IOS_APP_STORE_URL,
    );
    await expect(page.getByTestId("landing-hero-download")).toHaveAttribute(
      "data-download-target",
      "ios_app_store",
    );
    await expect(page.getByTestId("landing-hero-download")).toHaveAttribute(
      "data-download-version",
      "1.0",
    );
    await expect(
      page.locator('source[src="/ios-app-preview-de.mp4"]'),
    ).toHaveCount(0);
    const howItWorks = page.getByTestId("how-it-works");
    await howItWorks.scrollIntoViewIfNeeded();
    await expect(
      howItWorks.locator("xpath=ancestor::astro-island"),
    ).not.toHaveAttribute("ssr", "");
    await expect(
      page.getByTestId("how-it-works-video").locator("source"),
    ).toHaveAttribute("src", "/ios-app-preview-en.mp4");
    expect((await request.get("/ios-app-preview-en.mp4")).ok()).toBeTruthy();

    const watchPreview = page.getByTestId("ios-watch-preview");
    await expect(watchPreview).toContainText("Record from Apple Watch");
    await expect(watchPreview.locator("img")).toHaveCount(3);

    for (const name of ["01-ready", "02-recording", "03-recent"]) {
      const path = `/screenshots/en/ios/watch/${name}.webp`;
      await expect(watchPreview.locator(`img[src="${path}"]`)).toBeVisible();
      expect((await request.get(path)).ok()).toBeTruthy();
    }
  });

  test("German landing keeps the localized video and Watch screenshots", async ({
    page,
  }) => {
    await page.goto("/de/");
    await expect(page.locator("html")).toHaveAttribute(
      "data-landing-platform",
      "windows",
    );
    const iosTab = page.getByTestId("landing-hero-tab-ios");
    await iosTab.click();
    await expect(iosTab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByTestId("landing-hero-download")).toHaveAttribute(
      "href",
      IOS_APP_STORE_URL,
    );

    const howItWorks = page.getByTestId("how-it-works");
    await howItWorks.scrollIntoViewIfNeeded();
    await expect(
      howItWorks.locator("xpath=ancestor::astro-island"),
    ).not.toHaveAttribute("ssr", "");
    await expect(
      page.getByTestId("how-it-works-video").locator("source"),
    ).toHaveAttribute("src", "/ios-app-preview-de.mp4");
    await expect(
      page.getByTestId("ios-watch-preview").locator("img"),
    ).toHaveCount(3);
  });

  for (const locale of ["en", "de"] as const) {
    test(`${locale} iOS docs show localized iPhone and Watch media`, async ({
      page,
      request,
    }) => {
      await page.goto(`/${locale}/docs/ios`);

      await expect(
        page.getByRole("heading", { level: 1, name: "iOS" }),
      ).toBeVisible();
      const appStoreLinks = page.locator(`a[href="${IOS_APP_STORE_URL}"]`);
      await expect(appStoreLinks.first()).toBeVisible();
      await expect(appStoreLinks.first()).toHaveAttribute(
        "data-download-target",
        "ios_app_store",
      );
      await expect(appStoreLinks.first()).toHaveAttribute(
        "data-download-version",
        "1.0",
      );
      await expect(page.locator('a[href*="testflight.apple.com"]')).toHaveCount(
        0,
      );

      for (const name of ["01-recording", "03-keyboard", "05-profiles"]) {
        const path = `/screenshots/${locale}/ios/${name}.png`;
        await expect(page.locator(`img[src="${path}"]`)).toBeVisible();
        expect((await request.get(path)).ok()).toBeTruthy();
      }

      for (const name of ["01-ready", "02-recording", "03-recent"]) {
        const pngPath = `/screenshots/${locale}/ios/watch/${name}.png`;
        const webpPath = `/screenshots/${locale}/ios/watch/${name}.webp`;
        await expect(page.locator(`img[src="${pngPath}"]`)).toBeVisible();
        await expect(page.locator(`source[srcset="${webpPath}"]`)).toHaveCount(
          1,
        );
        expect((await request.get(pngPath)).ok()).toBeTruthy();
        expect((await request.get(webpPath)).ok()).toBeTruthy();
      }

      const previewPath = `/ios-app-preview-${locale}.mp4`;
      await expect(page.locator(`source[src="${previewPath}"]`)).toHaveCount(1);
      expect((await request.get(previewPath)).ok()).toBeTruthy();
    });
  }
});

test("macOS installation docs use the generated stable download", async ({
  page,
}) => {
  const downloads = readGeneratedDownloads();

  for (const locale of ["en", "de"] as const) {
    await page.goto(`/${locale}/docs/mac/installation`);

    const download = page.locator(
      '[data-download-platform="mac"][data-tracking-placement="docs"]',
    );
    await expect(download).toHaveAttribute("href", downloads.mac.url);
    await expect(download).toHaveAttribute("data-download-target", "mac_dmg");
    await expect(download).not.toHaveAttribute("target", "_blank");
  }
});

test("changelog reflects the generated release feed", async ({ page }) => {
  const releases = readGeneratedReleases();
  await page.goto("/en/changelog");

  if (releases.length === 0) {
    await expect(page.getByText("No releases found.")).toBeVisible();
  } else {
    await expect(page.getByText(releases[0].tag_name).first()).toBeVisible();
  }
});
