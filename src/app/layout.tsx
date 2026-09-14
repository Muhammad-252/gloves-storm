import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "GLOVES STORM" }],
  creator: "GLOVES STORM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://glovesstorm.com",
    title: "GLOVES STORM — Premium B2B Manufacturing Partner",
    description:
      "World-class custom manufacturing for boxing gear, athletic team wear, and luxury streetwear brands worldwide.",
    siteName: "GLOVES STORM",
  },
  twitter: {
    card: "summary_large_image",
    title: "GLOVES STORM — Premium B2B Manufacturing",
    description:
      "Direct OEM manufacturing partner for custom boxing gear, team uniforms, and performance streetwear.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body
        className="min-h-full flex flex-col bg-white text-[#1A1A1A]"
        suppressHydrationWarning
      >
        <CustomCursor />
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
