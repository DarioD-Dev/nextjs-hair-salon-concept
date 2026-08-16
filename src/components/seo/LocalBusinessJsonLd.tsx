import { OPENING_HOURS, SALON } from "@/data/salon";

// Generated from src/data/salon.ts rather than hand-written, so the structured
// data can't drift away from what the page actually shows. Only fields the
// project genuinely has are emitted — no invented review counts or ratings.
export function LocalBusinessJsonLd({ url }: { url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: SALON.name,
    url,
    telephone: SALON.phone,
    email: SALON.email,
    priceRange: SALON.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: SALON.street,
      postalCode: SALON.postalCode,
      addressLocality: SALON.city,
      addressCountry: SALON.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SALON.geo.latitude,
      longitude: SALON.geo.longitude,
    },
    openingHoursSpecification: OPENING_HOURS.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: [SALON.instagramUrl, SALON.facebookUrl],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
