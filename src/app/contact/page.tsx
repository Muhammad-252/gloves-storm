import { Suspense } from "react";
import MultiStepInquiryClient from "@/components/contact/MultiStepInquiryClient";
import { getCategories, getProducts } from "@/lib/data/store";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Clock, MessageSquare, Loader2 } from "lucide-react";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Manufacturing Quote | Gloves Storm",
  description:
    "Request a free custom manufacturing quote from Gloves Storm. Custom sportswear, team uniforms, gym wear, streetwear, and private label clothing. Low MOQ from 30 pcs, 7-day samples, DDP shipping to USA & UK.",
  alternates: {
    canonical: "https://www.glovesstorm.com/contact",
  },
  openGraph: {
    title: "Get a Custom Clothing & Sportswear Manufacturing Quote | Gloves Storm",
    description:
      "Request a free OEM apparel manufacturing quote from Gloves Storm. Custom clothing, sportswear, activewear, streetwear, and private label garments. MOQ 35–50 pcs. Reply within 24 hours. USA, UK, and worldwide export.",
    url: "https://www.glovesstorm.com/contact",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm Direct Factory Inquiry Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Custom Clothing & Sportswear Manufacturing Quote | Gloves Storm",
    description:
      "Request a free OEM apparel manufacturing quote from Gloves Storm. Custom clothing, sportswear, activewear, streetwear, and private label garments. MOQ 35–50 pcs. Reply within 24 hours.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

export default async function ContactPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

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
            name: "Contact & RFQ",
            item: "https://www.glovesstorm.com/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        name: "Contact GLOVES STORM Factory",
        description:
          "Connect directly with GLOVES STORM factory engineers in Sialkot, Pakistan. Submit CAD tech packs, request rapid prototyping samples, and get bulk pricing.",
        mainEntity: {
          "@type": "Organization",
          name: "GLOVES STORM",
          telephone: "+923417146935",
          email: "glovesstorm@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Industrial Estate",
            addressLocality: "Sialkot",
            addressRegion: "Punjab",
            postalCode: "51310",
            addressCountry: "PK",
          },
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
        {/* Page Banner */}
        <div className="max-w-3xl mb-12 pb-6 border-b border-slate-200/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 text-slate-800 text-[11px] font-mono font-medium shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900] animate-pulse" />
            <span>DIRECT FACTORY COMMUNICATION &amp; RFQ STUDIO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
            REQUEST A CUSTOM MANUFACTURING QUOTE
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-3xl leading-relaxed">
            Tell us what you&apos;re building — product type, quantity, design details and target market. Our production team will review your requirements and respond with a detailed quote within 24 hours. No commitment required at the quote stage.
          </p>
        </div>

        {/* Conversational Multi-Step Inquiry Studio */}
        <div className="mb-16">
          <Suspense
            fallback={
              <div className="p-12 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm flex flex-col items-center justify-center text-center">
                <Loader2 className="w-8 h-8 text-slate-900 animate-spin mb-4" />
                <p className="text-sm font-mono text-slate-600">LOADING INQUIRY STUDIO...</p>
              </div>
            }
          >
            <MultiStepInquiryClient categories={categories} products={products} />
          </Suspense>
        </div>

        {/* Direct Factory Credentials & Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200/80">
          {/* Direct Factory Contacts */}
          <div className="p-6 bg-white/75 backdrop-blur-md border border-white/90 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              Factory Headquarters
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-900 font-semibold">Physical Address</span>
                  <span>Industrial Estate, Sialkot 51310, Punjab, Pakistan</span>
                  <a
                    href="https://maps.google.com/?q=Sialkot+Industrial+Estate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[11px] font-mono text-slate-900 hover:underline font-semibold mt-1"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-900 font-semibold">Direct Inquiries</span>
                  <a
                    href="mailto:glovesstorm@gmail.com"
                    className="text-slate-900 hover:underline font-medium"
                  >
                    glovesstorm@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-900 font-semibold">Phone / WhatsApp</span>
                  <a href="tel:+923417146935" className="hover:text-slate-900 transition-colors font-medium">
                    +923417146935
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-900 font-semibold">Factory Operations</span>
                  <span>Mon - Sat: 08:00 - 18:00 PKT (UTC +5)</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-3">
                Official Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/glovesstorm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/80 hover:border-slate-900 hover:text-slate-900 flex items-center justify-center text-slate-600 transition-all shadow-2xs"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/gloves-storm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/80 hover:border-slate-900 hover:text-slate-900 flex items-center justify-center text-slate-600 transition-all shadow-2xs"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/923417146935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/80 hover:border-black hover:text-black flex items-center justify-center text-slate-600 transition-all shadow-2xs"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Box */}
          <div className="p-6 bg-white/80 backdrop-blur-md border border-neutral-200 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-900 text-[10px] font-mono font-bold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900] animate-pulse" />
                <span>Instant Chat Available</span>
              </div>
              <h4 className="text-base font-bold tracking-tight text-slate-900 mb-2">
                Need urgent technical assistance?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Chat directly with our export director on WhatsApp for instant sample confirmation or tech pack review.
              </p>
            </div>
            <a
              href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#FFB900] hover:bg-[#E5A700] text-black text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,185,0,0.3)] transition-all"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>OPEN WHATSAPP CHAT</span>
            </a>
          </div>

          {/* NDA & Guarantee */}
          <div className="p-6 bg-white/75 backdrop-blur-md border border-neutral-200 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-neutral-900" />
              <span>NDA Protected Production</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              All submitted tech packs, patterns, and branding materials are treated under strict confidentiality. We sign non-disclosure agreements prior to production upon request.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] font-mono text-slate-600">
              Guaranteed IP Protection • Zero Design Leaks • Custom Molds Reserved Exclusively for You
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
