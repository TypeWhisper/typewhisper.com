import { expect, test, type Page } from "@playwright/test";

async function hydrated(page: Page) {
  await expect(
    page.getByTestId("use-case-filter").locator("xpath=ancestor::astro-island"),
  ).not.toHaveAttribute("ssr", "");
}

test("the use-case index groups its entries and filters by category", async ({
  page,
}) => {
  await page.goto("/en/use-cases/");
  const entries = page.getByTestId("use-case-entry");
  const filter = page.getByTestId("use-case-filter");

  await hydrated(page);
  await expect(page.locator("h1")).toHaveText("Use Cases");
  await expect(entries).toHaveCount(9);
  await expect(
    page.getByTestId("use-case-group-everyday").getByTestId("use-case-entry"),
  ).toHaveCount(4);
  await expect(
    page.getByTestId("use-case-group-industry").getByTestId("use-case-entry"),
  ).toHaveCount(5);

  await filter.getByRole("button", { name: /App/ }).click();
  await expect(entries).toHaveCount(1);
  await expect(entries.getByRole("link")).toHaveAttribute(
    "href",
    "/en/use-cases/chat/",
  );
  await expect(page.getByTestId("use-case-group-industry")).toHaveCount(0);
  await expect(page).toHaveURL(/\?category=app$/);

  await filter.getByRole("button", { name: /All/ }).click();
  await expect(entries).toHaveCount(9);
  await expect(page).toHaveURL(/\/en\/use-cases\/$/);

  await page.goto("/de/use-cases/?category=workflow");
  await hydrated(page);
  await expect(
    page.getByTestId("use-case-filter").getByRole("button", { pressed: true }),
  ).toContainText("Workflow");
  await expect(page.getByTestId("use-case-entry")).toHaveCount(8);
});

test("a use-case page shows real product media and no imitated app windows", async ({
  page,
}) => {
  await page.goto("/de/use-cases/emails/");

  await expect(page.locator("h1")).toHaveText("E-Mails diktieren");
  await expect(
    page.getByTestId("page-head").getByRole("link", { name: "Anwendungen" }),
  ).toHaveAttribute("href", "/de/use-cases/");

  const download = page
    .getByTestId("page-head")
    .locator("a[data-download-social-trigger]");
  await expect(download).toHaveAttribute("data-download-target", "mac_dmg");
  await expect(download).toHaveAttribute("data-tracking-placement", "use_case");

  await expect(page.getByTestId("use-case-spoken")).toContainText(
    "Hallo Sarah, das neue Design ist fertig.",
  );
  await expect(
    page.getByTestId("use-case-shot").locator("img"),
  ).toHaveAttribute("src", "/screenshots/de/mac/workflows.png");
  await expect(page.getByTestId("use-case-shot").locator("img")).toHaveAttribute(
    "alt",
    /Workflows/,
  );
  await expect(page.locator("#how-it-works")).toHaveCount(1);
  await expect(
    page.locator('[class*="mockup"], [class*="mac-window"], [class*="notch"]'),
  ).toHaveCount(0);
});

test("an industry page keeps its long text and links to its sections", async ({
  page,
}) => {
  await page.goto("/en/use-cases/dragon-alternative-law-firms/");
  const details = page.getByTestId("use-case-details");

  await expect(details.locator("table")).toHaveCount(1);
  await expect(details.locator(".site-prose h2")).toHaveCount(5);
  for (const link of await details.locator("nav a").all()) {
    const target = (await link.getAttribute("href")) ?? "";
    await expect(page.locator(`[id="${target.slice(1)}"]`)).toHaveCount(1);
  }

  await page.goto("/en/use-cases/legal/");
  await expect(page.getByTestId("use-case-shot")).toHaveCount(0);
  await expect(page.getByTestId("use-case-spoken")).toHaveCount(0);
  await expect(
    page.getByTestId("use-case-related").getByTestId("use-case-entry"),
  ).toHaveCount(4);
});
