import { Link } from "@/i18n/navigation";
import type { ResolvedStylist } from "@/data/types";
import { cn } from "@/lib/cn";

function pillClass(isActive: boolean) {
  return cn(
    "rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    isActive
      ? "border-accent-copper bg-accent-copper text-text-on-accent"
      : "border-border-strong text-text hover:border-accent-copper hover:text-accent-copper",
  );
}

export function GalleryFilters({
  stylists,
  active,
  allLabel,
}: {
  stylists: ResolvedStylist[];
  active?: string;
  allLabel: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Link href="/galerie" className={pillClass(!active)}>
        {allLabel}
      </Link>
      {stylists.map((stylist) => (
        <Link
          key={stylist.slug}
          href={{ pathname: "/galerie", query: { stylist: stylist.slug } }}
          className={pillClass(active === stylist.slug)}
        >
          {stylist.name}
        </Link>
      ))}
    </div>
  );
}
