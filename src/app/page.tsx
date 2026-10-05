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
  title: "Custom Clothing & Sportswear Manufacturer & Exporter — Gloves Storm",
  description:
    "International OEM & private label manufacturer for custom clothing, sportswear, activewear, and streetwear. Direct factory export to USA, UK, and worldwide. Low MOQ, 7-day samples, DDP delivery.",
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
    "International OEM and private label manufacturer and exporter of custom clothing, sportswear, activewear, streetwear, and team uniforms. Direct factory export to USA, UK, and worldwide.",
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
      areaServed: ["US", "GB", "EU", "CA", "AU", "Worldwide"],
    },
  ],
  email: "glovesstorm@gmail.com",
  sameAs: [
    "https://www.instagram.com/glovesstorm/",
    "https://www.linkedin.com/company/gloves-storm/",
  ],
  knowsAbout: [
    "Custom Clothing Manufacturing",
    "Custom Sportswear Manufacturing",
    "Clothing Manufacturing",
    "Sportswear Manufacturing",
    "Private Label Clothing",
    "Apparel Exports",
    "Cut and Sew Apparel",
    "Sublimation Teamwear",
    "Activewear Manufacturing",
  ],
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What custom apparel and sportswear does Gloves Storm manufacture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gloves Storm specializes in custom clothing and sportswear manufacturing, including custom team uniforms, athletic jerseys, gym and fitness activewear, compression sets, heavyweight streetwear hoodies, varsity jackets, and complete private label apparel lines.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum order quantity (MOQ) for custom clothing and sportswear?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our minimum order quantity starts from 35–50 pieces per style/colorway. This allows growing apparel brands, sports clubs, and established fashion labels to produce custom designs with low risk and flexible sizing breakdowns.",
      },
    },
    {
      "@type": "Question",
      name: "Do you manufacture and export custom apparel to the USA and UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The USA and UK are our primary export corridors, alongside the EU, Canada, and Australia. We manage end-to-end export logistics with door-to-door DDP (Delivered Duty Paid) air freight (3–5 days) and ocean shipping, handling all customs clearance and documentation.",
      },
    },
    {
      "@type": "Question",
      name: "How long does custom clothing sampling take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-production master samples are typically completed in 5–7 working days once tech packs or design mockups are finalized. Master samples are shipped via express courier directly to you for fit, fabric hand-feel, and construction approval before full production.",
      },
    },
    {
      "@type": "Question",
      name: "What private label branding options are available for custom clothing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide full turnkey private label manufacturing: custom woven neck labels, satin wash care labels, high-density embroidery, screen printing, silicone heat transfers, custom hang tags, barcoded polybags, and retail-ready packaging.",
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
