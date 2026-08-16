import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/content/PageHeader";
import { ServiceCategory } from "@/components/services/ServiceCategory";
import { BookingCta } from "@/components/ui/BookingCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getServicesByCategory, SERVICE_CATEGORIES } from "@/data/services";
import type { Locale, ServiceCategory as ServiceCategoryType } from "@/data/types";

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
  return { title: t("title"), description: t("subtitle") };
}

export default async function LeistungenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Leistungen");
  const tCommon = await getTranslations("Common");
  const categories = await Promise.all(
    SERVICE_CATEGORIES.map((category) => getServicesByCategory(locale, category)),
  );

  return (
    <>
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
    </>
  );
}
