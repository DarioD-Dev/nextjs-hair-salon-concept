import { getTranslations } from "next-intl/server";
import { CONTACT_ADDRESS } from "@/data/salon";

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`;

export async function ContactMap() {
  const t = await getTranslations("Kontakt");

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle">
      <iframe
        title={t("mapTitle")}
        src={MAPS_EMBED_SRC}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full sm:h-96"
      />
    </div>
  );
}
