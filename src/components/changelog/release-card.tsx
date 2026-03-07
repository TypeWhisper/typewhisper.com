import { Apple, Monitor, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Release } from "@/data/releases";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function cleanBody(body: string | null): string | null {
  if (!body) return null;
  const stripped = body
    .replace(/\*\*Full Changelog\*\*:.*/g, "")
    .trim();
  return stripped || null;
}

export function ReleaseCard({ release }: { release: Release }) {
  const body = cleanBody(release.body);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            {release.platform === "mac" ? (
              <Apple className="size-3" />
            ) : (
              <Monitor className="size-3" />
            )}
            {release.platform === "mac" ? "macOS" : "Windows"}
          </Badge>
          <h3 className="font-display text-base font-semibold">
            {release.name}
          </h3>
        </div>
        <a
          href={release.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="View on GitHub"
        >
          <ExternalLink className="size-4" />
        </a>
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        {dateFormatter.format(new Date(release.published_at))}
      </p>

      {body ? (
        <div className="prose prose-neutral dark:prose-invert prose-sm mt-3 max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground italic">
          No detailed release notes.
        </p>
      )}
    </div>
  );
}
