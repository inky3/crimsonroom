import type { Locale } from "./types";

/** Set NEXT_PUBLIC_SITE_URL to your real address (for example https://crimsonroom.com) before you publish. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");

/** Canonical and language links for a page. `path` starts with "/" or is "" for the home page. */
export function alternates(locale: Locale, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: { en: `/en${path}`, th: `/th${path}`, "x-default": `/en${path}` },
  };
}
