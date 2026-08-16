import { ButtonLink } from "@/components/ui/ButtonLink";
import { SALON } from "@/data/salon";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./buttonStyles";

// The single seam for the future booking layer (Bauplan phase 2: integrate an
// existing provider — Fresha/Treatwell — rather than build a booking system).
// While SALON.bookingUrl is null every "book an appointment" CTA falls back to
// the contact page; setting that one value repoints all of them at the real
// provider without touching a component.
export function BookingCta({
  children,
  variant,
  size,
  className,
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  if (SALON.bookingUrl) {
    return (
      <a
        href={SALON.bookingUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={buttonStyles({ variant, size, className })}
      >
        {children}
      </a>
    );
  }

  return (
    <ButtonLink href="/kontakt" variant={variant} size={size} className={className}>
      {children}
    </ButtonLink>
  );
}
