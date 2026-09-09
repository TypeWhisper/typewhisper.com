import test from "node:test";
import assert from "node:assert/strict";
import { requiresNewerHost } from "../src/lib/addon-compatibility.ts";

test("add-on requirements distinguish unavailable hosts from compatible stable editions", () => {
  assert.equal(requiresNewerHost("1.7.0", "1.6"), true);
  assert.equal(requiresNewerHost("1.0.10", "1.0.9"), true);
  assert.equal(requiresNewerHost("1.4.0", "1.0.9"), true);
  assert.equal(requiresNewerHost("1.6.0", "1.6"), false);
  assert.equal(requiresNewerHost("1.0.9", "v1.0.10"), false);
  assert.equal(requiresNewerHost("0.14.0", "1.6.0"), false);
});

test("missing or non-stable release data does not imply an incompatibility", () => {
  assert.equal(requiresNewerHost("1.7.0", null), false);
  assert.equal(requiresNewerHost(undefined, "1.6.0"), false);
  assert.equal(requiresNewerHost("1.7.0", "1.7.0-daily.20260907"), false);
});
