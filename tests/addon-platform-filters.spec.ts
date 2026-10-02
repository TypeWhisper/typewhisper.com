import { expect, test } from "@playwright/test";
import { requiresNewerHost } from "../src/lib/addon-compatibility";
import { readAddonCatalog } from "./helpers/addon-catalog";
import { readFeedVersion } from "./helpers/current-versions";

test("combined filters use the selected platform's capabilities", async ({ page }) => {
  const card = (slug: string) => page.locator(`[data-testid="addon-card"][data-slug="${slug}"]`);

  await page.goto("/en/addons/?platform=windows&category=transcription");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card("gemini")).toBeVisible();
  await expect(card("openrouter")).toBeVisible();
  await expect(card("cohere")).toHaveCount(0);
  await expect(card("fireworks")).toHaveCount(0);
  await expect(card("whisperkit")).toHaveCount(0);

  await page.goto("/en/addons/?platform=windows&category=llm");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card("cohere")).toBeVisible();
  await expect(card("fireworks")).toBeVisible();
  await expect(card("cohere").getByText("Transcription", { exact: true })).toHaveCount(0);
  await expect(card("cohere").getByText("macOS", { exact: true })).toHaveCount(0);

  await page.goto("/de/addons/?platform=mac&category=transcription");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card("cohere")).toBeVisible();
  await expect(card("whisperkit")).toBeVisible();
  await expect(card("cohere").getByText("LLM", { exact: true })).toHaveCount(0);

  await page.goto("/en/addons/?platform=windows&category=tts");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card("openai")).toBeVisible();
  await expect(card("soniox")).toHaveCount(0);
});

test("published add-ons that require a newer host explain compatibility", async ({ page }) => {
  await page.goto("/en/addons/web-link/");
  const requirement = page.getByTestId("addon-host-requirement");
  // Web Link needs 1.7.0. The notice shows only while the stable release is older.
  if (requiresNewerHost("1.7.0", readFeedVersion("mac"))) {
    await expect(requirement).toContainText("TypeWhisper 1.7.0");
    await expect(requirement.getByRole("link")).toHaveAttribute("href", "/en/release-status/");
  } else {
    await expect(requirement).toHaveCount(0);
  }
  await expect(page.getByText("TypeWhisper 1.7.0 or newer").first()).toBeVisible();

  const shot = page.locator('img[src="/screenshots/en/plugins/web-link.png"]');
  await expect(shot).toBeVisible();
  // Web Link describes its capture itself instead of using the template.
  const shotText =
    "Web Link Transcription settings in TypeWhisper for macOS: the helper tools yt-dlp and ffmpeg were found and are ready";
  await expect(shot).toHaveAttribute("alt", shotText);
  await expect(
    page.locator('source[srcset="/screenshots/en/plugins/web-link.webp"]'),
  ).toHaveCount(1);
  const caption = page.locator("figcaption", { hasText: `${shotText}.` });
  await expect(caption).toBeVisible();
  await expect(caption).toHaveAttribute("aria-hidden", "true");

  await page.goto("/de/addons/web-link/");
  const germanShot = page.locator('img[src="/screenshots/de/plugins/web-link.png"]');
  await expect(germanShot).toBeVisible();
  await expect(germanShot).toHaveAttribute(
    "alt",
    "Einstellungen von Web Link Transcription in TypeWhisper für macOS: Die Hilfsprogramme yt-dlp und ffmpeg wurden gefunden und sind bereit",
  );
  await expect(
    page.locator('source[srcset="/screenshots/de/plugins/web-link.webp"]'),
  ).toHaveCount(1);
});

