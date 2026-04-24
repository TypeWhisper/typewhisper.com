import downloads from "@/data/downloads.json";
import { t, type Locale } from "@/i18n/index";

export const macReleaseUrl =
  "https://github.com/TypeWhisper/typewhisper-mac/releases";
export const windowsReleaseUrl =
  "https://github.com/TypeWhisper/typewhisper-win/releases";
export const iosTestFlightUrl =
  "https://testflight.apple.com/join/kcCS3hcZ";

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
          href: windowsSetupUrl,
          label: t(locale, "platforms.win.download"),
          platform,
        };
      case "ios":
        return {
          href: iosTestFlightUrl,
          label: t(locale, "platforms.ios.download"),
          platform,
        };
      case "mac":
      case "other":
      default:
        return {
          href: macDmgUrl,
          label: t(locale, "platforms.mac.download"),
          platform: platform === "other" ? "mac" : platform,
        };
    }
  }

  switch (platform) {
    case "windows":
      return {
        href: windowsSetupUrl,
        label: t(locale, "nav.downloadWindows"),
        platform,
      };
    case "ios":
      return {
        href: iosTestFlightUrl,
        label: t(locale, "nav.downloadIos"),
        platform,
      };
    case "mac":
      return {
        href: macDmgUrl,
        label: t(locale, "nav.downloadMac"),
        platform,
      };
    case "other":
    default:
      return {
        href: macDmgUrl,
        label: t(locale, "nav.download"),
        platform: "other",
      };
  }
}
