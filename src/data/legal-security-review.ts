import type { ComponentType } from "react";
import type { Locale } from "@/i18n/index";

export type LegalSecurityReviewRelatedKey = "business" | "privacy" | "legal";

export interface LegalSecurityReviewDataFlowItem {
  area: string;
  detail: string;
  icon: string;
}

export interface LegalSecurityReviewRelatedLink {
  key: LegalSecurityReviewRelatedKey;
  label: string;
  text: string;
}

export interface LegalSecurityReviewContent {
  meta: { title: string; description: string };
  color: string;
  hero: { badge: string; title: string; subtitle: string };
  checklist: { title: string; intro: string; items: string[] };
  dataFlow: { title: string; items: LegalSecurityReviewDataFlowItem[] };
  boundaries: { title: string; items: string[] };
  related: { title: string; links: LegalSecurityReviewRelatedLink[] };
  cta: { title: string; subtitle: string };
}

export interface LegalSecurityReviewModule {
  default: ComponentType;
  frontmatter: LegalSecurityReviewContent;
}

export const legalSecurityReviewRelatedPaths: Record<
  LegalSecurityReviewRelatedKey,
  string
> = {
  business: "/business",
  privacy: "/privacy",
  legal: "/use-cases/legal",
};

const mdxModulesEn = import.meta.glob<LegalSecurityReviewModule>(
  "../content/business/en/legal-security-review.mdx",
  { eager: true },
);
const mdxModulesDe = import.meta.glob<LegalSecurityReviewModule>(
  "../content/business/de/legal-security-review.mdx",
  { eager: true },
);

function getModules(locale: Locale) {
  return locale === "de" ? mdxModulesDe : mdxModulesEn;
}

export function getLegalSecurityReviewModule(
  locale: Locale = "en",
): LegalSecurityReviewModule {
  const mod = Object.values(getModules(locale))[0];
  if (!mod) {
    throw new Error(`Legal security review content missing for locale: ${locale}`);
  }
  return mod;
}
