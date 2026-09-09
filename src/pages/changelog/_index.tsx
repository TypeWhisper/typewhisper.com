import { useState, useMemo } from "react";
import { releases } from "@/data/releases";
import { PlatformFilter } from "@/components/changelog/platform-filter";
import { ReleaseCard } from "@/components/changelog/release-card";
import { t, type Locale } from "@/i18n/index";

export default function ChangelogPage({ locale = "en" }: { locale?: Locale }) {
  const [platform, setPlatform] = useState<"all" | "mac" | "windows">("all");

  const filtered = useMemo(
    () =>
      platform === "all"
        ? releases
        : releases.filter((r) => r.platform === platform),
    [platform]
  );

  const grouped = useMemo(() => {
    const monthFormatter = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" });
    const groups: { label: string; items: typeof filtered }[] = [];
    let currentLabel = "";
    for (const release of filtered) {
      const label = monthFormatter.format(new Date(release.published_at));
      if (label !== currentLabel) {
        currentLabel = label;
        groups.push({ label, items: [] });
      }
      groups[groups.length - 1].items.push(release);
    }
    return groups;
  }, [filtered, locale]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Changelog
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {t(locale, "changelog.description")}
      </p>

      <div className="mt-6">
        <PlatformFilter selected={platform} onChange={setPlatform} locale={locale} />
      </div>

      {grouped.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {locale === "de" ? "Keine Releases gefunden." : "No releases found."}
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map((group) => (
            <section key={group.label}>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h2>
              <div className="space-y-4">
                {group.items.map((release) => (
                  <ReleaseCard key={release.id} release={release} locale={locale} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
