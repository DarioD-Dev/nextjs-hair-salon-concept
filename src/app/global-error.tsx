"use client";

import { useEffect } from "react";

/**
 * Greift nur, wenn das Wurzel-Layout selbst beim Rendern scheitert — dann gibt
 * es kein [locale], keine Übersetzungen, keine Schriften und kein
 * Stylesheet. Deshalb eigenes <html>/<body> und Stil direkt am Element:
 * Tailwind-Klassen hätten hier keine Datei, aus der sie kämen.
 *
 * Deutsch, weil die Sprachverhandlung genau in der Schicht steckt, die hier
 * ausgefallen ist. Der Link zeigt auf „/" statt auf „/de" — dort entscheidet
 * die Middleware wieder selbst, sobald sie wieder läuft.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem 1.25rem",
          textAlign: "center",
          background: "#061817",
          color: "#f2ebdd",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Da ist etwas schiefgelaufen.</h1>
        <p style={{ margin: 0, maxWidth: "36rem", lineHeight: 1.6 }}>
          Diese Seite konnte gerade nicht geladen werden. Ein neuer Versuch hilft oft schon.
        </p>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}
        >
          <button
            type="button"
            onClick={reset}
            style={{
              border: 0,
              borderRadius: "999px",
              padding: "0.75rem 1.5rem",
              font: "inherit",
              fontWeight: 600,
              cursor: "pointer",
              background: "#c77a32",
              color: "#061817",
            }}
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            style={{
              borderRadius: "999px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid #163b37",
              color: "#f2ebdd",
            }}
          >
            Zur Startseite
          </a>
        </div>
      </body>
    </html>
  );
}
