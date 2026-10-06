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
  Home,
  ChevronRight,
  Ruler,
  Truck,
} from "lucide-react";
import QuoteModal from "@/components/ui/QuoteModal";
import JacketMakerProductCard from "./JacketMakerProductCard";
import CustomBespokeGridTile from "./CustomBespokeGridTile";
import CollectionBuyingGuide from "./CollectionBuyingGuide";

interface CategoryLandingClientProps {
  category: Category;
  products: Product[];
  categories: Category[];
  relatedProjects?: Project[];
}

// Category-specific manufacturing & engineering knowledge
export const CATEGORY_INTEL: Record<
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
        q: "What is your MOQ for custom streetwear collections?",
        a: "Our standard starting MOQ is 50 pieces per style/colorway across standard size ranges (XS to 3XL).",
      },
      {
        q: "Can we customize metal zipper pulls and drawcord tips with our logo?",
        a: "Yes. We cast and engrave custom metal alloy zipper pullers, branded aglets, and grommets in silver, brass, gunmetal, or matte black finishes.",
      },
    ],
    sampleLeadTime: "5-7 Days",
    productionLeadTime: "3-4 Weeks",
    standardMoq: "50 Pieces",
  },
  "custom-manufacturing-private-label": {
    heroSubtitle: "Full-Package OEM/ODM Production • Prototyping to Retail Packaging",
    capabilities: [
      {
        title: "Comprehensive Tech Pack Prototyping",
        desc: "Complete digital CAD pattern drafting, seam allowance grading, and material sourcing validation.",
        icon: "shield",
      },
      {
        title: "Certified Tannery & Mill Partnerships",
        desc: "Direct integration with REACH and OEKO-TEX certified leather tanneries and textile knitting mills.",
        icon: "layers",
      },
      {
        title: "Multi-Point Inline Quality Audits",
        desc: "AQL 2.5 quality control standards covering fabric inspection, tensile stitch tests, and dimensional verification.",
        icon: "scissors",
      },
      {
        title: "DDP Global Logistics & Customs Clearance",
        desc: "Seamless door-to-door freight to the USA, UK, Canada, and Europe with zero hidden import fees.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "Custom woven damask, printed satin, and heat-seal neck labels",
      "Laser-engraved buttons, branded snaps, and custom zipper pulls",
      "Debossed leather patches, metal badges, and silicone tags",
      "FSC-certified paper hang tags with custom string and safety pins",
      "Custom branded frosted zip-slider bags with air-release holes",
      "Full export master cartons with custom shipping marks and barcodes",
    ],
    faqs: [
      {
        q: "What is the difference between OEM and Private Label manufacturing?",
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
};

export default function CategoryLandingClient({
  category,
  products,
  categories,
  relatedProjects = [],
}: CategoryLandingClientProps) {
  const intel =
    CATEGORY_INTEL[category.slug] || CATEGORY_INTEL["boxing-equipment"];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
        <Link href="/" className="hover:text-neutral-950 flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link href="/products" className="hover:text-neutral-950 transition-colors">
          Collections
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-950 font-semibold">{category.name}</span>
      </nav>

      {/* 2. Collection Hero Banner (The Jacket Maker Style) */}
      <section className="relative rounded-3xl overflow-hidden border border-neutral-200/90 bg-white p-8 sm:p-14 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="absolute right-0 top-0 w-full sm:w-1/2 h-full opacity-10 sm:opacity-20 pointer-events-none overflow-hidden">
          <Image
            src={category.image_url || "/images/products/varsity-jacket.jpg"}
            alt={`${category.name} OEM Manufacturing Sialkot - GLOVES STORM`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-mono uppercase tracking-widest font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{intel.heroSubtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950 mb-4 leading-[1.08]">
            Custom {category.name}
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 font-normal">
            {category.description ||
              `Direct Sialkot OEM factory manufacturing for ${category.name}. Precision-engineered for combat athletes, performance sports teams, and private-label apparel brands worldwide.`}
          </p>

          {/* Key Manufacturing Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 max-w-md">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                Standard MOQ
              </span>
              <span className="text-sm font-bold text-neutral-950 font-mono">
                {intel.standardMoq}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                Prototype Sample
              </span>
              <span className="text-sm font-bold text-neutral-950 font-mono">
                {intel.sampleLeadTime}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                Bulk Production
              </span>
              <span className="text-sm font-bold text-neutral-950 font-mono">
                {intel.productionLeadTime}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setQuoteModalData({
                  isOpen: true,
                  productName: `Custom ${category.name} Project`,
                  inquiryType: "Quote",
                })
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <span>Request Factory Quote</span>
              <ArrowUpRight className="w-4 h-4 text-white/80" />
            </button>

            <a
              href="#products-grid"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Explore {products.length} Models</span>
              <ArrowRight className="w-4 h-4 text-neutral-500" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Sister Category Filter Pills */}
      {categories && categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-b border-neutral-200/90 pb-4">
          <Link
            href="/products"
            className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            All Collections
          </Link>
          {categories.map((cat) => {
            const isCurrent = cat.slug === category.slug;
            return (
              <Link
                key={cat.id}
                href={`/products/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  isCurrent
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* 4. Product Catalog Grid with Search Bar & Bespoke Interstitial Tile */}
      <section id="products-grid" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block mb-1">
              Production Catalog
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-950">
              {category.name} ({filteredProducts.length} Models Available)
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or keyword..."
              className="w-full bg-neutral-50 hover:bg-white focus:bg-white border border-neutral-200 rounded-xl focus:border-neutral-950 pl-10 pr-4 py-2 text-xs text-neutral-900 outline-none transition-colors"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8">
            <p className="text-sm text-neutral-500 mb-4">
              No products match &quot;{searchQuery}&quot; in this category.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-neutral-950 underline"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product, idx) => {
              const isPromoIndex = idx === 3;
              return (
                <div key={product.id} className="contents">
                  <JacketMakerProductCard
                    product={product}
                    category={category}
                    priority={idx < 4}
                    onInquire={(p) =>
                      setQuoteModalData({
                        isOpen: true,
                        productName: p.name,
                        inquiryType: "Quote",
                      })
                    }
                  />

                  {isPromoIndex && (
                    <CustomBespokeGridTile
                      categoryName={category.name}
                      onOpenModal={() =>
                        setQuoteModalData({
                          isOpen: true,
                          productName: `Custom Made-to-Measure ${category.name}`,
                          inquiryType: "Quote",
                        })
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Manufacturing Capabilities & Engineering */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/90 shadow-2xs space-y-8">
        <div className="max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold block mb-1">
            Engineering &amp; Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 mb-2">
            Factory Capabilities &amp; Quality Checkpoints
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Direct production control in Sialkot with full traceability, computerized pattern grading, and strict pre-shipment inspections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {intel.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-900 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-950 mb-3.5 font-mono font-bold text-xs shadow-2xs">
                0{idx + 1}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-tight text-neutral-950 mb-1.5">
                {cap.title}
              </h3>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Customization Options Strip */}
        <div className="pt-6 border-t border-neutral-200">
          <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-900 font-bold mb-4">
            Available Customization &amp; Private Label Branding:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {intel.customizationHighlights.map((opt, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-50 px-3.5 py-2.5 rounded-xl border border-neutral-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Development / OEM Process */}
      <section className="bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-200/90 space-y-8">
        <div className="max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold block mb-1">
            Turnkey OEM Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
            From Design Concept to Production Floor
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            A transparent 5-stage manufacturing pipeline designed to eliminate supplier friction and deliver consistent, export-certified goods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
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
              className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xl font-mono font-black text-neutral-950 block mb-2">
                  {s.step}
                </span>
                <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-950 mb-1.5">
                  {s.title}
                </h4>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom SEO Buying Guide & FAQ Section (Mirroring The Jacket Maker) */}
      <CollectionBuyingGuide
        category={category}
        faqs={intel.faqs}
        categories={categories}
      />

      {/* Quote / RFQ Modal */}
      <QuoteModal
        isOpen={quoteModalData.isOpen}
        onClose={() => setQuoteModalData((prev) => ({ ...prev, isOpen: false }))}
        defaultProductName={quoteModalData.productName}
        defaultCategory={category.name}
        inquiryType={quoteModalData.inquiryType}
        defaultQuantity={50}
      />
    </div>
  );
}
