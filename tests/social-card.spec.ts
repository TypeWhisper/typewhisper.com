import { expect, test } from "@playwright/test";

const socialImageUrl = "https://www.typewhisper.com/og-image.png?v=20260819";

test("root exposes an English social card without changing the locale redirect", async ({
  request,
}) => {
  const response = await request.get("/");
  const html = await response.text();

  expect(response.ok()).toBe(true);
  expect(html).toContain('property="og:locale" content="en_US"');
  expect(html).toContain(`property="og:image" content="${socialImageUrl}"`);
  expect(html).toContain('name="twitter:card" content="summary_large_image"');
  expect(html).toContain("navigator.language");
  expect(html).toContain('window.location.replace("/" + locale + targetPath)');
});
