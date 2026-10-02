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
import FinalCtaSection from "@/components/home/FinalCtaSection";
import type { Metadata } from "next";
import {
  getCategories,
  getProducts,
  getProjects,
  getTestimonials,
} from "@/lib/data/store";

export const metadata: Metadata = {
  title: "GLOVES STORM — Custom Sports Apparel & Boxing Glove OEM Manufacturer",
  description:
    "Direct factory OEM & private label manufacturer for custom boxing gloves, combat equipment, team sportswear, and heavyweight streetwear in Sialkot, Pakistan.",
  alternates: {
    canonical: "/",
  },
};

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [categories, products, projects, testimonials] = await Promise.all([
    getCategories(),
    getProducts(),
    getProjects(true),
    getTestimonials(true),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* ────────────────────────────────────────────────────────── */}
      {/* START SECTIONS: HERO, CATEGORIES & CATEGORY PRODUCTS       */}
      {/* ────────────────────────────────────────────────────────── */}

      {/* 01 — PREMIUM LIGHT MODE HERO BANNER */}
      <HeroSection />

      {/* 02 — B2B MANUFACTURING CREDENTIALS & TRUST TICKER */}
      <ManufacturingTrustBanner />

      {/* 03 — BESPOKE MANUFACTURING DIVISIONS (CATEGORIES) */}
      <CategoryGridSection categories={categories} />

      {/* 04 — DIFFERENT CATEGORIES PRODUCTS SHOWCASE */}
      <CategoryShowcaseSection products={products} categories={categories} />

      {/* 05 — PREMIUM OEM & PRIVATE LABEL BRANDING BANNER */}
      <OemManufacturingBanner />

      {/* ────────────────────────────────────────────────────────── */}
      {/* CONTENT SECTIONS: LIFECYCLE, FACTORY, TRUST & TESTIMONIALS */}
      {/* ────────────────────────────────────────────────────────── */}

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

      {/* 12 — VERIFIED CLIENT TESTIMONIALS */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 13 — GLOBAL EXPORT REACH & 3D INTERACTIVE GLOBE */}
      <GlobalReachSection />

      {/* 14 — FINAL HIGH-CONVERSION CTA BANNER */}
      <FinalCtaSection />
    </div>
  );
}
