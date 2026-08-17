import { MapEmbed } from "@/components/ui/MapEmbed";
import { MAPS_EMBED_SRC } from "@/data/salon";

export function ContactMap() {
  return <MapEmbed src={MAPS_EMBED_SRC} className="h-80 sm:h-96" />;
}
