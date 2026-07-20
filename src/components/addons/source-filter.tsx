import { Button } from "@/components/ui/button";
import { sourceKeys as pluginSourceKeys, type PluginSource } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";

const sources: (PluginSource | "all")[] = ["all", "bundled", "official", "community"];

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
    <div className="flex flex-wrap gap-2">
      {sources.map((s) => (
        <Button
          key={s}
          variant={selected === s ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => onChange(s)}
        >
          {t(locale, filterSourceKeys[s])}
        </Button>
      ))}
    </div>
  );
}
