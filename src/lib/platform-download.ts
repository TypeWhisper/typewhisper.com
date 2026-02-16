export const macReleaseUrl =
  "https://github.com/TypeWhisper/typewhisper-mac/releases";
export const windowsReleaseUrl =
  "https://github.com/TypeWhisper/typewhisper-win/releases";

export type Platform = "mac" | "windows" | "other";

export function detectPlatform(): Platform {
  if (typeof navigator === "undefined") {
    return "other";
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("windows")) {
    return "windows";
  }

  if (userAgent.includes("macintosh") || userAgent.includes("mac os x")) {
    return "mac";
  }

  return "other";
}
