import capabilityData from "@/data/addon-edition-capabilities.json";
import type {
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
