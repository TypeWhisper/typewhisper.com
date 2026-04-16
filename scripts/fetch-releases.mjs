function deduplicateFullChangelog(body) {
  if (!body) return body;
  const seen = new Set();
  return body
    .split("\n")
    .filter((line) => {
      if (/^\*\*Full Changelog\*\*:/.test(line)) {
        if (seen.has(line)) return false;
        seen.add(line);
      }
      return true;
    })
    .join("\n");
}

const STABLE_TAG_RE = /^v\d+\.\d+\.\d+$/;

const MAC_RELEASES_URL =
  "https://github.com/TypeWhisper/typewhisper-mac/releases";
const WINDOWS_RELEASES_URL =
  "https://github.com/TypeWhisper/typewhisper-win/releases";

const repos = [
  {
    url: "https://api.github.com/repos/TypeWhisper/typewhisper-mac/releases?per_page=100",
    platform: "mac",
    fallbackUrl: MAC_RELEASES_URL,
    pickAsset: (assets) => assets.find((a) => a.name.endsWith(".dmg")),
  },
  {
    url: "https://api.github.com/repos/TypeWhisper/typewhisper-win/releases?per_page=100",
    platform: "windows",
    fallbackUrl: WINDOWS_RELEASES_URL,
    pickAsset: (assets) =>
      assets.find((a) => a.name === "TypeWhisper-win-x64-Setup.exe"),
  },
];

const headers = { Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const fetched = await Promise.allSettled(
  repos.map(async (repo) => {
    const res = await fetch(repo.url, { headers });
    if (!res.ok)
      throw new Error(`${repo.url}: ${res.status} ${res.statusText}`);
    const raw = await res.json();
    return { repo, raw };
  })
);

const releases = [];
const downloads = {};

for (let i = 0; i < fetched.length; i++) {
  const result = fetched[i];
  const repo = repos[i];
  if (result.status !== "fulfilled") {
    console.warn("Failed to fetch releases:", result.reason.message);
    downloads[repo.platform] = {
      url: repo.fallbackUrl,
      version: null,
      filename: null,
    };
    continue;
  }

  const appReleases = result.value.raw.filter(
    (r) => !r.tag_name.startsWith("plugin-")
  );

  for (const r of appReleases) {
    releases.push({
      id: r.id,
      tag_name: r.tag_name,
      name: r.name,
      body: deduplicateFullChangelog(r.body),
      published_at: r.published_at,
      html_url: r.html_url,
      platform: repo.platform,
    });
  }

  // Pick latest stable release with a matching asset.
  const stable = appReleases
    .filter((r) => STABLE_TAG_RE.test(r.tag_name))
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  let picked = null;
  for (const release of stable) {
    const asset = repo.pickAsset(release.assets || []);
    if (asset) {
      picked = { release, asset };
      break;
    }
  }

  if (picked) {
    downloads[repo.platform] = {
      url: picked.asset.browser_download_url,
      version: picked.release.tag_name,
      filename: picked.asset.name,
    };
  } else {
    console.warn(
      `No stable release with matching asset for ${repo.platform}; falling back to releases page.`
    );
    downloads[repo.platform] = {
      url: repo.fallbackUrl,
      version: null,
      filename: null,
    };
  }
}

releases.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

const { writeFileSync } = await import("node:fs");
const releasesPath = new URL("../src/data/releases.json", import.meta.url);
writeFileSync(releasesPath, JSON.stringify(releases, null, 2) + "\n");
console.log(`Wrote ${releases.length} releases to src/data/releases.json`);

const downloadsPath = new URL("../src/data/downloads.json", import.meta.url);
writeFileSync(downloadsPath, JSON.stringify(downloads, null, 2) + "\n");
console.log(
  `Wrote downloads.json (mac=${downloads.mac?.version ?? "fallback"}, windows=${downloads.windows?.version ?? "fallback"})`
);
