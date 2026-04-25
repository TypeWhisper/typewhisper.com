import test from "node:test";
import assert from "node:assert/strict";
import {
  fetchReleaseData,
  preservePreviousReleaseData,
} from "../scripts/fetch-releases-lib.mjs";

function createRelease({
  id,
  tag,
  publishedAt,
  assets = [],
  body = null,
  name = tag,
}) {
  return {
    id,
    tag_name: tag,
    name,
    body,
    published_at: publishedAt,
    html_url: `https://example.com/releases/tag/${tag}`,
    assets,
  };
}

function createJsonResponse(body, init = {}) {
  const status = init.status ?? 200;
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: init.statusText ?? "OK",
    async json() {
      return body;
    },
  };
}

function createPaginatedFetch(responsesByPage) {
  const seenPages = [];

  const fetchFn = async (input) => {
    const url = new URL(String(input));
    const page = Number(url.searchParams.get("page") ?? "1");
    seenPages.push(page);
    return createJsonResponse(responsesByPage[page] ?? []);
  };

  return { fetchFn, seenPages };
}

const silentLogger = { warn() {} };

test("fetchReleaseData paginates past plugin-heavy first pages and restores direct stable downloads", async () => {
  const pluginHeavyPage = Array.from({ length: 100 }, (_, index) =>
    createRelease({
      id: index + 1,
      tag: `plugin-sample-v1.0.${index}`,
      publishedAt: `2026-04-24T12:${String(index % 60).padStart(2, "0")}:00Z`,
      assets: [
        {
          name: `Plugin-${index}.zip`,
          browser_download_url: `https://example.com/plugin-${index}.zip`,
        },
      ],
    }),
  );

  const stableOnPageTwo = createRelease({
    id: 500,
    tag: "v1.2.2",
    publishedAt: "2026-04-14T23:51:26Z",
    assets: [
      {
        name: "TypeWhisper-v1.2.2.dmg",
        browser_download_url: "https://example.com/TypeWhisper-v1.2.2.dmg",
      },
    ],
  });

  const prereleaseOnPageTwo = createRelease({
    id: 501,
    tag: "v1.3.0-rc5",
    publishedAt: "2026-04-24T12:34:27Z",
    assets: [
      {
        name: "TypeWhisper-v1.3.0-rc5.dmg",
        browser_download_url: "https://example.com/TypeWhisper-v1.3.0-rc5.dmg",
      },
    ],
  });

  const { fetchFn, seenPages } = createPaginatedFetch({
    1: pluginHeavyPage,
    2: [prereleaseOnPageTwo, stableOnPageTwo],
  });

  const { releases, downloads } = await fetchReleaseData({
    repos: [
      {
        apiUrl: "https://api.github.com/repos/example/typewhisper-mac/releases",
        platform: "mac",
        fallbackUrl: "https://example.com/typewhisper-mac/releases",
        pickAsset: (assets) => assets.find((asset) => asset.name.endsWith(".dmg")),
      },
    ],
    fetchFn,
    headers: { Accept: "application/json" },
    logger: silentLogger,
  });

  assert.deepEqual(seenPages, [1, 2]);
  assert.equal(downloads.mac.url, "https://example.com/TypeWhisper-v1.2.2.dmg");
  assert.equal(downloads.mac.version, "v1.2.2");
  assert.equal(downloads.mac.filename, "TypeWhisper-v1.2.2.dmg");
  assert.ok(releases.some((release) => release.tag_name === "v1.2.2"));
  assert.ok(releases.some((release) => release.tag_name === "v1.3.0-rc5"));
  assert.equal(
    releases.some((release) => release.tag_name.startsWith("plugin-")),
    false,
  );
});

test("fetchReleaseData falls back when no stable release contains the expected asset", async () => {
  const { fetchFn } = createPaginatedFetch({
    1: [
      createRelease({
        id: 42,
        tag: "v1.2.2",
        publishedAt: "2026-04-14T23:51:26Z",
        assets: [
          {
            name: "TypeWhisper-v1.2.2.zip",
            browser_download_url: "https://example.com/TypeWhisper-v1.2.2.zip",
          },
        ],
      }),
    ],
  });

  const { downloads } = await fetchReleaseData({
    repos: [
      {
        apiUrl: "https://api.github.com/repos/example/typewhisper-mac/releases",
        platform: "mac",
        fallbackUrl: "https://example.com/typewhisper-mac/releases",
        pickAsset: (assets) => assets.find((asset) => asset.name.endsWith(".dmg")),
      },
    ],
    fetchFn,
    headers: { Accept: "application/json" },
    logger: silentLogger,
  });

  assert.deepEqual(downloads.mac, {
    url: "https://example.com/typewhisper-mac/releases",
    version: null,
    filename: null,
  });
});

test("preservePreviousReleaseData keeps cached platform data after a failed fetch", () => {
  const current = {
    releases: [],
    downloads: {
      mac: {
        url: "https://example.com/typewhisper-mac/releases",
        version: null,
        filename: null,
      },
    },
  };
  const previous = {
    releases: [
      {
        id: 500,
        tag_name: "v1.2.2",
        name: "v1.2.2",
        body: null,
        published_at: "2026-04-14T23:51:26Z",
        html_url: "https://example.com/releases/tag/v1.2.2",
        platform: "mac",
      },
    ],
    downloads: {
      mac: {
        url: "https://example.com/TypeWhisper-v1.2.2.dmg",
        version: "v1.2.2",
        filename: "TypeWhisper-v1.2.2.dmg",
      },
    },
  };

  const { releases, downloads } = preservePreviousReleaseData(
    current,
    previous,
    {
      repos: [
        {
          platform: "mac",
        },
      ],
      logger: silentLogger,
    },
  );

  assert.equal(downloads.mac.url, "https://example.com/TypeWhisper-v1.2.2.dmg");
  assert.equal(downloads.mac.version, "v1.2.2");
  assert.equal(releases.length, 1);
  assert.equal(releases[0].tag_name, "v1.2.2");
});

test("preservePreviousReleaseData does not hide a successful fetch with no matching stable asset", () => {
  const current = {
    releases: [
      {
        id: 600,
        tag_name: "v1.3.0-rc5",
        name: "v1.3.0-rc5",
        body: null,
        published_at: "2026-04-24T12:34:27Z",
        html_url: "https://example.com/releases/tag/v1.3.0-rc5",
        platform: "mac",
      },
    ],
    downloads: {
      mac: {
        url: "https://example.com/typewhisper-mac/releases",
        version: null,
        filename: null,
      },
    },
  };
  const previous = {
    releases: [],
    downloads: {
      mac: {
        url: "https://example.com/TypeWhisper-v1.2.2.dmg",
        version: "v1.2.2",
        filename: "TypeWhisper-v1.2.2.dmg",
      },
    },
  };

  const { releases, downloads } = preservePreviousReleaseData(
    current,
    previous,
    {
      repos: [
        {
          platform: "mac",
        },
      ],
      logger: silentLogger,
    },
  );

  assert.equal(downloads.mac.url, "https://example.com/typewhisper-mac/releases");
  assert.equal(downloads.mac.version, null);
  assert.equal(releases.length, 1);
  assert.equal(releases[0].tag_name, "v1.3.0-rc5");
});
