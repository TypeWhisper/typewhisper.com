import { Button } from "@/components/ui/button";
import type { PluginSource } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";

const sources: (PluginSource | "all")[] = ["all", "bundled", "community"];

const sourceKeys: Record<PluginSource | "all", string> = {
  all: "addons.allSources",
  bundled: "addons.bundled",
  community: "addons.community",
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
          {t(locale, sourceKeys[s])}
        </Button>
      ))}
    </div>
  );
}
