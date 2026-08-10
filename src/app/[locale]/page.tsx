import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="flex flex-1 flex-col">
      <Section size="lg" className="flex flex-1 items-center">
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
    </main>
  );
}
