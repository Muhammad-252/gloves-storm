"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category, Project } from "@/types/database";
import {
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Box,
  Clock,
  Scissors,
  CheckCircle2,
  ChevronDown,
  Layers,
  Search,
  SlidersHorizontal,
  Compass,
  FileCheck,
  Truck,
  MessageSquare,
  DollarSign,
} from "lucide-react";
import GooeyButton from "@/components/ui/GooeyButton";
import QuoteModal from "@/components/ui/QuoteModal";

interface CategoryLandingClientProps {
  category: Category;
  products: Product[];
  categories: Category[];
  relatedProjects?: Project[];
}

// Category-specific manufacturing & engineering knowledge
const CATEGORY_INTEL: Record<
  string,
  {
    heroSubtitle: string;
    capabilities: { title: string; desc: string; icon: string }[];
    customizationHighlights: string[];
    faqs: { q: string; a: string }[];
    sampleLeadTime: string;
    productionLeadTime: string;
    standardMoq: string;
  }
> = {
  "boxing-equipment": {
    heroSubtitle: "Handcrafted Combat Equipment • Sialkot OEM Facility",
    capabilities: [
      {
        title: "Grade-A Cowhide & Technical Microfiber",
        desc: "Sourced from premier certified tanneries with uniform 1.1-1.2mm thickness, ensuring superior tear strength and tensile endurance.",
        icon: "shield",
      },
      {
        title: "Multi-Layer Handcrafted Foam Sandwich",
        desc: "Calibrated 5-layer EVA, natural open-cell latex, and under-knuckle orthopedic sponges engineered for maximum kinetic shock attenuation.",
        icon: "layers",
      },
      {
        title: "Anatomical Hand & Wrist Stabilization",
        desc: "Rigid ergonomic thumb-locks and dual-density wrist channels prevent hyperextension during high-velocity impacts.",
        icon: "scissors",
      },
      {
        title: "Double-Welted Master Seam Stitching",
        desc: "Heavy-gauge bonded nylon threads with reinforced bar-tacks withstand daily championship training regimens.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "Custom leather debossing & metallic foil stamping",
      "High-definition 3D embroidery on wrist cuffs & thumb",
      "Tailored ounce calibrations (8oz, 10oz, 12oz, 14oz, 16oz, 18oz)",
      "Custom printed water-repellent satin silk lining",
      "Lace-up pro competition or hook-and-loop velcro closures",
      "Custom rigid luxury presentation boxes & breathable mesh bags",
    ],
    faqs: [
      {
        q: "What is the minimum order quantity (MOQ) for custom boxing gloves?",
        a: "Our standard starting MOQ is 50 pairs per design/colorway across standard ounce weights. For multi-item gym kits or mixed collections, we offer flexible low-MOQ programs.",
      },
      {
        q: "How fast can I receive a physical prototype sample?",
        a: "Master physical samples are handcrafted and dispatched via express courier (DHL/FedEx) within 5 to 7 business days following tech pack and artwork sign-off.",
      },
      {
        q: "Can GLOVES STORM match our exact brand Pantone colors on leather?",
        a: "Yes. We offer custom leather vat dyeing matched directly to your specified Pantone TCX or TPX color standards.",
      },
      {
        q: "Do you supply complete boxing equipment sets for fight promotions and gyms?",
        a: "Yes, we produce matched collections including competition gloves, sparring gloves, MMA fight gloves, headguards, groin protectors, coach focus pads, and heavy punching bags.",
      },
    ],
    sampleLeadTime: "5-7 Days",
    productionLeadTime: "3-4 Weeks",
    standardMoq: "50 Pairs",
  },
  "sportswear-teamwear": {
    heroSubtitle: "High-Performance Athletic Apparel • Digital Sublimation & Cut-and-Sew",
    capabilities: [
      {
        title: "Moisture-Wicking Technical Poly-Spandex",
        desc: "Hydrophilic micro-mesh and interlock textiles engineered to pull perspiration rapidly away from the skin during intense match play.",
        icon: "shield",
      },
      {
        title: "High-Definition Italian Dye Sublimation",
        desc: "Sublimation printing using premium non-fading Italian inks that bond molecularly with textile fibers for zero peeling or cracking.",
        icon: "layers",
      },
      {
        title: "Non-Chafing Flatlock & 4-Needle Seams",
        desc: "Ultra-flat seam architecture engineered to minimize friction against athletes' skin under continuous motion.",
        icon: "scissors",
      },
      {
        title: "Graded Team Sizing Blocks (Youth to 5XL)",
        desc: "Precision CAD patterns tailored for competitive sports leagues, athletic clubs, and university athletic departments.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "All-over dynamic digital dye sublimation",
      "Tackle-twill, flocking, and high-density 3D silicone crests",
      "Individual player names, roster numbers, and sponsor placements",
      "Custom ribbed collars, arm cuffs, and ventilation mesh side panels",
      "Elasticated drawcord waistbands with non-slip silicone interior grips",
      "Branded team packaging, barcode stickers, and heat-seal inner size tags",
    ],
    faqs: [
      {
        q: "Can we submit our own team roster with individual names and numbers?",
        a: "Yes. Once your primary jersey design is approved, you simply submit your roster spreadsheet. We render and print each athlete's custom name and number at no extra per-name charge.",
      },
      {
        q: "What sports do you produce uniforms and kits for?",
        a: "We manufacture match kits and warm-up apparel for Basketball, American Football, Soccer/Football, Baseball, Rugby, Volleyball, Cricket, and Track & Field.",
      },
      {
        q: "What is your sample lead time for custom team kits?",
        a: "Printed prototype samples are completed and couriered within 4 to 6 business days.",
      },
      {
        q: "Can you reproduce discontinued historic or vintage team designs?",
        a: "Yes. Our digital design studio can replicate vintage jersey patterns, retro knits, and heritage color palettes with photographic accuracy.",
      },
    ],
    sampleLeadTime: "4-6 Days",
    productionLeadTime: "2-3 Weeks",
    standardMoq: "30 Kits",
  },
  "gym-fitness-wear": {
    heroSubtitle: "Seamless Activewear & High-Gauge Compression • Engineered for Movement",
    capabilities: [
      {
        title: "Santoni Seamless Circular Knitting",
        desc: "Precision tubular knitting creating second-skin leggings and tops with engineered body-mapped compression and zero side seams.",
        icon: "shield",
      },
      {
        title: "Squat-Proof High-Gauge Nylon-Elastane",
        desc: "Interwoven 4-way stretch fabrics tested extensively for zero opacity drop under maximum athletic flexion.",
        icon: "layers",
      },
      {
        title: "Antimicrobial & Thermo-Regulating Finishes",
        desc: "Silver-ion odor protection and breathable micro-porous textures designed to sustain high-intensity training sessions.",
        icon: "scissors",
      },
      {
        title: "Laser-Cut & Ultrasonic Bonded Hems",
        desc: "Clean, frictionless bonded finishes that maintain structural elasticity wash after wash.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "3D high-density silicone and reflective transfer logos",
      "Custom jacquard elastic waistbands and under-bust bands",
      "Removable perforated bra cups and customized strap configurations",
      "Custom scrunch butt and contour shading knit patterns",
      "Scratch-free heat-sealed inner care and size labels",
      "Custom branded frosted zip-slider polybags & hang tags",
    ],
    faqs: [
      {
        q: "Are your gym leggings and bike shorts 100% squat-proof?",
        a: "Yes. All our activewear knits undergo rigorous stretch-opacity testing under directional studio lighting to ensure complete opacity at maximum stretch.",
      },
      {
        q: "Can we create custom seamless knit textures with our brand logo woven in?",
        a: "Yes. We program our computerized Santoni seamless machines to weave your patterns, ribbing, and logos directly into the structural knit.",
      },
      {
        q: "What is the typical MOQ for custom gym and fitness apparel?",
        a: "For cut-and-sew activewear, our MOQ is 50 pieces per style/color. For custom seamless knit garments, starting MOQ is typically 100 pieces per colorway.",
      },
      {
        q: "Do you offer private-label branding services?",
        a: "Yes. We offer complete turnkey private label solutions: custom heat-seal neck labels, woven tags, hang tags, barcode labels, and retail packaging.",
      },
    ],
    sampleLeadTime: "5-7 Days",
    productionLeadTime: "3-4 Weeks",
    standardMoq: "50 Pieces",
  },
  "clothing-streetwear": {
    heroSubtitle: "Heavyweight 450+ GSM French Terry & Luxury Blanks • Cut & Sew Manufacturing",
    capabilities: [
      {
        title: "Custom-Milled 450-500 GSM French Terry",
        desc: "100% combed organic loopback cotton milled to proprietary weights, providing architectural silhouettes that hold their shape.",
        icon: "shield",
      },
      {
        title: "Heavyweight 240-280 GSM Jersey",
        desc: "Dense, pre-shrunk single jersey with heavy 1.25-inch double-ribbed collars that do not stretch out with wear.",
        icon: "layers",
      },
      {
        title: "Specialty Vintage Enzyme & Pigment Washes",
        desc: "Mineral washes, sun-fade treatments, and organic enzyme washes engineered for a genuine vintage drape and luxury hand-feel.",
        icon: "scissors",
      },
      {
        title: "Boxy & Dropped-Shoulder Silhouettes",
        desc: "Contemporary oversized streetwear blocks drafted and graded to perfection by our in-house pattern masters.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "High-density 3D puff silicone & cracked distressed screen printing",
      "Chenille patch & multi-color computerized direct embroidery",
      "Custom antique silver or matte black heavy-duty metal zippers",
      "Custom engraved metal drawcord aglets and eyelets",
      "High-density woven damask neck labels and tyvek side seam tabs",
      "Heavyweight biodegradable retail mailers and custom dust bags",
    ],
    faqs: [
      {
        q: "Can we supply our own custom tech pack or garment measurements?",
        a: "Yes. We build exactly to your measurement charts and tech packs. If you only have reference physical samples or photos, our pattern makers can draft the complete digital CAD patterns for you.",
      },
      {
        q: "How do you prevent shrinkage on heavyweight cotton hoodies and tees?",
        a: "Every fabric roll is tension-relaxed for 24 hours and undergoes pre-shrinkage and enzyme washing before laser cutting, ensuring post-wash dimensional stability below 2%.",
      },
      {
        q: "What print techniques do you support on streetwear?",
        a: "We support plastisol screen printing, water-based discharge, high-density puff, direct-to-film (DTF), chenille embroidery, chain stitch, and metallic foil stamping.",
      },
      {
        q: "What is the standard production timeline for a streetwear collection?",
        a: "Prototypes are ready in 5-7 days. Bulk production typically completes in 2 to 3 weeks depending on quantity and complexity.",
      },
    ],
    sampleLeadTime: "5-7 Days",
    productionLeadTime: "2-3 Weeks",
    standardMoq: "50 Pieces",
  },
  "custom-manufacturing-private-label": {
    heroSubtitle: "End-to-End OEM & ODM Manufacturing • Direct Factory Sialkot Backbone",
    capabilities: [
      {
        title: "Full-Package OEM / ODM Solutions",
        desc: "Complete product creation from conceptual sketch and tech pack development to commercial bulk delivery.",
        icon: "shield",
      },
      {
        title: "Strict Intellectual Property & NDA Protection",
        desc: "Your tech packs, proprietary molds, and branding remain 100% confidential under enforceable non-disclosure agreements.",
        icon: "layers",
      },
      {
        title: "Multi-Stage Inline Quality Control",
        desc: "Four-point textile inspection, dimensional checks, tensile stress tests, and final retail packaging audits.",
        icon: "scissors",
      },
      {
        title: "Seamless Global Air & Ocean Logistics",
        desc: "Direct shipping partnerships with DHL Express, FedEx, air cargo charters, and sea freight forwarders worldwide.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "Complete custom pattern development & digital CAD grading",
      "Bespoke hardware creation (custom zipper pulls, buttons, aglets)",
      "Full private label branding package (woven labels, care tags, hang tags)",
      "Custom retail packaging (kraft mailers, rigid boxes, zip sliders)",
      "Custom Pantone fabric dyeing and laboratory color strike-offs",
      "Barcode generation, SKU labeling, and individual carton palletization",
    ],
    faqs: [
      {
        q: "What does 'Private Label' mean with GLOVES STORM?",
        a: "Private label means we manufacture products entirely with your brand identity. The finished products bear exclusively your logos, custom neck tags, labels, and packaging. GLOVES STORM acts as your confidential backend factory.",
      },
      {
        q: "Can I order a mixed collection of products under one production run?",
        a: "Yes. Many of our brand partners produce coordinated drops combining combat equipment, performance activewear, and lifestyle streetwear in one shipment.",
      },
      {
        q: "Do you sign non-disclosure agreements (NDAs) before reviewing designs?",
        a: "Absolutely. We routinely sign bilateral NDAs before receiving tech packs, CAD designs, or proprietary specifications.",
      },
      {
        q: "How do payments and sample approvals work?",
        a: "Sample fees are paid upfront and are credited back toward your bulk order. Bulk production requires a standard 50% deposit upon sample approval and 50% upon final QC inspection prior to dispatch.",
      },
    ],
    sampleLeadTime: "5-7 Days",
    productionLeadTime: "3-4 Weeks",
    standardMoq: "Flexible / 50 Units",
  },
  "swimwear-beachwear": {
    heroSubtitle: "Chlorine & UV-Resistant Resort Wear • Premium Stretch Microfiber & Econyl",
    capabilities: [
      {
        title: "UPF 50+ UV-Blocking Technical Knits",
        desc: "Certified ultraviolet protection textiles safeguarding athletes and beachgoers under direct solar exposure.",
        icon: "shield",
      },
      {
        title: "Chlorine & Saltwater-Resistant Elastane",
        desc: "High-grade chlorine-resistant fibers that resist bagging, thinning, and degradation in chlorinated pools and marine environments.",
        icon: "layers",
      },
      {
        title: "Hydrophobic 4-Way Stretch Peach Microfiber",
        desc: "Ultra-fast drying board short fabrics with soft tactile finishes and zero water retention.",
        icon: "scissors",
      },
      {
        title: "Precision Ergonomic Seams & Soft Linings",
        desc: "Soft antimicrobial mesh and silky lining materials that eliminate chafing during all-day wear.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "All-over dynamic digital placement printing and sublimation",
      "Custom corrosion-resistant metal hardware (eyelets, aglets, snap buttons)",
      "Rubberized matte heat-transfer silicone brand logos",
      "Custom elastic waistbands with braided contrast drawcords",
      "Self-fabric or mesh drainage pocket systems",
      "Custom branded waterproof travel zip pouches & hang tags",
    ],
    faqs: [
      {
        q: "Are the colors resistant to pool chlorine and salt water?",
        a: "Yes. All our swimwear and beachwear textiles undergo accredited wash and exposure testing to guarantee colorfastness against chlorine, salt water, and UV radiation.",
      },
      {
        q: "Can you manufacture eco-friendly recycled swimwear?",
        a: "Yes. We source certified recycled polyester and Econyl regenerated nylon fabrics upon request for sustainable fashion and athletic brands.",
      },
      {
        q: "What types of beachwear and swimwear garments do you produce?",
        a: "We produce men's board shorts, swim trunks, women's one-piece swimsuits, bikinis, competition rash guards, surf suits, beach shirts, cover-ups, and coordinated resort sets.",
      },
      {
        q: "Can you provide hygiene liners for retail-ready swimwear?",
        a: "Yes. We apply branded or generic removable self-adhesive hygiene liner stickers to all women's and children's swim bottoms.",
      },
    ],
    sampleLeadTime: "5-7 Days",
    productionLeadTime: "2-3 Weeks",
    standardMoq: "50 Pieces",
  },
};

export default function CategoryLandingClient({
  category,
  products,
  categories,
  relatedProjects = [],
}: CategoryLandingClientProps) {
  const intel =
    CATEGORY_INTEL[category.slug] || CATEGORY_INTEL["boxing-equipment"];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [quoteModalData, setQuoteModalData] = useState<{
    isOpen: boolean;
    productName: string;
    inquiryType: "Quote" | "Sample";
  }>({
    isOpen: false,
    productName: "",
    inquiryType: "Quote",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.short_description && p.short_description.toLowerCase().includes(q)) ||
      (p.primary_keyword && p.primary_keyword.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-16">
      {/* 1. Category Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-950 text-white shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url(${
              category.image_url ||
              "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop"
            })`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

        <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase tracking-[0.25em] font-bold mb-4">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{intel.heroSubtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-5 leading-[1.05]">
            Custom {category.name}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8 max-w-2xl font-normal">
            {category.description ||
              `Direct Sialkot OEM factory manufacturing for ${category.name}. Precision-engineered for combat athletes, performance sports teams, and private-label apparel brands worldwide.`}
          </p>

          {/* Quick Manufacturing Highlights */}
          <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-lg">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Standard MOQ
              </span>
              <span className="text-sm sm:text-base font-black text-amber-400 font-mono">
                {intel.standardMoq}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Sample Dispatch
              </span>
              <span className="text-sm sm:text-base font-black text-white font-mono">
                {intel.sampleLeadTime}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Bulk Lead Time
              </span>
              <span className="text-sm sm:text-base font-black text-white font-mono">
                {intel.productionLeadTime}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <GooeyButton
              href={`/customize?category=${category.slug}`}
              variant="gold-solid"
              size="lg"
            >
              <span>START YOUR PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </GooeyButton>

            <GooeyButton
              onClick={() =>
                setQuoteModalData({
                  isOpen: true,
                  productName: `Custom ${category.name} Collection`,
                  inquiryType: "Quote",
                })
              }
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>REQUEST A QUOTE</span>
            </GooeyButton>
          </div>
        </div>
      </section>

      {/* 2. Manufacturing Capabilities & Engineering */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-700 font-bold block mb-2">
            Engineering Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
            Manufacturing Capabilities & Quality Standards
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Direct factory production control in Sialkot with full traceability,
            calibrated machinery, and strict ISO-aligned quality checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {intel.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-amber-500/40 hover:bg-amber-500/[0.02] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 mb-4 font-mono font-bold text-xs">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-tight text-neutral-950 mb-2">
                {cap.title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Customization Options Strip */}
        <div className="mt-10 pt-10 border-t border-neutral-200">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-900 font-bold mb-4">
            Available Customization & Branding Options:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {intel.customizationHighlights.map((opt, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 text-xs text-neutral-700 bg-neutral-50 px-3.5 py-2.5 rounded-xl border border-neutral-200"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Catalog Grid (15 Products in this Category) */}
      <section id="products-grid">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-700 font-bold block mb-1">
              Production Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
              {category.name} ({filteredProducts.length} Models)
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in this category..."
              className="w-full bg-white border border-neutral-300 rounded-full pl-10 pr-4 py-2 text-xs text-neutral-900 outline-none focus:border-amber-600 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8">
            <p className="text-sm text-neutral-500 mb-4">
              No products match "{searchQuery}" in this category.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-amber-700 underline"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const primaryImg =
                product.images?.find((img) => img.is_primary)?.image_url ||
                product.images?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop";

              const secondaryImg =
                product.images?.[1]?.image_url ||
                product.images?.[2]?.image_url ||
                primaryImg;

              const isHovered = hoveredProductId === product.id;

              return (
                <div
                  key={product.id}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 hover:border-amber-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(180,83,9,0.12)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300"
                >
                  {/* Image Container with Dual Image Crossfade */}
                  <Link
                    href={`/products/${category.slug}/${product.slug}`}
                    className="relative aspect-square overflow-hidden bg-neutral-100 block"
                  >
                    {/* Primary Image */}
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${
                        isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"
                      }`}
                      style={{ backgroundImage: `url(${primaryImg})` }}
                    />

                    {/* Secondary Image on Hover */}
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${
                        isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                      }`}
                      style={{ backgroundImage: `url(${secondaryImg})` }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Angle Indicator Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200 text-[10px] font-mono text-neutral-800 font-semibold shadow-xs">
                      {isHovered ? "Angle 02: Detail View" : `MOQ: ${product.moq} Units`}
                    </div>

                    {product.featured && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
                        Featured
                      </div>
                    )}
                  </Link>

                  {/* Card Details */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800 font-bold block mb-1">
                        {category.name}
                      </span>
                      <Link
                        href={`/products/${category.slug}/${product.slug}`}
                        className="text-base font-bold uppercase tracking-tight text-neutral-950 group-hover:text-amber-800 transition-colors line-clamp-1 block mb-2"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                        {product.short_description}
                      </p>

                      {/* Factory Specifications */}
                      <div className="mb-4 flex items-center justify-between text-xs text-neutral-600 bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-100">
                        <span className="font-mono text-[11px] text-neutral-500">Min. Order:</span>
                        <span className="font-mono font-bold text-neutral-900">{product.moq} pairs</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>{product.lead_time || "2-4 W"}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/products/${category.slug}/${product.slug}`}
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-900 group-hover:text-amber-800 px-2.5 py-1 transition-colors"
                        >
                          <span>EXPLORE</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>

                        <Link
                          href={`/customize?product=${product.id}`}
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 px-3 py-1 rounded-full shadow-xs transition-all font-mono"
                        >
                          <span>Customize</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Product Development / OEM Process */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-700 font-bold block mb-2">
            Turnkey OEM Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
            From Design Concept to Production Floor
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            A transparent 5-stage manufacturing pipeline designed to eliminate
            supplier friction and deliver consistent, export-certified goods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: "01",
              title: "Tech Pack Review",
              desc: "Engineering audit of your tech packs, Pantone color targets, and specification sheets.",
            },
            {
              step: "02",
              title: "Pattern & CAD",
              desc: "Digital 2D/3D pattern grading across size ranges with precise seam allowances.",
            },
            {
              step: "03",
              title: "Rapid Prototype",
              desc: "Physical pre-production sample stitched and couriered via DHL Express in 5-7 days.",
            },
            {
              step: "04",
              title: "Bulk Production",
              desc: "Precision cutting, embroidery, printing, and master assembly with inline QC inspections.",
            },
            {
              step: "05",
              title: "Global Delivery",
              desc: "Export 5-ply cartons, individual barcode labeling, and door-to-door freight clearance.",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-xl font-mono font-black text-amber-800 block mb-2">
                  {s.step}
                </span>
                <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-950 mb-2">
                  {s.title}
                </h4>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Category FAQs */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-700 font-bold block mb-2">
            Technical Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
            Frequently Asked Questions — {category.name}
          </h2>
        </div>

        <div className="space-y-3">
          {intel.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-neutral-50/50 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-950 uppercase tracking-tight">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      isOpen ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 bg-white border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Related Projects / Case Studies Connection */}
      {relatedProjects.length > 0 && (
        <section className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 border border-neutral-900 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-1">
                Verified Production Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Case Studies & Brand Productions
              </h2>
            </div>
            <Link
              href="/previous-work"
              className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-bold"
            >
              <span>View Previous Work (@glovesstorm)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-2">
                    {proj.industry}
                  </span>
                  <h4 className="text-base font-bold uppercase tracking-tight text-white mb-2">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>
                <Link
                  href="/previous-work"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-white transition-colors"
                >
                  <span>Inspect Drop on Instagram</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Section 24 Trust / Manufacturing CTA */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-14 border border-amber-600/30 bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-950 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-2">
            Direct Sialkot OEM Partner
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
            NEED SOMETHING CUSTOM IN {category.name.toUpperCase()}?
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed mb-8">
            Have a design, tech pack, or idea? We can help turn it into a
            production-ready product with bespoke patterns, custom materials,
            and complete private-label branding.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <GooeyButton
              href={`/customize?category=${category.slug}`}
              variant="gold-solid"
              size="lg"
            >
              <span>START YOUR PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </GooeyButton>

            <GooeyButton
              onClick={() =>
                setQuoteModalData({
                  isOpen: true,
                  productName: `Custom ${category.name}`,
                  inquiryType: "Sample",
                })
              }
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <span>REQUEST A SAMPLE</span>
            </GooeyButton>
          </div>
        </div>
      </section>

      {/* Quote / Sample Modal */}
      <QuoteModal
        isOpen={quoteModalData.isOpen}
        onClose={() =>
          setQuoteModalData({ ...quoteModalData, isOpen: false })
        }
        defaultProductName={quoteModalData.productName}
        defaultCategory={category.name}
        inquiryType={quoteModalData.inquiryType}
      />
    </div>
  );
}
