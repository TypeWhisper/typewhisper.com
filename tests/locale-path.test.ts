import assert from "node:assert/strict";
import test from "node:test";

import { localePath, withTrailingSlash } from "../src/i18n/paths.ts";

test("a page path gets its trailing slash", () => {
  assert.equal(localePath("en", "/pricing"), "/en/pricing/");
  assert.equal(localePath("de", "docs/mac/workflows"), "/de/docs/mac/workflows/");
  assert.equal(localePath("en", "/"), "/en/");
  assert.equal(localePath("de", "/addons/"), "/de/addons/");
});

test("query and hash stay behind the slash", () => {
  assert.equal(localePath("en", "/#features"), "/en/#features");
  assert.equal(
    localePath("en", "/docs/ios/profiles-and-processing#section-4"),
    "/en/docs/ios/profiles-and-processing/#section-4",
  );
  assert.equal(
    localePath("de", "/setup?platform=mac#start"),
    "/de/setup/?platform=mac#start",
  );
  assert.equal(
    localePath("en", "/addons/?platform=mac&category=llm"),
    "/en/addons/?platform=mac&category=llm",
  );
  // A dot or slash in the query does not make the path a file.
  assert.equal(withTrailingSlash("/changelog?tag=v1.7.0"), "/changelog/?tag=v1.7.0");
  assert.equal(withTrailingSlash("/search?next=/docs"), "/search/?next=/docs");
});

test("files and absolute URLs are left alone", () => {
  assert.equal(
    localePath("en", "/changelog/prereleases.json"),
    "/en/changelog/prereleases.json",
  );
  assert.equal(withTrailingSlash("/feed.xml"), "/feed.xml");
  assert.equal(withTrailingSlash("/og-image.png?v=2"), "/og-image.png?v=2");
  assert.equal(
    localePath("en", "https://github.com/TypeWhisper"),
    "https://github.com/TypeWhisper",
  );
  assert.equal(localePath("en", "mailto:hello@typewhisper.com"), "mailto:hello@typewhisper.com");
  assert.equal(localePath("en", "//example.com/a"), "//example.com/a");
});
