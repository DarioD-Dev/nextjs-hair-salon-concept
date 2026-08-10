import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const LOGO_TEXT = "SALON KUPFERGLANZ";
const NBSP = " ";

// Pure CSS, no client JS: each letter is its own span with a staggered
// animationDelay, so `animate-[logo-wave...]` ripples left to right once
// on load (keyframe defined in globals.css).
export async function Logo({ className, size = "default" }: { className?: string; size?: "default" | "compact" }) {
  const t = await getTranslations("Header");

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col items-start gap-0 text-text transition-colors hover:text-accent-copper",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex font-display tracking-[0.1em]",
          size === "compact" ? "text-base" : "text-base sm:text-xl",
        )}
      >
        {LOGO_TEXT.split("").map((char, index) => (
          <span
            key={index}
            style={{ animationDelay: `${index * 30}ms` }}
            className="inline-block animate-[logo-wave_0.6s_ease-out_both]"
          >
            {char === " " ? NBSP : char}
          </span>
        ))}
      </span>
      {size === "default" && (
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-text-secondary">
          {t("logoTagline")}
        </span>
      )}
    </Link>
  );
}
