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
  metadataBase: new URL("https://glovesstorm.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "GLOVES STORM — Premium B2B Sports & Apparel Manufacturing",
    template: "%s | GLOVES STORM",
  },
  description:
    "Long-term OEM, private label, and custom manufacturing partner for global sports brands, fight academies, teams, and luxury streetwear labels. Handcrafted in Sialkot, Pakistan.",
  keywords: [
    "Boxing Gloves Manufacturer",
    "Custom Sportswear OEM",
    "Private Label Manufacturing",
    "Sialkot Sports Goods",
    "Team Uniforms Wholesale",
    "Streetwear Hoodies Factory",
    "Custom Fight Gear",
    "Varsity Jacket Manufacturer",
    "AQL 2.5 Quality Inspection",
  ],
  authors: [{ name: "GLOVES STORM" }],
  creator: "GLOVES STORM",
  publisher: "GLOVES STORM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://glovesstorm.com",
    title: "GLOVES STORM — Premium B2B Sports & Apparel Manufacturing",
    description:
      "Direct factory OEM & private label partner for boxing gloves, fight gear, athletic teamwear, and luxury streetwear in Sialkot, Pakistan.",
    siteName: "GLOVES STORM",
    images: [
      {
        url: "/images/products/boxing-gloves-black.png",
        width: 1200,
        height: 630,
        alt: "GLOVES STORM — Handcrafted Boxing Equipment & Apparel Manufacturing Sialkot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GLOVES STORM — Premium B2B Sports & Apparel Manufacturing",
    description:
      "Direct OEM manufacturing partner for custom boxing gear, team uniforms, and performance streetwear. Sialkot, Pakistan.",
    images: ["/images/products/boxing-gloves-black.png"],
  },
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
  verification: {
    google: "googlec66e29b6126c6554",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://glovesstorm.com/#organization",
      name: "GLOVES STORM",
      url: "https://glovesstorm.com",
      logo: "https://glovesstorm.com/images/products/boxing-gloves-black.png",
      image: "https://glovesstorm.com/images/products/boxing-gloves-black.png",
      description:
        "Long-term OEM, private label, and custom manufacturing partner for global sports brands, fight academies, teams, and luxury streetwear labels in Sialkot, Pakistan.",
      telephone: "+923417146935",
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
      "@id": "https://glovesstorm.com/#website",
      url: "https://glovesstorm.com",
      name: "GLOVES STORM",
      publisher: {
        "@id": "https://glovesstorm.com/#organization",
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
