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
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/data/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("homeTitle"), description: t("homeDescription") };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LocalBusinessJsonLd url={getPathname({ locale, href: "/" })} />
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
