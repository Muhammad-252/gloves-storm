import { ArrowUpRight } from "lucide-react";
import InteractiveGlobe from "./InteractiveGlobe";
import Link from "next/link";

export default function GlobalReachSection() {
  return (
    <section className="py-28 sm:py-36 bg-[#0C0D0E] border-b border-white/[0.06] relative overflow-hidden">
      {/* Globe ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
                Worldwide Supply Chain & Direct Export
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7] leading-[1.0] mb-6">
                FROM SIALKOT <br />
                <span className="text-[#9E9EA7]">TO THE WORLD.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#9E9EA7] leading-relaxed max-w-xl">
                Sialkot manufactures over 70% of the world&apos;s hand-stitched sports goods. GLOVES STORM builds upon this century-old industrial mastery with automated cutting, precision stitching, and insured air-express freight corridors directly to your facility door.
              </p>
            </div>

            {/* Core Export Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { val: "70%+", label: "Global Sports Goods Handcraft Heritage", accent: false },
                { val: "3–5 Days", label: "Air Express Dispatch to North America & EU", accent: true },
                { val: "60+", label: "International Destination Ports Served", accent: false },
                { val: "100%", label: "Insured Door-to-Door Customs Clearance", accent: true },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-2xl bg-[#111214] border border-white/[0.07] hover:border-[#FF6B00]/30 transition-colors"
                >
                  <span className={`text-2xl sm:text-3xl font-black font-mono block mb-1 ${stat.accent ? "text-[#FF6B00]" : "text-[#F5F5F7]"}`}>
                    {stat.val}
                  </span>
                  <span className="text-xs text-[#9E9EA7] font-medium leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F5F5F7] hover:bg-white text-[#0C0D0E] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:shadow-[0_4px_20px_rgba(245,245,247,0.2)]"
              >
                <span>Calculate Freight For Your Country</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Globe */}
          <div className="lg:col-span-6 flex justify-center">
            <InteractiveGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}
