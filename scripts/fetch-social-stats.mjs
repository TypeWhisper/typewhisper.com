import { writeFileSync, existsSync, readFileSync } from "node:fs";

const GITHUB_ORG_REPOS = [
  "TypeWhisper/typewhisper-mac",
  "TypeWhisper/typewhisper-win",
  "TypeWhisper/typewhisper-ios",
];

const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || "";

const githubHeaders = { Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) {
  githubHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function fetchGithubStars() {
  let total = 0;
  for (const repo of GITHUB_ORG_REPOS) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: githubHeaders,
      });
      if (!res.ok) {
        console.warn(
          `GitHub stars: ${repo} responded ${res.status} ${res.statusText}`,
        );
        continue;
      }
      const data = await res.json();
      total += typeof data.stargazers_count === "number"
        ? data.stargazers_count
        : 0;
    } catch (err) {
      console.warn(`GitHub stars: ${repo} failed: ${err.message}`);
    }
  }
  return total;
}

async function fetchDiscordMembers() {
  if (!DISCORD_GUILD_ID) return null;
  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) {
      console.warn(
        `Discord widget: responded ${res.status} ${res.statusText}. Widget must be enabled on the guild.`,
      );
      return null;
    }
    const data = await res.json();
    return typeof data.presence_count === "number" ? data.presence_count : null;
  } catch (err) {
    console.warn(`Discord widget failed: ${err.message}`);
    return null;
  }
}

const outputPath = new URL("../src/data/social-stats.json", import.meta.url);

// Keep previous values as fallback if a fetch fails mid-build.
let previous = { githubStars: 0, discordMembers: null };
if (existsSync(outputPath)) {
  try {
    previous = JSON.parse(readFileSync(outputPath, "utf8"));
  } catch {
    // ignore parse errors; use zeros
  }
}

const githubStars = (await fetchGithubStars()) || previous.githubStars || 0;
const discordMembersFetched = await fetchDiscordMembers();
const discordMembers =
  discordMembersFetched ?? previous.discordMembers ?? null;

const stats = {
  githubStars,
  discordMembers,
  fetchedAt: new Date().toISOString(),
};

writeFileSync(outputPath, JSON.stringify(stats, null, 2) + "\n");
console.log(
  `Wrote social stats: ${githubStars} stars, ${
    discordMembers ?? "(n/a)"
  } Discord members to src/data/social-stats.json`,
);
