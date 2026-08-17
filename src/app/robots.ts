import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Concept study, no client mandate yet: the standard for these projects is to
// stay out of the index so the demo can't outrank a real salon's own site.
// Mirrors the `robots: { index: false }` in the locale layout — a crawler that
// never fetches a page would otherwise never see that meta tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
