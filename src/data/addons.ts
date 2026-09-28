import type { ComponentType } from "react";
import type { Locale } from "@/i18n/index";
import type { BrandLogoId } from "@/data/brand-logos";
import communityData from "./community-plugins.json";

export type PluginCategory =
  | "transcription"
  | "llm"
  | "tts"
  | "action"
  | "post-processing"
  | "memory"
  | "utility";

export type PluginPlatform = "mac" | "windows" | "ios";

/**
 * How an add-on reaches the app: `built-in` is part of the app itself,
 * `official` and `community` are installed from the marketplace.
 */
export type PluginSource = "built-in" | "official" | "community";

export interface PluginDownload {
  url: string;
  sha256: string;
  size: number;
}

export interface Plugin {
  slug: string;
  name: string;
  author: string;
  version?: string;
  icon: string;
  description: string;
  categories: PluginCategory[];
  platforms: PluginPlatform[];
  source: PluginSource;
  id?: string;
  authorUrl?: string;
  license?: string;
  homepage?: string;
  minAppVersion?: string;
  minOsVersion?: string;
  releaseUrl?: string;
  screenshots?: boolean;
  /** Specific alternative text of the settings screenshot, instead of the template. */
  screenshotAlt?: string;
  /** Specific caption of the settings screenshot; follows the alternative text when left out. */
  screenshotCaption?: string;
  readmeUrl?: string;
  downloads?: Record<string, PluginDownload>;
  publishedAt?: string;
  /** Logo file of the add-on; with `iconUrlDark` it is the one for the light theme. */
  iconUrl?: string;
  /** Variant of `iconUrl` for the dark theme, when the source provides one. */
  iconUrlDark?: string;
  brandLogo?: BrandLogoId;
  apiDocsUrl?: string;
  sourceUrl?: string;
  sourceUrls?: Partial<Record<PluginPlatform, string>>;
  principalClass?: string;
  featured?: boolean;
}

export interface PluginModule {
  default: ComponentType;
  frontmatter: Plugin;
}

export const categoryLabels: Record<PluginCategory, string> = {
  transcription: "Transcription",
  llm: "LLM",
  tts: "Text-to-Speech",
  action: "Action",
  "post-processing": "Post-Processing",
  memory: "Memory",
  utility: "Utility",
};

export const categoryKeys: Record<PluginCategory, string> = {
  transcription: "addons.category.transcription",
  llm: "addons.category.llm",
  tts: "addons.category.tts",
  action: "addons.category.action",
  "post-processing": "addons.category.postProcessing",
  memory: "addons.category.memory",
  utility: "addons.category.utility",
};

export const sourceKeys: Record<PluginSource, string> = {
  "built-in": "addons.builtIn",
  official: "addons.official",
  community: "addons.community",
};

/** Sources the index offers as a filter. `built-in` is a label only. */
export const sourceFilters = ["official", "community"] as const satisfies readonly PluginSource[];

/** Earlier values of the source filter; links that carry them show all sources. */
export const retiredSourceFilters: readonly string[] = ["built-in", "bundled"];

export const platformLabels: Record<PluginPlatform, string> = {
  mac: "macOS",
  windows: "Windows",
  ios: "iOS",
};

export const platformKeys: Record<PluginPlatform, string> = {
  mac: "addons.platform.macOS",
  windows: "addons.platform.windows",
  ios: "addons.platform.ios",
};

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
