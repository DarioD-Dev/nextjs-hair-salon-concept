import { getTranslations } from "next-intl/server";
import { Rule } from "@/components/ui/Rule";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from "@/data/salon";

export async function ContactDetails() {
  const t = await getTranslations("Kontakt");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("addressLabel")}</p>
        <p className="font-display text-lg text-text">Salon Kupferglanz</p>
        <p className="font-sans text-text-secondary">{CONTACT_ADDRESS}</p>
      </div>
      <Rule className="w-12 opacity-50" />
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("phoneLabel")}</p>
        <a
          href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
          className="font-sans text-text-secondary transition-colors hover:text-accent-copper"
        >
          {CONTACT_PHONE}
        </a>
      </div>
      <Rule className="w-12 opacity-50" />
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("emailLabel")}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-sans text-text-secondary transition-colors hover:text-accent-copper"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
      <Rule className="w-12 opacity-50" />
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("hoursLabel")}</p>
        <p className="font-sans text-text-secondary">{t("hoursWeekday")}</p>
        <p className="font-sans text-text-secondary">{t("hoursSaturday")}</p>
        <p className="font-sans text-text-secondary">{t("hoursClosed")}</p>
      </div>
    </div>
  );
}