test("Vercel AI Gateway has a source-checked macOS page in both locales", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  const expectNoHorizontalOverflow = async () => {
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));

    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  };
  const needsNewerHost = requiresNewerHost("1.7.0", readFeedVersion("mac"));

  await page.goto("/en/addons/vercel-ai-gateway/");
  await expect(page).toHaveTitle("Vercel AI Gateway - TypeWhisper Add-ons");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Cloud transcription and LLM workflows through Vercel AI Gateway with one API key, model catalogs, pricing, and credit balance.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.typewhisper.com/en/addons/vercel-ai-gateway/",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Vercel AI Gateway" }),
  ).toBeVisible();
  // One platform, so the page is the guide itself and has no edition cards.
  await expect(page.getByTestId("addon-edition-card")).toHaveCount(0);

  const requirement = page.getByTestId("addon-host-requirement");
  if (needsNewerHost) {
    await expect(requirement).toContainText("TypeWhisper 1.7.0");
    await expect(requirement.getByRole("link")).toHaveAttribute("href", "/en/release-status/");
  } else {
    await expect(requirement).toHaveCount(0);
  }
  await expect(page.getByText("TypeWhisper 1.7.0 or newer").first()).toBeVisible();

  const shot = page.locator('img[src="/screenshots/en/plugins/vercel-ai-gateway.png"]');
  await expect(shot).toBeVisible();
  await expect(shot).toHaveAttribute(
    "alt",
    "Vercel AI Gateway settings in TypeWhisper for macOS",
  );
  await expect(
    page.locator('source[srcset="/screenshots/en/plugins/vercel-ai-gateway.webp"]'),
  ).toHaveCount(1);

  await expect(
    page.getByRole("heading", { level: 2, name: "Cloud processing and privacy" }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    "Audio and workflow text leave your Mac when you use it.",
  );
  await expect(page.locator("body")).toContainText(
    "It does not stream partial text while you speak.",
  );
  await expect(page.getByRole("link", { name: "Release 1.0.0" })).toHaveAttribute(
    "href",
    "https://github.com/TypeWhisper/typewhisper-mac/releases/tag/plugin-vercel-ai-gateway-v1.0.0",
  );
  await expect(page.getByRole("link", { name: "Source Code" })).toHaveAttribute(
    "href",
    "https://github.com/TypeWhisper/typewhisper-mac/tree/main/TypeWhisperPluginSDK/Plugins/VercelAIGatewayPlugin",
  );
  await expectNoHorizontalOverflow();

  await page.goto("/de/addons/vercel-ai-gateway/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Cloud-Transkription und LLM-Workflows über Vercel AI Gateway mit einem API-Key, Modellkatalogen, Preisanzeige und Guthaben.",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Vercel AI Gateway" }),
  ).toBeVisible();
  if (needsNewerHost) {
    await expect(requirement.getByRole("link")).toHaveAttribute("href", "/de/release-status/");
  } else {
    await expect(requirement).toHaveCount(0);
  }
  await expect(page.getByText("TypeWhisper 1.7.0 oder neuer").first()).toBeVisible();
  await expect(
    page.locator('img[src="/screenshots/de/plugins/vercel-ai-gateway.png"]'),
  ).toHaveAttribute(
    "alt",
    "Einstellungen von Vercel AI Gateway in TypeWhisper für macOS",
  );
  await expect(
    page.getByRole("heading", { level: 2, name: "Cloud-Verarbeitung und Datenschutz" }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    "Audio und Workflow-Text verlassen deinen Mac, wenn du ihn nutzt.",
  );
  await expectNoHorizontalOverflow();
});

test("Vercel AI Gateway follows the category, platform, source, and search filters", async ({ page }) => {
  const card = page.locator('[data-testid="addon-card"][data-slug="vercel-ai-gateway"]');

  for (const category of ["transcription", "llm"]) {
    await page.goto(`/en/addons/?platform=mac&category=${category}&source=official`);
    await expect(page.getByTestId("featured-addons")).toHaveCount(0);
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("href", "/en/addons/vercel-ai-gateway/");
    await expect(card.getByText("macOS", { exact: true })).toBeVisible();
    await expect(card.getByText("Marketplace", { exact: true })).toBeVisible();
  }

  // The featured group leaves once the filters of the URL are applied.
  for (const [query, shown] of [
    ["platform=windows&category=llm", "openrouter"],
    ["category=tts", "openai"],
    ["source=community", "mempalace"],
  ]) {
    await page.goto(`/en/addons/?${query}`);
    await expect(page.getByTestId("featured-addons")).toHaveCount(0);
    await expect(
      page.locator(`[data-testid="addon-card"][data-slug="${shown}"]`),
    ).toBeVisible();
    await expect(card).toHaveCount(0);
  }

  await page.goto("/de/addons/?q=vercel");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(page.getByTestId("addons-search")).toHaveValue("vercel");
  const cards = page.getByTestId("addon-card");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toHaveAttribute("href", "/de/addons/vercel-ai-gateway/");
});

