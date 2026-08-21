import type { ComponentType } from "react";
import type { Locale } from "@/i18n/index";
import type { PluginPlatform } from "@/data/addons";

export interface AddonEditionScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface AddonEdition {
  familySlug: string;
  platform: PluginPlatform;
  version: string;
  description: string;
  id?: string;
  minAppVersion?: string;
  minOsVersion?: string;
  requirements?: string[];
  highlights?: string[];
  configuration?: string[];
  sourceUrl?: string;
  releaseUrl?: string;
  screenshots?: AddonEditionScreenshot[];
  hasCustomGuide?: boolean;
}

export interface AddonEditionModule {
  default: ComponentType;
  frontmatter: AddonEdition;
}

const editionModulesEn = import.meta.glob<AddonEditionModule>(
  "../content/addon-editions/en/**/*.mdx",
  { eager: true },
);
const editionModulesDe = import.meta.glob<AddonEditionModule>(
  "../content/addon-editions/de/**/*.mdx",
  { eager: true },
);

export const editionPlatformSlugs: Record<PluginPlatform, string> = {
  mac: "macos",
  windows: "windows",
  ios: "ios",
};

const platformOrder: PluginPlatform[] = ["mac", "windows", "ios"];

function getModules(locale: Locale) {
  return locale === "de" ? editionModulesDe : editionModulesEn;
}

export function getAddonEditionModules(
  locale: Locale = "en",
): AddonEditionModule[] {
  return Object.values(getModules(locale));
}

export function getAddonEditions(
  familySlug: string,
  locale: Locale = "en",
): AddonEdition[] {
  return getAddonEditionModules(locale)
    .map((mod) => mod.frontmatter)
    .filter((edition) => edition.familySlug === familySlug)
    .sort(
      (a, b) =>
        platformOrder.indexOf(a.platform) - platformOrder.indexOf(b.platform),
    );
}

export function getAddonEditionModule(
  familySlug: string,
  platform: PluginPlatform,
  locale: Locale = "en",
): AddonEditionModule | undefined {
  return getAddonEditionModules(locale).find(
    (mod) =>
      mod.frontmatter.familySlug === familySlug &&
      mod.frontmatter.platform === platform,
  );
}

export function getEditionPlatformFromSlug(
  platformSlug: string,
): PluginPlatform | undefined {
  return (Object.entries(editionPlatformSlugs) as [PluginPlatform, string][]).find(
    ([, slug]) => slug === platformSlug,
  )?.[0];
}
