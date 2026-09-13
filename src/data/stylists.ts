import type { Locale, ResolvedStylist, Stylist } from "./types";

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
    image: "/images/team/lena-portrait.jpg",
    portfolio: [
      "/images/team/lena-portfolio-1.jpg",
      "/images/team/lena-portfolio-2.jpg",
      "/images/team/lena-portfolio-3.jpg",
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
    image: "/images/team/markus-portrait.jpg",
    portfolio: [
      "/images/team/markus-portfolio-1.jpg",
      "/images/team/markus-portfolio-2.jpg",
      "/images/team/markus-portfolio-3.jpg",
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
    image: "/images/team/selin-portrait.jpg",
    portfolio: [
      "/images/team/selin-portfolio-1.jpg",
      "/images/team/selin-portfolio-2.jpg",
      "/images/team/selin-portfolio-3.jpg",
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

// Hier stand bis 13.09.2026 ein getStylist(locale, slug) für eine
// Detailseite /team/[slug], die es nie gab: einmal definiert, nirgends
// aufgerufen. Entfernt statt aufgehoben — Code, der auf eine Route wartet,
// die niemand beschlossen hat, ist keine Vorbereitung, sondern eine falsche
// Fährte beim nächsten Lesen.
//
// Das slug-Feld bleibt: Es ist die Anker-ID, über die die Startseite
// (TeamTeaser) auf das jeweilige Profil der Team-Seite verlinkt.
