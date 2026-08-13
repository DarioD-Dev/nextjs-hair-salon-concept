import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { CONTACT_ADDRESS } from "@/data/salon";

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`;

export async function LocationPreview() {
  const t = await getTranslations("Home");
  const tKontakt = await getTranslations("Kontakt");

  return (
    <Section tone="muted">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <Heading level={2} variant="section">
            {t("locationTitle")}
          </Heading>
          <Text variant="lead">{CONTACT_ADDRESS}</Text>
        </div>
        <div className="overflow-hidden rounded-lg border border-border-subtle">
          <iframe
            title={tKontakt("mapTitle")}
            src={MAPS_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full sm:h-96"
          />
        </div>
        <div className="flex justify-center">
          <ButtonLink href="/kontakt" variant="secondary">
            {t("locationCta")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
