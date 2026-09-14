import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Salon Kupferglanz — Friseur in Wien";

// Statische, sprachneutrale Karte (Linkvorschauen verhandeln praktisch nie
// die Sprache) aus derselben Palette wie die Seite.
//
// Vorher gab es hier kein Bild, die Seite deklarierte aber
// twitter:card = summary_large_image — eine Karte, die ein großes Bild
// verspricht und keines liefert. Mit diesem Bild stimmt die Angabe.
const serif = await readFile(join(process.cwd(), "assets/Fraunces-SemiBold.woff"));

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "90px",
        background: "#061817",
        color: "#f2ebdd",
        fontFamily: "Fraunces",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: "#c77a32",
        }}
      >
        Salon Kupferglanz
      </div>
      <div style={{ display: "flex", marginTop: 40, fontSize: 82, lineHeight: 1.1, maxWidth: 900 }}>
        Friseur in Wien.
      </div>
      <div style={{ display: "flex", marginTop: 34, fontSize: 30, color: "#e8d7b5" }}>
        Schnitt · Farbe · Pflege — Termine nach Vereinbarung
      </div>
    </div>,
    { ...size, fonts: [{ name: "Fraunces", data: serif, style: "normal", weight: 600 }] },
  );
}
