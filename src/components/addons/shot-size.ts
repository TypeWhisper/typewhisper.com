import path from "node:path";
import sharp from "sharp";

const sizes = new Map<string, { width: number; height: number } | undefined>();

/** Pixel size of an image below `public/`, read once while the page renders. */
export async function shotSize(
  src: string,
): Promise<{ width: number; height: number } | undefined> {
  if (sizes.has(src)) return sizes.get(src);
  let size: { width: number; height: number } | undefined;
  try {
    const { width, height } = await sharp(
      path.join(process.cwd(), "public", src),
    ).metadata();
    if (width && height) size = { width, height };
  } catch {
    size = undefined;
  }
  sizes.set(src, size);
  return size;
}
