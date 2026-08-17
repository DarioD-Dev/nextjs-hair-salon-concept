import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

// Native <details>/<summary>: keyboard operable, screen-reader announced and
// open/closed state handled by the browser — an accordion built from buttons
// and aria-expanded would only reimplement all of that, worse.
export function Faq({
  title,
  items,
}: {
  title: string;
  items: { id: string; question: string; answer: string }[];
}) {
  return (
    <Section tone="muted" className="border-t border-border-subtle">
      <Container>
        <h2 className="font-sans text-eyebrow uppercase tracking-[0.22em] text-accent-copper">{title}</h2>
        <div className="mt-10 border-t border-border-subtle">
          {items.map((item) => (
            <details key={item.id} className="group border-b border-border-subtle">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-light text-text transition-colors hover:text-accent-copper [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  size={20}
                  aria-hidden
                  className="shrink-0 text-accent-copper transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-2xl pb-6 font-sans text-sm leading-relaxed text-text-secondary">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
