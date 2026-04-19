import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { brandLogos } from "../src/data/brand-logos.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public/brand-logos");
const generatedPath = resolve(__dirname, "../src/data/brand-logos.generated.json");
const apiBase = "https://api.svgl.app";

const wait = (ms) => new Promise((resolveWait) => setTimeout(resolveWait, ms));

async function fetchJsonWithRetry(url, label, attempt = 0) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "typewhisper-web/svgl-sync",
    },
  });

  if (response.status === 429 && attempt < 3) {
    const backoffMs = 1000 * 2 ** attempt;
    console.warn(`Rate limited while fetching ${label}. Retrying in ${backoffMs}ms...`);
    await wait(backoffMs);
    return fetchJsonWithRetry(url, label, attempt + 1);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${label}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function downloadFile(url, outputPath) {
  const response = await fetch(url, {
    headers: {
      Accept: "image/svg+xml,text/plain;q=0.9,*/*;q=0.8",
      "User-Agent": "typewhisper-web/svgl-sync",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const content = await response.text();
  await writeFile(outputPath, content);
}

function localAssetPath(brandId, filename) {
  return `/brand-logos/${brandId}/${filename}`;
}

async function syncAsset(brandId, baseName, asset, outputDir) {
  if (!asset) {
    return undefined;
  }

  if (typeof asset === "string") {
    const filename = `${baseName}.svg`;
    await downloadFile(asset, resolve(outputDir, filename));
    return localAssetPath(brandId, filename);
  }

  const lightFilename = `${baseName}-light.svg`;
  const darkFilename = `${baseName}-dark.svg`;
  await downloadFile(asset.light, resolve(outputDir, lightFilename));
  await downloadFile(asset.dark, resolve(outputDir, darkFilename));
  return {
    light: localAssetPath(brandId, lightFilename),
    dark: localAssetPath(brandId, darkFilename),
  };
}

const generated = {
  generatedAt: new Date().toISOString(),
  brands: {},
};

await mkdir(publicDir, { recursive: true });

for (const definition of brandLogos) {
  const searchUrl = `${apiBase}?search=${encodeURIComponent(definition.svglSearch)}`;
  const results = await fetchJsonWithRetry(searchUrl, definition.id);
  if (!Array.isArray(results)) {
    throw new Error(`Unexpected response shape for ${definition.id}`);
  }

  const match = results.find((entry) => entry.title === definition.expectedTitle);
  if (!match) {
    const resultTitles = results.map((entry) => entry.title).join(", ") || "(none)";
    throw new Error(
      `No exact SVGL match for ${definition.id}. Expected "${definition.expectedTitle}", got ${resultTitles}.`,
    );
  }

  const brandDir = resolve(publicDir, definition.id);
  await rm(brandDir, { recursive: true, force: true });
  await mkdir(brandDir, { recursive: true });

  const logo = await syncAsset(definition.id, "logo", match.route, brandDir);
  const wordmark = await syncAsset(definition.id, "wordmark", match.wordmark, brandDir);
  const hasThemeVariants =
    (typeof logo === "object" && logo !== null && "light" in logo && "dark" in logo) ||
    (typeof wordmark === "object" && wordmark !== null && "light" in wordmark && "dark" in wordmark);

  generated.brands[definition.id] = {
    hasLogo: Boolean(logo),
    hasWordmark: Boolean(wordmark),
    hasThemeVariants,
    logo,
    wordmark,
    brandUrl: match.brandUrl ?? definition.brandGuidelinesUrl ?? null,
    sourceUrl: match.url ?? definition.homepage ?? null,
  };
}

await writeFile(generatedPath, JSON.stringify(generated, null, 2) + "\n");
console.log(`Synced ${brandLogos.length} SVGL brand logos to ${publicDir}`);
