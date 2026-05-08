import { LayoutGrid, AppWindow, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type UseCaseCategory, categoryKeys } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";

const categories: (UseCaseCategory | "all")[] = ["all", "app", "workflow"];

const iconByCategory: Record<
  UseCaseCategory | "all",
  React.ComponentType<{ className?: string }>
> = {
  all: LayoutGrid,
  app: AppWindow,
  workflow: Workflow,
};

interface CategoryFilterProps {
  selected: UseCaseCategory | "all";
  onChange: (category: UseCaseCategory | "all") => void;
  locale?: Locale;
  /** Total count per category (and "all"). Renders next to each pill. */
  counts?: Partial<Record<UseCaseCategory | "all", number>>;
}

export function CategoryFilter({
  selected,
  onChange,
  locale = "en",
  counts,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => {
        const Icon = iconByCategory[cat];
        const isSelected = selected === cat;
        const count = counts?.[cat];
        const label =
          cat === "all" ? t(locale, "useCases.all") : t(locale, categoryKeys[cat]);

        return (
          <Button
            key={cat}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className="rounded-full gap-2"
            onClick={() => onChange(cat)}
            aria-pressed={isSelected}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            <span>{label}</span>
            {typeof count === "number" && (
              <span
                className={
                  isSelected
                    ? "text-[10px] font-semibold tabular-nums opacity-70"
                    : "text-[10px] font-semibold tabular-nums text-muted-foreground"
                }
              >
                {count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
