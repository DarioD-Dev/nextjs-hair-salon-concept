*[This page in English](README.md)*

# Salon Kupferglanz — Friseursalon (Konzept)

Eine fiktive Konzeptseite für einen Wiener Friseursalon, umgesetzt als vollständig responsives, mehrseitiges Next.js-Frontend. Anders als eine einzelne Scroll-Landingpage ist die Seite so aufgebaut, wie eine echte Salon-Website aufgebaut sein sollte: eine Team-Seite mit einzelnen Stylist:innen-Portfolios, eine verlinkbare Preisliste und Kontaktdaten.

> Dies ist ein Konzept-/Portfolio-Projekt. "Salon Kupferglanz" ist ein fiktives Unternehmen — Stylist:innen, Preise und Bewertungen sind erfunden, hinter der Seite steckt kein echtes Buchungssystem.

## Konzept

Die Recherche zu echten Wiener Salon-Websites zeigte zwei wiederkehrende Lücken: Die meisten betreiben entweder eine veraltete, textlastige Seite, oder sie lagern die Terminbuchung komplett an eine Drittanbieter-Plattform aus — und schicken Besucher:innen damit mitten im Besuch weg von der eigenen Marke. Die stärksten internationalen Salon-Seiten setzen dagegen durchgehend auf **individuelle Stylist:innen-Profile** — Kund:innen wählen eine Person, nicht nur einen Laden. Genau darauf baut dieses Konzept auf.

Die gesamte Farbpalette folgt einer einzigen Idee: **Kupfer in zwei Zuständen.** Rohes, poliertes Kupfer (`#B87333`) trägt den Akzent; oxidiertes Kupfer — Patina (`#007979` / `#24B1B1`) — trägt Flächen und Sekundärtext.

## Funktionen

- Mehrseitiges Routing (Start, Team, Leistungen, Kontakt) — kein One-Page-Scroller
- Individuelle Stylist:innen-Profile mit eigenem Mini-Portfolio und Spezialisierungen
- Kategorisierte Preisliste (Damen, Herren, Farbe, Pflege), direkt darunter ein FAQ gegen die typischen Einstiegszweifel
- Deutsche/englische Oberfläche via `next-intl`, mit lokalisierten Routen (`/de/leistungen`, `/en/services`)
- Dunkles, editoriales Theme — bewusst kein Light Mode, passend zur Stimmung des Salons
- Vollständig responsiv (Mobile, Tablet, Desktop), mit sticky Anruf-/Buchungsleiste auf Mobile
- Monochrome Fotografie mit Farb-Reveal bei Hover, damit ein gemischtes Farb-/S/W-Fotoset (siehe `public/CREDITS.md`) trotzdem wie ein einheitlicher Look wirkt

## Tech-Stack

- [Next.js](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 mit dreischichtigem Design-Token-System
- [next-intl](https://next-intl.dev/) für Internationalisierung
- [Resend](https://resend.com/) für das Kontaktformular (optional, siehe unten)

## Erste Schritte

```bash
npm install
npm run dev
```

Danach [http://localhost:3000](http://localhost:3000) öffnen.

### Kontaktformular — E-Mail-Versand

Ohne weitere Einrichtung validiert das Formular korrekt, loggt die Nachricht aber nur in die Server-Konsole — nichts geht verloren, aber es wird auch nichts verschickt. Damit es wirklich mailt:

1. Kostenlosen [Resend](https://resend.com/)-Account + API-Key anlegen.
2. In `.env.local` ergänzen: `RESEND_API_KEY=re_...`
3. Optional `CONTACT_FROM_EMAIL` setzen, sobald eine verifizierte Absender-Domain existiert (Standard ist Resends geteilte Test-Adresse).

Nachrichten gehen an `SALON.email` (`src/data/salon.ts`), die Adresse der/des Besuchenden wird als Reply-To gesetzt.

## Credits

Fotografie von [Unsplash](https://unsplash.com/license) — siehe [`public/CREDITS.md`](public/CREDITS.md).
