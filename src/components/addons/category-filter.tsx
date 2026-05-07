import { Button } from "@/components/ui/button";
import { type PluginCategory, categoryKeys } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";

const categories: (PluginCategory | "all")[] = [
  "all",
  "transcription",
  "llm",
  "tts",
  "action",
  "post-processing",
  "memory",
];

interface CategoryFilterProps {
  selected: PluginCategory | "all";
  onChange: (category: PluginCategory | "all") => void;
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
          {cat === "all" ? t(locale, "addons.allCategories") : t(locale, categoryKeys[cat])}
        </Button>
      ))}
    </div>
  );
}
