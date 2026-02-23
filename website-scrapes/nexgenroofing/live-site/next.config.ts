import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Bypass Next.js image optimization API which fails on some local setups without sharp
  }
};

export default nextConfig;
