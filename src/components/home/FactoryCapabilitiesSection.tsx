"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";
import FactoryPhotoPlaceholder from "../ui/FactoryPhotoPlaceholder";

const capabilities = [
  {
    title: "Computerized Laser Cutting",
    machine: "Gerber Spreading & Laser Cutters",
    process: "Automated Cutting",
    category: "Cutting",
    iconType: "laser" as const,
    alt: "Computerized Gerber laser cutting machines at Gloves Storm Sialkot factory",
    description:
      "Computerized Gerber spreading and high-precision laser cutters ensuring sub-millimeter edge tolerances across complex fight glove and jersey patterns.",
  },
  {
    title: "Industrial Juki Stitching Lines",
    machine: "Juki Heavy-Duty Sewing Lines",
    process: "Precision Stitching",
    category: "Stitching",
    iconType: "stitching" as const,
    alt: "Industrial Juki 4-needle stitching lines at Gloves Storm apparel manufacturing facility Sialkot",
    description:
      "Dedicated production lines equipped with Juki heavy-duty cylinder-bed, 4-needle flatlock, and automatic bar-tack sewing stations for indestructible seams.",
  },
  {
    title: "Italian Digital Sublimation",
    machine: "Kiian Digital Dye Transfer",
    process: "Dye Sublimation",
    category: "Sublimation",
    iconType: "sublimation" as const,
    alt: "Italian Kiian digital dye sublimation machines at Gloves Storm Sialkot factory",
    description:
      "Industrial wide-format digital dye transfer machines running authentic Italian Kiian inks for deep, non-fading photographic sportswear prints.",
  },
  {
    title: "Tajima Computerized Embroidery",
    machine: "Tajima 12-Needle Multi-Head",
    process: "3D Puff Embroidery",
    category: "Embroidery",
    iconType: "embroidery" as const,
    alt: "Tajima 12-needle 3D puff embroidery machines at Gloves Storm manufacturing facility",
    description:
      "Multi-head computerized embroidery suites capable of 3D puff, metallic gold/silver thread, and complex felt collegiate badges.",
  },
  {
    title: "Screen & DTF Printing",
    machine: "Automatic Carousel & DTF Presses",
    process: "Apparel Printing",
    category: "Printing",
    iconType: "printing" as const,
    alt: "Automatic carousel screen printing and DTF machines at Gloves Storm factory Sialkot Pakistan",
    description:
      "Automatic carousel screen presses supporting discharge inks, high-density silicone, reflective 3M coatings, and direct-to-film transfers.",
  },
  {
    title: "AQL 2.5 Quality Control",
    machine: "Multi-Point AQL Inspection Line",
    process: "Quality Control",
    category: "Quality Control",
    iconType: "qc" as const,
    alt: "AQL 2.5 quality control inspection at Gloves Storm boxing gloves and sportswear factory",
    description:
      "Rigorous needle detection, pull-force hardware testing, color fastness checks, and dimensional verification before custom branded packing.",
  },
];

export default function FactoryCapabilitiesSection() {
  return (
    <section className="py-24 sm:py-32 bg-white border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Rewritten SEO Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/[0.07] gap-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              In-House Industrial Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.05]">
              MANUFACTURING &amp; TECHNICAL CAPABILITIES
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              90+ verified product specifications across boxing equipment, sportswear, activewear and streetwear. Every product manufactured at our direct Sialkot factory with in-house sublimation, embroidery, cutting and QC.
            </p>
          </div>
          <GooeyButton
            href="/manufacturing"
            variant="outline"
            size="sm"
          >
            <span>Explore Technical Equipment</span>
            <ArrowUpRight className="w-4 h-4" />
          </GooeyButton>
        </div>

        {/* Capabilities Grid with Modern Rounded Cards and Factory Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group bg-[#F9FAFB] rounded-3xl border border-black/[0.08] hover:border-amber-500/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              {/* TODO: Replace with real factory photo */}
              <div className="relative h-60 w-full overflow-hidden bg-neutral-900 p-2">
                <FactoryPhotoPlaceholder
                  machineName={cap.machine}
                  processName={cap.process}
                  alt={cap.alt}
                  iconType={cap.iconType}
                />
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 tracking-tight group-hover:text-amber-800 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
                    Sialkot Factory Unit
                  </span>
                  <Link
                    href="/manufacturing"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-700 transition-colors"
                  >
                    <span>Full Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
