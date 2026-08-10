import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export async function FinalCta() {
  const t = await getTranslations("Home");

  return (
    <Section tone="editorial" size="lg">
      <Container className="flex flex-col items-center gap-5 text-center">
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
