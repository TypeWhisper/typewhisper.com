import { expect, test } from "@playwright/test";

const policyScenarios = [
  {
    locale: "en",
    path: "/en/addons/develop",
    heading: "Provider access policy",
    acceptedExample: /user-provided API keys/,
    rejectedExample: /impersonate a provider's first-party client/,
    macRepo: "TypeWhisper/typewhisper-mac",
    windowsRepo: "TypeWhisper/typewhisper-win",
  },
  {
    locale: "de",
    path: "/de/addons/develop",
    heading: "Provider-Zugriffsrichtlinie",
    acceptedExample: /nutzerbereitgestellte API-Schlüssel/,
    rejectedExample: /First-Party-Client eines Anbieters imitieren/,
    macRepo: "TypeWhisper/typewhisper-mac",
    windowsRepo: "TypeWhisper/typewhisper-win",
  },
] as const;

test.describe("add-ons developer catalog policy", () => {
  for (const scenario of policyScenarios) {
    test(`${scenario.locale} page explains provider access requirements`, async ({ page }) => {
      await page.goto(scenario.path);

      await expect(
        page.getByRole("heading", { name: scenario.heading }),
      ).toBeVisible();
      await expect(page.getByText(scenario.acceptedExample)).toBeVisible();
      await expect(page.getByText(scenario.rejectedExample)).toBeVisible();
      await expect(page.getByRole("link", { name: scenario.macRepo })).toBeVisible();
      await expect(page.getByRole("link", { name: scenario.windowsRepo })).toBeVisible();
      await expect(page.locator('a[href*="typewhisper-plugins"]')).toHaveCount(0);
    });
  }
});
