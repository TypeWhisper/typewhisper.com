import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import type { Plugin } from "@/data/addon-taxonomy";
import { t, type Locale } from "@/i18n/index";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Sets code into the placeholders of a translated sentence. */
function withCode(text: string, values: Record<string, string>) {
  return text.split(/(\{\w+\})/).map((part, index) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    return key && values[key] ? <code key={index}>{values[key]}</code> : part;
  });
}

interface CommunityContentProps {
  plugin: Plugin;
  locale?: Locale;
}

export default function CommunityContent({
  plugin,
  locale = "en",
}: CommunityContentProps) {
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
        <section className="site-prose addon-prose addon-download">
          <h2>{t(locale, "addons.community.download")}</h2>
          <div className="site-actions site-actions--start">
            <a
              href={macDownload.url}
              className="site-button site-button--small"
            >
              <Download className="size-4" aria-hidden="true" />
              {t(locale, "addons.community.downloadVersion").replace(
                "{version}",
                plugin.version ?? "",
              )}
            </a>
            <p className="site-meta">
              <span>{formatSize(macDownload.size)}</span>
              {plugin.license && <span>{plugin.license}</span>}
            </p>
          </div>
          {plugin.minAppVersion && (
            <p>
              {t(locale, "addons.community.requires").replace(
                "{version}",
                plugin.minAppVersion,
              )}
            </p>
          )}
          <h3>{t(locale, "addons.community.installation")}</h3>
          <ol>
            <li>{t(locale, "addons.community.step1")}</li>
            <li>
              {withCode(t(locale, "addons.community.step2"), {
                bundle: ".bundle",
                path: "~/Library/Application Support/TypeWhisper/Plugins/",
              })}
            </li>
            <li>{t(locale, "addons.community.step3")}</li>
          </ol>
        </section>
      )}

      {loading ? (
        <p className="site-text" role="status">
          {t(locale, "addons.community.loading")}
        </p>
      ) : readme ? (
        <div className="site-prose addon-prose">
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
                  return (
                    <CodeBlock code={code} lang={match[1]} locale={locale} />
                  );
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
      ) : null}
    </>
  );
}
