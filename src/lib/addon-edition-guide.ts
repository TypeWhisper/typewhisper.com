import type { PluginCategory } from "../data/addon-taxonomy";

/** The names an edition gives the add-on in the app. */
export interface AddonEditionAppNames {
  appName?: string;
  capabilityNames?: Partial<Record<PluginCategory, string>>;
}

/**
 * The name under which the app offers a capability of the add-on: in the
 * Dictation providers, a workflow's providers or action targets, or the
 * spoken feedback voices. Usually that is the name Discover plugins lists
 * (`appName`); some capabilities have a name of their own in the app.
 */
export function addonEditionCapabilityName(
  edition: AddonEditionAppNames,
  siteName: string,
  capability: PluginCategory,
): string {
  return edition.capabilityNames?.[capability] ?? edition.appName ?? siteName;
}
