import {
  buildGitHubHeaders,
  fetchReleaseData,
} from "./fetch-releases-lib.mjs";
const { writeFileSync } = await import("node:fs");

const { releases, downloads } = await fetchReleaseData({
  headers: buildGitHubHeaders(),
  logger: console,
});

const releasesPath = new URL("../src/data/releases.json", import.meta.url);
writeFileSync(releasesPath, JSON.stringify(releases, null, 2) + "\n");
console.log(`Wrote ${releases.length} releases to src/data/releases.json`);

const downloadsPath = new URL("../src/data/downloads.json", import.meta.url);
writeFileSync(downloadsPath, JSON.stringify(downloads, null, 2) + "\n");
console.log(
  `Wrote downloads.json (mac=${downloads.mac?.version ?? "fallback"}, windows=${downloads.windows?.version ?? "fallback"})`
);
