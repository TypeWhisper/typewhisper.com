/**
 * Single source of truth for the current stable version of each platform.
 *
 * - macOS and Windows come from the generated release feed (downloads.json,
 *   written by scripts/fetch-releases.mjs). Nothing to maintain by hand.
 * - iOS has no feed: `iosVersion` below is the only number entered by hand.
 *
 * Copy never spells these numbers out. It uses the placeholders
 * {macVersion}, {macSeries}, {windowsVersion}, {windowsSeries},
 * {iosVersion} and {iosSeries}. "Version" is the full number (1.6.1),
 * "Series" the release line (1.6). t() resolves them on the server,
 * getClientMessages() for hydrated islands. While a version is unknown its
 * placeholders stay in the text.
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

// The only version number entered by hand. Update it with each iOS release.
export const iosVersion = "1.1";

type Feed = Partial<
  Record<"mac" | "windows", { version?: string | null } | null>
>;
const feed: Feed = downloads;

export const versions: Record<VersionPlatform, PlatformVersion> = {
  mac: describeVersion(feed.mac?.version),
  windows: describeVersion(feed.windows?.version),
  ios: describeVersion(iosVersion),
};

const placeholders = versionPlaceholders(versions);

/** Resolve the version placeholders in a piece of copy. */
export function resolveVersions(text: string): string {
  return resolveVersionPlaceholders(text, placeholders);
}
