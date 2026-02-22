import type { ComponentType } from "react";

export type PluginCategory =
  | "transcription"
  | "llm"
  | "action"
  | "post-processing";

export type PluginPlatform = "mac" | "windows" | "ios";

export type PluginSource = "bundled" | "community";

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
  apiDocsUrl?: string;
  sourceUrl?: string;
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

export const plugins: Plugin[] = pluginModules.map((mod) => mod.frontmatter);

export function getPluginModule(slug: string): PluginModule | undefined {
  return pluginModules.find((mod) => mod.frontmatter.slug === slug);
}
