import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t, type Locale } from "@/i18n/index";

export function PersonalVsCommercial({ locale }: { locale: Locale }) {
  const personalFeatures = [
    t(locale, "pricing.personal.feature.allFeatures"),
    t(locale, "pricing.personal.feature.allPlatforms"),
    t(locale, "pricing.personal.feature.local"),
    t(locale, "pricing.personal.feature.community"),
    t(locale, "pricing.personal.feature.source"),
  ];

  const commercialFeatures = [
    t(locale, "pricing.commercial.feature.sameFeatures"),
    t(locale, "pricing.commercial.feature.proprietary"),
    t(locale, "pricing.commercial.feature.devices"),
    t(locale, "pricing.commercial.feature.priority"),
    t(locale, "pricing.commercial.feature.payWhatYouWant"),
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "pricing.compare.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "pricing.compare.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card id="personal-plan" className="bg-card">
            <CardHeader>
              <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-500/40 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                {t(locale, "pricing.personal.badge")}
              </span>
              <CardTitle className="text-2xl">
                {t(locale, "pricing.personal.title")}
              </CardTitle>
              <p className="text-3xl font-bold">
                {t(locale, "pricing.personal.price")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t(locale, "pricing.personal.priceNote")}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ul className="space-y-2 text-sm">
                {personalFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline">
                <a href="#supporter">{t(locale, "pricing.personal.cta")}</a>
              </Button>
            </CardContent>
          </Card>

          <Card id="commercial-plans" className="border-primary/40 bg-card">
            <CardHeader>
              <span className="inline-flex w-fit items-center gap-1 rounded-full border border-primary/40 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                {t(locale, "pricing.commercial.badge")}
              </span>
              <CardTitle className="text-2xl">
                {t(locale, "pricing.commercial.title")}
              </CardTitle>
              <p className="text-3xl font-bold">
                {t(locale, "pricing.commercial.priceFrom")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t(locale, "pricing.commercial.priceNote")}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ul className="space-y-2 text-sm">
                {commercialFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <a href="#commercial-table">{t(locale, "pricing.commercial.cta")}</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
