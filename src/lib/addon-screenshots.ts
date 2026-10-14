import type { Locale } from "../i18n/index";

/** Plugin IDs with a Windows capture, and per locale the IDs that also have a translated one. */
export interface WindowsAddonScreenshots {
  windows: string[];
  windowsLocalized: Partial<Record<Locale, string[]>>;
}

/**
 * Path of the Windows capture of a plugin. `<id>.png` shows the English app;
 * a locale that lists the plugin gets its own `<id>.<locale>.png`.
 */
export function windowsAddonScreenshotSrc(
  screenshots: WindowsAddonScreenshots,
  pluginId: string | undefined,
  locale: Locale,
): string | undefined {
  if (!pluginId || !screenshots.windows.includes(pluginId)) return undefined;
  const variant = screenshots.windowsLocalized[locale]?.includes(pluginId)
    ? `.${locale}`
    : "";
  return `/screenshots/windows/plugins/${pluginId}${variant}.png`;
}
