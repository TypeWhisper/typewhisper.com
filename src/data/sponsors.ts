export type SponsorKind = "oss-funder" | "ecosystem-partner";

export interface Sponsor {
  kind: SponsorKind;
  name: string;
  url: string;
  description: string;
  logo?: string;
  since?: string;
}

export const sponsors: Sponsor[] = [];

export function sponsorsByKind(kind: SponsorKind): Sponsor[] {
  return sponsors.filter((sponsor) => sponsor.kind === kind);
}
