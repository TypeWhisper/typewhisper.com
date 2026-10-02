import { expect, test } from "@playwright/test";

test.describe("documentation reading mode", () => {
  test("wide screens show navigation, text, and table of contents", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/de/docs/mac/installation/");

    const current = page.locator('.docs-nav__link[aria-current="page"]');
    await expect(current).toHaveText("Installation");
    await expect(current.locator("svg")).toBeVisible();
    await expect(
      page.locator('.docs-platforms a[aria-current="true"]'),
    ).toHaveText("macOS");

    const toc = page.getByRole("navigation", { name: "Auf dieser Seite" });
    await expect(toc.getByRole("link")).toHaveCount(6);
    await toc.getByRole("link", { name: "Deinstallieren" }).click();
    await expect(page).toHaveURL(/#uninstall$/);
    await expect(
      toc.getByRole("link", { name: "Deinstallieren" }),
    ).toHaveAttribute("aria-current", "location");
  });

  test("overview pages list their sections and skip the table of contents", async ({
    page,
  }) => {
    await page.goto("/en/docs/mac/");
    await expect(page.locator(".docs-toc")).toHaveCount(0);
    await expect(page.locator(".docs-index > li")).toHaveCount(7);

    await page.goto("/en/docs/");
    for (const platform of ["mac", "windows", "ios"])
      await expect(
        page.locator(`.docs-platform__link[href="/en/docs/${platform}"]`),
      ).toBeVisible();
  });

  test("previous and next follow the reading order", async ({ page }) => {
    await page.goto("/en/docs/windows/features/");
    const pager = page.getByRole("navigation", {
      name: "Previous and next page",
    });
    await expect(pager.locator('a[rel="prev"]')).toHaveAttribute(
      "href",
      "/en/docs/windows/installation",
    );
    await expect(pager.locator('a[rel="next"]')).toHaveAttribute(
      "href",
      "/en/docs/windows/file-transcription",
    );

    await page.goto("/en/docs/ios/troubleshooting/");
    await expect(page.locator('.docs-pager a[rel="next"]')).toHaveCount(0);
    await expect(page.locator('.docs-pager a[rel="prev"]')).toHaveAttribute(
      "href",
      "/en/docs/ios/privacy-and-premium",
    );
  });

  test("slash focuses the search and Escape leaves it", async ({ page }) => {
    await page.goto("/en/docs/ios/installation/");
    const field = page.getByRole("searchbox", { name: "Search docs" });
    await expect(page.locator("[data-docs].docs--enhanced")).toBeVisible();

    await page.keyboard.press("/");
    await expect(field).toBeFocused();
    await page.keyboard.type("keyboard");
    await expect(field).toHaveValue("keyboard");
    await page.keyboard.press("Escape");
    await expect(field).not.toBeFocused();

    await page.keyboard.press("/");
    await page.keyboard.type("keyboard");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(
      /\/en\/docs\/search\/\?q=keyboard&platform=ios/,
    );
  });

  test("code blocks copy their text and report it", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: async (text: string) => {
            (window as unknown as { copied: string }).copied = text;
          },
        },
      });
    });
    await page.goto("/en/docs/mac/installation/");
    await expect(page.locator("[data-docs].docs--enhanced")).toBeVisible();

    const block = page.locator("[data-docs-code]").first();
    await block.getByRole("button", { name: "Copy command" }).click();
    await expect(block.getByRole("status")).toHaveText("Copied");
    expect(
      await page.evaluate(
        () => (window as unknown as { copied: string }).copied,
      ),
    ).toBe("brew install --cask typewhisper/tap/typewhisper");
  });

  test("phones get the navigation and the table of contents as disclosures", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/docs/windows/api/");
    await expect(page.locator("[data-docs].docs--enhanced")).toBeVisible();

    const current = page.locator('.docs-nav__link[aria-current="page"]');
    await expect(current).toBeHidden();
    await page.locator(".docs-nav__summary").click();
    await expect(current).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(current).toBeHidden();

    await page.locator(".docs-toc__summary").click();
    await page
      .locator(".docs-toc__link")
      .filter({ hasText: "Stable endpoints" })
      .click();
    await expect(page.locator(".docs-toc__link").first()).toBeHidden();

    const table = page.getByRole("region", { name: "Stable endpoints" });
    const sizes = await table.evaluate((element) => ({
      inner: element.scrollWidth,
      outer: element.clientWidth,
      page: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(sizes.inner).toBeGreaterThan(sizes.outer);
    expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
  });
});
