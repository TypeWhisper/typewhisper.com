/**
 * Categories and groups of the use cases. Kept apart from the data module so
 * hydrated components do not pull the MDX content into the client bundle.
 */
export type UseCaseCategory = "app" | "workflow";

/** Everyday writing versus the industry pages with their term packs. */
export type UseCaseGroup = "everyday" | "industry";

export const categoryKeys: Record<UseCaseCategory, string> = {
  app: "useCases.category.app",
  workflow: "useCases.category.workflow",
};

export const useCaseGroups: UseCaseGroup[] = ["everyday", "industry"];
