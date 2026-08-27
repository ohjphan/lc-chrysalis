import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/community", destination: "/demos", permanent: true },
      {
        source: "/community/projects/:slug",
        destination: "/demos/projects/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
