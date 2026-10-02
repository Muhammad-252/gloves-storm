import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, HeartHandshake, Eye, Award, Globe, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About GLOVES STORM | Sialkot Manufacturing Heritage & OEM Excellence",
  description:
    "Learn about GLOVES STORM: a premier OEM manufacturing partner based in Sialkot, Pakistan, dedicated to ethical craftsmanship, precision engineering, and long-term brand partnerships.",
  alternates: {
    canonical: "https://glovesstorm.com/about",
  },
  openGraph: {
    title: "About GLOVES STORM | Sialkot Manufacturing Heritage & OEM Excellence",
    description:
      "Learn about GLOVES STORM: a premier OEM manufacturing partner based in Sialkot, Pakistan, dedicated to ethical craftsmanship, precision engineering, and long-term brand partnerships.",
    url: "https://glovesstorm.com/about",
    siteName: "GLOVES STORM Manufacturing",
    type: "website",
    images: [
      {
        url: "https://glovesstorm.com/images/products/boxing-gloves-black.png",
        width: 1200,
        height: 630,
        alt: "GLOVES STORM Sialkot Heritage & Ethical Manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About GLOVES STORM | Sialkot Manufacturing Heritage & OEM Excellence",
    description:
      "Learn about GLOVES STORM: a premier OEM manufacturing partner based in Sialkot, Pakistan, dedicated to ethical craftsmanship, precision engineering, and long-term brand partnerships.",
    images: ["https://glovesstorm.com/images/products/boxing-gloves-black.png"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://glovesstorm.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: "https://glovesstorm.com/about",
          },
        ],
      },
      {
        "@type": "AboutPage",
        name: "About GLOVES STORM Manufacturing",
        description:
          "Sialkot OEM/ODM manufacturing partner for custom athletic apparel and combat sports equipment. High ethical standards, living wages, and precision production.",
        mainEntity: {
          "@type": "Organization",
          name: "GLOVES STORM",
          url: "https://glovesstorm.com",
          foundingLocation: {
            "@type": "Place",
            name: "Sialkot, Pakistan",
          },
          knowsAbout: [
            "Custom Apparel Manufacturing",
            "Combat Sports Equipment OEM",
            "Screen Printing & Embroidery",
            "Textile Pattern Engineering",
          ],
        },
      },
    ],
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-slate-800 text-[11px] font-mono font-medium shadow-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ESTABLISHED IN SIALKOT • GLOBAL OEM/ODM APPAREL &amp; GEAR</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            NOT JUST A SUPPLIER. <br />
            <span className="text-slate-500">YOUR PRODUCTION PARTNER.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            GLOVES STORM was founded with a singular conviction: global sports and fashion brands deserve a manufacturing partner that operates with the engineering rigor, communication transparency, and design empathy of a world-class production studio.
          </p>
        </div>

        {/* Story Section with Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 pb-16 border-b border-slate-200/80">
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] bg-slate-100 rounded-3xl border border-white/90 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Image
              src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop"
              alt="Master Craftsman in Sialkot handcrafting custom boxing equipment - GLOVES STORM"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold block mb-1">
                Handmade Tradition
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                Sialkot produces more hand-stitched sports goods than any other city on earth. We preserve that pedigree while engineering for modern luxury aesthetics and international compliance.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-mono block font-bold">
              The Evolution of OEM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              WHY WE FOUNDED GLOVES STORM
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              For decades, international brands working with traditional offshore factories dealt with communication barriers, opaque pricing structures, inconsistent fabric quality, and missed deadlines.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              GLOVES STORM breaks this mold. We operate as a direct-to-brand factory partner. When you partner with us, you speak directly with product engineers who read tech packs, understand sizing curves, and respect the integrity of your intellectual property.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-slate-900 mb-2" />
                <span className="text-xs font-bold uppercase text-slate-900 block mb-1">
                  100% NDA Protection
                </span>
                <span className="text-[11px] text-slate-500">
                  Your proprietary cuts and designs stay exclusively yours.
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 shadow-xs">
                <Globe className="w-5 h-5 text-slate-900 mb-2" />
                <span className="text-xs font-bold uppercase text-slate-900 block mb-1">
                  Global Export Hub
                </span>
                <span className="text-[11px] text-slate-500">
                  Fast-track air express and direct ocean freight door-to-door.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Standards & Compliance */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-mono block mb-2 font-bold">
              Social Responsibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              ETHICAL MANUFACTURING MANDATE
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              True luxury and performance cannot exist at the expense of human dignity. We maintain strict labor and environmental standards across our entire Sialkot manufacturing floor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300">
              <HeartHandshake className="w-6 h-6 text-slate-900 mb-4" />
              <h3 className="text-base font-bold tracking-tight text-slate-900 mb-2">
                Fair Living Wages &amp; Healthcare
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All team members receive wages well above national minimums, comprehensive medical coverage, and paid leave.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300">
              <ShieldCheck className="w-6 h-6 text-slate-900 mb-4" />
              <h3 className="text-base font-bold tracking-tight text-slate-900 mb-2">
                Zero Child Labor Guarantee
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero tolerance policy with certified age verification, audited by third-party international trade monitors.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300">
              <Eye className="w-6 h-6 text-slate-900 mb-4" />
              <h3 className="text-base font-bold tracking-tight text-slate-900 mb-2">
                Open-Door Transparency
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clients are always welcome to visit our Sialkot facility in person or join unedited live video audits from the floor.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
              Ready to partner with a modern manufacturer?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Send your project specifications today and experience professional factory communication.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
