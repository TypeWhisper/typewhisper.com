import { PageHead } from "@/components/site";
import {
  formatReleaseMonth,
  ReleaseEntry,
} from "@/components/changelog/release-entry";
import {
  releaseMonth,
  stableReleases,
  type ClassifiedRelease,
} from "@/data/releases";
import { localePath, t, type Locale } from "@/i18n/index";

/** Entries that are written out; everything older is one line. */
export const OPEN_ENTRIES = 10;

function groupByMonth(items: ClassifiedRelease[]) {
  const groups: { month: string; items: ClassifiedRelease[] }[] = [];
  for (const release of items) {
    const month = releaseMonth(release);
    if (groups.at(-1)?.month !== month) groups.push({ month, items: [] });
    groups.at(-1)!.items.push(release);
  }
  return groups;
}

function count(locale: Locale, key: string, value: number): string {
  return t(locale, `${key}.${value === 1 ? "one" : "other"}`).replace(
    "{count}",
    String(value),
  );
}

const platformOptions = [
  { value: "all", labelKey: "changelog.filter.all" },
  { value: "mac", label: "macOS" },
  { value: "windows", label: "Windows" },
] as const;

/**
 * Static page: the stable versions are complete in the HTML. The script in
 * `changelog-client.ts` adds the platform filter and loads the pre-releases.
 */
export default function ChangelogPage({ locale = "en" }: { locale?: Locale }) {
  const groups = groupByMonth(stableReleases);
  const latest = (["mac", "windows"] as const)
    .map((platform) => {
      const release = stableReleases.find((item) => item.platform === platform);
      return release
        ? `${platform === "mac" ? "macOS" : "Windows"} ${release.tag_name}`
        : null;
    })
    .filter(Boolean);
  let written = 0;

  return (
    <div
      className="site-page utility-changelog"
      data-changelog=""
      data-prereleases-url={localePath(locale, "/changelog/prereleases.json")}
      data-open-entries={OPEN_ENTRIES}
    >
      <PageHead
        compact
        title={t(locale, "changelog.heading")}
        lede={t(locale, "changelog.description")}
        meta={
          latest.length > 0
            ? `${t(locale, "changelog.latest")}: ${latest.join(" · ")}`
            : undefined
        }
      />

      <section className="site-section site-section--tight-top">
        <div className="site-wrap">
          <div className="utility-log__controls">
            <div
              className="site-switch utility-log__filter"
              role="group"
              aria-label={t(locale, "changelog.filter.label")}
            >
              {platformOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="site-switch__item"
                  aria-pressed={option.value === "all"}
                  data-platform-option={option.value}
                  data-testid={`changelog-platform-${option.value}`}
                >
                  {"labelKey" in option
                    ? t(locale, option.labelKey)
                    : option.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              role="switch"
              aria-checked="false"
              aria-describedby="changelog-pre-hint"
              className="utility-toggle"
              data-pre-toggle=""
              data-testid="changelog-pre-toggle"
            >
              <span className="utility-toggle__track" aria-hidden="true">
                <span className="utility-toggle__thumb" />
              </span>
              {t(locale, "changelog.pre.toggle")}
            </button>
            <p className="utility-log__hint" id="changelog-pre-hint">
              {t(locale, "changelog.pre.hint")}
            </p>

            <p
              className="site-meta utility-log__status"
              role="status"
              data-status=""
              data-testid="changelog-status"
            >
              {count(locale, "changelog.status.stable", stableReleases.length)}
            </p>
          </div>

          <noscript>
            <p className="utility-log__hint utility-log__hint--block">
              {t(locale, "changelog.noscript")}
            </p>
          </noscript>

          <p
            className="utility-log__error"
            role="alert"
            data-error=""
            data-testid="changelog-error"
            hidden
          >
            <span>{t(locale, "changelog.pre.error")}</span>
            <button type="button" className="utility-log__retry" data-retry="">
              {t(locale, "changelog.pre.retry")}
            </button>
          </p>

          <div className="utility-log" data-months="">
            {groups.map((group) => (
              <section
                key={group.month}
                className="utility-month"
                data-month={group.month}
                aria-labelledby={`month-${group.month}`}
              >
                <div className="utility-month__head">
                  <h2
                    className="utility-month__title"
                    id={`month-${group.month}`}
                  >
                    {formatReleaseMonth(group.month, locale)}
                  </h2>
                  <p className="site-meta" data-month-count="">
                    {count(locale, "changelog.month", group.items.length)}
                  </p>
                </div>
                <div className="utility-month__entries" data-entries="">
                  {group.items.map((release) => {
                    written += 1;
                    return (
                      <ReleaseEntry
                        key={release.id}
                        release={release}
                        locale={locale}
                        open={written <= OPEN_ENTRIES}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <p
            className="utility-log__empty"
            data-empty=""
            hidden={stableReleases.length > 0}
          >
            {t(locale, "changelog.empty")}
          </p>
        </div>
      </section>
    </div>
  );
}
