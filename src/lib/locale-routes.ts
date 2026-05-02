import { localePath, locales, type Locale } from "@/i18n/index";

export type LocaleRouteProps = {
  locale: Locale;
};

export function getLocaleStaticPaths() {
  return locales.map((locale) => ({
    params: { locale },
    props: { locale },
  }));
}

export function canonicalPath(locale: Locale, path: string): string {
  return localePath(locale, path);
}
