import { Palette, Scissors, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

const SERVICES = [
  { key: "Cut", Icon: Scissors },
  { key: "Color", Icon: Palette },
  { key: "Care", Icon: Sparkles },
] as const;

export async function ServicesOverview() {
  const t = await getTranslations("Home");

  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <Heading level={2} variant="section" className="text-center">
          {t("servicesTitle")}
        </Heading>
        <div className="grid gap-6 sm:grid-cols-3">
          {SERVICES.map(({ key, Icon }) => (
            <div key={key} className="flex flex-col items-center gap-3 rounded-lg border border-border-subtle p-8 text-center">
              <Icon className="text-accent-copper" size={28} strokeWidth={1.5} aria-hidden />
              <Heading level={3} variant="card">
                {t(`service${key}Title`)}
              </Heading>
              <Text variant="small">{t(`service${key}Body`)}</Text>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <ButtonLink href="/leistungen" variant="secondary">
            {t("servicesCta")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
