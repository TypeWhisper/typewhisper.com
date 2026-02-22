import { useParams, Link } from "react-router";
import {
  Zap,
  Brain,
  Sparkles,
  Send,
  SquareKanban,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getPluginModule,
  categoryLabels,
  platformLabels,
  type PluginCategory,
  type PluginPlatform,
} from "@/data/addons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Brain,
  Sparkles,
  Send,
  SquareKanban,
};

export default function AddonsDetail() {
  const { slug } = useParams();
  const mod = slug ? getPluginModule(slug) : undefined;

  if (!mod) {
    return (
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h1 className="font-display text-2xl font-bold">
            Add-on not found
          </h1>
          <p className="mt-2 text-muted-foreground">
            The add-on you're looking for doesn't exist.
          </p>
          <Button variant="ghost" size="sm" asChild className="mt-4">
            <Link to="/addons">
              <ArrowLeft className="size-4" />
              Back to Add-ons
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Content = mod.default;
  const { frontmatter: plugin } = mod;
  const Icon = iconMap[plugin.icon];

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/addons">
            <ArrowLeft className="size-4" />
            Back to Add-ons
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            {Icon && <Icon className="size-7 text-primary" />}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl font-bold">{plugin.name}</h1>
              <Badge variant="secondary" className="text-[10px]">
                {plugin.source === "bundled" ? "Bundled" : "Community"}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              by {plugin.author}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
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
          </div>
        </div>

        {/* Links */}
        {(plugin.apiDocsUrl || plugin.sourceUrl) && (
          <div className="mt-6 flex flex-wrap gap-4">
            {plugin.apiDocsUrl && (
              <a
                href={plugin.apiDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="size-3.5" />
                API Docs
              </a>
            )}
            {plugin.sourceUrl && (
              <a
                href={plugin.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="size-3.5" />
                Source Code
              </a>
            )}
          </div>
        )}

        {/* MDX Content */}
        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
          <Content />
        </div>
      </div>
    </div>
  );
}
