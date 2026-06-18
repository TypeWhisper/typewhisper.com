export type BrandLogoContext = "addon" | "nav" | "social";
export type BrandLogoFallback = "custom" | "lucide" | "none";

export type BrandLogoId =
  | "github"
  | "discord"
  | "openai"
  | "linear"
  | "claude-ai"
  | "gemini"
  | "mistral"
  | "obsidian"
  | "cohere"
  | "xai"
  | "groq"
  | "openrouter"
  | "google-cloud"
  | "cloudflare"
  | "slack"
  | "vscode"
  | "notion"
  | "gmail";

export interface BrandLogoDefinition {
  id: BrandLogoId;
  svglSearch: string;
  expectedTitle: string;
  contexts: BrandLogoContext[];
  preferWordmark?: boolean;
  fallback: BrandLogoFallback;
  fallbackComponent?: string;
  homepage?: string;
  brandGuidelinesUrl?: string;
}

export const brandLogos = [
  {
    id: "github",
    svglSearch: "github",
    expectedTitle: "GitHub",
    contexts: ["nav", "social"],
    fallback: "custom",
    fallbackComponent: "GitHubIcon",
    homepage: "https://github.com/",
    brandGuidelinesUrl: "https://brand.github.com/",
  },
  {
    id: "discord",
    svglSearch: "discord",
    expectedTitle: "Discord",
    contexts: ["addon"],
    fallback: "custom",
    fallbackComponent: "DiscordIcon",
    homepage: "https://discord.com/",
    brandGuidelinesUrl: "https://discord.com/branding",
  },
  {
    id: "openai",
    svglSearch: "openai",
    expectedTitle: "OpenAI",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://openai.com/",
    brandGuidelinesUrl: "https://openai.com/brand/",
  },
  {
    id: "linear",
    svglSearch: "linear",
    expectedTitle: "Linear",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://linear.app/",
  },
  {
    id: "claude-ai",
    svglSearch: "claude",
    expectedTitle: "Claude AI",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://claude.ai/",
  },
  {
    id: "gemini",
    svglSearch: "gemini",
    expectedTitle: "Gemini",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://gemini.google.com/",
  },
  {
    id: "mistral",
    svglSearch: "mistral ai",
    expectedTitle: "Mistral AI",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://mistral.ai/",
  },
  {
    id: "obsidian",
    svglSearch: "obsidian",
    expectedTitle: "Obsidian",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://obsidian.md/",
    brandGuidelinesUrl: "https://obsidian.md/brand",
  },
  {
    id: "cohere",
    svglSearch: "cohere",
    expectedTitle: "Cohere",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://cohere.com/",
  },
  {
    id: "xai",
    svglSearch: "xai",
    expectedTitle: "xAI",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://x.ai/",
  },
  {
    id: "groq",
    svglSearch: "groq",
    expectedTitle: "Groq",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://groq.com/",
  },
  {
    id: "openrouter",
    svglSearch: "openrouter",
    expectedTitle: "OpenRouter",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://openrouter.ai/",
  },
  {
    id: "google-cloud",
    svglSearch: "google cloud",
    expectedTitle: "Google Cloud",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://cloud.google.com/",
  },
  {
    id: "cloudflare",
    svglSearch: "cloudflare",
    expectedTitle: "Cloudflare",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://www.cloudflare.com/",
  },
  {
    id: "slack",
    svglSearch: "slack",
    expectedTitle: "Slack",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://slack.com/",
    brandGuidelinesUrl: "https://slack.com/media-kit",
  },
  {
    id: "vscode",
    svglSearch: "visual studio code",
    expectedTitle: "Visual Studio Code",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://code.visualstudio.com/",
    brandGuidelinesUrl: "https://code.visualstudio.com/brand",
  },
  {
    id: "notion",
    svglSearch: "notion",
    expectedTitle: "Notion",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://notion.so/",
  },
  {
    id: "gmail",
    svglSearch: "gmail",
    expectedTitle: "Gmail",
    contexts: ["addon"],
    fallback: "lucide",
    homepage: "https://www.gmail.com/",
  },
] as const satisfies readonly BrandLogoDefinition[];

export const brandLogoIds = brandLogos.map((brand) => brand.id) as BrandLogoId[];

export const brandLogoById = Object.fromEntries(
  brandLogos.map((brand) => [brand.id, brand]),
) as unknown as Record<BrandLogoId, BrandLogoDefinition>;
