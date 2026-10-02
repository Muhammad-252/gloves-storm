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
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Capabilities & Sialkot Factory | GLOVES STORM",
  description:
    "Explore our 45,000 sq ft industrial facility in Sialkot, Pakistan. Technical machinery, sublimation printing, precision laser cutting, and 4-stage quality control.",
  alternates: {
    canonical: "https://glovesstorm.com/manufacturing",
  },
  openGraph: {
    title: "Manufacturing Capabilities & Sialkot Factory | GLOVES STORM",
    description:
      "Explore our 45,000 sq ft industrial facility in Sialkot, Pakistan. European & Japanese machinery, sublimation printing, precision laser cutting, and 4-stage quality control.",
    url: "https://glovesstorm.com/manufacturing",
    siteName: "GLOVES STORM Manufacturing",
    type: "website",
    images: [
      {
        url: "https://glovesstorm.com/images/products/boxing-gloves-black.png",
        width: 1200,
        height: 630,
        alt: "GLOVES STORM Sialkot Industrial Manufacturing Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Capabilities & Sialkot Factory | GLOVES STORM",
    description:
      "Explore our 45,000 sq ft industrial facility in Sialkot, Pakistan. European & Japanese machinery, sublimation printing, precision laser cutting, and 4-stage quality control.",
    images: ["https://glovesstorm.com/images/products/boxing-gloves-black.png"],
  },
};

const machinery = [
  {
    name: "Tajima Multi-Head Computerized Embroidery",
    specs: "Japanese computerized embroidery suites capable of 15,000 stitches per panel with 3D puff and metallic yarn calibration.",
    type: "Embellishment",
  },
  {
    name: "Gerber Automatic Spreading & Laser Cutters",
    specs: "Automated digital pattern projection and laser cutting with 0.2mm precision tolerances across heavy leather and 4-way stretch fabrics.",
    type: "Pre-Production & Cutting",
  },
  {
    name: "Juki Industrial Heavy Cylinder & Flatlock Stitching",
    specs: "Specialized post-bed and 4-needle flatlock machines engineered for reinforced combat glove seams and frictionless athletic wear.",
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
    specs: "100% pre-pack magnetic sensor scanning ensuring complete consumer safety across all combat gear and youth athletic wear.",
    type: "Safety & Compliance",
  },
];

const qcSteps = [
  {
    stage: "Stage 01: Raw Material Lab Testing",
    desc: "Every incoming batch of leather, french terry, foam laminates, and zippers undergoes tensile strength, colorfastness, and thickness verification.",
  },
  {
    stage: "Stage 02: Pattern & Cut Panel Verification",
    desc: "Before stitching begins, cut panels are checked against digital master CAD patterns. Sublimation, screen print, and embroidery alignments are calibrated.",
  },
  {
    stage: "Stage 03: In-Line Assembly Audits",
    desc: "Floor supervisors conduct random seam tension, stitch count per inch (SPI), and padding alignment audits during assembly.",
  },
  {
    stage: "Stage 04: 100% Pre-Pack Inspection",
    desc: "Every single piece is individually inspected for loose threads, clean surface finishes, exact measurements, passed through needle detection, and barcoded.",
  },
];

export default function ManufacturingPage() {
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
            name: "Manufacturing",
            item: "https://glovesstorm.com/manufacturing",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Custom Apparel & Combat Sports Gear Manufacturing",
        serviceType: "OEM/ODM Industrial Manufacturing",
        provider: {
          "@type": "Organization",
          name: "GLOVES STORM",
          url: "https://glovesstorm.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sialkot",
            addressRegion: "Punjab",
            postalCode: "51310",
            addressCountry: "PK",
          },
        },
        areaServed: ["US", "CA", "GB", "DE", "FR", "AU"],
        description:
          "Industrial OEM and private label apparel and combat sports gear manufacturing facility in Sialkot, Pakistan. 45,000 sq ft capacity, automated cutting, multi-head embroidery, and 4-stage QC.",
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
        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-slate-800 text-[11px] font-mono font-medium shadow-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SIALKOT PRODUCTION FACILITY &amp; MACHINE FLEET</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            INDUSTRIAL PRECISION. <br />
            <span className="text-slate-500">ARTISAN CRAFTSMANSHIP.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            GLOVES STORM combines modern European and Japanese textile machinery with the historic leather and apparel craftsmanship of Sialkot, Pakistan. We eliminate guesswork through documented engineering tolerances and transparent production milestones.
          </p>
        </div>

        {/* Factory Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="p-6 rounded-3xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all">
            <Factory className="w-6 h-6 text-slate-900 mb-4" />
            <span className="block text-2xl font-black uppercase text-slate-900 mb-1">
              45,000 SQ. FT.
            </span>
            <span className="text-xs text-slate-500">Modern manufacturing and warehousing space in Sialkot</span>
          </div>
          <div className="p-6 rounded-3xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all">
            <Cpu className="w-6 h-6 text-slate-900 mb-4" />
            <span className="block text-2xl font-black uppercase text-slate-900 mb-1">
              180+ WORKERS
            </span>
            <span className="text-xs text-slate-500">Certified pattern makers, master cutters, and stitchers</span>
          </div>
          <div className="p-6 rounded-3xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all">
            <Box className="w-6 h-6 text-slate-900 mb-4" />
            <span className="block text-2xl font-black uppercase text-slate-900 mb-1">
              50,000+ PCS
            </span>
            <span className="text-xs text-slate-500">Monthly composite production capacity across combat &amp; wear</span>
          </div>
          <div className="p-6 rounded-3xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all">
            <Clock className="w-6 h-6 text-slate-900 mb-4" />
            <span className="block text-2xl font-black uppercase text-slate-900 mb-1">
              7 - 14 DAYS
            </span>
            <span className="text-xs text-slate-500">Rapid sample prototyping turnaround with express air delivery</span>
          </div>
        </div>

        {/* Machinery Fleet */}
        <div className="mb-24">
          <div className="mb-12 pb-6 border-b border-slate-200/80">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-mono block mb-2 font-bold">
              Advanced Tooling
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              MACHINERY &amp; TECHNICAL FLEET
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machinery.map((m) => (
              <div
                key={m.name}
                className="p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 block mb-2 font-bold">
                    {m.type}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">
                    {m.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.specs}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Industrial Calibrated</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Control Protocol */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-mono block mb-2 font-bold">
              Zero-Defect Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              4-STAGE QUALITY AUDIT PROTOCOL
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We know that a single torn seam or misprinted logo can damage your brand’s relationship with your customer. That is why every garment and glove passes through four independent checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {qcSteps.map((step) => (
              <div key={step.stage} className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h3 className="text-sm font-bold tracking-tight text-slate-900">
                    {step.stage}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
              Ready to schedule a video factory tour or sample audit?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Schedule a technical session with our lead engineers in Sialkot to review your tech pack specifications.
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
