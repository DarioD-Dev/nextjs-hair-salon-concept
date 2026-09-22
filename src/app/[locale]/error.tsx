"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

/**
 * Was `not-found.tsx` für falsche Adressen ist, ist diese Seite für Fehler
 * beim Rendern — in der Sprache und im Aussehen des Salons statt der weißen
 * englischen Standardseite von Next.
 *
 * Liegt innerhalb von [locale] und erbt damit Kopf, Fuß und Übersetzungen.
 * Zwei Wege hinaus: `reset()` für den vorübergehenden Fehler, der Link zur
 * Startseite für den, der bleibt.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container className="flex min-h-[45vh] flex-col items-start justify-center gap-6">
        <div>
          <p className="font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">
            Fehler
          </p>
          <Heading level={1} variant="section" className="mt-4">
            {t("title")}
          </Heading>
          <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-text-secondary">
            {t("body")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" size="lg" onClick={reset}>
            {t("retry")}
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            {t("home")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
