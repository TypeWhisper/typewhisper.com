import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { androidBeta } from "../src/lib/android-beta.ts";

test("the Android beta links point at the tester group and the Play opt-in", () => {
  assert.equal(
    androidBeta.googleGroupUrl,
    "https://groups.google.com/g/typewhisper-android-beta",
  );
  assert.equal(
    androidBeta.playOptInUrl,
    "https://play.google.com/apps/testing/com.typewhisper.android",
  );
});

test("the unprefixed Android and account deletion URLs redirect to a locale", async () => {
  for (const name of ["android", "delete-account"]) {
    const page = await readFile(`src/pages/${name}.astro`, "utf8");
    assert.match(page, new RegExp(`<LocalizedRedirect path="/${name}" />`));
  }
});

test("the footer links the Android beta and the account deletion page", async () => {
  const footer = await readFile("src/components/layout/footer.astro", "utf8");
  assert.match(footer, /localePath\(locale, "\/android"\)/);
  assert.match(footer, /localePath\(locale, "\/delete-account"\)/);
});
