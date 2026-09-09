import capabilityData from "@/data/addon-edition-capabilities.json";
import type {
  Plugin,
  PluginCategory,
  PluginPlatform,
} from "@/data/addons";

type EditionCapabilityMap = Record<
  string,
  Partial<Record<PluginPlatform, PluginCategory[]>>
>;

const editionCapabilities = capabilityData as EditionCapabilityMap;

/** Returns the capabilities implemented by one platform edition. */
export function getAddonEditionCapabilities(
  familySlug: string,
  platform: PluginPlatform,
): PluginCategory[] {
  return editionCapabilities[familySlug]?.[platform] ?? [];
}

/** Uses the selected edition's capabilities, including single-platform add-ons. */
export function getAddonCategoriesForPlatform(
  plugin: Plugin,
  platform: PluginPlatform | "all",
): PluginCategory[] {
  if (platform === "all") {
    return [...new Set(plugin.platforms.flatMap((edition) =>
      editionCapabilities[plugin.slug]?.[edition] ?? plugin.categories,
    ))];
  }
  if (!plugin.platforms.includes(platform)) return [];
  return editionCapabilities[plugin.slug]?.[platform] ?? plugin.categories;
}
