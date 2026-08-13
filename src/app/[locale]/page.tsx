import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocationPreview } from "@/components/home/LocationPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/data/types";

const HERO_IMAGE = "https://images.unsplash.com/photo-1781450090585-1a511b7066d9?w=1920&q=80&auto=format&fit=crop";

type Props = { params: Promise<{ locale: Locale }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-col">
      <Section size="lg" className="relative flex min-h-[70vh] items-center overflow-hidden bg-surface-editorial">
        <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-surface-editorial/60" />
        <Container className="relative flex flex-col items-center gap-8 text-center">
          <Heading level={1} variant="display" className="text-text-on-editorial">
            Salon Kupferglanz
          </Heading>
          <ButtonLink href="/kontakt">{t("heroCta")}</ButtonLink>
        </Container>
      </Section>

      <ServicesOverview />

      <LocationPreview />
    </div>
  );
}
