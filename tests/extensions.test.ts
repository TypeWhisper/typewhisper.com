import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { integrations } from "../src/lib/integrations.ts";

test("the browser store listings are linked once they are live", () => {
  assert.equal(
    integrations.browser.chromeWebStoreUrl,
    "https://chromewebstore.google.com/detail/typewhisper/gamnkdngnfamiajnbeglodoaoaifbheh",
  );
  // Set the URL once the Firefox listing is published; the page then links it.
  assert.equal(integrations.browser.firefoxAddonsUrl, null);
});

test("the extension install links point at the published listings and repos", () => {
  assert.equal(integrations.raycast.storeUrl, "https://www.raycast.com/SeoFood/typewhisper");
  assert.equal(
    integrations.streamDeck.releasesUrl,
    "https://github.com/TypeWhisper/typewhisper-stream-deck/releases",
  );
  assert.equal(integrations.mcp.installCommand, "npm install -g @typewhisper/mcp");
  assert.equal(integrations.mcp.repoUrl, "https://github.com/TypeWhisper/typewhisper-mcp");
  assert.equal(integrations.pi.installCommand, "pi install npm:@typewhisper/pi");
  assert.equal(integrations.pi.repoUrl, "https://github.com/TypeWhisper/typewhisper-pi");
});

test("the unprefixed extensions URL redirects to a locale and keeps the anchor", async () => {
  const page = await readFile("src/pages/extensions.astro", "utf8");
  assert.match(page, /<LocalizedRedirect path="\/extensions" \/>/);
  const redirect = await readFile("src/components/LocalizedRedirect.astro", "utf8");
  assert.match(redirect, /window\.location\.search \+ window\.location\.hash/);
});

test("the footer links the extensions page", async () => {
  const footer = await readFile("src/components/layout/footer.astro", "utf8");
  assert.match(footer, /localePath\(locale, "\/extensions"\)/);
});
