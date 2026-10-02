import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export interface CatalogEntry {
  slug: string;
  source: string;
  platforms: string[];
}

const directory = "src/content/addons/en";

function scalar(frontmatter: string, key: string): string {
  const match = new RegExp(`^${key}:\\s*"?([^"\\n]+)"?\\s*$`, "m").exec(frontmatter);
  if (!match) throw new Error(`No "${key}" in the frontmatter.`);
  return match[1].trim();
}

function list(frontmatter: string, key: string): string[] {
  const match = new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.+\\n?)+)`, "m").exec(frontmatter);
  if (!match) throw new Error(`No list "${key}" in the frontmatter.`);
  return match[1]
    .split("\n")
    .map((line) => line.replace(/^\s+-\s+/, "").replace(/"/g, "").trim())
    .filter(Boolean);
}

/**
 * The add-ons of the index, read from the content files, so specs count
 * what the pages list instead of repeating a number.
 */
export function readAddonCatalog(): CatalogEntry[] {
  return readdirSync(directory)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const content = readFileSync(path.join(directory, name), "utf8");
      const frontmatter = /^---\n([\s\S]*?)\n---/.exec(content)?.[1];
      if (!frontmatter) throw new Error(`No frontmatter in ${name}.`);
      return {
        slug: scalar(frontmatter, "slug"),
        source: scalar(frontmatter, "source"),
        platforms: list(frontmatter, "platforms"),
      };
    });
}
