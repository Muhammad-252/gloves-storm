import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";

const steps = [
  {
    num: "01",
    title: "SHARE YOUR IDEA",
    subtitle: "Briefing & Concept",
    desc: "Send your design, reference image, sketch, or complete tech pack. Our technical team evaluates material feasibility, pattern cuts, and cost efficiencies.",
  },
  {
    num: "02",
    title: "PRODUCT DEVELOPMENT",
    subtitle: "Engineering & Sourcing",
    desc: "We review specifications, materials, sizing curves, and construction. Digital CAD patterns and exact Pantone dye formulas are established.",
  },
  {
    num: "03",
    title: "SAMPLING",
    subtitle: "Physical Prototyping",
    desc: "A prototype master sample is handcrafted and delivered to your doorstep for fitting, fabric feel, and dimensional sign-off.",
  },
  {
    num: "04",
    title: "PRODUCTION",
    subtitle: "Precision Manufacturing",
    desc: "Once samples are approved, bulk raw materials are inspected and your order moves onto our specialized cutting, stitching, and printing lines.",
  },
  {
    num: "05",
    title: "QUALITY CONTROL",
    subtitle: "Multi-Point Inspection",
    desc: "Every product is systematically inspected for seam tension, print accuracy, dimensional tolerances, and clean thread finishing.",
  },
  {
    num: "06",
    title: "GLOBAL DELIVERY",
    subtitle: "Insured Worldwide Dispatch",
    desc: "Finished products are custom-packed, barcoded, and shipped directly to your warehouse or 3PL facility via air or sea freight.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-28 sm:py-36 bg-[#0C0D0E] border-b border-white/[0.06] relative">
      {/* Subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF6B00]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
            Standard Operating Procedure
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7] leading-[1.0] mb-6">
            THE SIX-STEP <br />
            <span className="text-[#9E9EA7]">PRODUCTION TIMELINE</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9E9EA7] leading-relaxed">
            Predictability is essential for growing apparel and gear brands. We maintain transparent milestones from initial tech pack consultation to final customs clearance.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group bg-[#111214] rounded-3xl border border-white/[0.07] hover:border-[#FF6B00]/40 p-8 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Ghost Step Number */}
              <span className="absolute -top-4 -right-2 text-7xl font-black text-white/[0.025] group-hover:text-[#FF6B00]/[0.06] transition-colors pointer-events-none select-none">
                {step.num}
              </span>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-3 py-1 rounded-full">
                    Step {step.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E9EA7]/60 font-mono">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight text-[#F5F5F7] mb-3 group-hover:text-[#FF6B00] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#9E9EA7]/50">
                <span>Phase {step.num} of 06</span>
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
              </div>

              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#FF6B00] to-[#ff8533] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-8 bg-[#111214] rounded-3xl border border-white/[0.07] hover:border-[#FF6B00]/25 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors">
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider text-[#F5F5F7] mb-1">
              Have a tech pack ready to review?
            </h4>
            <p className="text-xs sm:text-sm text-[#9E9EA7]">
              Our pattern masters can review your artwork and estimate sampling timelines within 24 hours.
            </p>
          </div>
          <GooeyButton
            href="/contact"
            variant="gold-solid"
            size="md"
            className="shrink-0"
          >
            <span>Submit Tech Pack</span>
            <ArrowUpRight className="w-4 h-4" />
          </GooeyButton>
        </div>
      </div>
    </section>
  );
}
