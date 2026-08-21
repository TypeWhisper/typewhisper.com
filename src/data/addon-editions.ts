import type { ComponentType } from "react";
import type { Locale } from "@/i18n/index";
import type { PluginPlatform } from "@/data/addons";
import screenshotManifest from "@/data/addon-edition-screenshots.json";

export interface AddonEditionScreenshot {
  src: string;
  alt: string;
  caption?: string;
  localized?: boolean;
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
const editionSourcesEn = import.meta.glob<string>(
  "../content/addon-editions/en/**/*.mdx",
  { eager: true, query: "?raw", import: "default" },
);
const editionSourcesDe = import.meta.glob<string>(
  "../content/addon-editions/de/**/*.mdx",
  { eager: true, query: "?raw", import: "default" },
);

export const editionPlatformSlugs: Record<PluginPlatform, string> = {
  mac: "macos",
  windows: "windows",
  ios: "ios",
};

const platformOrder: PluginPlatform[] = ["mac", "windows", "ios"];
const windowsScreenshotPluginIds = new Set(screenshotManifest.windows);

export function getDefaultAddonEditionScreenshot(
  edition: AddonEdition,
): Pick<AddonEditionScreenshot, "src" | "localized"> | undefined {
  if (edition.platform === "mac") {
    return {
      src: `/screenshots/plugins/${edition.familySlug}.png`,
      localized: true,
    };
  }

  if (
    edition.platform === "windows" &&
    edition.id &&
    windowsScreenshotPluginIds.has(edition.id)
  ) {
    return {
      src: `/screenshots/windows/plugins/${edition.id}.png`,
      localized: false,
    };
  }

  return undefined;
}

function getModules(locale: Locale) {
  return locale === "de" ? editionModulesDe : editionModulesEn;
}

function getSources(locale: Locale) {
  return locale === "de" ? editionSourcesDe : editionSourcesEn;
}

/** Reports whether an edition MDX file contains a guide below its frontmatter. */
export function addonEditionHasGuide(
  familySlug: string,
  platform: PluginPlatform,
  locale: Locale = "en",
): boolean {
  const filename = `${editionPlatformSlugs[platform]}.mdx`;
  const source = Object.entries(getSources(locale)).find(([modulePath]) =>
    modulePath.endsWith(`/${familySlug}/${filename}`),
  )?.[1];

  if (!source) {
    return false;
  }

  return source.replace(/^---\n[\s\S]*?\n---\n?/, "").trim().length > 0;
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
