import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Text } from "@/components/ui/Text";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import type { ResolvedStylist } from "@/data/types";
import { cn } from "@/lib/cn";

// Variation comes from which side the portrait sits on, not from the frames
// themselves — every portrait uses the same 4:5 ratio so the sequence reads
// as composed rather than as images of random sizes.
const PORTRAIT_SIDE = ["", "lg:order-2", ""] as const;

export async function StylistProfile({
  stylist,
  index,
  priority = false,
}: {
  stylist: ResolvedStylist;
  index: number;
  priority?: boolean;
}) {
  const t = await getTranslations("Team");

  return (
    // scroll-mt keeps the heading clear of the sticky header when arriving via
    // the #slug link from the homepage team teaser.
    <article id={stylist.slug} className="grid scroll-mt-28 items-start gap-8 lg:grid-cols-2 lg:gap-16">
      {/* max-h caps the frame below the viewport height: at a full-width 4:5
          ratio the portrait was taller than the screen on phones, so the
          stylist's face never fit on screen in one piece. */}
      <div
        className={cn(
          "relative mx-auto aspect-[4/5] max-h-[70svh] w-full overflow-hidden",
          PORTRAIT_SIDE[index % PORTRAIT_SIDE.length],
        )}
      >
        <Image
          src={stylist.image}
          alt={stylist.name}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <span className="font-display text-sm text-accent-copper">0{index + 1}</span>
          <h2 className="mt-3 font-display text-display-md font-light text-text">{stylist.name}</h2>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.16em] text-accent-copper">{stylist.role}</p>
        </div>

        <Text variant="body" className="max-w-md">
          {stylist.bio}
        </Text>

        <div>
          <VisuallyHidden>{t("specialtiesLabel")}</VisuallyHidden>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border-subtle pt-4">
            {stylist.specialties.map((specialty) => (
              <li key={specialty} className="font-sans text-xs uppercase tracking-[0.12em] text-text-secondary">
                {specialty}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <VisuallyHidden>{t("portfolioLabel", { name: stylist.name })}</VisuallyHidden>
          <ul className="grid grid-cols-3 gap-3">
            {stylist.portfolio.map((src) => (
              <li key={src} className="relative aspect-square overflow-hidden">
                <Image
                  src={src}
                  alt={t("workImageAlt", { name: stylist.name })}
                  fill
                  loading="lazy"
                  sizes="(min-width: 640px) 160px, 30vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
