import { replacePageUrl, subscribeToPageUrl } from "@/hooks/use-page-url";
import { useSyncExternalStore } from "react";
import { detectPlatform } from "@/lib/platform-download";

export type LandingPlatform = "mac" | "windows" | "ios";

const storageKey = "typewhisper-platform";

export function isLandingPlatform(value: unknown): value is LandingPlatform {
  return value === "mac" || value === "windows" || value === "ios";
}

function getSnapshot(): LandingPlatform {
  const query = new URLSearchParams(window.location.search).get("platform");
  if (isLandingPlatform(query)) return query;
  try {
    const stored = sessionStorage.getItem(storageKey);
    if (isLandingPlatform(stored)) return stored;
  } catch {
    /* Storage is optional in restricted browsers. */
  }
  const detected = detectPlatform();
  return isLandingPlatform(detected) ? detected : "mac";
}

function subscribe(onChange: () => void) {
  const synchronize = () => {
    const platform = getSnapshot();
    document.documentElement.dataset.landingPlatform = platform;
    try {
      sessionStorage.setItem(storageKey, platform);
    } catch {
      /* Optional. */
    }
    onChange();
  };
  synchronize();
  return subscribeToPageUrl(synchronize);
}

export function selectLandingPlatform(platform: LandingPlatform) {
  const url = new URL(window.location.href);
  url.searchParams.set("platform", platform);
  replacePageUrl(url);
}

export function useSyncedLandingPlatform(): LandingPlatform {
  return useSyncExternalStore(subscribe, getSnapshot, () => "mac");
}

export function useLandingPlatformSelection() {
  return {
    selectedPlatform: useSyncedLandingPlatform(),
    selectPlatform: selectLandingPlatform,
    detectedHintPlatform: null,
  };
}
