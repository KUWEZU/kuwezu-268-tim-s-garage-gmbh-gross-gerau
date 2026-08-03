import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // Lokale SVG-Platzhalter
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // R2 Custom Domain für echte Bilder
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r2.kuwezu.de",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
