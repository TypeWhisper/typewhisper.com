import { expect, test, type Page } from "@playwright/test";

type LocaleScenario = {
  code: "en" | "de";
  browserLocale: string;
};

type LandingExpectationOptions = {
  expectDesktopToggle?: boolean;
};

const localeScenarios: LocaleScenario[] = [
  { code: "en", browserLocale: "en-US" },
  { code: "de", browserLocale: "de-DE" },
];

async function prepareDarkModeSession(page: Page, storedTheme?: "dark" | "light") {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript((theme) => {
    const initKey = "__theme_test_initialized";
    if (!window.sessionStorage.getItem(initKey)) {
      window.localStorage.removeItem("theme");
      if (theme) {
        window.localStorage.setItem("theme", theme);
      }
      window.sessionStorage.setItem(initKey, "1");
    }
  }, storedTheme);
}

async function waitForHeaderHydration(page: Page) {
  await page.waitForFunction(() => {
    const island = document.querySelector('astro-island[component-url="/src/components/layout/header.tsx"]');
    return island instanceof HTMLElement && !island.hasAttribute("ssr");
  });
}

async function expectDarkLanding(
  page: Page,
  locale: "en" | "de",
  options: LandingExpectationOptions = {},
) {
  const { expectDesktopToggle = true } = options;
  await expect(page.locator("html")).toHaveClass(/dark/);
  if (expectDesktopToggle) {
    await expect(page.getByTestId("theme-toggle")).toBeVisible();
  }
  await expect(page.getByTestId("landing-hero")).toBeVisible();

  const heroHeading = page.locator("h1").first();
  await expect(heroHeading).toHaveCSS("color", "rgb(245, 245, 247)");
  await expect(page.getByTestId("site-header")).toHaveClass(/bg-black\/80/);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");

  await expect(page).toHaveURL(new RegExp(`/${locale}/?$`));
}

async function switchThemeOnLanding(page: Page) {
  await waitForHeaderHydration(page);
  await page.getByTestId("theme-toggle").click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(page.locator("h1").first()).toHaveCSS("color", "rgb(29, 29, 31)");
  await expect(page.getByTestId("site-header")).not.toHaveClass(/bg-black\/80/);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(251, 251, 253)");
}

for (const scenario of localeScenarios) {
  test.describe(`theme consistency (${scenario.code})`, () => {
    test.use({ locale: scenario.browserLocale });

    test("root redirect keeps the landing page in dark mode and preserves theme on docs", async ({
      page,
    }) => {
      await prepareDarkModeSession(page);
      await page.goto("/");
      await waitForHeaderHydration(page);

      await expectDarkLanding(page, scenario.code);

      await page.locator(`a[href="/${scenario.code}/docs"]`).first().click();

      await expect(page).toHaveURL(new RegExp(`/${scenario.code}/docs/?$`));
      await expect(page.locator("html")).toHaveClass(/dark/);
      await expect(page.getByTestId("theme-toggle")).toBeVisible();
      await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
    });

    test("direct landing-page entry matches the root redirect behavior", async ({ page }) => {
      await prepareDarkModeSession(page);
      await page.goto(`/${scenario.code}/`);
      await waitForHeaderHydration(page);

      await expectDarkLanding(page, scenario.code);
    });

    test("theme toggle is available on the landing page and persists after navigation", async ({
      page,
    }) => {
      await prepareDarkModeSession(page);
      await page.goto(`/${scenario.code}/`);
      await waitForHeaderHydration(page);

      await expectDarkLanding(page, scenario.code);
      await switchThemeOnLanding(page);

      await page.locator(`a[href="/${scenario.code}/docs"]`).first().click();

      await expect(page).toHaveURL(new RegExp(`/${scenario.code}/docs/?$`));
      await expect(page.locator("html")).toHaveClass(/light/);
      await expect(page.locator("body")).toHaveCSS("background-color", "rgb(251, 251, 253)");
    });
  });
}

test.describe("stored dark theme behavior", () => {
  test.use({ locale: "en-US" });

  test("landing page respects a stored dark theme value", async ({
    page,
  }) => {
    await prepareDarkModeSession(page, "dark");
    await page.goto("/en/");
    await waitForHeaderHydration(page);

    await expectDarkLanding(page, "en");
  });
});

test.describe("mobile theme switcher", () => {
  test.use({
    locale: "en-US",
    viewport: { width: 390, height: 844 },
  });

  test("theme can be switched from the mobile navigation on the landing page", async ({
    page,
  }) => {
    await prepareDarkModeSession(page);
    await page.goto("/en/");
    await waitForHeaderHydration(page);

    await expectDarkLanding(page, "en", { expectDesktopToggle: false });
    await page.getByLabel("Menu").click();
    await page.getByTestId("theme-toggle-mobile").click();

    await expect(page.locator("html")).toHaveClass(/light/);
    await expect(page.getByLabel("Menu")).toBeVisible();
  });
});
