import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactDetails } from "@/components/content/ContactDetails";
import { ContactForm } from "@/components/content/ContactForm";
import { ContactMap } from "@/components/content/ContactMap";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/data/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Kontakt" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Kontakt");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Section>
        <Container className="flex flex-col gap-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ContactDetails />
            <ContactForm />
          </div>
          <ContactMap />
        </Container>
      </Section>
    </>
  );
}
