import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const LOCALES = ["de", "en"];
const PLATFORMS = ["mac", "windows"];

function frontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, "expected MDX frontmatter");
  return match[1];
}

function scalar(data, key) {
  return data.match(new RegExp(`^${key}: ["']?([^"'\\n]+)["']?$`, "m"))?.[1];
}

function list(data, key) {
  const block = data.match(new RegExp(`^${key}:\\n((?:  - .+\\n?)+)`, "m"))?.[1] ?? "";
  return [...block.matchAll(/^  - ["']?(.+?)["']?$/gm)].map((match) => match[1]);
}

async function crossPlatformFamilies(locale) {
  const dir = path.resolve(`src/content/addons/${locale}`);
  const files = (await readdir(dir)).filter((file) => file.endsWith(".mdx"));
  const slugs = [];

  for (const file of files) {
    const data = frontmatter(await readFile(path.join(dir, file), "utf8"));
    const platforms = list(data, "platforms");

    if (platforms.includes("mac") && platforms.includes("windows")) {
      assert.equal(
        scalar(data, "version"),
        undefined,
        `${locale}/${file} must not expose one shared version`,
      );
      slugs.push(scalar(data, "slug"));
    }
  }

  return slugs.sort();
}

test("every cross-platform add-on has independent localized macOS and Windows editions", async () => {
  const [deFamilies, enFamilies] = await Promise.all(
    LOCALES.map((locale) => crossPlatformFamilies(locale)),
  );

  assert.deepEqual(deFamilies, enFamilies);
  assert.equal(deFamilies.length, 31);

  for (const locale of LOCALES) {
    for (const slug of deFamilies) {
      for (const platform of PLATFORMS) {
        const filename = platform === "mac" ? "macos.mdx" : "windows.mdx";
        const file = path.resolve(
          `src/content/addon-editions/${locale}/${slug}/${filename}`,
        );
        const content = await readFile(file, "utf8");
        const data = frontmatter(content);

        assert.equal(scalar(data, "familySlug"), slug);
        assert.equal(scalar(data, "platform"), platform);
        assert.match(scalar(data, "version"), /^\d+\.\d+\.\d+$/);
        assert.ok(scalar(data, "description"));
        assert.ok(scalar(data, "id"));
        assert.ok(list(data, "requirements").length >= 2);
        assert.ok(list(data, "highlights").length >= 4);
        assert.ok(
          slug === "obsidian" || list(data, "configuration").length >= 1,
        );
        assert.match(
          scalar(data, "sourceUrl"),
          new RegExp(
            `^https://github\\.com/TypeWhisper/typewhisper-${platform === "mac" ? "mac" : "win"}/tree/main/`,
          ),
        );
        const releaseUrl = scalar(data, "releaseUrl");
        if (releaseUrl) {
          assert.ok(
            releaseUrl.endsWith(`-v${scalar(data, "version")}`),
            `${locale}/${slug}/${filename} must link its displayed release`,
          );
        }

        if (slug !== "obsidian") {
          assert.equal(
            scalar(data, "screenshots"),
            undefined,
            `${locale}/${slug}/${filename} must wait for its original screenshot`,
          );
        }
      }
    }
  }
});

test("localized editions keep platform identity, source, and version in sync", async () => {
  const families = await crossPlatformFamilies("de");

  for (const slug of families) {
    for (const platform of PLATFORMS) {
      const filename = platform === "mac" ? "macos.mdx" : "windows.mdx";
      const [de, en] = await Promise.all(
        LOCALES.map(async (locale) =>
          frontmatter(
            await readFile(
              path.resolve(
                `src/content/addon-editions/${locale}/${slug}/${filename}`,
              ),
              "utf8",
            ),
          ),
        ),
      );

      for (const key of [
        "familySlug",
        "platform",
        "version",
        "id",
        "sourceUrl",
        "releaseUrl",
      ]) {
        assert.equal(scalar(de, key), scalar(en, key), `${slug}/${filename}: ${key}`);
      }
    }
  }
});
