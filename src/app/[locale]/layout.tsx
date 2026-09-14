import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SkipLink } from "@/components/layout/SkipLink";
import { routing } from "@/i18n/routing";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import { serif, sansUi } from "@/styles/fonts";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s — ${t("title")}` },
    description: t("description"),
    // Concept study: it must not compete in search with any real salon.
    robots: { index: false, follow: false },
    alternates: buildAlternates("/", locale),
    openGraph: {
      type: "website",
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
      locale: locale === "de" ? "de_AT" : "en_US",
      // Ausdrücklich gesetzt, nicht der automatischen Ergänzung überlassen:
      // Next ergänzt das Bild aus app/opengraph-image.tsx nur, solange keine
      // eigene openGraph-Angabe existiert — openGraph wird ganz ersetzt statt
      // zusammengeführt. Ohne diese Zeile blieb die Vorschau bildlos, obwohl
      // twitter:card ein großes Bild versprach.
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  // assertLocale ersetzt die frühere hasLocale/notFound-Kaskade an dieser
  // Stelle: dieselbe Prüfung, aber an genau einer Stelle für alle Routen.
  const locale = assertLocale((await params).locale);

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${serif.variable} ${sansUi.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-text">
        <NextIntlClientProvider>
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
