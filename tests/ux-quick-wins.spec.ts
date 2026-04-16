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

test.describe("addons search", () => {
  test("search input filters the addon cards", async ({ page }) => {
    await page.goto("/en/addons");
    await expect(page.getByTestId("featured-addons")).toBeVisible();

    // Wait for the addons React island to finish hydrating before typing.
    await page.waitForFunction(() => {
      const islands = Array.from(
        document.querySelectorAll("astro-island"),
      ) as HTMLElement[];
      const target = islands.find((el) =>
        (el.getAttribute("component-url") ?? "").includes("addons/_index"),
      );
      return target !== undefined && !target.hasAttribute("ssr");
    });

    const cards = page.getByTestId("addon-card");
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
        name: /free for personal use/i,
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

  test("footer exposes pricing and business links on non-landing pages", async ({
    page,
  }) => {
    await page.goto("/en/docs");
    await expect(
      page.locator('footer a[href="/en/pricing"]').first(),
    ).toBeVisible();
    await expect(
      page.locator('footer a[href="/en/business"]').first(),
    ).toBeVisible();
  });
});
