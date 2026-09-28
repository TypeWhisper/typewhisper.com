import type { ComponentType } from "react";
import type { Locale } from "@/i18n/index";
import type {
  UseCaseCategory,
  UseCaseGroup,
} from "@/components/use-cases/taxonomy";

export {
  categoryKeys,
  useCaseGroups,
  type UseCaseCategory,
  type UseCaseGroup,
} from "@/components/use-cases/taxonomy";

/** Example of the landing page (`spoken.*` keys) that fits the use case. */
export type UseCaseExample = "email" | "chat" | "note";

export interface UseCaseFeature {
  title: string;
  description: string;
}

export interface UseCaseStep {
  step: string;
  description: string;
}

export interface UseCase {
  slug: string;
  name: string;
  description: string;
  category: UseCaseCategory;
  group: UseCaseGroup;
  /** Locale-neutral screenshot path passed through screenshotPath() at render time. */
  heroScreenshot?: string;
  /** Says what the screenshot really shows; also its alternative text. */
  heroCaption?: string;
  example?: UseCaseExample;
  features: UseCaseFeature[];
  benefits: string[];
  howItWorks: UseCaseStep[];
}

export interface UseCaseHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface UseCaseModule {
  default: ComponentType;
  frontmatter: UseCase;
  /** Headings of the MDX body; empty for pages without a body. */
  getHeadings?: () => UseCaseHeading[];
}

/** Reading order of the index; slugs that are missing here follow at the end. */
const useCaseOrder = [
  "emails",
  "chat",
  "code",
  "meeting-notes",
  "legal",
  "law-firm-dictation",
  "dragon-alternative-law-firms",
  "architecture",
  "real-estate",
];

function position(slug: string): number {
  const index = useCaseOrder.indexOf(slug);
  return index === -1 ? useCaseOrder.length : index;
}

const mdxModulesEn = import.meta.glob<UseCaseModule>(
  "../content/use-cases/en/*.mdx",
  { eager: true },
);
const mdxModulesDe = import.meta.glob<UseCaseModule>(
  "../content/use-cases/de/*.mdx",
  { eager: true },
);

function inOrder(modules: Record<string, UseCaseModule>): UseCaseModule[] {
  return Object.values(modules)
    .map((mod) => ({
      default: mod.default,
      frontmatter: mod.frontmatter,
      getHeadings: mod.getHeadings,
    }))
    .sort(
      (a, b) => position(a.frontmatter.slug) - position(b.frontmatter.slug),
    );
}

export function getUseCaseModules(locale: Locale = "en"): UseCaseModule[] {
  return inOrder(locale === "de" ? mdxModulesDe : mdxModulesEn);
}

export function getUseCases(locale: Locale = "en"): UseCase[] {
  return getUseCaseModules(locale).map((mod) => mod.frontmatter);
}

export function getUseCaseModule(
  slug: string,
  locale: Locale = "en",
): UseCaseModule | undefined {
  return getUseCaseModules(locale).find((mod) => mod.frontmatter.slug === slug);
}
