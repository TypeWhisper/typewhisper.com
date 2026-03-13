import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  ArrowLeft,
  ExternalLink,
  Download,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import {
  getPluginModule,
  getPlugin,
  isCommunityPlugin,
  categoryLabels,
  platformLabels,
  type PluginCategory,
  type PluginPlatform,
  type Plugin,
} from "@/data/addons";

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
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function CommunityContent({ plugin }: { plugin: Plugin }) {
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!plugin.readmeUrl) {
      setLoading(false);
      return;
    }
    fetch(plugin.readmeUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch README");
        return res.text();
      })
      .then(setReadme)
      .catch(() => setReadme(null))
      .finally(() => setLoading(false));
  }, [plugin.readmeUrl]);

  const macDownload = plugin.downloads?.mac;

  return (
    <>
      {/* Download Section */}
      {macDownload && (
        <div className="mt-8 rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Download</h2>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href={macDownload.url}>
                <Download className="size-4" />
                Download v{plugin.version}
              </a>
            </Button>
            <span className="text-sm text-muted-foreground">
              {formatSize(macDownload.size)}
            </span>
            {plugin.license && (
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Scale className="size-3.5" />
                {plugin.license}
              </span>
            )}
          </div>
          {plugin.minAppVersion && (
            <p className="mt-3 text-xs text-muted-foreground">
              Requires TypeWhisper {plugin.minAppVersion} or later.
            </p>
          )}
          <div className="mt-4 rounded-xl bg-muted/50 p-4">
            <h3 className="text-sm font-semibold">Installation</h3>
            <ol className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>1. Download and unzip the file.</li>
              <li>
                2. Move the <code className="rounded bg-muted px-1 py-0.5 text-xs">.bundle</code> file to{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  ~/Library/Application Support/TypeWhisper/Plugins/
                </code>
              </li>
              <li>3. Restart TypeWhisper.</li>
            </ol>
          </div>
        </div>
      )}

      {/* README Content */}
      {loading ? (
        <div className="mt-10 text-center text-muted-foreground">
          Loading documentation...
        </div>
      ) : readme ? (
        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre({ children }) {
                return <>{children}</>;
              },
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const code = String(children).replace(/\n$/, "");
                if (match) {
                  return <CodeBlock code={code} lang={match[1]} />;
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {readme}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="mt-10">
          <p className="text-muted-foreground">{plugin.description}</p>
        </div>
      )}
    </>
  );
}

export default function AddonsDetail() {
  const { slug } = useParams();
  const mod = slug ? getPluginModule(slug) : undefined;
  const plugin = mod?.frontmatter ?? (slug ? getPlugin(slug) : undefined);

  if (!plugin) {
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
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-muted">
            {plugin.iconUrl ? (
              <img
                src={plugin.iconUrl}
                alt={plugin.name}
                className="size-8 rounded-lg"
              />
            ) : (
              Icon && <Icon className="size-7 text-muted-foreground" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl font-bold">{plugin.name}</h1>
              <Badge variant="secondary" className="text-[10px]">
                {plugin.source === "bundled" ? "Bundled" : "Community"}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              by{" "}
              {plugin.authorUrl ? (
                <a
                  href={plugin.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {plugin.author}
                </a>
              ) : (
                plugin.author
              )}
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
        {(plugin.apiDocsUrl || plugin.sourceUrl || plugin.homepage) && (
          <div className="mt-6 flex flex-wrap gap-4">
            {plugin.homepage && (
              <a
                href={plugin.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="size-3.5" />
                Homepage
              </a>
            )}
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

        {/* Content */}
        {mod ? (
          <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
            {(() => {
              const MdxContent = mod.default as React.ComponentType<{ components?: Record<string, React.ComponentType<any>> }>;
              return <MdxContent components={{
                pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
                code: ({ className, children }: { className?: string; children: React.ReactNode }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeStr = String(children).replace(/\n$/, "");
                  if (match) {
                    return <CodeBlock code={codeStr} lang={match[1]} />;
                  }
                  return <code className={className}>{children}</code>;
                },
              }} />;
            })()}
          </div>
        ) : isCommunityPlugin(plugin) ? (
          <CommunityContent plugin={plugin} />
        ) : null}
      </div>
    </div>
  );
}
