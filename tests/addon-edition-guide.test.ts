import assert from "node:assert/strict";
import test from "node:test";

import { addonEditionCapabilityName } from "../src/lib/addon-edition-guide.ts";

test("the generated guide names a capability like the app's Discover plugins list", () => {
  // Voxtral is listed in the app as Mistral, and Mistral is also its provider name.
  assert.equal(
    addonEditionCapabilityName({ appName: "Mistral" }, "Voxtral", "transcription"),
    "Mistral",
  );
  assert.equal(
    addonEditionCapabilityName({ appName: "Mistral" }, "Voxtral", "llm"),
    "Mistral",
  );
});

test("a capability with its own name in the app uses that name", () => {
  const granite = {
    appName: "IBM Granite Speech (Local)",
    capabilityNames: { transcription: "Local (Granite Speech)" },
  };
  assert.equal(
    addonEditionCapabilityName(granite, "Granite", "transcription"),
    "Local (Granite Speech)",
  );

  const linear = { capabilityNames: { action: "Create Linear issue" } };
  assert.equal(
    addonEditionCapabilityName(linear, "Linear", "action"),
    "Create Linear issue",
  );
  // Other capabilities keep the add-on's name.
  assert.equal(addonEditionCapabilityName(linear, "Linear", "llm"), "Linear");
});

test("an add-on without names of its own keeps the name on this site", () => {
  assert.equal(
    addonEditionCapabilityName({}, "Speechmatics", "transcription"),
    "Speechmatics",
  );
});
