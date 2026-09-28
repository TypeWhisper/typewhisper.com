import { t, type Locale } from "@/i18n/index";
import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  lang?: string;
  locale?: Locale;
  onCopy?: () => void;
}

export function CodeBlock({
  code,
  lang = "swift",
  locale = "en",
  onCopy,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      onCopy?.();
      setFailed(false);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  }

  return (
    <div className="not-prose relative group overflow-hidden rounded-[0.875rem] border border-hairline bg-card">
      <button
        onClick={copyCode}
        className="absolute right-1.5 top-1 z-10 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={t(locale, "docs.copyCommand")}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <div className="border-b border-hairline px-4 py-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {lang}
      </div>
      <p className="sr-only" role="status">
        {failed
          ? t(locale, "docs.copyFailed")
          : copied
            ? t(locale, "docs.copied")
            : ""}
      </p>
      <pre
        tabIndex={0}
        aria-label={lang}
        className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-foreground"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
