import { useSyncExternalStore } from "react";
import { detectPlatform } from "@/lib/platform-download";

export type LandingPlatform = "mac" | "windows" | "ios";
const eventName = "typewhisper:landing-platform";
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
  window.addEventListener(eventName, synchronize);
  window.addEventListener("popstate", synchronize);
  synchronize();
  return () => {
    window.removeEventListener(eventName, synchronize);
    window.removeEventListener("popstate", synchronize);
  };
}

export function selectLandingPlatform(platform: LandingPlatform) {
  const url = new URL(window.location.href);
  url.searchParams.set("platform", platform);
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(eventName));
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