test("Canary ASR has a source-checked macOS page in both locales", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  const expectNoHorizontalOverflow = async () => {
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));

    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  };
  const needsNewerHost = requiresNewerHost("1.7.0", readFeedVersion("mac"));

  await page.goto("/en/addons/canary-asr/");
  await expect(page).toHaveTitle("Canary ASR - TypeWhisper Add-ons");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Local Canary speech recognition on Apple silicon, with the Sophea model for Greek and English and import of compatible models.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.typewhisper.com/en/addons/canary-asr/",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Canary ASR" }),
  ).toBeVisible();
  // One platform, so the page is the guide itself and has no edition cards.
  await expect(page.getByTestId("addon-edition-card")).toHaveCount(0);
  await expect(page.locator(".addon-head__meta").getByText("Marketplace", { exact: true })).toBeVisible();

  const requirement = page.getByTestId("addon-host-requirement");
  if (needsNewerHost) {
    await expect(requirement).toContainText("TypeWhisper 1.7.0");
    await expect(requirement.getByRole("link")).toHaveAttribute("href", "/en/release-status/");
  } else {
    await expect(requirement).toHaveCount(0);
  }
  await expect(page.getByText("TypeWhisper 1.7.0 or newer").first()).toBeVisible();

  const shot = page.locator('img[src="/screenshots/en/plugins/canary-asr.png"]');
  await expect(shot).toBeVisible();
  await expect(shot).toHaveAttribute(
    "alt",
    "Canary ASR settings in TypeWhisper for macOS: a field for the optional Hugging Face token and the model Sophea Canary with a Download & Load button",
  );
  await expect(
    page.locator('source[srcset="/screenshots/en/plugins/canary-asr.webp"]'),
  ).toHaveCount(1);

  await expect(
    page.getByRole("heading", { level: 2, name: "Local processing and privacy" }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    "The add-on sends no audio and no text to a cloud service.",
  );
  await expect(page.locator("body")).toContainText(
    "It does not stream partial text while you speak.",
  );
  await expect(page.locator("body")).toContainText("KIEFERSA/Sophea-Canary-ASR-mlx");
  await expect(
    page.getByRole("link", { name: "Local Models (sherpa-onnx)" }),
  ).toHaveAttribute("href", "/en/addons/sherpa-onnx/");
  await expect(page.getByRole("link", { name: "Release 1.0.1" })).toHaveAttribute(
    "href",
    "https://github.com/TypeWhisper/typewhisper-mac/releases/tag/plugin-canary-v1.0.1",
  );
  await expect(page.getByRole("link", { name: "Source Code" })).toHaveAttribute(
    "href",
    "https://github.com/TypeWhisper/typewhisper-mac/tree/main/TypeWhisperPluginSDK/Plugins/CanaryPlugin",
  );
  await expectNoHorizontalOverflow();

  await page.goto("/de/addons/canary-asr/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Lokale Canary-Spracherkennung auf Apple Silicon, mit dem Modell Sophea für Griechisch und Englisch und dem Import kompatibler Modelle.",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Canary ASR" }),
  ).toBeVisible();
  if (needsNewerHost) {
    await expect(requirement.getByRole("link")).toHaveAttribute("href", "/de/release-status/");
  } else {
    await expect(requirement).toHaveCount(0);
  }
  await expect(page.getByText("TypeWhisper 1.7.0 oder neuer").first()).toBeVisible();
  const germanShot = page.locator('img[src="/screenshots/de/plugins/canary-asr.png"]');
  await expect(germanShot).toBeVisible();
  await expect(germanShot).toHaveAttribute(
    "alt",
    "Einstellungen von Canary ASR in TypeWhisper für macOS: ein Feld für das optionale Hugging-Face-Token und das Modell Sophea Canary mit der Schaltfläche „Laden & Aktivieren“",
  );
  await expect(
    page.locator('source[srcset="/screenshots/de/plugins/canary-asr.webp"]'),
  ).toHaveCount(1);
  await expect(
    page.getByRole("heading", { level: 2, name: "Lokale Verarbeitung und Datenschutz" }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    "Das Add-on sendet weder Audio noch Text an einen Cloud-Dienst.",
  );
  await expect(
    page.getByRole("link", { name: "Lokale Modelle (sherpa-onnx)" }),
  ).toHaveAttribute("href", "/de/addons/sherpa-onnx/");
  await expectNoHorizontalOverflow();
});

