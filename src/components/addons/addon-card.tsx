import { Link } from "react-router";
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
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Plugin, type PluginCategory, type PluginPlatform, categoryLabels, platformLabels } from "@/data/addons";

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
};

interface AddonCardProps {
  plugin: Plugin;
}

export function AddonCard({ plugin }: AddonCardProps) {
  const Icon = iconMap[plugin.icon];

  return (
    <Link
      to={`/addons/${plugin.slug}`}
      className="group block rounded-2xl border bg-card p-6 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
            {Icon && <Icon className="size-5 text-muted-foreground" />}
          </div>
          <div>
            <h3 className="text-base font-semibold">{plugin.name}</h3>
            <p className="text-xs text-muted-foreground">{plugin.author}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-[10px]">
          {plugin.source === "bundled" ? "Bundled" : "Community"}
        </Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{plugin.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {plugin.categories.map((cat: PluginCategory) => (
          <Badge key={cat} variant="outline" className="text-[10px]">
            {categoryLabels[cat]}
          </Badge>
        ))}
        {plugin.platforms.map((p: PluginPlatform) => (
          <Badge key={p} variant="outline" className="text-[10px] border-primary/30 text-primary/70">
            {platformLabels[p]}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        View Details <ArrowRight className="size-4" />
      </div>
    </Link>
  );
}
