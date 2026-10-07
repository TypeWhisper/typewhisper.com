import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import {
  createSitemapFilter,
  isNoIndexHtml,
  isRedirectHtml,
} from "../scripts/sitemap-filter.mjs";

const redirectHtml =
  '<!doctype html><html><head><meta http-equiv="refresh" content="0;url=/en/addons/local-llm-mlx/"></head><body></body></html>';
const pageHtml =
  "<!doctype html><html><head><title>Add-ons</title></head><body><h1>Add-ons</h1></body></html>";

test("isRedirectHtml recognizes a meta refresh page", () => {
  assert.equal(isRedirectHtml(redirectHtml), true);
  assert.equal(isRedirectHtml(pageHtml), false);
});

test("isNoIndexHtml recognizes a page that asks not to be indexed", () => {
  assert.equal(isNoIndexHtml('<head><meta name="robots" content="noindex"></head>'), true);
  assert.equal(isNoIndexHtml(pageHtml), false);
});

test("createSitemapFilter drops redirect pages and keeps content pages", () => {
  const dist = mkdtempSync(join(tmpdir(), "sitemap-filter-"));
  try {
    for (const [dir, html] of [
      ["addons", redirectHtml],
      ["en/addons", pageHtml],
      ["en/addons/gemma4", redirectHtml],
    ]) {
      mkdirSync(join(dist, dir), { recursive: true });
      writeFileSync(join(dist, dir, "index.html"), html);
    }

    const filter = createSitemapFilter(pathToFileURL(`${dist}/`));
    const site = "https://www.typewhisper.com";

    assert.equal(filter(`${site}/addons/`), false);
    assert.equal(filter(`${site}/en/addons/gemma4/`), false);
    assert.equal(filter(`${site}/en/addons/`), true);
    // A URL without a built file stays in the sitemap.
    assert.equal(filter(`${site}/en/unknown/`), true);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});
