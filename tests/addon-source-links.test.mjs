import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ADDON_CONTENT_DIRS = [
  path.resolve("src/content/addons"),
  path.resolve("src/content/addon-editions"),
];
const LEGACY_MAC_PLUGIN_SOURCE_PREFIX =
  "https://github.com/TypeWhisper/typewhisper-mac/tree/main/Plugins/";

async function collectMdxFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectMdxFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith(".mdx") ? [entryPath] : [];
    }),
  );

  return files.flat();
}

test("add-on source links do not point at the old macOS plugin directory", async () => {
  const mdxFiles = (
    await Promise.all(ADDON_CONTENT_DIRS.map((dir) => collectMdxFiles(dir)))
  ).flat();
  const staleLinks = [];

  for (const file of mdxFiles) {
    const content = await readFile(file, "utf8");

    if (content.includes(LEGACY_MAC_PLUGIN_SOURCE_PREFIX)) {
      staleLinks.push(path.relative(process.cwd(), file));
    }
  }

  assert.deepEqual(staleLinks, []);
});
