import {
  buildGitHubHeaders,
  fetchReleaseData,
  preservePreviousReleaseData,
} from "./fetch-releases-lib.mjs";
const { existsSync, readFileSync, writeFileSync } = await import("node:fs");

function readJsonIfPresent(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    console.warn(
      `Ignoring unreadable generated data at ${path}: ${err.message}`,
    );
    return fallback;
  }
}

const releasesPath = new URL("../src/data/releases.json", import.meta.url);
const downloadsPath = new URL("../src/data/downloads.json", import.meta.url);

const previous = {
  releases: readJsonIfPresent(releasesPath, []),
  downloads: readJsonIfPresent(downloadsPath, {}),
};

const fetched = await fetchReleaseData({
  headers: buildGitHubHeaders(),
  logger: console,
});

const { releases, downloads } = preservePreviousReleaseData(fetched, previous, {
  logger: console,
});

writeFileSync(releasesPath, JSON.stringify(releases, null, 2) + "\n");
console.log(`Wrote ${releases.length} releases to src/data/releases.json`);

writeFileSync(downloadsPath, JSON.stringify(downloads, null, 2) + "\n");
console.log(
  `Wrote downloads.json (mac=${downloads.mac?.version ?? "fallback"}, windows=${downloads.windows?.version ?? "fallback"})`
);
