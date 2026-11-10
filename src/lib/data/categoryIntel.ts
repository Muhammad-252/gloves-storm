import { BUSINESS_CONFIG } from "@/lib/business";

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
    metaTitle: "Custom Sportswear & Team Uniforms OEM",
    metaDescription: "Custom sportswear, team jerseys, and uniforms factory. Full dye sublimation printing, private labeling, low MOQ 30 pcs, and rapid 5–7 day sample delivery.",
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
        a: "We provide turnkey DDP (Delivered Duty Paid) shipping to the USA and UK. We handle all export paperwork in Pakistan, air freight (4–7 working days), customs clearance, and import duties directly to your doorstep with no surprise fees.",
      },
    ],
    sampleLeadTime: "5–7 Days",
    productionLeadTime: "2–3 Weeks",
    standardMoq: "30 Kits",
  },
  "gym-fitness-wear": {
    h1: "Custom Gym Wear & Private Label Activewear Manufacturer",
    metaTitle: "Custom Gym Wear & Activewear Factory",
    metaDescription: "Private label gym wear, custom leggings, sports bras, and activewear factory. 4-way stretch fabrics, low MOQ 30 pcs, custom branding, and DDP shipping.",
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
        a: "Physical master samples are completed and couriered within 5 to 7 business days. Bulk production takes approximately 3 to 4 weeks, with 4 to 7 working day DHL / FedEx courier delivery to USA and UK addresses.",
      },
    ],
    sampleLeadTime: "5–7 Days",
    productionLeadTime: "3–4 Weeks",
    standardMoq: "30 Pieces",
  },
  "clothing-streetwear": {
    h1: "Custom Streetwear & Private Label Clothing Manufacturer",
    metaTitle: "Custom Streetwear & Clothing Factory",
    metaDescription: "Custom streetwear factory: heavyweight hoodies, blank tees, joggers, and jackets. Heavyweight French Terry, embroidery, puff print, and low MOQ 30 pieces.",
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
        a: `Our starting MOQ is ${BUSINESS_CONFIG.moq} pieces per style/colorway across standard size ranges (XS to 3XL). This allows streetwear startups to drop limited capsules and test colorways without holding thousands of units.`,
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
    metaTitle: "Private Label Clothing Manufacturer",
    metaDescription: "Full-package private label & OEM clothing manufacturer in Sialkot, Pakistan. Tech pack development, custom trims, low MOQ 30 pcs, and DDP shipping.",
    heroSubtitle: "Full-Package Apparel OEM/ODM • Sialkot Pakistan Direct Factory Facility",
    intro: "Gloves Storm is a full-service OEM and private label clothing manufacturer operating direct production facilities in Sialkot, Pakistan. We serve as the trusted backend manufacturing partner for independent apparel brands, athletic clubs, corporate clients, and fashion labels across the USA, UK, Canada, and Europe. From digital tech pack CAD drafting and low MOQ sampling to mass cut-and-sew production, custom private label trims, and DDP doorstep delivery.",
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
        desc: "Door-to-door air courier (4–7 working days) and ocean container shipping to USA, UK, and European ports with all customs clearance handled.",
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
        a: `Our starting MOQ is ${BUSINESS_CONFIG.moq} pieces per style/colorway across standard size ranges. This allows startup brands and athletic programs to test new collections with low upfront capital.`,
      },
      {
        q: "Do you sign Non-Disclosure Agreements (NDAs) before reviewing tech packs?",
        a: "Yes, absolutely. We routinely execute bilateral NDAs with our clients before reviewing proprietary designs, tech packs, CAD sketches, or artwork files.",
      },
      {
        q: "How does the sampling and order process work?",
        a: `Step 1: Submit your tech pack or design sketch for an instant manufacturing quotation. Step 2: We craft a physical pre-production sample in ${BUSINESS_CONFIG.sampleLeadTime}. Step 3: Upon sample approval, bulk production begins (${BUSINESS_CONFIG.bulkLeadTime}). Step 4: Final QC audit and DDP doorstep delivery.`,
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
