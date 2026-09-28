// Pure helpers behind src/data/versions.ts. No imports, so unit tests can
// load this file without the generated release feed.

export type VersionPlatform = "mac" | "windows" | "ios";

export interface PlatformVersion {
  /** Full version without the leading "v", e.g. "1.6.1". */
  version: string | null;
  /** Release line (major.minor), e.g. "1.6". */
  series: string | null;
}

export type VersionPlaceholders = Record<string, string | null>;

/** "v1.6.1" -> "1.6.1". Suffixes are cut; unusable input gives null. */
export function fullVersion(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const match = raw.replace(/^v/i, "").match(/^\d+(\.\d+){1,2}/);
  return match ? match[0] : null;
}

/** "v1.6.1" -> "1.6". */
export function versionSeries(raw: string | null | undefined): string | null {
  const version = fullVersion(raw);
  return version ? version.split(".").slice(0, 2).join(".") : null;
}

export function describeVersion(
  raw: string | null | undefined,
): PlatformVersion {
  return { version: fullVersion(raw), series: versionSeries(raw) };
}

/** Placeholder values for copy, e.g. { macVersion: "1.6.1", macSeries: "1.6" }. */
export function versionPlaceholders(
  versions: Record<VersionPlatform, PlatformVersion>,
): VersionPlaceholders {
  return Object.fromEntries(
    Object.entries(versions).flatMap(([platform, { version, series }]) => [
      [`${platform}Version`, version],
      [`${platform}Series`, series],
    ]),
  );
}

const placeholderPattern = /\{((?:mac|windows|ios)(?:Version|Series))\}/g;

/** Replace known placeholders. Unknown versions stay as written. */
export function resolveVersionPlaceholders(
  text: string,
  values: VersionPlaceholders,
): string {
  if (!text.includes("{")) return text;
  return text.replace(
    placeholderPattern,
    (placeholder, name: string) => values[name] ?? placeholder,
  );
}
