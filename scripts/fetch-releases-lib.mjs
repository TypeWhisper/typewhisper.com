export const STABLE_TAG_RE = /^v\d+\.\d+\.\d+$/;
export const PAGE_SIZE = 100;

export const MAC_RELEASES_URL =
  "https://github.com/TypeWhisper/typewhisper-mac/releases";
export const WINDOWS_RELEASES_URL =
  "https://github.com/TypeWhisper/typewhisper-win/releases";

export const DEFAULT_REPOS = [
  {
    apiUrl: "https://api.github.com/repos/TypeWhisper/typewhisper-mac/releases",
    platform: "mac",
    fallbackUrl: MAC_RELEASES_URL,
    pickAsset: (assets) => assets.find((a) => a.name.endsWith(".dmg")),
  },
  {
    apiUrl: "https://api.github.com/repos/TypeWhisper/typewhisper-win/releases",
    platform: "windows",
    fallbackUrl: WINDOWS_RELEASES_URL,
    pickAsset: (assets) =>
      assets.find((a) => a.name === "TypeWhisper-win-x64-Setup.exe"),
  },
];

export function deduplicateFullChangelog(body) {
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

export function buildGitHubHeaders(token = process.env.GITHUB_TOKEN) {
  const headers = { Accept: "application/vnd.github+json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function buildFallbackDownload(repo) {
  return {
    url: repo.fallbackUrl,
    version: null,
    filename: null,
  };
}

export async function fetchAllReleases(
  apiUrl,
  { fetchFn = globalThis.fetch, headers = {}, pageSize = PAGE_SIZE } = {},
) {
  if (typeof fetchFn !== "function") {
    throw new TypeError("fetchFn must be a function");
  }

  const releases = [];

  for (let page = 1; ; page += 1) {
    const pageUrl = new URL(apiUrl);
    pageUrl.searchParams.set("per_page", String(pageSize));
    pageUrl.searchParams.set("page", String(page));

    const res = await fetchFn(pageUrl.toString(), { headers });
    if (!res.ok) {
      throw new Error(`${pageUrl}: ${res.status} ${res.statusText}`);
    }

    const raw = await res.json();
    if (!Array.isArray(raw)) {
      throw new Error(`${pageUrl}: expected array response`);
    }

    releases.push(...raw);

    if (raw.length < pageSize) {
      break;
    }
  }

  return releases;
}

export function buildRepoReleaseData(rawReleases, repo, logger = console) {
  const appReleases = rawReleases.filter(
    (release) => !release.tag_name.startsWith("plugin-"),
  );

  const releases = appReleases.map((release) => ({
    id: release.id,
    tag_name: release.tag_name,
    name: release.name,
    body: deduplicateFullChangelog(release.body),
    published_at: release.published_at,
    html_url: release.html_url,
    platform: repo.platform,
  }));

  const stable = appReleases
    .filter((release) => STABLE_TAG_RE.test(release.tag_name))
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  for (const release of stable) {
    const asset = repo.pickAsset(release.assets || []);
    if (asset) {
      return {
        releases,
        download: {
          url: asset.browser_download_url,
          version: release.tag_name,
          filename: asset.name,
        },
      };
    }
  }

  logger.warn(
    `No stable release with matching asset for ${repo.platform}; falling back to releases page.`,
  );

  return {
    releases,
    download: buildFallbackDownload(repo),
  };
}

export async function fetchReleaseData({
  repos = DEFAULT_REPOS,
  fetchFn = globalThis.fetch,
  headers = buildGitHubHeaders(),
  logger = console,
} = {}) {
  const fetched = await Promise.allSettled(
    repos.map(async (repo) => ({
      repo,
      raw: await fetchAllReleases(repo.apiUrl, { fetchFn, headers }),
    })),
  );

  const releases = [];
  const downloads = {};

  for (let i = 0; i < fetched.length; i += 1) {
    const result = fetched[i];
    const repo = repos[i];

    if (result.status !== "fulfilled") {
      logger.warn("Failed to fetch releases:", result.reason.message);
      downloads[repo.platform] = buildFallbackDownload(repo);
      continue;
    }

    const repoData = buildRepoReleaseData(result.value.raw, repo, logger);
    releases.push(...repoData.releases);
    downloads[repo.platform] = repoData.download;
  }

  releases.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  return { releases, downloads };
}

export function preservePreviousReleaseData(
  current,
  previous = {},
  { repos = DEFAULT_REPOS, logger = console } = {},
) {
  const releases = Array.isArray(current.releases) ? [...current.releases] : [];
  const downloads =
    current.downloads && typeof current.downloads === "object"
      ? { ...current.downloads }
      : {};
  const previousReleases = Array.isArray(previous.releases)
    ? previous.releases
    : [];
  const previousDownloads =
    previous.downloads && typeof previous.downloads === "object"
      ? previous.downloads
      : {};

  for (const repo of repos) {
    const { platform } = repo;
    const hasFetchedPlatformReleases = releases.some(
      (release) => release.platform === platform,
    );
    const download = downloads[platform];
    const previousDownload = previousDownloads[platform];

    if (
      hasFetchedPlatformReleases ||
      download?.version ||
      !previousDownload?.url
    ) {
      continue;
    }

    downloads[platform] = previousDownload;
    const restoredReleases = previousReleases.filter(
      (release) => release.platform === platform,
    );
    releases.push(...restoredReleases);

    logger.warn(
      `Keeping previous ${platform} release data because the latest fetch did not return releases for that platform.`,
    );
  }

  releases.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  return { releases, downloads };
}