test("Canary ASR follows the category, platform, source, and search filters", async ({ page }) => {
  const card = page.locator('[data-testid="addon-card"][data-slug="canary-asr"]');

  await page.goto("/en/addons/?platform=mac&category=transcription&source=official");
  await expect(page.getByTestId("featured-addons")).toHaveCount(0);
  await expect(card).toBeVisible();
  await expect(card).toHaveAttribute("href", "/en/addons/canary-asr/");
  await expect(card.getByText("macOS", { exact: true })).toBeVisible();
  await expect(card.getByText("Marketplace", { exact: true })).toBeVisible();

  // macOS only: Windows has Canary as a model of the sherpa-onnx add-on.
  for (const [query, shown] of [
    ["platform=windows&category=transcription", "sherpa-onnx"],
    ["category=llm", "openai"],
    ["source=community", "mempalace"],
  ]) {
    await page.goto(`/en/addons/?${query}`);
    await expect(page.getByTestId("featured-addons")).toHaveCount(0);
    await expect(
      page.locator(`[data-testid="addon-card"][data-slug="${shown}"]`),
    ).toBeVisible();
    await expect(card).toHaveCount(0);
  }

  await page.goto("/de/addons/?q=sophea");
  await expect(page.getByTestId("addons-search")).toHaveValue("sophea");
  const cards = page.getByTestId("addon-card");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toHaveAttribute("href", "/de/addons/canary-asr/");
});

test("every logo of the add-on index loads in both themes", async ({ page }) => {
  const catalog = readAddonCatalog();

  for (const theme of ["dark", "light"] as const) {
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/en/addons/");
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
    const list = page.locator(".addon-index:not(.addon-index--featured)");
    await expect(list.getByTestId("addon-card")).toHaveCount(catalog.length);

    const marks = await list.locator(".site-index__mark").evaluateAll(async (tiles) => {
      const result = [];
      for (const tile of tiles) {
        const images = [...tile.querySelectorAll("img")];
        const shown = images.filter((image) => getComputedStyle(image).display !== "none");
        // Lazy loading and decoding must not hide a file the server does not deliver.
        await Promise.all(
          shown.map((image) => {
            image.loading = "eager";
            return image.decode().catch(() => undefined);
          }),
        );
        result.push({
          slug: tile.closest<HTMLElement>("[data-slug]")?.dataset.slug,
          images: images.length,
          shown: shown.length,
          loaded: shown.every((image) => image.complete && image.naturalWidth > 0),
          icon: tile.querySelector("svg") !== null,
        });
      }
      return result;
    });

    for (const mark of marks) {
      // A tile holds one visible logo or one icon, never an empty frame.
      expect(mark.images > 0 ? mark.shown : Number(mark.icon), mark.slug).toBe(1);
      expect(mark.loaded, `${mark.slug} (${theme})`).toBe(true);
    }
  }
});

test("utility categories remain consistent across platform filters", async ({ page }) => {
  for (const platform of ["all", "mac", "windows"]) {
    await page.goto(`/en/addons/?platform=${platform}&category=utility`);
    for (const slug of ["live-transcript", "webhook"]) {
      const card = page.locator(`[data-testid="addon-card"][data-slug="${slug}"]`);
      await expect(card).toBeVisible();
      await expect(card.getByText("Utility", { exact: true })).toBeVisible();
    }
  }
});

test("the Vercel logo follows the theme on the index and the detail page", async ({ page }) => {
  const logo = (theme: "light" | "dark") =>
    page.locator(`img[src="/brand-logos/vercel/logo-${theme}.svg"]`);

  for (const path of ["/en/addons/?q=vercel", "/de/addons/vercel-ai-gateway/"]) {
    for (const theme of ["dark", "light"] as const) {
      const other = theme === "dark" ? "light" : "dark";
      await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
      await page.goto(path);
      await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
      await expect(logo(theme).first()).toBeVisible();
      await expect(logo(other).first()).toBeHidden();

      // The triangle keeps its shape, its corners, and room inside the tile.
      const mark = await logo(theme).first().evaluate((img) => {
        const tile = img.closest(".site-index__mark")!.getBoundingClientRect();
        const box = img.getBoundingClientRect();
        const style = getComputedStyle(img);
        return {
          fit: style.objectFit,
          radius: style.borderTopLeftRadius,
          filter: style.filter,
          space: Math.min(box.left - tile.left, tile.right - box.right),
        };
      });
      expect(mark.fit).toBe("contain");
      expect(mark.radius).toBe("0px");
      expect(mark.filter).toBe("none");
      expect(mark.space).toBeGreaterThanOrEqual(8);
    }
  }
});

