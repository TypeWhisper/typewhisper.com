import { Button } from "@/components/ui/button";
import { type PluginPlatform, platformKeys } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";

const platforms: (PluginPlatform | "all")[] = [
  "all",
  "mac",
  "windows",
  "ios",
];

interface PlatformFilterProps {
  selected: PluginPlatform | "all";
  onChange: (platform: PluginPlatform | "all") => void;
  locale?: Locale;
}

export function PlatformFilter({ selected, onChange, locale = "en" }: PlatformFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((p) => (
        <Button
          key={p}
          variant={selected === p ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => onChange(p)}
        >
          {p === "all" ? t(locale, "addons.allPlatforms") : t(locale, platformKeys[p])}
        </Button>
      ))}
    </div>
  );
}
