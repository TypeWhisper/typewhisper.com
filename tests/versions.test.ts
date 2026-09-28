import assert from "node:assert/strict";
import test from "node:test";

import {
  describeVersion,
  fullVersion,
  resolveVersionPlaceholders,
  versionPlaceholders,
  versionSeries,
} from "../src/data/version-placeholders.ts";

const known = versionPlaceholders({
  mac: describeVersion("v1.6.1"),
  windows: describeVersion("v1.0.9"),
  ios: describeVersion("1.0"),
});

const withoutFeed = versionPlaceholders({
  mac: describeVersion(null),
  windows: describeVersion(undefined),
  ios: describeVersion("1.0"),
});

test("the full version drops the leading v and any suffix", () => {
  const cases: [string | null | undefined, string | null][] = [
    ["v1.6.1", "1.6.1"],
    ["V1.0.9", "1.0.9"],
    ["1.0", "1.0"],
    ["v1.0.10", "1.0.10"],
    ["v1.7.0-daily.20260922", "1.7.0"],
    ["v2", null],
    ["latest", null],
    ["", null],
    [null, null],
    [undefined, null],
  ];
  for (const [raw, expected] of cases)
    assert.equal(fullVersion(raw), expected, String(raw));
});

test("the series is major.minor", () => {
  const cases: [string | null | undefined, string | null][] = [
    ["v1.6.1", "1.6"],
    ["v1.0.9", "1.0"],
    ["1.0", "1.0"],
    ["v1.10.3", "1.10"],
    ["v12.0.1", "12.0"],
    ["latest", null],
    [null, null],
  ];
  for (const [raw, expected] of cases)
    assert.equal(versionSeries(raw), expected, String(raw));
});

test("every platform provides a version and a series placeholder", () => {
  assert.deepEqual(known, {
    macVersion: "1.6.1",
    macSeries: "1.6",
    windowsVersion: "1.0.9",
    windowsSeries: "1.0",
    iosVersion: "1.0",
    iosSeries: "1.0",
  });
});

test("placeholders resolve to the text written by hand before", () => {
  const cases: [string, string][] = [
    ["macOS {macSeries}", "macOS 1.6"],
    ["{macSeries} Stabil", "1.6 Stabil"],
    ["{windowsSeries} Stable", "1.0 Stable"],
    ["Windows {windowsVersion}", "Windows 1.0.9"],
    ["Version {iosSeries} stable", "Version 1.0 stable"],
    ["Installiere das stabile macOS-{macSeries}-Release.", "Installiere das stabile macOS-1.6-Release."],
    [
      "stable macOS {macSeries}, Windows {windowsVersion}, and iOS {iosVersion} releases.",
      "stable macOS 1.6, Windows 1.0.9, and iOS 1.0 releases.",
    ],
    ["(version {macVersion})", "(version 1.6.1)"],
    ["{macSeries} and again {macSeries}", "1.6 and again 1.6"],
  ];
  for (const [text, expected] of cases)
    assert.equal(resolveVersionPlaceholders(text, known), expected);
});

test("other placeholders and plain text stay as written", () => {
  for (const text of [
    "No placeholder at all",
    "{count} add-ons for {platform}",
    "Requires {minimum}, stable is {stable}",
    "{version}",
    "{macversion} {MacSeries} {linuxVersion} { macSeries }",
  ])
    assert.equal(resolveVersionPlaceholders(text, known), text);
});

test("an unknown version leaves its placeholders untouched", () => {
  assert.equal(
    resolveVersionPlaceholders(
      "macOS {macSeries} ({macVersion}), Windows {windowsVersion}, iOS {iosVersion}",
      withoutFeed,
    ),
    "macOS {macSeries} ({macVersion}), Windows {windowsVersion}, iOS 1.0",
  );
  assert.equal(resolveVersionPlaceholders("{macSeries}", {}), "{macSeries}");
});
