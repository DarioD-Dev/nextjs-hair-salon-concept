import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/content/PageHeader";
import { StylistProfile } from "@/components/team/StylistProfile";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getStylists } from "@/data/stylists";
import type { Locale } from "@/data/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Team" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Team");
  const stylists = await getStylists(locale);

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Section>
        <Container className="flex flex-col gap-20">
          {stylists.map((stylist, index) => (
            <StylistProfile key={stylist.id} stylist={stylist} reverse={index % 2 === 1} />
          ))}
        </Container>
      </Section>
    </>
  );
}
