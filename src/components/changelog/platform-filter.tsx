import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/index";

type Platform = "all" | "mac" | "windows";

const platforms: { value: Platform; label: string }[] = [
  { value: "all", label: "All Platforms" },
  { value: "mac", label: "macOS" },
  { value: "windows", label: "Windows" },
];

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  locale?: Locale;
}

export function PlatformFilter({ selected, onChange, locale = "en" }: PlatformFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((p) => (
        <Button
          key={p.value}
          variant={selected === p.value ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => onChange(p.value)}
        >
          {p.value === "all" && locale === "de" ? "Alle Plattformen" : p.label}
        </Button>
      ))}
    </div>
  );
}
