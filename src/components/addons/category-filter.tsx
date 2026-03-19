import { Button } from "@/components/ui/button";
import { type PluginCategory, categoryLabels } from "@/data/addons";

const categories: (PluginCategory | "all")[] = [
  "all",
  "transcription",
  "llm",
  "action",
  "post-processing",
  "memory",
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
