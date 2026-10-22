import { expect, test } from "@playwright/test";

test.describe("add-on platform editions", () => {
  test("Microsoft AI keeps its macOS guide and forwards the retired Windows edition", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const expectNoHorizontalOverflow = async () => {
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));

      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    };

    await page.goto("/en/addons/microsoft-ai/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Microsoft AI" }),
    ).toBeVisible();
    await expect(page.getByAltText("Microsoft AI", { exact: true })).toHaveAttribute(
      "src",
      "/brand-logos/microsoft-ai/logo.svg",
    );
    await expect(
      page.getByRole("heading", { level: 2, name: "Available platform" }),
    ).toBeVisible();
    await expect(page.getByText("This add-on is currently available for macOS only.", { exact: false })).toBeVisible();
    const cards = page.getByTestId("addon-edition-card");
    await expect(cards).toHaveCount(1);
    await expect(cards).toHaveAttribute("data-platform", "mac");
    await expectNoHorizontalOverflow();

    await page.goto("/en/addons/microsoft-ai/macos/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Microsoft AI for macOS",
      }),
    ).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/en/plugins/microsoft-ai.png"]'),
    ).toBeVisible();
    await expect(
      page.locator(
        'source[srcset="/screenshots/en/plugins/microsoft-ai.webp"]',
      ),
    ).toHaveCount(1);
    await expect(page.getByText("1.0.0", { exact: true })).toBeVisible();
    await expect(page.locator("body")).toContainText(
      "up to two hours and up to 300 MB",
    );
    await expect(page.locator("body")).toContainText(
      "does not stream partial text",
    );
    await expect(
      page.getByTestId("addon-edition-switcher").locator('a[data-platform="windows"]'),
    ).toHaveCount(0);
    await expectNoHorizontalOverflow();

    await page.goto("/de/addons/microsoft-ai/");
    await expect(
      page.getByRole("heading", { level: 2, name: "Verfügbare Plattform" }),
    ).toBeVisible();
    await expect(page.getByText("Dieses Add-on gibt es derzeit nur für macOS.", { exact: false })).toBeVisible();

    await page.goto("/de/addons/microsoft-ai/macos/");
    await expect(
      page.locator('img[src="/screenshots/de/plugins/microsoft-ai.png"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Einrichtungs-Tutorial" }),
    ).toBeVisible();
    await expectNoHorizontalOverflow();
  });

  test("retired Windows editions forward to the add-on page", async ({ page }) => {
    for (const slug of [
      "google-cloud-stt",
      "live-transcript",
      "microsoft-ai",
      "openai-vector-memory",
    ]) {
      for (const locale of ["en", "de"] as const) {
        await page.goto(`/${locale}/addons/${slug}/windows/`, { waitUntil: "commit" });
        await expect(page).toHaveURL(new RegExp(`/${locale}/addons/${slug}/$`));
        await expect(page.getByTestId("addon-edition-family")).toBeVisible();
        await expect(
          page.locator('[data-testid="addon-edition-card"][data-platform="windows"]'),
        ).toHaveCount(0);
      }
    }

    await page.goto("/addons/microsoft-ai/windows/", { waitUntil: "commit" });
    await expect(page).toHaveURL(/\/(en|de)\/addons\/microsoft-ai\/$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Microsoft AI" }),
    ).toBeVisible();
  });

  test("Meta exposes the published Windows and macOS editions", async ({
    page,
  }) => {
    await page.goto("/en/addons/meta/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Meta" }),
    ).toBeVisible();
    await expect(page.getByAltText("Meta", { exact: true })).toHaveAttribute(
      "src",
      "/brand-logos/meta/logo.svg",
    );

    const cards = page.getByTestId("addon-edition-card");
    await expect(cards).toHaveCount(2);
    for (const [platform, slug] of [
      ["mac", "macos"],
      ["windows", "windows"],
    ]) {
      const card = page.locator(
        `[data-testid="addon-edition-card"][data-platform="${platform}"]`,
      );
      await expect(card).toHaveCount(1);
      await expect(
        card.getByRole("link", { name: "View this edition" }),
      ).toHaveAttribute("href", `/en/addons/meta/${slug}/`);
    }

    const windowsCard = page.locator(
      '[data-testid="addon-edition-card"][data-platform="windows"]',
    );
    await expect(windowsCard.getByText("v1.2.14", { exact: true })).toBeVisible();

    const macCard = page.locator(
      '[data-testid="addon-edition-card"][data-platform="mac"]',
    );
    await expect(macCard.getByText("v1.0.0", { exact: true })).toBeVisible();

    await expect(
      page.locator('[data-testid="addon-edition-card"][data-platform="ios"]'),
    ).toHaveCount(0);

    await page.goto("/en/addons/meta/windows/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Meta for Windows" }),
    ).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/windows/plugins/com.typewhisper.meta.png"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Setup tutorial" }),
    ).toBeVisible();
    await expect(page.getByText("Muse Spark 1.2 and 1.1 for LLM workflow processing")).toBeVisible();
    await expect(page.getByText("1.2.14", { exact: true })).toBeVisible();
    await expect(page.getByText("Optional speaker diarization for both live and uploaded audio")).toBeVisible();

    await page.goto("/de/addons/meta/windows/");
    await expect(
      page.locator('img[src="/screenshots/windows/plugins/com.typewhisper.meta.de.png"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Einrichtungs-Tutorial" }),
    ).toBeVisible();

    await page.goto("/en/addons/meta/macos/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Meta for macOS" }),
    ).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/en/plugins/meta.png"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Setup tutorial" }),
    ).toBeVisible();
    await expect(page.getByText("1.0.0", { exact: true })).toBeVisible();

    await page.goto("/de/addons/meta/macos/");
    await expect(
      page.locator('img[src="/screenshots/de/plugins/meta.png"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Einrichtungs-Tutorial" }),
    ).toBeVisible();

  });

  test("cross-platform families group independent macOS and Windows editions", async ({
    page,
  }) => {
    for (const slug of [
      "authenticated-cli",
      "assemblyai",
      "cohere",
      "qwen3-asr",
      "obsidian",
      "xai-grok",
    ]) {
      await page.goto(`/de/addons/${slug}/`);

      await expect(page.getByTestId("addon-edition-family")).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 2, name: "Wähle deine Plattform" }),
      ).toBeVisible();

      const cards = page.getByTestId("addon-edition-card");
      await expect(cards).toHaveCount(2);
      await expect(
        cards.filter({ hasText: "macOS" }).getByRole("link", { name: "Diese Edition ansehen" }),
      ).toHaveAttribute("href", `/de/addons/${slug}/macos/`);
      await expect(
        cards.filter({ hasText: "Windows" }).getByRole("link", { name: "Diese Edition ansehen" }),
      ).toHaveAttribute("href", `/de/addons/${slug}/windows/`);
    }
  });

  test("PR 405 screenshots cover cross-platform and Windows-only add-ons", async ({
    page,
  }) => {
    await page.goto("/en/addons/xai-grok/windows/");
    await expect(
      page.locator('img[src="/screenshots/windows/plugins/com.typewhisper.xai.png"]'),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Optional low-latency speech output and spoken forms for numbers, abbreviations and symbols",
      ),
    ).toBeVisible();

    await page.goto("/en/addons/authenticated-cli/windows/");
    await expect(
      page.locator(
        'img[src="/screenshots/windows/plugins/com.typewhisper.authenticated-cli.png"]',
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Not available for workflows: the CLI cannot isolate tools and project context",
      ),
    ).toBeVisible();

    await page.goto("/en/addons/gemma-local/");
    await expect(
      page.locator(
        'img[src="/screenshots/windows/plugins/com.typewhisper.gemma-local.png"]',
      ),
    ).toBeVisible();
  });

  test("Windows screenshots follow the page language where a German capture exists", async ({
    page,
  }) => {
    for (const [path, id] of [
      ["/addons/xai-grok/windows/", "com.typewhisper.xai"],
      ["/addons/granite/windows/", "com.typewhisper.granite-speech"],
      ["/addons/file-memory/windows/", "com.typewhisper.file-memory"],
      ["/addons/gemma-local/", "com.typewhisper.gemma-local"],
      ["/addons/sherpa-onnx/", "com.typewhisper.sherpa-onnx"],
      ["/addons/whisper-cpp/", "com.typewhisper.whisper-cpp"],
    ]) {
      for (const [locale, suffix] of [
        ["en", ""],
        ["de", ".de"],
      ]) {
        await page.goto(`/${locale}${path}`);
        await expect(
          page.locator(
            `img[src="/screenshots/windows/plugins/${id}${suffix}.png"]`,
          ),
        ).toBeVisible();
        await expect(
          page.locator(
            `source[srcset="/screenshots/windows/plugins/${id}${suffix}.webp"]`,
          ),
        ).toHaveCount(1);
      }
    }

    await page.goto("/de/addons/cohere/");
    await expect(
      page
        .locator('[data-testid="addon-edition-card"][data-platform="windows"]')
        .locator('img[src="/screenshots/windows/plugins/com.typewhisper.cohere.de.png"]'),
    ).toBeVisible();
  });

  test("Authenticated Provider CLI documents OpenCode with localized screenshots", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const expectNoHorizontalOverflow = async () => {
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));

      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    };

    await page.goto("/en/addons/authenticated-cli/macos/");
    await expect(
      page.locator('img[src="/screenshots/en/plugins/authenticated-cli.png"]'),
    ).toBeVisible();
    await expect(
      page.locator(
        'source[srcset="/screenshots/en/plugins/authenticated-cli.webp"]',
      ),
    ).toHaveCount(1);
    await expect(page.locator("body")).toContainText(
      "Safe variants reported for the selected model become its available effort levels on macOS.",
    );
    await expect(page.getByText("1.1.0", { exact: true })).toBeVisible();
    await expectNoHorizontalOverflow();

    await page.goto("/de/addons/authenticated-cli/macos/");
    await expect(
      page.locator('img[src="/screenshots/de/plugins/authenticated-cli.png"]'),
    ).toBeVisible();
    await expect(
      page.locator(
        'source[srcset="/screenshots/de/plugins/authenticated-cli.webp"]',
      ),
    ).toHaveCount(1);
    await expectNoHorizontalOverflow();

    await page.goto("/en/addons/authenticated-cli/windows/");
    await expect(
      page.locator(
        'img[src="/screenshots/windows/plugins/com.typewhisper.authenticated-cli.png"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        'source[srcset="/screenshots/windows/plugins/com.typewhisper.authenticated-cli.webp"]',
      ),
    ).toHaveCount(1);
    await expect(page.locator("body")).toContainText(
      "OpenCode: only Zen text models that are currently fully free. A model set in the workflow takes precedence.",
    );
    await expect(page.getByText("1.3.5", { exact: true })).toBeVisible();
    await expectNoHorizontalOverflow();

    await page.goto("/de/addons/authenticated-cli/windows/");
    await expect(
      page.locator(
        'img[src="/screenshots/windows/plugins/com.typewhisper.authenticated-cli.de.png"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        'source[srcset="/screenshots/windows/plugins/com.typewhisper.authenticated-cli.de.webp"]',
      ),
    ).toHaveCount(1);
    await expectNoHorizontalOverflow();
  });

  test("Cohere documents the capabilities of each platform", async ({ page }) => {
    await page.goto("/de/addons/cohere/macos/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Cohere für macOS" }),
    ).toBeVisible();
    await expect(page.getByText("Cloud-Transkription über Cohere Transcribe")).toBeVisible();
    await expect(page.getByText("1.0.4", { exact: true })).toBeVisible();
    await expect(
      page.locator('img[src="/screenshots/de/plugins/cohere.png"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Über" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Einrichtung" }),
    ).toBeVisible();
    await expect(page.getByText("API-Key im macOS-Schlüsselbund speichern, prüfen oder entfernen", { exact: true })).toBeVisible();

    await page.getByTestId("addon-edition-switcher").locator('a[data-platform="windows"]').click();
    await expect(page).toHaveURL(/\/de\/addons\/cohere\/windows\/$/);
    await expect(page.getByText("LLM-Anbieter für Workflow-Prompts")).toBeVisible();
    await expect(page.getByText("Cohere Transcribe in 14 Sprachen")).toBeVisible();
    await expect(page.getByText("1.1.4", { exact: true })).toBeVisible();
    await expect(
      page.locator(
        'img[src="/screenshots/windows/plugins/com.typewhisper.cohere.de.png"]',
      ),
    ).toBeVisible();
    const guide = page.getByTestId("addon-edition-guide");
    await expect(guide).toBeVisible();
    await expect(
      guide.getByRole("heading", { level: 2, name: "Anleitung für diese Edition" }),
    ).toBeVisible();
    await expect(
      guide.getByRole("heading", { level: 3, name: "Einrichtung" }),
    ).toBeVisible();
    await expect(
      guide.getByRole("heading", { level: 3, name: "In der Praxis" }),
    ).toBeVisible();
    await expect(guide.getByText("LLM", { exact: true })).toHaveCount(2);
    await expect(page.getByText("macOS-Schlüsselbund")).toHaveCount(0);
  });

  test("the generated Windows guide names providers and action targets as the app does", async ({
    page,
  }) => {
    const guide = page.getByTestId("addon-edition-guide");

    // Discover plugins and the provider pickers list Voxtral as Mistral.
    await page.goto("/en/addons/voxtral/windows/");
    await expect(guide).toContainText("install Voxtral, which is listed there as Mistral");
    await expect(guide).toContainText("Under Settings > Dictation, select Mistral as the Provider");
    await expect(guide).toContainText("In a workflow, select Mistral as the Provider");
    await expect(guide).not.toContainText("select Voxtral");

    // Granite's provider has a name of its own, in the app's language.
    await page.goto("/de/addons/granite/windows/");
    await expect(guide).toContainText(
      "Wähle unter Einstellungen > Diktat Lokal (Granite Speech) als Anbieter und dann ein Modell.",
    );

    // An action target is listed under the name of its action.
    await page.goto("/en/addons/linear/windows/");
    await expect(guide).toContainText(
      "Create or open a workflow and choose Create Linear issue under Action Target.",
    );
    await page.goto("/de/addons/file-memory/windows/");
    await expect(guide).toContainText("wähle unter Aktionsziel In File Memory merken.");
    await expect(guide).not.toContainText("Action-Ziel");

    // Smallest AI's Spoken feedback step comes from the guide only once.
    await page.goto("/en/addons/smallest-pulse/windows/");
    await expect(guide.locator("li", { hasText: "Spoken feedback" })).toHaveCount(1);
    await expect(guide).toContainText("choose a voice from Smallest AI under Voice");
  });

  test("edition switch keeps platform-specific metadata and content separate", async ({
    page,
  }) => {
    await page.goto("/de/addons/obsidian/macos/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Obsidian für macOS" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "TypeWhisper 1.8.0 oder neuer · macOS 14.0 oder neuer",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByAltText("Einstellungen von Obsidian in TypeWhisper für macOS", {
        exact: true,
      }),
    ).toBeVisible();
    // The specific caption says more than the alternative text and stays readable.
    await expect(
      page.locator("figcaption", { hasText: "Die macOS-Edition erkennt vorhandene Vaults" }),
    ).not.toHaveAttribute("aria-hidden", "true");

    const switcher = page.getByTestId("addon-edition-switcher");
    await expect(switcher.locator('a[data-platform="mac"]')).toHaveAttribute(
      "aria-current",
      "page",
    );

    await switcher.locator('a[data-platform="windows"]').click();
    await expect(page).toHaveURL(/\/de\/addons\/obsidian\/windows\/$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Obsidian für Windows" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Einstellungen der Windows-Edition" }),
    ).toBeVisible();
    await expect(page.getByText("Auto-Export für jede Transkription")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Windows Quellcode" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/TypeWhisper/typewhisper-win/tree/main/plugins/TypeWhisper.Plugin.Obsidian",
    );
  });

  test("English editions render and edition pages stay inside a mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const path of [
      "/en/addons/obsidian/",
      "/en/addons/obsidian/macos/",
      "/en/addons/obsidian/windows/",
    ]) {
      await page.goto(path);

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));

      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    }

    await expect(
      page.getByRole("heading", { level: 1, name: "Obsidian for Windows" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Settings in the Windows edition" }),
    ).toBeVisible();
  });
});
