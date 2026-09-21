import Link from "next/link";
import {
  Factory,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Box,
  Truck,
  ArrowUpRight,
} from "lucide-react";
import GooeyButton from "@/components/ui/GooeyButton";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Capabilities & Sialkot Factory | GLOVES STORM",
  description:
    "Explore our 45,000 sq ft industrial facility in Sialkot, Pakistan. Technical machinery, sublimation printing, precision laser cutting, and 4-stage quality control.",
  alternates: {
    canonical: "/manufacturing",
  },
};

const machinery = [
  {
    name: "Tajima Multi-Head Computerized Embroidery",
    specs: "Japanese computerized embroidery machines capable of 15,000 stitches per panel with 3D puff and metallic yarn calibration.",
    type: "Embellishment",
  },
  {
    name: "Gerber Automatic Spreading & Laser Cutters",
    specs: "Automated digital pattern projection and laser cutting with 0.2mm precision tolerances across heavy leather and 4-way stretch fabrics.",
    type: "Pre-Production & Cutting",
  },
  {
    name: "Juki Industrial Heavy Cylinder & Flatlock Stitching",
    specs: "Specialized post-bed and 4-needle flatlock machines built for reinforced combat glove seams and frictionless athletic apparel.",
    type: "Stitching & Assembly",
  },
  {
    name: "Kiian Industrial Wide-Format Sublimation Press",
    specs: "Italian molecular digital dye transfer printers operating at 1200 DPI for vibrant, fade-proof performance sportswear prints.",
    type: "Color & Printing",
  },
  {
    name: "M&R Automated Carousel Screen Press",
    specs: "High-volume carousel printing suites running discharge inks, high-density silicone prints, and heat-activated 3D puff coatings.",
    type: "Printing & Texture",
  },
  {
    name: "Hashima Conveyorized Needle & Metal Detector",
    specs: "100% pre-pack magnetic sensor scanning to ensure total consumer safety across all combat gear and youth athletic wear.",
    type: "Safety & Compliance",
  },
];

const qcSteps = [
  {
    stage: "Stage 01: Raw Material Lab Testing",
    desc: "Every incoming batch of leather, polyester-elastane, foam laminates, and zippers undergoes tensile strength, colorfastness, and thickness verification.",
  },
  {
    stage: "Stage 02: Pattern & Cut Panel Verification",
    desc: "Before stitching begins, cut panels are checked against digital master CAD patterns. Sublimation, screen print, and embroidery alignments are calibrated.",
  },
  {
    stage: "Stage 03: In-Line Assembly Audits",
    desc: "Floor supervisors conduct random seam tension, stitch count per inch (SPI), and foam alignment audits during the assembly process.",
  },
  {
    stage: "Stage 04: 100% Pre-Pack Inspection",
    desc: "Every single piece is individually inspected for loose threads, clean surface finishes, exact measurements, passed through needle detection, and barcoded.",
  },
];

export default function ManufacturingPage() {
  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#b45309] font-mono block mb-2">
            Infrastructure & Machinery
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0f172a] mb-6 leading-tight">
            INDUSTRIAL PRECISION. <br />
            <span className="text-neutral-500">ARTISAN CRAFTSMANSHIP.</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            GLOVES STORM combines modern European and Japanese textile machinery with the historic leather and apparel craftsmanship of Sialkot, Pakistan. We eliminate guesswork through documented engineering tolerances and transparent production milestones.
          </p>
        </div>

        {/* Factory Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <Factory className="w-6 h-6 text-[#b45309] mb-4" />
            <span className="block text-2xl font-extrabold uppercase text-[#0f172a] mb-1">
              45,000 SQ. FT.
            </span>
            <span className="text-xs text-neutral-500">Modern manufacturing and warehousing space in Sialkot</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <Cpu className="w-6 h-6 text-[#b45309] mb-4" />
            <span className="block text-2xl font-extrabold uppercase text-[#0f172a] mb-1">
              180+ WORKERS
            </span>
            <span className="text-xs text-neutral-500">Certified pattern makers, master cutters, and stitchers</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <Box className="w-6 h-6 text-[#b45309] mb-4" />
            <span className="block text-2xl font-extrabold uppercase text-[#0f172a] mb-1">
              50,000+ PCS
            </span>
            <span className="text-xs text-neutral-500">Monthly composite production capacity across combat & wear</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <Clock className="w-6 h-6 text-[#b45309] mb-4" />
            <span className="block text-2xl font-extrabold uppercase text-[#0f172a] mb-1">
              7 - 14 DAYS
            </span>
            <span className="text-xs text-neutral-500">Rapid sample prototyping turnaround with express air delivery</span>
          </div>
        </div>

        {/* Machinery Fleet */}
        <div className="mb-24">
          <div className="mb-12 pb-6 border-b border-neutral-200">
            <span className="text-xs uppercase tracking-[0.25em] text-[#b45309] font-mono block mb-2">
              Advanced Tooling
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0f172a]">
              MACHINERY & TECHNICAL FLEET
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machinery.map((m) => (
              <div
                key={m.name}
                className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-amber-500/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#b45309] block mb-2 font-bold">
                    {m.type}
                  </span>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[#0f172a] mb-3">
                    {m.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {m.specs}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                  <span>Industrial Calibrated</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Control Protocol */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-md">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#b45309] font-mono block mb-2">
              Zero-Defect Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-4">
              4-STAGE QUALITY AUDIT PROTOCOL
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We know that a single torn seam or misprinted logo can damage your brand’s relationship with your customer. That is why every garment and glove passes through four independent checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {qcSteps.map((step) => (
              <div key={step.stage} className="p-6 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-[#b45309]">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0f172a]">
                    {step.stage}
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-2">
              Ready to schedule a video factory tour or sample audit?
            </h3>
            <p className="text-xs text-neutral-600">
              Schedule a technical session with our lead engineers in Sialkot to review your tech pack specifications.
            </p>
          </div>
          <GooeyButton
            href="/contact"
            variant="gold-solid"
            size="lg"
            className="shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </GooeyButton>
        </div>
      </div>
    </div>
  );
}
