import type { ComponentType } from "react";
import type { Locale } from "@/i18n/index";

export type UseCaseCategory = "app" | "workflow";

export interface UseCaseFeature {
  title: string;
  description: string;
  icon: string;
}

export interface UseCaseStep {
  step: string;
  description: string;
}

export interface UseCase {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: UseCaseCategory;
  color: string;
  /** Locale-neutral screenshot path passed through screenshotPath() at render time. */
  heroScreenshot?: string;
  features: UseCaseFeature[];
  benefits: string[];
  howItWorks: UseCaseStep[];
}

export interface UseCaseModule {
  default: ComponentType;
  frontmatter: UseCase;
}

export const categoryKeys: Record<UseCaseCategory, string> = {
  app: "useCases.category.app",
  workflow: "useCases.category.workflow",
};

/**
 * Named accent palette for use cases. MDX frontmatter references these names
 * (e.g. `color: green`); the hex values live only here. Components receive the
 * resolved hex because they derive alpha variants from it (e.g. `${color}33`).
 */
export const useCaseAccents = {
  blue: "#0071e3",
  green: "#10b981",
  violet: "#7c3aed",
  amber: "#f59e0b",
  bronze: "#b45309",
  teal: "#0f766e",
  red: "#991b1b",
  wine: "#7f1d1d",
} as const;

export type UseCaseAccentName = keyof typeof useCaseAccents;

function resolveAccent(color: string): string {
  return useCaseAccents[color as UseCaseAccentName] ?? color;
}

function withResolvedColor(useCase: UseCase): UseCase {
  return { ...useCase, color: resolveAccent(useCase.color) };
}

const mdxModulesEn = import.meta.glob<UseCaseModule>(
  "../content/use-cases/en/*.mdx",
  { eager: true },
);
const mdxModulesDe = import.meta.glob<UseCaseModule>(
  "../content/use-cases/de/*.mdx",
  { eager: true },
);

function getModules(locale: Locale) {
  return locale === "de" ? mdxModulesDe : mdxModulesEn;
}

export function getUseCaseModules(locale: Locale = "en"): UseCaseModule[] {
  return Object.values(getModules(locale)).map((mod) => ({
    default: mod.default,
    frontmatter: withResolvedColor(mod.frontmatter),
  }));
}

export function getUseCases(locale: Locale = "en"): UseCase[] {
  return getUseCaseModules(locale).map((mod) => mod.frontmatter);
}

export function getUseCaseModule(slug: string, locale: Locale = "en"): UseCaseModule | undefined {
  return getUseCaseModules(locale).find((mod) => mod.frontmatter.slug === slug);
}

/** @deprecated Use getUseCaseModules(locale) instead */
export const useCaseModules: UseCaseModule[] = Object.values(mdxModulesEn).map(
  (mod) => ({
    default: mod.default,
    frontmatter: withResolvedColor(mod.frontmatter),
  }),
);

/** @deprecated Use getUseCases(locale) instead */
export const useCases: UseCase[] = useCaseModules.map(
  (mod) => mod.frontmatter,
);
