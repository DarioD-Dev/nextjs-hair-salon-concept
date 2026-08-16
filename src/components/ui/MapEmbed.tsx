"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// Click-to-load facade. A Google Maps iframe pulls in a large third-party
// bundle and several extra connections on first paint; here nothing loads
// until the visitor asks for it. It doubles as a privacy notice, since the
// embed transfers data to Google.
export function MapEmbed({ src, className }: { src: string; className?: string }) {
  const t = useTranslations("Kontakt");
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden border border-border-subtle", className)}>
      {loaded ? (
        <iframe
          title={t("mapTitle")}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-raised p-8 text-center">
          <MapPin className="text-accent-copper" size={28} strokeWidth={1.5} aria-hidden />
          <p className="max-w-xs font-sans text-sm text-text-secondary">{t("mapNotice")}</p>
          <Button type="button" variant="secondary" onClick={() => setLoaded(true)}>
            {t("mapLoad")}
          </Button>
        </div>
      )}
    </div>
  );
}
