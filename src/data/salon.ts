// Every salon-specific fact lives here, so turning this demo into a real
// client site means editing one file. Values are placeholders for a
// fictional salon — see public/CREDITS.md and the footer disclaimer.
export const SALON = {
  name: "Salon Kupferglanz",
  street: "Kupfergasse 8",
  postalCode: "1060",
  city: "Wien",
  country: "AT",
  phone: "+43 1 234 5678",
  email: "hallo@salonkupferglanz.at",
  // Real booking systems (Treatwell, Salonized, …) plug in here; until then
  // the CTAs point at the contact page.
  bookingUrl: null as string | null,
  instagramUrl: "https://instagram.com/salonkupferglanz",
  facebookUrl: "https://facebook.com/salonkupferglanz",
  geo: { latitude: 48.1954, longitude: 16.3492 },
  priceRange: "€€",
} as const;

export const CONTACT_ADDRESS = `${SALON.street}, ${SALON.postalCode} ${SALON.city}`;

// dayOfWeek uses schema.org day names so the LocalBusiness JSON-LD can be
// generated from this same source instead of a parallel hardcoded list.
export const OPENING_HOURS = [
  { days: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
  { days: ["Saturday"], opens: "09:00", closes: "15:00" },
] as const;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${SALON.name}, ${CONTACT_ADDRESS}`,
)}`;
