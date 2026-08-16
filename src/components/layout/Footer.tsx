import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { CONTACT_ADDRESS, SALON } from "@/data/salon";
import { NAV_ITEMS } from "./navItems";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <p className="font-display text-xl font-light text-text lg:col-span-1">{SALON.name}</p>

          <nav aria-label={t("navTitle")}>
            <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{t("navTitle")}</h2>
            {/* inline-block + py-1 pushes each link past the 24px minimum
                target size; the bare text was ~19px tall. */}
            <ul className="mt-3 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1 font-sans text-sm text-text-secondary transition-colors hover:text-accent-copper"
                  >
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{t("contactTitle")}</h2>
            <address className="mt-3 flex flex-col font-sans text-sm not-italic text-text-secondary">
              <span className="py-1">{CONTACT_ADDRESS}</span>
              <a
                href={`tel:${SALON.phone.replace(/\s/g, "")}`}
                className="py-1 transition-colors hover:text-accent-copper"
              >
                {SALON.phone}
              </a>
              <a href={`mailto:${SALON.email}`} className="py-1 transition-colors hover:text-accent-copper">
                {SALON.email}
              </a>
            </address>
          </div>

          <div>
            <h2 className="font-sans text-eyebrow uppercase text-accent-copper">{t("followTitle")}</h2>
            <ul className="mt-3 flex flex-col font-sans text-sm text-text-secondary">
              <li>
                <a
                  href={SALON.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-block py-1 transition-colors hover:text-accent-copper"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SALON.facebookUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-block py-1 transition-colors hover:text-accent-copper"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border-subtle pt-6 font-sans text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SALON.name} ·{" "}
            <a
              href="mailto:dario.dominkovic@hotmail.com"
              className="inline-block py-1 transition-colors hover:text-accent-copper"
            >
              {t("credit")}
            </a>
          </p>
          <p>{t("disclaimer")}</p>
        </div>
      </Container>
    </footer>
  );
}
