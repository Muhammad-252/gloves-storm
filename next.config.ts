import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "glovesstorm.com" }],
        destination: "https://www.glovesstorm.com/:path*",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/previous-work",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/previous-work",
        permanent: true,
      },
      {
        source: "/manufacturing",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/products/boxing-equipment",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/products/boxing-equipment/:slug*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/products/swimwear-beachwear",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/products/swimwear-beachwear/:slug*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/customize",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/journal/how-championship-boxing-gloves-are-made",
        destination: "/journal",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "/journal",
      },
      {
        source: "/blog/:slug*",
        destination: "/journal/:slug*",
      },
    ];
  },
};

export default nextConfig;
