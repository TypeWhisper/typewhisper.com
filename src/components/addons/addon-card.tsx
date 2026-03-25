import {
  Zap,
  Brain,
  Sparkles,
  Send,
  SquareKanban,
  Cpu,
  Radio,
  AudioLines,
  Waves,
  Mic,
  Plug,
  AudioWaveform,
  Gem,
  Terminal,
  Captions,
  Cloud,
  Flame,
  HardDrive,
  Mountain,
  Search,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Plugin, type PluginCategory, type PluginPlatform, categoryKeys, platformKeys } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Brain,
  Sparkles,
  Send,
  SquareKanban,
  Cpu,
  Radio,
  AudioLines,
  Waves,
  Mic,
  Plug,
  AudioWaveform,
  Gem,
  Terminal,
  Captions,
  Cloud,
  Flame,
  HardDrive,
  Mountain,
  Search,
};

interface AddonCardProps {
  plugin: Plugin;
  basePath?: string;
  locale?: Locale;
}

export function AddonCard({ plugin, basePath = "/addons", locale = "en" }: AddonCardProps) {
  const Icon = iconMap[plugin.icon];

  return (
    <a
      href={`${basePath}/${plugin.slug}`}
      className="group block rounded-2xl border bg-card p-6 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
            {plugin.iconUrl ? (
              <img
                src={plugin.iconUrl}
                alt={plugin.name}
                className="size-6 rounded"
              />
            ) : (
              Icon && <Icon className="size-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-base font-semibold">{plugin.name}</h3>
            <p className="text-xs text-muted-foreground">{plugin.author}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-[10px]">
          {plugin.source === "bundled" ? t(locale, "addons.bundled") : t(locale, "addons.community")}
        </Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{plugin.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {plugin.categories.map((cat: PluginCategory) => (
          <Badge key={cat} variant="outline" className="text-[10px]">
            {t(locale, categoryKeys[cat])}
          </Badge>
        ))}
        {plugin.platforms.map((p: PluginPlatform) => (
          <Badge key={p} variant="outline" className="text-[10px] border-primary/30 text-primary/70">
            {t(locale, platformKeys[p])}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {t(locale, "addons.viewDetails")} <ArrowRight className="size-4" />
      </div>
    </a>
  );
}
