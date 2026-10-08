"use client";

import { useTranslations, useLocale } from "next-intl";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import type { ResolvedService, ServiceCategory } from "@/data/types";
import { naechsteOeffnungstage, zeitfenster } from "@/lib/availability";
import { formatPrice } from "@/lib/format";
import { submitBookingRequest, type BookingFormState } from "@/lib/actions/booking";
import { sendDemoReminder, type ReminderState } from "@/lib/actions/reminder";
import { cn } from "@/lib/cn";

const CATEGORY_ORDER: ServiceCategory[] = ["damen", "herren", "farbe", "pflege"];
const CATEGORY_LABEL_KEY = {
  damen: "categoryDamen",
  herren: "categoryHerren",
  farbe: "categoryFarbe",
  pflege: "categoryPflege",
} as const satisfies Record<ServiceCategory, string>;

const START: BookingFormState = { status: "idle" };
const REMINDER_START: ReminderState = { status: "idle" };
const TOTAL_STEPS = 5;

// Dieselbe Karten-Optik für alle vier Auswahlschritte — Leistung, Stylist:in,
// Tag, Uhrzeit sind dieselbe Art Entscheidung (eine von mehreren echten
// Optionen), nur der Inhalt wechselt.
const OPTION_BUTTON =
  "rounded-lg border border-border-strong bg-surface-raised px-4 py-3 text-left font-sans text-sm transition active:scale-[0.97] hover:border-accent-copper";

function OptionButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(OPTION_BUTTON, active && "border-accent-copper text-accent-copper")}
    >
      {children}
    </button>
  );
}

const BACK_LINK =
  "font-sans text-sm text-text-secondary underline underline-offset-4 transition hover:text-accent-copper active:scale-95";

