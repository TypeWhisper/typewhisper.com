import { expect, test } from "@playwright/test";

test.describe("add-on platform editions", () => {
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
        cards.filter({ hasText: "macOS" }).getByRole("link"),
      ).toHaveAttribute("href", `/de/addons/${slug}/macos`);
      await expect(
        cards.filter({ hasText: "Windows" }).getByRole("link"),
      ).toHaveAttribute("href", `/de/addons/${slug}/windows`);
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
        "Low-latency and text-normalization controls for speech output",
      ),
    ).toBeVisible();

    await page.goto("/en/addons/authenticated-cli/windows/");
    await expect(
      page.locator(
        'img[src="/screenshots/windows/plugins/com.typewhisper.authenticated-cli.png"]',
      ),
    ).toBeVisible();
    await expect(
      page.getByText("Status preview only; workflow processing remains disabled"),
    ).toBeVisible();

    await page.goto("/en/addons/gemma-local/");
    await expect(
      page.locator(
        'img[src="/screenshots/windows/plugins/com.typewhisper.gemma-local.png"]',
      ),
    ).toBeVisible();
  });

  test("Cohere documents different capabilities on each platform", async ({ page }) => {
    await page.goto("/de/addons/cohere/macos/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Cohere für macOS" }),
    ).toBeVisible();
    await expect(page.getByText("Cloudbasierte Sprach-zu-Text-Verarbeitung")).toBeVisible();
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
    await expect(page.getByText("Sichere Speicherung des API-Schlüssels im macOS-Schlüsselbund")).toBeVisible();

    await page.getByTestId("addon-edition-switcher").locator('a[data-platform="windows"]').click();
    await expect(page).toHaveURL(/\/de\/addons\/cohere\/windows\/?$/);
    await expect(page.getByText("LLM-Anbieter für Workflow-Prompts")).toBeVisible();
    await expect(page.getByText("Cloudbasierte Sprach-zu-Text-Verarbeitung")).toHaveCount(0);
    await expect(page.getByText("1.0.0", { exact: true })).toBeVisible();
    await expect(
      page.locator(
        'img[src="/screenshots/windows/plugins/com.typewhisper.cohere.png"]',
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

  test("edition switch keeps platform-specific metadata and content separate", async ({
    page,
  }) => {
    await page.goto("/de/addons/obsidian/macos/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Obsidian für macOS" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "TypeWhisper 1.6.0 oder neuer · macOS 14.0 oder neuer",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(page.getByAltText("Obsidian-Einstellungen der macOS-Edition")).toBeVisible();

    const switcher = page.getByTestId("addon-edition-switcher");
    await expect(switcher.locator('a[data-platform="mac"]')).toHaveAttribute(
      "aria-current",
      "page",
    );

    await switcher.locator('a[data-platform="windows"]').click();
    await expect(page).toHaveURL(/\/de\/addons\/obsidian\/windows\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Obsidian für Windows" }),
    ).toBeVisible();
    await expect(page.getByText("Einstellungen der Windows-Edition")).toBeVisible();
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
    await expect(page.getByText("Settings in the Windows edition")).toBeVisible();
  });
});
