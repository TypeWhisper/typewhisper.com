/**
 * Install links of the TypeWhisper extensions and integrations listed on
 * /extensions/. A store URL of `null` means the listing is not live yet: the
 * page then shows "Coming soon" instead of a link. Going live is a one-line
 * change here.
 */
export const integrations = {
  browser: {
    chromeWebStoreUrl: "https://chromewebstore.google.com/detail/typewhisper/gamnkdngnfamiajnbeglodoaoaifbheh",
    firefoxAddonsUrl: "https://addons.mozilla.org/firefox/addon/typewhisper/",
  },
  raycast: {
    storeUrl: "https://www.raycast.com/SeoFood/typewhisper",
  },
  streamDeck: {
    releasesUrl: "https://github.com/TypeWhisper/typewhisper-stream-deck/releases",
  },
  mcp: {
    installCommand: "npm install -g @typewhisper/mcp",
    repoUrl: "https://github.com/TypeWhisper/typewhisper-mcp",
    npmUrl: "https://www.npmjs.com/package/@typewhisper/mcp",
  },
  pi: {
    installCommand: "pi install npm:@typewhisper/pi",
    repoUrl: "https://github.com/TypeWhisper/typewhisper-pi",
    npmUrl: "https://www.npmjs.com/package/@typewhisper/pi",
  },
};

/** MCP client configuration from the typewhisper-mcp readme. */
export const mcpClientConfig = `{
  "mcpServers": {
    "typewhisper": {
      "command": "npx",
      "args": ["-y", "@typewhisper/mcp"]
    }
  }
}`;
