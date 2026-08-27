import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/programs", destination: "/shows", permanent: true },
      { source: "/about", destination: "/artist", permanent: true },
      { source: "/videos", destination: "/proof#performances", permanent: true },
      { source: "/gallery", destination: "/proof#performances", permanent: true },
      { source: "/testimonials", destination: "/proof#evidence", permanent: true },
      { source: "/contact", destination: "/book", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
