import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

// Eine 404-Seite in der Sprache und im Aussehen des Salons statt der weißen
// englischen Standardseite von Next, die hier bis 14.09.2026 zu sehen war.
//
// Liegt innerhalb von [locale], erbt also Kopf, Fuß und Übersetzungen. Der
// Weg zurück ist der eigentliche Zweck der Seite — ohne ihn ist sie eine
// Sackgasse in Markenfarbe.
export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Section>
      <Container className="flex min-h-[45vh] flex-col items-start justify-center gap-6">
        <div>
          <p className="font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">
            404
          </p>
          <Heading level={1} variant="section" className="mt-4">
            {t("title")}
          </Heading>
          <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-text-secondary">
            {t("body")}
          </p>
        </div>
        <ButtonLink href="/" size="lg">
          {t("home")}
        </ButtonLink>
      </Container>
    </Section>
  );
}
