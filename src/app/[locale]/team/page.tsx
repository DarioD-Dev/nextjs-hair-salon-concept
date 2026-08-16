import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/content/PageHeader";
import { StylistProfile } from "@/components/team/StylistProfile";
import { BookingCta } from "@/components/ui/BookingCta";
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
  const tCommon = await getTranslations("Common");
  const stylists = await getStylists(locale);

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Section>
        <Container className="flex flex-col gap-24 lg:gap-32">
          {stylists.map((stylist, index) => (
            <StylistProfile
              key={stylist.id}
              stylist={stylist}
              index={index}
              // The first portrait sits above the fold on this page, so it is
              // the LCP candidate and must not be lazy-loaded.
              priority={index === 0}
            />
          ))}
        </Container>
        <Container className="mt-24">
          <BookingCta>{tCommon("bookAppointment")}</BookingCta>
        </Container>
      </Section>
    </>
  );
}
