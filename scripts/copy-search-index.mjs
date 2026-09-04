import { cp, rm } from "node:fs/promises";
// Make the last production index available to Astro's development server too.
// This directory is generated, ignored by Git, and owned by this script.
const destination = new URL("../public/pagefind/", import.meta.url);
await rm(destination, { recursive: true, force: true });
await cp(new URL("../dist/pagefind/", import.meta.url), destination, {
  recursive: true,
});
