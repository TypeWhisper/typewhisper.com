import { type PluginPlatform, platformKeys } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";
import { FilterRow } from "./filter-row";

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
    <FilterRow
      label={t(locale, "addons.filter.platform")}
      selected={selected}
      onChange={onChange}
      options={platforms.map((platform) => ({
        value: platform,
        label:
          platform === "all"
            ? t(locale, "addons.allPlatforms")
            : t(locale, platformKeys[platform]),
      }))}
    />
  );
}
