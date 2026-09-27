import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en", "hr"],
  defaultLocale: "de",
  localePrefix: "always",
  // Jede Sprache MUSS hier stehen. next-intl typisiert die Tabelle als
  // Partial — eine fehlende Sprache ist kein Compilerfehler, sondern fällt
  // still auf den Routenschlüssel zurück (`/hr/leistungen` statt
  // `/hr/usluge`). Das ist die eine Stelle im Projekt, an der `tsc` nicht die
  // Aufgabenliste ist.
  pathnames: {
    "/": "/",
    "/team": { de: "/team", en: "/team", hr: "/tim" },
    "/leistungen": { de: "/leistungen", en: "/services", hr: "/usluge" },
    // Im Kroatischen dasselbe Wort wie im Deutschen — hier steht der Eintrag
    // trotzdem ausdrücklich, damit er nicht aus Versehen aussieht.
    "/kontakt": { de: "/kontakt", en: "/contact", hr: "/kontakt" },
  },
});

export type Locale = (typeof routing.locales)[number];
