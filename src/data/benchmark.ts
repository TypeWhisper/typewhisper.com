export type ProviderType = "cloud" | "local" | "system";

export interface ModelRanking {
  providerId: string;
  model: string;
  providerType: ProviderType;
  avgWerNormalized: number;
  avgCer: number;
  avgRealtimeFactor: number;
  avgDurationMs: number;
  costPerHourAudio: number;
  totalTests: number;
  errorCount: number;
  errorRate: number;
}

export interface BenchmarkData {
  rankings: ModelRanking[];
  metadata: {
    timestamp: string;
    totalModels: number;
    totalTests: number;
  };
}

import data from "./benchmark-results.json";
export const benchmarkData = data as BenchmarkData;

export const providerTypeLabels: Record<ProviderType, string> = {
  cloud: "Cloud",
  local: "Local",
  system: "System",
};

export type BenchmarkPlatform = "mac" | "windows";

/** Maps providerId to the platforms where it's available */
export const modelPlatforms: Record<string, BenchmarkPlatform[]> = {
  openai: ["mac", "windows"],
  groq: ["mac", "windows"],
  deepgram: ["mac", "windows"],
  "sherpa-onnx": ["mac", "windows"],
  "apple-speech": ["mac"],
};

export function formatWer(wer: number): string {
  return `${(wer * 100).toFixed(1)}%`;
}

export function formatCer(cer: number): string {
  return `${(cer * 100).toFixed(1)}%`;
}

export function formatCost(cost: number): string {
  if (cost === 0) return "Free";
  return `$${cost.toFixed(2)}/h`;
}

export function formatRtf(rtf: number): string {
  return `${rtf.toFixed(2)}x`;
}

export function modelDisplayName(ranking: ModelRanking): string {
  return ranking.model;
}

export function providerDisplayName(providerId: string): string {
  const names: Record<string, string> = {
    openai: "OpenAI",
    groq: "Groq",
    deepgram: "Deepgram",
    "sherpa-onnx": "Sherpa-ONNX",
    "apple-speech": "Apple Speech",
  };
  return names[providerId] || providerId;
}
