export interface Release {
  id: number;
  tag_name: string;
  name: string;
  body: string | null;
  published_at: string;
  html_url: string;
  platform: "mac" | "windows";
}

import data from "./releases.json";
export const releases = data as Release[];
