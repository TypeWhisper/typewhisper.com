import assert from "node:assert/strict";
import test from "node:test";

import { windowsAddonScreenshotSrc } from "../src/lib/addon-screenshots.ts";

const screenshots = {
  windows: ["com.typewhisper.groq", "com.typewhisper.qwen3-stt"],
  windowsLocalized: { de: ["com.typewhisper.groq"] },
};

test("German pages show the German Windows capture where one exists", () => {
  assert.equal(
    windowsAddonScreenshotSrc(screenshots, "com.typewhisper.groq", "de"),
    "/screenshots/windows/plugins/com.typewhisper.groq.de.png",
  );
  assert.equal(
    windowsAddonScreenshotSrc(screenshots, "com.typewhisper.groq", "en"),
    "/screenshots/windows/plugins/com.typewhisper.groq.png",
  );
});

test("a capture without a German variant stays English on German pages", () => {
  assert.equal(
    windowsAddonScreenshotSrc(screenshots, "com.typewhisper.qwen3-stt", "de"),
    "/screenshots/windows/plugins/com.typewhisper.qwen3-stt.png",
  );
});

test("an add-on without a Windows capture gets none", () => {
  assert.equal(
    windowsAddonScreenshotSrc(screenshots, "com.typewhisper.granite-speech", "de"),
    undefined,
  );
  assert.equal(windowsAddonScreenshotSrc(screenshots, undefined, "en"), undefined);
});
