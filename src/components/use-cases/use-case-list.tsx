import { ArrowUpRight } from "lucide-react";
import type { UseCase } from "@/data/use-cases";
import { categoryKeys } from "./taxonomy";
import { t, type Locale } from "@/i18n/index";

/** What an entry of the index needs; keeps the props of the island small. */
export type UseCaseEntry = Pick<
  UseCase,
  "slug" | "name" | "description" | "category" | "group"
>;

interface UseCaseListProps {
  entries: UseCaseEntry[];
  basePath?: string;
  locale?: Locale;
  className?: string;
}

/** Use cases as a hairline index: name, description, category, arrow. */
export function UseCaseList({
  entries,
  basePath = "/use-cases",
  locale = "en",
  className = "",
}: UseCaseListProps) {
  return (
    <ul className={`site-index site-index--open usecase-list ${className}`}>
      {entries.map((entry) => (
        <li key={entry.slug} data-testid="use-case-entry">
          <a href={`${basePath}/${entry.slug}`} className="site-index__link">
            <span className="site-index__name">
              {entry.name}
              <span className="usecase-list__side">
                <span className="usecase-list__category">
                  {t(locale, categoryKeys[entry.category])}
                </span>
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </span>
            </span>
            <span className="site-index__text">{entry.description}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
