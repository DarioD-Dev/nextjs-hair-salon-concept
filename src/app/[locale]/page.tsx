import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/home/FinalCta";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Intro } from "@/components/home/Intro";
import { TeamPreview } from "@/components/home/TeamPreview";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { Locale } from "@/data/types";

type Props = { params: Promise<{ locale: Locale }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-col">
      <Section size="lg" className="flex min-h-[70vh] items-center">
        <Container className="text-center">
          <Text variant="eyebrow" className="text-accent-copper">
            {t("heroEyebrow")}
          </Text>
          <Heading level={1} variant="display" className="mt-4 italic">
            {t("heroTitle")}
          </Heading>
          <ButtonLink href="/team" className="mt-8">
            {t("heroCta")}
          </ButtonLink>
        </Container>
      </Section>

      <Reveal>
        <Intro />
      </Reveal>

      <Reveal>
        <TeamPreview locale={locale} />
      </Reveal>

      <Reveal>
        <GalleryPreview locale={locale} />
      </Reveal>

      <FinalCta />
    </div>
  );
}
