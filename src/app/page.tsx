import HeroSection from "@/components/home/HeroSection";
import BrandStatementSection from "@/components/home/BrandStatementSection";
import CategoryGridSection from "@/components/home/CategoryGridSection";
import ProductExplorerSection from "@/components/home/ProductExplorerSection";
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
    <div className="flex flex-col min-h-screen">
      {/* SECTION 01 — CINEMATIC HERO */}
      <HeroSection />

      {/* SECTION 02 — BRAND STATEMENT & 7-STAGE LIFECYCLE */}
      <BrandStatementSection />

      {/* SECTION 03 — PRODUCT CATEGORIES */}
      <CategoryGridSection categories={categories} />

      {/* SECTION 04 — PRODUCT EXPLORER */}
      <ProductExplorerSection products={products} categories={categories} />

      {/* SECTION 05 — MANUFACTURING PROCESS TIMELINE */}
      <ProcessSection />

      {/* SECTION 07 — FACTORY / CAPABILITIES */}
      <FactoryCapabilitiesSection />

      {/* SECTION 08 — WHY GLOVES STORM */}
      <WhyUsSection />

      {/* SECTION 09 — WHO WE WORK WITH */}
      <WhoWeWorkWithSection />

      {/* SECTION 10 — PROJECTS / CASE STUDIES */}
      <FeaturedProjectsSection projects={projects} />

      {/* SECTION 11 — TESTIMONIALS */}
      <TestimonialsSection testimonials={testimonials} />

      {/* SECTION 12 — GLOBAL REACH */}
      <GlobalReachSection />

      {/* SECTION 13 — FINAL FULLSCREEN CTA */}
      <FinalCtaSection />
    </div>
  );
}
