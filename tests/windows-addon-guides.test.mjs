import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const LOCALES = ["de", "en"];
const discover = {
  en: "Settings > Discover plugins",
  de: "Einstellungen > Plugins entdecken",
};
// The Integrations page with its Installed and Discover tabs, which
// TypeWhisper for Windows 1.1.0 replaced with Discover plugins and one
// Settings sidebar page per installed plugin.
const oldPath =
  /Settings > Integrations|Einstellungen > Integrationen|Integrations > |Integrationen > |\*\*Integrations\*\*|\*\*Integrationen\*\*|\*\*Discover\*\*|\*\*Entdecken\*\*/;

function split(content) {
  const match = content
    .replace(/\r\n/g, "\n")
    .match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  assert.ok(match, "expected MDX frontmatter");
  return { data: match[1], body: match[2].trim() };
}

function list(data, key) {
  const block =
    data.match(new RegExp(`^${key}:\\n((?:  - .+\\n?)+)`, "m"))?.[1] ?? "";
  return [...block.matchAll(/^  - ["']?(.+?)["']?$/gm)].map(
    (match) => match[1],
  );
}

test("the generated Windows guide installs add-ons under Discover plugins", async () => {
  for (const locale of LOCALES) {
    const strings = JSON.parse(
      await readFile(path.resolve(`src/i18n/locales/${locale}/addons.json`), "utf8"),
    );

    for (const key of [
      "addons.editions.guide.install",
      "addons.editions.guide.installListedAs",
    ]) {
      assert.ok(
        strings[key].includes(discover[locale]),
        `${locale}: ${key} installs under ${discover[locale]}`,
      );
    }
    assert.ok(strings["addons.editions.guide.installListedAs"].includes("{appName}"));

    for (const [key, value] of Object.entries(strings)) {
      if (key.startsWith("addons.editions.guide.")) {
        assert.doesNotMatch(value, oldPath, `${locale}: ${key}`);
      }
    }
  }
});

test("Windows editions use the Settings path of TypeWhisper for Windows 1.1 and later", async () => {
  for (const locale of LOCALES) {
    const dir = path.resolve(`src/content/addon-editions/${locale}`);
    for (const slug of await readdir(dir)) {
      let content;
      try {
        content = await readFile(path.join(dir, slug, "windows.mdx"), "utf8");
      } catch {
        continue;
      }

      const { data, body } = split(content);
      assert.doesNotMatch(data, oldPath, `${locale}/${slug}/windows.mdx frontmatter`);
      assert.doesNotMatch(body, oldPath, `${locale}/${slug}/windows.mdx guide`);
      // Without a guide of its own, the page shows the generated guide.
      if (body) {
        assert.ok(
          body.includes(discover[locale]),
          `${locale}/${slug}: the Windows guide installs under ${discover[locale]}`,
        );
      }
    }
  }
});

test("Windows-only add-on pages install under Discover plugins", async () => {
  for (const locale of LOCALES) {
    const dir = path.resolve(`src/content/addons/${locale}`);
    for (const file of (await readdir(dir)).filter((name) => name.endsWith(".mdx"))) {
      const { data, body } = split(await readFile(path.join(dir, file), "utf8"));
      const platforms = list(data, "platforms");
      if (platforms.length !== 1 || platforms[0] !== "windows") {
        continue;
      }

      assert.doesNotMatch(body, oldPath, `${locale}/${file}`);
      assert.ok(
        body.includes(discover[locale]),
        `${locale}/${file}: the guide installs under ${discover[locale]}`,
      );
    }
  }
});

test("Windows docs and landing text do not send users to Integrations", async () => {
  const dir = path.resolve("src/pages/docs/windows");
  for (const file of (await readdir(dir)).filter((name) => name.endsWith(".tsx"))) {
    assert.doesNotMatch(
      await readFile(path.join(dir, file), "utf8"),
      oldPath,
      `src/pages/docs/windows/${file}`,
    );
  }

  for (const locale of LOCALES) {
    const strings = JSON.parse(
      await readFile(path.resolve(`src/i18n/locales/${locale}/landing.json`), "utf8"),
    );
    for (const [key, value] of Object.entries(strings)) {
      if (key.startsWith("features.windows.")) {
        assert.doesNotMatch(value, oldPath, `${locale}: ${key}`);
      }
      // Captions name the screen in their screenshot.
      if (key.startsWith("features.windows.") && key.endsWith(".caption")) {
        assert.doesNotMatch(value, /^Integrat/, `${locale}: ${key} names a page that no longer exists`);
      }
    }
  }
});

function scalar(data, key) {
  return data.match(new RegExp(`^${key}: ["']?([^"'\\n]+)["']?$`, "m"))?.[1];
}

// The catalog's minHostVersion is the plugin host version, 1.1.6 in both
// TypeWhisper for Windows 1.1.0 and 1.2.0, not an app version. Every catalog
// plugin therefore runs on 1.1.0, the first release with Discover plugins, and
// a later version here would wrongly exclude users of 1.1.
const FIRST_APP_WITH_DISCOVER = "1.1.0";

test("Windows add-ons name the first app version with Discover plugins", async () => {
  const newer = { en: "or newer", de: "oder neuer" };

  for (const locale of LOCALES) {
    const dir = path.resolve(`src/content/addon-editions/${locale}`);
    for (const slug of await readdir(dir)) {
      let content;
      try {
        content = await readFile(path.join(dir, slug, "windows.mdx"), "utf8");
      } catch {
        continue;
      }

      const { data } = split(content);
      const minimum = scalar(data, "minAppVersion");
      assert.equal(minimum, FIRST_APP_WITH_DISCOVER, `${locale}/${slug}: minAppVersion`);
      assert.equal(
        list(data, "requirements")[0],
        `TypeWhisper ${minimum} ${newer[locale]}`,
        `${locale}/${slug}: the first requirement names the app version`,
      );
    }

    const addons = path.resolve(`src/content/addons/${locale}`);
    for (const file of (await readdir(addons)).filter((name) => name.endsWith(".mdx"))) {
      const { data } = split(await readFile(path.join(addons, file), "utf8"));
      const platforms = list(data, "platforms");
      if (platforms.length !== 1 || platforms[0] !== "windows") {
        continue;
      }

      const minimum = scalar(data, "minAppVersion");
      assert.equal(minimum, FIRST_APP_WITH_DISCOVER, `${locale}/${file}: minAppVersion`);
    }
  }
});

function map(data, key) {
  const block = data.match(new RegExp(`^${key}:\\n((?:  [\\w-]+: .+\\n?)+)`, "m"))?.[1] ?? "";
  return Object.fromEntries(
    [...block.matchAll(/^  ([\w-]+): ["']?(.+?)["']?$/gm)].map((match) => [match[1], match[2]]),
  );
}

// The generated guide names a capability as the app lists it (see
// addonEditionCapabilityName); a name for a capability the edition lacks
// would never show, and both languages need the same capabilities.
test("capability names of Windows editions belong to their capabilities", async () => {
  const capabilities = JSON.parse(
    await readFile(path.resolve("src/data/addon-edition-capabilities.json"), "utf8"),
  );
  const names = {};
  for (const locale of LOCALES) {
    const dir = path.resolve(`src/content/addon-editions/${locale}`);
    for (const slug of await readdir(dir)) {
      let content;
      try {
        content = await readFile(path.join(dir, slug, "windows.mdx"), "utf8");
      } catch {
        continue;
      }
      const declared = map(split(content).data, "capabilityNames");
      for (const capability of Object.keys(declared)) {
        assert.ok(
          capabilities[slug]?.windows?.includes(capability),
          `${locale}/${slug}: ${capability} is not a Windows capability`,
        );
      }
      (names[slug] ??= {})[locale] = Object.keys(declared).sort();
    }
  }
  for (const [slug, byLocale] of Object.entries(names)) {
    assert.deepEqual(byLocale.de, byLocale.en, `${slug}: the same capabilities have names in both languages`);
  }
});
