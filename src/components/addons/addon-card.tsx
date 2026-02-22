import { Link } from "react-router";
import {
  Zap,
  Brain,
  Sparkles,
  Send,
  SquareKanban,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Plugin, type PluginCategory, categoryLabels } from "@/data/addons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Brain,
  Sparkles,
  Send,
  SquareKanban,
};

interface AddonCardProps {
  plugin: Plugin;
}

export function AddonCard({ plugin }: AddonCardProps) {
  const Icon = iconMap[plugin.icon];

  return (
    <Card className="hover:border-primary/20 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              {Icon && <Icon className="size-5 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-base">{plugin.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{plugin.author}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {plugin.source === "bundled" ? "Bundled" : "Community"}
          </Badge>
        </div>
        <CardDescription className="mt-2">{plugin.description}</CardDescription>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {plugin.categories.map((cat: PluginCategory) => (
            <Badge key={cat} variant="outline" className="text-[10px]">
              {categoryLabels[cat]}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to={`/addons/${plugin.slug}`}>
            View Details <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
