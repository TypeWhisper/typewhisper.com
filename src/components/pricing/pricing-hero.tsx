import { Waveform } from "@/components/ui/waveform";
import { t, type Locale } from "@/i18n/index";

export function PricingHero({ locale }: { locale: Locale }) {
  return (
    <section className="hero-surface relative overflow-hidden py-16 sm:py-24">
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Waveform bars={40} className="mx-auto mb-8 h-5 max-w-[200px] opacity-60" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
          {t(locale, "pricing.hero.title")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          {t(locale, "pricing.hero.subtitle")}
        </p>
      </div>
    </section>
  );
}
