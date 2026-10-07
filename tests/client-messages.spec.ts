import { expect, test, type Page } from "@playwright/test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * Each page inlines only the messages its hydrated islands read
 * (src/i18n/client-messages.ts). An island that reads a missing message shows
 * the key itself, so no known key may appear in a hydrated page.
 */

function messageKeys(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return messageKeys(path);
    if (!entry.name.endsWith(".json")) return [];
    return Object.keys(JSON.parse(readFileSync(path, "utf8")));
  });
}

const keys = messageKeys("src/i18n/locales/en");

/** Opens what is folded and scrolls through the page so that `client:visible` islands hydrate too. */
async function hydrateAll(page: Page) {
  await page.evaluate(async () => {
    for (const details of document.querySelectorAll("main details"))
      details.setAttribute("open", "");
    for (let top = 0; top < document.body.scrollHeight; top += 400) {
      window.scrollTo(0, top);
      await new Promise((done) => setTimeout(done, 30));
    }
    window.scrollTo(0, 0);
  });
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0);
}

/** Known keys in the text and the labelling attributes of the page. */
function rawKeys(page: Page): Promise<string[]> {
  return page.evaluate((known) => {
    const keySet = new Set(known);
    const pattern = /\b[a-z][a-zA-Z]*(\.[a-zA-Z0-9_]+)+\b/g;
    const found = new Set<string>();
    const scan = (text: string | null) => {
      for (const match of text?.match(pattern) ?? [])
        if (keySet.has(match)) found.add(match);
    };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const parent = walker.currentNode.parentElement;
      if (parent?.closest("script, style, template")) continue;
      scan(walker.currentNode.textContent);
    }
    for (const element of document.querySelectorAll("body *, title")) {
      for (const name of ["aria-label", "title", "alt", "placeholder"])
        scan(element.getAttribute(name));
    }
    scan(document.title);
    return [...found];
  }, keys);
}

/** Hydrates the page, uses every toggle and select in the content once, and collects raw keys. */
async function check(page: Page, path: string, found: string[]) {
  await page.goto(path);
  await hydrateAll(page);
  const report = async (step: string) => {
    for (const key of await rawKeys(page)) found.push(`${path} ${step}: ${key}`);
  };
  await report("loaded");
  const toggles = page.locator('main button[aria-pressed="false"]:visible');
  // A pressed toggle leaves the list, so the first one is always the next.
  const seen = new Set<string>();
  for (let step = 0; step < 30; step += 1) {
    const labels = await toggles.allTextContents();
    const index = labels.findIndex((label) => !seen.has(label));
    if (index === -1) break;
    seen.add(labels[index]);
    await toggles.nth(index).click();
    await report(`after "${labels[index].trim()}"`);
  }
  const selects = page.locator("main select:visible");
  for (let index = 0; index < (await selects.count()); index += 1) {
    const select = selects.nth(index);
    const values = await select
      .locator("option")
      .evaluateAll((options) =>
        options.map((option) => (option as HTMLOptionElement).value),
      );
    for (const value of values) {
      await select.selectOption(value);
      await report(`with "${value}"`);
    }
  }
}

for (const locale of ["en", "de"]) {
  test.describe(`${locale}: hydrated pages show no raw message keys`, () => {
    test("home page on every platform, with the download dialog", async ({
      page,
    }) => {
      test.slow();
      const found: string[] = [];
      for (const platform of ["mac", "windows", "ios"])
        await check(page, `/${locale}/?platform=${platform}`, found);

      await page.goto(`/${locale}/?platform=mac`);
      await hydrateAll(page);
      await page.evaluate(() => {
        const element = document.querySelector(
          '[data-testid="landing-hero-download"]',
        );
        element?.addEventListener("click", (event) => event.preventDefault(), {
          once: true,
          capture: true,
        });
        element?.dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true }),
        );
      });
      await expect(page.getByTestId("download-social-banner")).toBeVisible();
      for (const key of await rawKeys(page)) found.push(`download dialog: ${key}`);
      expect(found).toEqual([]);
    });

    test("header menu on a phone", async ({ page }) => {
      const found: string[] = [];
      await page.setViewportSize({ width: 390, height: 844 });
      for (const path of [`/${locale}/`, `/${locale}/docs/mac/installation/`]) {
        await page.goto(path);
        await hydrateAll(page);
        await page.locator("header button[aria-haspopup='dialog']").click();
        await expect(page.getByRole("dialog")).toBeVisible();
        for (const key of await rawKeys(page)) found.push(`${path} menu: ${key}`);
      }
      expect(found).toEqual([]);
    });

    test("add-on pages with filters and empty states", async ({ page }) => {
      test.slow();
      const found: string[] = [];
      for (const path of [
        "/addons/",
        "/addons/?q=no-such-add-on",
        "/addons/?platform=ios&q=no-such-add-on",
        "/addons/groq/",
        "/addons/groq/macos/",
        "/addons/develop/",
      ])
        await check(page, `/${locale}${path}`, found);

      // A community add-on without its own page loads its readme in an island.
      const community = JSON.parse(
        readFileSync("src/data/community-plugins.json", "utf8"),
      ).plugins as { slug: string }[];
      if (community.length > 0)
        await check(page, `/${locale}/addons/${community[0].slug}/`, found);
      expect(found).toEqual([]);
    });

    test("documentation and its search with results", async ({ page }) => {
      test.slow();
      const found: string[] = [];
      for (const path of [
        "/docs/",
        "/docs/mac/installation/",
        "/docs/windows/api/",
        "/docs/ios/",
        "/docs/search/",
        "/docs/search/?q=no-such-term-xyz",
      ])
        await check(page, `/${locale}${path}`, found);

      const path = `/${locale}/docs/search/?q=keyboard`;
      await page.goto(path);
      await hydrateAll(page);
      await expect(page.locator(".docs-find__path").first()).toBeVisible();
      for (const key of await rawKeys(page)) found.push(`${path} results: ${key}`);
      expect(found).toEqual([]);
    });

    test("changelog with pre-releases loaded", async ({ page }) => {
      const found: string[] = [];
      await check(page, `/${locale}/changelog/`, found);
      await page.goto(`/${locale}/changelog/?pre=1`);
      await expect(page.locator("[data-changelog]")).toHaveAttribute(
        "data-load",
        "ready",
      );
      for (const key of await rawKeys(page)) found.push(`pre-releases: ${key}`);
      expect(found).toEqual([]);
    });

    test("pricing, setup, use cases, and the static pages", async ({ page }) => {
      test.slow();
      const found: string[] = [];
      for (const path of [
        "/pricing/",
        "/setup/",
        "/use-cases/",
        "/use-cases/legal/",
        "/benchmark/",
        "/business/",
        "/business/legal-security-review/",
        "/support/",
        "/sponsors/",
        "/release-status/",
        "/open-source-accessibility/",
        "/privacy/",
        "/android/",
        "/delete-account/",
        "/no-such-page/",
      ])
        await check(page, `/${locale}${path}`, found);
      expect(found).toEqual([]);
    });
  });
}
