import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Faq } from "@/components/content/Faq";
import { PageHeader } from "@/components/content/PageHeader";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ServiceCategory } from "@/components/services/ServiceCategory";
import { BookingCta } from "@/components/ui/BookingCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getFaq } from "@/data/faq";
import { getServicesByCategory, SERVICE_CATEGORIES } from "@/data/services";
import type { Locale, ServiceCategory as ServiceCategoryType } from "@/data/types";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

const CATEGORY_LABEL_KEY: Record<ServiceCategoryType, string> = {
  damen: "categoryDamen",
  herren: "categoryHerren",
  farbe: "categoryFarbe",
  pflege: "categoryPflege",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Leistungen" });
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/leistungen", locale),
    openGraph: buildOpenGraph({
      title: t("title"),
      description: t("metaDescription"),
      siteName: tMeta("title"),
      locale,
      href: "/leistungen",
    }),
  };
}

export default async function LeistungenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Leistungen");
  const tCommon = await getTranslations("Common");
  const categories = await Promise.all(
    SERVICE_CATEGORIES.map((category) => getServicesByCategory(locale, category)),
  );
  const faq = getFaq(locale);

  return (
    <>
      <FaqJsonLd items={faq} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Section>
        <Container className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {SERVICE_CATEGORIES.map((category, index) => (
            <ServiceCategory
              key={category}
              title={t(CATEGORY_LABEL_KEY[category])}
              services={categories[index]}
              locale={locale}
              durationLabel={(minutes) => t("durationMinutes", { minutes })}
              priceFromLabel={(price) => t("priceFrom", { price })}
            />
          ))}
        </Container>

        <Container className="mt-14 flex flex-col items-start gap-8">
          <p className="max-w-xl font-sans text-sm leading-relaxed text-text-secondary">{t("disclaimer")}</p>
          <BookingCta>{tCommon("bookAppointment")}</BookingCta>
        </Container>
      </Section>

      {/* The FAQ sits directly under the price list because that is where the
          doubts appear: why "from" prices, how long it takes, what the first
          visit involves. Answering them here is worth more than a separate
          page nobody navigates to. */}
      <Faq title={t("faqTitle")} items={faq} />
    </>
  );
}
