import { ArrowUpRight } from "lucide-react";
import { WaveRule } from "@/components/site";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";
import {
  legalSecurityReviewRelatedPaths,
  type LegalSecurityReviewRelatedKey,
} from "@/data/legal-security-review";
import { localePath, type Locale } from "@/i18n/index";

interface LegalSecurityReviewRelatedProps {
  related: LegalSecurityReviewContent["related"];
  locale: Locale;
  label: string;
}

function resolveHref(locale: Locale, key: LegalSecurityReviewRelatedKey): string {
  return localePath(locale, legalSecurityReviewRelatedPaths[key]);
}

export function LegalSecurityReviewRelated({
  related,
  locale,
  label,
}: LegalSecurityReviewRelatedProps) {
  return (
    <section className="site-section site-section--tight-top">
      <div className="site-wrap site-wrap--narrow">
        <WaveRule label={label} seed={21} align="start" />
        <div className="commercial-doc__head">
          <h2 className="site-title site-title--start">{related.title}</h2>
        </div>
        <ul className="commercial-links">
          {related.links.map((link) => (
            <li key={link.key}>
              <a href={resolveHref(locale, link.key)} className="commercial-links__link">
                <span className="commercial-links__name">{link.label}</span>
                <span className="commercial-links__text">{link.text}</span>
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
