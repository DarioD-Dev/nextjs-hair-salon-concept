import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function IconButton({
  children,
  className,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className={cn(
        // "group" lets an icon child opt into its own hover animation via group-hover:.
        "group flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:text-accent-copper",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
