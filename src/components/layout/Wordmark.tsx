import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

// Two-tone like the hero headline, but set small and letter-spaced so it reads
// as a mark rather than as a second headline competing with the h1.
export function Wordmark({ className, label }: { className?: string; label: string }) {
  return (
    <Link
      href="/"
      aria-label={label}
      className={cn(
        // Stays small until md. At 375px the full-size mark plus the action
        // cluster overflowed the container, and at exactly 640px — where the
        // phone link and booking button appear — the row landed on the
        // container edge to the pixel, with no room for a longer brand name.
        "inline-flex shrink-0 items-baseline gap-1.5 py-1 font-display text-xs uppercase tracking-[0.12em] transition-colors hover:text-accent-copper md:text-base md:tracking-[0.2em]",
        className,
      )}
    >
      <span className="text-text">Salon</span>
      <span className="text-accent-copper">Kupferglanz</span>
    </Link>
  );
}
