import type { CSSProperties } from "react";
import { ArrowLeft, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";
import { salesEmail } from "@/lib/pricing";
import { localePath, t, type Locale } from "@/i18n/index";

interface LegalSecurityReviewHeroProps {
  hero: LegalSecurityReviewContent["hero"];
  locale: Locale;
  color: string;
}

export function LegalSecurityReviewHero({
  hero,
  locale,
  color,
}: LegalSecurityReviewHeroProps) {
  const businessHref = localePath(locale, "/business");

  return (
    <section
      className="section-light relative overflow-hidden py-16 sm:py-20"
      style={
        {
          backgroundImage: `linear-gradient(180deg, ${color}14 0%, ${color}06 35%, transparent 75%)`,
        } satisfies CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-32 -top-16 h-[420px] w-[420px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${color}26` }}
        />
        <div
          className="absolute -right-24 top-32 h-[340px] w-[340px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${color}1A` }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <a href={businessHref}>
            <ArrowLeft className="size-4" />
            {t(locale, "business.legalSecurityReview.back")}
          </a>
        </Button>

        <div className="mx-auto max-w-3xl text-center">
          <div className="reveal-fade-hidden mb-5 inline-flex items-center gap-2">
            <span
              className="flex size-7 items-center justify-center rounded-lg"
              style={
                {
                  backgroundColor: `${color}1F`,
                  color,
                  boxShadow: `inset 0 0 0 1px ${color}40`,
                } satisfies CSSProperties
              }
            >
              <Scale className="size-3.5" />
            </span>
            <Badge
              variant="outline"
              className="border-transparent text-[11px] font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: `${color}14`,
                color,
              }}
            >
              {hero.badge}
            </Badge>
          </div>

          <h1 className="reveal-fade-hidden font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="reveal-fade-hidden mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="reveal-fade-hidden mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button size="pill" asChild>
              <a href={`mailto:${salesEmail}`}>
                {t(locale, "business.legalSecurityReview.hero.ctaPrimary")}
              </a>
            </Button>
            <Button variant="outline" size="pill" asChild>
              <a href="#checklist">
                {t(locale, "business.legalSecurityReview.hero.ctaChecklist")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
