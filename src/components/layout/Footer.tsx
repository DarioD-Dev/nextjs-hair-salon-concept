import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Logo } from "./Logo";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-surface-editorial text-text-on-editorial">
      <Container className="flex flex-col gap-6 py-12">
        <Logo size="compact" className="text-text-on-editorial" />
        <Rule className="opacity-30" />
        <div className="flex flex-col gap-2 font-sans text-xs text-text-on-editorial/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p>© {new Date().getFullYear()} Salon Kupferglanz</p>
            <span aria-hidden>·</span>
            <a href="mailto:dario.dominkovic@hotmail.com" className="transition-colors hover:text-text-on-editorial">
              {t("credit")}
            </a>
          </div>
          <p className="sm:text-right">{t("disclaimer")}</p>
        </div>
      </Container>
    </footer>
  );
}
