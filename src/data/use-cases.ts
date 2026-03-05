import type { ComponentType } from "react";

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
  features: UseCaseFeature[];
  benefits: string[];
  howItWorks: UseCaseStep[];
}

export interface UseCaseModule {
  default: ComponentType;
  frontmatter: UseCase;
}

export const categoryLabels: Record<UseCaseCategory, string> = {
  app: "App",
  workflow: "Workflow",
};

const mdxModules = import.meta.glob<UseCaseModule>(
  "../content/use-cases/*.mdx",
  { eager: true },
);

export const useCaseModules: UseCaseModule[] = Object.values(mdxModules);

export const useCases: UseCase[] = useCaseModules.map(
  (mod) => mod.frontmatter,
);

export function getUseCaseModule(slug: string): UseCaseModule | undefined {
  return useCaseModules.find((mod) => mod.frontmatter.slug === slug);
}