export function BookingForm({
  services,
  stylists,
}: {
  services: ResolvedService[];
  stylists: { slug: string; name: string }[];
}) {
  const t = useTranslations("Termin");
  const tLeistungen = useTranslations("Leistungen");
  const locale = useLocale();

  const [serviceId, setServiceId] = useState<string | null>(null);
  const [stylist, setStylist] = useState<string | null>(null);
  const [datum, setDatum] = useState<Date | null>(null);
  const [zeit, setZeit] = useState<string | null>(null);

  const [state, absenden, laeuft] = useActionState(submitBookingRequest, START);
  const bestaetigungRef = useRef<HTMLDivElement>(null);

  // Name/E-Mail werden nur für die Erinnerungs-Demo nach dem Absenden
  // gebraucht — die unkontrollierten Formularfelder sind dann längst aus
  // dem DOM, deshalb hier zusätzlich in State sichern statt nachträglich
  // auszulesen.
  const [kontaktName, setKontaktName] = useState("");
  const [kontaktEmail, setKontaktEmail] = useState("");
  const [reminderState, sendErinnerung, erinnerungLaeuft] = useActionState(
    sendDemoReminder,
    REMINDER_START,
  );

  useEffect(() => {
    if (state.status === "success") bestaetigungRef.current?.focus();
  }, [state.status]);

  const service = services.find((s) => s.id === serviceId) ?? null;
  const tage = useMemo(() => naechsteOeffnungstage(14), []);
  const slots = useMemo(
    () => (datum && service ? zeitfenster(datum, service.duration) : []),
    [datum, service],
  );

  function zurueck(auf: "service" | "stylist" | "datum") {
    if (auf === "service") {
      setServiceId(null);
      setStylist(null);
      setDatum(null);
      setZeit(null);
    } else if (auf === "stylist") {
      setStylist(null);
      setDatum(null);
      setZeit(null);
    } else {
      setDatum(null);
      setZeit(null);
    }
  }

  const dateFormat = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const step = !service ? 1 : stylist === null ? 2 : !datum ? 3 : !zeit ? 4 : 5;
  const stepOf = (
    <p className="font-sans text-xs uppercase tracking-wide text-text-secondary">
      {t("stepOf", { step, total: TOTAL_STEPS })}
    </p>
  );

  if (state.status === "success" && service && datum && zeit) {
    return (
      <div
        ref={bestaetigungRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-border-strong bg-surface-raised p-6 outline-none sm:p-8"
      >
        <h2 className="font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">
          {t("demoTitle")}
        </h2>
        <p className="mt-3 font-sans leading-relaxed text-text-secondary">{t("demoText")}</p>
        <dl className="mt-6 divide-y divide-border-subtle border-t border-border-subtle font-sans text-sm">
          {(
            [
              [t("leistungLabel"), service.name],
              [
                t("stylistLabel"),
                stylists.find((s) => s.slug === stylist)?.name ?? t("stylistAny"),
              ],
              [t("wunschterminLabel"), `${dateFormat.format(datum)}, ${zeit}`],
            ] as const
          ).map(([bezeichnung, wert]) => (
            <div key={bezeichnung} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-text-secondary">{bezeichnung}</dt>
              <dd>{wert}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 border-t border-border-subtle pt-6">
          <h3 className="font-sans font-semibold text-text">{t("reminderTitle")}</h3>
          <p className="mt-1 font-sans text-sm text-text-secondary">{t("reminderIntro")}</p>
          {reminderState.status === "success" ? (
            <p className="mt-3 font-sans text-sm text-accent-copper">{t("reminderSent")}</p>
          ) : (
            <form action={sendErinnerung} className="mt-3">
              <input type="hidden" name="service" value={service.name} />
              <input
                type="hidden"
                name="stylist"
                value={stylists.find((s) => s.slug === stylist)?.name ?? ""}
              />
              <input type="hidden" name="datum" value={dateFormat.format(datum)} />
              <input type="hidden" name="zeit" value={zeit} />
              <input type="hidden" name="name" value={kontaktName} />
              <input type="hidden" name="email" value={kontaktEmail} />
              <Button type="submit" variant="secondary" size="sm" disabled={erinnerungLaeuft}>
                {erinnerungLaeuft ? t("submitting") : t("reminderCta")}
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Schritt 1: Leistung
  if (!service) {
    return (
      <div className="flex flex-col gap-6">
        {stepOf}
        <h2 className="font-sans text-lg font-semibold text-text">{t("questionService")}</h2>
        {CATEGORY_ORDER.map((category) => {
          const items = services.filter((s) => s.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category}>
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-text-secondary">
                {tLeistungen(CATEGORY_LABEL_KEY[category])}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {items.map((item) => (
                  <OptionButton key={item.id} onClick={() => setServiceId(item.id)}>
                    <span className="block font-medium text-text">{item.name}</span>
                    <span className="mt-0.5 block text-text-secondary">
                      {item.priceFrom
                        ? tLeistungen("priceFrom", { price: formatPrice(item.price, locale) })
                        : formatPrice(item.price, locale)}
                      {" · "}
                      {tLeistungen("durationMinutes", { minutes: item.duration })}
                    </span>
                  </OptionButton>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Schritt 2: Stylist:in — "egal" ist eine echte Antwort, nur `null` heißt
  // "noch nicht beantwortet".
  if (stylist === null) {
    return (
      <div className="flex flex-col gap-4">
        {stepOf}
        <h2 className="font-sans text-lg font-semibold text-text">{t("questionStylist")}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <OptionButton onClick={() => setStylist("egal")}>{t("stylistAny")}</OptionButton>
          {stylists.map((s) => (
            <OptionButton key={s.slug} onClick={() => setStylist(s.slug)}>
              {s.name}
            </OptionButton>
          ))}
        </div>
        <button type="button" onClick={() => zurueck("service")} className={BACK_LINK}>
          {t("back")}
        </button>
      </div>
    );
  }

  // Schritt 3: Tag
  if (!datum) {
    return (
      <div className="flex flex-col gap-4">
        {stepOf}
        <h2 className="font-sans text-lg font-semibold text-text">{t("questionDate")}</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tage.map((tag) => (
            <OptionButton key={tag.toISOString()} onClick={() => setDatum(tag)}>
              {dateFormat.format(tag)}
            </OptionButton>
          ))}
        </div>
        <button type="button" onClick={() => zurueck("stylist")} className={BACK_LINK}>
          {t("back")}
        </button>
      </div>
    );
  }

  // Schritt 4: Uhrzeit
  if (!zeit) {
    return (
      <div className="flex flex-col gap-4">
        {stepOf}
        <h2 className="font-sans text-lg font-semibold text-text">{t("questionTime")}</h2>
        {slots.length === 0 ? (
          <p className="font-sans text-sm text-text-secondary">{t("noSlots")}</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {slots.map((slot) => (
              <OptionButton key={slot} onClick={() => setZeit(slot)}>
                {slot}
              </OptionButton>
            ))}
          </div>
        )}
        <button type="button" onClick={() => zurueck("datum")} className={BACK_LINK}>
          {t("back")}
        </button>
      </div>
    );
  }

  // Schritt 5: Kontaktdaten
  const nameInvalid = Boolean(state.fieldErrors?.name);
  const emailInvalid = Boolean(state.fieldErrors?.email);

  return (
    <form
      action={absenden}
      onSubmit={(e) => {
        const daten = new FormData(e.currentTarget);
        setKontaktName(String(daten.get("name") ?? ""));
        setKontaktEmail(String(daten.get("email") ?? ""));
      }}
      className="flex flex-col gap-6"
    >
      {stepOf}
      <div className="rounded-lg border border-border-subtle bg-surface-raised p-4 font-sans text-sm">
        <p className="font-medium text-text">{service.name}</p>
        <p className="mt-1 text-text-secondary">
          {stylists.find((s) => s.slug === stylist)?.name ?? t("stylistAny")}
          {" · "}
          {dateFormat.format(datum)}, {zeit}
        </p>
      </div>
      <input type="hidden" name="service" value={service.name} />
      <input
        type="hidden"
        name="stylist"
        value={stylists.find((s) => s.slug === stylist)?.name ?? ""}
      />
      <input type="hidden" name="datum" value={dateFormat.format(datum)} />
      <input type="hidden" name="zeit" value={zeit} />

      <h2 className="font-sans text-lg font-semibold text-text">{t("detailsTitle")}</h2>
      <div>
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          name="name"
          required
          aria-invalid={nameInvalid}
          aria-describedby={nameInvalid ? "name-error" : undefined}
        />
        {nameInvalid && <FieldError id="name-error">{t("error")}</FieldError>}
      </div>
      <div>
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={emailInvalid}
          aria-describedby={emailInvalid ? "email-error" : undefined}
        />
        {emailInvalid && <FieldError id="email-error">{t("error")}</FieldError>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={laeuft}>
          {laeuft ? t("submitting") : t("submit")}
        </Button>
        <button type="button" onClick={() => setZeit(null)} className={BACK_LINK}>
          {t("back")}
        </button>
      </div>
    </form>
  );
}
