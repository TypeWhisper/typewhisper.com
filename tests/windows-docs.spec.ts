import { expect, test, type Page } from "@playwright/test";

const routes = [
  ["", "Windows Documentation", "Windows-Dokumentation"],
  ["/installation", "Installation", "Installation"],
  ["/features", "Features", "Funktionen"],
  ["/file-transcription", "File Transcription", "Datei-Transkription"],
  ["/workflows", "Workflows", "Workflows"],
  ["/api", "HTTP API", "HTTP API"],
  ["/cli", "CLI Tool", "CLI-Tool"],
  ["/troubleshooting", "Troubleshooting", "Fehlerbehebung"],
  ["/deployment", "Deployment", "Bereitstellung"],
  ["/managed-settings", "Managed Settings", "Verwaltete Einstellungen"],
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
  "/deployment",
  "/managed-settings",
];

// Model load, unload, and delete in the API and CLI, available since 1.1.
const modelCopy = {
  en: {
    title: "Load, unload, and delete models",
    managed:
      "From TypeWhisper for Windows 1.2, managed settings can refuse these routes with 403.",
    managedLink: "managed settings",
    output: "output",
    flags: "Model command flags",
    switchModel: "Switch to another model for one job and unload it afterwards",
  },
  de: {
    title: "Modelle laden, entladen und löschen",
    managed:
      "Ab TypeWhisper für Windows 1.2 können verwaltete Einstellungen diese Routen mit 403 ablehnen.",
    managedLink: "verwaltete Einstellungen",
    output: "Ausgabe",
    flags: "Flags für Modellbefehle",
    switchModel: "Für einen Auftrag zu einem anderen Modell wechseln und es danach entladen",
  },
} as const;

async function expectAnchoredHeading(
  page: Page,
  level: 2 | 3,
  id: string,
  name: string,
) {
  const heading = page.getByRole("heading", { level, name, exact: true });
  await expect(heading).toBeVisible();
  await expect(heading.getByRole("link")).toHaveAttribute("href", `#${id}`);
  await expect(page.locator(`.docs-toc a[href="#${id}"]`)).toHaveCount(1);
}

