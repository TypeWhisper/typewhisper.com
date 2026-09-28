import { ReleaseNotes } from "@/components/changelog/release-notes";
import {
  splitReleaseBody,
  type ClassifiedRelease,
} from "@/data/releases";
import { t, type Locale } from "@/i18n/index";

const repositories = {
  mac: "TypeWhisper/typewhisper-mac",
  windows: "TypeWhisper/typewhisper-win",
} as const;

const platformNames = { mac: "macOS", windows: "Windows" } as const;

/** Label of a pre-release; stable versions carry none. */
export function releaseKindLabel(
  release: ClassifiedRelease,
  locale: Locale,
): string | null {
  if (release.kind === "stable") return null;
  if (release.kind === "daily") return t(locale, "changelog.kind.daily");
  if (release.kind === "plugin") return t(locale, "changelog.kind.plugin");
  if (/[-_.]rc/i.test(release.tag_name))
    return t(locale, "changelog.kind.candidate");
  if (/beta/i.test(release.tag_name)) return t(locale, "changelog.kind.beta");
  return t(locale, "changelog.kind.pre");
}

export function formatReleaseDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

/** `2026-09` as "September 2026". */
export function formatReleaseMonth(month: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${month}-01T00:00:00Z`));
}

interface ReleaseEntryProps {
  release: ClassifiedRelease;
  locale: Locale;
  /** Written out; otherwise one line that opens on click. */
  open?: boolean;
}

/**
 * One release as a native disclosure: a line with name, platform, and date,
 * and the notes below. Static markup, also used for the pre-release file.
 */
export function ReleaseEntry({
  release,
  locale,
  open = false,
}: ReleaseEntryProps) {
  const { content, fullChangelogUrl } = splitReleaseBody(release);
  const kind = releaseKindLabel(release, locale);
  const showTag = !release.name.includes(release.tag_name);

  return (
    <details
      className="utility-entry"
      id={`${release.platform}-${release.tag_name}`}
      open={open}
      data-entry=""
      data-testid="changelog-entry"
      data-kind={release.kind}
      data-platform={release.platform}
      data-date={release.published_at}
    >
      <summary className="utility-entry__summary">
        <h3 className="utility-entry__head">
          <span className="utility-entry__title">
            <span className="utility-entry__name">{release.name}</span>
            <span className="utility-entry__meta">
              <span>{platformNames[release.platform]}</span>
              {kind && <span className="utility-entry__kind">{kind}</span>}
              {showTag && <span>{release.tag_name}</span>}
            </span>
          </span>
          <time className="utility-entry__date" dateTime={release.published_at}>
            {formatReleaseDate(release.published_at, locale)}
          </time>
        </h3>
      </summary>
      <div className="utility-entry__body">
        {content ? (
          <ReleaseNotes
            content={content}
            repository={repositories[release.platform]}
          />
        ) : (
          <p className="utility-entry__none">
            {t(locale, "changelog.noNotes")}
          </p>
        )}
        <p className="utility-entry__links">
          {fullChangelogUrl && (
            <a
              href={fullChangelogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="utility-entry__link"
            >
              {t(locale, "changelog.fullChangelog")}
            </a>
          )}
          <a
            href={release.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="utility-entry__link utility-entry__link--out"
          >
            {t(locale, "changelog.github")}
          </a>
        </p>
      </div>
    </details>
  );
}
