import {
  Compass,
  FileCheck2,
  TestTube2,
  Layers,
  Cpu,
  ShieldCheck,
  PackageCheck,
  PlaneTakeoff,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import GooeyButton from "../ui/GooeyButton";

const preProductionStages = [
  {
    step: "01",
    name: "Design & Digital Patterns",
    phase: "Concept & CAD",
    icon: Compass,
    description:
      "Technical feasibility analysis, digital vector grading, 3D CAD pattern generation, and tech pack alignment.",
    deliverables: ["Tech Pack Audit", "CAD Pattern Files", "Sizing Specs"],
    timeline: "24–48 Hours",
  },
  {
    step: "02",
    name: "Material & Sourcing",
    phase: "Material Engineering",
    icon: FileCheck2,
    description:
      "Direct mill fabric procurement, Pantone lab dip color matching, and specialty hardware & leather sourcing.",
    deliverables: ["Pantone Verification", "Fabric Lab Dips", "GSM Certification"],
    timeline: "3–5 Days",
  },
  {
    step: "03",
    name: "Master Prototyping",
    phase: "Sampling & Fitting",
    icon: TestTube2,
    description:
      "Physical pre-production master sample handcrafted by senior Sialkot artisans for tactile fit, weight, and ergonomic sign-off.",
    deliverables: ["Physical Fit Sample", "Fit Revision Support", "Sign-Off Approval"],
    timeline: "5–7 Days",
  },
  {
    step: "04",
    name: "Grading & Embellishment Setup",
    phase: "Industrial Tooling",
    icon: Layers,
    description:
      "CAD vector grading across full size runs (XS–5XL), Tajima embroidery punch-digitizing, high-density screen stencil burning, and custom hardware fabrication.",
    deliverables: ["Full Size Grading", "Embroidery Digitizing", "Screen Print Stencils"],
    timeline: "2–3 Days",
  },
];

const productionStages = [
  {
    step: "05",
    name: "Precision Manufacturing",
    phase: "Bulk Production",
    icon: Cpu,
    description:
      "Computerized Gerber laser spreading, master Juki 4-needle stitching lines, and Italian digital dye sublimation running at volume.",
    deliverables: ["Laser Cut Precision", "Reinforced Seam Thread", "Sublimation / Screen Print"],
    timeline: "Scalable • 50–50k Pcs",
  },
  {
    step: "06",
    name: "Triple-Point Quality Control",
    phase: "Zero-Defect Audit",
    icon: ShieldCheck,
    description:
      "In-line needle detection, pull-force hardware testing, color fastness checks, and AQL 2.5 dimensional verification before packing.",
    deliverables: ["AQL 2.5 Standard", "Needle Detection", "Defect-Free Guarantee"],
    timeline: "100% Inspected",
  },
  {
    step: "07",
    name: "Branded Packaging & Global Freight",
    phase: "Worldwide Logistics",
    icon: PlaneTakeoff,
    description:
      "Custom woven damask neck labels, soft-touch matte hang tags, barcoded frosted zip bags, and insured door-to-door air or ocean dispatch.",
    deliverables: ["Custom Hang Tags", "Frosted Zip Bags", "Door-to-Door Insured Air/Sea"],
    timeline: "Air: 3–6d • Sea: 24–32d",
  },
];

export default function BrandStatementSection() {
  return (
    <section className="py-28 sm:py-36 bg-white border-b border-black/[0.07] relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FFB900] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-900 font-bold">
                End-To-End Apparel Manufacturing Partner
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.0] mb-6">
              FROM YOUR IDEA <br />
              <span className="text-[#6B7280]">TO THE FINAL PRODUCT.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl">
              GLOVES STORM provides comprehensive turnkey OEM/ODM manufacturing and export for sports brands, athletic clubs, and designer streetwear labels worldwide. We combine precision textile engineering with automated industrial machinery to guarantee consistent, defect-free apparel production.
            </p>
          </div>

          {/* Quick CTA and highlights */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <GooeyButton href="/contact" variant="gold-solid" size="md">
              <span>Start Production</span>
              <ArrowRight className="w-4 h-4" />
            </GooeyButton>
            <GooeyButton href="/about" variant="outline" size="md">
              <span>About Production</span>
            </GooeyButton>
          </div>
        </div>

        {/* Operational Flow Roadmap */}
        <div className="space-y-12">
          {/* Phase 01: Pre-Production & Engineering */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/[0.07]">
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
                <span className="text-xs font-mono font-bold tracking-widest text-neutral-900 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md uppercase">
                  Phase 01
                </span>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800">
                  Concept, Sampling & Industrial Engineering
                </h3>
              </div>
              <span className="text-xs text-neutral-500 hidden sm:inline-block font-mono">
                Stages 01 — 04
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {preProductionStages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.step}
                    className="group relative bg-[#F9FAFB] rounded-3xl p-6 sm:p-7 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)] hover:border-black/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top row with step number and icon */}
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono font-bold text-black bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
                          Stage {stage.step}
                        </span>
                        <div className="w-10 h-10 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                        {stage.phase}
                      </span>
                      <h4 className="text-base font-bold uppercase tracking-tight text-neutral-900 mb-3 group-hover:text-black transition-colors">
                        {stage.name}
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-5">
                        {stage.description}
                      </p>

                      {/* Deliverables tags */}
                      <div className="space-y-1.5 mb-6 pt-3 border-t border-black/[0.06]">
                        {stage.deliverables.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-[11px] text-neutral-700 font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline pill footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] text-[11px] text-[#6B7280]">
                      <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{stage.timeline}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all">
                        Milestone →
                      </span>
                    </div>

                    {/* Top active hover highlight line */}
                    <div className="absolute top-0 left-8 right-8 h-[2px] bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase 02: Mass Production, Quality Assurance & Delivery */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/[0.07]">
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
                <span className="text-xs font-mono font-bold tracking-widest text-neutral-900 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md uppercase">
                  Phase 02
                </span>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800">
                  Bulk Manufacturing, Triple-Point QC & Global Shipping
                </h3>
              </div>
              <span className="text-xs text-neutral-500 hidden sm:inline-block font-mono">
                Stages 05 — 07
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {productionStages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.step}
                    className="group relative bg-[#F9FAFB] rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] hover:border-black/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono font-bold text-black bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
                          Stage {stage.step}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                        {stage.phase}
                      </span>
                      <h4 className="text-lg font-bold uppercase tracking-tight text-neutral-900 mb-3 group-hover:text-black transition-colors">
                        {stage.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                        {stage.description}
                      </p>

                      {/* Deliverables tags */}
                      <div className="space-y-2 mb-6 pt-3 border-t border-black/[0.06]">
                        {stage.deliverables.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-xs text-neutral-700 font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline pill footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] text-xs text-[#6B7280]">
                      <div className="flex items-center gap-1.5 text-neutral-700 font-semibold">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        <span>{stage.timeline}</span>
                      </div>
                      <span className="text-xs font-mono uppercase text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        Guaranteed →
                      </span>
                    </div>

                    {/* Top active hover highlight line */}
                    <div className="absolute top-0 left-8 right-8 h-[2px] bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.08] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-900">
                Guaranteed Lead Times & Milestone Tracking
              </h4>
              <p className="text-xs text-neutral-500">
                Direct WhatsApp, video call inspection, and photo updates at every critical production step.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-wider text-black hover:text-[#FFB900] flex items-center gap-1 group transition-colors"
            >
              <span>Consult an OEM Engineer</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
