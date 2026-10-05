import HeroSection from "@/components/home/HeroSection";
import ManufacturingTrustBanner from "@/components/home/ManufacturingTrustBanner";
import CategoryGridSection from "@/components/home/CategoryGridSection";
import CategoryShowcaseSection from "@/components/home/CategoryShowcaseSection";
import OemManufacturingBanner from "@/components/home/OemManufacturingBanner";
import BrandStatementSection from "@/components/home/BrandStatementSection";
import ProcessSection from "@/components/home/ProcessSection";
import FactoryCapabilitiesSection from "@/components/home/FactoryCapabilitiesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import WhoWeWorkWithSection from "@/components/home/WhoWeWorkWithSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GlobalReachSection from "@/components/home/GlobalReachSection";
import HomeFaqSection from "@/components/home/HomeFaqSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import type { Metadata } from "next";
import {
  getProducts,
  getProjects,
} from "@/lib/data/store";
import { loadPersistedCategories } from "@/lib/data/categoryPersistence";

export const metadata: Metadata = {
  title: "Custom Boxing Gloves & Sportswear OEM Manufacturer — Gloves Storm",
  description:
    "Direct Sialkot factory for custom boxing gloves, fight gear, sportswear and activewear. USA & UK brands. MOQ from 25 pcs. 7-day samples. DDP worldwide. Free tech pack review.",
  alternates: {
    canonical: "https://www.glovesstorm.com",
  },
};

export const revalidate = 60; // ISR revalidation

const homeOrgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gloves Storm",
  url: "https://www.glovesstorm.com",
  logo: "https://www.glovesstorm.com/images/og-default.jpg",
  description:
    "OEM and private label manufacturer of custom boxing gloves, fight gear, sportswear, activewear and streetwear. Based in Sialkot, Pakistan. Serving USA and UK brands since 2019.",
  foundingDate: "2019",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industrial Estate",
    addressLocality: "Sialkot",
    addressRegion: "Punjab",
    postalCode: "51310",
    addressCountry: "PK",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+92-341-7146935",
      contactType: "sales",
      availableLanguage: "English",
      areaServed: ["US", "GB", "EU", "CA", "AU"],
    },
  ],
  email: "glovesstorm@gmail.com",
  sameAs: [
    "https://www.instagram.com/glovesstorm/",
    "https://www.linkedin.com/company/gloves-storm/",
  ],
  knowsAbout: [
    "Custom Boxing Gloves Manufacturing",
    "OEM Sportswear Manufacturing",
    "Private Label Activewear",
    "Fight Gear Manufacturing",
    "Custom Team Uniforms",
    "Sialkot Sports Goods",
  ],
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where are Gloves Storm boxing gloves manufactured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gloves Storm boxing gloves are manufactured at our direct factory in Sialkot, Pakistan. Sialkot produces over 70% of the world's hand-stitched sports goods and has been the global hub for boxing glove manufacturing for over a century.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum order quantity for custom boxing gloves?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum order quantity for custom boxing gloves at Gloves Storm is 25–50 pairs per design, depending on the style. We work with startup brands and established distributors alike.",
      },
    },
    {
      "@type": "Question",
      name: "Do you manufacture custom boxing gloves for USA brands?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The USA is our primary export market. We manufacture custom boxing gloves, fight gear, sportswear and activewear for USA brands, gyms, sports teams and distributors with door-to-door DDP air and sea shipping.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to get a sample of custom boxing gloves?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-production master samples for custom boxing gloves are produced in 7–10 working days at Gloves Storm. Samples are shipped directly to your doorstep for fit, feel and quality sign-off before bulk production begins.",
      },
    },
    {
      "@type": "Question",
      name: "Can Gloves Storm manufacture private label sportswear for my brand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Gloves Storm is a full private label manufacturer. Every product is produced with your branding: custom woven neck labels, hang tags, embossed patches, barcoding and retail-ready packaging. Your customers only ever see your brand.",
      },
    },
  ],
};

export default async function HomePage() {
  const [categories, products, projects] = await Promise.all([
    loadPersistedCategories(),
    getProducts(),
    getProjects(true),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Homepage JSON-LD Schema markup for Google & AI Platforms */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeOrgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      {/* 01 — OPTIMIZED HERO BANNER */}
      <HeroSection />

      {/* 02 — B2B MANUFACTURING CREDENTIALS & TRUST TICKER */}
      <ManufacturingTrustBanner />

      {/* 03 — BESPOKE MANUFACTURING DIVISIONS (CATEGORIES) */}
      <CategoryGridSection categories={categories} />

      {/* 04 — DIFFERENT CATEGORIES PRODUCTS SHOWCASE */}
      <CategoryShowcaseSection products={products} categories={categories} />

      {/* 05 — PREMIUM OEM & PRIVATE LABEL BRANDING BANNER */}
      <OemManufacturingBanner />

      {/* 06 — BRAND STATEMENT & 7-STAGE MANUFACTURING LIFECYCLE */}
      <BrandStatementSection />

      {/* 07 — SIX-STEP PRODUCTION TIMELINE */}
      <ProcessSection />

      {/* 08 — SIALKOT FACTORY CAPABILITIES & MACHINERY */}
      <FactoryCapabilitiesSection />

      {/* 09 — WHY CHOOSE GLOVES STORM (PARTNERSHIP ADVANTAGE) */}
      <WhyUsSection />

      {/* 10 — WHO WE WORK WITH (BRANDS, GYMS, STARTUPS) */}
      <WhoWeWorkWithSection />

      {/* 11 — PREVIOUS WORK & CLIENT PRODUCTION DROPS */}
      <FeaturedProjectsSection projects={projects} />

      {/* 12 — TRUSTED BY BRANDS IN (OPTION B TRUST SIGNALS) */}
      <TestimonialsSection />

      {/* 13 — GLOBAL EXPORT REACH & 3D INTERACTIVE GLOBE / MAP */}
      <GlobalReachSection />

      {/* 14 — FAQS (FOR HUMAN BUYERS & AI SEARCH OVERVIEWS) */}
      <HomeFaqSection />

      {/* 15 — FINAL HIGH-CONVERSION CTA BANNER */}
      <FinalCtaSection />
    </div>
  );
}
