import type { NextConfig } from "next";
import path from "node:path";

// Static export: every page is pre-rendered to HTML at build time and served by
// Cloudflare Pages. Publishing in Sanity triggers a rebuild via a deploy hook.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
