import { t, screenshotPath, type Locale } from "@/i18n/index";

interface Feature {
  title: string;
  description: string;
  screenshot?: string;
  span?: "col-span-1" | "col-span-2";
}

function getFeatures(locale: Locale): Feature[] {
  return [
    {
      title: t(locale, "features.private.title"),
      description: t(locale, "features.private.description"),
      span: "col-span-2",
      screenshot: screenshotPath(locale, "/screenshots/mac/recording.png"),
    },
    {
      title: t(locale, "features.dictation.title"),
      description: t(locale, "features.dictation.description"),
      screenshot: screenshotPath(locale, "/screenshots/mac/general.png"),
    },
    {
      title: t(locale, "features.prompts.title"),
      description: t(locale, "features.prompts.description"),
      screenshot: screenshotPath(locale, "/screenshots/mac/prompts.png"),
    },
    {
      title: t(locale, "features.profiles.title"),
      description: t(locale, "features.profiles.description"),
      screenshot: screenshotPath(locale, "/screenshots/mac/profiles.png"),
    },
    {
      title: t(locale, "features.transcription.title"),
      description: t(locale, "features.transcription.description"),
      screenshot: screenshotPath(locale, "/screenshots/mac/file-transcription.png"),
    },
  ];
}

export function Features({ locale = "en" }: { locale?: Locale }) {
  const features = getFeatures(locale);

  return (
    <section id="features" className="section-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "features.title")}
        </h2>
        <p className="reveal-fade-hidden mt-4 text-center text-lg text-[#86868b]">
          {t(locale, "features.subtitle")}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`reveal-hidden group rounded-2xl bg-[#1d1d1f] p-6 sm:p-8 ${feature.span === "col-span-2" ? "sm:col-span-2" : ""}`}
            >
              <h3 className="text-xl font-semibold text-[#f5f5f7] sm:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-lg text-[#86868b]">
                {feature.description}
              </p>
              {feature.screenshot && (
                <div className="mt-6 overflow-hidden rounded-xl">
                  <img
                    src={feature.screenshot}
                    alt={feature.title}
                    className="w-full rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
