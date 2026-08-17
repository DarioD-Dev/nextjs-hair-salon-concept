import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactDetails } from "@/components/content/ContactDetails";
import { ContactForm } from "@/components/content/ContactForm";
import { ContactMap } from "@/components/content/ContactMap";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/data/types";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Kontakt" });
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/kontakt", locale),
    openGraph: buildOpenGraph({
      title: t("title"),
      description: t("metaDescription"),
      siteName: tMeta("title"),
      locale,
      href: "/kontakt",
    }),
  };
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
            <div>
              <h2 className="font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">
                {t("formTitle")}
              </h2>
              {/* Says plainly that the form is not a booking channel — a
                  visitor who expects a confirmed slot and gets a callback
                  instead is a disappointed visitor. */}
              <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-text-secondary">
                {t("formIntro")}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
          <ContactMap />
        </Container>
      </Section>
    </>
  );
}
