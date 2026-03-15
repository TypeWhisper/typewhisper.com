import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import type { Plugin } from "@/data/addons";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CommunityContent({ plugin }: { plugin: Plugin }) {
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
