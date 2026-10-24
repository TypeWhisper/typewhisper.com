import assert from "node:assert/strict";
import test from "node:test";

import {
  detectPlatformFromUserAgent,
  getAndroidPlayStoreUrl,
} from "../src/lib/platform-detection.ts";

const userAgents = {
  androidChrome:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
  androidTablet:
    "Mozilla/5.0 (Linux; Android 13; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  androidFirefox:
    "Mozilla/5.0 (Android 14; Mobile; rv:136.0) Gecko/136.0 Firefox/136.0",
  samsungInternet:
    "Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/27.0 Chrome/125.0.0.0 Mobile Safari/537.36",
  iphone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1",
  mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15",
  windows:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  linux:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
};

test("Android phones and tablets are detected as Android", () => {
  for (const name of [
    "androidChrome",
    "androidTablet",
    "androidFirefox",
    "samsungInternet",
  ] as const) {
    assert.equal(detectPlatformFromUserAgent(userAgents[name]), "android", name);
    // A touch screen does not turn an Android browser into iPadOS.
    assert.equal(
      detectPlatformFromUserAgent(userAgents[name], 5),
      "android",
      `${name} with touch`,
    );
  }
});

test("the other platforms keep their detection", () => {
  assert.equal(detectPlatformFromUserAgent(userAgents.iphone), "ios");
  assert.equal(detectPlatformFromUserAgent(userAgents.mac), "mac");
  assert.equal(detectPlatformFromUserAgent(userAgents.mac, 5), "ios");
  assert.equal(detectPlatformFromUserAgent(userAgents.windows), "windows");
  // Desktop Linux is not Android.
  assert.equal(detectPlatformFromUserAgent(userAgents.linux), "other");
  assert.equal(detectPlatformFromUserAgent(""), "other");
});

test("the Play Store URL opens the listing in the page language", () => {
  assert.equal(
    getAndroidPlayStoreUrl("en"),
    "https://play.google.com/store/apps/details?id=com.typewhisper.android&hl=en",
  );
  assert.equal(
    getAndroidPlayStoreUrl("de"),
    "https://play.google.com/store/apps/details?id=com.typewhisper.android&hl=de",
  );
});
