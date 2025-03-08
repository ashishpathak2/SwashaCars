import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during `next build`
  },
  // Other config options can go here
};

export default nextConfig;
