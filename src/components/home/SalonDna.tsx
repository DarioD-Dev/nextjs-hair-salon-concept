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
        {/* Aligned to one baseline. The columns used to cascade downwards by
            3rem each, which left a large empty wedge under the first column
            and above the third and read as a broken layout rather than as an
            editorial one. The numerals and the hairline rules carry the
            editorial character on their own. */}
        <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
          {ITEMS.map((n) => (
            <li key={n} className="border-t border-border-subtle pt-6">
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
