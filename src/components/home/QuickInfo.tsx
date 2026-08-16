import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { CONTACT_ADDRESS } from "@/data/salon";

export async function QuickInfo() {
  const t = await getTranslations("Home");
  const tHours = await getTranslations("Hours");

  const items = [
    { label: t("quickLocation"), value: CONTACT_ADDRESS },
    { label: t("quickHours"), value: tHours("shortWeekdays") },
    { label: t("quickBooking"), value: t("quickBookingValue") },
  ];

  return (
    <section className="border-y border-border-subtle">
      <Container>
        <dl className="grid divide-y divide-border-subtle sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map((item) => (
            <div key={item.label} className="py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <dt className="font-sans text-eyebrow uppercase text-accent-copper">{item.label}</dt>
              <dd className="mt-2 font-sans text-sm text-text">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
