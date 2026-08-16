import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getStylists } from "@/data/stylists";
import type { Locale } from "@/data/types";

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

        {/* One ratio for every frame — the rhythm comes from the grid and the
            spacing, not from tiles of differing sizes. */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {images.map((src) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                loading="lazy"
                sizes="(min-width: 640px) 23vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
