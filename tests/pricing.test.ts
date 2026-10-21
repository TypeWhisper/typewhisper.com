import assert from "node:assert/strict";
import test from "node:test";

import {
  commercialOffer,
  commercialTiers,
  contactEmail,
  salesEmail,
  yearlyPaidMonths,
} from "../src/lib/pricing.ts";

test("license questions go to licensing@, everything else to hello@", () => {
  assert.equal(salesEmail, "licensing@typewhisper.com");
  assert.equal(contactEmail, "hello@typewhisper.com");
});

test("commercial plans expose the current device limits", () => {
  assert.deepEqual(
    Object.fromEntries(
      commercialTiers.map((tier) => [tier.id, tier.devices]),
    ),
    {
      individual: 3,
      team: 10,
      enterprise: 50,
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

test("a year of Enterprise costs ten monthly prices", () => {
  const enterprise = commercialTiers.find((tier) => tier.id === "enterprise");
  assert.ok(enterprise);
  assert.equal(enterprise.price.yearly, enterprise.price.monthly * yearlyPaidMonths);
});

test("only Enterprise has a yearly plan", () => {
  for (const tier of commercialTiers.filter((entry) => entry.id !== "enterprise")) {
    assert.equal(tier.price.yearly, undefined, `${tier.id} has a yearly price`);
    assert.equal(tier.checkout.yearly, undefined, `${tier.id} has a yearly checkout`);
  }
});

test("the monthly view offers the monthly subscription of every tier", () => {
  for (const tier of commercialTiers) {
    assert.deepEqual(commercialOffer(tier, "monthly"), {
      period: "monthly",
      amount: tier.price.monthly,
      checkout: tier.checkout.monthly,
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
