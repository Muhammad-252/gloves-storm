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
    alt: "Computerized Gerber laser cutting machines at Gloves Storm apparel factory",
    description:
      "Computerized Gerber spreading and high-precision laser cutters ensuring sub-millimeter edge tolerances across complex sportswear, activewear panels, and jersey patterns.",
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
    alt: "AQL 2.5 quality control inspection at Gloves Storm custom apparel and sportswear factory",
    description:
      "Rigorous needle detection, pull-force hardware testing, color fastness checks, and dimensional verification before custom branded packing.",
  },
];

export default function FactoryCapabilitiesSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-white border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Rewritten SEO Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-5 sm:pb-6 border-b border-black/[0.07] gap-5 sm:gap-6">
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
              In-House Industrial Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.08] sm:leading-[1.05]">
              APPAREL MANUFACTURING &amp; TECHNICAL CAPABILITIES
            </h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Engineered specifications across custom teamwear, gym activewear, hoodies, and streetwear. Every garment manufactured at our direct production facilities with in-house sublimation, embroidery, laser cutting, and multi-stage QC.
            </p>
          </div>
          <GooeyButton
            href="/about"
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            <span>Learn About Production</span>
            <ArrowUpRight className="w-4 h-4" />
          </GooeyButton>
        </div>

        {/* Capabilities Grid with Modern Rounded Cards and Factory Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group bg-[#F9FAFB] rounded-2xl sm:rounded-3xl border border-black/[0.08] hover:border-black/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              {/* Factory photo placeholder */}
              <div className="relative h-44 sm:h-52 md:h-60 w-full overflow-hidden bg-neutral-900 p-2">
                <FactoryPhotoPlaceholder
                  machineName={cap.machine}
                  processName={cap.process}
                  alt={cap.alt}
                  iconType={cap.iconType}
                />
              </div>

              <div className="p-4 sm:p-6 lg:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-1.5 sm:mb-2 tracking-tight group-hover:text-black transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
                    Export Certified Unit
                  </span>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-900 hover:text-[#FFB900] transition-colors"
                  >
                    <span>Quality Standards</span>
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
