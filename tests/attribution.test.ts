import assert from "node:assert/strict";
import test from "node:test";

import {
  buildPolarCheckoutURL,
  campaignAttributionFromSearch,
  captureInitialCampaignAttribution,
  readCampaignAttribution,
  type AttributionStorage,
} from "../src/lib/attribution.ts";

function makeStorage(): AttributionStorage {
  const values = new Map<string, string>();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("extracts only supported campaign parameters", () => {
  assert.deepEqual(
    campaignAttributionFromSearch(
      "?utm_source=reddit&utm_medium=social&utm_campaign=launch&utm_content=ignored&email=private",
    ),
    {
      utm_source: "reddit",
      utm_medium: "social",
      utm_campaign: "launch",
    },
  );
});

test("keeps the first campaign attribution for the browser session", () => {
  const storage = makeStorage();
  captureInitialCampaignAttribution("?utm_source=reddit", storage);
  captureInitialCampaignAttribution("?utm_source=linkedin", storage);

  assert.deepEqual(readCampaignAttribution(storage), { utm_source: "reddit" });
});

test("builds an attributed Polar checkout URL", () => {
  const result = new URL(
    buildPolarCheckoutURL(
      "https://buy.polar.sh/example",
      {
        utm_source: "reddit",
        utm_medium: "social",
        utm_campaign: "launch",
      },
      {
        tier: "individual",
        billingPeriod: "monthly",
        placement: "pricing",
      },
    ),
  );

  assert.equal(result.searchParams.get("utm_source"), "reddit");
  assert.equal(result.searchParams.get("utm_medium"), "social");
  assert.equal(result.searchParams.get("utm_campaign"), "launch");
  assert.equal(
    result.searchParams.get("utm_content"),
    "website_pricing_individual_monthly",
  );
});

test("uses website defaults without a campaign", () => {
  const result = new URL(
    buildPolarCheckoutURL("https://buy.polar.sh/example", {}, {
      tier: "bronze",
      billingPeriod: "one_time",
      placement: "pricing",
    }),
  );

  assert.equal(result.searchParams.get("utm_source"), "typewhisper_website");
  assert.equal(result.searchParams.get("utm_medium"), "web");
});
