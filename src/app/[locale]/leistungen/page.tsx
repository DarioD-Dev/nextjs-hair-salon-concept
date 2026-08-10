import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/content/PageHeader";
import { ServiceCategory } from "@/components/services/ServiceCategory";
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
  const categories = await Promise.all(
    SERVICE_CATEGORIES.map((category) => getServicesByCategory(locale, category)),
  );

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Section>
        <Container className="mx-auto grid max-w-3xl gap-16 sm:grid-cols-2 sm:gap-x-12">
          {SERVICE_CATEGORIES.map((category, index) => (
            <ServiceCategory
              key={category}
              title={t(CATEGORY_LABEL_KEY[category])}
              services={categories[index]}
              locale={locale}
              durationLabel={(minutes) => t("durationMinutes", { minutes })}
            />
          ))}
        </Container>
      </Section>
    </>
  );
}
