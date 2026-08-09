import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/team": "/team",
    "/leistungen": { de: "/leistungen", en: "/services" },
    "/galerie": { de: "/galerie", en: "/gallery" },
    "/kontakt": { de: "/kontakt", en: "/contact" },
  },
});

export type Locale = (typeof routing.locales)[number];
