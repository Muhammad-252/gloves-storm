import Link from "next/link";
import { ShieldCheck, Lock, FileText, CheckCircle, Mail, MapPin } from "lucide-react";
import GooeyButton from "@/components/ui/GooeyButton";

export const metadata = {
  title: "Privacy & Data Protection Policy | GLOVES STORM",
  description:
    "GLOVES STORM privacy, data protection, and IP confidentiality policy for international manufacturing partners, tech pack submissions, and custom B2B production.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen text-[#0f172a]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-mono uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Industrial Confidentiality & Security Standard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0f172a] mb-4">
            PRIVACY & DATA PROTECTION POLICY
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            At GLOVES STORM, we protect your brand&apos;s proprietary designs, confidential tech packs, trade secrets, and business communications with strict institutional security standards.
          </p>
          <div className="text-xs text-neutral-400 font-mono mt-3">
            Last Updated & Verified: March 2026 • Compliant with Global B2B Standards & GDPR Principles
          </div>
        </div>

        {/* Highlight Banner: Tech Pack Non-Disclosure Guarantee */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-600 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#0f172a] mb-1">
                Strict IP & Design Confidentiality (NDA Guarantee)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                Any tech pack, 3D render, pattern file, embroidery artwork, or custom mold you upload to GLOVES STORM is treated under strict bilateral non-disclosure. We never disclose, replicate, sample, or sell your proprietary designs to third parties, competitors, or local markets.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {/* Section 1 */}
          <section className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#0f172a] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              1. Information We Collect
            </h2>
            <p className="mb-4">
              We only collect business data required to formulate manufacturing quotations, prepare pre-production samples, and fulfill international shipments:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Contact details (Name, Corporate Email, Phone/WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Company information and country of destination</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Production specs (Quantities, Materials, Delivery targets)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Design attachments & Tech packs (.pdf, .ai, .png, etc.)</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#0f172a] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              2. Data Protection & Cryptographic Security
            </h2>
            <p className="mb-3">
              All interactions between your browser and GLOVES STORM are safeguarded using industry-standard security protocols:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong>End-to-End Encryption in Transit:</strong> Enforced TLS 1.3 encryption across all requests with HTTP Strict Transport Security (HSTS) headers.
              </li>
              <li>
                <strong>PostgreSQL Row Level Security (RLS):</strong> Customer inquiries and tech pack metadata are stored in isolated databases where unauthenticated access is strictly blocked at the database engine level.
              </li>
              <li>
                <strong>Hardened Administrative Access:</strong> Administrative dashboards require authenticated cryptographic sessions with strict role-based access control.
              </li>
              <li>
                <strong>Clickjacking & MIME Protection:</strong> Content security policies, frame denial headers (X-Frame-Options: DENY), and MIME-sniffing prevention are active on all endpoints.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#0f172a] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              3. Non-Sale & Non-Sharing Policy
            </h2>
            <p>
              We do not sell, rent, monetize, or broker corporate data or customer lists under any circumstances. Information is exclusively accessed by authorized production managers, pattern engineers, and logistics coordinators solely to execute your purchase orders and export documentation.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#0f172a] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              4. Your Rights (Access, Correction & Deletion)
            </h2>
            <p className="mb-4">
              Under international privacy frameworks, you have full ownership of your corporate data. At any point, you may request:
            </p>
            <ul className="space-y-2 list-disc pl-5 mb-4">
              <li>A complete export of all communication and quote records held on your file.</li>
              <li>Immediate and permanent deletion of your design files, tech packs, and inquiry records from our production servers.</li>
              <li>Execution of a custom formal Bilateral Non-Disclosure Agreement (NDA) prior to sample fabrication.</li>
            </ul>
            <p>
              To exercise any of these rights, contact our legal and compliance desk at{" "}
              <a href="mailto:glovesstorm@gmail.com" className="text-amber-700 font-bold underline hover:text-amber-800">
                glovesstorm@gmail.com
              </a>
              .
            </p>
          </section>

          {/* Contact & Verification Box */}
          <div className="bg-neutral-100 border border-neutral-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="font-bold text-[#0f172a] text-sm">Have Questions Regarding Compliance or Custom NDAs?</div>
              <div className="text-xs text-neutral-500">Our commercial team is ready to review your standard supplier agreement.</div>
            </div>
            <div className="shrink-0">
              <GooeyButton href="/contact" variant="gold-solid" size="sm">
                <span>Contact Legal / Production</span>
              </GooeyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
