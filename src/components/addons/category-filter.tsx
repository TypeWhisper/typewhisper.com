import { Button } from "@/components/ui/button";
import { type PluginCategory, categoryLabels } from "@/data/addons";

const categories: (PluginCategory | "all")[] = [
  "all",
  "transcription",
  "llm",
  "action",
  "post-processing",
];

interface CategoryFilterProps {
  selected: PluginCategory | "all";
  onChange: (category: PluginCategory | "all") => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onChange(cat)}
        >
          {cat === "all" ? "All" : categoryLabels[cat]}
        </Button>
      ))}
    </div>
  );
}
