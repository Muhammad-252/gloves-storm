"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Check } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";

const customizationItems = [
  {
    id: "embroidery",
    title: "Precision Embroidery & Chenille",
    category: "Embellishment",
    description:
      "From high-stitch-count metallic thread logos to vintage collegiate chenille and felt appliques, our Tajima computerized embroidery machines deliver millimeter-sharp tactile branding.",
    specs: [
      "Up to 15,000 stitches per panel",
      "Felt, twill, and metallic yarn options",
      "No thread pulling or puckering on heavy fabrics",
    ],
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "sublimation",
    title: "Italian Dye Sublimation",
    category: "Digital Color",
    description:
      "True molecular dye sublimation infused directly into polyester and lycra fibers. Guaranteed zero fading, cracking, or peeling across 100+ industrial wash cycles.",
    specs: [
      "Eco-friendly water-based Italian inks",
      "Photographic resolution gradients",
      "100% breathable with zero ink hand-feel",
    ],
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "puff-print",
    title: "3D High-Density & Puff Screen Printing",
    category: "Streetwear Finishes",
    description:
      "Elevate hoodies and tees with dimensional raised 3D puff plastisol or water-based silicone prints. Generates an architectural relief that stands out on 450 GSM French Terry.",
    specs: [
      "Controlled 2mm to 4mm height expansion",
      "Elasticated silicone additives prevent cracking",
      "Pantone color matching with matte or gloss topcoat",
    ],
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "rubber-patches",
    title: "Molded Rubber PVC & Silicone Patches",
    category: "Combat & Hardware",
    description:
      "Custom 3D molded PVC and soft rubber badges engineered for fight glove wrist straps, outerwear sleeves, and duffel bags. Resists sweat, friction, and extreme conditions.",
    specs: [
      "Multi-level dimensional molding",
      "Micro-groove perimeter for secure double-stitching",
      "Velcro backing or direct sewing channel",
    ],
    image:
      "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "packaging",
    title: "Custom Labels, Hang Tags & Packaging",
    category: "Private Label Presentation",
    description:
      "Complete your retail experience with custom woven damask neck labels, soft-touch matte hang tags, branded metal aglets, and biodegradable frosted zip slider polybags.",
    specs: [
      "High-definition 100-denier woven damask labels",
      "FSC-certified heavyweight hang tags with metal grommets",
      "Custom barcoded retail packaging",
    ],
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CustomizationSection() {
  const [activeItem, setActiveItem] = useState(customizationItems[0]);

  return (
    <section className="py-24 sm:py-32 bg-white border-b border-neutral-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-xs font-mono uppercase tracking-[0.25em] text-amber-900 font-bold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Artisan Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-950 leading-[1.0] mb-6">
            EVERY DETAIL <br />
            <span className="text-neutral-500">IS YOURS.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Your brand identity should never be constrained by factory limitations. We engineer every seam, print, label, and raw fabric component around your exact creative vision.
          </p>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Technique Selector Cards */}
          <div className="lg:col-span-5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 gap-3 scrollbar-none">
            {customizationItems.map((item) => {
              const isSelected = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all border cursor-pointer shrink-0 w-[240px] sm:w-[280px] lg:w-full ${
                    isSelected
                      ? "bg-amber-50/80 border-amber-500 shadow-xs"
                      : "bg-neutral-50/70 border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800 font-bold">
                      {item.category}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.6)]" />
                    )}
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-bold uppercase tracking-tight transition-colors line-clamp-1 ${
                      isSelected ? "text-neutral-950" : "text-neutral-600"
                    }`}
                  >
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive Feature Stage Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden relative">
            {/* Visual Image Banner */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-100">
              <Image
                src={activeItem.image}
                alt={`${activeItem.title} - Custom Manufacturing Capabilities by Gloves Storm`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-700 ease-out scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
            </div>

            {/* Description & Technical Specs */}
            <div className="p-8">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-800 font-bold block mb-2">
                {activeItem.category} Standard
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-950 mb-4">
                {activeItem.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {activeItem.description}
              </p>

              {/* Specs Bullet List */}
              <div className="space-y-2.5 mb-8 border-t border-neutral-100 pt-5">
                {activeItem.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-100">
                <span className="text-xs text-neutral-500">
                  All techniques available on direct OEM orders
                </span>
                <GooeyButton
                  href="/contact"
                  variant="gold-solid"
                  size="sm"
                >
                  <span>Inquire About Finishes</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </GooeyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
