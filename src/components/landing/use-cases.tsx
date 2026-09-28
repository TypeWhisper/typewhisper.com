import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getUseCases } from "@/data/use-cases";
import { localePath, t, type Locale } from "@/i18n/index";
import { SectionHead } from "@/components/site/section-head";

const teaserSlugs = [
  "emails",
  "chat",
  "code",
  "meeting-notes",
  "legal",
  "architecture",
];

/** Six ways into the use-case library, set as an index. Static markup. */
export function UseCases({ locale = "en" }: { locale?: Locale }) {
  const all = getUseCases(locale);
  const useCases = teaserSlugs
    .map((slug) => all.find((useCase) => useCase.slug === slug))
    .filter((useCase) => useCase !== undefined);
  if (useCases.length === 0) return null;

  return (
    <section data-testid="use-cases-teaser" className="site-section">
      <div className="site-wrap">
        <SectionHead
          label={t(locale, "useCasesTeaser.label")}
          title={t(locale, "useCasesTeaser.title")}
          lede={t(locale, "useCasesTeaser.subtitle")}
          seed={29}
        />

        <ul className="site-index reveal-hidden">
          {useCases.map((useCase) => (
            <li key={useCase.slug}>
              <a
                href={localePath(locale, `/use-cases/${useCase.slug}`)}
                className="site-index__link"
              >
                <span className="site-index__name">
                  {useCase.name}
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
                <span className="site-index__text">{useCase.description}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="site-more">
          <a href={localePath(locale, "/use-cases")} className="site-link">
            {t(locale, "useCasesTeaser.all")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
