export type ReleaseKind = "stable" | "daily" | "candidate" | "plugin";

export const preReleaseKinds: ReleaseKind[] = ["daily", "candidate", "plugin"];

const pluginTag = /^plugins?[-_./]/i;
const dailyMarker = /(^|[-_.+/\s])(daily|nightly)(?=$|[-_.+/\s\d])/i;
const candidateTag = /[-_.+](rc|beta|alpha|preview|pre)(?=$|[-_.+\d])/i;
const candidateName = /\b(release candidate|rc\s?\d+|beta|alpha|preview)\b/i;
const plainVersion = /^v?\d+(\.\d+){1,3}$/i;
const versionWithSuffix = /^v?\d+(\.\d+){1,3}[-+].+$/i;

/**
 * Sorts a GitHub release into one of four kinds. The tag decides; the name is
 * asked only when the tag is no version at all.
 *
 * - `plugins-…` tags are plugin releases.
 * - `-daily` or `-nightly` marks a daily build.
 * - `-rc`, `-beta`, `-alpha`, `-preview`, `-pre`, or any other suffix behind a
 *   version marks a release candidate or beta.
 * - A plain version (`v1.6.1`, `v0.11`) is stable, whatever its name says.
 */
export function classifyRelease(release: {
  tag_name: string;
  name?: string | null;
}): ReleaseKind {
  const tag = release.tag_name.trim();
  const name = (release.name ?? "").trim();

  if (pluginTag.test(tag)) return "plugin";
  if (dailyMarker.test(tag)) return "daily";
  if (candidateTag.test(tag)) return "candidate";
  if (plainVersion.test(tag)) return "stable";
  if (versionWithSuffix.test(tag)) return "candidate";

  if (dailyMarker.test(name)) return "daily";
  if (candidateName.test(name)) return "candidate";
  return "stable";
}

export function isPreRelease(release: {
  tag_name: string;
  name?: string | null;
}): boolean {
  return classifyRelease(release) !== "stable";
}
