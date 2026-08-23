import { expect, test, type Page } from "@playwright/test";

async function waitForHeaderHydration(page: Page) {
  await page.waitForFunction(() => {
    const islands = Array.from(
      document.querySelectorAll("astro-island"),
    ) as HTMLElement[];
    const target = islands.find((el) =>
      (el.getAttribute("component-export") ?? "") === "Header",
    );
    return target !== undefined && !target.hasAttribute("ssr");
  });
}

async function prepareThemeSession(page: Page, theme: "dark" | "light") {
  await page.emulateMedia({ colorScheme: theme });
  await page.addInitScript((storedTheme) => {
    window.localStorage.setItem("theme", storedTheme);
  }, theme);
}

async function waitForAddonsHydration(page: Page) {
  await page.waitForFunction(() => {
    const islands = Array.from(
      document.querySelectorAll("astro-island"),
    ) as HTMLElement[];
    const target = islands.find((el) =>
      (el.getAttribute("component-url") ?? "").includes("addons/_index"),
    );
    return target !== undefined && !target.hasAttribute("ssr");
  });
}

test.describe("header download CTA", () => {
  test("download CTA is visible on the landing page", async ({ page }) => {
    await page.goto("/en/");
    await waitForHeaderHydration(page);
    await expect(page.getByTestId("header-download")).toBeVisible();
  });

  test("download CTA is visible on non-landing pages", async ({ page }) => {
    await page.goto("/en/docs");
    await waitForHeaderHydration(page);
    await expect(page.getByTestId("header-download")).toBeVisible();
  });
});

test.describe("social proof on landing", () => {
  test("social proof renders on the landing page", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.getByTestId("social-proof")).toBeVisible();
  });
});

test.describe("docs platform logos", () => {
  test("docs landing uses dedicated platform logos for macOS and iOS", async ({
    page,
  }) => {
    await page.goto("/en/docs");
    await expect(page.locator('[data-platform-logo="macos"]').first()).toBeVisible();
    await expect(page.locator('[data-platform-logo="ios"]').first()).toBeVisible();
  });
});

test.describe("brand logos", () => {
  test("addons overview uses a local brand logo asset for Linear", async ({
    page,
  }) => {
    await page.goto("/en/addons");
    await expect(page.getByTestId("featured-addons")).toBeVisible();

    const linearCard = page.locator('[data-testid="addon-card"][data-slug="linear"]').first();
    await expect(linearCard).toBeVisible();
    await expect(
      linearCard.locator('img[src^="/brand-logos/linear/logo"]'),
    ).toBeVisible();
  });

  test("addon detail uses a local brand logo asset for Linear", async ({
    page,
  }) => {
    await page.goto("/en/addons/linear");
    await expect(
      page.locator('img[src^="/brand-logos/linear/logo"]'),
    ).toBeVisible();
  });

  test("header uses theme-aware local brand assets for GitHub without external svgl requests", async ({
    page,
  }) => {
    const svglRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("svgl.app")) {
        svglRequests.push(request.url());
      }
    });

    await prepareThemeSession(page, "dark");
    await page.goto("/en/");
    await waitForHeaderHydration(page);

    const githubLink = page.getByLabel("GitHub").first();
    await expect(
      githubLink.locator('img[src="/brand-logos/github/logo-dark.svg"]'),
    ).toBeVisible();
    await expect(
      githubLink.locator('img[src="/brand-logos/github/logo-light.svg"]'),
    ).not.toBeVisible();

    await page.getByTestId("theme-toggle").click();
    await expect(
      githubLink.locator('img[src="/brand-logos/github/logo-light.svg"]'),
    ).toBeVisible();
    await expect(
      githubLink.locator('img[src="/brand-logos/github/logo-dark.svg"]'),
    ).not.toBeVisible();

    expect(svglRequests).toEqual([]);
  });

  test("header keeps Discord and Ko-fi on custom monochrome icons", async ({
    page,
  }) => {
    await page.goto("/en/");
    await waitForHeaderHydration(page);

    const discordLink = page.getByLabel("Discord").first();
    await expect(
      discordLink.locator('img[src^="/brand-logos/discord/"]'),
    ).toHaveCount(0);
    await expect(discordLink.locator("svg")).toBeVisible();

    const sponsorLink = page.getByLabel(/sponsor/i).first();
    await expect(
      sponsorLink.locator('img[src^="/brand-logos/kofi/"]'),
    ).toHaveCount(0);
    await expect(sponsorLink.locator("svg")).toBeVisible();
  });
});

