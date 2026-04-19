import type { ComponentType } from "react";
import type { Locale } from "@/i18n/index";
import type { BrandLogoId } from "@/data/brand-logos";
import communityData from "./community-plugins.json";

export type PluginCategory =
  | "transcription"
  | "llm"
  | "action"
  | "post-processing"
  | "memory";

export type PluginPlatform = "mac" | "windows" | "ios";

export type PluginSource = "bundled" | "community";

export interface PluginDownload {
  url: string;
  sha256: string;
  size: number;
}

export interface Plugin {
  slug: string;
  name: string;
  author: string;
  version: string;
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
  readmeUrl?: string;
  downloads?: Record<string, PluginDownload>;
  publishedAt?: string;
  iconUrl?: string;
  brandLogo?: BrandLogoId;
  apiDocsUrl?: string;
  sourceUrl?: string;
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
  action: "Action",
  "post-processing": "Post-Processing",
  memory: "Memory",
};

export const categoryKeys: Record<PluginCategory, string> = {
  transcription: "addons.category.transcription",
  llm: "addons.category.llm",
  action: "addons.category.action",
  "post-processing": "addons.category.postProcessing",
  memory: "addons.category.memory",
};

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

export function getBundledPlugins(locale: Locale = "en"): Plugin[] {
  return getPluginModules(locale).map((mod) => mod.frontmatter);
}

const communityPlugins: Plugin[] = (communityData as unknown as { plugins: Plugin[] }).plugins.map(
  (p) => ({ ...p, source: "community" as const }),
);

export function getPlugins(locale: Locale = "en"): Plugin[] {
  return [...getBundledPlugins(locale), ...communityPlugins];
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
