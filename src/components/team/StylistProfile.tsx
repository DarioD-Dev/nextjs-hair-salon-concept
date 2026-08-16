import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Text } from "@/components/ui/Text";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import type { ResolvedStylist } from "@/data/types";
import { cn } from "@/lib/cn";

// Three distinct compositions rather than one mirrored twice, so the page
// reads as a sequence of portraits instead of a row of staff cards.
// 0: portrait left, wide text column. 1: portrait right, narrower. 2:
// portrait left again but larger, work images pulled under the text.
const LAYOUTS = [
  { grid: "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]", portraitOrder: "", aspect: "aspect-[4/5]" },
  { grid: "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]", portraitOrder: "lg:order-2", aspect: "aspect-[3/4]" },
  { grid: "lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]", portraitOrder: "", aspect: "aspect-[5/6]" },
] as const;

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
  const layout = LAYOUTS[index % LAYOUTS.length];

  return (
    <article className={cn("grid items-start gap-8 lg:gap-16", layout.grid)}>
      <div className={cn("relative overflow-hidden", layout.aspect, layout.portraitOrder)}>
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
          {/* Deliberately uneven: the first work image runs taller than the
              other two, which keeps the trio from reading as a thumbnail row. */}
          <ul className="grid grid-cols-3 gap-3">
            {stylist.portfolio.map((src, imageIndex) => (
              <li
                key={src}
                className={cn("relative overflow-hidden", imageIndex === 0 ? "aspect-[3/4]" : "aspect-square self-start")}
              >
                <Image src={src} alt="" fill loading="lazy" sizes="150px" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
