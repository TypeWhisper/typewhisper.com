import { ArrowRight, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commercialTiers, supporterTiers, currencySymbol } from "@/lib/pricing";
import { t, localePath, type Locale } from "@/i18n/index";

interface PricingTeaserProps {
  locale?: Locale;
}

/** Compact three-card pricing overview linking to the full pricing page. */
export function PricingTeaser({ locale = "en" }: PricingTeaserProps) {
  const commercialFrom = commercialTiers[0].price.monthly;
  const supporterFrom = supporterTiers[0].price;

  const cards = [
    {
      id: "free",
      name: t(locale, "pricingTeaser.free.name"),
      price: t(locale, "pricingTeaser.free.price"),
      priceDetail: null,
      description: t(locale, "pricingTeaser.free.description"),
      highlighted: true,
    },
    {
      id: "commercial",
      name: t(locale, "pricingTeaser.commercial.name"),
      price: `${t(locale, "pricingTeaser.commercial.priceFrom")} ${currencySymbol}${commercialFrom}`,
      priceDetail: t(locale, "pricingTeaser.commercial.priceSuffix"),
      description: t(locale, "pricingTeaser.commercial.description"),
      highlighted: false,
    },
    {
      id: "supporter",
      name: t(locale, "pricingTeaser.supporter.name"),
      price: `${t(locale, "pricingTeaser.supporter.priceFrom")} ${currencySymbol}${supporterFrom}`,
      priceDetail: t(locale, "pricingTeaser.supporter.priceSuffix"),
      description: t(locale, "pricingTeaser.supporter.description"),
      highlighted: false,
    },
  ];

  return (
    <section
      data-testid="pricing-teaser"
      className="bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center reveal-hidden">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t(locale, "pricingTeaser.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(locale, "pricingTeaser.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3 reveal-hidden">
          {cards.map((card) => (
            <a
              key={card.id}
              href={localePath(locale, "/pricing")}
              className={
                card.highlighted
                  ? "group rounded-2xl border-2 border-primary bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  : "group rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              }
            >
              <p className="text-sm font-semibold text-muted-foreground">
                {card.name}
              </p>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight">
                  {card.price}
                </span>
                {card.priceDetail && (
                  <span className="text-sm text-muted-foreground">
                    {card.priceDetail}
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {card.description}
              </p>
            </a>
          ))}
        </div>

        <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <HandHeart
            className="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          {t(locale, "pricingTeaser.honor")}
        </p>

        <div className="mt-6 flex justify-center">
          <Button variant="link-arrow" asChild>
            <a
              href={localePath(locale, "/pricing")}
              className="inline-flex items-center gap-1 text-primary"
            >
              {t(locale, "pricingTeaser.cta")}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
