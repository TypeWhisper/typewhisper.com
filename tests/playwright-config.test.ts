import assert from "node:assert/strict";
import test from "node:test";

import { parsePlaywrightPort } from "../playwright.config.ts";

test("Playwright uses the default port when no override is set", () => {
  assert.equal(parsePlaywrightPort(undefined), 4321);
});

test("Playwright accepts valid TCP port overrides", () => {
  assert.equal(parsePlaywrightPort("1"), 1);
  assert.equal(parsePlaywrightPort("4322"), 4322);
  assert.equal(parsePlaywrightPort("65535"), 65535);
});

for (const [label, value] of [
  ["empty", ""],
  ["non-numeric", "invalid"],
  ["zero", "0"],
  ["negative", "-1"],
  ["decimal", "1.5"],
  ["out of range", "65536"],
] as const) {
  test(`Playwright rejects the ${label} port override`, () => {
    assert.throws(
      () => parsePlaywrightPort(value),
      /PLAYWRIGHT_PORT must be an integer between 1 and 65535/,
    );
  });
}
