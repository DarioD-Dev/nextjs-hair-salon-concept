import type { Locale, ResolvedService, Service, ServiceCategory } from "./types";

const services: Service[] = [
  // Damen
  { id: "d1", category: "damen", name: { de: "Waschen, Schneiden, Föhnen", en: "Wash, Cut & Blow-dry" }, price: 65, duration: 60 },
  { id: "d2", category: "damen", name: { de: "Waschen, Schneiden, Föhnen (langes Haar)", en: "Wash, Cut & Blow-dry (long hair)" }, price: 85, duration: 75 },
  { id: "d3", category: "damen", name: { de: "Föhnen / Styling", en: "Blow-dry / Styling" }, price: 35, duration: 30 },

  // Herren
  { id: "h1", category: "herren", name: { de: "Herrenschnitt klassisch", en: "Classic men's cut" }, price: 35, duration: 30 },
  { id: "h2", category: "herren", name: { de: "Fade / Skin Fade", en: "Fade / Skin fade" }, price: 40, duration: 40 },
  { id: "h3", category: "herren", name: { de: "Bartpflege", en: "Beard grooming" }, price: 20, duration: 20 },
  { id: "h4", category: "herren", name: { de: "Schnitt + Bart komplett", en: "Cut + beard combo" }, price: 55, duration: 50 },

  // Farbe
  { id: "f1", category: "farbe", name: { de: "Ansatzfarbe", en: "Root color" }, price: 55, duration: 60 },
  { id: "f2", category: "farbe", name: { de: "Balayage (ab)", en: "Balayage (from)" }, price: 120, duration: 150 },
  { id: "f3", category: "farbe", name: { de: "Foliensträhnen (ab)", en: "Foil highlights (from)" }, price: 90, duration: 120 },
  { id: "f4", category: "farbe", name: { de: "Tönung", en: "Toner" }, price: 40, duration: 45 },

  // Pflege
  { id: "p1", category: "pflege", name: { de: "Olaplex-Kur", en: "Olaplex treatment" }, price: 25, duration: 20 },
  { id: "p2", category: "pflege", name: { de: "Kopfhautbehandlung", en: "Scalp treatment" }, price: 30, duration: 30 },
  { id: "p3", category: "pflege", name: { de: "Glanzbehandlung", en: "Shine treatment" }, price: 20, duration: 15 },
];

function resolve(service: Service, locale: Locale): ResolvedService {
  return { ...service, name: service.name[locale] };
}

export async function getServices(locale: Locale): Promise<ResolvedService[]> {
  return services.map((service) => resolve(service, locale));
}

export async function getServicesByCategory(
  locale: Locale,
  category: ServiceCategory,
): Promise<ResolvedService[]> {
  return services.filter((s) => s.category === category).map((service) => resolve(service, locale));
}

export const SERVICE_CATEGORIES: ServiceCategory[] = ["damen", "herren", "farbe", "pflege"];
