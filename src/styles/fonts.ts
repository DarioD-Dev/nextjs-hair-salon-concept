import { Fraunces, Manrope } from "next/font/google";

// Only the weights the design actually uses — every extra weight is another
// font file on the critical path. next/font self-hosts and inlines the
// @font-face rules (woff2, font-display: swap) at build time, so there is no
// render-blocking request to a font CDN.
export const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const sansUi = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-ui",
  weight: ["400", "500", "600"],
  display: "swap",
});
