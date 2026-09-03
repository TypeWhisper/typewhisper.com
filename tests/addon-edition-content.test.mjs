import test from "node:test";
import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const LOCALES = ["de", "en"];
const PLATFORMS = ["mac", "windows"];

function frontmatter(content) {
  const match = content.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, "expected MDX frontmatter");
  return match[1];
}

function body(content) {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/^---\n[\s\S]*?\n---\n?/, "")
    .trim();
}

function scalar(data, key) {
  return data.match(new RegExp(`^${key}: ["']?([^"'\\n]+)["']?$`, "m"))?.[1];
}

function list(data, key) {
  const block =
    data.match(new RegExp(`^${key}:\\n((?:  - .+\\n?)+)`, "m"))?.[1] ?? "";
  return [...block.matchAll(/^  - ["']?(.+?)["']?$/gm)].map(
    (match) => match[1],
  );
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

async function windowsAddonInventory(locale) {
  const dir = path.resolve(`src/content/addons/${locale}`);
  const files = (await readdir(dir)).filter((file) => file.endsWith(".mdx"));
  const addons = [];

  for (const file of files) {
    const data = frontmatter(await readFile(path.join(dir, file), "utf8"));
    const platforms = list(data, "platforms");
    if (!platforms.includes("windows")) {
      continue;
    }

    const slug = scalar(data, "slug");
    let id = scalar(data, "id");
    if (platforms.includes("mac")) {
      id = scalar(
        frontmatter(
          await readFile(
            path.resolve(
              `src/content/addon-editions/${locale}/${slug}/windows.mdx`,
            ),
            "utf8",
          ),
        ),
        "id",
      );
    }

    assert.ok(id, `${locale}/${slug} needs a Windows plugin ID`);
    addons.push({ id, slug });
  }

  return addons.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function editionFamilies(locale, platform) {
  const dir = path.resolve(`src/content/addon-editions/${locale}`);
  const filename = platform === "mac" ? "macos.mdx" : "windows.mdx";
  const entries = (await readdir(dir, { withFileTypes: true })).filter(
    (entry) => entry.isDirectory(),
  );
  const families = await Promise.all(
    entries.map(async (entry) => {
      const files = await readdir(path.join(dir, entry.name));
      return files.includes(filename) ? entry.name : undefined;
    }),
  );

  return families.filter(Boolean).sort();
}

test("every cross-platform add-on has independent localized macOS and Windows editions", async () => {
  const [deFamilies, enFamilies] = await Promise.all(
    LOCALES.map((locale) => crossPlatformFamilies(locale)),
  );

  assert.deepEqual(deFamilies, enFamilies);
  assert.equal(deFamilies.length, 35);

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
          const releaseVersion =
            scalar(data, "releaseVersion") || scalar(data, "version");
          assert.match(releaseVersion, /^\d+\.\d+\.\d+$/);
          assert.ok(
            releaseUrl.endsWith(`-v${releaseVersion}`),
            `${locale}/${slug}/${filename} must link its release version`,
          );
        }
      }
    }
  }
});

test("Windows screenshots cover every documented add-on that has a settings dialog", async () => {
  const macFamilies = await crossPlatformFamilies("en");
  const windowsAddons = await windowsAddonInventory("en");

  for (const locale of LOCALES) {
    for (const slug of macFamilies) {
      await access(
        path.resolve(`public/screenshots/${locale}/plugins/${slug}.png`),
      );
      await access(
        path.resolve(`public/screenshots/${locale}/plugins/${slug}.webp`),
      );
    }
  }

  const screenshotManifest = JSON.parse(
    await readFile(
      path.resolve("src/data/addon-edition-screenshots.json"),
      "utf8",
    ),
  );
  const windowsScreenshotIds = new Set(screenshotManifest.windows);

  assert.equal(windowsAddons.length, 38);
  assert.equal(windowsScreenshotIds.size, 34);
  assert.deepEqual(
    windowsAddons
      .filter(({ id }) => !windowsScreenshotIds.has(id))
      .map(({ slug }) => slug)
      .sort(),
    ["file-memory", "granite", "sherpa-onnx", "whisper-cpp"],
  );

  for (const id of windowsScreenshotIds) {
    assert.ok(
      windowsAddons.some((addon) => addon.id === id),
      `Windows screenshot ${id} must belong to a documented add-on`,
    );
    await access(path.resolve(`public/screenshots/windows/plugins/${id}.png`));
    await access(path.resolve(`public/screenshots/windows/plugins/${id}.webp`));
  }
});

