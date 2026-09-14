import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // AVIF first: the hero and the portfolio grid are the page weight here,
    // and AVIF lands well below WebP at the same quality. Browsers without
    // support fall through to WebP and then to the original.
    formats: ["image/avif", "image/webp"],
  },
  // src/app/opengraph-image.tsx liest die Schriftdatei über
  // readFile(join(process.cwd(), "assets/...")). Der Pfad entsteht zur
  // Laufzeit, die Dateiverfolgung des Builds erkennt ihn nicht zuverlässig.
  // Ohne diesen Eintrag wäre die Route lokal einwandfrei und erst in der
  // Produktion kaputt — sichtbar dann, wenn jemand den Link teilt.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**/*.woff"],
  },
};

export default withNextIntl(nextConfig);
