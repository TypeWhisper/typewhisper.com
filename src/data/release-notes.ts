const fullChangelogLine = /^\*\*Full Changelog\*\*:\s*(https?:\/\/\S+)/;
const leadingHeading = /^#{1,2}\s+(.+?)\s*#*\s*(?:\n+|$)/;

/** `TypeWhisper v1.6.1` and `v1.6.1` name the same version. */
function versionKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/typewhisper/g, "")
    .replace(/[^a-z0-9.]+/g, "")
    .replace(/^v(?=\d)/, "");
}

/**
 * Prepares the notes of a release: takes the "Full Changelog" line out and
 * returns its link, and drops a first heading that only repeats the version,
 * because the entry already carries it as its headline.
 */
export function splitReleaseBody(release: {
  body: string | null;
  tag_name: string;
  name: string | null;
}): {
  content: string | null;
  fullChangelogUrl: string | null;
} {
  if (!release.body) return { content: null, fullChangelogUrl: null };

  let fullChangelogUrl: string | null = null;
  const lines = release.body.split("\n").filter((line) => {
    const match = fullChangelogLine.exec(line);
    if (!match) return true;
    fullChangelogUrl ??= match[1];
    return false;
  });

  let content = lines.join("\n").trim();
  const heading = leadingHeading.exec(content);
  if (heading) {
    const key = versionKey(heading[1]);
    if (
      key === versionKey(release.tag_name) ||
      (release.name != null && key === versionKey(release.name))
    )
      content = content.slice(heading[0].length).trim();
  }

  return { content: content || null, fullChangelogUrl };
}

/**
 * Release notes are written for GitHub, where a relative link points into the
 * repository. On the website only absolute web addresses make sense; any
 * other link is shown as plain text.
 */
export function isExternalWebLink(href: string | undefined): href is string {
  return typeof href === "string" && /^https?:\/\/[^\s/]/i.test(href);
}

/**
 * Places the headings of release notes below the `h3` of their entry. `depths`
 * are the Markdown levels in document order. `level` is the element: the
 * notes start at `h4` and never skip a level, whatever was written on GitHub.
 * `look` is the style, which follows the level that was written: `#` and `##`
 * as 4, `###` as 5, deeper ones as 6.
 */
export function noteHeadingLevels(
  depths: number[],
): { level: number; look: number }[] {
  const open: number[] = [];
  return depths.map((depth) => {
    while (open.length > 0 && open[open.length - 1] >= depth) open.pop();
    open.push(depth);
    return {
      level: Math.min(6, 3 + open.length),
      look: depth <= 2 ? 4 : depth === 3 ? 5 : 6,
    };
  });
}
