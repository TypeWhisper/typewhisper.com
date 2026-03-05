import { Button } from "@/components/ui/button";
import { type UseCaseCategory, categoryLabels } from "@/data/use-cases";

const categories: (UseCaseCategory | "all")[] = ["all", "app", "workflow"];

interface CategoryFilterProps {
  selected: UseCaseCategory | "all";
  onChange: (category: UseCaseCategory | "all") => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
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
          {cat === "all" ? "All" : categoryLabels[cat]}
        </Button>
      ))}
    </div>
  );
}
