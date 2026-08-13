import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/home/FinalCta";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Intro } from "@/components/home/Intro";
import { TeamPreview } from "@/components/home/TeamPreview";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { Locale } from "@/data/types";

// A coiled raw-copper pipe — the "machine, not a haircut" image Dario asked
// for, and dramatic enough on its own to fill the section without relying
// on the glow alone.
const HERO_IMAGE = "https://images.unsplash.com/photo-1613031595478-de64daa4b8f9?w=1920&q=80&auto=format&fit=crop";

type Props = { params: Promise<{ locale: Locale }> };

export default async function Home({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Home");

    return (
        <div className="flex flex-col">
            <Section size="lg" className="relative flex min-h-[65vh] items-center overflow-hidden bg-surface-editorial">
                <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover opacity-70" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-surface-editorial/55" />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_35%,color-mix(in_srgb,var(--accent-copper)_35%,transparent),transparent_75%)]"
                />
                <Container className="relative text-center">
                    <Text variant="eyebrow" className="text-text-on-editorial/80">
                        {t("heroEyebrow")}
                    </Text>
                    <Heading level={1} variant="display" className="mt-4 italic text-text-on-editorial">
                        {t("heroTitle")}
                    </Heading>
                    <ButtonLink href="/team" className="mt-8">
                        {t("heroCta")}
                    </ButtonLink>
                </Container>
            </Section>

            <Reveal>
                <Intro />
            </Reveal>

            <Reveal>
                <TeamPreview locale={locale} />
            </Reveal>

            <Reveal>
                <GalleryPreview locale={locale} />
            </Reveal>

            <FinalCta />
        </div>
    );
}
