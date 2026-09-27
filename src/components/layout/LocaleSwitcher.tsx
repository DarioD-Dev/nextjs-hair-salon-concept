"use client";

import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

/**
 * Ein Knopf mit Globus, die Sprachen erst im Menü darunter.
 *
 * Vorher stand hier ein Umschalter für genau zwei Sprachen: Er zeigte die
 * aktuelle und sprang auf „die andere". Mit einer dritten Sprache gibt es
 * keine andere mehr — `routing.locales.find(l => l !== locale)` hätte
 * willkürlich die erste genommen und die dritte unerreichbar gemacht.
 *
 * Globus statt Flagge, und das ist keine Geschmacksfrage: Windows liefert
 * keine Flaggen-Emoji aus und zeigt stattdessen das Buchstabenpaar des
 * Ländercodes. Und Flaggen stehen für Länder, nicht für Sprachen — für einen
 * Wiener Salon wäre 🇩🇪 falsch und 🇦🇹 würde deutsche Gäste ausschließen.
 *
 * Die Namen im Menü stehen in ihrer eigenen Sprache und tragen ihr eigenes
 * `lang`-Attribut: Ohne das liest ein Screenreader „Hrvatski" mit deutscher
 * Stimme vor. Sie stehen im Code und nicht in `messages/`, weil ein Endonym
 * in jeder Oberflächensprache gleich lautet.
 */
const LANGUAGE_NAMES: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  hr: "Hrvatski",
};

export function LocaleSwitcher({ className }: { className?: string }) {
  // Kein Cast mehr nötig: Seit die AppConfig in src/global.d.ts steht,
  // liefert useLocale() bereits die Union statt eines nackten string.
  const locale = useLocale();
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Schließen bei Klick nach außen und bei Escape. Escape gibt den Fokus an
  // den Knopf zurück — sonst fällt er auf <body>, und der nächste Tabulator
  // beginnt wieder ganz oben auf der Seite.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function select(next: Locale) {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  }

  return (
    <div ref={boxRef} className={cn("relative", className)}>
      <IconButton
        ref={buttonRef}
        label={`${t("language")}: ${LANGUAGE_NAMES[locale]}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={open ? "text-accent-copper" : undefined}
      >
        <Globe size={22} />
      </IconButton>

      {open && (
        // Erhebung wird in diesem Design mit Haarlinien gezeichnet, nicht mit
        // Schatten oder einer helleren Fläche — siehe die Begründung zu
        // --surface-raised in tokens.css. Deshalb Rahmen statt shadow.
        <ul className="absolute right-0 z-50 mt-2 min-w-max overflow-hidden rounded-md border border-border-subtle bg-surface-raised py-1">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                lang={l}
                onClick={() => select(l)}
                aria-current={l === locale ? "true" : undefined}
                className={cn(
                  "block w-full whitespace-nowrap px-4 py-2 text-left font-sans text-sm tracking-wide transition-colors",
                  l === locale ? "text-accent-copper" : "text-text-secondary hover:text-text",
                )}
              >
                {LANGUAGE_NAMES[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
