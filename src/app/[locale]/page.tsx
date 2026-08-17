import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { LocationPreview } from "@/components/home/LocationPreview";
import { QuickInfo } from "@/components/home/QuickInfo";
import { SalonDna } from "@/components/home/SalonDna";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TeamTeaser } from "@/components/home/TeamTeaser";
import { WorkPreview } from "@/components/home/WorkPreview";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import type { Locale } from "@/data/types";
import { absoluteUrl, buildAlternates, buildOpenGraph } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: buildAlternates("/", locale),
    openGraph: buildOpenGraph({
      title: t("homeTitle"),
      description: t("homeDescription"),
      siteName: tMeta("title"),
      locale,
      href: "/",
    }),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Absolute URL: a relative @id/url in LocalBusiness structured data
          cannot be resolved to a business by a crawler. */}
      <LocalBusinessJsonLd url={absoluteUrl("/", locale)} />
      <Hero />
      <QuickInfo />
      <SalonDna />
      <ServicesOverview />
      <WorkPreview locale={locale} />
      <TeamTeaser locale={locale} />
      <LocationPreview />
      <FinalCta />
    </>
  );
}
