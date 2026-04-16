import downloads from "@/data/downloads.json";

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

export function detectPlatform(): Platform {
  if (typeof navigator === "undefined") {
    return "other";
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("windows")) {
    return "windows";
  }

  // Check iOS before Mac, since iPad UA can contain "Macintosh"
  if (
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod")
  ) {
    return "ios";
  }

  if (userAgent.includes("macintosh") || userAgent.includes("mac os x")) {
    return "mac";
  }

  return "other";
}
