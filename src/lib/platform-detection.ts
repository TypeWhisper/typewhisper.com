/**
 * Pure platform helpers without runtime imports, so the unit tests can load
 * them directly. src/lib/platform-download.ts re-exports them.
 */
import type { Locale } from "@/i18n/index";

export type Platform = "mac" | "windows" | "ios" | "android" | "other";

const androidPackage = "com.typewhisper.android";

/** The Google Play listing, with the store's interface in the page language. */
export function getAndroidPlayStoreUrl(locale: Locale): string {
  const params = new URLSearchParams({
    id: androidPackage,
    hl: locale === "de" ? "de" : "en",
  });
  return `https://play.google.com/store/apps/details?${params.toString()}`;
}

export function detectPlatformFromUserAgent(
  userAgent: string,
  maxTouchPoints = 0,
): Platform {
  const normalized = userAgent.toLowerCase();

  if (normalized.includes("windows")) {
    return "windows";
  }

  if (normalized.includes("android")) {
    return "android";
  }

  if (
    normalized.includes("iphone") ||
    normalized.includes("ipad") ||
    normalized.includes("ipod")
  ) {
    return "ios";
  }

  if (normalized.includes("macintosh") || normalized.includes("mac os x")) {
    // iPadOS Safari introduces itself as a Mac; no Mac has a touch screen.
    return maxTouchPoints > 1 ? "ios" : "mac";
  }

  return "other";
}
