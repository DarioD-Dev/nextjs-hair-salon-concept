import type { Locale, ResolvedStylist, Stylist } from "./types";

function unsplash(id: string): string {
  return `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;
}

const stylists: Stylist[] = [
  {
    id: "1",
    slug: "lena-hofer",
    name: "Lena Hofer",
    role: { de: "Creative Director & Coloristin", en: "Creative Director & Colorist" },
    bio: {
      de: "Lena leitet den Salon und ist auf individuelle Balayage- und Farbkonzepte spezialisiert — jede Farbe wird auf Hautton und Typ abgestimmt, nicht von der Stange.",
      en: "Lena runs the salon and specializes in individual balayage and color concepts — every color is matched to skin tone and type, never off the shelf.",
    },
    specialties: {
      de: ["Balayage", "Farbkonzepte", "Beratung"],
      en: ["Balayage", "Color concepts", "Consultation"],
    },
    image: unsplash("photo-1506863530036-1efeddceb993"),
    portfolio: [
      unsplash("photo-1605497788044-5a32c7078486"),
      unsplash("photo-1635273051937-a0ddef9573b6"),
      unsplash("photo-1711274091943-5aae912e6985"),
    ],
  },
  {
    id: "2",
    slug: "markus-weber",
    name: "Markus Weber",
    role: { de: "Master Barber", en: "Master Barber" },
    bio: {
      de: "Markus ist unser Herrenspezialist — von klassischen Schnitten bis zu präzisen Fades, inklusive traditionellem Bartschnitt mit dem Rasiermesser.",
      en: "Markus is our men's specialist — from classic cuts to precision fades, including traditional straight-razor beard work.",
    },
    specialties: {
      de: ["Herrenschnitt", "Fade", "Bartpflege"],
      en: ["Men's cuts", "Fades", "Beard grooming"],
    },
    image: unsplash("photo-1567894340315-735d7c361db0"),
    portfolio: [
      unsplash("photo-1503951914875-452162b0f3f1"),
      unsplash("photo-1657105052497-f996284ffff8"),
      unsplash("photo-1514336937476-a5b961020a5c"),
    ],
  },
  {
    id: "3",
    slug: "selin-yildiz",
    name: "Selin Yıldız",
    role: { de: "Senior Stylistin", en: "Senior Stylist" },
    bio: {
      de: "Selin verbindet präzise Schnitttechnik mit einem Gespür für Textur — ihr Schwerpunkt liegt auf pflegeleichten Schnitten für den Alltag.",
      en: "Selin combines precise cutting technique with an eye for texture — her focus is on low-maintenance cuts built for everyday life.",
    },
    specialties: {
      de: ["Damenschnitt", "Textur", "Styling"],
      en: ["Women's cuts", "Texture", "Styling"],
    },
    image: unsplash("photo-1617690825153-8bb0a8e3c911"),
    portfolio: [
      unsplash("photo-1593702288056-7927b442d0fa"),
      unsplash("photo-1711274093746-b588a17d2716"),
      unsplash("photo-1654097801176-cb1795fd0c5e"),
    ],
  },
];

function resolve(stylist: Stylist, locale: Locale): ResolvedStylist {
  return {
    ...stylist,
    role: stylist.role[locale],
    bio: stylist.bio[locale],
    specialties: stylist.specialties[locale],
  };
}

export async function getStylists(locale: Locale): Promise<ResolvedStylist[]> {
  return stylists.map((stylist) => resolve(stylist, locale));
}

export async function getStylist(locale: Locale, slug: string): Promise<ResolvedStylist | null> {
  const stylist = stylists.find((s) => s.slug === slug);
  return stylist ? resolve(stylist, locale) : null;
}
