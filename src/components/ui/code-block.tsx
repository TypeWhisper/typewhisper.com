import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["swift", "json", "bash", "shell"],
    });
  }
  return highlighterPromise;
}

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang = "swift" }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((highlighter) => {
      if (cancelled) return;
      const result = highlighter.codeToHtml(code, {
        lang,
        themes: { dark: "github-dark", light: "github-light" },
      });
      setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <pre className="overflow-x-auto rounded-xl bg-muted p-3 text-xs">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className="[&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:p-3 [&_pre]:text-xs [&_.shiki]:bg-muted!"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
