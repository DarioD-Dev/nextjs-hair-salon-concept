# Bild-Credits

Alle Fotos (Stylist:innen-Porträts, Portfolio, Galerie) sind unter der [Unsplash-Lizenz](https://unsplash.com/license) lizenziert (kostenlose kommerzielle Nutzung, keine Zuschreibung erforderlich) und werden direkt vom Unsplash-CDN eingebunden, nicht lokal gespeichert. Zur Nachverfolgung der Foto-ID (z.B. für Fotograf:in-Zuschreibung) einfach `https://unsplash.com/photos/<foto-id>` aufrufen — die IDs entsprechen genau den in `src/data/stylists.ts` verwendeten.

Verwendete Foto-IDs (Stand 13.08.2026):

- photo-1506863530036-1efeddceb993 (Lena Hofer, Porträt)
- photo-1567894340315-735d7c361db0 (Markus Weber, Porträt)
- photo-1617690825153-8bb0a8e3c911 (Selin Yıldız, Porträt)
- photo-1605497788044-5a32c7078486 (Lena, Portfolio)
- photo-1635273051937-a0ddef9573b6 (Lena, Portfolio)
- photo-1711274091943-5aae912e6985 (Lena, Portfolio)
- photo-1503951914875-452162b0f3f1 (Markus, Portfolio)
- photo-1657105052497-f996284ffff8 (Markus, Portfolio)
- photo-1514336937476-a5b961020a5c (Markus, Portfolio)
- photo-1593702288056-7927b442d0fa (Selin, Portfolio)
- photo-1711274093746-b588a17d2716 (Selin, Portfolio)
- photo-1654097801176-cb1795fd0c5e (Selin, Portfolio)
- photo-1781450090585-1a511b7066d9 (Startseite Hero, Salon-Interieur)

**13.08.2026 — Markus-Weber-Bug behoben:** Porträt und zwei der drei Portfolio-Fotos zeigten fälschlich eine Frau bzw. eine allgemeine Salon-Szene ohne erkennbaren Bezug zu ihm — vor dem Ersetzen jedes Bild visuell geprüft (heruntergeladen + angeschaut), nicht nur die Text-Beschreibung der Suche vertraut.

**16.08.2026 — zweiter Anlauf beim selben Porträt:** Das Ersatzbild zeigte einen *wartenden Kunden* im Friseurstuhl, keinen arbeitenden Friseur. Beim Prüfen war die Frage „ist das eine Person im Friseur-Kontext?" beantwortet worden, aber nicht die entscheidende: **arbeitet die Person, oder wird sie bedient?** Jetzt ein Barber mitten im Schnitt. Merksatz fürs nächste Mal: bei Team-/Mitarbeiterfotos immer prüfen, auf welcher Seite der Schere die Person steht.

**16.08.2026 — Kupfer-Textur-Foto entfernt:** `photo-1428194949883-cafda571f3c4` (Kupferpaneele) lag als dekoratives Overlay auf allen Seiten mit `PageHeader` — Next.js meldete es dort als **LCP-Element**, d.h. eine reine Dekografik bestimmte die wichtigste Ladekennzahl. Ersetzt durch eine Inline-SVG-Körnung (kein Request, kann kein LCP-Kandidat sein).
