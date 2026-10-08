import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { BookingForm } from "@/components/booking/BookingForm";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllServices } from "@/data/services";
import { getStylists } from "@/data/stylists";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/termin">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Termin" });
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/termin", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      siteName: tMeta("title"),
      locale,
      href: "/termin",
    }),
  };
}

export default async function TerminPage({ params }: PageProps<"/[locale]/termin">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Termin");
  const [services, stylistsFull] = await Promise.all([getAllServices(locale), getStylists(locale)]);
  // Nur slug/name gehen an die Client-Komponente — Bio, Spezialitäten und
  // Portfolio-Bilder braucht die Stylist-Auswahl nicht.
  const stylists = stylistsFull.map(({ slug, name }) => ({ slug, name }));

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("intro")} />
      <Section>
        <Container className="max-w-2xl">
          <BookingForm services={services} stylists={stylists} />
        </Container>
      </Section>
    </>
  );
}
