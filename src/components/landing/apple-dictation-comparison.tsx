import { usePlatform } from "@/hooks/use-platform";
import { t, type Locale } from "@/i18n/index";

interface Reason {
  title: string;
  description: string;
}

function getEngineTitle(locale: Locale, platform: string): string {
  switch (platform) {
    case "mac":
    case "other":
      return t(locale, "appleDictation.engines.title.mac");
    default:
      return t(locale, "appleDictation.engines.title.other");
  }
}

function getReasons(locale: Locale, platform: string): Reason[] {
  return [
    {
      title: t(locale, "appleDictation.profiles.title"),
      description: t(locale, "appleDictation.profiles.description"),
    },
    {
      title: getEngineTitle(locale, platform),
      description: t(locale, "appleDictation.engines.description"),
    },
    {
      title: t(locale, "appleDictation.files.title"),
      description: t(locale, "appleDictation.files.description"),
    },
    {
      title: t(locale, "appleDictation.history.title"),
      description: t(locale, "appleDictation.history.description"),
    },
  ];
}

export function AppleDictationComparison({ locale = "en" }: { locale?: Locale }) {
  const platform = usePlatform();
  const reasons = getReasons(locale, platform);

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(locale, "appleDictation.title")}
        </h2>

        <div className="mt-12">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`reveal-hidden py-6 ${i < reasons.length - 1 ? "border-b border-border" : ""}`}
            >
              <h3 className="text-lg font-semibold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-1 text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
