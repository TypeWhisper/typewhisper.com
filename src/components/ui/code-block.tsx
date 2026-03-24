import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang = "swift" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="not-prose relative group overflow-hidden rounded-xl bg-muted">
      <button
        onClick={copyCode}
        className="absolute right-2 top-2 z-10 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <div className="border-b border-border/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {lang}
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
