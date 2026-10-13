import { expect, test } from "@playwright/test";

const copy = {
  en: {
    title: "TypeWhisper in your other tools",
    footer: "Extensions",
    soon: "Coming soon",
    macCli: "CLI for macOS",
  },
  de: {
    title: "TypeWhisper in deinen anderen Tools",
    footer: "Erweiterungen",
    soon: "Bald verfügbar",
    macCli: "CLI für macOS",
  },
} as const;

for (const locale of ["en", "de"] as const) {
  test.describe(`${locale} extensions page`, () => {
    test("lists every integration with its install link", async ({ page }) => {
      await page.goto(`/${locale}/extensions/`);

      await expect(
        page.getByRole("heading", { level: 1, name: copy[locale].title }),
      ).toBeVisible();
      for (const id of ["browser", "raycast", "stream-deck", "mcp", "pi", "cli"]) {
        await expect(page.locator(`section#${id}`)).toBeVisible();
        await expect(page.locator(`nav a[href="#${id}"]`)).toBeVisible();
      }

      // Chrome links its store listing; the Firefox listing is not live yet.
      const browser = page.getByTestId("extensions-browser");
      await expect(browser.getByTestId("extensions-link-chrome")).toHaveAttribute(
        "href",
        "https://chromewebstore.google.com/detail/typewhisper/gamnkdngnfamiajnbeglodoaoaifbheh",
      );
      await expect(browser.getByTestId("extensions-soon-firefox")).toContainText(copy[locale].soon);
      await expect(browser.locator("a")).toHaveCount(1);
      await expect(browser).toContainText("127.0.0.1");

      await expect(page.getByTestId("extensions-link-raycast")).toHaveAttribute(
        "href",
        "https://www.raycast.com/SeoFood/typewhisper",
      );
      await expect(page.getByTestId("extensions-link-stream-deck")).toHaveAttribute(
        "href",
        "https://github.com/TypeWhisper/typewhisper-stream-deck/releases",
      );
      await expect(page.getByTestId("extensions-mcp-command")).toContainText(
        "npm install -g @typewhisper/mcp",
      );
      await expect(page.getByTestId("extensions-link-mcp-github")).toHaveAttribute(
        "href",
        "https://github.com/TypeWhisper/typewhisper-mcp",
      );
      await expect(page.getByTestId("extensions-pi-command")).toContainText(
        "pi install npm:@typewhisper/pi",
      );
      await expect(page.getByTestId("extensions-link-pi-github")).toHaveAttribute(
        "href",
        "https://github.com/TypeWhisper/typewhisper-pi",
      );
      await expect(
        page.getByTestId("extensions-cli").getByRole("link", { name: copy[locale].macCli }),
      ).toHaveAttribute("href", `/${locale}/docs/mac/cli/`);
      await expect(page.getByTestId("extensions-link-cli-windows")).toHaveAttribute(
        "href",
        `/${locale}/docs/windows/cli/`,
      );

      await expect(
        page.locator("footer").getByRole("link", { name: copy[locale].footer }),
      ).toHaveAttribute("href", `/${locale}/extensions/`);
    });
  });
}

test("the unprefixed URL forwards to a locale and keeps the anchor", async ({ page }) => {
  await page.goto("/extensions/#browser");
  await expect(page).toHaveURL(/\/(en|de)\/extensions\/#browser$/);
  await expect(page.locator("section#browser")).toBeInViewport();
});