test("every platform edition has a detailed guide source", async () => {
  const families = await crossPlatformFamilies("en");
  const capabilityMap = JSON.parse(
    await readFile(
      path.resolve("src/data/addon-edition-capabilities.json"),
      "utf8",
    ),
  );
  const validCapabilities = new Set([
    "transcription",
    "llm",
    "tts",
    "action",
    "post-processing",
    "memory",
    "utility",
  ]);

  assert.deepEqual(Object.keys(capabilityMap).sort(), families);
  assert.deepEqual(capabilityMap.cohere.mac, ["transcription"]);
  assert.deepEqual(capabilityMap.cohere.windows, ["llm"]);
  assert.deepEqual(capabilityMap.fireworks.mac, ["transcription", "llm"]);
  assert.deepEqual(capabilityMap.fireworks.windows, ["llm"]);
  assert.deepEqual(capabilityMap.soniox.mac, ["transcription", "tts"]);
  assert.deepEqual(capabilityMap.soniox.windows, ["transcription"]);

  for (const locale of LOCALES) {
    for (const slug of families) {
      const familyGuide = body(
        await readFile(
          path.resolve(`src/content/addons/${locale}/${slug}.mdx`),
          "utf8",
        ),
      );
      const macEdition = await readFile(
        path.resolve(`src/content/addon-editions/${locale}/${slug}/macos.mdx`),
        "utf8",
      );
      const windowsEdition = await readFile(
        path.resolve(
          `src/content/addon-editions/${locale}/${slug}/windows.mdx`,
        ),
        "utf8",
      );
      const macGuide = body(macEdition) || familyGuide;
      const windowsGuide = body(windowsEdition);

      assert.match(
        macGuide,
        /^##\s+/m,
        `${locale}/${slug}/macOS needs a detailed guide`,
      );
      assert.match(
        macGuide,
        locale === "de" ? /^##\s+.*Einrichtung.*$/m : /^##\s+.*Setup.*$/m,
        `${locale}/${slug}/macOS needs setup instructions`,
      );

      for (const platform of PLATFORMS) {
        const capabilities = capabilityMap[slug][platform];
        assert.ok(
          capabilities.length > 0,
          `${slug}/${platform} needs capabilities`,
        );
        for (const capability of capabilities) {
          assert.ok(
            validCapabilities.has(capability),
            `${slug}/${platform} has invalid capability ${capability}`,
          );
        }
      }

      if (windowsGuide) {
        assert.match(
          windowsGuide,
          locale === "de" ? /^##\s+.*Einrichtung.*$/m : /^##\s+.*Setup.*$/m,
          `${locale}/${slug}/Windows custom guide needs setup instructions`,
        );
      } else {
        assert.ok(
          list(frontmatter(windowsEdition), "configuration").length > 0,
          `${locale}/${slug}/Windows generated guide needs configuration steps`,
        );
      }
    }
  }
});

