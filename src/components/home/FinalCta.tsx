import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextureOverlay } from "@/components/ui/TextureOverlay";

export async function FinalCta() {
  const t = await getTranslations("Home");

  return (
    <Section tone="editorial" size="lg" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,color-mix(in_srgb,var(--accent-copper)_25%,transparent),transparent_70%)]"
      />
      <TextureOverlay />
      <Container className="relative flex flex-col items-center gap-5 text-center">
        <Heading level={2} variant="section" className="text-text-on-editorial">
          {t("ctaTitle")}
        </Heading>
        <Text variant="lead" className="text-text-on-editorial/80">
          {t("ctaBody")}
        </Text>
        <ButtonLink href="/kontakt" className="mt-2">
          {t("ctaButton")}
        </ButtonLink>
      </Container>
    </Section>
  );
}
