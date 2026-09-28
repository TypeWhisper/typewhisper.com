import { type UseCaseCategory, categoryKeys } from "./taxonomy";
import { t, type Locale } from "@/i18n/index";

const categories: (UseCaseCategory | "all")[] = ["all", "app", "workflow"];

interface CategoryFilterProps {
  selected: UseCaseCategory | "all";
  onChange: (category: UseCaseCategory | "all") => void;
  locale?: Locale;
  /** Total count per category (and "all"). Renders next to each label. */
  counts?: Partial<Record<UseCaseCategory | "all", number>>;
}

export function CategoryFilter({
  selected,
  onChange,
  locale = "en",
  counts,
}: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label={t(locale, "useCases.filterLabel")}
      className="site-chips"
      data-testid="use-case-filter"
    >
      {categories.map((category) => {
        const count = counts?.[category];
        return (
          <button
            key={category}
            type="button"
            className="site-chip usecase-chip"
            onClick={() => onChange(category)}
            aria-pressed={selected === category}
            data-category={category}
          >
            {category === "all"
              ? t(locale, "useCases.all")
              : t(locale, categoryKeys[category])}
            {typeof count === "number" && (
              <span className="usecase-chip__count">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