test("Meta docs link the published Windows and macOS editions on main", async () => {
  const capabilityMap = JSON.parse(
    await readFile(
      path.resolve("src/data/addon-edition-capabilities.json"),
      "utf8",
    ),
  );
  const filenames = {
    mac: "macos.mdx",
    windows: "windows.mdx",
  };

  for (const locale of LOCALES) {
    const family = frontmatter(
      await readFile(
        path.resolve(`src/content/addons/${locale}/meta.mdx`),
        "utf8",
      ),
    );

    assert.equal(scalar(family, "status"), undefined);
    assert.equal(scalar(family, "slug"), "meta");
    assert.equal(scalar(family, "name"), "Meta");
    assert.deepEqual(list(family, "platforms"), ["mac", "windows"]);
    assert.deepEqual(list(family, "categories"), ["transcription", "llm"]);
    assert.equal(scalar(family, "version"), undefined);
    assert.equal(scalar(family, "id"), undefined);
    assert.equal(scalar(family, "brandLogo"), "meta");

    for (const [platform, filename] of Object.entries(filenames)) {
      const content = await readFile(
        path.resolve(
          `src/content/addon-editions/${locale}/meta/${filename}`,
        ),
        "utf8",
      );
      const data = frontmatter(content);
      const guide = body(content);

      assert.equal(scalar(data, "familySlug"), "meta");
      assert.equal(scalar(data, "platform"), platform);
      assert.ok(list(data, "requirements").length >= 2);
      assert.ok(list(data, "highlights").length >= 4);
      assert.match(
        guide,
        locale === "de" ? /^##\s+.*Einrichtung.*$/m : /^##\s+.*Setup.*$/m,
      );

      if (platform === "windows") {
        assert.equal(scalar(data, "status"), undefined);
        assert.equal(scalar(data, "version"), "1.0.1");
        assert.equal(scalar(data, "id"), "com.typewhisper.meta");
        assert.equal(scalar(data, "minAppVersion"), "1.0.10");
        assert.equal(
          scalar(data, "sourceUrl"),
          "https://github.com/TypeWhisper/typewhisper-win/tree/main/plugins/TypeWhisper.Plugin.Meta",
        );
        assert.match(scalar(data, "releaseUrl"), /plugin-meta-v1\.0\.1$/);
        assert.deepEqual(capabilityMap.meta[platform], ["transcription", "llm"]);
      } else {
        assert.equal(scalar(data, "status"), undefined);
        assert.equal(scalar(data, "version"), "1.0.0");
        assert.equal(scalar(data, "id"), "com.typewhisper.meta");
        assert.equal(scalar(data, "minAppVersion"), "1.7.0");
        assert.equal(scalar(data, "minOsVersion"), "14.0");
        assert.equal(
          scalar(data, "sourceUrl"),
          "https://github.com/TypeWhisper/typewhisper-mac/tree/main/TypeWhisperPluginSDK/Plugins/MetaPlugin",
        );
        assert.match(scalar(data, "releaseUrl"), /plugin-meta-v1\.0\.0$/);
        assert.deepEqual(capabilityMap.meta[platform], ["transcription", "llm"]);
      }
    }
  }

  for (const filename of [
    "com.typewhisper.meta.png",
    "com.typewhisper.meta.webp",
    "com.typewhisper.meta.de.png",
    "com.typewhisper.meta.de.webp",
  ]) {
    await access(path.resolve(`public/screenshots/windows/plugins/${filename}`));
  }

  for (const locale of LOCALES) {
    for (const extension of ["png", "webp"]) {
      await access(
        path.resolve(`public/screenshots/${locale}/plugins/meta.${extension}`),
      );
    }
  }
});

test("Authenticated Provider CLI docs cover the published OpenCode editions", async () => {
  const filenames = {
    mac: "macos.mdx",
    windows: "windows.mdx",
  };

  for (const locale of LOCALES) {
    const family = await readFile(
      path.resolve(`src/content/addons/${locale}/authenticated-cli.mdx`),
      "utf8",
    );
    assert.match(family, /OpenCode Zen/);

    for (const [platform, filename] of Object.entries(filenames)) {
      const content = await readFile(
        path.resolve(
          `src/content/addon-editions/${locale}/authenticated-cli/${filename}`,
        ),
        "utf8",
      );
      const data = frontmatter(content);
      const guide = body(content);

      assert.equal(scalar(data, "familySlug"), "authenticated-cli");
      assert.equal(scalar(data, "platform"), platform);
      assert.equal(scalar(data, "version"), "1.1.0");
      assert.equal(scalar(data, "id"), "com.typewhisper.authenticated-cli");
      assert.match(
        scalar(data, "releaseUrl"),
        /plugin-authenticated-cli-v1\.1\.0$/,
      );
      assert.match(guide, /OpenCode/);
      assert.match(
        guide,
        locale === "de" ? /vollständig kostenlos/ : /fully free/,
      );

      if (platform === "mac") {
        assert.equal(scalar(data, "minAppVersion"), "1.7.0");
        assert.match(content, /\/screenshots\/plugins\/authenticated-cli\.png/);
      } else {
        assert.equal(scalar(data, "minAppVersion"), "1.0.9");
        assert.match(
          content,
          locale === "de"
            ? /com\.typewhisper\.authenticated-cli\.de\.png/
            : /com\.typewhisper\.authenticated-cli\.png/,
        );
      }
    }
  }

  for (const filename of [
    "com.typewhisper.authenticated-cli.png",
    "com.typewhisper.authenticated-cli.webp",
    "com.typewhisper.authenticated-cli.de.png",
    "com.typewhisper.authenticated-cli.de.webp",
  ]) {
    await access(
      path.resolve(`public/screenshots/windows/plugins/${filename}`),
    );
  }

  for (const locale of LOCALES) {
    for (const extension of ["png", "webp"]) {
      await access(
        path.resolve(
          `public/screenshots/${locale}/plugins/authenticated-cli.${extension}`,
        ),
      );
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
        "releaseVersion",
      ]) {
        assert.equal(
          scalar(de, key),
          scalar(en, key),
          `${slug}/${filename}: ${key}`,
        );
      }
    }
  }
});
