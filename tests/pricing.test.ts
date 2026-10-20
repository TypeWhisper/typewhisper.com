import assert from "node:assert/strict";
import test from "node:test";

import {
  commercialOffer,
  commercialTiers,
  salesEmail,
  yearlyPaidMonths,
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
    period: "yearly",
    amount: enterprise.price.yearly,
    checkout: enterprise.checkout.yearly,
  });
});

test("a year of the yearly subscription costs ten monthly prices", () => {
  for (const tier of commercialTiers) {
    assert.equal(tier.price.yearly, tier.price.monthly * yearlyPaidMonths);
    assert.deepEqual(commercialOffer(tier, "yearly"), {
      period: "yearly",
      amount: tier.price.yearly,
      checkout: tier.checkout.yearly,
    });
  }
});

test("every offered plan links to a Polar checkout", () => {
  for (const tier of commercialTiers) {
    for (const [period, url] of Object.entries(tier.checkout)) {
      assert.match(
        url,
        /^https:\/\/buy\.polar\.sh\/polar_cl_\w+$/,
        `${tier.id} ${period} has no Polar checkout link`,
      );
    }
  }
});

test("Individual and Team keep their lifetime option", () => {
  for (const tier of commercialTiers.filter((entry) => entry.id !== "enterprise")) {
    const offer = commercialOffer(tier, "lifetime");
    assert.equal(offer.period, "lifetime");
    assert.equal(offer.amount, tier.price.lifetime);
    assert.equal(offer.checkout, tier.checkout.lifetime);
  }
});
