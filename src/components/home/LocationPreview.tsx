import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Section } from "@/components/ui/Section";
import { MAPS_DIRECTIONS_URL, MAPS_EMBED_SRC, SALON } from "@/data/salon";
import { buttonStyles } from "@/components/ui/buttonStyles";

export async function LocationPreview() {
  const t = await getTranslations("Home");
  const tHours = await getTranslations("Hours");

  const hours = [
    { day: tHours("weekdays"), time: tHours("weekdaysTime") },
    { day: tHours("saturday"), time: tHours("saturdayTime") },
    { day: tHours("sunday"), time: tHours("sundayTime") },
  ];

  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          {/* One line, not eyebrow + display. The display line used to repeat
              the salon name — the third time on this page and directly under
              the header wordmark — so it went; the section label took over its
              size and its copper. */}
          <h2 className="font-display text-display-md font-light text-accent-copper">{t("locationTitle")}</h2>
          <address className="mt-3 font-sans text-base not-italic leading-relaxed text-text-secondary">
            {SALON.street}
            <br />
            {SALON.postalCode} {SALON.city}
          </address>
          {/* "How do I get there and where do I park" is the question that
              decides whether a local visitor comes at all — it used to be
              answered nowhere on the site. */}
          <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-text-secondary">{t("locationArrival")}</p>

          <h3 className="mt-10 font-sans text-eyebrow uppercase text-accent-copper">{t("locationHoursTitle")}</h3>
          <dl className="mt-4 max-w-sm border-t border-border-subtle">
            {hours.map((entry) => (
              <div key={entry.day} className="flex justify-between border-b border-border-subtle py-3">
                <dt className="font-sans text-sm text-text">{entry.day}</dt>
                <dd className="font-sans text-sm text-text-secondary">{entry.time}</dd>
              </div>
            ))}
          </dl>

          {/* Only "plan a route" here. "Book an appointment" already sits in
              the sticky header a few pixels above, in the hero, and in the
              closing section — a fourth identical gold pill on one page made
              all of them count for less, and getting here is the question
              this section is actually about. */}
          <div className="mt-8">
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

        <MapEmbed src={MAPS_EMBED_SRC} className="min-h-72 lg:min-h-full" />
      </Container>
    </Section>
  );
}
