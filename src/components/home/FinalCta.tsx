import { getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/ui/BookingCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function FinalCta() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");

  return (
    <Section tone="muted" size="lg" className="border-t border-border-subtle">
      <Container className="flex flex-col items-start gap-8">
        <h2 className="max-w-3xl font-display text-display-lg font-light text-text">{t("finalCtaTitle")}</h2>
        <BookingCta size="lg">{tCommon("bookAppointment")}</BookingCta>
      </Container>
    </Section>
  );
}
