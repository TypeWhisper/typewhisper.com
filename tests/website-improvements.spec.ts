import { test, expect } from "@playwright/test";

async function hydrated(page: import("@playwright/test").Page) {
  await expect(
    page.locator("header").locator("xpath=ancestor::astro-island"),
  ).not.toHaveAttribute("ssr", "");
}

for (const width of [320, 390, 768, 1024]) {
  test(`navigation and documentation fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/de/",
      "/de/pricing/",
      "/de/docs/mac/installation/",
    ]) {
      await page.goto(route);
      await hydrated(page);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      const menu = page.getByRole("button", { name: "Menü", exact: true });
      await expect(menu).toBeInViewport();
      await menu.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeFocused();
    }
  });
}

test("mobile menu is named, focuses its close button, and scrolls in landscape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/de/");
  await hydrated(page);
  await page.getByRole("button", { name: "Menü", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole("button", { name: "Navigation schließen" });
  await expect(close).toBeFocused();
  const box = await close.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(40);
  expect(box!.height).toBeGreaterThanOrEqual(40);

  // The last entries sit below the fold of a phone held sideways.
  const github = dialog.getByRole("link", { name: "GitHub", exact: true });
  await expect(github).not.toBeInViewport();
  await github.scrollIntoViewIfNeeded();
  await expect(github).toBeInViewport({ ratio: 1 });
  await page.keyboard.press("Shift+Tab");
  await expect(github).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
});

for (const locale of ["en", "de"]) {
  test(`${locale}: platform choice survives navigation and changes all download links`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/?platform=windows`);
    await hydrated(page);
    await page.getByTestId("landing-hero-tab-ios").click();
    for (const id of [
      "header-download",
      "landing-hero-download",
      "landing-footer-download",
    ]) {
      await expect(page.getByTestId(id)).toHaveAttribute(
        "href",
        /apps\.apple\.com/,
      );
    }
    await page.goto(`/${locale}/pricing/`);
    await expect(page.getByTestId("pricing-free-download")).toHaveAttribute(
      "href",
      /apps\.apple\.com/,
    );
    await page.reload();
    await expect(page.getByTestId("header-download")).toHaveAttribute(
      "href",
      /apps\.apple\.com/,
    );
  });

  test(`${locale}: price switch retains three matching checkouts`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/pricing/`);
    const tiers = page.getByTestId("commercial-tiers");
    await expect(
      tiers.locator('[data-checkout-billing-period="monthly"]'),
    ).toHaveCount(3);
    await expect(
      tiers.locator("xpath=ancestor::astro-island"),
    ).not.toHaveAttribute("ssr", "");
    await page.getByRole("button", { name: /Lifetime/ }).click();
    await expect(
      tiers.locator('[data-checkout-billing-period="lifetime"]'),
    ).toHaveCount(3);
    await expect(
      tiers.locator('[data-checkout-billing-period="monthly"]'),
    ).toHaveCount(0);
    await expect(tiers).toContainText("999");
  });

  test(`${locale}: add-on search survives detail, back, and reload`, async ({
    page,
  }) => {
    await page.goto(
      `/${locale}/addons/?q=OpenAI&platform=windows&category=llm`,
    );
    const search = page.getByTestId("addons-search");
    await expect(search).toHaveValue("OpenAI");
    const cards = page.getByTestId("addon-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    await cards.first().click();
    await page.goBack();
    await expect(search).toHaveValue("OpenAI");
    await expect(cards).toHaveCount(count);
    await page.reload();
    await expect(search).toHaveValue("OpenAI");
    await expect(cards).toHaveCount(count);
  });

  test(`${locale}: setup links follow platform, processing, and task`, async ({
    page,
  }) => {
    await page.goto(
      `/${locale}/setup/?platform=ios&processing=local&task=files`,
    );
    const setup = page.getByTestId("setup-assistant");
    await expect(
      setup.locator(`a[href="/${locale}/docs/ios/files-history-and-inbox"]`),
    ).toBeVisible();
    await setup.locator("select").first().selectOption("windows");
    await setup.locator("select").nth(1).selectOption("cloud");
    await expect(
      setup.locator(
        `a[href="/${locale}/addons/?platform=windows&category=transcription"]`,
      ),
    ).toBeVisible();
    await expect(
      setup.locator(`a[href="/${locale}/docs/windows/file-transcription"]`),
    ).toBeVisible();
    await page.reload();
    await expect(setup.locator("select").first()).toHaveValue("windows");
    await expect(setup.locator("select").nth(1)).toHaveValue("cloud");
    await expect(setup.locator("select").nth(2)).toHaveValue("files");
  });

  test(`${locale}: documentation search returns localized platform guides`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/docs/search/?q=WhisperKit&platform=ios`);
    const search = page.getByTestId("docs-search");
    const results = search.locator("li a");
    await expect(results.first()).toBeVisible({ timeout: 20000 });
    for (const result of await results.all())
      await expect(result).toHaveAttribute(
        "href",
        new RegExp(`/${locale}/docs/ios`),
      );
    await search.locator("input").fill("zzzauditnoresult");
    await expect(results).toHaveCount(0);
    await expect(search.getByRole("status")).toContainText("0");
  });
}

