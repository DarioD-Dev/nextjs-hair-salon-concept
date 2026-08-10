import { Heading } from "@/components/ui/Heading";
import { Rule } from "@/components/ui/Rule";
import { Text } from "@/components/ui/Text";
import type { ResolvedService } from "@/data/types";
import { formatPrice } from "@/lib/format";

export function ServiceCategory({
  title,
  services,
  locale,
  durationLabel,
}: {
  title: string;
  services: ResolvedService[];
  locale: string;
  durationLabel: (minutes: number) => string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Heading level={2} variant="section">
        {title}
      </Heading>
      <Rule className="opacity-30" />
      <ul className="flex flex-col gap-5">
        {services.map((service) => (
          <li key={service.id} className="flex items-baseline justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <Text as="span" variant="body">
                {service.name}
              </Text>
              <Text as="span" variant="small">
                {durationLabel(service.duration)}
              </Text>
            </div>
            <Text as="span" variant="body" className="whitespace-nowrap text-accent-copper">
              {formatPrice(service.price, locale)}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
