import { t, type Locale } from "@/i18n/index";

export function HowItWorks({ locale = "en" }: { locale?: Locale }) {
  const videoSrc = locale === "de" ? "/demo-de.mp4" : "/demo-en.mp4";

  return (
    <section className="section-light-gray py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl">
          {t(locale, "howItWorks.title")}
        </h2>

        <div className="mt-12 reveal-scale-hidden">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <video
              className="w-full"
              playsInline
              controls
              preload="metadata"
              poster="/og-image.png"
            >
              <source src={videoSrc} type="video/mp4" />
              {t(locale, "howItWorks.videoFallback")}
            </video>
          </div>

          <p className="mt-6 text-center text-sm text-[#86868b]">
            {t(locale, "howItWorks.caption")}
          </p>
        </div>
      </div>
    </section>
  );
}
