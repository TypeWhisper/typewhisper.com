import { Button } from "@/components/ui/button";
import type { PluginSource } from "@/data/addons";

const sources: (PluginSource | "all")[] = ["all", "bundled", "community"];

const sourceLabels: Record<PluginSource | "all", string> = {
  all: "All Sources",
  bundled: "Bundled",
  community: "Community",
};

interface SourceFilterProps {
  selected: PluginSource | "all";
  onChange: (source: PluginSource | "all") => void;
}

export function SourceFilter({ selected, onChange }: SourceFilterProps) {
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
          {sourceLabels[s]}
        </Button>
      ))}
    </div>
  );
}
