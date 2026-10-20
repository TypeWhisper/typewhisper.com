import { expect, test } from "@playwright/test";

const policyKeys = [
  "ManagedLicenseKey",
  "TranscriptionProviderId",
  "TranscriptionModelId",
  "LlmProviderId",
  "LlmModelId",
  "UpdateMode",
  "UpdateChannel",
  "AllowedUpdateChannels",
  "LaunchAtLogin",
  "SkipOnboardingWhenReady",
  "SuppressOptionalPrompts",
  "AllowCloudTranscription",
  "AllowCloudTextProcessing",
  "AllowedTranscriptionProviders",
  "AllowedLlmProviders",
  "AllowedPlugins",
  "AllowPluginDownloads",
  "AllowModelDownloads",
];

// Keys the Mac App Store edition ignores and lists as policy problems.
const directDownloadOnly = [
  "ManagedLicenseKey",
  "UpdateMode",
  "UpdateChannel",
  "AllowedUpdateChannels",
  "AllowPluginDownloads",
];

test.describe("Mac deployment documentation", () => {
  for (const locale of ["en", "de"] as const) {
    test(`${locale} renders the deployment pages and links them`, async ({
      page,
    }) => {
      const pages = [
        ["/deployment", locale === "de" ? "Bereitstellung" : "Deployment"],
        [
          "/managed-settings",
          locale === "de" ? "Verwaltete Einstellungen" : "Managed Settings",
        ],
      ] as const;

      for (const [slug, heading] of pages) {
        await page.goto(`/${locale}/docs/mac${slug}/`);
        await expect(
          page.getByRole("heading", { level: 1, name: heading }),
        ).toBeVisible();
      }

      await page.goto(`/${locale}/docs/mac/`);
      for (const [slug] of pages) {
        await expect(
          page.locator(`a[href="/${locale}/docs/mac${slug}/"]`).first(),
        ).toBeVisible();
      }
    });
  }

  test("managed settings list every key once and mark the direct-download keys", async ({
    page,
  }) => {
    for (const locale of ["en", "de"] as const) {
      await page.goto(`/${locale}/docs/mac/managed-settings/`);
      const listed = await page
        .locator("#reference .docs-table td:first-child code")
        .allInnerTexts();
      expect([...listed].sort()).toEqual([...policyKeys].sort());

      const marker = locale === "de" ? "nur Direkt-Download" : "direct download only";
      const marked = await page
        .locator("#reference .docs-table td:first-child", { hasText: marker })
        .locator("code")
        .allInnerTexts();
      expect([...marked].sort()).toEqual([...directDownloadOnly].sort());
    }
  });

  test("managed settings explain profiles, the generator, and the MDMs", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/managed-settings/");

    for (const id of [
      "quick-start",
      "how-it-works",
      "pairs",
      "provider-ids",
      "locality",
      "license",
      "generator",
      "iru",
      "jamf-pro",
      "other-mdms",
      "check",
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    await expect(
      page.locator("#how-it-works code", { hasText: "com.typewhisper.typewhisper-app" }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("--domain com.typewhisper.typewhisper-app").first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "profile generator", exact: true }),
    ).toHaveAttribute(
      "href",
      "https://github.com/TypeWhisper/typewhisper-mac/blob/main/deployment/macos/make-typewhisper-profile.py",
    );
  });

  test("deployment documents editions, permissions, and hosts", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/deployment/");

    await expect(
      page.getByText("brew install --cask typewhisper/tap/typewhisper").first(),
    ).toBeVisible();
    await expect(page.locator("#login-item code", { hasText: "2D8ALY3LCL" })).toHaveCount(1);
    await expect(
      page.locator("#permissions .docs-table td:first-child"),
    ).toHaveCount(8);
    await expect(
      page.locator("#permissions code", { hasText: "com.apple.configuration.app.settings" }),
    ).toHaveCount(1);
    await expect(page.locator("#network code", { hasText: /^\*\.hf\.co$/ }).first()).toBeVisible();
    await expect(page.locator("#network code", { hasText: /^api\.polar\.sh$/ }).first()).toBeVisible();
  });

  test("installation, troubleshooting, and the business page point to the guides", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/installation/");
    await expect(
      page.locator('#organizations a[href="/en/docs/mac/deployment/"]'),
    ).toBeVisible();

    await page.goto("/de/docs/mac/troubleshooting/");
    await expect(
      page.locator('#managed-settings a[href="/de/docs/mac/managed-settings/"]'),
    ).toBeVisible();

    await page.goto("/en/business/");
    await expect(page.locator('a[href="/en/docs/mac/deployment/"]')).toBeVisible();
  });

  test("Mac deployment docs remain within a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of [
      "/en/docs/mac/deployment/",
      "/de/docs/mac/deployment/",
      "/en/docs/mac/managed-settings/",
      "/de/docs/mac/managed-settings/",
    ]) {
      await page.goto(route);
      const sizes = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(sizes.content, route).toBeLessThanOrEqual(sizes.viewport);
    }
  });
});
