import assert from "node:assert/strict";
import test from "node:test";

import {
  isExternalWebLink,
  splitReleaseBody,
} from "../src/data/release-notes.ts";

const release = (body: string | null, tag_name = "v1.6.1", name = tag_name) => ({
  body,
  tag_name,
  name,
});

test("the full changelog line becomes a link of its own", () => {
  const result = splitReleaseBody(
    release(
      "## Bug Fixes\n- one\n\n**Full Changelog**: https://github.com/TypeWhisper/typewhisper-mac/compare/v1.6.0...v1.6.1",
    ),
  );
  assert.equal(result.content, "## Bug Fixes\n- one");
  assert.equal(
    result.fullChangelogUrl,
    "https://github.com/TypeWhisper/typewhisper-mac/compare/v1.6.0...v1.6.1",
  );
});

test("a first heading that repeats the version is dropped", () => {
  assert.equal(
    splitReleaseBody(release("# TypeWhisper 1.6.1\n\n## Fixes\n- one")).content,
    "## Fixes\n- one",
  );
  assert.equal(
    splitReleaseBody(
      release("# TypeWhisper v1.0.9\n\nText", "v1.0.9", "v1.0.9"),
    ).content,
    "Text",
  );
});

test("a first heading that says more than the version stays", () => {
  const body = "# TypeWhisper 1.1 Daily\n\nAn early build.";
  assert.equal(
    splitReleaseBody(release(body, "v1.1.0-daily.20260923.48")).content,
    body,
  );
  assert.equal(
    splitReleaseBody(release("## What's New in v0.5.0\n- one", "v0.5.0"))
      .content,
    "## What's New in v0.5.0\n- one",
  );
});

test("empty notes stay empty", () => {
  assert.deepEqual(splitReleaseBody(release(null)), {
    content: null,
    fullChangelogUrl: null,
  });
  assert.deepEqual(
    splitReleaseBody(release("**Full Changelog**: https://example.com/a")),
    { content: null, fullChangelogUrl: "https://example.com/a" },
  );
  assert.equal(splitReleaseBody(release("# v1.6.1")).content, null);
});

test("only absolute web addresses stay links", () => {
  assert.equal(isExternalWebLink("https://github.com/TypeWhisper"), true);
  assert.equal(isExternalWebLink("http://example.com/notes"), true);
  // Written for GitHub: would point into the website here.
  assert.equal(isExternalWebLink("../DAILY-1.1-CANDIDATE.md"), false);
  assert.equal(isExternalWebLink("docs/setup.md"), false);
  assert.equal(isExternalWebLink("/releases"), false);
  assert.equal(isExternalWebLink("#notes"), false);
  assert.equal(isExternalWebLink("//example.com"), false);
  assert.equal(isExternalWebLink("javascript:alert(1)"), false);
  assert.equal(isExternalWebLink("mailto:hello@typewhisper.com"), false);
  assert.equal(isExternalWebLink(""), false);
  assert.equal(isExternalWebLink(undefined), false);
});
