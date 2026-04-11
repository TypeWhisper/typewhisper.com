import { Button } from "@/components/ui/button";
import { type UseCaseCategory, categoryKeys } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";

const categories: (UseCaseCategory | "all")[] = ["all", "app", "workflow"];

interface CategoryFilterProps {
  selected: UseCaseCategory | "all";
  onChange: (category: UseCaseCategory | "all") => void;
  locale?: Locale;
}

export function CategoryFilter({ selected, onChange, locale = "en" }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => onChange(cat)}
        >
          {cat === "all" ? t(locale, "useCases.all") : t(locale, categoryKeys[cat])}
        </Button>
      ))}
    </div>
  );
}
