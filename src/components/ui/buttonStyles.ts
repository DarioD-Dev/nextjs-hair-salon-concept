import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  // A flat accent-copper fill read as a plastic swatch, not metal — a
  // diagonal two-stop gradient between the accent and its hover shade
  // suggests light catching a brushed surface. `hover:brightness-110`
  // (not a background swap) so the shift transitions smoothly via `filter`
  // instead of hard-cutting between two gradients.
  primary:
    "bg-[linear-gradient(135deg,var(--accent-copper)_0%,var(--accent-copper-hover)_100%)] text-text-on-accent transition-[filter] duration-300 hover:brightness-110",
  secondary:
    "border border-border-strong text-text hover:border-accent-copper hover:text-accent-copper",
  ghost: "text-text hover:text-accent-copper",
  link: "p-0 text-text underline underline-offset-4 hover:text-accent-copper",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-sans uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    variant !== "link" && sizeStyles[size],
    variantStyles[variant],
    className,
  );
}