test("documentation has one main and quoted, copyable uninstall commands", async ({
  page,
}) => {
  await page.goto("/de/docs/mac/installation/");
  await expect(page.getByRole("main")).toHaveCount(1);
  const code = page
    .locator("pre code")
    .filter({ hasText: "rm -rf /Applications" });
  await expect(code).toContainText(
    '"$HOME/Library/Application Support/TypeWhisper"',
  );
  await expect(code).not.toContainText("Application\\");
  expect(await code.textContent()).toContain("\n");
});

test("search failure offers retry and recovers", async ({ page }) => {
  await page.route("**/pagefind/pagefind.js", (route) => route.abort());
  await page.goto("/en/docs/search/?q=microphone");
  const search = page.getByTestId("docs-search");
  await expect(search.getByRole("button", { name: "Try again" })).toBeVisible();
  await page.unroute("**/pagefind/pagefind.js");
  await search.getByRole("button", { name: "Try again" }).click();
  await expect(search.locator("li a").first()).toBeVisible({ timeout: 20000 });
});

for (const width of [1440, 390]) {
  test(`rendered language links preserve live choices at ${width}px`, async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/de/?platform=windows");
    await hydrated(page);
    await page.getByTestId("landing-hero-tab-ios").click();
    if (width === 390)
      await page.getByRole("button", { name: "Menü", exact: true }).click();
    const link = page.getByRole("link", { name: "English", exact: true });
    await expect(link).toHaveAttribute("href", "/en/?platform=ios");
    // Opening the href directly exercises copy/open-in-new-tab without a click handler.
    const destination = await context.newPage();
    await destination.goto((await link.getAttribute("href"))!);
    await expect(
      destination.getByTestId("landing-hero-tab-ios"),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      destination.getByRole("heading", { level: 1 }),
    ).toHaveAccessibleName("Speak. Capture. Keep moving.");
    await destination.close();

    await page.goto("/de/setup/?platform=windows&processing=cloud&task=files");
    const setup = page.getByTestId("setup-assistant");
    await expect(setup.locator("select").first()).toHaveValue("windows");
    await setup.locator("select").nth(2).selectOption("workflows");
    if (width === 390)
      await page.getByRole("button", { name: "Menü", exact: true }).click();
    await expect(link).toHaveAttribute(
      "href",
      "/en/setup/?platform=windows&processing=cloud&task=workflows",
    );
  });
}

test("search excerpts decode HTML entities as plain text", async ({ page }) => {
  await page.goto("/de/docs/search/?q=Mikrofon&platform=mac");
  const results = page.getByTestId("docs-search").locator("li");
  await expect(results.first()).toBeVisible({ timeout: 20000 });
  await expect(results.first()).toContainText(
    "Datenschutz & Sicherheit > Mikrofon",
  );
  await expect(results.first()).not.toContainText("&gt;");
});

test("footer waveform only moves while it is on screen", async ({ page }) => {
  await page.goto("/en/docs/mac/installation/");
  const wave = page.locator("[data-footer-wave]");
  const playState = () =>
    wave
      .locator(".site-footer__bar")
      .first()
      .evaluate((bar) => getComputedStyle(bar, "::before").animationPlayState);

  await expect(wave).toHaveClass(/\bis-paused\b/);
  expect(await playState()).toBe("paused");
  await wave.scrollIntoViewIfNeeded();
  await expect(wave).not.toHaveClass(/\bis-paused\b/);
  expect(await playState()).toBe("running");
});

test("the single 404 page turns German as a whole below /de/", async ({
  page,
}) => {
  // The static host serves one 404.html, rendered in English, for every
  // missing address. The dev server renders it per request, so the English
  // markup is handed out for the German address here.
  await page.route("**/de/gibt-es-nicht/", async (route) => {
    const english = await page.request.get("/en/missing/");
    await route.fulfill({
      status: 404,
      contentType: "text/html",
      body: await english.text(),
    });
  });
  await page.goto("/de/gibt-es-nicht/");
  await hydrated(page);

  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Seite nicht gefunden",
  );
  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(
    page.locator("header").getByRole("link", { name: "Preise" }),
  ).toHaveAttribute("href", "/de/pricing");
  await expect(
    page.locator("footer").getByRole("link", { name: "Datenschutz" }),
  ).toHaveAttribute("href", "/de/privacy");
  // Only the language switch still leads to the English site.
  await expect(page.locator('a[href^="/en"]')).toHaveCount(1);
  await expect(
    page.locator("header").getByRole("link", { name: "English" }),
  ).toHaveAttribute("href", /^\/en\//);
});

test("platform switch stays inside the gutters at 320px and wraps with large text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/de/");
  const platforms = page.getByRole("group", { name: "Plattform wählen" });
  const box = await platforms.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(20);
  expect(box!.x + box!.width).toBeLessThanOrEqual(300);
  expect(box!.height).toBeLessThanOrEqual(52);

  // Text at twice its size: the choices wrap instead of leaving the screen.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  for (const id of ["mac", "windows", "ios"]) {
    const choice = await page
      .getByTestId(`landing-hero-tab-${id}`)
      .boundingBox();
    expect(choice!.x).toBeGreaterThanOrEqual(0);
    expect(choice!.x + choice!.width).toBeLessThanOrEqual(390);
  }
});
