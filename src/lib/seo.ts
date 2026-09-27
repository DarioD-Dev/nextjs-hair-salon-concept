import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Single place the absolute site origin comes from. Without it Next renders
// canonical and Open Graph URLs relative, which makes them useless to both
// crawlers and link previews.
//
// The deployment is named after this repository, not after the fictional
// salon: these are concept demos, and a made-up business name in the URL
// reads like a real client site rather than a study.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextjs-hair-salon-concept.vercel.app";

/**
 * hreflang-Werte. Regionsbehaftet, wo das Publikum eines ist: Das Deutsch ist
 * für Österreich geschrieben, das Kroatisch für Kroatien. Das schlichte "en"
 * bleibt schlicht, weil die englische Fassung kein bestimmtes Land meint.
 *
 * Literale Tabelle statt Ternär, und das ist der eigentliche Punkt: Vorher
 * stand hier `l === "de" ? "de-AT" : "en"`. Mit einer dritten Sprache hätte
 * das zweimal den Schlüssel "en" erzeugt — `Object.fromEntries` behält den
 * letzten, die kroatische Adresse hätte die englische überschrieben. Kein
 * Compilerfehler, kein Build-Fehler, einfach ein verschwundenes hreflang.
 * Als `Record<Locale, string>` ist eine neue Sprache ohne Entscheidung
 * stattdessen ein Typfehler.
 */
const HREFLANG: Record<Locale, string> = { de: "de-AT", en: "en", hr: "hr-HR" };

/**
 * OpenGraph-Sprachcodes sind unterstrichen und regionsbehaftet, die eigenen
 * Codes der Seite sind es nicht. Vorher ebenfalls ein Ternär, das jede
 * Sprache außer Deutsch still zu `en_US` gemacht hätte.
 */
export const OG_LOCALES: Record<Locale, string> = { de: "de_AT", en: "en_US", hr: "hr_HR" };

type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(href: Href, locale: Locale): string {
  return new URL(getPathname({ href, locale }), SITE_URL).toString();
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
  locale: Locale;
  href: Href;
}): Metadata["openGraph"] {
  return {
    type: "website",
    title,
    description,
    siteName,
    url: absoluteUrl(href, locale),
    locale: OG_LOCALES[locale],
    // Muss hier stehen, nicht nur im Layout: Next führt `openGraph` NICHT
    // zusammen, sondern ersetzt es ganz. Jede Seite, die diesen Helfer
    // benutzt, überschrieb damit die Bildangabe des Layouts — die Vorschau
    // blieb bildlos, obwohl twitter:card ein großes Bild versprach und die
    // Route /opengraph-image es auslieferte.
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  };
}

/**
 * Canonical for the current locale plus one hreflang entry per locale.
 * Every page exists in every locale, and the paths differ
 * (/de/leistungen vs /en/services vs /hr/usluge) — so the mapping has to come
 * from the routing table, it cannot be assembled by string concatenation.
 */
export function buildAlternates(href: Href, locale: Locale): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(href, locale),
    languages: Object.fromEntries(routing.locales.map((l) => [HREFLANG[l], absoluteUrl(href, l)])),
  };
}
