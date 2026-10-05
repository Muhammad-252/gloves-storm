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
  Info,
} from "lucide-react";
import type { Metadata } from "next";
import FactoryPhotoPlaceholder from "@/components/ui/FactoryPhotoPlaceholder";

export const metadata: Metadata = {
  title: "OEM Manufacturing Capabilities — Direct Sialkot Factory | Gloves Storm",
  description:
    "Tour the Gloves Storm direct manufacturing facility in Sialkot, Pakistan. Laser cutting, Juki stitching, Tajima embroidery, Italian sublimation and AQL 2.5 QC. Custom boxing gloves and sportswear OEM.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturing",
  },
  openGraph: {
    title: "OEM Manufacturing Capabilities — Direct Sialkot Factory | Gloves Storm",
    description:
      "Tour the Gloves Storm direct manufacturing facility in Sialkot, Pakistan. Laser cutting, Juki stitching, Tajima embroidery, Italian sublimation and AQL 2.5 QC.",
    url: "https://www.glovesstorm.com/manufacturing",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm Direct Sialkot Manufacturing Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OEM Manufacturing Capabilities — Direct Sialkot Factory | Gloves Storm",
    description:
      "Direct OEM manufacturing facility in Sialkot, Pakistan. Laser cutting, Juki stitching, Tajima embroidery, Italian sublimation and AQL 2.5 QC.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const factoryLines = [
  {
    title: "Computerized Laser Cutting",
    machine: "Gerber Spreading & Laser Cutters",
    process: "Automated Cutting",
    type: "Pre-Production & Cutting",
    iconType: "laser" as const,
    alt: "Computerized Gerber laser cutting machines at Gloves Storm Sialkot factory",
    specs:
      "Automated digital pattern projection and laser cutting with 0.2mm precision tolerances across heavy leather and 4-way stretch fabrics.",
  },
  {
    title: "Industrial Juki Stitching Lines",
    machine: "Juki Heavy-Duty Sewing Lines",
    process: "Precision Stitching",
    type: "Stitching & Assembly",
    iconType: "stitching" as const,
    alt: "Industrial Juki 4-needle stitching lines at Gloves Storm apparel manufacturing facility Sialkot",
    specs:
      "Specialized post-bed and 4-needle flatlock machines engineered for reinforced combat glove seams and frictionless athletic wear.",
  },
  {
    title: "Italian Digital Sublimation",
    machine: "Kiian Digital Dye Transfer",
    process: "Dye Sublimation",
    type: "Color & Printing",
    iconType: "sublimation" as const,
    alt: "Italian Kiian digital dye sublimation machines at Gloves Storm Sialkot factory",
    specs:
      "Italian molecular digital dye transfer printers operating at 1200 DPI for vibrant, fade-proof performance sportswear prints.",
  },
  {
    title: "Tajima Computerized Embroidery",
    machine: "Tajima 12-Needle Multi-Head",
    process: "3D Puff Embroidery",
    type: "Embellishment",
    iconType: "embroidery" as const,
    alt: "Tajima 12-needle 3D puff embroidery machines at Gloves Storm manufacturing facility",
    specs:
      "Japanese computerized embroidery suites capable of 15,000 stitches per panel with 3D puff and metallic yarn calibration.",
  },
  {
    title: "Screen & DTF Printing",
    machine: "Automatic Carousel & DTF Presses",
    process: "Apparel Printing",
    type: "Printing & Texture",
    iconType: "printing" as const,
    alt: "Automatic carousel screen printing and DTF machines at Gloves Storm factory Sialkot Pakistan",
    specs:
      "High-volume carousel printing suites running discharge inks, high-density silicone prints, and heat-activated 3D puff coatings.",
  },
  {
    title: "AQL 2.5 Quality Control",
    machine: "Multi-Point AQL Inspection Line",
    process: "Quality Control",
    type: "Safety & Compliance",
    iconType: "qc" as const,
    alt: "AQL 2.5 quality control inspection at Gloves Storm boxing gloves and sportswear factory",
    specs:
      "100% pre-pack magnetic sensor scanning and dimensional inspection ensuring complete consumer safety and retail-grade finishing.",
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

const manufacturingSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Corporation"],
  name: "Gloves Storm",
  description:
    "Direct OEM and private label manufacturing facility for custom boxing gloves, fight gear, sportswear, activewear and streetwear in Sialkot, Pakistan.",
  url: "https://www.glovesstorm.com",
  telephone: "+92-341-7146935",
  email: "glovesstorm@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industrial Estate",
    addressLocality: "Sialkot",
    addressRegion: "Punjab",
    postalCode: "51310",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.4945,
    longitude: 74.5229,
  },
  openingHours: "Mo-Sa 09:00-18:00",
  currenciesAccepted: "USD, GBP, EUR",
  paymentAccepted: "Bank Transfer, PayPal, Western Union",
  areaServed: ["US", "GB", "DE", "FR", "AU", "CA", "AE"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Custom OEM Products",
    url: "https://www.glovesstorm.com/products",
  },
};

export default function ManufacturingPage() {
  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturingSchema) }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Admin Photo Upload Reminder Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 text-xs text-amber-900">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Factory Photo Status:</strong> Professional dark machinery placeholders active for Google/AI crawlability. High-resolution factory floor photography can be updated anytime from the Admin Portal.
            </span>
          </div>
          <Link
            href="/admin"
            className="px-3 py-1 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-[10px] font-mono uppercase font-bold shrink-0 transition-colors"
          >
            Admin Panel
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-slate-800 text-[11px] font-mono font-medium shadow-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SIALKOT PRODUCTION FACILITY &amp; MACHINE FLEET</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08] uppercase">
            DIRECT SIALKOT MANUFACTURING FACILITY
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Gloves Storm operates a direct OEM manufacturing facility in Sialkot, Punjab, Pakistan — the city responsible for producing over 70% of the world&apos;s hand-stitched sports goods. Our in-house production lines cover laser cutting, industrial stitching, Italian digital sublimation, Tajima computerised embroidery, DTF and screen printing, and AQL 2.5 multi-point quality control. Zero middlemen. Mill-direct pricing.
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

        {/* Machinery Fleet with Dark Technical Placeholders */}
        <div className="mb-24">
          <div className="mb-12 pb-6 border-b border-slate-200/80">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Advanced Industrial Equipment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
              MACHINERY &amp; TECHNICAL FLEET
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {factoryLines.map((m) => (
              <div
                key={m.title}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* TODO: Replace with real factory photo */}
                <div className="p-2 bg-slate-950">
                  <FactoryPhotoPlaceholder
                    machineName={m.machine}
                    processName={m.process}
                    alt={m.alt}
                    iconType={m.iconType}
                  />
                </div>

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800 block mb-2 font-bold">
                      {m.type}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-2">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {m.specs}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Sialkot Unit #1 Certified</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 uppercase">
              AQL 2.5 QUALITY AUDIT PROTOCOL
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
            <span>Request Factory Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
