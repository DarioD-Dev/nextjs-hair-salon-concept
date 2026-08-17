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
  // implying any single stylist did most of the work. The stylist travels with
  // the image so the alt text can name who did the work — these are the
  // portfolio, not decoration, and an empty alt hid them from everyone who
  // does not see the page.
  const images = [
    { src: stylists[0].portfolio[0], by: stylists[0].name },
    { src: stylists[1].portfolio[0], by: stylists[1].name },
    { src: stylists[2].portfolio[0], by: stylists[2].name },
    { src: stylists[0].portfolio[1], by: stylists[0].name },
  ];

  return (
    <Section>
      <Container>
        {/* Eyebrow and statement live inside one h2. Previously the eyebrow was
            the heading and the line that actually says something was a <p>, so
            the document outline listed the labels and skipped the content. */}
        <h2 className="max-w-xl">
          <span className="block font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">
            {t("workTitle")}
          </span>
          <span className="mt-4 block font-display text-display-md font-light text-text">{t("workBody")}</span>
        </h2>

        {/* One ratio for every frame — the rhythm comes from the grid and the
            spacing, not from tiles of differing sizes. */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {images.map((image) => (
            <div key={image.src} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image.src}
                alt={t("workImageAlt", { name: image.by })}
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
