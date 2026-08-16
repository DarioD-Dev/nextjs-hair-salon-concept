import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { CONTACT_ADDRESS } from "@/data/salon";

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`;

export async function ContactMap() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={{ Kontakt: messages.Kontakt }}>
      <MapEmbed src={MAPS_EMBED_SRC} className="h-80 sm:h-96" />
    </NextIntlClientProvider>
  );
}
