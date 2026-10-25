import { readFileSync } from "node:fs";
import {
  describeVersion,
  type PlatformVersion,
  type VersionPlatform,
} from "../../src/data/version-placeholders";

type ReleaseFeed = Partial<
  Record<"mac" | "windows" | "ios", { version?: string | null } | null>
>;

/** A platform whose version is known, so specs can assert on plain strings. */
export type KnownVersion = { version: string; series: string };

function known(platform: VersionPlatform, value: PlatformVersion): KnownVersion {
  if (!value.version || !value.series) {
    throw new Error(`No current version for ${platform}.`);
  }
  return { version: value.version, series: value.series };
}

/**
 * The versions the pages show, all from the generated feed.
 */
export function readCurrentVersions(): Record<VersionPlatform, KnownVersion> {
  const feed = JSON.parse(
    readFileSync("src/data/downloads.json", "utf8"),
  ) as ReleaseFeed;

  return {
    mac: known("mac", describeVersion(feed.mac?.version)),
    windows: known("windows", describeVersion(feed.windows?.version)),
    ios: known("ios", describeVersion(feed.ios?.version)),
  };
}

/** The raw macOS and Windows versions of the feed, e.g. "v1.6.1". */
export function readFeedVersion(platform: "mac" | "windows"): string | null {
  const feed = JSON.parse(
    readFileSync("src/data/downloads.json", "utf8"),
  ) as ReleaseFeed;
  return feed[platform]?.version ?? null;
}
