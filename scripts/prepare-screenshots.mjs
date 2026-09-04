import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Derive the inventory from the owning landing screenshot map.
const source = await readFile(
  new URL("../src/lib/landing-screenshots.ts", import.meta.url),
  "utf8",
);
const paths = [
  ...new Set(
    [...source.matchAll(/"(\/screenshots\/[^\"]+)"/g)].map((match) =>
      match[1].replace(/\.png$/, ".webp"),
    ),
  ),
];
const output = new URL("../public/_images/", import.meta.url);
await mkdir(output, { recursive: true });
const manifest = {};
for (const locale of ["en", "de"]) {
  for (const path of paths) {
    const localized = path.replace("/screenshots/", `/screenshots/${locale}/`);
    const bytes = await readFile(
      new URL(`../public${localized}`, import.meta.url),
    );
    const { width, height } = await sharp(bytes).metadata();
    if (!width || !height)
      throw new Error(`Missing image dimensions: ${localized}`);
    const hash = createHash("sha256")
      .update(bytes)
      .update("webp-q82-v1")
      .digest("hex")
      .slice(0, 16);
    const variants = [];
    for (const size of [480, 960]) {
      if (size >= width) continue;
      const filename = `${hash}-${size}.webp`;
      await sharp(bytes)
        .resize({ width: size })
        .webp({ quality: 82 })
        .toFile(new URL(filename, output).pathname);
      variants.push(`/_images/${filename} ${size}w`);
    }
    variants.push(`${localized} ${width}w`);
    manifest[localized] = { width, height, srcSet: variants.join(", ") };
  }
}
await writeFile(
  new URL("../src/data/screenshot-sizes.json", import.meta.url),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Prepared responsive sizes for ${Object.keys(manifest).length} screenshots.`,
);
