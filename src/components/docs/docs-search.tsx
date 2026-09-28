import { replacePageUrl } from "@/hooks/use-page-url";
import { Search } from "lucide-react";
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

/** Convert Pagefind's highlighted HTML excerpt into safe React text. */
function plainExcerpt(excerpt: string): string {
  const decoder = document.createElement("textarea");
  decoder.innerHTML = excerpt.replace(/<[^>]*>/g, "");
  return decoder.value;
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
        setResults(
          items.map((item) => ({
            ...item,
            excerpt: plainExcerpt(item.excerpt),
          })),
        );
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
  const platforms = [
    ["all", t(locale, "docs.allPlatforms")],
    ["mac", "macOS"],
    ["windows", "Windows"],
    ["ios", "iOS"],
  ];
  return (
    <div className="docs-find" data-testid="docs-search">
      <label className="docs-find__field">
        <span className="sr-only">{t(locale, "docs.search.label")}</span>
        <span className="docs-search">
          <Search aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(10);
            }}
            placeholder={t(locale, "docs.search.placeholder")}
            className="docs-search__input"
            autoComplete="off"
            aria-keyshortcuts="/"
            data-docs-search-input
          />
          <kbd
            className="docs-search__key"
            title={t(locale, "docs.searchShortcut")}
          >
            /
          </kbd>
        </span>
      </label>
      <div
        className="docs-find__filter"
        role="group"
        aria-labelledby="docs-find-platform"
      >
        <span id="docs-find-platform" className="docs-find__filter-label">
          {t(locale, "setup.platform")}
        </span>
        <div className="site-chips">
          {platforms.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className="site-chip"
              aria-pressed={platform === value}
              onClick={() => {
                setPlatform(value);
                setLimit(10);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="docs-find__status" role="status">
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
          type="button"
          className="site-button site-button--quiet site-button--small docs-find__more"
          onClick={() => setRetry((value) => value + 1)}
        >
          {t(locale, "docs.search.retry")}
        </button>
      )}
      {state === "done" && total === 0 && (
        <p className="docs-find__empty">{t(locale, "docs.search.empty")}</p>
      )}
      <ul className="docs-find__results" aria-busy={state === "loading"}>
        {results.map((result) => (
          <li key={result.url}>
            <a href={result.url}>{result.meta.title ?? result.url}</a>
            <p className="docs-find__path">{result.url}</p>
            <p className="docs-find__excerpt">{result.excerpt}</p>
          </li>
        ))}
      </ul>
      {state === "done" && results.length < total && (
        <button
          type="button"
          className="site-button site-button--quiet site-button--small docs-find__more"
          onClick={() => setLimit((value) => value + 10)}
        >
          {t(locale, "docs.search.more")}
        </button>
      )}
    </div>
  );
}
