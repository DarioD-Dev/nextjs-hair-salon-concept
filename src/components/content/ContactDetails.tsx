import { getTranslations } from "next-intl/server";
import { Rule } from "@/components/ui/Rule";
import { CONTACT_ADDRESS, SALON } from "@/data/salon";

export async function ContactDetails() {
  const t = await getTranslations("Kontakt");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("addressLabel")}</p>
        <p className="font-display text-lg text-text">{SALON.name}</p>
        <p className="font-sans text-text-secondary">{CONTACT_ADDRESS}</p>
      </div>
      <Rule className="w-12 opacity-50" />
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("phoneLabel")}</p>
        <a
          href={`tel:${SALON.phone.replace(/\s/g, "")}`}
          className="font-sans text-text-secondary transition-colors hover:text-accent-copper"
        >
          {SALON.phone}
        </a>
      </div>
      <Rule className="w-12 opacity-50" />
      <div>
        <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">{t("emailLabel")}</p>
        <a
          href={`mailto:${SALON.email}`}
          className="font-sans text-text-secondary transition-colors hover:text-accent-copper"
        >
          {SALON.email}
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
