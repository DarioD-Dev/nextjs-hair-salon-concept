import type { Localized } from "./types";

// The objections that stop a first-time salon visitor from booking. Every
// answer is a policy statement about this (fictional) salon — no invented
// reviews, ratings or testimonials, per the concept-project rules.
export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

export const FAQ: FaqItem[] = [
  {
    id: "appointment",
    question: {
      de: "Brauche ich einen Termin?",
      en: "Do I need an appointment?",
    },
    answer: {
      de: "Ja, wir arbeiten nach Termin — so bekommst du die volle Zeit deiner Stylistin oder deines Stylisten. Spontan geht nur, wenn kurzfristig etwas frei wird: einfach anrufen und nachfragen.",
      en: "Yes, we work by appointment so you get your stylist's full attention. Walk-ins only work if something opens up at short notice — give us a call and ask.",
    },
  },
  {
    id: "price-range",
    question: {
      de: "Warum stehen bei Farbe „ab“-Preise?",
      en: "Why are colour prices listed as “from”?",
    },
    answer: {
      de: "Farbe hängt an Haarlänge, Haardichte und Ausgangsfarbe — bei langem, dichtem Haar wird schlicht mehr Produkt und mehr Zeit gebraucht. Den genauen Preis sagen wir dir vor dem Start, nicht erst an der Kassa.",
      en: "Colour depends on length, density and where your hair is starting from — long, thick hair simply needs more product and more time. You get the exact price before we start, not at the till.",
    },
  },
  {
    id: "first-visit",
    question: {
      de: "Was passiert beim ersten Termin?",
      en: "What happens at a first appointment?",
    },
    answer: {
      de: "Wir beginnen mit einer Beratung — Haarstruktur, Alltag, Pflegeaufwand, was du dir vorstellst. Bring gern Fotos mit, das hilft mehr als jede Beschreibung. Die Beratung ist kostenlos und unverbindlich.",
      en: "We start with a consultation — hair structure, your routine, how much upkeep you want, what you have in mind. Bring photos if you have them; they help more than any description. The consultation is free and without obligation.",
    },
  },
  {
    id: "duration",
    question: {
      de: "Wie viel Zeit soll ich einplanen?",
      en: "How much time should I plan for?",
    },
    answer: {
      de: "Ein Schnitt dauert 30 bis 75 Minuten, Farbe je nach Technik 45 bis 150 Minuten. Die Dauer steht bei jeder Leistung in der Preisliste — plane bei Balayage lieber einen halben Vormittag ein.",
      en: "A cut takes 30 to 75 minutes; colour runs 45 to 150 minutes depending on technique. Every service lists its duration in the price list — for balayage, plan for half a morning.",
    },
  },
  {
    id: "cancellation",
    question: {
      de: "Wie sage ich einen Termin ab?",
      en: "How do I cancel an appointment?",
    },
    answer: {
      de: "Ruf uns bitte bis 24 Stunden vorher an. Kurzfristige Absagen blockieren einen Platz, den jemand anderes gebraucht hätte — deshalb bitten wir um die kurze Info.",
      en: "Please call us at least 24 hours ahead. A late cancellation blocks a slot somebody else needed, so a quick heads-up makes a real difference.",
    },
  },
  {
    id: "payment",
    question: {
      de: "Womit kann ich bezahlen?",
      en: "How can I pay?",
    },
    answer: {
      de: "Bar sowie mit Bankomat- und Kreditkarte. Trinkgeld ist möglich, aber nie erwartet.",
      en: "Cash, debit and credit card. Tips are welcome but never expected.",
    },
  },
];

export function getFaq(locale: keyof Localized) {
  return FAQ.map((item) => ({
    id: item.id,
    question: item.question[locale],
    answer: item.answer[locale],
  }));
}
