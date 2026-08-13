import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { ImageShine } from "@/components/ui/ImageShine";
import { Text } from "@/components/ui/Text";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import type { ResolvedStylist } from "@/data/types";
import { cn } from "@/lib/cn";

export async function StylistProfile({
  stylist,
  reverse = false,
}: {
  stylist: ResolvedStylist;
  reverse?: boolean;
}) {
  const t = await getTranslations("Team");

  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
        reverse && "lg:[&>*:first-child]:order-2",
      )}
    >
      <div className="group relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={stylist.image}
          alt={stylist.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <ImageShine />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Heading level={2} variant="section">
            {stylist.name}
          </Heading>
          <Text variant="lead" className="text-accent-copper">
            {stylist.role}
          </Text>
        </div>
        <Text variant="body">{stylist.bio}</Text>
        <div>
          <VisuallyHidden>{t("specialtiesLabel")}</VisuallyHidden>
          <div className="flex flex-wrap gap-2">
            {stylist.specialties.map((specialty) => (
              <Badge key={specialty}>{specialty}</Badge>
            ))}
          </div>
        </div>
        <div>
          <VisuallyHidden>{t("portfolioLabel", { name: stylist.name })}</VisuallyHidden>
          <div className="grid grid-cols-3 gap-3">
            {stylist.portfolio.map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-md">
                <Image src={src} alt="" fill sizes="150px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
