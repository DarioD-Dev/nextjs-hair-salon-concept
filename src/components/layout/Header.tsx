import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BookingCta } from "@/components/ui/BookingCta";
import { SALON, PHONE_HREF } from "@/data/salon";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { Nav } from "./Nav";
import { Wordmark } from "./Wordmark";

export async function Header() {
  const t = await getTranslations("Header");
  const tCommon = await getTranslations("Common");

  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-surface/85 backdrop-blur">
      {/* flex with mr-auto/ml-auto rather than a 3-column grid: the right-hand
          cluster hides items at different breakpoints, and conditionally
          removed grid children shift their siblings into the wrong column. */}
      <Container className="flex items-center gap-4 py-4">
        <Wordmark className="mr-auto" label={t("home", { name: SALON.name })} />
        {/* The nav switches to the drawer at lg, not md. With a wordmark, four
            nav items, a phone link, a booking button and the language toggle
            all in one row, 768px is 70px short — and squeezing gaps to make it
            fit would leave no margin for a longer nav label later. */}
        <Nav className="hidden lg:block" />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* Calling is still how most salon appointments are made in Vienna,
              so the number stays one tap away. Hidden below sm only because
              the sticky bottom bar carries call + book at those widths — two
              call affordances would just crowd a 375px header. */}
          <a
            href={PHONE_HREF}
            aria-label={t("callAria", { phone: SALON.phone })}
            className="hidden h-10 items-center gap-2 rounded-full px-2 text-text transition-colors hover:text-accent-copper sm:flex sm:px-3"
          >
            <Phone size={18} aria-hidden />
            <span className="hidden font-sans text-sm xl:inline">{SALON.phone}</span>
          </a>
          <BookingCta size="sm" className="hidden sm:inline-flex">
            {tCommon("bookAppointment")}
          </BookingCta>
          <LocaleSwitcher />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
