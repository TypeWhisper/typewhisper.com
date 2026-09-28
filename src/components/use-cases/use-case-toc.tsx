import type { UseCaseHeading } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";

interface UseCaseTocProps {
  headings: UseCaseHeading[];
  locale?: Locale;
}

/** The sections of the long text, beside it. */
export function UseCaseToc({ headings, locale = "en" }: UseCaseTocProps) {
  const sections = headings.filter((heading) => heading.depth === 2);
  if (sections.length === 0) return null;

  return (
    <nav
      className="site-split__head usecase-toc"
      aria-labelledby="use-case-toc-title"
    >
      <p id="use-case-toc-title" className="site-label site-label--muted">
        {t(locale, "useCases.onThisPage")}
      </p>
      <ol className="usecase-toc__list">
        {sections.map((section) => (
          <li key={section.slug}>
            <a href={`#${section.slug}`} className="usecase-toc__link">
              {section.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
