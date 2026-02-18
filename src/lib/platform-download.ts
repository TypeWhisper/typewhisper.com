export const macReleaseUrl =
  "https://github.com/TypeWhisper/typewhisper-mac/releases";
export const windowsReleaseUrl =
  "https://github.com/TypeWhisper/typewhisper-win/releases";
export const iosTestFlightUrl =
  "https://testflight.apple.com/join/kcCS3hcZ";

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
