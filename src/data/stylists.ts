import type { ResolvedStylist, Stylist } from "./types";
import type { Locale } from "@/i18n/routing";

const stylists: Stylist[] = [
  {
    id: "1",
    slug: "lena-hofer",
    name: "Lena Hofer",
    role: {
      de: "Creative Director & Coloristin",
      en: "Creative Director & Colorist",
      hr: "Kreativna direktorica i koloristica",
    },
    bio: {
      de: "Lena leitet den Salon und ist auf individuelle Balayage- und Farbkonzepte spezialisiert — jede Farbe wird auf Hautton und Typ abgestimmt, nicht von der Stange.",
      en: "Lena runs the salon and specializes in individual balayage and color concepts — every color is matched to skin tone and type, never off the shelf.",
      hr: "Lena vodi salon i specijalizirana je za individualni balayage i koncepte boje — svaka se boja usklađuje s tonom kože i tipom, ništa po šabloni.",
    },
    specialties: {
      de: ["Balayage", "Farbkonzepte", "Beratung"],
      en: ["Balayage", "Color concepts", "Consultation"],
      hr: ["Balayage", "Koncepti boje", "Savjetovanje"],
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
    role: { de: "Master Barber", en: "Master Barber", hr: "Master barber" },
    bio: {
      de: "Markus ist unser Herrenspezialist — von klassischen Schnitten bis zu präzisen Fades, inklusive traditionellem Bartschnitt mit dem Rasiermesser.",
      en: "Markus is our men's specialist — from classic cuts to precision fades, including traditional straight-razor beard work.",
      hr: "Markus je naš specijalist za mušku kosu — od klasičnih šišanja do preciznih fadeova, uključujući tradicionalno oblikovanje brade britvom.",
    },
    specialties: {
      de: ["Herrenschnitt", "Fade", "Bartpflege"],
      en: ["Men's cuts", "Fades", "Beard grooming"],
      hr: ["Muško šišanje", "Fade", "Njega brade"],
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
    role: { de: "Senior Stylistin", en: "Senior Stylist", hr: "Senior stilistica" },
    bio: {
      de: "Selin verbindet präzise Schnitttechnik mit einem Gespür für Textur — ihr Schwerpunkt liegt auf pflegeleichten Schnitten für den Alltag.",
      en: "Selin combines precise cutting technique with an eye for texture — her focus is on low-maintenance cuts built for everyday life.",
      hr: "Selin spaja preciznu tehniku šišanja s osjećajem za teksturu — težište joj je na šišanjima koja se lako održavaju u svakodnevici.",
    },
    specialties: {
      de: ["Damenschnitt", "Textur", "Styling"],
      en: ["Women's cuts", "Texture", "Styling"],
      hr: ["Žensko šišanje", "Tekstura", "Styling"],
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
