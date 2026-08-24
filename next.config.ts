import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // AVIF first: the hero and the portfolio grid are the page weight here,
    // and AVIF lands well below WebP at the same quality. Browsers without
    // support fall through to WebP and then to the original.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
