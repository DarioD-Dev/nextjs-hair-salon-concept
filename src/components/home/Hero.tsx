import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/ui/BookingCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SALON } from "@/data/salon";

const HERO_IMAGE = "https://images.unsplash.com/photo-1781450090585-1a511b7066d9?w=1920&q=75&auto=format&fit=crop";

export async function Hero() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-surface">
      {/* priority + fetchPriority: this is the LCP element, so it must not be
          lazy-loaded or discovered late. sizes="100vw" lets next/image emit a
          srcset the browser can pick from instead of always fetching 1920px. */}
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-10 object-cover opacity-45"
      />
      {/* Vertical gradient rather than a flat scrim: keeps the top of the photo
          readable while anchoring the headline in solid dark at the bottom. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-surface/70 via-surface/40 to-surface"
      />

      <Container className="w-full pb-16 pt-32 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            {/* The trade-and-city line belongs inside the h1, not in a
                separate <p> above it: "Friseur in Wien" is the phrase people
                actually search for, and the brand name alone says nothing
                about what this business does. */}
            <h1 className="font-display text-display-xl font-light text-text">
              <span className="block font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">
                {t("heroEyebrow")}
              </span>
              <span className="mt-6 block">Salon</span>
              <span className="block text-accent-copper">Kupferglanz</span>
            </h1>
            <p className="mt-8 max-w-md font-sans text-lg leading-relaxed text-text-secondary">
              {t("heroTagline")}
            </p>
            {/* Two CTAs, not one: "what does it cost" is the question that
                stops a first-time visitor from booking, so the price list is
                a peer of the booking button rather than a footnote. */}
            <div className="mt-10 flex flex-wrap gap-3">
              <BookingCta size="lg">{tCommon("bookAppointment")}</BookingCta>
              <ButtonLink href="/leistungen" variant="secondary" size="lg">
                {t("heroSecondaryCta")}
              </ButtonLink>
            </div>
          </div>

          {/* Editorial meta column — a magazine-cover cue, hidden on small
              screens where it would just crowd the headline. */}
          <p
            className="hidden font-sans text-eyebrow uppercase tracking-[0.22em] text-text-secondary lg:block lg:[writing-mode:vertical-rl]"
            aria-hidden
          >
            {SALON.city} · {SALON.postalCode}
          </p>
        </div>
      </Container>
    </section>
  );
}
