import { versions } from "@/data/versions";
import type { LandingPlatform } from "@/hooks/use-landing-platform";

/**
 * Current stable version per platform, resolved from the generated release
 * feed so landing copy never hardcodes a version number.
 */
export const platformVersions: Record<LandingPlatform, string | null> = {
  mac: versions.mac.version,
  windows: versions.windows.version,
  ios: versions.ios.version,
};