test.describe("addons search", () => {
  test("Filler Words addon exposes both platform editions in both locales", async ({
    page,
  }) => {
    const locales = [
      {
        code: "en",
        search: "filler",
        macHeading: "Filler Words for macOS",
        detailText: "Filler Words removes configurable filler words",
        macScreenshotAlt: "Filler Words macOS settings",
        windowsHeading: "Filler Words for Windows",
        windowsDescription:
          "Locally removes configurable English, German, and Japanese filler words from transcriptions.",
        windowsScreenshotAlt: "Filler Words Windows settings",
      },
      {
        code: "de",
        search: "füll",
        macHeading: "Filler Words für macOS",
        detailText: "Filler Words entfernt konfigurierbare Füllwörter",
        macScreenshotAlt: "Filler Words macOS Einstellungen",
        windowsHeading: "Filler Words für Windows",
        windowsDescription:
          "Entfernt konfigurierbare englische, deutsche und japanische Füllwörter lokal aus Transkriptionen.",
        windowsScreenshotAlt: "Filler Words Windows Einstellungen",
      },
    ] as const;

    for (const locale of locales) {
      await page.goto(`/${locale.code}/addons`);
      await waitForAddonsHydration(page);

      const search = page.getByTestId("addons-search");
      await search.fill(locale.search);

      const fillerWordsCard = page.locator(
        '[data-testid="addon-card"][data-slug="filler-words"]',
      );
      await expect(fillerWordsCard).toBeVisible();
      await expect(fillerWordsCard).toContainText("Filler Words");

      await page.goto(`/${locale.code}/addons/filler-words`);
      await expect(
        page.getByRole("heading", { level: 1, name: "Filler Words" }),
      ).toBeVisible();
      await expect(page.getByText("macOS").first()).toBeVisible();
      await expect(page.getByText("Windows").first()).toBeVisible();
      await expect(page.getByTestId("addon-edition-card")).toHaveCount(2);

      await page.goto(`/${locale.code}/addons/filler-words/macos`);
      await expect(
        page.getByRole("heading", { level: 1, name: locale.macHeading }),
      ).toBeVisible();
      await expect(page.getByText(locale.detailText).first()).toBeVisible();
      await expect(page.getByAltText(locale.macScreenshotAlt)).toBeVisible();

      await page.goto(`/${locale.code}/addons/filler-words/windows`);
      await expect(
        page.getByRole("heading", { level: 1, name: locale.windowsHeading }),
      ).toBeVisible();
      await expect(page.getByText(locale.windowsDescription).first()).toBeVisible();
      await expect(page.getByAltText(locale.windowsScreenshotAlt)).toBeVisible();
    }
  });

  test("Smallest Pulse addon appears in both locales", async ({ page }) => {
    const locales = [
      {
        code: "en",
        search: "smallest",
        macHeading: "Smallest Pulse for macOS",
        macDescription:
          "Cloud transcription through the Smallest AI Pulse API with a selectable language mode.",
        languageModeText: "Selectable language mode",
        windowsHeading: "Smallest Pulse for Windows",
        windowsDescription:
          "Cloud transcription through the Smallest AI Pulse API.",
      },
      {
        code: "de",
        search: "smallest",
        macHeading: "Smallest Pulse für macOS",
        macDescription:
          "Cloud-Transkription über die Smallest AI Pulse API mit wählbarem Sprachmodus.",
        languageModeText: "Wählbarer Sprachmodus",
        windowsHeading: "Smallest Pulse für Windows",
        windowsDescription:
          "Cloud-Transkription über die Smallest AI Pulse API.",
      },
    ] as const;

    for (const locale of locales) {
      await page.goto(`/${locale.code}/addons`);
      await waitForAddonsHydration(page);

      const search = page.getByTestId("addons-search");
      await search.fill(locale.search);

      const smallestPulseCard = page.locator(
        '[data-testid="addon-card"][data-slug="smallest-pulse"]',
      );
      await expect(smallestPulseCard).toBeVisible();
      await expect(smallestPulseCard).toContainText("Smallest Pulse");
      await expect(
        smallestPulseCard.locator('img[src^="/brand-logos/smallest/logo"]'),
      ).toBeVisible();

      await page.goto(`/${locale.code}/addons/smallest-pulse`);
      await expect(
        page.getByRole("heading", { level: 1, name: "Smallest Pulse" }),
      ).toBeVisible();
      await expect(page.getByText("macOS").first()).toBeVisible();
      await expect(page.getByText("Windows").first()).toBeVisible();

      const editionCards = page.getByTestId("addon-edition-card");
      await expect(editionCards).toHaveCount(2);

      await page.goto(`/${locale.code}/addons/smallest-pulse/macos`);
      await expect(
        page.getByRole("heading", { level: 1, name: locale.macHeading }),
      ).toBeVisible();
      await expect(page.getByText(locale.macDescription).first()).toBeVisible();
      await expect(page.getByText(locale.languageModeText).first()).toBeVisible();
      await expect(page.getByText("com.typewhisper.smallest-pulse").first()).toBeVisible();

      await page.goto(`/${locale.code}/addons/smallest-pulse/windows`);
      await expect(
        page.getByRole("heading", { level: 1, name: locale.windowsHeading }),
      ).toBeVisible();
      await expect(page.getByText(locale.windowsDescription).first()).toBeVisible();
      await expect(page.getByText("com.typewhisper.smallest-ai").first()).toBeVisible();
    }
  });

  test("search input filters the addon cards", async ({ page }) => {
    await page.goto("/en/addons");
    await expect(page.getByTestId("featured-addons")).toBeVisible();

    // Wait for the addons React island to finish hydrating before typing.
    await waitForAddonsHydration(page);

    const cards = page.getByTestId("addon-card");
    await expect(cards.first()).toBeVisible();
    const totalCount = await cards.count();
    expect(totalCount).toBeGreaterThan(0);

    const search = page.getByTestId("addons-search");
    await search.click();
    // Poll until React handles the input. Under parallel dev-server load the
    // first keystroke can race with hydration, so we retry until the
    // controlled onChange actually fires.
    await expect
      .poll(
        async () => {
          await search.fill("");
          await search.fill("whisper");
          return page.getByTestId("featured-addons").count();
        },
        { timeout: 15000, intervals: [500, 750, 1000, 1500] },
      )
      .toBe(0);
    await expect(search).toHaveValue("whisper");

    const filteredCount = await cards.count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThan(totalCount);

    await search.fill("");
    await search.pressSequentially("not-a-real-plugin-xyz", { delay: 10 });
    await expect(cards).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /^clear all filters$/i }).last(),
    ).toBeVisible();
  });
});

