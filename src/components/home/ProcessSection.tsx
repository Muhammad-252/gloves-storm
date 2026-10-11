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
    <section className="py-28 sm:py-36 bg-[#F9FAFB] border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
            Standard Operating Procedure
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.0] mb-6">
            THE SIX-STEP <br />
            <span className="text-[#6B7280]">PRODUCTION TIMELINE</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Predictability is essential for growing apparel and gear brands. We maintain transparent milestones from initial tech pack consultation to final customs clearance.
          </p>
        </div>

        {/* Timeline Grid with Elevated Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group bg-white rounded-3xl border border-black/[0.08] hover:border-black/30 p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Step Number Accent */}
              <span className="absolute -top-4 -right-2 text-7xl font-black text-black/[0.03] group-hover:text-black/[0.06] transition-colors pointer-events-none select-none">
                {step.num}
              </span>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                    Step {step.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF] font-mono">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A] mb-3 group-hover:text-black transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#9CA3AF]">
                <span>Phase {step.num} of 06</span>
                <span className="w-2 h-2 rounded-full bg-[#FFB900] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_6px_rgba(255,185,0,0.6)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-white rounded-3xl border border-black/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
              Have a tech pack ready to review?
            </h4>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Our pattern masters can review your artwork and estimate sampling timelines within 24 hours.
            </p>
          </div>
          <GooeyButton
            href="/contact"
            variant="gold-solid"
            size="md"
            className="shrink-0 w-full sm:w-auto"
          >
            <span>Submit Tech Pack</span>
            <ArrowUpRight className="w-4 h-4" />
          </GooeyButton>
        </div>
      </div>
    </section>
  );
}
