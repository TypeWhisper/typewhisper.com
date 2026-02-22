import { Button } from "@/components/ui/button";
import { type PluginPlatform, platformLabels } from "@/data/addons";

const platforms: (PluginPlatform | "all")[] = [
  "all",
  "mac",
  "windows",
  "ios",
];

interface PlatformFilterProps {
  selected: PluginPlatform | "all";
  onChange: (platform: PluginPlatform | "all") => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((p) => (
        <Button
          key={p}
          variant={selected === p ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onChange(p)}
        >
          {p === "all" ? "All Platforms" : platformLabels[p]}
        </Button>
      ))}
    </div>
  );
}
