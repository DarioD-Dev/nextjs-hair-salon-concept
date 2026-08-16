import type { ResolvedService } from "@/data/types";
import { formatPrice } from "@/lib/format";

export function ServiceCategory({
  title,
  services,
  locale,
  durationLabel,
  priceFromLabel,
}: {
  title: string;
  services: ResolvedService[];
  locale: string;
  durationLabel: (minutes: number) => string;
  priceFromLabel: (price: string) => string;
}) {
  return (
    <section>
      <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{title}</h2>
      {/* Name / duration / price on one baseline, separated by rules — the
          scan path a price list needs, without card chrome around each row. */}
      <ul className="mt-6 border-t border-border-subtle">
        {services.map((service) => {
          const price = formatPrice(service.price, locale);
          return (
            <li
              key={service.id}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border-subtle py-5"
            >
              <h3 className="font-display text-lg font-light text-text">{service.name}</h3>
              <p className="order-3 w-full font-sans text-xs uppercase tracking-[0.12em] text-text-secondary sm:order-2 sm:w-auto sm:flex-1">
                {durationLabel(service.duration)}
              </p>
              <p className="order-2 whitespace-nowrap font-sans text-base text-accent-copper sm:order-3">
                {service.priceFrom ? priceFromLabel(price) : price}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
