import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/data/types";

// Single place the absolute site origin comes from. Without it Next renders
// canonical and Open Graph URLs relative, which makes them useless to both
// crawlers and link previews.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://salon-kupferglanz.vercel.app";

type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(href: Href, locale: string): string {
  return new URL(getPathname({ href, locale: locale as Locale }), SITE_URL).toString();
}

/**
 * Next merges metadata per top-level field, and `openGraph` is replaced
 * wholesale rather than merged — a page that sets only a title silently drops
 * the type, site name and locale inherited from the layout. So every page
 * builds the complete object through here.
 */
export function buildOpenGraph({
  title,
  description,
  siteName,
  locale,
  href,
}: {
  title: string;
  description: string;
  siteName: string;
  locale: string;
  href: Href;
}): Metadata["openGraph"] {
  return {
    type: "website",
    title,
    description,
    siteName,
    url: absoluteUrl(href, locale),
    locale: locale === "de" ? "de_AT" : "en_US",
  };
}

/**
 * Canonical for the current locale plus one hreflang entry per locale.
 * Both DE and EN exist for every page, and their paths differ
 * (/de/leistungen vs /en/services) — so the mapping has to come from the
 * routing table, it cannot be assembled by string concatenation.
 */
export function buildAlternates(href: Href, locale: string): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(href, locale),
    languages: Object.fromEntries(
      routing.locales.map((l) => [l === "de" ? "de-AT" : "en", absoluteUrl(href, l)]),
    ),
  };
}
