import assert from "node:assert/strict";
import test from "node:test";

import {
  commercialOffer,
  commercialTiers,
  salesEmail,
} from "../src/lib/pricing.ts";

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

test("Enterprise is sold as a subscription only", () => {
  const enterprise = commercialTiers.find((tier) => tier.id === "enterprise");
  assert.ok(enterprise);
  assert.equal(enterprise.price.lifetime, undefined);
  assert.equal(enterprise.checkout.lifetime, undefined);
  assert.deepEqual(commercialOffer(enterprise, "lifetime"), {
    period: "monthly",
    amount: enterprise.price.monthly,
    checkout: enterprise.checkout.monthly,
  });
});

test("Individual and Team keep their lifetime option", () => {
  for (const tier of commercialTiers.filter((entry) => entry.id !== "enterprise")) {
    const offer = commercialOffer(tier, "lifetime");
    assert.equal(offer.period, "lifetime");
    assert.equal(offer.amount, tier.price.lifetime);
    assert.equal(offer.checkout, tier.checkout.lifetime);
  }
});
