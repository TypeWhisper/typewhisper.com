import { replacePageUrl } from "@/hooks/use-page-url";
import { useEffect, useRef, useState } from "react";
import { t, type Locale } from "@/i18n/index";

type SearchItem = { url: string; meta: { title?: string }; excerpt: string };
type Pagefind = {
  search: (
    query: string,
    options: { filters: Record<string, string> },
  ) => Promise<{ results: { data: () => Promise<SearchItem> }[] }>;
};
let engine: Promise<Pagefind> | undefined;
let loadAttempt = 0;
function loadEngine(): Promise<Pagefind> {
  // An absolute URL also bypasses Vite processing of this generated public module.
  const url = new URL("/pagefind/pagefind.js", window.location.origin);
  if (loadAttempt++) url.searchParams.set("retry", String(loadAttempt));
  const path = url.href;
  return (engine ??= import(/* @vite-ignore */ path)
    .then((module) => module as Pagefind)
    .catch((error) => {
      engine = undefined;
      throw error;
    }));
}

export function DocsSearch({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all");
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [results, setResults] = useState<SearchItem[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [retry, setRetry] = useState(0);
  const generation = useRef(0);
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(location.search);
      setQuery(params.get("q") ?? "");
      const value = params.get("platform");
      setPlatform(
        value && ["mac", "windows", "ios"].includes(value) ? value : "all",
      );
      setLimit(10);
      setReady(true);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const id = ++generation.current;
    const url = new URL(location.href);
    query.trim()
      ? url.searchParams.set("q", query.trim())
      : url.searchParams.delete("q");
    platform === "all"
      ? url.searchParams.delete("platform")
      : url.searchParams.set("platform", platform);
    replacePageUrl(url);
    setResults([]);
    if (!query.trim()) {
      setState("idle");
      return;
    }
    setState("loading");
    const timer = setTimeout(async () => {
      try {
        const pagefind = await loadEngine();
        const response = await pagefind.search(query.trim(), {
          filters: platform === "all" ? {} : { platform },
        });
        const items = await Promise.all(
          response.results.slice(0, limit).map((result) => result.data()),
        );
        if (generation.current !== id) return;
        setResults(items);
        setTotal(response.results.length);
        setState("done");
      } catch {
        if (generation.current === id) setState("error");
      }
    }, 180);
    return () => {
      clearTimeout(timer);
      generation.current++;
    };
  }, [query, platform, ready, limit, retry]);
  return (
    <div className="mt-6" data-testid="docs-search">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <label className="grid gap-2 text-sm font-medium">
          {t(locale, "docs.search.label")}
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(10);
            }}
            placeholder={t(locale, "docs.search.placeholder")}
            className="min-w-0 rounded-xl border bg-card px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          {t(locale, "setup.platform")}
          <select
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value);
              setLimit(10);
            }}
            className="rounded-xl border bg-card px-4 py-3"
          >
            <option value="all">{t(locale, "docs.allPlatforms")}</option>
            <option value="mac">macOS</option>
            <option value="windows">Windows</option>
            <option value="ios">iOS</option>
          </select>
        </label>
      </div>
      <p className="mt-5 text-sm text-muted-foreground" role="status">
        {state === "idle"
          ? t(locale, "docs.search.hint")
          : state === "loading"
            ? t(locale, "docs.search.loading")
            : state === "error"
              ? t(locale, "docs.search.error")
              : t(locale, "docs.search.count").replace(
                  "{count}",
                  String(total),
                )}
      </p>
      {state === "error" && (
        <button
          className="mt-3 rounded-lg border px-4 py-2"
          onClick={() => setRetry((value) => value + 1)}
        >
          {t(locale, "docs.search.retry")}
        </button>
      )}
      {state === "done" && total === 0 && (
        <p className="mt-3 text-muted-foreground">
          {t(locale, "docs.search.empty")}
        </p>
      )}
      <ul
        className="mt-4 divide-y divide-border"
        aria-busy={state === "loading"}
      >
        {results.map((result) => (
          <li key={result.url} className="py-5">
            <a
              href={result.url}
              className="text-lg font-semibold text-primary underline underline-offset-4"
            >
              {result.meta.title ?? result.url}
            </a>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {result.excerpt.replace(/<[^>]*>/g, "")}
            </p>
          </li>
        ))}
      </ul>
      {state === "done" && results.length < total && (
        <button
          className="mt-5 rounded-lg border px-4 py-2"
          onClick={() => setLimit((value) => value + 10)}
        >
          {t(locale, "docs.search.more")}
        </button>
      )}
    </div>
  );
}
