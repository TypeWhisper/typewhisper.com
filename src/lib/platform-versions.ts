import downloads from "@/data/downloads.json";
import { iosVersion } from "@/lib/platform-download";
import type { LandingPlatform } from "@/hooks/use-landing-platform";

function displayVersion(version: string | null | undefined): string | null {
  if (!version) return null;
  const match = version.replace(/^v/i, "").match(/^\d+(\.\d+){1,2}/);
  return match ? match[0] : null;
}

/**
 * Current stable version per platform, resolved from the generated release
 * feed so landing copy never hardcodes a version number.
 */
export const platformVersions: Record<LandingPlatform, string | null> = {
  mac: displayVersion(downloads.mac.version),
  windows: displayVersion(downloads.windows.version),
  ios: displayVersion(iosVersion),
};
