import { classifyRelease, type ReleaseKind } from "./release-kind";
import { splitReleaseBody } from "./release-notes";

export interface Release {
  id: number;
  tag_name: string;
  name: string;
  body: string | null;
  published_at: string;
  html_url: string;
  platform: "mac" | "windows";
}

export type { ReleaseKind };
export { classifyRelease, splitReleaseBody };

import data from "./releases.json";
export const releases = data as Release[];

export interface ClassifiedRelease extends Release {
  kind: ReleaseKind;
}

/** Every release with its kind, newest first. */
export const classifiedReleases: ClassifiedRelease[] = releases
  .map((release) => ({ ...release, kind: classifyRelease(release) }))
  .sort((a, b) => b.published_at.localeCompare(a.published_at));

export const stableReleases = classifiedReleases.filter(
  (release) => release.kind === "stable",
);

/** Daily builds, release candidates, betas, and plugin releases. */
export const preReleases = classifiedReleases.filter(
  (release) => release.kind !== "stable",
);

/** Month of a release as `2026-09`, in UTC so that every build groups alike. */
export function releaseMonth(release: Pick<Release, "published_at">): string {
  return release.published_at.slice(0, 7);
}
