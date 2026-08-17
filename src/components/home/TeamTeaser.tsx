import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getStylists } from "@/data/stylists";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/data/types";

export async function TeamTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");
  const stylists = await getStylists(locale);
  const teamPath = getPathname({ locale, href: "/team" });

  return (
    <Section tone="muted">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2>
            <span className="block font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">
              {t("teamTitle")}
            </span>
            <span className="mt-4 block font-display text-display-md font-light text-text">{t("teamBody")}</span>
          </h2>
          <ButtonLink href="/team" variant="secondary" className="mt-8">
            {t("teamCta")}
          </ButtonLink>
        </div>

        {/* Each card links to that person's section on the team page. A visitor
            who has decided "I want Selin" should not have to land on the team
            page and scroll to find her again. Plain <a> rather than the i18n
            Link because the typed href map has no slot for a hash. */}
        <ul className="grid gap-6 sm:grid-cols-3">
          {stylists.map((stylist) => (
            <li key={stylist.id}>
              <a
                href={`${teamPath}#${stylist.slug}`}
                className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-copper"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={stylist.image}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 font-display text-lg font-light text-text transition-colors group-hover:text-accent-copper">
                  {stylist.name}
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.12em] text-accent-copper">{stylist.role}</p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
