import { expect, test } from "@playwright/test";

type LandingScenario = {
  name: string;
  userAgent: string;
  expectedLabel: string;
  expectedHref: RegExp | string;
};

const landingScenarios: LandingScenario[] = [
  {
    name: "macOS",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    expectedLabel: "Download for macOS",
    expectedHref: /TypeWhisper-v\d+\.\d+\.\d+\.dmg$/,
  },
  {
    name: "Windows",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    expectedLabel: "Download Windows Beta",
    expectedHref: /TypeWhisper-win-x64-Setup\.exe$/,
  },
  {
    name: "iOS",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1",
    expectedLabel: "Join iOS Alpha",
    expectedHref: "https://testflight.apple.com/join/kcCS3hcZ",
  },
];

for (const scenario of landingScenarios) {
  test.describe(`landing download routing (${scenario.name})`, () => {
    test.use({ userAgent: scenario.userAgent });

    test("hero and footer CTA resolve directly for the detected platform", async ({
      page,
    }) => {
      await page.goto("/en/");

      const heroCta = page.getByTestId("landing-hero-download");
      const footerCta = page.getByTestId("landing-footer-download");

      await expect(heroCta).toBeVisible();
      await expect(footerCta).toBeVisible();
      await expect(heroCta).toHaveText(scenario.expectedLabel);
      await expect(footerCta).toHaveText(scenario.expectedLabel);
      await expect(heroCta).toHaveAttribute("href", scenario.expectedHref);
      await expect(footerCta).toHaveAttribute("href", scenario.expectedHref);

      const hrefs = [
        await heroCta.getAttribute("href"),
        await footerCta.getAttribute("href"),
      ];
      for (const href of hrefs) {
        expect(href).not.toMatch(/\/releases(?:\/latest)?$/);
      }
    });
  });
}

test.describe("release status direct downloads", () => {
  test("/en/release-status uses direct macOS and Windows asset links", async ({
    page,
  }) => {
    await page.goto("/en/release-status");

    await expect(
      page.getByRole("link", { name: "Download latest release" }),
    ).toHaveAttribute("href", /TypeWhisper-v\d+\.\d+\.\d+\.dmg$/);
    await expect(
      page.getByRole("link", { name: "Download beta builds" }),
    ).toHaveAttribute("href", /TypeWhisper-win-x64-Setup\.exe$/);
    await expect(
      page.getByRole("link", { name: "Join TestFlight" }),
    ).toHaveAttribute("href", "https://testflight.apple.com/join/kcCS3hcZ");
  });

  test("/de/release-status uses direct macOS and Windows asset links", async ({
    page,
  }) => {
    await page.goto("/de/release-status");

    await expect(
      page.getByRole("link", { name: "Neuestes Release herunterladen" }),
    ).toHaveAttribute("href", /TypeWhisper-v\d+\.\d+\.\d+\.dmg$/);
    await expect(
      page.getByRole("link", { name: "Beta-Builds herunterladen" }),
    ).toHaveAttribute("href", /TypeWhisper-win-x64-Setup\.exe$/);
    await expect(
      page.getByRole("link", { name: "TestFlight beitreten" }),
    ).toHaveAttribute("href", "https://testflight.apple.com/join/kcCS3hcZ");
  });
});

test("changelog includes stable macOS app releases again", async ({ page }) => {
  await page.goto("/en/changelog");
  await expect(page.getByText("v1.2.2").first()).toBeVisible();
});
