import { type PluginCategory, categoryKeys } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";
import { FilterRow } from "./filter-row";

const categories: (PluginCategory | "all")[] = [
  "all",
  "transcription",
  "llm",
  "tts",
  "action",
  "post-processing",
  "memory",
  "utility",
];

interface CategoryFilterProps {
  selected: PluginCategory | "all";
  onChange: (category: PluginCategory | "all") => void;
  locale?: Locale;
}

export function CategoryFilter({ selected, onChange, locale = "en" }: CategoryFilterProps) {
  return (
    <FilterRow
      label={t(locale, "addons.filter.category")}
      selected={selected}
      onChange={onChange}
      options={categories.map((category) => ({
        value: category,
        label:
          category === "all"
            ? t(locale, "addons.allCategories")
            : t(locale, categoryKeys[category]),
      }))}
    />
  );
}
