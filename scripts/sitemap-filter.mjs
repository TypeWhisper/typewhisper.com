import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const META_REFRESH_RE = /<meta[^>]+http-equiv=["']?refresh/i;
const NOINDEX_RE = /<meta[^>]+name=["']?robots["']?[^>]+content=["'][^"']*noindex/i;

/** A page that only forwards the visitor carries a meta refresh. */
export function isRedirectHtml(html) {
  return META_REFRESH_RE.test(html);
}

/** A page that asks search engines not to index it, e.g. a page that is not live yet. */
export function isNoIndexHtml(html) {
  return NOINDEX_RE.test(html);
}

/**
 * Filter for @astrojs/sitemap. The sitemap is written after the pages, so the
 * built HTML tells whether a URL is a redirect page: the unprefixed URLs that
 * forward to a locale, and moved pages such as the legacy docs routes.
 */
export function createSitemapFilter(distDir) {
  return (page) => {
    const pathname = decodeURIComponent(new URL(page).pathname);
    const file = fileURLToPath(new URL(`.${pathname}index.html`, distDir));
    if (!existsSync(file)) return true;
    const html = readFileSync(file, "utf8");
    return !isRedirectHtml(html) && !isNoIndexHtml(html);
  };
}
