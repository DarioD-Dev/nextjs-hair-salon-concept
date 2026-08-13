"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@/components/ui/IconButton";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "./navItems";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    // Background siblings (header, main, footer) stay in the DOM behind the
    // portalled dialog — without `inert` they're still reachable by Tab and
    // by screen readers, despite the dialog's aria-modal="true".
    const siblings = Array.from(document.body.children).filter((el) => el !== panelRef.current);
    siblings.forEach((el) => el.setAttribute("inert", ""));

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      siblings.forEach((el) => el.removeAttribute("inert"));
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <IconButton
        label={tHeader("openMenu")}
        onClick={(event) => {
          triggerRef.current = event.currentTarget;
          setOpen(true);
        }}
      >
        <Menu size={22} />
      </IconButton>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex flex-col bg-surface outline-none"
          >
            <div className="flex items-center justify-end p-6">
              <IconButton label={tHeader("closeMenu")} onClick={() => setOpen(false)}>
                <X size={22} />
              </IconButton>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-text transition-colors hover:text-accent-copper"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
