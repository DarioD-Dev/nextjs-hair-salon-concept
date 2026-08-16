import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const SERVICES = ["Cut", "Color", "Care"] as const;

export async function ServicesOverview() {
  const t = await getTranslations("Home");

  return (
    <Section tone="muted">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{t("servicesTitle")}</h2>
          <ButtonLink href="/leistungen" variant="link" className="font-sans text-sm uppercase tracking-wide">
            {t("servicesCta")}
          </ButtonLink>
        </div>

        {/* A rule-separated list, not cards: the service name carries the
            weight and the divider does the structural work. */}
        <ul className="mt-10 border-t border-border-subtle">
          {SERVICES.map((key) => (
            <li
              key={key}
              className="flex flex-col gap-2 border-b border-border-subtle py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <h3 className="font-display text-display-md font-light text-text">{t(`service${key}Title`)}</h3>
              <p className="font-sans text-sm uppercase tracking-[0.12em] text-text-secondary">
                {t(`service${key}Body`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
