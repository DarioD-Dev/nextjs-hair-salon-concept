import { getTranslations } from "next-intl/server";

// Visible only on keyboard focus. Without it every keyboard user has to tab
// past the whole header — wordmark, nav, phone, booking CTA, language, menu —
// on every single page before reaching the content.
export async function SkipLink() {
  const t = await getTranslations("Header");

  return (
    <a
      href="#main"
      // Parked above the viewport and slid in on focus, rather than
      // sr-only + not-sr-only: not-sr-only resets padding to 0, which
      // flattened the link to a 20px strip when it actually appeared.
      className="absolute left-4 top-4 z-50 -translate-y-24 rounded-full bg-accent-copper px-6 py-3 font-sans text-sm uppercase tracking-wide text-text-on-accent transition-transform focus:translate-y-0"
    >
      {t("skipToContent")}
    </a>
  );
}
