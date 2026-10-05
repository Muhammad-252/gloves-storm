import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.glovesstorm.com"),
  title: {
    default: "Gloves Storm | Custom Boxing Gloves & Sportswear Manufacturer — Sialkot, Pakistan",
    template: "%s | Gloves Storm — OEM Manufacturer",
  },
  description:
    "Custom boxing gloves, sportswear, activewear and fight gear manufacturer for USA and UK brands. Low MOQ from 25 pcs, 7-day samples, door-to-door shipping. OEM/ODM private label. Direct Sialkot factory since 2019.",
  keywords: [
    "custom boxing gloves manufacturer",
    "boxing gloves OEM manufacturer",
    "private label boxing gloves",
    "custom sportswear manufacturer",
    "OEM activewear manufacturer",
    "private label clothing manufacturer USA",
    "custom team uniforms manufacturer",
    "fight gear manufacturer Sialkot",
    "boxing equipment manufacturer Pakistan",
    "custom MMA gloves manufacturer",
    "wholesale sports goods supplier",
    "custom gym wear manufacturer",
    "private label hoodie manufacturer",
  ],
  authors: [{ name: "Gloves Storm", url: "https://www.glovesstorm.com" }],
  creator: "Gloves Storm",
  publisher: "Gloves Storm",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.glovesstorm.com",
    siteName: "Gloves Storm",
    title: "Gloves Storm | Custom Boxing Gloves & Sportswear Manufacturer",
    description:
      "Direct OEM factory for custom boxing gloves, fight gear, team sportswear and activewear. Serving USA and UK brands since 2019. Low MOQ, 7-day sampling, DDP worldwide shipping.",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Boxing Gloves and Sportswear OEM Manufacturer Sialkot Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gloves Storm | Custom Boxing Gloves & Sportswear Manufacturer",
    description:
      "OEM manufacturer for custom boxing gloves, fight gear, sportswear and activewear. USA & UK brands. Low MOQ, direct factory.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.glovesstorm.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "googlec66e29b6126c6554",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.glovesstorm.com/#organization",
      name: "Gloves Storm",
      url: "https://www.glovesstorm.com",
      logo: "https://www.glovesstorm.com/images/logo.png",
      image: "https://www.glovesstorm.com/images/logo.png",
      description:
        "OEM and private label manufacturer of custom boxing gloves, fight gear, sportswear, activewear and streetwear. Based in Sialkot, Pakistan. Serving USA and UK brands since 2019.",
      telephone: "+92-341-7146935",
      email: "glovesstorm@gmail.com",
      priceRange: "$$",
      currenciesAccepted: "USD, EUR, GBP, AUD, CAD",
      paymentAccepted: "Wire Transfer, Bank Transfer, L/C, Western Union",
      areaServed: [
        "United States",
        "United Kingdom",
        "European Union",
        "Canada",
        "Australia",
        "United Arab Emirates",
        "Saudi Arabia",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Industrial Estate",
        addressLocality: "Sialkot",
        addressRegion: "Punjab",
        postalCode: "51310",
        addressCountry: "PK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "32.4945",
        longitude: "74.5229",
      },
      hasMap: "https://maps.google.com/?q=Sialkot+Industrial+Estate",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/glovesstorm/",
        "https://www.linkedin.com/company/gloves-storm/",
        "https://facebook.com/glovesstorm",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "OEM Sports & Combat Gear Manufacturing Divisions",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Boxing Equipment & Fight Gear",
          },
          {
            "@type": "OfferCatalog",
            name: "Custom Sportswear & Team Uniforms",
          },
          {
            "@type": "OfferCatalog",
            name: "Gym & Fitness Compression Wear",
          },
          {
            "@type": "OfferCatalog",
            name: "Luxury Heavyweight Streetwear",
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.glovesstorm.com/#website",
      url: "https://www.glovesstorm.com",
      name: "Gloves Storm",
      publisher: {
        "@id": "https://www.glovesstorm.com/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900 relative"
        suppressHydrationWarning
      >
        {/* Fixed Ambient Radial Gradient Orbs for Frosted Glass Refraction */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-slate-200/60 blur-3xl opacity-75" />
          <div className="absolute top-1/4 -right-40 w-[700px] h-[700px] rounded-full bg-slate-300/40 blur-3xl opacity-65" />
          <div className="absolute top-2/3 left-1/3 w-[600px] h-[600px] rounded-full bg-slate-200/50 blur-3xl opacity-50" />
        </div>

        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <WhatsAppButton />

        {/* Global SVG Gooey Filter for Liquid Pill Buttons */}
        <svg
          className="pointer-events-none fixed -top-[9999px] -left-[9999px] h-0 w-0"
          aria-hidden="true"
        >
          <defs>
            <filter id="gooey-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
