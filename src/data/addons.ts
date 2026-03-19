import type { ComponentType } from "react";
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
  apiDocsUrl?: string;
  sourceUrl?: string;
  principalClass?: string;
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

export const platformLabels: Record<PluginPlatform, string> = {
  mac: "macOS",
  windows: "Windows",
  ios: "iOS",
};

const mdxModules = import.meta.glob<PluginModule>(
  "../content/addons/*.mdx",
  { eager: true },
);

export const pluginModules: PluginModule[] = Object.values(mdxModules);

const bundledPlugins: Plugin[] = pluginModules.map((mod) => mod.frontmatter);

const communityPlugins: Plugin[] = (communityData as unknown as { plugins: Plugin[] }).plugins.map(
  (p) => ({ ...p, source: "community" as const }),
);

export const plugins: Plugin[] = [...bundledPlugins, ...communityPlugins];

export function getPluginModule(slug: string): PluginModule | undefined {
  return pluginModules.find((mod) => mod.frontmatter.slug === slug);
}

export function getPlugin(slug: string): Plugin | undefined {
  return plugins.find((p) => p.slug === slug);
}

export function isCommunityPlugin(plugin: Plugin): boolean {
  return plugin.source === "community";
}
