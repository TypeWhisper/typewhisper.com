const repos = [
  { url: "https://api.github.com/repos/TypeWhisper/typewhisper-mac/releases?per_page=100", platform: "mac" },
  { url: "https://api.github.com/repos/TypeWhisper/typewhisper-win/releases?per_page=100", platform: "windows" },
];

const headers = { Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const results = await Promise.allSettled(
  repos.map(async ({ url, platform }) => {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`${url}: ${res.status} ${res.statusText}`);
    const releases = await res.json();
    return releases
      .filter((r) => !r.tag_name.startsWith("plugin-"))
      .map((r) => ({
        id: r.id,
        tag_name: r.tag_name,
        name: r.name,
        body: r.body,
        published_at: r.published_at,
        html_url: r.html_url,
        platform,
      }));
  })
);

const releases = results
  .flatMap((r) => {
    if (r.status === "fulfilled") return r.value;
    console.warn("Failed to fetch releases:", r.reason.message);
    return [];
  })
  .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

const { writeFileSync } = await import("node:fs");
const path = new URL("../src/data/releases.json", import.meta.url);
writeFileSync(path, JSON.stringify(releases, null, 2) + "\n");
console.log(`Wrote ${releases.length} releases to src/data/releases.json`);
