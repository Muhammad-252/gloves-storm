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
    h1: string;
    metaTitle: string;
    metaDescription: string;
    heroSubtitle: string;
    intro: string;
    capabilities: { title: string; desc: string; icon: string }[];
    customizationHighlights: string[];
    faqs: { q: string; a: string }[];
    sampleLeadTime: string;
    productionLeadTime: string;
    standardMoq: string;
  }
> = {
  "sportswear-teamwear": {
    h1: "Custom Sportswear & Team Uniforms Manufacturer",
    metaTitle: "Custom Sportswear & Team Uniforms Manufacturer — Low MOQ, Full Sublimation | Gloves Storm",
    metaDescription: "Custom sportswear, team jerseys, football uniforms and sports kits manufacturer. Full sublimation print, custom branding, MOQ from 30 pcs. Ships to USA and UK. 7-day samples. Free quote.",
    heroSubtitle: "Direct Sialkot Factory • Custom Team Uniforms & Sublimation Sportswear",
    intro: "Gloves Storm is a leading custom sportswear manufacturer and OEM supplier based in Sialkot, Pakistan. We engineer custom team uniforms, sublimation jerseys, football uniforms, basketball kits, soccer jerseys, and athletic training wear for sports brands, collegiate athletic departments, clubs, and distributors across the USA, UK, and worldwide. Enjoy low MOQ from 30 pieces, precision CAD grading, Italian dye sublimation, and rapid 5–7 day physical sampling.",
    capabilities: [
      {
        title: "Italian HD Digital Dye Sublimation",
        desc: "Sublimation jersey manufacturer printing with non-fading Italian inks that bond molecularly with technical poly-spandex fibers for zero cracking or peeling.",
        icon: "layers",
      },
      {
        title: "Moisture-Wicking Technical Poly-Spandex",
        desc: "Hydrophilic micro-mesh, interlock, and birds-eye textiles engineered for maximum breathability during competitive match play.",
        icon: "shield",
      },
      {
        title: "Reinforced Flatlock & 4-Needle Seams",
        desc: "Heavy-duty non-chafing seam architecture engineered to withstand high-tensile athletic friction and physical contact.",
        icon: "scissors",
      },
      {
        title: "Full Team Grading & Custom Roster Numbering",
        desc: "Youth to 5XL sizing blocks with individual player names, numbers, team logos, and sponsor graphics printed at no extra charge.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "Custom football uniforms, basketball jerseys & soccer kits",
      "American football uniforms with reinforced shoulder & chest yokes",
      "All-over Italian digital dye sublimation printing",
      "3D high-density silicone club crests & tackle twill embroidery",
      "Custom team tracksuits, warm-up jackets & training bibs",
      "Custom branded neck labels, barcode swing tags & team polybags",
    ],
    faqs: [
      {
        q: "What is the minimum order quantity (MOQ) for custom team uniforms and sportswear?",
        a: "Our standard starting MOQ is just 30 kits or jerseys per style and colorway. We offer flexible low MOQ programs for small brands, startup clubs, and mixed roster collections across standard size ranges from Youth to 5XL.",
      },
      {
        q: "How fast can I receive a prototype sample of custom sublimation jerseys?",
        a: "Master physical pre-production samples are completed and couriered via DHL Express or FedEx within 5 to 7 business days following tech pack and artwork sign-off.",
      },
      {
        q: "Can you manufacture American football, basketball, and baseball uniforms?",
        a: "Yes. As an experienced OEM sportswear manufacturer, we specialize in American football uniforms with heavy-gauge dazzle fabrics, reversible basketball jerseys, full-button baseball uniforms, soccer match kits, and custom team tracksuits.",
      },
      {
        q: "Do you offer individual player names and roster numbers on custom jerseys?",
        a: "Yes. Once your primary jersey design is approved, you provide your roster spreadsheet. We print each athlete's custom surname and roster number directly into the dye sublimation layout at zero additional per-name fee.",
      },
      {
        q: "How does shipping and customs clearance work for USA and UK sports brands?",
        a: "We provide turnkey DDP (Delivered Duty Paid) shipping to the USA and UK. We handle all export paperwork in Pakistan, air freight (3–5 days), customs clearance, and import duties directly to your doorstep with no surprise fees.",
      },
    ],
    sampleLeadTime: "5–7 Days",
    productionLeadTime: "2–3 Weeks",
    standardMoq: "30 Kits",
  },
  "gym-fitness-wear": {
    h1: "Custom Gym Wear & Private Label Activewear Manufacturer",
    metaTitle: "Custom Gym Wear & Private Label Activewear Manufacturer — MOQ 30 Pcs | Gloves Storm",
    metaDescription: "Private label gym wear, custom leggings, sports bras and activewear manufacturer. 4-way stretch nylon-spandex fabrics. MOQ 30 pcs. Your branding on every piece. Ships to USA and UK. Free quote.",
    heroSubtitle: "Sialkot OEM Factory • 4-Way Stretch Activewear & Seamless Fitness Apparel",
    intro: "Gloves Storm is a specialized private label activewear manufacturer and custom gym wear supplier located in Sialkot, Pakistan. We manufacture custom leggings, sports bras, compression wear, workout shorts, gym hoodies, and yoga wear for high-growth fitness brands across the USA, UK, and Europe. Milled with premium 4-way stretch nylon-spandex and squat-proof moisture-wicking knits. Starting MOQ from 30 pieces with full turnkey private labeling.",
    capabilities: [
      {
        title: "Squat-Proof 4-Way Stretch Nylon-Spandex",
        desc: "High-gauge interwoven compression textiles tested extensively under directional studio lighting for zero opacity drop under maximum athletic flexion.",
        icon: "shield",
      },
      {
        title: "Santoni Seamless & Circular Knitting",
        desc: "Precision tubular body-mapped compression creating second-skin leggings and tops with engineered contour shading and zero side seams.",
        icon: "layers",
      },
      {
        title: "Laser-Cut Hems & Flatlock Seaming",
        desc: "Ultrasonic bonded edges and non-chafing flatlock stitching designed to eliminate friction during high-intensity workouts and yoga sessions.",
        icon: "scissors",
      },
      {
        title: "Antimicrobial & Silver-Ion Moisture Wicking",
        desc: "Hydrophilic treatments and odor-resistant silver-ion finishes that pull sweat away from skin and maintain freshness through repeated washing.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "Custom leggings with high-waist tummy control & scrunch butt details",
      "Supportive sports bras with removable perforated cups & custom straps",
      "Men's athletic gym shorts with built-in compression liner & zip pockets",
      "3D high-density silicone transfer logos & reflective safety branding",
      "Custom jacquard woven elastic waistbands with brand typography",
      "Scratch-free heat-seal inner care labels & branded frosted slider bags",
    ],
    faqs: [
      {
        q: "What is the minimum order quantity (MOQ) for custom gym wear and private label activewear?",
        a: "Our starting MOQ is 30 pieces per style/colorway for cut-and-sew activewear, and 50 to 100 pieces for custom seamless knit collections. This low threshold enables startup fitness brands and studios to launch custom collections without excessive inventory risk.",
      },
      {
        q: "Are your custom gym leggings and bike shorts 100% squat-proof?",
        a: "Yes, absolutely. All our gym wear fabrics undergo rigorous tensile elongation and opacity testing under direct studio lighting to guarantee 100% squat-proof opacity at maximum flexion.",
      },
      {
        q: "What private label branding options do you offer for custom fitness apparel?",
        a: "We offer turnkey private label branding: custom 3D silicone heat-seal logos, reflective print transfers, jacquard woven elastic bands, custom hang tags, barcode stickers, and frosted zip-slider polybags.",
      },
      {
        q: "Can you manufacture compression wear and athletic workout clothes from our tech packs?",
        a: "Yes. We build directly from your digital CAD tech packs, measurement charts, or physical reference samples. Our master pattern makers create graded size specifications from XS to 3XL.",
      },
      {
        q: "What is the timeline for gym wear sampling and bulk production?",
        a: "Physical master samples are completed and couriered within 5 to 7 business days. Bulk production takes approximately 3 to 4 weeks, with fast 3 to 5 day DDP air courier delivery to USA and UK addresses.",
      },
    ],
    sampleLeadTime: "5–7 Days",
    productionLeadTime: "3–4 Weeks",
    standardMoq: "30 Pieces",
  },
  "clothing-streetwear": {
    h1: "Custom Streetwear & Private Label Clothing Manufacturer",
    metaTitle: "Custom Streetwear & Private Label Clothing Manufacturer — Hoodies, Tees & Joggers | Gloves Storm",
    metaDescription: "Custom streetwear, private label hoodies, tees, joggers and jackets manufacturer. Heavyweight 380–420 GSM fabrics. Embroidery, puff print, sublimation. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    heroSubtitle: "Heavyweight 400+ GSM French Terry • Cut-and-Sew Streetwear Manufacturing",
    intro: "Gloves Storm is a dedicated custom streetwear manufacturer and private label clothing factory in Sialkot, Pakistan. We craft heavyweight hoodies (380–500 GSM), luxury blank t-shirts (240–280 GSM), custom fleece joggers, cargo pants, varsity jackets, and bomber jackets for independent streetwear labels across the USA, UK, and worldwide. Master decoration techniques including 3D puff print, Tajima direct embroidery, vintage acid washes, and bespoke cut-and-sew silhouettes.",
    capabilities: [
      {
        title: "Custom-Milled 400–500 GSM French Terry",
        desc: "Heavyweight 100% combed organic cotton loopback French Terry milled to proprietary densities, giving hoodies structured architectural drape and longevity.",
        icon: "shield",
      },
      {
        title: "Heavyweight 240–280 GSM Combed Jersey",
        desc: "Ultra-dense, pre-shrunk single jersey with heavy 1.25-inch double-needle ribbed collars that maintain elasticity without stretching out.",
        icon: "layers",
      },
      {
        title: "Vintage Acid, Mineral & Enzyme Washes",
        desc: "Specialty wash laboratory producing sun-fade treatments, vintage enzyme distressing, and pigment dye washes for an authentic streetwear hand-feel.",
        icon: "scissors",
      },
      {
        title: "Boxy Oversized & Dropped-Shoulder Pattern CAD",
        desc: "Contemporary streetwear silhouettes drafted and graded with millimeter precision: boxy crops, relaxed drop-shoulders, and tapered jogger cuffs.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "High-density 3D puff screen printing & cracked distressed vintage inks",
      "Tajima multi-needle direct embroidery & chenille varsity patches",
      "Custom Melton wool and genuine leather sleeve varsity jackets",
      "Custom engraved metal aglets, branded eyelets & heavy-duty YKK zippers",
      "High-density woven damask neck tags & tyvek side seam labels",
      "Heavyweight biodegradable matte retail mailers & branded dust bags",
    ],
    faqs: [
      {
        q: "What fabric weights and GSM options do you offer for custom streetwear hoodies?",
        a: "We offer custom-milled loopback French Terry and brushed fleece in 380 GSM, 420 GSM, 460 GSM, and ultra-heavyweight 500 GSM. Every roll is tension-relaxed for 24 hours to ensure post-wash shrinkage is under 2%.",
      },
      {
        q: "What printing and embroidery techniques do you offer on custom streetwear?",
        a: "We provide 3D puff screen printing, discharge vintage screen printing, direct-to-film (DTF), Tajima direct embroidery, chenille chain-stitch patches, and custom rhinestone applications.",
      },
      {
        q: "What is the minimum order quantity (MOQ) for custom streetwear and hoodies?",
        a: "Our starting MOQ is 30 to 50 pieces per style/colorway across standard size ranges (XS to 3XL). This allows streetwear startups to drop limited capsules and test colorways without holding thousands of units.",
      },
      {
        q: "Can you manufacture custom varsity jackets with real leather sleeves?",
        a: "Yes. We produce varsity jackets with 24oz Melton wool bodies, premium top-grain cowhide leather sleeves, diamond-quilted satin linings, and multi-layer chenille embroidery.",
      },
      {
        q: "Can we provide our own custom streetwear measurement charts or tech packs?",
        a: "Yes. We build exactly to your measurement charts and tech packs. If you only have physical reference samples or mockup sketches, our in-house pattern engineers will draft full digital CAD grading for you.",
      },
    ],
    sampleLeadTime: "5–7 Days",
    productionLeadTime: "3–4 Weeks",
    standardMoq: "30 Pieces",
  },
  "custom-manufacturing-private-label": {
    h1: "OEM & Private Label Clothing Manufacturer",
    metaTitle: "Custom OEM & Private Label Clothing Manufacturer — Low MOQ, Full Branding | Gloves Storm",
    metaDescription: "Full-service OEM and private label clothing manufacturer based in Sialkot, Pakistan. Custom sportswear, activewear, streetwear. MOQ from 30 pcs, 7-day sampling, DDP shipping to USA and UK. Free tech pack review.",
    heroSubtitle: "Full-Package Apparel OEM/ODM • Sialkot Pakistan Direct Factory Facility",
    intro: "Gloves Storm is a full-service OEM and private label clothing manufacturer operating direct production facilities in Sialkot, Pakistan. We serve as the trusted backend manufacturing partner for independent apparel brands, athletic clubs, corporate clients, and fashion labels across the USA, UK, Canada, and Europe. From digital tech pack CAD drafting and low MOQ sampling to mass cut-and-sew production, custom private label trims, and insured DDP doorstep delivery.",
    capabilities: [
      {
        title: "Complete Tech Pack Prototyping & CAD Grading",
        desc: "Digital pattern drafting, grading from XS to 5XL, seam allowance validation, and precise fabric consumption optimization before cutting.",
        icon: "shield",
      },
      {
        title: "Certified Mill Sourcing & Technical Knits",
        desc: "Direct integration with OEKO-TEX Standard 100 certified knitting mills and sustainable organic cotton, poly-spandex, and fleece suppliers.",
        icon: "layers",
      },
      {
        title: "Strict Inline AQL 2.5 Quality Assurance",
        desc: "Multi-point quality control audits covering raw material inspection, tensile seam tests, dimensional tolerance checks, and pre-shipment sign-off.",
        icon: "scissors",
      },
      {
        title: "Turnkey DDP Global Freight Logistics",
        desc: "Door-to-door insured air courier (3–5 days) and ocean container shipping to USA, UK, and European ports with all customs clearance handled.",
        icon: "check",
      },
    ],
    customizationHighlights: [
      "Turnkey private labeling: woven damask labels, satin care tags & hang tags",
      "Custom hardware: laser-engraved metal buttons, snaps & branded zipper pulls",
      "Full-package apparel manufacturing covering sportswear, activewear & streetwear",
      "Bilateral Non-Disclosure Agreements (NDAs) to protect proprietary designs",
      "Custom retail packaging: frosted slider bags, custom printed boxes & barcode tags",
      "Fulfillment prep ready for Amazon FBA and retail distribution centers",
    ],
    faqs: [
      {
        q: "What is the difference between OEM, ODM, and Private Label clothing manufacturing?",
        a: "OEM (Original Equipment Manufacturing) means we build strictly to your custom designs and tech packs. ODM means you choose from our pre-developed catalog and apply your branding. Private Label means every finished piece carries solely your brand labels, custom neck tags, care labels, and packaging — Gloves Storm operates as your invisible backend factory.",
      },
      {
        q: "What is your minimum order quantity (MOQ) for custom private label apparel?",
        a: "Our starting MOQ is 30 to 50 pieces per style/colorway across standard size ranges. This allows startup brands and athletic programs to test new collections with low upfront capital.",
      },
      {
        q: "Do you sign Non-Disclosure Agreements (NDAs) before reviewing tech packs?",
        a: "Yes, absolutely. We routinely execute bilateral NDAs with our clients before reviewing proprietary designs, tech packs, CAD sketches, or artwork files.",
      },
      {
        q: "How does the sampling and order process work?",
        a: "Step 1: Submit your tech pack or design sketch for an instant manufacturing quotation. Step 2: We craft a physical pre-production sample in 5 to 7 business days. Step 3: Upon sample approval, bulk production begins (2–3 weeks). Step 4: Final QC audit and DDP doorstep delivery.",
      },
      {
        q: "Do you handle international customs clearance and shipping to the USA and UK?",
        a: "Yes. With our DDP (Delivered Duty Paid) shipping service, Gloves Storm handles export documentation in Pakistan, US Customs / HMRC UK entry, payment of applicable import duties, and final delivery directly to your facility or Amazon FBA warehouse.",
      },
    ],
    sampleLeadTime: "5–7 Days",
    productionLeadTime: "2–3 Weeks",
    standardMoq: "30 Pieces",
  },
};

export default function CategoryLandingClient({
  category,
  products,
  categories,
  relatedProjects = [],
}: CategoryLandingClientProps) {
  const intel =
    CATEGORY_INTEL[category.slug] || CATEGORY_INTEL["sportswear-teamwear"];

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
    <div className="w-full py-8 space-y-12">
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
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 bg-white p-4 sm:p-8 md:p-12 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
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
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider sm:tracking-widest font-bold mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-900 animate-pulse" />
            <span>{intel.heroSubtitle}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950 mb-3 sm:mb-4 leading-[1.12] sm:leading-[1.08]">
            {intel.h1 || `Custom ${category.name}`}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed mb-5 sm:mb-6 font-normal">
            {intel.intro ||
              category.description ||
              `Direct Sialkot OEM factory manufacturing for ${category.name}. Precision-engineered for performance sports teams, fitness labels, and private-label apparel brands worldwide.`}
          </p>

          {/* Key Manufacturing Metrics */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6 sm:mb-8 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/80 max-w-md">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                Standard MOQ
              </span>
              <span className="text-xs sm:text-sm font-bold text-neutral-950 font-mono">
                {intel.standardMoq}
              </span>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                Prototype Sample
              </span>
              <span className="text-xs sm:text-sm font-bold text-neutral-950 font-mono">
                {intel.sampleLeadTime}
              </span>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                Bulk Production
              </span>
              <span className="text-xs sm:text-sm font-bold text-neutral-950 font-mono">
                {intel.productionLeadTime}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() =>
                setQuoteModalData({
                  isOpen: true,
                  productName: `Custom ${category.name} Project`,
                  inquiryType: "Quote",
                })
              }
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(255,185,0,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer w-full sm:w-auto text-center"
            >
              <span>Request Factory Quote</span>
              <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
            </button>

            <a
              href="#products-grid"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 hover:border-[#FFB900] font-bold text-xs uppercase tracking-wider transition-all w-full sm:w-auto text-center"
            >
              <span>Explore {products.length} Models</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Sister Category Filter Pills */}
      {categories && categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-b border-neutral-200/90 pb-4">
          <Link
            href="/products"
            className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
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
                    ? "bg-[#FFB900] text-black font-extrabold shadow-xs"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900"
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
      <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-neutral-200/90 shadow-2xs space-y-6 sm:space-y-8">
        <div className="max-w-2xl">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-bold block mb-1">
            Engineering &amp; Standards
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-950 mb-1.5 sm:mb-2">
            Factory Capabilities &amp; Quality Checkpoints
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Direct production control in Sialkot with full traceability, computerized pattern grading, and strict pre-shipment inspections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {intel.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-900 transition-colors"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-950 mb-2.5 sm:mb-3.5 font-mono font-bold text-xs shadow-2xs">
                0{idx + 1}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-tight text-neutral-950 mb-1">
                {cap.title}
              </h3>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Customization Options Strip */}
        <div className="pt-4 sm:pt-6 border-t border-neutral-200">
          <h3 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-900 font-bold mb-3 sm:mb-4">
            Available Customization &amp; Private Label Branding:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {intel.customizationHighlights.map((opt, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-50 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-neutral-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Development / OEM Process */}
      <section className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-neutral-200/90 space-y-6 sm:space-y-8">
        <div className="max-w-2xl">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-bold block mb-1">
            Turnkey OEM Workflow
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-950">
            From Design Concept to Production Floor
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            A transparent 5-stage manufacturing pipeline designed to eliminate supplier friction and deliver consistent, export-certified goods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-3.5">
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
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="text-lg sm:text-xl font-mono font-black text-neutral-950 block mb-1.5 sm:mb-2">
                  {s.step}
                </span>
                <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-950 mb-1 sm:mb-1.5">
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
