import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Script from "next/script";
import { BUSINESS_CONFIG } from "@/lib/business";

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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F6F4EF",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.glovesstorm.com"),
  title: {
    default: "Custom Sportswear Manufacturer, Low MOQ | Gloves Storm",
    template: "%s | Gloves Storm",
  },
  description:
    "Direct OEM apparel factory in Sialkot, Pakistan. Custom sportswear, team uniforms, gym wear, and hoodies. Low MOQ 30 pcs, 5–7 day samples, DDP shipping.",
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
    title: "Custom Sportswear Manufacturer, Low MOQ | Gloves Storm",
    description:
      "Direct OEM apparel factory in Sialkot, Pakistan. Custom sportswear, team uniforms, gym wear, and hoodies. Low MOQ 30 pcs, 5–7 day samples, DDP shipping.",
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
    title: "Custom Sportswear Manufacturer, Low MOQ | Gloves Storm",
    description:
      "Direct OEM apparel factory in Sialkot, Pakistan. Custom sportswear, team uniforms, gym wear, and hoodies. Low MOQ 30 pcs, 5–7 day samples, DDP shipping.",
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
    other: {
      "msvalidate.01": "37E07F31CF84CCD99CCE11959F1D8B3D",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.glovesstorm.com/#organization",
      name: BUSINESS_CONFIG.name,
      legalName: BUSINESS_CONFIG.legalName,
      url: "https://www.glovesstorm.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.glovesstorm.com/#logo",
        url: "https://www.glovesstorm.com/images/logo.png",
        contentUrl: "https://www.glovesstorm.com/images/logo.png",
        width: 1024,
        height: 1024,
        caption: BUSINESS_CONFIG.name,
      },
      image: "https://www.glovesstorm.com/images/logo.png",
      description:
        "International OEM and private label manufacturer and exporter of custom clothing, sportswear, activewear, streetwear, and team uniforms. Direct factory manufacturing facility with global export corridors to the USA, UK, EU, and worldwide.",
      telephone: BUSINESS_CONFIG.phone,
      email: BUSINESS_CONFIG.email,
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
        streetAddress: BUSINESS_CONFIG.address.street,
        addressLocality: BUSINESS_CONFIG.address.city,
        addressRegion: BUSINESS_CONFIG.address.region,
        postalCode: BUSINESS_CONFIG.address.postalCode,
        addressCountry: BUSINESS_CONFIG.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "32.4945",
        longitude: "74.5229",
      },
      hasMap: BUSINESS_CONFIG.address.mapUrl,
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
          opens: BUSINESS_CONFIG.operatingHours.opens,
          closes: BUSINESS_CONFIG.operatingHours.closes,
        },
      ],
      sameAs: [
        BUSINESS_CONFIG.social.instagram,
        BUSINESS_CONFIG.social.linkedin,
        BUSINESS_CONFIG.social.facebook,
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
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
        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MRDB4P5J"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-bone text-ink relative"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRDB4P5J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
