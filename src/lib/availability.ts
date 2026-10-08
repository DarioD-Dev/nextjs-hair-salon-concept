import { OPENING_HOURS } from "@/data/salon";

// schema.org-Tagesnamen, in der Reihenfolge von Date#getDay() (0 = Sonntag).
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function openingOn(date: Date): { opens: string; closes: string } | null {
  const name = WEEKDAYS[date.getDay()];
  const entry = OPENING_HOURS.find((h) => (h.days as readonly string[]).includes(name));
  return entry ? { opens: entry.opens, closes: entry.closes } : null;
}

/**
 * Die nächsten `count` Öffnungstage, ab morgen — ein Termin "heute, in zehn
 * Minuten" wäre bei einem Salon ohne echten Kalender dahinter unehrlich
 * optimistisch. Geschlossene Tage (siehe `OPENING_HOURS`) fallen einfach
 * heraus, es gibt keine Lücken in der angezeigten Liste.
 */
export function naechsteOeffnungstage(count: number, ab: Date = new Date()): Date[] {
  const tage: Date[] = [];
  const tag = new Date(ab);
  tag.setHours(0, 0, 0, 0);
  tag.setDate(tag.getDate() + 1);
  while (tage.length < count) {
    if (openingOn(tag)) tage.push(new Date(tag));
    tag.setDate(tag.getDate() + 1);
  }
  return tage;
}

/**
 * Startzeiten im 30-Minuten-Raster, bei denen die gewählte Leistung noch
 * vor Ladenschluss fertig wird. Keine "schon vergeben"-Lücken — es gibt
 * keinen echten Kalender dahinter, und erfundene Belegung wäre genau die
 * Art Attrappe, die diese Projekte vermeiden. Jeder angezeigte Slot ist
 * also tatsächlich frei wählbar.
 */
export function zeitfenster(datum: Date, dauerMinuten: number, schrittMinuten = 30): string[] {
  const hours = openingOn(datum);
  if (!hours) return [];

  const [openH, openM] = hours.opens.split(":").map(Number);
  const [closeH, closeM] = hours.closes.split(":").map(Number);
  const start = openH * 60 + openM;
  const ende = closeH * 60 + closeM;

  const slots: string[] = [];
  for (let t = start; t + dauerMinuten <= ende; t += schrittMinuten) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}