test.describe("pricing & business pages", () => {
  test("/en/pricing loads and shows the hero, decision helper, and FAQ", async ({
    page,
  }) => {
    await page.goto("/en/pricing");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /open source under GPLv3/i,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: /which license/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: /questions/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: /support the project/i }),
    ).toBeVisible();
  });

  test("/en/business loads and links to /en/pricing", async ({ page }) => {
    await page.goto("/en/business");
    await expect(
      page.getByRole("heading", { level: 1, name: /typewhisper for teams/i }),
    ).toBeVisible();
    await expect(page.locator('a[href="/en/pricing"]').first()).toBeVisible();
  });

  test("/en/sponsors loads and shows the sponsorship hero", async ({ page }) => {
    await page.goto("/en/sponsors");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /keep typewhisper independent/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^discuss sponsorship$/i }),
    ).toHaveAttribute("href", /^mailto:/i);
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /where a sponsor would appear/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: /open source & accessibility initiative/i,
      }),
    ).toHaveAttribute("href", "/en/open-source-accessibility");
  });

  test("/de/sponsors loads the German sponsorship page", async ({ page }) => {
    await page.goto("/de/sponsors");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /typewhisper unabhängig/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: /open source & accessibility initiative/i,
      }),
    ).toHaveAttribute("href", "/de/open-source-accessibility");
  });

  test("/en/open-source-accessibility loads the initiative page", async ({
    page,
  }) => {
    await page.goto("/en/open-source-accessibility");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /local speech input for more accessible digital work/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /who it should help/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^discuss pilot project$/i }),
    ).toHaveAttribute("href", /^mailto:/i);
    await expect(
      page.getByRole("link", { name: /^download one-pager$/i }).first(),
    ).toHaveAttribute(
      "href",
      "/downloads/typewhisper-open-source-accessibility-one-pager-en.pdf",
    );
    await expect(
      page.locator('main img[src="/screenshots/en/mac/file-transcription.png"]'),
    ).toBeVisible();
    await expect(
      page.locator('main img[src="/screenshots/en/mac/workflows.png"]'),
    ).toBeVisible();
  });

  test("/de/open-source-accessibility loads the German initiative page", async ({
    page,
  }) => {
    await page.goto("/de/open-source-accessibility");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /lokale spracheingabe für barriereärmere digitale arbeit/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /wem es helfen soll/i,
      }),
    ).toBeVisible();
    await expect(
      page.locator('main img[src="/screenshots/de/mac/watch-folder.png"]'),
    ).toBeVisible();
    await expect(
      page.locator('main img[src="/screenshots/de/mac/rules.png"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^one-pager herunterladen$/i }).first(),
    ).toHaveAttribute(
      "href",
      "/downloads/typewhisper-open-source-accessibility-one-pager-de.pdf",
    );
  });

  test("footer exposes pricing, business, and sponsors links on non-landing pages", async ({
    page,
  }) => {
    await page.goto("/en/docs");
    await expect(
      page.locator('footer a[href="/en/pricing"]').first(),
    ).toBeVisible();
    await expect(
      page.locator('footer a[href="/en/business"]').first(),
    ).toBeVisible();
    await expect(
      page.locator('footer a[href="/en/sponsors"]').first(),
    ).toBeVisible();
    await expect(
      page.locator('footer a[href*="github.com/sponsors/"]'),
    ).toHaveCount(0);
    await expect(page.locator("footer")).toContainText(
      "With local engines, voice data stays on your device.",
    );
    await expect(page.locator("footer")).not.toContainText(
      "never leaves your device",
    );
  });

  test("header sponsor icon links to the local sponsors page", async ({
    page,
  }) => {
    await page.goto("/en/");
    await waitForHeaderHydration(page);

    await expect(page.getByLabel(/sponsor/i).first()).toHaveAttribute(
      "href",
      "/en/sponsors",
    );
  });
});
