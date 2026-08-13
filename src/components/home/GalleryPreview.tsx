import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getStylists } from "@/data/stylists";
import type { Locale } from "@/data/types";

export async function GalleryPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");
  const stylists = await getStylists(locale);
  const images = stylists.flatMap((stylist) => stylist.portfolio.slice(0, 2));

  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading level={2} variant="section">
            {t("galleryTitle")}
          </Heading>
          <Text variant="lead">{t("gallerySubtitle")}</Text>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {images.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={src} alt="" fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <ButtonLink href="/galerie" variant="secondary">
            {t("galleryCta")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
