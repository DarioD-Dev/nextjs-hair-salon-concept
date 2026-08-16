import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getStylists } from "@/data/stylists";
import type { Locale } from "@/data/types";

export async function TeamTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");
  const stylists = await getStylists(locale);

  return (
    <Section tone="muted">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{t("teamTitle")}</h2>
          <p className="mt-4 font-display text-display-md font-light text-text">{t("teamBody")}</p>
          <ButtonLink href="/team" variant="secondary" className="mt-8">
            {t("teamCta")}
          </ButtonLink>
        </div>

        <ul className="grid gap-6 sm:grid-cols-3">
          {stylists.map((stylist) => (
            <li key={stylist.id}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={stylist.image}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width: 640px) 20vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 font-display text-lg font-light text-text">{stylist.name}</p>
              <p className="font-sans text-xs uppercase tracking-[0.12em] text-accent-copper">{stylist.role}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
