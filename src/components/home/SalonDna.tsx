import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const ITEMS = ["1", "2", "3"] as const;

export async function SalonDna() {
  const t = await getTranslations("Home");

  return (
    <Section>
      <Container>
        <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{t("dnaTitle")}</h2>
        {/* Staggered rather than a flat row of equal cards — each item drops a
            little further down the grid, which is what keeps this reading as
            an editorial spread instead of a feature-card strip. */}
        <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {ITEMS.map((n, index) => (
            <li
              key={n}
              className="border-t border-border-subtle pt-6 md:pt-[calc(1.5rem+var(--dna-offset))]"
              style={{ "--dna-offset": `${index * 3}rem` } as React.CSSProperties}
            >
              <span className="font-display text-sm text-accent-copper">0{n}</span>
              <h3 className="mt-4 font-display text-2xl font-light text-text">{t(`dna${n}Title`)}</h3>
              <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-text-secondary">
                {t(`dna${n}Body`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
