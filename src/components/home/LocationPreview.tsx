import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { BookingCta } from "@/components/ui/BookingCta";
import { Container } from "@/components/ui/Container";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Section } from "@/components/ui/Section";
import { CONTACT_ADDRESS, MAPS_DIRECTIONS_URL, SALON } from "@/data/salon";
import { buttonStyles } from "@/components/ui/buttonStyles";

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`;

export async function LocationPreview() {
  const t = await getTranslations("Home");
  const tHours = await getTranslations("Hours");
  const tCommon = await getTranslations("Common");
  const messages = await getMessages();

  const hours = [
    { day: tHours("weekdays"), time: tHours("weekdaysTime") },
    { day: tHours("saturday"), time: tHours("saturdayTime") },
    { day: tHours("sunday"), time: tHours("sundayTime") },
  ];

  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{t("locationTitle")}</h2>
          <p className="mt-4 font-display text-display-md font-light text-text">{SALON.name}</p>
          <address className="mt-3 font-sans text-base not-italic leading-relaxed text-text-secondary">
            {SALON.street}
            <br />
            {SALON.postalCode} {SALON.city}
          </address>

          <h3 className="mt-10 font-sans text-eyebrow uppercase text-accent-copper">{t("locationHoursTitle")}</h3>
          <dl className="mt-4 max-w-sm border-t border-border-subtle">
            {hours.map((entry) => (
              <div key={entry.day} className="flex justify-between border-b border-border-subtle py-3">
                <dt className="font-sans text-sm text-text">{entry.day}</dt>
                <dd className="font-sans text-sm text-text-secondary">{entry.time}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <BookingCta>{tCommon("bookAppointment")}</BookingCta>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonStyles({ variant: "secondary" })}
            >
              {t("locationRoute")}
            </a>
          </div>
        </div>

        {/* Only the Kontakt namespace crosses to the client — MapEmbed is the
            one client component here and that's all it reads. */}
        <NextIntlClientProvider messages={{ Kontakt: messages.Kontakt }}>
          <MapEmbed src={MAPS_EMBED_SRC} className="min-h-72 lg:min-h-full" />
        </NextIntlClientProvider>
      </Container>
    </Section>
  );
}