test("the source filter offers marketplace and community", async ({ page }) => {
  const catalog = readAddonCatalog();
  const official = catalog.filter((addon) => addon.source === "official");
  const cards = page.getByTestId("addon-card");
  const list = page.locator(".addon-index:not(.addon-index--featured)");
  const card = (slug: string) =>
    list.locator(`[data-testid="addon-card"][data-slug="${slug}"]`);
  const chip = (value: string) => page.locator(`[data-filter-value="${value}"]`);

  await page.goto("/en/addons/");
  const sourceRow = page.getByRole("group", { name: "Source" });
  await expect(sourceRow.getByRole("button")).toHaveText([
    "All Sources",
    "Marketplace",
    "Community",
  ]);
  await expect(chip("built-in")).toHaveCount(0);
  // Apple Speech is part of the app and says so, without a filter of its own.
  await expect(card("apple-speech").getByText("Built in", { exact: true })).toBeVisible();

  await page.goto("/en/addons/?source=official");
  await expect(chip("official")).toHaveText("Marketplace");
  await expect(chip("official")).toHaveAttribute("aria-pressed", "true");
  await expect(cards).toHaveCount(official.length);
  for (const slug of ["whisperkit", "parakeet", "openai", "whisper-cpp", "vercel-ai-gateway"]) {
    await expect(card(slug).getByText("Marketplace", { exact: true })).toBeVisible();
  }
  await expect(card("apple-speech")).toHaveCount(0);

  await page.goto("/en/addons/?source=community");
  await expect(chip("community")).toHaveText("Community");
  await expect(cards).toHaveCount(
    catalog.filter((addon) => addon.source === "community").length,
  );
  await expect(card("mempalace")).toBeVisible();

  // Combined with a platform, an add-on matches the source it has there.
  for (const platform of ["windows", "mac"]) {
    await page.goto(`/en/addons/?platform=${platform}&source=official`);
    await expect(cards).toHaveCount(
      official.filter((addon) => addon.platforms.includes(platform)).length,
    );
  }

  await page.goto("/de/addons/");
  await expect(
    page.getByRole("group", { name: "Quelle" }).getByRole("button"),
  ).toHaveText(["Alle Quellen", "Marketplace", "Community"]);
  await expect(chip("built-in")).toHaveCount(0);
  await expect(card("apple-speech").getByText("Eingebaut", { exact: true })).toBeVisible();

  for (const path of ["/en/addons/", "/de/addons/"]) {
    await page.goto(path);
    await expect(cards.first()).toBeVisible();
    await expect(page.getByText(/^(Bundled|Mitgeliefert)$/)).toHaveCount(0);
  }
});

test("links with a retired source show all sources and lose the parameter", async ({ page }) => {
  const catalog = readAddonCatalog();
  const list = page.locator(".addon-index:not(.addon-index--featured)");
  const listed = list.getByTestId("addon-card");
  const allSources = (name: string) =>
    page.getByRole("group", { name }).locator('[data-filter-value="all"]');

  for (const value of ["built-in", "bundled"]) {
    await page.goto(`/en/addons/?source=${value}`);
    await expect(allSources("Source")).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("featured-addons")).toBeVisible();
    await expect(listed).toHaveCount(catalog.length);
    await expect(
      list.locator('[data-testid="addon-card"][data-slug="apple-speech"]'),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/en\/addons\/$/);

    // The other filters of the link stay.
    await page.goto(`/de/addons/?platform=mac&source=${value}&q=speech`);
    await expect(allSources("Quelle")).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[data-filter-value="mac"]')).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByTestId("addons-search")).toHaveValue("speech");
    await expect(
      list.locator('[data-testid="addon-card"][data-slug="apple-speech"]'),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/de\/addons\/\?platform=mac&q=speech$/);
  }
});

test("detail and edition pages name the source of the add-on", async ({ page }) => {
  const meta = page.locator(".addon-head__meta");

  await page.goto("/en/addons/apple-speech/");
  await expect(meta.getByText("Built in", { exact: true })).toBeVisible();
  await page.goto("/de/addons/apple-speech/");
  await expect(meta.getByText("Eingebaut", { exact: true })).toBeVisible();

  for (const path of [
    "/en/addons/whisperkit/",
    "/en/addons/openai/",
    "/en/addons/openai/macos/",
    "/en/addons/openai/windows/",
    "/de/addons/whisper-cpp/",
  ]) {
    await page.goto(path);
    await expect(meta.getByText("Marketplace", { exact: true })).toBeVisible();
    await expect(meta.getByText(/Bundled|Mitgeliefert|Built in|Eingebaut/)).toHaveCount(0);
  }

  await page.goto("/de/addons/mempalace/");
  await expect(meta.getByText("Community", { exact: true })).toBeVisible();
});
