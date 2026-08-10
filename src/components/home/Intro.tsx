import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export async function Intro() {
  const t = await getTranslations("Home");

  return (
    <Section>
      <Container className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <Heading level={2} variant="section">
          {t("introTitle")}
        </Heading>
        <Text variant="lead">{t("introBody")}</Text>
      </Container>
    </Section>
  );
}
