import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-eyebrow font-medium uppercase tracking-[0.18em] text-accent-copper">
        {t("heroEyebrow")}
      </p>
      <h1 className="mt-4 font-display text-display-md italic text-text sm:text-display-lg">
        {t("heroTitle")}
      </h1>
      <button className="mt-8 rounded-full bg-accent-copper px-6 py-3 font-sans text-sm font-medium text-text-on-accent transition-opacity hover:opacity-90">
        {t("heroCta")}
      </button>
    </main>
  );
}
