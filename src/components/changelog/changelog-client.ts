import { replacePageUrl, subscribeToPageUrl } from "@/hooks/use-page-url";
import { t, type Locale } from "@/i18n/index";

type Platform = "all" | "mac" | "windows";
type Load = "idle" | "loading" | "ready" | "error";

interface PreReleaseFile {
  months: Record<string, string>;
  entries: string[];
}

/**
 * Not `platform`: the site header writes that one for the download button and
 * adds it to the language link, which would filter the list unasked.
 */
const platformParam = "os";

const locale: Locale = document.documentElement.lang === "de" ? "de" : "en";

/** Picks the singular or plural string and fills in `{count}`. */
function plural(key: string, value: number, count = value): string {
  return t(locale, `${key}.${value === 1 ? "one" : "other"}`).replace(
    "{count}",
    String(count),
  );
}

function readState(): { platform: Platform; pre: boolean } {
  const params = new URLSearchParams(window.location.search);
  const platform = params.get(platformParam);
  return {
    platform: platform === "mac" || platform === "windows" ? platform : "all",
    pre: params.get("pre") === "1",
  };
}

/**
 * Platform filter and pre-release switch of the changelog. The stable entries
 * are static HTML; pre-releases arrive as rendered entries from a static file
 * once the visitor asks for them. Both choices live in the URL.
 */
export function startChangelog() {
  const root = document.querySelector<HTMLElement>("[data-changelog]");
  const months = root?.querySelector<HTMLElement>("[data-months]");
  const toggle = root?.querySelector<HTMLButtonElement>("[data-pre-toggle]");
  const status = root?.querySelector<HTMLElement>("[data-status]");
  const error = root?.querySelector<HTMLElement>("[data-error]");
  const empty = root?.querySelector<HTMLElement>("[data-empty]");
  if (!root || !months || !toggle || !status || !error || !empty) return;

  const options = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-platform-option]"),
  ];
  const openEntries = Number(root.dataset.openEntries) || 10;
  let state = readState();
  let load: Load = "idle";

  /** Shows what matches; `rewrite` also decides anew which entries are written out. */
  function render(rewrite: boolean) {
    let total = 0;
    let pre = 0;
    let written = 0;

    for (const section of months!.querySelectorAll<HTMLElement>("[data-month]")) {
      let visible = 0;
      for (const entry of section.querySelectorAll<HTMLDetailsElement>(
        "[data-entry]",
      )) {
        const stable = entry.dataset.kind === "stable";
        const show =
          (state.platform === "all" ||
            entry.dataset.platform === state.platform) &&
          (stable || (state.pre && load === "ready"));
        entry.hidden = !show;
        if (show) {
          visible += 1;
          if (!stable) pre += 1;
        }
        // Pre-releases stay one line: their notes repeat from day to day.
        if (rewrite && stable) {
          entry.open = show && written < openEntries;
          if (show) written += 1;
        }
      }
      section.hidden = visible === 0;
      const counter = section.querySelector("[data-month-count]");
      if (counter) counter.textContent = plural("changelog.month", visible);
      total += visible;
    }

    for (const option of options) {
      option.setAttribute(
        "aria-pressed",
        String(option.dataset.platformOption === state.platform),
      );
    }
    toggle!.setAttribute("aria-checked", String(state.pre));
    toggle!.setAttribute("aria-busy", String(state.pre && load === "loading"));
    root!.dataset.load = load;

    error!.hidden = !(state.pre && load === "error");
    empty!.hidden = total > 0;
    if (state.pre && load === "loading") {
      status!.textContent = t(locale, "changelog.pre.loading");
    } else if (pre > 0) {
      status!.textContent = plural("changelog.status.all", pre, total).replace(
        "{pre}",
        String(pre),
      );
    } else {
      status!.textContent = plural("changelog.status.stable", total);
    }
  }

  function monthSection(month: string, label: string): HTMLElement {
    const existing = months!.querySelector<HTMLElement>(
      `[data-month="${month}"]`,
    );
    if (existing) return existing;

    const section = document.createElement("section");
    section.className = "utility-month";
    section.dataset.month = month;
    section.setAttribute("aria-labelledby", `month-${month}`);
    const head = document.createElement("div");
    head.className = "utility-month__head";
    const title = document.createElement("h2");
    title.className = "utility-month__title";
    title.id = `month-${month}`;
    title.textContent = label;
    const counter = document.createElement("p");
    counter.className = "site-meta";
    counter.dataset.monthCount = "";
    const entries = document.createElement("div");
    entries.className = "utility-month__entries";
    entries.dataset.entries = "";
    head.append(title, counter);
    section.append(head, entries);

    const older = [
      ...months!.querySelectorAll<HTMLElement>("[data-month]"),
    ].find((item) => (item.dataset.month ?? "") < month);
    months!.insertBefore(section, older ?? null);
    return section;
  }

  /** Sorts the fetched entries into the months, newest first. */
  function merge(file: PreReleaseFile) {
    const template = document.createElement("template");
    template.innerHTML = file.entries.join("");
    const incoming = [
      ...template.content.querySelectorAll<HTMLElement>("[data-entry]"),
    ];

    for (const entry of incoming) {
      const date = entry.dataset.date ?? "";
      const month = date.slice(0, 7);
      const list = monthSection(
        month,
        file.months[month] ?? month,
      ).querySelector<HTMLElement>("[data-entries]")!;
      const older = [
        ...list.querySelectorAll<HTMLElement>(":scope > [data-entry]"),
      ].find((item) => (item.dataset.date ?? "") < date);
      list.insertBefore(entry, older ?? null);
    }
  }

  async function loadPreReleases() {
    if (load === "loading" || load === "ready") return;
    load = "loading";
    render(false);
    try {
      const response = await fetch(root!.dataset.prereleasesUrl ?? "", {
        headers: { accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      merge((await response.json()) as PreReleaseFile);
      load = "ready";
    } catch {
      load = "error";
    }
    render(false);
    openTarget();
  }

  function writeUrl() {
    const url = new URL(window.location.href);
    if (state.platform === "all") url.searchParams.delete(platformParam);
    else url.searchParams.set(platformParam, state.platform);
    if (state.pre) url.searchParams.set("pre", "1");
    else url.searchParams.delete("pre");
    replacePageUrl(url);
  }

  /** A link to `#mac-v1.6.1` opens that entry. */
  function openTarget() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!(target instanceof HTMLDetailsElement) || target.hidden) return;
    target.open = true;
    target.scrollIntoView({ block: "start" });
  }

  for (const option of options) {
    option.addEventListener("click", () => {
      const platform = option.dataset.platformOption as Platform;
      if (platform === state.platform) return;
      state = { ...state, platform };
      writeUrl();
      render(true);
    });
  }

  toggle.addEventListener("click", () => {
    state = { ...state, pre: !state.pre };
    writeUrl();
    render(false);
    if (state.pre) void loadPreReleases();
  });

  error.querySelector("[data-retry]")?.addEventListener("click", () => {
    load = "idle";
    void loadPreReleases();
  });

  // Back, forward, and other controls that write the URL.
  subscribeToPageUrl(() => {
    const next = readState();
    if (next.platform === state.platform && next.pre === state.pre) return;
    const rewrite = next.platform !== state.platform;
    state = next;
    render(rewrite);
    if (state.pre) void loadPreReleases();
  });

  render(state.platform !== "all");
  if (state.pre) void loadPreReleases();
  openTarget();
}
