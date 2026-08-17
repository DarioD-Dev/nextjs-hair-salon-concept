import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

const ROUTES = ["/", "/team", "/leistungen", "/kontakt"] as const;

// Built from the routing table so a new page or a renamed localized path can
// never silently fall out of the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)])),
      },
    })),
  );
}
