import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // The hero portrait blends into a pure black page, so it gets a higher
    // quality tier than the default to avoid compression artefacts.
    qualities: [75, 92],
  },
};

export default nextConfig;
