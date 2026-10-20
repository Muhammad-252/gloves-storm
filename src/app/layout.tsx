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
    default: "Gloves Storm | Custom Clothing & Sportswear Manufacturer — International Exporter",
    template: "%s | Gloves Storm — Custom Apparel Manufacturer & Exporter",
  },
  description:
    "International OEM/ODM manufacturer and exporter of custom clothing, sportswear, activewear, and private label apparel. Serving brands across the USA, UK, Europe, and worldwide. Low MOQ, 7-day sampling, door-to-door DDP export delivery.",
  keywords: [
    "custom clothing manufacturer",
    "custom sportswear manufacturer",
    "clothing manufacturing",
    "sportswear manufacturing",
    "private label clothing",
    "apparel exports",
    "OEM sportswear manufacturer",
    "custom team uniforms manufacturer",
    "custom gym wear manufacturer",
    "private label activewear manufacturer",
    "custom streetwear manufacturer",
    "wholesale apparel manufacturer",
    "cut and sew clothing manufacturer",
    "sublimation sports jerseys manufacturer",
    "apparel exporter USA UK",
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
    title: "Gloves Storm | Custom Clothing & Sportswear Manufacturer & Exporter",
    description:
      "Professional international OEM/ODM manufacturer and exporter of custom clothing, sportswear, fitness apparel, and private label collections. Low MOQ, rapid prototyping, global DDP delivery.",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Clothing and Sportswear OEM Manufacturer & Exporter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gloves Storm | Custom Clothing & Sportswear Manufacturer & Exporter",
    description:
      "International OEM manufacturer & exporter of custom clothing, team sportswear, activewear, and private label apparel. Serving USA, UK, and global brands.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.glovesstorm.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
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
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.glovesstorm.com/#logo",
        url: "https://www.glovesstorm.com/images/logo.png",
        contentUrl: "https://www.glovesstorm.com/images/logo.png",
        width: 1024,
        height: 1024,
        caption: "Gloves Storm",
      },
      image: "https://www.glovesstorm.com/images/logo.png",
      description:
        "International OEM and private label manufacturer and exporter of custom clothing, sportswear, activewear, streetwear, and team uniforms. Direct factory manufacturing facility with global export corridors to the USA, UK, EU, and worldwide.",
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
        "Worldwide",
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
        name: "Custom Clothing & Sportswear Manufacturing Divisions",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Custom Sportswear & Team Uniforms",
          },
          {
            "@type": "OfferCatalog",
            name: "Gym & Fitness Activewear",
          },
          {
            "@type": "OfferCatalog",
            name: "Streetwear & Heavyweight Apparel",
          },
          {
            "@type": "OfferCatalog",
            name: "Custom Manufacturing & Private Label Services",
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
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.glovesstorm.com/products?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
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
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden sm:block" aria-hidden="true">
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
