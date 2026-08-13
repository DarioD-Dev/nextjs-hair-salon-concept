import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextureOverlay } from "@/components/ui/TextureOverlay";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Section tone="muted" className="relative overflow-hidden py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,color-mix(in_srgb,var(--accent-copper)_12%,transparent),transparent_70%)]"
      />
      <TextureOverlay />
      <Container className="relative flex flex-col items-center gap-3 text-center">
        <Heading level={1} variant="section">
          {title}
        </Heading>
        {subtitle && (
          <Text variant="lead" className="max-w-xl">
            {subtitle}
          </Text>
        )}
      </Container>
    </Section>
  );
}