test.describe("Windows documentation", () => {
  for (const locale of ["en", "de"] as const) {
    test(`${locale} exposes every Windows documentation route`, async ({
      page,
    }) => {
      for (const [slug, englishHeading, germanHeading] of routes) {
        await page.goto(`/${locale}/docs/windows${slug}/`);
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: locale === "de" ? germanHeading : englishHeading,
          }),
        ).toBeVisible();
      }
    });

    test(`${locale} index and sidebar link to the task-oriented pages`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/windows/`);

      for (const slug of sidebarSlugs) {
        const href = `/${locale}/docs/windows${slug}/`;
        await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
      }

      await expect(
        page.getByRole("link", {
          name: locale === "de" ? "Profile" : "Profiles",
          exact: true,
        }),
      ).toHaveCount(0);
    });
  }

  test("legacy profile routes redirect to localized workflows", async ({
    page,
  }) => {
    await page.goto("/en/docs/windows/profiles/");
    await expect(page).toHaveURL(/\/en\/docs\/windows\/workflows\/$/);

    await page.goto("/de/docs/windows/profiles/");
    await expect(page).toHaveURL(/\/de\/docs\/windows\/workflows\/$/);

    await page.goto("/docs/windows/profiles/");
    await expect(page).toHaveURL(/\/(en|de)\/docs\/windows\/workflows\/$/);
  });

  test("installation documents the current onboarding and data model", async ({
    page,
  }) => {
    await page.goto("/en/docs/windows/installation/");

    await expect(
      page.getByRole("heading", { level: 2, name: "2. Four-step onboarding" }),
    ).toBeVisible();
    const onboarding = page
      .locator("section")
      .filter({
        has: page.getByRole("heading", {
          level: 2,
          name: "2. Four-step onboarding",
        }),
      });
    await expect(onboarding.locator("ol > li")).toHaveCount(4);
    await expect(
      page.getByText("%LOCALAPPDATA%\\TypeWhisper-WinUI", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "%LOCALAPPDATA%\\Packages\\TypeWhisper.TypeWhisper_51tqb5623pxja\\LocalCache\\Local\\TypeWhisper-WinUI",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByText("TypeWhisper-WinUI-StoreBeta", { exact: true }),
    ).toBeVisible();
    // TypeWhisper 1.1 and later only import from the 1.0 folder.
    await expect(
      page.getByText("%LOCALAPPDATA%\\TypeWhisper-UserData", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("imports your data once from the old folder", { exact: false }),
    ).toBeVisible();
    await expect(
      page.getByText("Start with Windows is enabled by default", {
        exact: false,
      }),
    ).toBeVisible();

    const x64 = page.getByRole("link", {
      name: "TypeWhisper-win-x64-Setup.exe",
    });
    const releases = page.getByRole("link", { name: "All releases" });
    await expect(x64).toHaveAttribute(
      "href",
      /github\.com\/TypeWhisper\/typewhisper-win\/releases/,
    );
    // TypeWhisper for Windows 1.1 is built for x64 only.
    await expect(page.getByRole("link", { name: /arm64/i })).toHaveCount(0);
    await expect(page.getByText("x64 processor", { exact: true })).toBeVisible();
    await expect(releases).toHaveAttribute(
      "data-download-target",
      "windows_github_releases",
    );
    await expect(
      page.getByRole("link", {
        name: "Open TypeWhisper in the Microsoft Store",
      }),
    ).toHaveAttribute("href", /^https:\/\/apps\.microsoft\.com\//);
  });

  test("deployment documents the installers, hosts, and microphone", async ({
    page,
  }) => {
    await page.goto("/en/docs/windows/deployment/");

    await expect(
      page.getByRole("link", { name: "TypeWhisper-win-x64.msi", exact: true }),
    ).toHaveAttribute(
      "href",
      "https://github.com/TypeWhisper/typewhisper-win/releases/latest/download/TypeWhisper-win-x64.msi",
    );
    await expect(
      page.getByText("msiexec /i TypeWhisper-win-x64.msi /qn /norestart").first(),
    ).toBeVisible();
    await expect(
      page.getByText("TypeWhisper-win-x64-Setup.exe --silent").first(),
    ).toBeVisible();
    await expect(
      page.getByText("MSI:TypeWhisper", { exact: false }).first(),
    ).toBeVisible();
    await expect(page.locator("#network code", { hasText: /^\*\.hf\.co$/ }).first()).toBeVisible();
    await expect(
      page.locator("#microphone code", { hasText: "NonPackaged" }),
    ).toHaveCount(1);
  });

  test("managed settings list every policy value once", async ({ page }) => {
    const policyValues = [
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

    for (const locale of ["en", "de"] as const) {
      await page.goto(`/${locale}/docs/windows/managed-settings/`);
      const listed = await page
        .locator("#reference .docs-table td:first-child code")
        .allInnerTexts();
      expect([...listed].sort()).toEqual([...policyValues].sort());
      await expect(
        page
          .getByRole("link", { name: "TypeWhisper-win-PolicyTemplates.zip" })
          .first(),
      ).toHaveAttribute(
        "href",
        "https://github.com/TypeWhisper/typewhisper-win/releases/latest/download/TypeWhisper-win-PolicyTemplates.zip",
      );
    }

    // The German page uses the setting names of the de-DE ADML file.
    await expect(
      page.locator("#policy-names ~ .docs-table", {
        hasText: "Cloud-Transkription erlauben",
      }),
    ).toHaveCount(1);
  });

  test("business page links to the Windows deployment guide", async ({
    page,
  }) => {
    await page.goto("/en/business/");
    await expect(
      page.locator('a[href="/en/docs/windows/deployment/"]'),
    ).toBeVisible();
  });

  test("API and CLI use port 8978 and public discovery paths", async ({
    page,
  }) => {
    await page.goto("/en/docs/windows/api/");
    await expect(
      page.getByText("port 8978", { exact: false }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("Settings > Advanced > API server", { exact: false }),
    ).toBeVisible();
    // Turning the switch on starts the server; Apply only saves port and token changes.
    await expect(
      page.getByText("Turn on Enable HTTP API; the server starts right away.", { exact: false }),
    ).toBeVisible();
    await expect(
      page.getByText("turn on Require API token and select Apply", { exact: false }),
    ).toBeVisible();
    await expect(
      page.getByText("api-discovery.json", { exact: false }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("%LOCALAPPDATA%\\TypeWhisper-WinUI", { exact: true }),
    ).toBeVisible();
    await expect(page.locator("body")).not.toContainText("TypeWhisper-UserData");
    await expect(
      page.getByText("/v1/recorder/session", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("/v1/profiles", { exact: true })).toBeVisible();
    await expect(page.getByText("/v1/rules", { exact: true })).toBeVisible();
    await expect(
      page.getByText("/v1/automation/", { exact: false }),
    ).toHaveCount(0);

    await page.goto("/en/docs/windows/cli/");
    await expect(
      page.getByText("fallback 8978", { exact: false }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("in the profile of the app that installed it", {
        exact: false,
      }),
    ).toBeVisible();
    await expect(
      page.getByText("%LOCALAPPDATA%\\TypeWhisper-WinUI", { exact: true }),
    ).toBeVisible();
    await expect(page.locator("body")).not.toContainText("TypeWhisper-UserData");
    await expect(page.locator("body")).not.toContainText("former folder");
    await expect(
      page.getByText("--language-hint <code>", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("--await-download", { exact: true }),
    ).toBeVisible();
    // Another profile, such as the Store edition's, is reached with --profile.
    await expect(
      page.getByText("--profile <directory>", { exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("TYPEWHISPER_PROFILE", { exact: true }).first(),
    ).toBeVisible();
  });

  for (const locale of ["en", "de"] as const) {
    const text = modelCopy[locale];

    test(`${locale} API documents loading, unloading, and deleting models`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/docs/windows/api/`);

      const endpoints = page.locator("section#endpoints");
      for (const [method, route] of [
        ["POST", "/v1/models/load"],
        ["POST", "/v1/models/unload"],
        ["DELETE", "/v1/models"],
      ] as const) {
        const row = endpoints
          .getByRole("row")
          .filter({ has: page.getByRole("cell", { name: route, exact: true }) })
          .filter({ has: page.getByRole("cell", { name: method, exact: true }) });
        await expect(row).toHaveCount(1);
        // The model routes shipped with 1.1 and carry no version note.
        await expect(row).not.toContainText("1.2");
      }

      await expectAnchoredHeading(page, 2, "model-management", text.title);
      const models = page.locator("section#model-management");
      await expect(models).toContainText(
        `'{"engine":"sherpa-onnx","model":"parakeet-tdt-0.6b"}' |`,
      );
      await expect(models).toContainText('--data-binary "@-"');
      await expect(models).toContainText(
        '"http://localhost:8978/v1/models?engine=sherpa-onnx&model=canary-180m-flash"',
      );
      await expect(models).toContainText('"status": "ready"');
      await expect(models).toContainText(text.managed);
      await expect(
        models.getByRole("link", { name: text.managedLink, exact: true }),
      ).toHaveAttribute("href", `/${locale}/docs/windows/managed-settings/`);
      // The macOS model IDs do not exist on Windows.
      await expect(models).not.toContainText("parakeet-tdt-0.6b-v3");
      await expect(models).not.toContainText("openai_whisper");
    });

    test(`${locale} CLI documents the model commands`, async ({ page }) => {
      await page.goto(`/${locale}/docs/windows/cli/`);

      for (const [id, name, output] of [
        ["models-load", "models load", "ready: sherpa-onnx parakeet-tdt-0.6b"],
        ["models-unload", "models unload", "unloaded: sherpa-onnx parakeet-tdt-0.6b"],
        ["models-delete", "models delete", "deleted: sherpa-onnx canary-180m-flash"],
      ] as const) {
        await expectAnchoredHeading(page, 3, `command-${id}`, name);
        const block = page.locator("[data-docs-code]", {
          has: page.getByText(output, { exact: true }),
        });
        await expect(block).toHaveCount(1);
        await expect(block.locator(".docs-code__label")).toHaveText(text.output);
      }
      await expect(
        page.getByText("typewhisper models unload --engine sherpa-onnx", {
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page
          .locator("section#commands")
          .getByRole("link", { name: text.title, exact: true }),
      ).toHaveAttribute("href", `/${locale}/docs/windows/api/#model-management`);

      await expectAnchoredHeading(page, 2, "model-flags", text.flags);
      const flags = page.getByRole("region", { name: text.flags });
      for (const flag of ["--engine <id>", "--model <id>"]) {
        await expect(
          flags.getByRole("cell", { name: flag, exact: true }),
        ).toBeVisible();
      }

      const examples = page.locator("section#examples");
      await expect(examples).toContainText(text.switchModel);
      await expect(examples).toContainText(
        "typewhisper models load --engine whisper-cpp --model large-v3-turbo",
      );
      await expect(examples).toContainText(
        "typewhisper models unload --engine whisper-cpp",
      );
    });
  }

  test("Windows docs do not repeat superseded CPU-only, registry, or port claims", async ({
    page,
  }) => {
    for (const locale of ["en", "de"]) {
      for (const [slug] of routes) {
        await page.goto(`/${locale}/docs/windows${slug}/`);
        const text = (
          await page.locator("main").last().innerText()
        ).toLowerCase();
        expect(text).not.toContain("9876");
        expect(text).not.toContain("cpu-only");
        expect(text).not.toContain("cpu only");
        expect(text).not.toContain("registry entry");
        expect(text).not.toContain("registry-eintrag");
      }
    }
  });

  test("localized screenshots expose PNG, WebP, dimensions, and useful alt text", async ({
    page,
    request,
  }) => {
    const screenshots = [
      [
        "dashboard",
        "/docs/windows",
        "TypeWhisper dashboard on Windows",
        "TypeWhisper-Dashboard unter Windows",
      ],
      [
        "onboarding",
        "/docs/windows/installation",
        "Four-step TypeWhisper onboarding on Windows",
        "Vierstufiges TypeWhisper-Onboarding unter Windows",
      ],
      [
        "dictation",
        "/docs/windows/features",
        "TypeWhisper dictation settings for Windows",
        "Diktateinstellungen von TypeWhisper für Windows",
      ],
      [
        "shortcuts",
        "/docs/windows/features",
        "TypeWhisper hotkeys for Windows",
        "Tastenkürzel von TypeWhisper für Windows",
      ],
      [
        "file-transcription",
        "/docs/windows/file-transcription",
        "TypeWhisper file transcription queue",
        "Queue für Datei-Transkriptionen in TypeWhisper",
      ],
      [
        "workflows",
        "/docs/windows/workflows",
        "TypeWhisper workflow management for Windows",
        "Workflow-Verwaltung in TypeWhisper für Windows",
      ],
      [
        "integrations-marketplace",
        "/docs/windows/features",
        "Discover plugins in the TypeWhisper settings on Windows",
        "Plugins entdecken in den TypeWhisper-Einstellungen unter Windows",
      ],
      [
        "integrations-installed",
        "/docs/windows/features",
        "NVIDIA Parakeet plugin page with local models in TypeWhisper for Windows",
        "Plugin-Seite von NVIDIA Parakeet mit lokalen Modellen in TypeWhisper für Windows",
      ],
      [
        "dictionary",
        "/docs/windows/features",
        "TypeWhisper dictionary with terms and corrections",
        "Wörterbuch mit Begriffen und Korrekturen in TypeWhisper",
      ],
      [
        "recorder",
        "/docs/windows/features",
        "TypeWhisper recorder for microphone and system audio",
        "Recorder für Mikrofon und Systemaudio in TypeWhisper",
      ],
      [
        "advanced",
        "/docs/windows/api",
        "API server settings in the Advanced section",
        "API-Server-Einstellungen im Bereich Erweitert",
      ],
    ] as const;

    for (const locale of ["en", "de"] as const) {
      for (const [name, route, englishAlt, germanAlt] of screenshots) {
        await page.goto(`/${locale}${route}/`);
        const src = `/screenshots/${locale}/windows/${name}.png`;
        const image = page.locator(`img[src="${src}"]`);
        await expect(image).toHaveAttribute(
          "alt",
          locale === "de" ? germanAlt : englishAlt,
        );
        await expect(
          page.locator(
            `source[srcset*="/screenshots/${locale}/windows/${name}.webp"]`,
          ),
        ).toHaveCount(1);

        expect((await request.get(src)).ok()).toBeTruthy();
        expect(
          (await request.get(src.replace(".png", ".webp"))).ok(),
        ).toBeTruthy();
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate((element: HTMLImageElement) => element.naturalWidth),
          )
          .toBeGreaterThan(0);
        const dimensions = await image.evaluate(
          (element: HTMLImageElement) => ({
            width: element.naturalWidth,
            height: element.naturalHeight,
          }),
        );
        expect(dimensions.width).toBeLessThanOrEqual(1860);
        expect(dimensions.width / dimensions.height).toBeCloseTo(1860 / 1200, 2);
        expect(
          (
            await request.get(
              await image.evaluate(
                (element: HTMLImageElement) => element.currentSrc,
              ),
            )
          ).ok(),
        ).toBeTruthy();
      }
    }
  });

  test("Windows docs remain within a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of [
      "/en/docs/windows/",
      "/en/docs/windows/api/",
      "/de/docs/windows/api/",
      "/en/docs/windows/cli/",
      "/de/docs/windows/cli/",
      "/de/docs/windows/workflows/",
      "/en/docs/windows/deployment/",
      "/de/docs/windows/managed-settings/",
    ]) {
      await page.goto(route);
      const sizes = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
    }
  });
});
