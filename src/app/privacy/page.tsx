import Link from "next/link";
import { ShieldCheck, Lock, FileText, CheckCircle, Mail, MapPin, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy | Gloves Storm",
  description:
    "Gloves Storm privacy, data protection, and IP confidentiality policy for international manufacturing partners, tech pack submissions, and custom B2B production.",
  alternates: {
    canonical: "https://www.glovesstorm.com/privacy",
  },
  openGraph: {
    title: "Privacy & Data Protection Policy | Gloves Storm",
    description:
      "Gloves Storm privacy, data protection, and IP confidentiality policy for international manufacturing partners, tech pack submissions, and custom B2B production.",
    url: "https://www.glovesstorm.com/privacy",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm Privacy & IP Protection Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy & Data Protection Policy | Gloves Storm",
    description:
      "Gloves Storm privacy, data protection, and IP confidentiality policy for international manufacturing partners, tech pack submissions, and custom B2B production.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

export default function PrivacyPolicyPage() {
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
            name: "Privacy Policy",
            item: "https://www.glovesstorm.com/privacy",
          },
        ],
      },
      {
        "@type": "WebPage",
        name: "Gloves Storm Privacy & IP Confidentiality Policy",
        description:
          "Institutional data protection, bilateral NDA guarantees, and proprietary design safeguards for custom OEM manufacturing clients.",
        url: "https://www.glovesstorm.com/privacy",
      },
    ],
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-slate-800 text-[11px] font-mono uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Industrial Confidentiality &amp; Security Standard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-slate-900 mb-4">
            PRIVACY &amp; DATA PROTECTION POLICY
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            At GLOVES STORM, we protect your brand&apos;s proprietary designs, confidential tech packs, trade secrets, and business communications with strict institutional security standards.
          </p>
          <div className="text-xs text-slate-400 font-mono mt-3">
            Last Updated &amp; Verified: March 2026 • Compliant with Global B2B Standards &amp; GDPR Principles
          </div>
        </div>

        {/* Highlight Banner: Tech Pack Non-Disclosure Guarantee */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-8 mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-slate-100 text-slate-900 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-900 mb-1">
                Strict IP &amp; Design Confidentiality (NDA Guarantee)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Any tech pack, 3D render, pattern file, embroidery artwork, or custom mold you upload to GLOVES STORM is treated under strict bilateral non-disclosure. We never disclose, replicate, sample, or sell your proprietary designs to third parties, competitors, or local markets.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="bg-white/75 backdrop-blur-md border border-white/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              1. Information We Collect
            </h2>
            <p className="mb-4 text-slate-600">
              We only collect business data required to formulate manufacturing quotations, prepare pre-production samples, and fulfill international shipments:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Contact details (Name, Corporate Email, Phone/WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Company information and country of destination</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Production specs (Quantities, Materials, Delivery targets)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Design attachments &amp; Tech packs (.pdf, .ai, .png, etc.)</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white/75 backdrop-blur-md border border-white/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              2. Data Protection &amp; Cryptographic Security
            </h2>
            <p className="mb-3 text-slate-600">
              All interactions between your browser and GLOVES STORM are safeguarded using industry-standard security protocols:
            </p>
            <ul className="space-y-2 list-disc pl-5 text-slate-600">
              <li>
                <strong className="text-slate-900">End-to-End Encryption in Transit:</strong> Enforced TLS 1.3 encryption across all requests with HTTP Strict Transport Security (HSTS) headers.
              </li>
              <li>
                <strong className="text-slate-900">PostgreSQL Row Level Security (RLS):</strong> Customer inquiries and tech pack metadata are stored in isolated databases where unauthenticated access is strictly blocked at the database engine level.
              </li>
              <li>
                <strong className="text-slate-900">Hardened Administrative Access:</strong> Administrative dashboards require authenticated cryptographic sessions with strict role-based access control.
              </li>
              <li>
                <strong className="text-slate-900">Clickjacking &amp; MIME Protection:</strong> Content security policies, frame denial headers (X-Frame-Options: DENY), and MIME-sniffing prevention are active on all endpoints.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/75 backdrop-blur-md border border-white/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              3. Non-Sale &amp; Non-Sharing Policy
            </h2>
            <p className="text-slate-600">
              We do not sell, rent, monetize, or broker corporate data or customer lists under any circumstances. Information is exclusively accessed by authorized production managers, pattern engineers, and logistics coordinators solely to execute your purchase orders and export documentation.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white/75 backdrop-blur-md border border-white/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              4. Your Rights (Access, Correction &amp; Deletion)
            </h2>
            <p className="mb-4 text-slate-600">
              Under international privacy frameworks, you have full ownership of your corporate data. At any point, you may request:
            </p>
            <ul className="space-y-2 list-disc pl-5 mb-4 text-slate-600">
              <li>A complete export of all communication and quote records held on your file.</li>
              <li>Immediate and permanent deletion of your design files, tech packs, and inquiry records from our production servers.</li>
              <li>Execution of a custom formal Bilateral Non-Disclosure Agreement (NDA) prior to sample fabrication.</li>
            </ul>
            <p className="text-slate-600">
              To exercise any of these rights, contact our legal and compliance desk at{" "}
              <a href="mailto:glovesstorm@gmail.com" className="text-slate-900 font-bold underline hover:text-slate-700">
                glovesstorm@gmail.com
              </a>
              .
            </p>
          </section>

          {/* Contact & Verification Box */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="font-bold text-slate-900 text-sm">Have Questions Regarding Compliance or Custom NDAs?</div>
              <div className="text-xs text-slate-500">Our commercial team is ready to review your standard supplier agreement.</div>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Contact Legal / Production</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
