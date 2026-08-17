import { getTranslations } from "next-intl/server";
import { CONTACT_ADDRESS, EMAIL_HREF, PHONE_HREF, SALON } from "@/data/salon";

// A definition list, not a stack of unlabelled paragraphs: "Telefon" is the
// term and the number is its definition, which is exactly what a screen
// reader then announces as a pair.
export async function ContactDetails() {
  const t = await getTranslations("Kontakt");
  const tHours = await getTranslations("Hours");

  return (
    <div>
      <h2 className="font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">{t("detailsTitle")}</h2>

      <dl className="mt-6 border-t border-border-subtle font-sans">
        <div className="border-b border-border-subtle py-4">
          <dt className="text-xs uppercase tracking-wide text-text-secondary">{t("addressLabel")}</dt>
          <dd className="mt-1 text-text">
            <span className="font-display text-lg">{SALON.name}</span>
            <br />
            {CONTACT_ADDRESS}
          </dd>
        </div>

        <div className="border-b border-border-subtle py-4">
          <dt className="text-xs uppercase tracking-wide text-text-secondary">{t("phoneLabel")}</dt>
          <dd className="mt-1">
            <a
              href={PHONE_HREF}
              className="inline-block py-1 text-text transition-colors hover:text-accent-copper"
            >
              {SALON.phone}
            </a>
          </dd>
        </div>

        <div className="border-b border-border-subtle py-4">
          <dt className="text-xs uppercase tracking-wide text-text-secondary">{t("emailLabel")}</dt>
          <dd className="mt-1">
            <a href={EMAIL_HREF} className="inline-block py-1 text-text transition-colors hover:text-accent-copper">
              {SALON.email}
            </a>
          </dd>
        </div>

        {/* Hours read from the Hours namespace, the same source the homepage
            uses — they were previously written out a second time in the
            Kontakt namespace and could drift apart. */}
        <div className="border-b border-border-subtle py-4">
          <dt className="text-xs uppercase tracking-wide text-text-secondary">{t("hoursLabel")}</dt>
          <dd className="mt-1 text-text">
            <span className="flex justify-between gap-6">
              <span>{tHours("weekdays")}</span>
              <span className="text-text-secondary">{tHours("weekdaysTime")}</span>
            </span>
            <span className="mt-1 flex justify-between gap-6">
              <span>{tHours("saturday")}</span>
              <span className="text-text-secondary">{tHours("saturdayTime")}</span>
            </span>
            <span className="mt-1 flex justify-between gap-6">
              <span>{tHours("sunday")}</span>
              <span className="text-text-secondary">{tHours("sundayTime")}</span>
            </span>
          </dd>
        </div>

        <div className="border-b border-border-subtle py-4">
          <dt className="text-xs uppercase tracking-wide text-text-secondary">{t("arrivalLabel")}</dt>
          <dd className="mt-1 max-w-sm leading-relaxed text-text-secondary">{t("arrivalBody")}</dd>
        </div>
      </dl>
    </div>
  );
}
