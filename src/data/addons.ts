import type { ComponentType } from "react";
import type { Locale } from "@/i18n/index";
import type { Plugin } from "@/data/addon-taxonomy";
import communityData from "./community-plugins.json";

// Server only: the globs below pull in every add-on's MDX body.
export * from "@/data/addon-taxonomy";

export interface PluginModule {
  default: ComponentType;
  frontmatter: Plugin;
}

const mdxModulesEn = import.meta.glob<PluginModule>(
  "../content/addons/en/*.mdx",
  { eager: true },
);
const mdxModulesDe = import.meta.glob<PluginModule>(
  "../content/addons/de/*.mdx",
  { eager: true },
);

function getModules(locale: Locale) {
  return locale === "de" ? mdxModulesDe : mdxModulesEn;
}

export function getPluginModules(locale: Locale = "en"): PluginModule[] {
  return Object.values(getModules(locale));
}

const communityPlugins: Plugin[] = (communityData as unknown as { plugins: Plugin[] }).plugins.map(
  (p) => ({ ...p, source: "community" as const }),
);

export function getPlugins(locale: Locale = "en"): Plugin[] {
  return [
    ...getPluginModules(locale).map((mod) => mod.frontmatter),
    ...communityPlugins,
  ];
}

export function getPluginModule(slug: string, locale: Locale = "en"): PluginModule | undefined {
  return getPluginModules(locale).find((mod) => mod.frontmatter.slug === slug);
}

export function getPlugin(slug: string, locale: Locale = "en"): Plugin | undefined {
  return getPlugins(locale).find((p) => p.slug === slug);
}

export function isCommunityPlugin(plugin: Plugin): boolean {
  return plugin.source === "community";
}

/** @deprecated Use getPluginModules(locale) instead */
export const pluginModules: PluginModule[] = Object.values(mdxModulesEn);

/** @deprecated Use getPlugins(locale) instead */
export const plugins: Plugin[] = [...pluginModules.map((mod) => mod.frontmatter), ...communityPlugins];
