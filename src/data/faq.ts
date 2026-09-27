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
      hr: "Trebam li termin?",
    },
    answer: {
      de: "Ja, wir arbeiten nach Termin — so bekommst du die volle Zeit deiner Stylistin oder deines Stylisten. Spontan geht nur, wenn kurzfristig etwas frei wird: einfach anrufen und nachfragen.",
      en: "Yes, we work by appointment so you get your stylist's full attention. Walk-ins only work if something opens up at short notice — give us a call and ask.",
      hr: "Da, radimo po terminima — tako vam stilist posveti cijelo vrijeme termina. Bez najave ide samo ako se nešto oslobodi u zadnji čas: nazovite i pitajte.",
    },
  },
  {
    id: "price-range",
    question: {
      de: "Warum stehen bei Farbe „ab“-Preise?",
      en: "Why are colour prices listed as “from”?",
      hr: "Zašto su kod boje cijene „od“?",
    },
    answer: {
      de: "Farbe hängt an Haarlänge, Haardichte und Ausgangsfarbe — bei langem, dichtem Haar wird schlicht mehr Produkt und mehr Zeit gebraucht. Den genauen Preis sagen wir dir vor dem Start, nicht erst an der Kassa.",
      en: "Colour depends on length, density and where your hair is starting from — long, thick hair simply needs more product and more time. You get the exact price before we start, not at the till.",
      hr: "Boja ovisi o duljini kose, gustoći i polaznoj boji — duga i gusta kosa jednostavno traži više proizvoda i više vremena. Točnu cijenu reći ćemo vam prije početka, ne tek na blagajni.",
    },
  },
  {
    id: "first-visit",
    question: {
      de: "Was passiert beim ersten Termin?",
      en: "What happens at a first appointment?",
      hr: "Što se događa na prvom terminu?",
    },
    answer: {
      de: "Wir beginnen mit einer Beratung — Haarstruktur, Alltag, Pflegeaufwand, was du dir vorstellst. Bring gern Fotos mit, das hilft mehr als jede Beschreibung. Die Beratung ist kostenlos und unverbindlich.",
      en: "We start with a consultation — hair structure, your routine, how much upkeep you want, what you have in mind. Bring photos if you have them; they help more than any description. The consultation is free and without obligation.",
      hr: "Počinjemo savjetovanjem — struktura kose, svakodnevica, koliko njege želite i što vam je na umu. Slobodno ponesite fotografije, pomažu više od svakog opisa. Savjetovanje je besplatno i neobvezno.",
    },
  },
  {
    id: "duration",
    question: {
      de: "Wie viel Zeit soll ich einplanen?",
      en: "How much time should I plan for?",
      hr: "Koliko vremena trebam predvidjeti?",
    },
    answer: {
      de: "Ein Schnitt dauert 30 bis 75 Minuten, Farbe je nach Technik 45 bis 150 Minuten. Die Dauer steht bei jeder Leistung in der Preisliste — plane bei Balayage lieber einen halben Vormittag ein.",
      en: "A cut takes 30 to 75 minutes; colour runs 45 to 150 minutes depending on technique. Every service lists its duration in the price list — for balayage, plan for half a morning.",
      hr: "Šišanje traje 30 do 75 minuta, boja ovisno o tehnici 45 do 150 minuta. Trajanje piše uz svaku uslugu u cjeniku — za balayage radije predvidite pola prijepodneva.",
    },
  },
  {
    id: "cancellation",
    question: {
      de: "Wie sage ich einen Termin ab?",
      en: "How do I cancel an appointment?",
      hr: "Kako otkazati termin?",
    },
    answer: {
      de: "Ruf uns bitte bis 24 Stunden vorher an. Kurzfristige Absagen blockieren einen Platz, den jemand anderes gebraucht hätte — deshalb bitten wir um die kurze Info.",
      en: "Please call us at least 24 hours ahead. A late cancellation blocks a slot somebody else needed, so a quick heads-up makes a real difference.",
      hr: "Nazovite nas najkasnije 24 sata prije. Otkazivanje u zadnji čas blokira termin koji bi netko drugi iskoristio — zato molimo kratku obavijest.",
    },
  },
  {
    id: "payment",
    question: {
      de: "Womit kann ich bezahlen?",
      en: "How can I pay?",
      hr: "Čime mogu platiti?",
    },
    answer: {
      de: "Bar sowie mit Bankomat- und Kreditkarte. Trinkgeld ist möglich, aber nie erwartet.",
      en: "Cash, debit and credit card. Tips are welcome but never expected.",
      hr: "Gotovinom te debitnom i kreditnom karticom. Napojnica je moguća, ali se nikad ne očekuje.",
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
