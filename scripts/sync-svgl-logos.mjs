import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { brandLogos } from "../src/data/brand-logos.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public/brand-logos");
const generatedPath = resolve(__dirname, "../src/data/brand-logos.generated.json");
const apiBase = "https://api.svgl.app";

const wait = (ms) => new Promise((resolveWait) => setTimeout(resolveWait, ms));

// `--only deepgram,nvidia` (or `--only=…`) syncs the named brands and leaves
// every other logo file and its generated entry as it is.
function readOnlyIds(args) {
  const index = args.findIndex((arg) => arg === "--only" || arg.startsWith("--only="));
  if (index === -1) {
    return undefined;
  }

  const value = args[index].startsWith("--only=")
    ? args[index].slice("--only=".length)
    : (args[index + 1] ?? "");
  const ids = value
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (ids.length === 0) {
    throw new Error("--only needs at least one brand id, for example --only deepgram,nvidia");
  }

  const known = new Set(brandLogos.map((brand) => brand.id));
  const unknown = ids.filter((id) => !known.has(id));
  if (unknown.length > 0) {
    throw new Error(`Unknown brand id in --only: ${unknown.join(", ")}`);
  }

  return new Set(ids);
}

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
  // Overwrite in place: a removed and re-created file is not served by a running dev server.
  await writeFile(outputPath, content);
  writtenFiles.add(outputPath);
}

const writtenFiles = new Set();

async function removeStaleFiles(brandDir) {
  for (const entry of await readdir(brandDir, { withFileTypes: true })) {
    const path = resolve(brandDir, entry.name);
    if (!writtenFiles.has(path)) {
      await rm(path, { recursive: true, force: true });
      console.warn(`Removed stale file ${basename(brandDir)}/${entry.name}`);
    }
  }
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

const onlyIds = readOnlyIds(process.argv.slice(2));
const definitions = onlyIds
  ? brandLogos.filter((brand) => onlyIds.has(brand.id))
  : brandLogos;

// A partial sync starts from the entries that exist and keeps their order.
const generated = onlyIds
  ? JSON.parse(await readFile(generatedPath, "utf8"))
  : { generatedAt: new Date().toISOString(), brands: {} };

await mkdir(publicDir, { recursive: true });

for (const definition of definitions) {
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
  await mkdir(brandDir, { recursive: true });

  const logo = await syncAsset(definition.id, "logo", match.route, brandDir);
  const wordmark = await syncAsset(definition.id, "wordmark", match.wordmark, brandDir);
  await removeStaleFiles(brandDir);
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
console.log(
  `Synced ${definitions.length} SVGL brand logos to ${publicDir}` +
    (onlyIds ? ` (only ${[...onlyIds].join(", ")})` : ""),
);
