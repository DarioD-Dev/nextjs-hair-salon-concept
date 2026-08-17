import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
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
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${serif.variable} ${sansUi.variable} h-full overflow-x-hidden antialiased`}>
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
