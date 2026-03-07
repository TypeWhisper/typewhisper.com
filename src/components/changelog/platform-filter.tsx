import { Button } from "@/components/ui/button";

type Platform = "all" | "mac" | "windows";

const platforms: { value: Platform; label: string }[] = [
  { value: "all", label: "All Platforms" },
  { value: "mac", label: "macOS" },
  { value: "windows", label: "Windows" },
];

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
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
          {p.label}
        </Button>
      ))}
    </div>
  );
}
