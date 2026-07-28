import assert from "node:assert/strict";
import test from "node:test";

import { commercialTiers } from "../src/lib/pricing.ts";

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
