import Link from "next/link";
import { ArrowUpRight, ShieldCheck, HeartHandshake, Eye, Award, Globe, Users } from "lucide-react";
import GooeyButton from "@/components/ui/GooeyButton";

export const metadata = {
  title: "About GLOVES STORM | Sialkot Manufacturing Heritage",
  description:
    "Learn about GLOVES STORM: a premier OEM manufacturing partner based in Sialkot, Pakistan, dedicated to ethical craftsmanship, precision engineering, and long-term brand partnerships.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#b45309] font-mono block mb-2">
            The Sialkot Legacy
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0f172a] mb-6 leading-tight">
            NOT JUST A SUPPLIER. <br />
            <span className="text-neutral-500">YOUR PRODUCTION PARTNER.</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            GLOVES STORM was founded with a singular conviction: global sports and fashion brands deserve a manufacturing partner that operates with the engineering rigor, communication transparency, and design empathy of a Silicon Valley or London studio.
          </p>
        </div>

        {/* Story Section with Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 pb-16 border-b border-neutral-200">
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] bg-neutral-100 rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#b45309] block mb-1">
                Handmade Tradition
              </span>
              <p className="text-xs text-neutral-800">
                Sialkot produces more hand-stitched sports goods than any other city on earth. We preserve that pedigree while engineering for 2026 and beyond.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#b45309] font-mono block">
              The Evolution of OEM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0f172a] leading-tight">
              WHY WE FOUNDED GLOVES STORM
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              For decades, international brands working with traditional offshore factories dealt with communication barriers, opaque pricing structures, inconsistent fabric quality, and missed deadlines.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              GLOVES STORM breaks this mold. We operate as a direct-to-brand factory partner. When you partner with us, you speak directly with product engineers who read tech packs, understand sizing curves, and respect the integrity of your intellectual property.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#b45309] mb-2" />
                <span className="text-xs font-bold uppercase text-[#0f172a] block mb-1">
                  100% NDA Protection
                </span>
                <span className="text-[11px] text-neutral-500">
                  Your proprietary cuts and designs stay exclusively yours.
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                <Globe className="w-5 h-5 text-[#b45309] mb-2" />
                <span className="text-xs font-bold uppercase text-[#0f172a] block mb-1">
                  Global Export Hub
                </span>
                <span className="text-[11px] text-neutral-500">
                  Fast-track air express and direct ocean freight.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Standards & Compliance */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#b45309] font-mono block mb-2">
              Social Responsibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-4">
              ETHICAL MANUFACTURING MANDATE
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              True luxury and performance cannot exist at the expense of human dignity. We maintain strict labor and environmental standards across our entire Sialkot manufacturing floor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-amber-500/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <HeartHandshake className="w-6 h-6 text-[#b45309] mb-4" />
              <h3 className="text-base font-bold uppercase tracking-tight text-[#0f172a] mb-2">
                Fair Living Wages & Healthcare
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                All team members receive wages well above national minimums, comprehensive medical coverage, and paid leave.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-amber-500/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <ShieldCheck className="w-6 h-6 text-[#b45309] mb-4" />
              <h3 className="text-base font-bold uppercase tracking-tight text-[#0f172a] mb-2">
                Zero Child Labor Guarantee
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Zero tolerance policy with certified age verification, audited by third-party international trade monitors.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-amber-500/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <Eye className="w-6 h-6 text-[#b45309] mb-4" />
              <h3 className="text-base font-bold uppercase tracking-tight text-[#0f172a] mb-2">
                Open-Door Transparency
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Clients are always welcome to visit our Sialkot facility in person or join unedited live video audits from the floor.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-[#0f172a] mb-2">
              Ready to partner with a modern manufacturer?
            </h3>
            <p className="text-xs text-neutral-600">
              Send your project specifications today and experience professional factory communication.
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
