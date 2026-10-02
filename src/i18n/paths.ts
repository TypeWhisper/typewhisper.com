import type { Locale } from "./index";

/**
 * Pages are built as directories, so their address ends with a slash; the
 * slashless form only redirects there. Query and hash stay where they are,
 * and a path that names a file ("/feed.xml") is left alone.
 */
export function withTrailingSlash(path: string): string {
  const end = path.search(/[?#]/);
  const pathname = end === -1 ? path : path.slice(0, end);
  if (pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname)) return path;
  return `${pathname}/${path.slice(pathname.length)}`;
}

/** Build a locale-prefixed path, e.g. localePath("de", "/docs") -> "/de/docs/". */
export function localePath(locale: Locale, path: string): string {
  // An absolute URL is not a path of this site.
  if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${withTrailingSlash(clean)}`;
}
