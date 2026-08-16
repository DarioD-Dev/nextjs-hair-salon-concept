import { getTranslations } from "next-intl/server";
import { SALON } from "@/data/salon";
import { cn } from "@/lib/cn";

// lucide-react dropped brand/logo icons years ago (trademark reasons) — these
// are small hand-drawn glyphs, not reproductions of the real Instagram/
// Facebook logos.
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden>
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { key: "instagram", href: SALON.instagramUrl, Icon: InstagramIcon },
  { key: "facebook", href: SALON.facebookUrl, Icon: FacebookIcon },
] as const;

export async function SocialLinks({ className }: { className?: string }) {
  const t = await getTranslations("Header");

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {SOCIAL_LINKS.map(({ key, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={t(`social.${key}`)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:text-accent-copper"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
