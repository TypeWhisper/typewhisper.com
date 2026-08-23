import assert from "node:assert/strict";
import test from "node:test";

import { commercialTiers, salesEmail } from "../src/lib/pricing.ts";

test("public commercial contact uses the shared hello address", () => {
  assert.equal(salesEmail, "hello@typewhisper.com");
});

test("commercial plans expose the current device limits", () => {
  assert.deepEqual(
    Object.fromEntries(
      commercialTiers.map((tier) => [tier.id, tier.devices]),
    ),
    {
      individual: 3,
      team: 10,
      enterprise: "unlimited",
    },
  );
});
