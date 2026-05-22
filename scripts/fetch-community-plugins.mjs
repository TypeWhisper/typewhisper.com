const data = {
  schemaVersion: 1,
  generatedAt: "2026-05-22T00:00:00.000Z",
  plugins: [],
};

const { writeFileSync } = await import("node:fs");
const path = new URL("../src/data/community-plugins.json", import.meta.url);
writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log(
  "Community plugin repository is retired; wrote 0 community plugins to src/data/community-plugins.json",
);
