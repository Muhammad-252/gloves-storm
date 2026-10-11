import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ShieldCheck,
  HeartHandshake,
  Eye,
  Award,
  Globe,
  Building2,
  Calendar,
  MapPin,
  Package,
  Layers,
  Clock,
  Truck,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Gloves Storm — Direct Factory Since 2019 | OEM Manufacturer Sialkot Pakistan",
  description:
    "Gloves Storm is an international OEM/ODM apparel manufacturer in Sialkot, Pakistan. Custom sportswear, activewear, streetwear, and private label manufacturing for USA & UK brands since 2019.",
  alternates: {
    canonical: "https://www.glovesstorm.com/about",
  },
  openGraph: {
    title: "About Gloves Storm — Custom Clothing & Sportswear Manufacturer & Exporter Since 2019",
    description:
      "International OEM/ODM manufacturer and exporter of custom clothing, sportswear, activewear, and private label apparel serving USA, UK, and worldwide brands since 2019.",
    url: "https://www.glovesstorm.com/about",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm Apparel Manufacturing & Exporting Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Gloves Storm — Custom Clothing & Sportswear Manufacturer & Exporter",
    description:
      "International OEM manufacturer and exporter of custom clothing, team sportswear, and activewear for USA, UK, and global brands.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const keyFacts = [
  {
    icon: Calendar,
    label: "Founded",
    value: "2019",
    detail: "7+ years continuous global export operations",
  },
  {
    icon: MapPin,
    label: "Production Hub",
    value: "Sialkot, Punjab, Pakistan",
    detail: "World capital of textile and sports goods manufacturing",
  },
  {
    icon: Globe,
    label: "Primary Export Corridors",
    value: "USA and United Kingdom",
    detail: "Also serving EU, Canada, Australia, UAE & worldwide",
  },
  {
    icon: Package,
    label: "Product Divisions",
    value: "Team sportswear, gym activewear, streetwear, private label",
    detail: "Turnkey cut-and-sew and sublimation manufacturing",
  },
  {
    icon: Layers,
    label: "Minimum Order Quantity",
    value: "35–50 pieces per style",
    detail: "Accessible startup tiers to large volume container programs",
  },
  {
    icon: Clock,
    label: "Sample Lead Time",
    value: "5–7 working days",
    detail: "Master prototype sign-off before bulk cut-and-sew",
  },
  {
    icon: Clock,
    label: "Bulk Production",
    value: "12–18 working days",
    detail: "Automated cutting and multi-head embroidery lines",
  },
  {
    icon: Truck,
    label: "Worldwide Logistics",
    value: "DDP air and sea worldwide",
    detail: "Customs duties and import clearance documentation handled",
  },
];

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
            item: "https://www.glovesstorm.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: "https://www.glovesstorm.com/about",
          },
        ],
      },
      {
        "@type": "AboutPage",
        name: "About Gloves Storm",
        description:
          "International OEM and private label manufacturer and exporter of custom clothing, sportswear, activewear, and streetwear serving USA, UK, and worldwide brands since 2019.",
        mainEntity: {
          "@type": "Organization",
          name: "Gloves Storm",
          url: "https://www.glovesstorm.com",
          foundingDate: "2019",
          foundingLocation: {
            "@type": "Place",
            name: "Sialkot, Pakistan",
          },
          knowsAbout: [
            "Custom Clothing Manufacturing",
            "Custom Sportswear Manufacturing",
            "Private Label Activewear",
            "Sublimation Team Jerseys",
            "Screen Printing & Embroidery",
            "Apparel Exports",
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
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 text-slate-800 text-[11px] font-mono font-medium shadow-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900] animate-pulse" />
            <span>ESTABLISHED 2019 • INTERNATIONAL OEM/ODM APPAREL &amp; SPORTSWEAR EXPORTER</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08] uppercase">
            ABOUT GLOVES STORM
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Gloves Storm is an international OEM and private label apparel manufacturer and exporter established in 2019. We specialize in custom sportswear, athletic kits, compression activewear, heavyweight streetwear hoodies, and turnkey private label apparel for sports brands, athletic clubs, fashion labels, and distributors across the USA, UK, Europe, and worldwide. Operating direct factory facilities with in-house design, laser cutting, digital sublimation, and Tajima embroidery, we eliminate middlemen to give you direct mill pricing, guaranteed lead times, and uncompromised quality.
          </p>
        </div>

        {/* Crawlable Key Facts Section */}
        <div className="mb-20">
          <div className="mb-8 pb-4 border-b border-slate-200">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-900 font-mono block mb-1 font-bold">
              Verified Entity Facts
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
              KEY MANUFACTURING FACTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {keyFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#FFB900] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-neutral-900 mb-2">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-500">
                        {fact.label}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {fact.value}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    {fact.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story Section with Heritage Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 pb-16 border-b border-slate-200/80">
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <Image
              src="/images/hero-poster.jpg"
              alt="Gloves Storm Sialkot direct manufacturing facility master craftsmen"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-md text-white">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white font-bold block mb-1">
                Industrial Textile Heritage
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Sialkot is world-renowned for precision sports goods and technical apparel. Gloves Storm combines this craftsmanship with automated Gerber laser spreading, Juki 4-needle stitching, and Italian sublimation printing.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-900 font-mono block font-bold">
              The Evolution of OEM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight uppercase">
              WHY WE FOUNDED GLOVES STORM
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              For decades, international brands working with traditional offshore factories dealt with communication barriers, opaque pricing structures, inconsistent fabric quality, and missed deadlines.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Gloves Storm breaks this mold. We operate as a direct-to-brand factory partner. When you partner with us, you speak directly with product engineers who read tech packs, understand sizing curves, and respect the integrity of your intellectual property.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-slate-900 mb-2" />
                <span className="text-xs font-bold uppercase text-slate-900 block mb-1">
                  100% NDA Protection
                </span>
                <span className="text-[11px] text-slate-500">
                  Your proprietary cuts and designs stay exclusively yours.
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
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
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 uppercase">
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
              Ready to partner with a direct Sialkot manufacturer?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Send your project specifications today and experience transparent factory communication.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(255,185,0,0.3)] shrink-0"
          >
            <span>Request Factory Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
