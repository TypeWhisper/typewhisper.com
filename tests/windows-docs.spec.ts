import { expect, test } from "@playwright/test";

const routes = [
  ["", "Windows Documentation", "Windows-Dokumentation"],
  ["/installation", "Installation", "Installation"],
  ["/features", "Features", "Funktionen"],
  ["/file-transcription", "File Transcription", "Datei-Transkription"],
  ["/workflows", "Workflows", "Workflows"],
  ["/api", "HTTP API", "HTTP API"],
  ["/cli", "CLI Tool", "CLI-Tool"],
  ["/troubleshooting", "Troubleshooting", "Fehlerbehebung"],
] as const;

const sidebarSlugs = [
  "",
  "/installation",
  "/features",
  "/file-transcription",
  "/workflows",
  "/api",
  "/cli",
  "/troubleshooting",
];

test.describe("Windows documentation", () => {
  for (const locale of ["en", "de"] as const) {
    test(`${locale} exposes every Windows documentation route`, async ({ page }) => {
      for (const [slug, englishHeading, germanHeading] of routes) {
        await page.goto(`/${locale}/docs/windows${slug}`);
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: locale === "de" ? germanHeading : englishHeading,
          }),
        ).toBeVisible();
      }
    });

    test(`${locale} index and sidebar link to the task-oriented pages`, async ({ page }) => {
      await page.goto(`/${locale}/docs/windows`);

      for (const slug of sidebarSlugs) {
        const href = `/${locale}/docs/windows${slug}`;
        await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
      }

      await expect(
        page.getByRole("link", { name: locale === "de" ? "Profile" : "Profiles", exact: true }),
      ).toHaveCount(0);
    });
  }

  test("legacy profile routes redirect to localized workflows", async ({ page }) => {
    await page.goto("/en/docs/windows/profiles");
    await expect(page).toHaveURL(/\/en\/docs\/windows\/workflows\/?$/);

    await page.goto("/de/docs/windows/profiles");
    await expect(page).toHaveURL(/\/de\/docs\/windows\/workflows\/?$/);

    await page.goto("/docs/windows/profiles");
    await expect(page).toHaveURL(/\/(en|de)\/docs\/windows\/workflows\/?$/);
  });

  test("installation documents the current onboarding and data model", async ({ page }) => {
    await page.goto("/en/docs/windows/installation");

    await expect(page.getByRole("heading", { level: 2, name: "2. Four-step onboarding" })).toBeVisible();
    const onboarding = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { level: 2, name: "2. Four-step onboarding" }) });
    await expect(onboarding.locator("ol > li")).toHaveCount(4);
    await expect(page.getByText("%LOCALAPPDATA%\\TypeWhisper-UserData")).toBeVisible();
    await expect(page.getByText("Start with Windows is enabled by default", { exact: false })).toBeVisible();

    const x64 = page.getByRole("link", { name: "TypeWhisper-win-x64-Setup.exe" });
    const arm64 = page.getByRole("link", { name: "TypeWhisper-win-arm64-Setup.exe" });
    await expect(x64).toHaveAttribute("href", /github\.com\/TypeWhisper\/typewhisper-win\/releases/);
    await expect(arm64).toHaveAttribute("href", /TypeWhisper-win-arm64-Setup\.exe$/);
    await expect(page.getByRole("link", { name: "Open TypeWhisper in the Microsoft Store" })).toHaveAttribute(
      "href",
      /^https:\/\/apps\.microsoft\.com\//,
    );
  });

  test("API and CLI use port 8978 and public discovery paths", async ({ page }) => {
    await page.goto("/en/docs/windows/api");
    await expect(page.getByText("port 8978", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Settings > Advanced > API Server", { exact: false })).toBeVisible();
    await expect(page.getByText("api-discovery.json", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("/v1/recorder/session", { exact: true })).toBeVisible();
    await expect(page.getByText("/v1/profiles", { exact: true })).toBeVisible();
    await expect(page.getByText("/v1/rules", { exact: true })).toBeVisible();
    await expect(page.getByText("/v1/automation/", { exact: false })).toHaveCount(0);

    await page.goto("/en/docs/windows/cli");
    await expect(page.getByText("fallback 8978", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("%LOCALAPPDATA%\\TypeWhisper\\api-discovery.json", { exact: true })).toBeVisible();
    await expect(page.getByText("the CLI still checks the former folder", { exact: false })).toBeVisible();
    await expect(page.getByText("--language-hint <code>", { exact: true })).toBeVisible();
    await expect(page.getByText("--await-download", { exact: true })).toBeVisible();
  });

  test("Windows docs do not repeat superseded CPU-only, registry, or port claims", async ({ page }) => {
    for (const locale of ["en", "de"]) {
      for (const [slug] of routes) {
        await page.goto(`/${locale}/docs/windows${slug}`);
        const text = (await page.locator("main").last().innerText()).toLowerCase();
        expect(text).not.toContain("9876");
        expect(text).not.toContain("cpu-only");
        expect(text).not.toContain("cpu only");
        expect(text).not.toContain("registry entry");
        expect(text).not.toContain("registry-eintrag");
      }
    }
  });

  test("localized screenshots expose PNG, WebP, dimensions, and useful alt text", async ({ page, request }) => {
    const screenshots = [
      ["dashboard", "/docs/windows", "TypeWhisper dashboard on Windows", "TypeWhisper-Dashboard unter Windows"],
      ["onboarding", "/docs/windows/installation", "Four-step TypeWhisper onboarding on Windows", "Vierstufiges TypeWhisper-Onboarding unter Windows"],
      ["dictation", "/docs/windows/features", "TypeWhisper dictation settings for Windows", "Diktateinstellungen von TypeWhisper für Windows"],
      ["shortcuts", "/docs/windows/features", "TypeWhisper hotkeys for Windows", "Tastenkürzel von TypeWhisper für Windows"],
      ["file-transcription", "/docs/windows/file-transcription", "TypeWhisper file transcription queue", "Queue für Datei-Transkriptionen in TypeWhisper"],
      ["workflows", "/docs/windows/workflows", "TypeWhisper workflow management for Windows", "Workflow-Verwaltung in TypeWhisper für Windows"],
      ["integrations-marketplace", "/docs/windows/features", "Marketplace for TypeWhisper extensions on Windows", "Marketplace für TypeWhisper-Erweiterungen unter Windows"],
      ["dictionary", "/docs/windows/features", "TypeWhisper dictionary with terms and corrections", "Wörterbuch mit Begriffen und Korrekturen in TypeWhisper"],
      ["recorder", "/docs/windows/features", "TypeWhisper recorder for microphone and system audio", "Recorder für Mikrofon und Systemaudio in TypeWhisper"],
      ["advanced", "/docs/windows/api", "API server settings in the Advanced section", "API-Server-Einstellungen im Bereich Erweitert"],
    ] as const;

    for (const locale of ["en", "de"] as const) {
      for (const [name, route, englishAlt, germanAlt] of screenshots) {
        await page.goto(`/${locale}${route}`);
        const src = `/screenshots/${locale}/windows/${name}.png`;
        const image = page.locator(`img[src="${src}"]`);
        await expect(image).toHaveAttribute("alt", locale === "de" ? germanAlt : englishAlt);
        await expect(page.locator(`source[srcset="/screenshots/${locale}/windows/${name}.webp"]`)).toHaveCount(1);

        expect((await request.get(src)).ok()).toBeTruthy();
        expect((await request.get(src.replace(".png", ".webp"))).ok()).toBeTruthy();
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate((element: HTMLImageElement) => ({
              width: element.naturalWidth,
              height: element.naturalHeight,
            })),
          )
          .toEqual({ width: 1240, height: 800 });
      }
    }
  });

  test("Windows docs remain within a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/en/docs/windows", "/en/docs/windows/api", "/de/docs/windows/workflows"]) {
      await page.goto(route);
      const sizes = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
    }
  });
});
