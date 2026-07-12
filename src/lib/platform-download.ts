import downloads from "@/data/downloads.json";
import { t, type Locale } from "@/i18n/index";
import type { DownloadTarget } from "@/lib/attribution";

export const macReleaseUrl =
  "https://github.com/TypeWhisper/typewhisper-mac/releases";
export const windowsReleaseUrl =
  "https://github.com/TypeWhisper/typewhisper-win/releases";
export const iosTestFlightUrl =
  "https://testflight.apple.com/join/kcCS3hcZ";
const windowsStoreProductUrl =
  "https://apps.microsoft.com/detail/9pf42zcr0jr0";
const windowsStoreCampaignId = "DevShareMCLPCS";

// Direct asset URLs for the latest stable release. Resolved at build time
// by scripts/fetch-releases.mjs and written to src/data/downloads.json.
// Falls back to the releases page if no stable asset could be resolved.
export const macDmgUrl: string = downloads.mac.url;
export const windowsSetupUrl: string = downloads.windows.url;

export const macGitHubUrl =
  "https://github.com/TypeWhisper/typewhisper-mac";
export const windowsGitHubUrl =
  "https://github.com/TypeWhisper/typewhisper-win";
export const orgGitHubUrl = "https://github.com/TypeWhisper";
export const discordUrl = "https://discord.gg/pUFR4a65SD";

export type Platform = "mac" | "windows" | "ios" | "other";
export type DownloadTargetContext = "nav" | "landing";

export interface PlatformDownloadTarget {
  href: string;
  label: string;
  platform: Platform;
  target: DownloadTarget;
  version?: string;
  opensNewTab: boolean;
}

export function getWindowsStoreUrl(locale: Locale): string {
  const params = new URLSearchParams({
    cid: windowsStoreCampaignId,
    hl: locale === "de" ? "de-DE" : "en-US",
    gl: locale === "de" ? "DE" : "US",
  });

  return `${windowsStoreProductUrl}?${params.toString()}`;
}

export function detectPlatformFromUserAgent(userAgent: string): Platform {
  const normalized = userAgent.toLowerCase();

  if (normalized.includes("windows")) {
    return "windows";
  }

  // Check iOS before Mac, since iPad UA can contain "Macintosh".
  if (
    normalized.includes("iphone") ||
    normalized.includes("ipad") ||
    normalized.includes("ipod")
  ) {
    return "ios";
  }

  if (
    normalized.includes("macintosh") ||
    normalized.includes("mac os x")
  ) {
    return "mac";
  }

  return "other";
}

export function detectPlatform(): Platform {
  if (typeof navigator === "undefined") {
    return "other";
  }

  return detectPlatformFromUserAgent(navigator.userAgent);
}

export function getPlatformDownloadTarget(
  platform: Platform,
  locale: Locale,
  context: DownloadTargetContext = "nav",
): PlatformDownloadTarget {
  if (context === "landing") {
    switch (platform) {
      case "windows":
        return {
          href: getWindowsStoreUrl(locale),
          label: t(locale, "platforms.win.download"),
          platform,
          target: "windows_store",
          opensNewTab: true,
        };
      case "ios":
        return {
          href: iosTestFlightUrl,
          label: t(locale, "platforms.ios.download"),
          platform,
          target: "ios_testflight",
          opensNewTab: true,
        };
      case "mac":
      case "other":
      default:
        return {
          href: macDmgUrl,
          label: t(locale, "platforms.mac.download"),
          platform: platform === "other" ? "mac" : platform,
          target: "mac_dmg",
          version: downloads.mac.version,
          opensNewTab: false,
        };
    }
  }

  switch (platform) {
    case "windows":
      return {
        href: getWindowsStoreUrl(locale),
        label: t(locale, "nav.downloadWindows"),
        platform,
        target: "windows_store",
        opensNewTab: true,
      };
    case "ios":
      return {
        href: iosTestFlightUrl,
        label: t(locale, "nav.downloadIos"),
        platform,
        target: "ios_testflight",
        opensNewTab: true,
      };
    case "mac":
      return {
        href: macDmgUrl,
        label: t(locale, "nav.downloadMac"),
        platform,
        target: "mac_dmg",
        version: downloads.mac.version,
        opensNewTab: false,
      };
    case "other":
    default:
      return {
        href: macDmgUrl,
        label: t(locale, "nav.download"),
        platform: "mac",
        target: "mac_dmg",
        version: downloads.mac.version,
        opensNewTab: false,
      };
  }
}
