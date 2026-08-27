import type { NextConfig } from "next";
import path from "path";

// Private GitHub Pages for this org uses a root subdomain
// (*.pages.github.io), not /{repo} project-page paths.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
