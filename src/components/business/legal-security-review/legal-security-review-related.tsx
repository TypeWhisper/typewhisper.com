import type { LegalSecurityReviewContent } from "@/data/legal-security-review";
import {
  legalSecurityReviewRelatedPaths,
  type LegalSecurityReviewRelatedKey,
} from "@/data/legal-security-review";
import { localePath, type Locale } from "@/i18n/index";

interface LegalSecurityReviewRelatedProps {
  related: LegalSecurityReviewContent["related"];
  locale: Locale;
}

function resolveHref(locale: Locale, key: LegalSecurityReviewRelatedKey): string {
  return localePath(locale, legalSecurityReviewRelatedPaths[key]);
}

export function LegalSecurityReviewRelated({
  related,
  locale,
}: LegalSecurityReviewRelatedProps) {
  return (
    <section className="section-light py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {related.title}
        </h2>
        <div className="reveal-hidden mt-8 grid gap-4 sm:grid-cols-3">
          {related.links.map((link) => (
            <a
              key={link.key}
              href={resolveHref(locale, link.key)}
              className="block rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <span className="font-semibold text-foreground">{link.label}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {link.text}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
