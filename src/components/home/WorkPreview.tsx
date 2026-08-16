import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getStylists } from "@/data/stylists";
import type { Locale } from "@/data/types";

// Deliberately uneven: two tall frames flanking a wider one, so the grid
// reads as a composed spread rather than a uniform thumbnail wall.
const TILES = [
  "col-span-2 row-span-2 aspect-[4/5]",
  "col-span-2 aspect-[4/3] sm:col-span-3",
  "col-span-2 aspect-square sm:col-span-3",
  "col-span-2 row-span-2 aspect-[4/5] sm:col-span-2",
] as const;

export async function WorkPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");
  const stylists = await getStylists(locale);
  // One image per stylist plus a fourth, so the grid stays balanced without
  // implying any single stylist did most of the work.
  const images = [
    stylists[0].portfolio[0],
    stylists[1].portfolio[0],
    stylists[2].portfolio[0],
    stylists[0].portfolio[1],
  ];

  return (
    <Section>
      <Container>
        <div className="max-w-xl">
          <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{t("workTitle")}</h2>
          <p className="mt-4 font-display text-display-md font-light text-text">{t("workBody")}</p>
        </div>

        <div className="mt-12 grid auto-rows-min grid-cols-4 gap-4 sm:grid-cols-5 sm:gap-6">
          {images.map((src, index) => (
            <div key={src} className={`relative overflow-hidden ${TILES[index]}`}>
              <Image
                src={src}
                alt=""
                fill
                loading="lazy"
                sizes="(min-width: 640px) 40vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
