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
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
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
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
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
      // Legacy WordPress / WooCommerce URL 301 redirects to live pages
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/product-category/fitness-wears/:slug*",
        destination: "/products/gym-fitness-wear",
        permanent: true,
      },
      {
        source: "/product-category/sports-uniforms/:slug*",
        destination: "/products/sportswear-teamwear",
        permanent: true,
      },
      {
        source: "/product-category/mens/:slug*",
        destination: "/products/clothing-streetwear",
        permanent: true,
      },
      {
        source: "/product-category/casual-wear/:slug*",
        destination: "/products/clothing-streetwear",
        permanent: true,
      },
      {
        source: "/product-category/womens/:slug*",
        destination: "/products/gym-fitness-wear",
        permanent: true,
      },
      {
        source: "/product-category/:slug*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/product/:slug*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/shop/:slug*",
        destination: "/products",
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
