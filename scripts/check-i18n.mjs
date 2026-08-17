import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const localeRoot = path.join(process.cwd(), "src/i18n/locales");
const locales = ["en", "de"];
const requiredChunks = [
  "common.json",
  "landing.json",
  "addons.json",
  "use-cases.json",
  "pricing.json",
  "business.json",
  "support.json",
  "sponsors.json",
  "open-source-accessibility.json",
  "docs/common.json",
  "docs/mac.json",
];
const overrideChunks = ["platform-releases.json"];

function readChunk(locale, chunkPath) {
  const fullPath = path.join(localeRoot, locale, chunkPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`${locale}: missing i18n chunk ${chunkPath}`);
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const topLevelKeys = [...raw.matchAll(/^  "([^"]+)":/gm)].map((match) => match[1]);
  const localDuplicates = topLevelKeys.filter(
    (key, index) => topLevelKeys.indexOf(key) !== index,
  );
  if (localDuplicates.length) {
    throw new Error(
      `${locale}: duplicate keys in ${chunkPath}: ${[...new Set(localDuplicates)].join(", ")}`,
    );
  }

  const data = JSON.parse(raw);
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== "string") {
      throw new Error(`${locale}: ${chunkPath} has non-string value for ${key}`);
    }
  }
  return data;
}

function loadLocale(locale) {
  const seen = new Map();
  const translations = {};

  for (const chunkPath of requiredChunks) {
    const chunk = readChunk(locale, chunkPath);
    for (const [key, value] of Object.entries(chunk)) {
      if (seen.has(key)) {
        throw new Error(
          `${locale}: duplicate key ${key} in ${chunkPath}; first seen in ${seen.get(key)}`,
        );
      }
      seen.set(key, chunkPath);
      translations[key] = value;
    }
  }

  for (const chunkPath of overrideChunks) {
    const chunk = readChunk(locale, chunkPath);
    for (const [key, value] of Object.entries(chunk)) {
      if (!seen.has(key)) {
        throw new Error(
          `${locale}: ${chunkPath} overrides unknown key ${key}`,
        );
      }
      translations[key] = value;
    }
  }

  return translations;
}

const all = Object.fromEntries(locales.map((locale) => [locale, loadLocale(locale)]));
const [baseLocale, ...otherLocales] = locales;
const baseKeys = Object.keys(all[baseLocale]).sort();

for (const locale of otherLocales) {
  const keys = Object.keys(all[locale]).sort();
  const baseSet = new Set(baseKeys);
  const localeSet = new Set(keys);
  const missing = baseKeys.filter((key) => !localeSet.has(key));
  const extra = keys.filter((key) => !baseSet.has(key));

  if (missing.length || extra.length) {
    const details = [
      missing.length ? `${locale}: missing keys from ${baseLocale}: ${missing.join(", ")}` : "",
      extra.length ? `${locale}: extra keys not in ${baseLocale}: ${extra.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    throw new Error(details);
  }
}

console.log(`i18n OK: ${baseKeys.length} keys across ${locales.join(", ")}`);
