import { Check, Crown, Heart, Star, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t, type Locale } from "@/i18n/index";
import {
  supporterTiers,
  currencySymbol,
  type SupporterTier,
} from "@/lib/pricing";

const supporterIcons: Record<SupporterTier["iconName"], LucideIcon> = {
  heart: Heart,
  star: Star,
  crown: Crown,
};

export function SupporterSection({ locale }: { locale: Locale }) {
  return (
    <section id="supporter" className="relative py-12 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-border" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t(locale, "supporter.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "supporter.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "supporter.subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-dashed border-border bg-card/60 p-4 text-center text-sm text-muted-foreground">
          {t(locale, "supporter.disclaimer")}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {supporterTiers.map((tier) => {
            const Icon = supporterIcons[tier.iconName];
            const name = t(locale, `supporter.tier.${tier.id}.name`);
            const description = t(locale, `supporter.tier.${tier.id}.description`);
            return (
              <Card key={tier.id} className="flex flex-col bg-card">
                <CardHeader>
                  <Icon className={"size-6 " + tier.accentColorClass} />
                  <CardTitle>{name}</CardTitle>
                  <p className="text-2xl font-bold">
                    {tier.price} {currencySymbol}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      {t(locale, "supporter.oneTime")}
                    </span>
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <p className="text-sm text-muted-foreground">{description}</p>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={tier.checkout}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-checkout-tier={tier.id}
                      data-checkout-billing-period="one_time"
                      data-tracking-placement="pricing"
                    >
                      {t(locale, "supporter.become")}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-foreground">
          {t(locale, "supporter.perksTitle")}
        </p>
        <ul className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-2">
            <Check className="size-4 shrink-0 text-emerald-500" />
            <span>{t(locale, "supporter.perk.badge")}</span>
          </li>
          <li className="inline-flex items-center gap-2">
            <Check className="size-4 shrink-0 text-emerald-500" />
            <span>{t(locale, "supporter.perk.discord")}</span>
          </li>
          <li className="inline-flex items-center gap-2">
            <Check className="size-4 shrink-0 text-emerald-500" />
            <span>{t(locale, "supporter.perk.thanks")}</span>
          </li>
        </ul>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <a
            href="https://github.com/sponsors/seofood"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            {t(locale, "supporter.githubSponsors")}
          </a>
        </p>
      </div>
    </section>
  );
}
