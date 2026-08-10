import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getStylists } from "@/data/stylists";
import type { Locale } from "@/data/types";

export async function TeamPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");
  const stylists = await getStylists(locale);

  return (
    <Section tone="muted">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading level={2} variant="section">
            {t("teamTitle")}
          </Heading>
          <Text variant="lead">{t("teamSubtitle")}</Text>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {stylists.map((stylist) => (
            <Card key={stylist.id} hover className="flex flex-col gap-0 overflow-hidden p-0">
              <div className="relative aspect-[4/5]">
                <Image
                  src={stylist.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 px-6 py-5">
                <Heading level={3} variant="card">
                  {stylist.name}
                </Heading>
                <Text variant="small" className="text-accent-copper">
                  {stylist.role}
                </Text>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <ButtonLink href="/team" variant="secondary">
            {t("teamCta")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
