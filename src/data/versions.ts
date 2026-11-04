/**
 * Single source of truth for the current stable version of each platform.
 *
 * macOS, Windows and iOS come from the generated feed (downloads.json, written
 * by scripts/fetch-releases.mjs at build time):
 * - macOS and Windows from their GitHub releases,
 * - iOS from Apple's public App Store lookup.
 * Android has no feed: `androidVersion` below is the only number entered by
 * hand.
 *
 * Copy never spells these numbers out. It uses the placeholders
 * {macVersion}, {macSeries}, {windowsVersion}, {windowsSeries},
 * {iosVersion}, {iosSeries}, {androidVersion} and {androidSeries}.
 * "Version" is the full number (1.6.1), "Series" the release line (1.6).
 * t() resolves them on the server, getClientMessages() for hydrated
 * islands. While a version is unknown its placeholders stay in the text.
 *
 * Must not import from @/i18n or @/lib/platform-download (import cycle).
 */
import downloads from "./downloads.json";
import {
  describeVersion,
  resolveVersionPlaceholders,
  versionPlaceholders,
  type PlatformVersion,
  type VersionPlatform,
} from "./version-placeholders";

type Feed = Partial<
  Record<"mac" | "windows" | "ios", { version?: string | null } | null>
>;
const feed: Feed = downloads;

/** The iOS version that is live in the App Store, e.g. "1.2.0". */
export const iosVersion: string | null = feed.ios?.version ?? null;

// Entered by hand: the versionName of the current production release on
// Google Play. Update it with each Android release.
export const androidVersion = "1.0.0";

export const versions: Record<VersionPlatform, PlatformVersion> = {
  mac: describeVersion(feed.mac?.version),
  windows: describeVersion(feed.windows?.version),
  ios: describeVersion(iosVersion),
  android: describeVersion(androidVersion),
};

const placeholders = versionPlaceholders(versions);

/** Resolve the version placeholders in a piece of copy. */
export function resolveVersions(text: string): string {
  return resolveVersionPlaceholders(text, placeholders);
}
