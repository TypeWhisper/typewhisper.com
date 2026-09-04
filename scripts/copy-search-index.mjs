import { cp } from "node:fs/promises";
// Make the last production index available to Astro's development server too.
// Keep the directory and older hashed chunks: active tabs can still use the
// previous index, and the dev server keeps watching files during a rebuild.
const destination = new URL("../public/pagefind/", import.meta.url);
await cp(new URL("../dist/pagefind/", import.meta.url), destination, {
  recursive: true,
});
