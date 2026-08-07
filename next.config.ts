import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",           // static HTML export for Render Static Site
  trailingSlash: true,        // ensures pages resolve correctly on CDN
  images: {
    unoptimized: true,        // required for static export (no Next image server)
  },
};

export default nextConfig;
