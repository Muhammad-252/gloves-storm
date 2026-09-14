import { Suspense } from "react";
import MultiStepInquiryClient from "@/components/contact/MultiStepInquiryClient";
import { getCategories, getProducts } from "@/lib/data/store";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Clock, MessageSquare, Loader2 } from "lucide-react";
import GooeyButton from "@/components/ui/GooeyButton";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

export const metadata = {
  title: "Start a Project | Multi-Step Project Inquiry | GLOVES STORM Sialkot",
  description:
    "Submit your bespoke project dossier or request an OEM quotation directly from GLOVES STORM. Fast turnaround, low MOQ, and professional factory communication.",
};

export default async function ContactPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Banner */}
        <div className="max-w-3xl mb-12 pb-6 border-b border-neutral-200">
          <span className="text-xs uppercase tracking-[0.25em] text-[#b45309] font-mono block mb-2">
            Direct Factory Communication
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0f172a] mb-3">
            START YOUR PROJECT
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Configure your technical specifications, upload tech packs, and submit your project requirements directly to our Sialkot engineering division.
          </p>
        </div>

        {/* Conversational Multi-Step Inquiry Studio */}
        <div className="mb-16">
          <Suspense
            fallback={
              <div className="p-12 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center">
                <Loader2 className="w-8 h-8 text-[#b45309] animate-spin mb-4" />
                <p className="text-sm font-mono text-neutral-600">LOADING INQUIRY STUDIO...</p>
              </div>
            }
          >
            <MultiStepInquiryClient categories={categories} products={products} />
          </Suspense>
        </div>

        {/* Direct Factory Credentials & Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-neutral-200">
            {/* Direct Factory Contacts */}
            <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]" />
                Factory Headquarters
              </h3>

              <div className="space-y-4 text-xs text-neutral-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#0f172a] font-medium">Physical Address</span>
                    <span>Industrial Estate, Sialkot 51310, Punjab, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#0f172a] font-medium">Direct Inquiries</span>
                    <a
                      href="mailto:glovesstorm@gmail.com"
                      className="text-[#b45309] hover:underline font-medium"
                    >
                      glovesstorm@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#0f172a] font-medium">Phone / WhatsApp</span>
                    <a href="tel:+923417146935" className="hover:text-amber-700 transition-colors font-medium">
                      +923417146935
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#0f172a] font-medium">Factory Operations</span>
                    <span>Mon - Sat: 08:00 - 18:00 PKT (UTC +5)</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-5 border-t border-neutral-200">
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-3">
                  Official Channels
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/glovesstorm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 hover:border-amber-600 hover:text-amber-700 flex items-center justify-center text-neutral-600 transition-all"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/gloves-storm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 hover:border-amber-600 hover:text-amber-700 flex items-center justify-center text-neutral-600 transition-all"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/923417146935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 hover:border-[#25D366] hover:text-[#25D366] flex items-center justify-center text-neutral-600 transition-all"
                    aria-label="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="p-6 bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-500/30 rounded-2xl shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                Instant Chat Available
              </span>
              <h4 className="text-base font-bold uppercase tracking-tight text-[#0f172a] mb-2">
                Need urgent assistance?
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed mb-5">
                Chat directly with our export director on WhatsApp for instant sample confirmation or tech pack review.
              </p>
              <GooeyButton
                href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20and%20would%20like%20to%20discuss%20a%20project."
                variant="outline"
                size="md"
                className="w-full !border-emerald-600/50 hover:!border-emerald-600 !text-emerald-800"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>OPEN WHATSAPP CHAT</span>
              </GooeyButton>
            </div>

            {/* NDA & Guarantee */}
            <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 text-[#0f172a] font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-[#b45309]" />
                <span>NDA Protected Production</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                All submitted tech packs, patterns, and branding materials are treated under strict confidentiality. We sign non-disclosure agreements prior to production upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
