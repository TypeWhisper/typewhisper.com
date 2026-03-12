const url =
  "https://raw.githubusercontent.com/TypeWhisper/typewhisper-plugins/main/plugin-index.json";

const headers = { Accept: "application/json" };
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

let data;
try {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  data = await res.json();
} catch (err) {
  console.warn(
    `Failed to fetch community plugins: ${err.message}. Using empty list.`,
  );
  data = { schemaVersion: 1, generatedAt: new Date().toISOString(), plugins: [] };
}

const { writeFileSync } = await import("node:fs");
const path = new URL("../src/data/community-plugins.json", import.meta.url);
writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log(
  `Wrote ${data.plugins.length} community plugins to src/data/community-plugins.json`,
);
