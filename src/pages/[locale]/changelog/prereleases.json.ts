import type { APIRoute } from "astro";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  formatReleaseMonth,
  ReleaseEntry,
} from "@/components/changelog/release-entry";
import { preReleases, releaseMonth } from "@/data/releases";
import type { Locale } from "@/i18n/index";
import { getLocaleStaticPaths } from "@/lib/locale-routes";

export function getStaticPaths() {
  return getLocaleStaticPaths();
}

/**
 * Daily builds, release candidates, betas, and plugin releases as rendered
 * entries, newest first. The changelog fetches this file once the visitor
 * asks for pre-releases, so the browser needs no markdown renderer.
 */
export const GET: APIRoute = ({ props }) => {
  const locale = props.locale as Locale;
  const months: Record<string, string> = {};
  const entries = preReleases.map((release) => {
    const month = releaseMonth(release);
    months[month] ??= formatReleaseMonth(month, locale);
    return renderToStaticMarkup(
      createElement(ReleaseEntry, { release, locale }),
    );
  });

  return new Response(JSON.stringify({ months, entries }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
