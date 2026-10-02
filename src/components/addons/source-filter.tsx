import {
  sourceFilters,
  sourceKeys as pluginSourceKeys,
  type PluginSource,
} from "@/data/addon-taxonomy";
import { t, type Locale } from "@/i18n/index";
import { FilterRow } from "./filter-row";

const sources: (PluginSource | "all")[] = ["all", ...sourceFilters];

const filterSourceKeys: Record<PluginSource | "all", string> = {
  all: "addons.allSources",
  ...pluginSourceKeys,
};

interface SourceFilterProps {
  selected: PluginSource | "all";
  onChange: (source: PluginSource | "all") => void;
  locale?: Locale;
}

export function SourceFilter({ selected, onChange, locale = "en" }: SourceFilterProps) {
  return (
    <FilterRow
      label={t(locale, "addons.filter.source")}
      selected={selected}
      onChange={onChange}
      options={sources.map((source) => ({
        value: source,
        label: t(locale, filterSourceKeys[source]),
      }))}
    />
  );
}
