import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Portfolio work is mostly dense UI screenshots, where the default
    // quality of 75 shows visible artefacts on fine text.
    qualities: [95],
    formats: ["image/webp"],
    // allow serving at full intrinsic size on high-DPI screens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
};

export default nextConfig;
