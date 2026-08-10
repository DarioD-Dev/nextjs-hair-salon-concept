import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/content/PageHeader";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getStylists } from "@/data/stylists";
import type { Locale } from "@/data/types";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ stylist?: string }>;
};

export async function generateMetadata({ params }: { params: Props["params"] }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Galerie" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function GaleriePage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Galerie");
  const sp = await searchParams;
  const stylists = await getStylists(locale);

  const images = stylists.flatMap((stylist) =>
    stylist.portfolio.map((src) => ({ src, stylistSlug: stylist.slug, stylistName: stylist.name })),
  );
  const activeSlug = stylists.some((stylist) => stylist.slug === sp.stylist) ? sp.stylist : undefined;
  const filtered = activeSlug ? images.filter((image) => image.stylistSlug === activeSlug) : images;

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Section>
        <Container className="flex flex-col gap-10">
          <GalleryFilters stylists={stylists} active={activeSlug} allLabel={t("filterAll")} />
          <GalleryGrid images={filtered} />
        </Container>
      </Section>
    </>
  );
}
