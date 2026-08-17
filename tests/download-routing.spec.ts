import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

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
  expectedHref: RegExp | string;
  opensNewTab: boolean;
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
    expectedLabel: "Join iOS Alpha",
    expectedHref: "https://testflight.apple.com/join/kcCS3hcZ",
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
        await expect(footerCta).not.toHaveAttribute("rel", "noopener noreferrer");
      }

    });
  });
}

test("download clicks show the social follow banner", async ({ page }) => {
  await page.goto("/en/");

  await page.evaluate(() => {
    const element = document.querySelector('[data-testid="landing-hero-download"]');
    element?.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
      capture: true,
    });
    element?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });

  const banner = page.getByTestId("download-social-banner");
  await expect(banner).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Stay close to TypeWhisper" })).toBeVisible();
  await expect(banner).toContainText("Download started");
  await expect(banner.getByRole("link", { name: "Follow on X" })).toHaveAttribute(
    "href",
    "https://x.com/intent/follow?screen_name=Type_Whisper",
  );
  await expect(
    banner.getByRole("link", { name: "Share on Reddit" }),
  ).toHaveAttribute("href", /^https:\/\/www\.reddit\.com\/submit\?/);
  await expect(banner.getByRole("link", { name: "Join Discord" })).toHaveAttribute(
    "href",
    "https://discord.gg/pUFR4a65SD",
  );
  await expect(banner.locator("[data-social-icon='x'] svg")).toBeVisible();
  await expect(banner.locator("[data-social-icon='reddit'] svg")).toBeVisible();
  await expect(banner.locator("[data-social-icon='discord'] svg")).toBeVisible();
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
    element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });

  const downloadEvents = await page.evaluate(
    () => (window as typeof window & { __plausibleEvents: unknown[][] }).__plausibleEvents,
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
  const checkout = page.locator("[data-checkout-tier='individual'][data-checkout-billing-period='monthly']");
  await checkout.evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
      capture: true,
    });
    element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });

  const checkoutURL = new URL((await checkout.getAttribute("href"))!);
  expect(checkoutURL.searchParams.get("utm_source")).toBe("reddit");
  expect(checkoutURL.searchParams.get("utm_medium")).toBe("social");
  expect(checkoutURL.searchParams.get("utm_campaign")).toBe("launch");
  expect(checkoutURL.searchParams.get("utm_content")).toBe(
    "website_pricing_individual_monthly",
  );

  const allEvents = await page.evaluate(
    () => (window as typeof window & { __plausibleEvents: unknown[][] }).__plausibleEvents,
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

test("uses website checkout defaults when no campaign is present", async ({ page }) => {
  await page.goto("/en/pricing");
  const checkout = page.locator("[data-checkout-tier='bronze']");
  await checkout.evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
      capture: true,
    });
    element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });

  const checkoutURL = new URL((await checkout.getAttribute("href"))!);
  expect(checkoutURL.searchParams.get("utm_source")).toBe("typewhisper_website");
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
      page.getByRole("link", { name: "Join TestFlight" }),
    ).toHaveAttribute("href", "https://testflight.apple.com/join/kcCS3hcZ");
    await expect(
      page.getByRole("link", { name: "Join TestFlight" }),
    ).toHaveAttribute("target", "_blank");
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
      page.getByRole("link", { name: "TestFlight beitreten" }),
    ).toHaveAttribute("href", "https://testflight.apple.com/join/kcCS3hcZ");
    await expect(
      page.getByRole("link", { name: "TestFlight beitreten" }),
    ).toHaveAttribute("target", "_blank");
  });
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
