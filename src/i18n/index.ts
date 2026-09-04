export type Locale = "en" | "de";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "de"];

const translations: Record<Locale, Record<string, string>> | null = import.meta
  .env.SSR
  ? {
      en: (await import("./locales/en/index")).default,
      de: (await import("./locales/de/index")).default,
    }
  : null;
let clientMessages: Record<string, string> | undefined;
function getClientMessages(): Record<string, string> {
  if (!clientMessages) {
    const element = document.getElementById("page-translations");
    clientMessages = JSON.parse(element?.textContent || "{}");
  }
  return clientMessages!;
}

/** Look up a translation key for the given locale. Falls back to English, then returns the key itself. */
export function t(locale: Locale, key: string): string {
  if (import.meta.env.SSR)
    return translations?.[locale]?.[key] ?? translations?.en[key] ?? key;
  return getClientMessages()[key] ?? key;
}

/** Get locale from a URL path segment, e.g. "/de/docs" -> "de". */
export function getLocaleFromPath(path: string): Locale {
  const segment = path.split("/").filter(Boolean)[0];
  if (locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

/** Build a locale-prefixed path, e.g. localePath("de", "/docs") -> "/de/docs". */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Get the alternate-language path for the language switcher. */
export function getAlternatePath(
  currentPath: string,
  targetLocale: Locale,
): string {
  const currentLocale = getLocaleFromPath(currentPath);
  // Strip current locale prefix
  let basePath = currentPath;
  if (currentPath.startsWith(`/${currentLocale}/`)) {
    basePath = currentPath.slice(`/${currentLocale}`.length) || "/";
  } else if (currentPath === `/${currentLocale}`) {
    basePath = "/";
  }
  return localePath(targetLocale, basePath);
}

/** Map locale to og:locale value. */
export function ogLocale(locale: Locale): string {
  return locale === "de" ? "de_DE" : "en_US";
}

/** Build a locale-aware screenshot path, e.g. screenshotPath("de", "/screenshots/mac/home.png") -> "/screenshots/de/mac/home.png". */
export function screenshotPath(locale: Locale, path: string): string {
  return path.replace("/screenshots/", `/screenshots/${locale}/`);
}

/** Swap a raster image path to a WebP sibling, e.g. "/screenshots/en/mac/home.png" -> "/screenshots/en/mac/home.webp". */
export function webpPath(path: string): string {
  return path.replace(/\.(png|jpe?g)$/i, ".webp");
}
