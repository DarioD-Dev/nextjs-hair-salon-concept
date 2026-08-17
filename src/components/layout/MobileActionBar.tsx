import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/ui/BookingCta";
import { PHONE_HREF } from "@/data/salon";

// Phone-only bar: on mobile the two things a salon visitor actually does are
// call and book, and both otherwise sit above the fold of a page they may
// have scrolled far past. Desktop keeps them in the sticky header instead.
export async function MobileActionBar() {
  const t = await getTranslations("Common");

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border-subtle bg-surface/95 backdrop-blur sm:hidden">
        <div className="grid grid-cols-2 gap-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <a
            href={PHONE_HREF}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong font-sans text-sm uppercase tracking-wide text-text transition-colors hover:text-accent-copper"
          >
            <Phone size={16} aria-hidden />
            {t("call")}
          </a>
          <BookingCta className="min-h-12 px-4">{t("bookAppointment")}</BookingCta>
        </div>
      </div>
      {/* Spacer so the bar never covers the last line of the footer. */}
      <div aria-hidden className="h-20 sm:hidden" />
    </>
  );
}
