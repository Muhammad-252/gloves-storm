import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ulamuliwbllkrrpdbdkn.supabase.co";
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const GYM_CATEGORY_ID = "a0000001-0000-0000-0000-000000000003";

export const products = [
  {
    name: "Custom High-Waist Seamless Gym Leggings",
    slug: "custom-high-waist-seamless-gym-leggings",
    short_description: "Premium seamless knit high-waist gym leggings in 230 GSM nylon-spandex. Buttery-soft four-way stretch, scrunch bum design available, zero seam irritation. Full private label. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom High-Waist Seamless Gym Leggings represent the evolution of performance activewear for brands targeting the premium fitness market. Produced using circular seamless knitting technology on Italian knitting machines, these leggings eliminate all vertical seam lines across the body — delivering a smooth, second-skin silhouette that conventional cut-and-sew leggings cannot replicate.\n\nThe fabric is 230 GSM 78% nylon / 22% spandex circular seamless knit, selected for its exceptional softness against skin, four-way stretch performance, and the capacity to hold textured knit patterns within the fabric structure itself. Ribbed waistband zones, mesh knit panels, and tonal texture patterns are all achievable within the seamless construction without any additional cut-and-sew operations.\n\nThe high waistband is knitted as an integrated double-thickness band — sitting at the natural waist with firm, comfortable compression and no risk of rolling during movement. An internal silicone grip strip can be added to the upper waistband interior to prevent any waistband slide during high-intensity workouts.\n\nScrunch-bum construction — a rear-panel knit pattern that creates the popular lifted, contoured aesthetic — is available as a standard variant within the seamless construction.",
    materials: [
      "230 GSM 78% Nylon / 22% Spandex Circular Seamless Knit",
      "Integrated Double-Thickness High Waistband — No Seam, No Roll",
      "Optional Internal Silicone Grip Strip at Waistband Upper Edge",
      "Seamless Body Construction — Zero Vertical Seam Lines",
      "Textured Knit Zone Options — Ribbed, Mesh, Honeycomb Panels",
      "Optional Scrunch-Bum Rear Panel Construction",
      "Heat-Transfer Brand Label at Waistband Interior"
    ],
    key_features: [
      "Circular seamless knit — zero seam lines, zero skin irritation",
      "230 GSM nylon-spandex — buttery-soft premium hand feel",
      "Integrated high waistband — no rolling, firm comfortable compression",
      "Scrunch-bum rear panel available — lifted contoured aesthetic",
      "Textured knit zones — ribbed, mesh and honeycomb within same garment",
      "Optional internal silicone waistband grip strip",
      "Four-way stretch — full squat and lunge range of motion unrestricted",
      "Custom tonal or contrast knit pattern integration",
      "Squat-proof opacity confirmed on every sample"
    ],
    customization_options: [
      "Scrunch-bum or flat-back rear panel construction",
      "Textured knit panels — ribbed, mesh, honeycomb, wave or snake pattern",
      "Custom knit colour — solid, tonal two-tone, or colour-block",
      "Internal silicone grip strip addition",
      "Waistband width — 4cm, 6cm, 8cm, or 10cm",
      "Custom heat-transfer or woven waistband interior label",
      "Matching seamless sports bra co-ord production",
      "Seamless crop top or long sleeve matching set",
      "Length options — full-length, 7/8 length, or capri"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 42,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 42, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 13.80, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 10.50, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 8.20, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: true,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Seamless Gym Leggings Manufacturer — Private Label | Gloves Storm",
    primary_keyword: "custom seamless leggings manufacturer",
    secondary_keywords: "seamless gym leggings manufacturer, private label seamless activewear, custom scrunch leggings manufacturer, OEM seamless fitness wear, wholesale seamless leggings, custom seamless activewear USA UK",
    meta_description: "Custom seamless high-waist gym leggings in 230 GSM nylon-spandex. Scrunch-bum option, textured knit panels, zero seam irritation. Full private label. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom high-waist seamless gym leggings front view",
      "Custom high-waist seamless gym leggings back view with scrunch-bum detail",
      "Custom seamless knit gym leggings waistband and fabric texture",
      "Custom seamless activewear leggings model photoshoot"
    ]
  },
  {
    name: "Custom Printed Yoga Pants — Buttery Soft Private Label",
    slug: "custom-printed-yoga-pants-manufacturer",
    short_description: "Custom 250 GSM ultra-soft polyester-spandex yoga pants with all-over print or solid colour. Four-way stretch, wide waistband, hidden pocket. MOQ 30 pcs. Full private label. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Printed Yoga Pants are engineered for yoga, pilates, barre and low-impact training — a product category that demands exceptional fabric softness, unrestricted mobility and an aesthetically elevated finish that performs as well in a studio environment as it does worn casually beyond the mat.\n\nConstructed from 250 GSM 87% polyester / 13% spandex brushed single jersey — the brushed inner face produces the signature ultra-soft, velvety hand feel associated with premium yoga pants from brands including Alo Yoga and Lululemon's Align range. This brushing process raises the inner fibre slightly to create a consistent plush texture without adding meaningful weight.\n\nThe four-way stretch construction allows unrestricted movement through all planes of motion — forward folds, warrior sequences, and deep hip openers all within the fabric's stretch range. The 10cm wide flat waistband is double-layered for consistent compression without dig, and sits below the ribcage for a mid-rise option or at the natural waist for a high-rise variant.\n\nA hidden flat pocket is integrated into the waistband interior — sufficient for a folded note, a gym locker key or a small card. All-over print is achieved through dye-sublimation on the polyester substrate, enabling photographic-quality patterns, florals, abstract designs and any custom artwork.",
    materials: [
      "250 GSM 87% Polyester / 13% Spandex Brushed Single Jersey",
      "Brushed Inner Face — Ultra-Soft Velvety Hand Feel Against Skin",
      "Double-Layer 10cm Wide Waistband — Flat, No-Dig Construction",
      "Hidden Waistband Interior Pocket — Flat, Key and Card Size",
      "Full-Body Dye-Sublimation Print or Solid Reactive Dye Options",
      "Four-Way Stretch — Unrestricted Multi-Planar Flexibility",
      "Heat-Transfer or Woven Interior Waistband Label"
    ],
    key_features: [
      "250 GSM brushed polyester — ultra-soft velvety feel against skin",
      "Four-way stretch for unrestricted yoga and pilates range of motion",
      "10cm wide double-layer flat waistband — no dig, no roll",
      "Hidden waistband interior pocket — standard on all units",
      "All-over sublimation print — unlimited pattern and colour complexity",
      "Mid-rise and high-rise waistband options at same MOQ",
      "Squat-proof brushed fabric — confirmed on sample before bulk",
      "Matching crop top or tank top co-ord available",
      "Colour retention through 150+ washes without fading"
    ],
    customization_options: [
      "All-over sublimation print — any artwork, pattern or photography",
      "Solid colour reactive dye — clean minimal aesthetic",
      "High-rise or mid-rise waistband at same MOQ",
      "Waistband width — 8cm, 10cm or 12cm options",
      "Hidden pocket size — card, key or phone pocket",
      "Ruched ankle option — stirrup ankle variant",
      "Flare leg variant — yoga flare pants construction available",
      "Matching crop top, tank or long sleeve set production",
      "Custom brand woven waistband or heat-transfer label"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 38,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 38, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 12.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 9.80, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 7.60, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: true,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Yoga Pants Manufacturer — Private Label Activewear | Gloves Storm",
    primary_keyword: "custom yoga pants manufacturer",
    secondary_keywords: "private label yoga pants manufacturer, OEM yoga wear manufacturer, custom printed yoga pants, wholesale yoga pants manufacturer, custom yoga leggings manufacturer, private label yoga wear USA UK",
    meta_description: "Custom 250 GSM brushed yoga pants with sublimation print or solid colour. Ultra-soft, wide flat waistband, hidden pocket. MOQ 30 pcs. Full private label. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom printed yoga pants front view",
      "Custom printed yoga pants back view and waistband fit",
      "Custom brushed fabric yoga leggings detail",
      "Custom yoga pants full studio lifestyle shot"
    ]
  },
  {
    name: "Custom Women's Gym Crop Top — Private Label Activewear",
    slug: "custom-womens-gym-crop-top-manufacturer",
    short_description: "Custom gym crop top in 200 GSM nylon-spandex. Longline or short crop length, scoop or square neck, custom print or solid colour. MOQ 30 pcs. Co-ord set with leggings available. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Women's Gym Crop Top is a versatile activewear staple designed to bridge performance function and contemporary gym aesthetic. Available in two primary length variants — a short crop (hem sits 5–8cm above the navel) and a longline crop (hem sits 2–4cm below the navel) — this top is suited to gym training, yoga, pilates, dance fitness and athleisure styling.\n\nConstructed from 200 GSM 80% nylon / 20% spandex, the fabric delivers the four-way stretch performance expected from premium activewear while maintaining the smooth, matte hand feel that photographs well for brand content and product imagery. The inherent elasticity of the nylon-spandex blend means the top drapes and conforms to the body without the stiff structure of woven alternatives.\n\nThe under-bust band is constructed from double-layer fabric in the same material — providing light support without the structured engineering required of a sports bra. For brands requiring a top that functions as a standalone support layer, we offer an integrated removable pad cup option within the under-bust band construction.\n\nNeckline options include scoop neck, square neck, U-back and V-back variants — all available within the same MOQ, with neckline selection confirmed at the sampling stage.",
    materials: [
      "200 GSM 80% Nylon / 20% Spandex — Four-Way Stretch Body",
      "Double-Layer Under-Bust Band — Light Support Construction",
      "Optional Integrated Removable Foam Pad Cups",
      "Flatlock Seaming at Side Seams and Under-Bust Band Junction",
      "Scoop, Square or V Neckline Options — Same MOQ",
      "Custom Heat-Transfer or Woven Centre-Back Label"
    ],
    key_features: [
      "200 GSM nylon-spandex — smooth matte finish, premium hand feel",
      "Short crop or longline crop length at same MOQ",
      "Double-layer under-bust band — light support, no structured bra required",
      "Optional integrated removable pad cups for standalone support",
      "Four neckline variants — scoop, square, U-back, V-back",
      "Flatlock seaming at all skin-contact seam points",
      "Co-ord production with high-waist leggings in same order",
      "Custom sublimation print or solid colour reactive dye",
      "Heat-transfer branding at centre-back or woven label option"
    ],
    customization_options: [
      "Short crop or longline crop hem length",
      "Neckline — scoop, square, V-neck or round neck",
      "Back style — U-back, Y-back, cross-back, or regular back",
      "Removable foam cup integration",
      "Under-bust band width — 6cm, 8cm or 10cm",
      "Sublimation all-over print or tonal colour-block design",
      "Contrast colour under-bust band or binding",
      "Matching legging co-ord set production",
      "Strap thickness — spaghetti strap, medium strap, wide strap"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 30,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 30, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 8.80, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 6.90, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 5.40, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: true,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Women's Gym Crop Top Manufacturer — Private Label | Gloves Storm",
    primary_keyword: "custom gym crop top manufacturer",
    secondary_keywords: "private label crop top manufacturer, custom activewear crop top, OEM women's gym wear manufacturer, wholesale crop top manufacturer, custom fitness crop top, private label women's activewear USA UK",
    meta_description: "Custom women's gym crop tops in 200 GSM nylon-spandex. Short crop and longline options, 4 neckline variants, sublimation print or solid colour. MOQ 30 pcs. Co-ord set available. Ships to USA and UK.",
    images: [],
    image_alt_texts: [
      "Custom women's gym crop top front view",
      "Custom women's gym crop top back cutout design",
      "Custom activewear crop top under-bust band construction",
      "Custom crop top paired with high-waist workout leggings"
    ]
  },
  {
    name: "Custom Men's Gym Stringer Tank Top — OEM Fitness Wear",
    slug: "custom-mens-stringer-tank-top-manufacturer",
    short_description: "Custom men's open-side stringer tank top in 160 GSM performance polyester mesh. Deep armhole cut, racerback or classic strap, custom branding. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Men's Gym Stringer Tank Top is engineered for the bodybuilding, powerlifting and functional fitness market — a product where the open-side construction, deep armhole cut and lightweight breathable fabric are as much a statement of identity as they are a performance requirement.\n\nConstructed from 160 GSM 100% performance polyester open-mesh fabric, the stringer is designed to provide maximum ventilation during high-intensity weight training. The open-side construction runs from the underarm to the lower hem — the width of the opening is customisable from a standard 3cm cut to a competition-width 8cm full open-side. The deep armhole drops 6cm lower than a standard vest armhole, providing complete shoulder freedom during pressing and pulling movements.\n\nThe neckline can be produced in a scoop or V-cut variant, with the scoop neckline the more popular choice for the classic stringer aesthetic. The back construction transitions to either a classic vest back or a racerback, depending on the brand's design requirement. Racerback construction provides additional shoulder blade freedom for overhead movements.\n\nScreen print, sublimation or DTF branding are all applicable to the polyester mesh substrate. Embroidery is available on the chest panel only (not on the mesh side panels where the needle-penetration would compromise the open-mesh structure).",
    materials: [
      "160 GSM 100% Performance Polyester Open-Mesh — Body",
      "Open-Side Construction — Standard 3cm to Competition 8cm Width",
      "Deep Armhole Cut — 6cm Below Standard Vest Armhole Position",
      "Single-Needle Hemming — Neck, Armhole and Hem",
      "Racerback or Classic Back Strap Construction",
      "Custom Heat-Transfer or Screen Print Branding",
      "Anti-Odour Moisture-Wicking Fabric Treatment"
    ],
    key_features: [
      "160 GSM open-mesh polyester — maximum gym ventilation",
      "Open-side width options — 3cm standard to 8cm competition cut",
      "Deep armhole — 6cm below standard for full shoulder movement",
      "Anti-odour moisture-wicking polyester as standard",
      "Racerback and classic strap back at same MOQ",
      "Custom screen print, sublimation or DTF branding",
      "Light machine wash, rapid dry construction",
      "Scoop neck and V-neck variants available",
      "Available in XS through XXXL — extended sizing at same MOQ"
    ],
    customization_options: [
      "Open-side width — 3cm, 5cm, 6cm or 8cm competition cut",
      "Back style — classic strap or racerback construction",
      "Neckline — scoop or V-neck",
      "Sublimation all-over print on mesh substrate",
      "Screen print or DTF front chest or back panel",
      "Chest embroidery — small logo, woven label position",
      "Colour — solid reactive dye or sublimation colourway",
      "Extended sizing — XXXL and XXXXL available on request",
      "Matching gym shorts production in co-ord colourway"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 22,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 22, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 5.80, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 4.50, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 3.40, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Gym Stringer Tank Top Manufacturer — OEM Men's Fitness Wear | Gloves Storm",
    primary_keyword: "custom gym stringer manufacturer",
    secondary_keywords: "custom stringer tank top manufacturer, OEM gym tank top, wholesale stringer vest manufacturer, custom bodybuilding tank top, private label men's gym wear, custom gym vest manufacturer USA UK",
    meta_description: "Custom men's gym stringer tank tops in 160 GSM open-mesh polyester. Open-side width options, deep armhole, racerback or classic. MOQ 30 pcs. Custom branding. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom men's gym stringer tank top front view",
      "Custom men's gym stringer tank top racerback view",
      "Custom bodybuilding stringer side drop cut detail",
      "Custom athletic stringer vest mesh texture closeup"
    ]
  },
  {
    name: "Custom Women's Sports Tank Top — Private Label Gym Wear",
    slug: "custom-womens-sports-tank-top-manufacturer",
    short_description: "Custom women's gym tank top in 180 GSM polyester-spandex. Flowy or fitted silhouette, built-in shelf bra available, sublimation or solid colour. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Women's Sports Tank Top is a wardrobe cornerstone for any women's activewear brand — the most versatile piece in the gym wear category, worn across yoga, Pilates, light cardio, weight training and athleisure. We offer two primary construction approaches: a fitted sports tank in 180 GSM polyester-spandex, and a flowy relaxed tank in 140 GSM polyester chiffon — each suited to different brand aesthetics and end uses.\n\nThe fitted variant is cut from 180 GSM 88% polyester / 12% spandex with four-way stretch, draping closely to the body with a clean, athletic silhouette. An integrated shelf bra option adds a double-layer inner bodice from underarm to under-bust — providing light-support coverage without the construction complexity of a separate sports bra.\n\nThe relaxed flowy variant uses 140 GSM 100% polyester woven georgette — a lightweight fabric with a natural drape that suits yoga and low-impact training where a fluid, flowing aesthetic is preferred over a compression fit. This variant is particularly popular in the yoga, pilates and barre brand categories.\n\nBoth variants are available with full sublimation print, solid reactive-dye colour, or colour-block design combining solid and sublimated panels.",
    materials: [
      "180 GSM 88% Polyester / 12% Spandex — Fitted Variant",
      "140 GSM 100% Polyester Woven Georgette — Relaxed Flowy Variant",
      "Optional Integrated Shelf Bra — Double-Layer Inner Bodice, Fitted Variant",
      "Flatlock or Serger Seaming — Variant Dependent",
      "Scoop Neck, Square Neck or V-Neck Options",
      "Heat-Transfer or Woven Centre-Back Label"
    ],
    key_features: [
      "Two construction variants — fitted spandex or relaxed georgette",
      "Four-way stretch on fitted variant — full range of motion",
      "Optional integrated shelf bra on fitted variant",
      "140 GSM georgette — exceptional lightness and natural drape for yoga",
      "All-over sublimation print or solid colour reactive dye",
      "Adjustable or fixed strap construction available",
      "Co-ord production with gym leggings in same order",
      "Extended sizing XS to XXXL at same MOQ",
      "Scoop, square and V-neck all available within same MOQ"
    ],
    customization_options: [
      "Fitted spandex or relaxed georgette construction",
      "Integrated shelf bra addition — fitted variant",
      "Adjustable or fixed strap construction",
      "Neckline — scoop, square, V-neck, cowl neck",
      "Back style — straight back, racerback, cross-back",
      "Sublimation all-over print, colour-block, or solid reactive dye",
      "Contrast strap or binding colour",
      "Matching legging co-ord production",
      "Ruched side seam detail option"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 28,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 28, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 7.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 5.80, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 4.50, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Women's Sports Tank Top Manufacturer — Private Label | Gloves Storm",
    primary_keyword: "custom women's tank top manufacturer",
    secondary_keywords: "private label sports tank top manufacturer, custom women's gym wear, OEM activewear tank top, wholesale sports vest manufacturer, custom yoga tank top, private label women's fitness wear USA UK",
    meta_description: "Custom women's sports tank tops in fitted spandex or relaxed georgette. Integrated shelf bra option, sublimation or solid colour. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom women's sports tank top front view",
      "Custom women's gym tank top back racerback cut",
      "Custom workout tank top shelf bra construction",
      "Custom women's gym tank top lifestyle training fit"
    ]
  },
  {
    name: "Custom Compression Base Layer Top — Long Sleeve OEM",
    slug: "custom-compression-base-layer-top-manufacturer",
    short_description: "Custom long-sleeve compression base layer top in 220 GSM nylon-spandex. Muscle-mapped compression zoning, flatlock seaming, moisture-wicking. MOQ 30 pcs. Men's and women's fit available. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Compression Base Layer Top is engineered for athletes who rely on targeted compression to enhance circulation, reduce muscle vibration and accelerate recovery during and after training. This is a technically demanding product category — one where the pattern construction, fabric tension and seam placement all directly affect the garment's functional performance.\n\nConstructed from 220 GSM 78% nylon / 22% spandex, the fabric provides the high stretch-resistance required for effective compression without sacrificing breathability or moisture management. The four-way stretch allows full range of motion while the fabric's inherent tension provides consistent graduated compression across the chest, back and arm.\n\nMuscle-mapped compression zoning — a construction approach where seam placement and panel cutting follow the anatomical lines of the primary muscle groups — is available as a premium construction option. In this variant, the chest panel, bicep and tricep panels are cut and sewn along the line of each muscle group rather than using standard geometric panel cuts, producing more effective compression and a more anatomically aligned fit.\n\nFlatlock seaming is used throughout — essential for a base layer worn under other garments or directly against skin during extended training periods.",
    materials: [
      "220 GSM 78% Nylon / 22% Spandex — High-Compression Knit",
      "Muscle-Mapped Panel Construction — Optional Premium Variant",
      "Flatlock Seaming Throughout — Zero Seam Bulk Against Skin",
      "Moisture-Wicking Treatment — Full Garment Surface",
      "Anti-Bacterial Treatment — Reduces Odour During Extended Use",
      "Thumbhole at Cuff — Optional Addition",
      "Heat-Transfer Branding — Tagless Construction Standard"
    ],
    key_features: [
      "220 GSM nylon-spandex — effective compression without restriction",
      "Muscle-mapped panel construction option for anatomical alignment",
      "Flatlock seaming — no seam bulk, worn under kit or direct to skin",
      "Anti-bacterial and moisture-wicking dual treatment standard",
      "Long-sleeve with optional thumbhole at cuff",
      "Men's and women's anatomical pattern both available at same MOQ",
      "Tagless heat-transfer branding — no label irritation under kit",
      "Graduated compression simulation through fabric tension mapping",
      "Custom sublimation print or solid colour reactive dye"
    ],
    customization_options: [
      "Muscle-mapped panel construction or standard geometric panels",
      "Thumbhole addition at cuff — both or single cuff",
      "Men's or women's anatomical pattern",
      "Mock neck or crew neck collar construction",
      "Anti-bacterial treatment upgrade available",
      "Sublimation all-over print or solid colour",
      "Contrast colour panel at chest or sleeve",
      "Short-sleeve base layer variant at same MOQ",
      "Custom heat-transfer tagless branding"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 38,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 38, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 11.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 8.80, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 6.90, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Compression Base Layer Manufacturer — OEM Athletic Wear | Gloves Storm",
    primary_keyword: "custom compression base layer manufacturer",
    secondary_keywords: "OEM compression top manufacturer, custom base layer manufacturer, private label compression wear, wholesale compression shirt manufacturer, custom athletic compression top, compression base layer manufacturer USA UK",
    meta_description: "Custom long-sleeve compression base layer tops in 220 GSM nylon-spandex. Muscle-mapped panel option, flatlock seaming, anti-bacterial. MOQ 30 pcs. Men's and women's. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom compression base layer long sleeve front view",
      "Custom compression base layer muscle-mapped panel back view",
      "Custom compression shirt flatlock seam and cuff thumbhole",
      "Custom athletic base layer worn in training session"
    ]
  },
  {
    name: "Custom Cycling Shorts — OEM Fitness and Athleisure Wear",
    slug: "custom-cycling-shorts-manufacturer",
    short_description: "Custom 4-inch and 6-inch cycling shorts in 220 GSM nylon-spandex. High-waist construction, no side seam option, sublimation or solid. MOQ 30 pcs. Chamois pad option available. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Cycling Shorts occupy two distinct market positions simultaneously — functional cycling shorts for the performance and indoor cycling (spin class) category, and the wildly popular athleisure bike short that has become a mainstream wardrobe staple across the USA and UK women's market in the past five years.\n\nBoth functions share the same core construction: 220 GSM 80% nylon / 20% spandex in a high-compression four-way stretch knit, high-waist construction with integrated double-layer waistband, and no interior seam lines in the crotch gusset — a construction detail that is critical for both athletic comfort and the clean-line aesthetic that athleisure bike shorts require.\n\nFor the performance cycling variant, a removable chamois pad (3D foam padding insert sewn into the gusset panel) is available — providing the impact cushioning required for road and indoor cycling. The chamois pad is sewn into a removable pocket within the gusset so it can be removed for casual wear.\n\nFor the athleisure variant, the focus is on the aesthetic — a high-shine or matte finish fabric option, the elimination of any external seam at the inner thigh, and a length of either 4 inches (mid-thigh) or 6 inches (above-knee) to suit different brand positioning.",
    materials: [
      "220 GSM 80% Nylon / 20% Spandex — High-Compression Knit",
      "Double-Layer High Waistband — Flat, No-Roll Construction",
      "Seamless or Flatlock Inner Thigh Seam — No Chafe Construction",
      "Optional Removable Chamois Pad — Cycling Performance Variant",
      "Gusset Panel — Diamond Gusset for Mobility",
      "Heat-Transfer Branding — Tagless Waistband Interior"
    ],
    key_features: [
      "220 GSM nylon-spandex — firm compression, premium hand feel",
      "No inner thigh seam option — clean aesthetic and chafe-free wear",
      "Double-layer flat waistband — no rolling, consistent compression",
      "Removable chamois pad available for cycling performance use",
      "4-inch and 6-inch length at same MOQ",
      "High-shine or matte finish fabric options",
      "Custom sublimation print or solid colour reactive dye",
      "Optional grip strip at hem to prevent riding up",
      "Matching sports bra or crop top co-ord available"
    ],
    customization_options: [
      "4-inch, 6-inch or 8-inch inseam length",
      "Removable chamois pad — performance cycling variant",
      "High-shine or matte nylon finish",
      "Side pocket addition — flat pocket at outer thigh",
      "Silicone hem grip strip to prevent ride-up",
      "Sublimation all-over print or solid reactive dye",
      "Colour-block design — contrast waistband or side panel",
      "Matching sports bra or crop top co-ord production",
      "Logo heat-transfer at waistband interior"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 32,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 32, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 9.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 7.20, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 5.60, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Cycling Shorts Manufacturer — Private Label Bike Shorts | Gloves Storm",
    primary_keyword: "custom cycling shorts manufacturer",
    secondary_keywords: "private label bike shorts manufacturer, custom athleisure shorts manufacturer, OEM cycling shorts, wholesale bike shorts manufacturer, custom gym shorts manufacturer, private label cycling shorts USA UK",
    meta_description: "Custom cycling and bike shorts in 220 GSM nylon-spandex. 4-inch and 6-inch lengths, chamois pad option, sublimation or solid. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom cycling shorts front view",
      "Custom bike shorts side angle showing waistband and hem",
      "Custom athletic biker shorts gusset and seamless thigh construction",
      "Custom women's athleisure bike shorts studio model"
    ]
  },
  {
    name: "Custom Capri Gym Leggings — 3/4 Length Private Label",
    slug: "custom-capri-leggings-manufacturer",
    short_description: "Custom 3/4 length capri gym leggings in 220 GSM nylon-spandex. High-waist construction, moisture-wicking, flatlock seaming, custom print or solid. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Capri Gym Leggings offer a versatile mid-length alternative to full-length leggings — a product that performs across gym training, yoga, running and cycling, and which appeals to customers in warmer climates and to those who prefer the aesthetics of a cropped leg over a full-length silhouette.\n\nThe 3/4 length hem falls between the calf and the knee — the precise hem point is determined at the sampling stage based on the size grading of the customer's target market. For USA sizing, the 3/4 length typically falls at 24–26 inches from the waistband centre on a standard size medium.\n\nThe construction mirrors our full-length premium legging: 220 GSM 80% nylon / 20% spandex in a four-way stretch knit, double-layer high waistband, diamond gusset panel and flatlock seaming throughout. The additional option of a flared capri hem — a slight flare in the final 8cm above the hem — is available for brands targeting yoga and Pilates where a flare-hem aesthetic is current.",
    materials: [
      "220 GSM 80% Nylon / 20% Spandex — Four-Way Stretch Knit",
      "Double-Layer High Waistband — Internal Drawstring Option",
      "Diamond Gusset Panel — Mobility and Comfort Construction",
      "Flatlock Seaming Throughout — Inner Leg, Side and Gusset",
      "Optional Flared Capri Hem — Yoga and Pilates Variant",
      "Heat-Transfer or Woven Waistband Interior Label"
    ],
    key_features: [
      "3/4 length capri — versatile alternative to full-length leggings",
      "220 GSM nylon-spandex — premium compression and hand feel",
      "Flared capri hem option for yoga and pilates aesthetic",
      "Double-layer flat waistband — no roll, consistent compression",
      "Diamond gusset for full mobility range",
      "Flatlock seaming throughout — chafe-free extended wear",
      "Optional internal waistband pocket",
      "Sublimation all-over print or solid reactive dye",
      "Matching full-length legging available in same fabric"
    ],
    customization_options: [
      "Standard or flared capri hem",
      "Waistband height — mid-rise or high-rise",
      "Internal waistband pocket addition",
      "Sublimation print or solid colour",
      "Colour-block design — contrast waistband or side panel",
      "Seamless knit construction option",
      "Matching full-length legging in same print",
      "Ruched back panel option"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 34,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 34, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 10.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 8.20, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 6.40, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Capri Leggings Manufacturer — Private Label 3/4 Gym Wear | Gloves Storm",
    primary_keyword: "custom capri leggings manufacturer",
    secondary_keywords: "private label capri leggings, OEM 3/4 leggings manufacturer, custom gym capri pants, wholesale capri leggings manufacturer, custom activewear capri, private label yoga capri pants USA UK",
    meta_description: "Custom 3/4 length capri gym leggings in 220 GSM nylon-spandex. Flared hem option, high-waist, flatlock seaming, sublimation or solid. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom capri gym leggings 3/4 cropped front view",
      "Custom capri workout tights back view and high waistband",
      "Custom 3/4 length gym leggings calf hem detail",
      "Custom women's capri workout pants training model"
    ]
  },
  {
    name: "Custom Men's Training Shorts — Dual Layer OEM Gym Wear",
    slug: "custom-mens-training-shorts-manufacturer",
    short_description: "Custom men's 5-inch and 7-inch dual-layer training shorts with compression liner and woven outer shell. Side pockets, custom print or solid. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Men's Training Shorts are built for the versatility that modern athletes expect — functional across CrossFit, weight training, running, HIIT and recreational sport. The dual-layer construction combines a woven outer shell for an athletic, structured appearance with a built-in compression liner brief that provides muscle support, hygiene and freedom of movement simultaneously.\n\nThe outer shell is constructed from 120 GSM 92% polyester / 8% spandex woven stretch fabric — lightweight, quick-drying and dimensionally stable under multiple wash cycles. Four-way stretch in the woven shell ensures the outer layer moves with the body during dynamic movement without restricting range of motion.\n\nThe built-in compression liner is 180 GSM 80% polyester / 20% spandex knit — a firmer, more elastic construction that provides genuine muscular compression through the upper thigh and groin. The liner is attached at the waistband and extends 2cm below the outer shell hem for full coverage.\n\nTwo deep side pockets are standard — each pocket bag is constructed from the outer shell fabric and secured at the hip and side seam with reinforced double-needle stitching. An additional rear zip pocket can be added as a custom option.",
    materials: [
      "120 GSM 92% Polyester / 8% Spandex Woven Stretch — Outer Shell",
      "180 GSM 80% Polyester / 20% Spandex Knit — Built-In Compression Liner",
      "4cm Elasticated Waistband — Internal Flat-Cord Drawstring",
      "Two Deep Side Pockets — Reinforced Double-Needle Stitching",
      "Side Split Hem Vents — Freedom of Movement at Hem",
      "Moisture-Wicking Treatment — Outer Shell and Liner"
    ],
    key_features: [
      "Dual-layer — woven outer shell with compression liner brief",
      "120 GSM woven shell — lightweight, quick-dry, structured appearance",
      "180 GSM compression liner — genuine muscular support through upper thigh",
      "Two deep side pockets — smartphone depth standard",
      "Side split hem vents for full range of motion at knee",
      "5-inch and 7-inch inseam length at same MOQ",
      "Anti-odour treatment on liner fabric",
      "Custom sublimation, screen print or DTF on outer shell",
      "Rapid dry — outer shell dry in under 25 minutes"
    ],
    customization_options: [
      "5-inch, 7-inch or 9-inch inseam length",
      "Rear zip pocket addition",
      "Side pocket zip closure option",
      "Sublimation all-over print on woven outer shell",
      "Screen print or DTF branding on outer thigh or back panel",
      "Colour-block outer shell — contrast side panel",
      "Waistband colour — contrast or tonal to shell",
      "Custom rubberised waistband label or woven label",
      "Liner colour — contrast or matching to outer shell"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 30,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 30, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 9.20, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 7.00, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 5.50, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Men's Training Shorts Manufacturer — OEM Gym Wear | Gloves Storm",
    primary_keyword: "custom men's training shorts manufacturer",
    secondary_keywords: "OEM gym shorts manufacturer, custom workout shorts manufacturer, wholesale training shorts, private label men's gym wear, custom dual layer shorts manufacturer, men's athletic shorts manufacturer USA UK",
    meta_description: "Custom men's training shorts with woven shell and compression liner. 5-inch and 7-inch inseam, side pockets, anti-odour. MOQ 30 pcs. Sublimation or solid colour. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom men's dual-layer training shorts front view",
      "Custom men's gym shorts built-in compression liner detail",
      "Custom training shorts zippered pocket and split hem",
      "Custom men's workout shorts active gym photoshoot"
    ]
  },
  {
    name: "Custom Women's Gym Co-Ord Set — Leggings and Sports Bra",
    slug: "custom-womens-gym-coord-set-manufacturer",
    short_description: "Custom matching gym co-ord set — high-waist leggings and sports bra in 220 GSM nylon-spandex. Coordinated design, same fabric run, private label. MOQ 30 sets. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Women's Gym Co-Ord Set is produced as a matched unit — both the high-waist leggings and the sports bra are cut from the same fabric roll in the same production run, guaranteeing colour consistency between pieces in a way that cannot be achieved when garments are ordered separately or from different suppliers.\n\nThe legging component mirrors our Custom High-Waist Gym Leggings specification: 220 GSM 80% nylon / 20% spandex, double-layer waistband, flatlock seaming and four-way stretch throughout. The sports bra is cut from the same 220 GSM fabric to ensure uniform colour accuracy, with a medium support construction, wide underbust band and removable foam cups standard.\n\nThe design of the set is matched across both pieces — whether the brand specifies a solid colour, a colour-block with contrast elements or a full sublimation print, the pattern and colourway are executed consistently across both garments. Branding is applied to both pieces in the same position, size and method.\n\nFor brands building a product catalogue, the co-ord set is the single highest-impact product launch option — photographing exceptionally well for brand content, commanding higher average order values than individual pieces, and creating the brand recognition that comes from a cohesive matched aesthetic.",
    materials: [
      "220 GSM 80% Nylon / 20% Spandex — Matched Fabric for Both Pieces",
      "Leggings: Double-Layer Waistband, Flatlock Seaming, Diamond Gusset",
      "Sports Bra: Medium Support, Wide Underbust Band, Removable Foam Cups",
      "Fabric Cut from Same Roll — Guaranteed Colour Consistency",
      "Matched Branding Applied to Both Garments in Same Production",
      "Heat-Transfer or Woven Label on Both Pieces"
    ],
    key_features: [
      "Matched fabric roll — colour-accurate across legging and bra",
      "220 GSM nylon-spandex — premium hand feel on both pieces",
      "Leggings: double-layer waistband, flatlock seaming",
      "Sports bra: medium support, removable cups, wide underbust band",
      "Matched branding applied to both pieces in single production run",
      "Full sublimation, colour-block or solid colour options",
      "Scrunch bum variant available on leggings component",
      "Available with matching crop top as a three-piece set",
      "Exceptional brand content photography value"
    ],
    customization_options: [
      "Solid colour, colour-block or full sublimation matched design",
      "Scrunch bum rear panel on leggings",
      "Sports bra style — medium or high support construction",
      "Cup type — removable foam or moulded",
      "Waistband width — 4cm, 6cm or 8cm",
      "Three-piece set addition — matching crop top",
      "Seamless knit upgrade for both pieces",
      "Custom heat-transfer or woven label on both garments",
      "Matching gym bag or accessories as add-on product"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 62,
    price_tiers: [
      { label: "Sample (1–29 sets)", min_quantity: 1, max_quantity: 29, unit_price: 62, currency: "$" },
      { label: "Standard MOQ (30–199 sets)", min_quantity: 30, max_quantity: 199, unit_price: 19.80, currency: "$" },
      { label: "Volume Deal (200–499 sets)", min_quantity: 200, max_quantity: 499, unit_price: 15.50, currency: "$" },
      { label: "Enterprise Bulk (500+ sets)", min_quantity: 500, max_quantity: null, unit_price: 12.20, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: true,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Women's Gym Co-Ord Set Manufacturer — Private Label | Gloves Storm",
    primary_keyword: "custom gym co-ord set manufacturer",
    secondary_keywords: "private label gym set manufacturer, custom matching gym wear, OEM activewear set manufacturer, wholesale gym co-ord set, custom women's fitness set, private label coord set manufacturer USA UK",
    meta_description: "Custom matching gym co-ord sets — leggings and sports bra in matched 220 GSM nylon-spandex. Colour-accurate across both pieces. MOQ 30 sets. Full private label. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom women's matching gym co-ord set front view",
      "Custom sports bra and legging set back details",
      "Custom coordinated fitness apparel set fabric and color match",
      "Custom women's activewear matching set editorial shot"
    ]
  },
  {
    name: "Custom Men's Gym Training Vest — Performance Sleeveless Top",
    slug: "custom-mens-gym-training-vest-manufacturer",
    short_description: "Custom men's sleeveless training vest in 160 GSM moisture-wicking polyester. Curved hem, dropped armhole, custom sublimation or print. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Men's Gym Training Vest offers a cleaner, more structured alternative to the stringer — a sleeveless top with a conventional shoulder seam and moderate armhole cut, suited to gym training, athletics, team sports warm-up and casual athletic wear.\n\nConstructed from 160 GSM 100% moisture-wicking polyester single jersey, the vest is lightweight and thermally efficient for warm-environment training. The curved hem is cut longer at the back than the front — a standard construction that prevents the vest riding up at the rear during overhead movements. The armhole is cut 3cm deeper than a standard t-shirt for freedom of shoulder movement without the full open-side construction of a stringer.\n\nA racerback variant is available — where the back shoulder straps converge to a single spine running the length of the back — providing greater scapular freedom during pulling exercises. Both variants (standard sleeveless and racerback) are available at the same MOQ.\n\nFull sublimation print is the primary branding method for this product — producing team-kit quality colour and pattern complexity across all panels simultaneously. Screen print and DTF are alternatives for simpler branding requirements.",
    materials: [
      "160 GSM 100% Moisture-Wicking Performance Polyester",
      "Full-Body Dye-Sublimation Print or Solid Reactive Dye",
      "Curved Hem — Back Longer Than Front",
      "Dropped Armhole — 3cm Below Standard T-Shirt Armhole",
      "Standard Sleeveless or Racerback Construction",
      "Single-Needle Clean Hemming at Neck, Armhole and Hem"
    ],
    key_features: [
      "160 GSM moisture-wicking polyester — lightweight and breathable",
      "Curved back hem prevents ride-up during movement",
      "Dropped armhole — greater shoulder freedom than standard t-shirt",
      "Racerback variant for maximum scapular movement",
      "Full sublimation — unlimited colours and design complexity",
      "Quick-dry — dry in under 20 minutes after training",
      "Team kit application — individual player naming and numbering",
      "Anti-odour polyester treatment as standard",
      "Available XS to XXXL at same MOQ"
    ],
    customization_options: [
      "Standard sleeveless or racerback construction",
      "Mesh panel inserts — side panels or full back panel",
      "Sublimation all-over print or solid reactive dye",
      "Screen print or DTF branding on chest or back",
      "Player name and number integration for team orders",
      "Contrast colour binding at armhole and neck",
      "Curved hem or straight hem option",
      "Matching team shorts production in co-ord colour"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 24,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 24, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 6.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 5.00, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 3.90, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Men's Gym Vest Manufacturer — OEM Training Top | Gloves Storm",
    primary_keyword: "custom gym vest manufacturer",
    secondary_keywords: "custom men's training vest manufacturer, OEM sleeveless gym top, wholesale gym vest manufacturer, custom athletic vest manufacturer, private label men's gym wear, men's training top manufacturer USA UK",
    meta_description: "Custom men's gym training vests in 160 GSM moisture-wicking polyester. Racerback or standard, sublimation or solid colour. Team kit numbering available. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom men's sleeveless gym training vest front view",
      "Custom athletic vest back view showing curved hem",
      "Custom men's gym vest neckline and dropped armhole detail",
      "Custom fitness training vest workout model"
    ]
  },
  {
    name: "Custom Lightweight Gym Hoodie — Performance Pullover",
    slug: "custom-lightweight-gym-hoodie-manufacturer",
    short_description: "Custom 280 GSM performance cotton-polyester lightweight gym hoodie. Moisture-wicking fleece, kangaroo pocket, custom embroidery or print. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Lightweight Gym Hoodie occupies the space between a technical training layer and the heavyweight streetwear pullover — a performance-oriented hoodie intended for warm-up, cool-down, and casual gym wear rather than the premium streetwear applications of our 420 GSM heavyweight variant.\n\nAt 280 GSM 65% cotton / 35% polyester French terry fleece, the weight is appropriate for a training environment — warm enough for outdoor warm-up in mild weather, breathable enough to wear through a light training session without overheating, and light enough to carry in a gym bag without adding meaningful pack weight.\n\nFrench terry construction — a smooth face with a looped interior — provides warmth through the looped pile while the smooth face accepts print applications cleanly. Sublimation print is not appropriate on cotton-blend fabrics; branding options for this product are screen print, DTF print and embroidery.\n\nThe raglan sleeve construction — where the sleeve runs in one piece from the collar to the cuff without a shoulder seam — is available as an alternative to the standard set-in sleeve, providing a cleaner athletic silhouette and slightly greater arm mobility.",
    materials: [
      "280 GSM 65% Cotton / 35% Polyester French Terry — Body and Sleeves",
      "1x1 Ribbed Cotton-Spandex — Cuffs, Hem and Hood Trim",
      "Kangaroo Pocket with Internal Bag Lining",
      "Flat-Cord Drawstring Hood — Metal or Rubber Tip",
      "Set-In or Raglan Sleeve Construction Options",
      "Screen Print, DTF or Embroidery Branding — Polyester-Cotton Substrate"
    ],
    key_features: [
      "280 GSM French terry — lightweight performance weight for training use",
      "65/35 cotton-polyester — moisture-management with cotton comfort",
      "French terry smooth face — clean surface for screen print and DTF",
      "Raglan sleeve option — athletic silhouette and enhanced arm mobility",
      "Kangaroo pocket — standard with internal lining",
      "Custom embroidery, screen print or DTF branding",
      "Lighter than streetwear hoodie — gym bag friendly",
      "1x1 ribbed cuffs and hem — strong shape retention",
      "Available in garment-dye washed finish on request"
    ],
    customization_options: [
      "Set-in or raglan sleeve construction",
      "Garment-dye or enzyme-washed finish",
      "Embroidery, screen print or DTF branding",
      "Chest, sleeve, hood or back branding position",
      "Drawstring colour and tip style",
      "Custom neck label — woven or heat-transfer tagless",
      "Colour-panel variation — contrast sleeves or panels",
      "Weight upgrade to 320 GSM or 380 GSM available",
      "Zip-through variant at same MOQ"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 36,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 36, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 11.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 8.80, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 6.90, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Lightweight Gym Hoodie Manufacturer — OEM Training Wear | Gloves Storm",
    primary_keyword: "custom gym hoodie manufacturer",
    secondary_keywords: "lightweight gym hoodie manufacturer, OEM training hoodie, custom performance hoodie manufacturer, private label gym hoodie, wholesale gym sweatshirt manufacturer, custom activewear hoodie USA UK",
    meta_description: "Custom 280 GSM lightweight gym hoodies in French terry cotton-polyester. Raglan or set-in sleeve, embroidery or screen print. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom lightweight gym hoodie pullover front view",
      "Custom training hoodie back view and hood profile",
      "Custom athletic fleece hoodie kangaroo pocket and cuff detail",
      "Custom gym pullover hoodie athletic training photo"
    ]
  },
  {
    name: "Custom Full-Zip Training Jacket — OEM Performance Outerwear",
    slug: "custom-full-zip-training-jacket-manufacturer",
    short_description: "Custom full-zip performance training jacket in 200 GSM polyester tricot. Stand collar, two zip pockets, sublimation panels or solid. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Full-Zip Training Jacket serves as the outer layer in a complete training kit — worn over base layers or mid-layers for warm-up, cool-down and travel between training venues. Constructed from 200 GSM 100% polyester tricot, the jacket provides wind resistance and light water repellency through the fabric's tight tricot weave while remaining breathable enough for moderate training intensity.\n\nThe full-length zip — YKK-compatible standard — runs from hem to chin, allowing the jacket to be worn fully open, half-open or fully closed. The stand collar sits 4cm above the collarbone when fully zipped, providing collar protection during outdoor warm-up in cool conditions. Two side zip pockets provide secure storage during training and travel.\n\nSublimation print is fully applicable on 100% polyester tricot — producing team-kit quality colour accuracy and unlimited design complexity across all panels. Panel embroidery on the chest and back is available as an alternative or complement to sublimation.\n\nA lightweight padding upgrade — 80g/m² light polyester wadding between the outer shell and lining — is available for brands targeting cold-weather training applications.",
    materials: [
      "200 GSM 100% Polyester Tricot — Outer Shell",
      "Full-Length YKK-Compatible Zip — Chin Guard at Top",
      "Stand Collar — 4cm Height, Structured",
      "Two Side Zip Pockets — Reinforced Zip Entry",
      "Stretch Mesh Lining — Full or Panel Lining Options",
      "Full Dye-Sublimation Print or Embroidery Branding",
      "Optional 80g/m² Light Polyester Wadding Padding"
    ],
    key_features: [
      "200 GSM polyester tricot — wind resistant, light water repellent",
      "Full-length YKK-compatible zip with chin guard",
      "Stand collar — protection and structured athletic appearance",
      "Two secure side zip pockets",
      "Full sublimation print — team kit quality across all panels",
      "Optional lightweight padding upgrade for cold-weather use",
      "Stretch mesh lining — comfort against base layer",
      "Team kit application — player naming and logo integration",
      "Matching training pants available for tracksuit set production"
    ],
    customization_options: [
      "Full sublimation print or panel embroidery branding",
      "Lightweight padding upgrade — 80g/m² wadding",
      "Full lining or panel lining option",
      "Collar height — stand collar, half-zip mock neck, or flat collar",
      "Thumb holes at cuff addition",
      "Custom zip pull branding — engraved or rubberised",
      "Matching training pants for full tracksuit set",
      "Player name and number on back panel",
      "Sponsor logo placement on chest, sleeve or back"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 45,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 45, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 16.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 12.80, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 9.90, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Training Jacket Manufacturer — OEM Gym Outerwear | Gloves Storm",
    primary_keyword: "custom training jacket manufacturer",
    secondary_keywords: "OEM sports jacket manufacturer, custom full-zip jacket manufacturer, wholesale training jacket, private label gym jacket, custom athletic jacket manufacturer, sublimation jacket manufacturer USA UK",
    meta_description: "Custom full-zip training jackets in 200 GSM polyester tricot. Stand collar, two zip pockets, full sublimation. Padding upgrade available. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom full-zip training jacket front view",
      "Custom athletic training jacket back view with team branding",
      "Custom warm-up jacket zipper chin guard and collar detail",
      "Custom performance tracksuit jacket athlete studio shot"
    ]
  },
  {
    name: "Custom Performance Sports Polo Shirt — OEM Gym Wear",
    slug: "custom-sports-polo-shirt-manufacturer",
    short_description: "Custom performance polo shirt in 180 GSM moisture-wicking polyester piqué. Three-button placket, sublimation or embroidery branding. MOQ 30 pcs. Gym, golf and team applications. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Performance Sports Polo Shirt bridges gym wear, team sports and corporate athletic branding — a product category with strong demand from golf brands, gym franchise operators, corporate wellness programmes and premium sports clubs seeking a polished athletic identity beyond jersey construction.\n\nConstructed from 180 GSM 100% polyester piqué knit, the polo delivers the classic textured surface associated with quality polo construction, while the 100% polyester composition provides moisture-wicking performance, shape retention and colour-fastness that cotton piqué cannot match. The piqué texture also provides an ideal surface for detailed embroidery — the woven structure supporting fine-needle embroidery with minimal puckering risk.\n\nThe three-button placket runs 16cm from the collar opening, allowing the polo to be worn open-collared or fully buttoned. The collar is produced from the same piqué fabric — self-tipping on solid colour variants, or contrast-tipped on two-colour designs. Side seam splits of 4cm at the hem provide ease of movement during athletic activities.",
    materials: [
      "180 GSM 100% Polyester Piqué Knit",
      "Three-Button Placket — 16cm from Collar, Matching Buttons",
      "Self-Tipped or Contrast-Tipped Collar",
      "4cm Side Seam Splits at Hem",
      "Moisture-Wicking Treatment — Full Garment",
      "Embroidery or Sublimation Branding Options",
      "Custom Woven or Heat-Transfer Neck Label"
    ],
    key_features: [
      "180 GSM polyester piqué — athletic performance in classic polo aesthetic",
      "Three-button placket with matching or contrast buttons",
      "Self-tipped or contrast-tipped collar construction",
      "4cm side seam splits — freedom of movement at hem",
      "Ideal embroidery surface — piqué structure supports fine-needle detail",
      "Moisture-wicking polyester — performance function in classic form",
      "Sublimation available on polyester substrate",
      "Golf, gym, team and corporate athletic applications",
      "Available XS to XXXL at same MOQ"
    ],
    customization_options: [
      "Contrast collar and cuff option",
      "Sublimation stripe or panel design on polyester substrate",
      "Chest embroidery — left chest logo standard position",
      "Sleeve embroidery or screen print additional branding",
      "Custom button colour — matching or contrast",
      "Side vent depth — 4cm, 6cm or no vent options",
      "Long-sleeve polo variant at same MOQ",
      "Women's fitted polo variant at same MOQ",
      "Custom neck label — woven brand label standard"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 28,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 28, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 8.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 6.50, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 5.00, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Performance Polo Shirt Manufacturer — OEM Gym Wear | Gloves Storm",
    primary_keyword: "custom sports polo shirt manufacturer",
    secondary_keywords: "OEM polo shirt manufacturer, custom gym polo shirt, private label polo manufacturer, wholesale sports polo, custom performance polo manufacturer, custom golf polo shirt manufacturer USA UK",
    meta_description: "Custom performance polo shirts in 180 GSM polyester piqué. Three-button placket, embroidery or sublimation branding. Gym, golf and team applications. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom performance sports polo shirt front view",
      "Custom sports polo collar and placket detail",
      "Custom performance polo shirt embroidered chest logo",
      "Custom polo athletic golf and gym apparel wear"
    ]
  },
  {
    name: "Custom Lightweight Running Jacket — Packable OEM Design",
    slug: "custom-running-jacket-manufacturer",
    short_description: "Custom packable running jacket in 80 GSM ripstop nylon. Windproof, water-resistant DWR coating, reflective details, packs into chest pocket. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Lightweight Running Jacket is designed for brands serving the running, cycling and outdoor fitness market — where packability, wind protection and water resistance are the primary functional requirements, and weight is a critical consideration.\n\nConstructed from 80 GSM 100% ripstop nylon with a Durable Water Repellent (DWR) coating, the jacket packs down into its own chest pocket — producing a fist-sized packed unit that stores easily in a running vest, gym bag or jacket pocket. The ripstop grid weave provides tear resistance at minimal fabric weight, preventing minor abrasions from propagating into structural damage.\n\nWind resistance through the nylon ripstop construction blocks the convective heat loss that dramatically reduces perceived temperature at running pace — making this jacket functional in temperatures where a t-shirt alone would be insufficient but a full training jacket excessive.\n\nThe DWR coating repels light rain, providing practical wet-weather protection without the weight of a waterproof membrane.\n\nReflective tape detailing on the chest, back and sleeves provides 360-degree low-light visibility — a safety requirement for road running brands targeting the early-morning and evening training market in the USA and UK.",
    materials: [
      "80 GSM 100% Ripstop Nylon Outer Shell",
      "DWR (Durable Water Repellent) Coating — Full Garment",
      "Reflective Tape Detail — Chest, Back and Sleeve Positions",
      "Packs Into Own Chest Pocket — Integrated Stuff-Sack",
      "Elasticated Cuffs — Wind-Seal at Wrist",
      "Full-Length YKK-Compatible Zip",
      "Mesh Panel Underarm Venting — Bilateral"
    ],
    key_features: [
      "80 GSM ripstop nylon — featherlight wind and water protection",
      "Packs into chest pocket — fist-sized for gym bag storage",
      "DWR water-repellent coating — light rain resistance standard",
      "Reflective tape — 360-degree low-light visibility",
      "Mesh underarm venting for temperature regulation at pace",
      "Elasticated cuffs — wind seal at wrist during running",
      "Chin guard on zip — comfort during full-zip running",
      "Custom sublimation on nylon substrate or solid reactive dye",
      "Available XS to XXXL at same MOQ"
    ],
    customization_options: [
      "Sublimation print on nylon outer shell",
      "Reflective print integration — custom logo in reflective ink",
      "Hood addition — packable hood stored in collar",
      "Underarm mesh panel size — standard or extended ventilation",
      "Elasticated or Velcro cuff closure option",
      "Thumb hole at cuff addition",
      "Custom inner lining colour",
      "Custom zip pull branding",
      "Matching running tights or shorts co-ord production"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 45,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 45, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 15.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 12.00, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 9.50, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Running Jacket Manufacturer — Lightweight OEM | Gloves Storm",
    primary_keyword: "custom running jacket manufacturer",
    secondary_keywords: "OEM windbreaker manufacturer, custom packable jacket manufacturer, private label running jacket, wholesale running jacket supplier, custom athletic jacket manufacturer, lightweight jacket manufacturer USA UK",
    meta_description: "Custom lightweight running jackets in 80 GSM DWR-coated ripstop nylon. Packable, wind-resistant, reflective details. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom lightweight running jacket front view",
      "Custom running windbreaker back view with reflective stripe",
      "Custom running jacket packed down into chest pocket pouch",
      "Custom athletic windbreaker running outdoor photography"
    ]
  },
  {
    name: "Custom Men's Gym Set — Performance T-Shirt and Shorts",
    slug: "custom-mens-gym-set-manufacturer",
    short_description: "Custom matched men's gym set — performance t-shirt and training shorts in coordinated design. Sublimation print or solid colour. MOQ 30 sets. Private label. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Men's Gym Set provides brands with a coordinated two-piece men's training solution — a performance t-shirt and dual-layer training shorts cut from matched fabrics in the same production run to ensure colour accuracy between pieces.\n\nThe t-shirt component is 160 GSM 100% moisture-wicking performance polyester in a regular fit — not oversized and not compression fit, but a clean athletic silhouette suited to gym training, team warm-up and casual athletic wear. The shorts component is the same 120 GSM woven stretch polyester shell with a 180 GSM compression liner brief.\n\nBoth pieces are produced in the same colourway or sublimation print design, with branding applied to both simultaneously in the same production run. For team applications, player names and numbers are integrated into the sublimation print across both t-shirt back and shorts waistband or outer panel.",
    materials: [
      "160 GSM 100% Performance Polyester — T-Shirt",
      "120 GSM Woven Stretch Polyester / 180 GSM Liner — Shorts",
      "Matched Fabric Production — Same Colourway Guaranteed",
      "Full Dye-Sublimation Print or Solid Reactive Dye",
      "T-Shirt: Crew Neck, Set-In Sleeve, Curved Hem",
      "Shorts: 4cm Waistband, Internal Drawstring, Two Side Pockets"
    ],
    key_features: [
      "Matched production — colour-accurate t-shirt and shorts in same run",
      "160 GSM moisture-wicking t-shirt — athletic regular fit",
      "Shorts with compression liner brief — comfort and support",
      "Sublimation print across both pieces simultaneously",
      "Team application — player name and number integration",
      "Both pieces branded in matching branding application",
      "Available XS to XXXL at same MOQ",
      "Rapid dry — both pieces dry in under 30 minutes",
      "Anti-odour treatment on both garments standard"
    ],
    customization_options: [
      "T-shirt fit — regular, fitted or relaxed silhouette",
      "Shorts inseam — 5-inch, 7-inch or 9-inch",
      "Sublimation print or solid colour reactive dye",
      "Player name and number integration for team orders",
      "Contrast piping or side panel on both pieces",
      "Custom branded waistband on shorts",
      "Rear zip pocket on shorts addition",
      "Matching gym vest instead of t-shirt option",
      "Custom woven or heat-transfer label on both pieces"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 48,
    price_tiers: [
      { label: "Sample (1–29 sets)", min_quantity: 1, max_quantity: 29, unit_price: 48, currency: "$" },
      { label: "Standard MOQ (30–199 sets)", min_quantity: 30, max_quantity: 199, unit_price: 14.50, currency: "$" },
      { label: "Volume Deal (200–499 sets)", min_quantity: 200, max_quantity: 499, unit_price: 11.00, currency: "$" },
      { label: "Enterprise Bulk (500+ sets)", min_quantity: 500, max_quantity: null, unit_price: 8.80, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Men's Gym Set Manufacturer — OEM Fitness Wear | Gloves Storm",
    primary_keyword: "custom men's gym set manufacturer",
    secondary_keywords: "custom men's gym wear set, OEM training set manufacturer, private label men's fitness set, wholesale gym set manufacturer, custom men's activewear set, men's gym set manufacturer USA UK",
    meta_description: "Custom matched men's gym sets — performance t-shirt and training shorts in same production run. Sublimation or solid, team application available. MOQ 30 sets. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom men's gym set t-shirt and shorts front view",
      "Custom men's activewear 2-piece set back layout",
      "Custom men's training tee and lined short coordinated details",
      "Custom athletic team gym set training model"
    ]
  },
  {
    name: "Custom Long Sleeve Training Top — OEM Athletic Wear",
    slug: "custom-long-sleeve-training-top-manufacturer",
    short_description: "Custom long-sleeve training top in 170 GSM polyester-spandex. Crew or mock neck, thumbhole cuffs, moisture-wicking. MOQ 30 pcs. Sublimation or solid. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Long Sleeve Training Top is a transitional season training essential — the layer worn when a t-shirt is insufficient and a hoodie is excessive. Produced in 170 GSM 88% polyester / 12% spandex, it provides the four-way stretch range of motion required for dynamic training while the fabric weight offers meaningful warmth above a base layer without restricting thermal regulation.\n\nThe crew neck or mock neck collar option suits different brand aesthetics — the crew neck producing a clean, understated athletic silhouette, the mock neck (4cm stand) adding a premium structured appearance popular in performance athletic branding.\n\nThumbholes at both cuffs are a standard feature — preventing the sleeve from riding up during overhead movements and providing additional hand coverage during outdoor training in cool conditions. The thumbhole opening is reinforced with a keyhole stitched construction to prevent extension of the opening under repeated use.",
    materials: [
      "170 GSM 88% Polyester / 12% Spandex — Four-Way Stretch",
      "Crew Neck or Mock Neck (4cm Stand) Collar Options",
      "Thumbhole at Both Cuffs — Keyhole Reinforced Opening",
      "Flatlock Seaming at Sleeves and Side Seams",
      "Moisture-Wicking Treatment — Full Garment",
      "Full Dye-Sublimation Print or Solid Reactive Dye"
    ],
    key_features: [
      "170 GSM polyester-spandex — warmth and mobility in one layer",
      "Crew or mock neck collar at same MOQ",
      "Thumbholes at both cuffs — reinforced keyhole construction",
      "Flatlock seaming — chafe-free against skin",
      "Moisture-wicking treatment standard",
      "Full sublimation print or solid reactive dye",
      "Matching tight or short production available",
      "Anti-odour treatment available as upgrade",
      "Available XS to XXXL at same MOQ"
    ],
    customization_options: [
      "Crew neck or mock neck collar",
      "Thumbhole or closed cuff option",
      "Raglan or set-in sleeve construction",
      "Sublimation print or solid reactive dye",
      "Colour-panel — contrast sleeves or shoulder yoke",
      "Custom heat-transfer tagless label",
      "Matching compression tight co-ord",
      "Anti-odour treatment upgrade"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 30,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 30, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 8.80, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 6.80, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 5.20, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Long Sleeve Training Top Manufacturer — OEM Athletic Wear | Gloves Storm",
    primary_keyword: "custom long sleeve training top manufacturer",
    secondary_keywords: "OEM athletic long sleeve manufacturer, custom training top manufacturer, private label long sleeve gym top, wholesale training shirt manufacturer, custom fitness long sleeve, long sleeve gym top manufacturer USA UK",
    meta_description: "Custom long-sleeve training tops in 170 GSM polyester-spandex. Crew or mock neck, thumbhole cuffs, sublimation or solid. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom long sleeve training top front view",
      "Custom athletic long sleeve shirt back view",
      "Custom training top thumbhole cuff and sleeve seam detail",
      "Custom fitness long sleeve workout athlete model"
    ]
  },
  {
    name: "Custom Women's Sports Jacket — OEM Fitted Athletic Outerwear",
    slug: "custom-womens-sports-jacket-manufacturer",
    short_description: "Custom women's fitted sports jacket in 200 GSM stretch polyester tricot. Contoured fit, two zip pockets, thumbhole cuffs, sublimation or solid. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Women's Sports Jacket delivers a fitted athletic outerwear piece designed specifically to the female anatomy — not a unisex jacket graded for women, but a garment pattern-drafted from a women's-specific block with contoured seaming through the waist, a shaped hem that is longer at the back than the front, and sleeve length calibrated to women's arm proportions.\n\nConstructed from 200 GSM 95% polyester / 5% spandex stretch tricot, the jacket provides the wind resistance and light water repellency of the tricot weave while the spandex content allows the fitted silhouette to move comfortably with the body during training. A full-length YKK-compatible zip and thumbholes at both cuffs complete the functional specification.",
    materials: [
      "200 GSM 95% Polyester / 5% Spandex Stretch Tricot",
      "Women's-Specific Contoured Pattern Block",
      "Full-Length YKK-Compatible Zip",
      "Thumbhole at Both Cuffs — Keyhole Reinforced",
      "Two Side Zip Pockets",
      "Shaped Hem — Longer Back Than Front",
      "Full Sublimation or Solid Reactive Dye"
    ],
    key_features: [
      "Women's-specific contoured pattern — not unisex graded down",
      "200 GSM stretch tricot — wind resistance and body movement",
      "Full-length zip with chin guard",
      "Thumbholes at both cuffs",
      "Two side zip pockets",
      "Shaped hem for coverage during training",
      "Full sublimation print or solid reactive dye",
      "Matching sports bra and legging co-ord available",
      "Available XXS to XXXL at same MOQ"
    ],
    customization_options: [
      "Sublimation print or solid reactive dye",
      "Contrast colour zip, cuffs and collar",
      "Thumbhole or standard cuff option",
      "Hood addition at collar",
      "Matching legging and sports bra set production",
      "Team logo or brand embroidery on chest",
      "Custom zip pull branding",
      "Interior mesh lining or no lining"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 42,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 42, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 14.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 11.00, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 8.50, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Women's Sports Jacket Manufacturer — OEM Athletic Wear | Gloves Storm",
    primary_keyword: "custom women's sports jacket manufacturer",
    secondary_keywords: "OEM women's athletic jacket, private label sports jacket manufacturer, custom women's gym jacket, wholesale women's training jacket, custom fitted sports jacket, women's athletic jacket manufacturer USA UK",
    meta_description: "Custom women's fitted sports jackets in 200 GSM stretch tricot. Women's pattern block, thumbholes, two zip pockets. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom women's fitted sports jacket front view",
      "Custom women's sports jacket back silhouette and curved hem",
      "Custom gym jacket thumbholes and zipper chin guard detail",
      "Custom women's athletic jacket lifestyle fitness shoot"
    ]
  },
  {
    name: "Custom Rash Guard — Short and Long Sleeve OEM",
    slug: "custom-rash-guard-manufacturer",
    short_description: "Custom rash guard in 200 GSM nylon-spandex. Short and long sleeve, UPF 50+ fabric, flatlock seaming, full sublimation. MOQ 30 pcs. Surf, swim, MMA and gym applications. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Rash Guard is engineered for surf, open water swimming, MMA and BJJ (Brazilian Jiu-Jitsu), water polo and gym cross-training applications. Constructed from 200 GSM 80% nylon / 20% spandex, the fabric provides a 50+ UPF sun protection rating — blocking over 98% of UV radiation — while remaining lightweight, chlorine-resistant and quick-drying.\n\nThe construction uses flatlock seaming throughout — a critical requirement for rash guards, where raised seam ridges would cause skin abrasion during activities involving contact with other bodies, surfboards, gym mats or water. The flatlock stitch lies completely flat against the skin on both the exterior and interior face of the seam.\n\nFull sublimation print is the standard branding approach — producing the vivid, complex designs expected from premium surf and BJJ brands. A 10cm rear zip neck opening option is available, allowing the rash guard to be put on and removed without distorting the neckline through repeated pulling over the head.",
    materials: [
      "200 GSM 80% Nylon / 20% Spandex — UPF 50+ Rated",
      "Chlorine-Resistant Fabric Treatment",
      "Flatlock Seaming Throughout — No Raised Seam Against Skin",
      "Short-Sleeve and Long-Sleeve Variants — Same MOQ",
      "Full Dye-Sublimation Print — UV-Stable Inks",
      "Optional 10cm Rear Neck Zip — Entry and Exit Ease"
    ],
    key_features: [
      "200 GSM nylon-spandex — UPF 50+ UV protection",
      "Chlorine-resistant fabric — pool, open water and competition use",
      "Flatlock seaming — zero skin abrasion under contact",
      "Short-sleeve and long-sleeve at same MOQ",
      "Full sublimation print — unlimited colour and design complexity",
      "UV-stable inks — colour-fast in sun exposure",
      "Optional rear neck zip for easy wear",
      "Four-way stretch — full range of motion in all directions",
      "Available XS to XXXL at same MOQ"
    ],
    customization_options: [
      "Short-sleeve or long-sleeve at same MOQ",
      "Rear neck zip addition",
      "Integrated compression shorts option — full wetsuit-style",
      "Zip length — 10cm neck or full-length front",
      "Sublimation print — any artwork, team design or brand identity",
      "Contrast colour flatlock stitch — visible seam as design element",
      "Custom heat-transfer tagless label at collar interior",
      "Extended sizing — competition fit or relaxed fit silhouette",
      "BJJ belt colour collar trim option"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 35,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 35, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 11.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 8.80, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 6.90, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Rash Guard Manufacturer — OEM Surf and MMA Wear | Gloves Storm",
    primary_keyword: "custom rash guard manufacturer",
    secondary_keywords: "OEM rash guard manufacturer, custom BJJ rash guard manufacturer, private label rash guard, wholesale rash guard manufacturer, custom surf rash guard, custom MMA rash guard manufacturer USA UK",
    meta_description: "Custom rash guards in 200 GSM nylon-spandex UPF 50+ fabric. Short and long sleeve, flatlock seaming, full sublimation. Surf, MMA and swim applications. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom sublimated rash guard front view",
      "Custom long sleeve compression rash guard back view",
      "Custom athletic rash guard flatlock stitching and UPF fabric detail",
      "Custom BJJ and MMA training rash guard athlete photo"
    ]
  },
  {
    name: "Custom Lightweight Gym Joggers — OEM Performance Pants",
    slug: "custom-lightweight-gym-joggers-manufacturer",
    short_description: "Custom 200 GSM polyester-spandex lightweight gym joggers. Tapered leg, elasticated ankle cuffs, two zip pockets, sublimation or solid. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Lightweight Gym Joggers are a performance alternative to the heavyweight cotton-fleece streetwear jogger — designed specifically for active training use where the cotton fleece weight is impractical but a structured woven training pant is too formal. Produced in 200 GSM 88% polyester / 12% spandex French rib knit, the fabric provides four-way stretch range of motion, moisture management and thermal regulation appropriate for active gym training.\n\nThe tapered silhouette narrows from the upper thigh to the ankle, with the ankle cuffed in 1x1 rib for an elasticated fit that prevents the hem catching during functional training movements. The 8cm waistband combines an elasticated outer construction with a concealed internal drawstring — providing reliable waist security during dynamic movement without visible drawstring detail from the front.\n\nTwo zip-closure side pockets are standard — securing contents during training where open pockets would not be appropriate. The zip runs 12cm vertically at each side, providing access while minimising bulk at the pocket opening.\n\nFull sublimation print is applicable on the polyester substrate — allowing team branding, brand identity patterns and colour-block designs across all panels.",
    materials: [
      "200 GSM 88% Polyester / 12% Spandex French Rib Knit",
      "Tapered Leg Construction — Narrowing to Ribbed Ankle Cuff",
      "1x1 Ribbed Ankle Cuffs — Elasticated Fit at Hem",
      "8cm Elasticated Waistband — Concealed Internal Drawstring",
      "Two Zip-Closure Side Pockets — 12cm Vertical Entry",
      "Full Dye-Sublimation Print or Solid Reactive Dye"
    ],
    key_features: [
      "200 GSM polyester-spandex — active training weight, four-way stretch",
      "Tapered silhouette — athletic profile without bulk",
      "Zip-closure side pockets — secure during all training activities",
      "1x1 ribbed ankle cuffs — no hem interference during movement",
      "8cm waistband with concealed drawstring — clean front appearance",
      "Moisture-wicking treatment standard",
      "Full sublimation or solid reactive dye",
      "Matching training top, t-shirt or jacket co-ord production",
      "Available XS to XXXL at same MOQ"
    ],
    customization_options: [
      "Sublimation print or solid reactive dye",
      "Zip or open side pockets",
      "Cuffed ankle or open hem variant",
      "Waistband width — 6cm, 8cm or 10cm",
      "Side panel contrast colour or piping",
      "Team branding — player name or squad number",
      "Matching training jacket for tracksuit set",
      "Woven side-seam label or heat-transfer waistband interior label",
      "Reflective piping detail addition"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 34,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 34, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 10.80, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 8.20, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 6.40, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Lightweight Gym Joggers Manufacturer — OEM Training Pants | Gloves Storm",
    primary_keyword: "custom gym joggers manufacturer",
    secondary_keywords: "OEM training pants manufacturer, custom gym sweatpants manufacturer, private label gym joggers, wholesale athletic joggers manufacturer, custom performance pants manufacturer, gym pants manufacturer USA UK",
    meta_description: "Custom lightweight 200 GSM polyester-spandex gym joggers. Tapered, zip pockets, sublimation or solid. Matching training jacket available. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom lightweight gym joggers front view",
      "Custom tapered athletic joggers back view",
      "Custom training jogger zippered pocket and ribbed ankle cuffs",
      "Custom gym sweatpants athlete workout shot"
    ]
  },
  {
    name: "Custom Women's Flare Leg Yoga Pants — OEM Studio Wear",
    slug: "custom-flare-yoga-pants-manufacturer",
    short_description: "Custom 250 GSM brushed nylon-spandex flare leg yoga pants. Wide flat waistband, 70s-inspired flare below knee, buttery soft feel. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Flare Leg Yoga Pants represent the strongest trend movement in women's yoga and Pilates wear over the past two years — replacing the straight-leg silhouette that dominated the category for over a decade with a flared cut that begins at the knee and expands to a full flare at the ankle, creating an elegant, feminine silhouette that performs as well in a studio setting as it looks in lifestyle photography.\n\nConstructed from 250 GSM 87% polyester / 13% spandex brushed single jersey, the fabric delivers the ultra-soft velvety hand feel that defines premium yoga wear. The flare is constructed with additional fabric swept into the lower leg panel below the knee, producing a gradual flare that falls approximately 8cm wider than the standard tapered leg at the ankle on a size medium.\n\nThe wide flat waistband sits at the natural waist — 10cm double layer — providing a smooth, non-dig compression that holds position through inversions, forward folds and deep lunges. The high waist also provides the coverage required for floor-based yoga practice.",
    materials: [
      "250 GSM 87% Polyester / 13% Spandex Brushed Single Jersey",
      "Flare Construction Below Knee — 8cm Wider Than Tapered Leg at Ankle",
      "10cm Double-Layer Flat High Waistband — No-Dig Compression",
      "Hidden Waistband Interior Pocket — Key and Card Size",
      "Four-Way Stretch — Full Yoga Practice Range of Motion",
      "Heat-Transfer or Woven Waistband Interior Label"
    ],
    key_features: [
      "250 GSM brushed polyester — ultra-soft velvety feel against skin",
      "Flare leg from knee — elegant studio and lifestyle silhouette",
      "10cm wide double-layer flat waistband — no dig in inversions",
      "Hidden waistband pocket — standard",
      "Four-way stretch — full yoga practice range of motion",
      "Squat-proof brushed fabric — opacity confirmed on sample",
      "Matching crop top or tank co-ord available",
      "Solid colour, colour-block or sublimation print options",
      "Available in XS to XXXL at same MOQ"
    ],
    customization_options: [
      "Flare width — subtle 6cm, standard 8cm or dramatic 12cm flare",
      "Waistband height — mid-rise or high-rise option",
      "Pocket size — small or phone-compatible pocket",
      "Sublimation print or solid reactive dye",
      "Colour-block — contrast waistband or leg panel",
      "Matching crop top or sports bra co-ord production",
      "Stirrup ankle addition inside flare hem",
      "Ruched rear panel option on high-waist variant"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 38,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 38, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 12.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 9.80, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 7.60, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "3-4 Weeks",
    seo_title: "Custom Flare Yoga Pants Manufacturer — Private Label Studio Wear | Gloves Storm",
    primary_keyword: "custom flare yoga pants manufacturer",
    secondary_keywords: "private label flare pants manufacturer, OEM yoga flare pants, custom wide leg yoga pants, wholesale yoga flare leggings, custom yoga wear manufacturer, flare yoga pants manufacturer USA UK",
    meta_description: "Custom flare leg yoga pants in 250 GSM brushed polyester-spandex. 10cm flat waistband, four-way stretch, sublimation or solid. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom women's flare leg yoga pants front view",
      "Custom flare yoga trousers ankle opening profile",
      "Custom high-waist flare yoga leggings waistband and rear fit",
      "Custom pilates studio flare yoga pants lifestyle shoot"
    ]
  },
  {
    name: "Custom High-Waist Biker Shorts — Premium Athleisure Wear",
    slug: "custom-high-waist-biker-shorts-manufacturer",
    short_description: "Custom 220 GSM high-shine or matte nylon-spandex high-waist biker shorts. No inner thigh seam, wide waistband, custom print or solid. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom High-Waist Biker Shorts are the athleisure category's bestselling product format — a garment that has transcended sportswear and become a wardrobe staple for women across a wide age demographic in the USA and UK. The combination of the high-waist silhouette, the compression-knit nylon fabric and the 6-inch inseam creates a proportionally flattering and functionally versatile piece that wears equally well at the gym, running errands, or as a foundation layer under oversized tops.\n\nTwo fabric finish options are offered: a matte 220 GSM nylon-spandex for a clean, understated aesthetic, and a high-shine 220 GSM nylon-spandex for the reflective sheen finish associated with premium athleisure labels. Both finishes use the same fabric weight and construction.\n\nThe critical construction detail for this product is the elimination of the inner thigh seam. A standard seam at the inner thigh creates a visible line that disrupts the clean silhouette — in our construction, the inner leg panels are cut without this seam, using instead a gusset panel that eliminates any visible seam line from the front or side view.",
    materials: [
      "220 GSM Matte or High-Shine 80% Nylon / 20% Spandex",
      "No Inner Thigh Seam — Clean Silhouette Construction",
      "10cm Double-Layer High Waistband — Wide Flat Construction",
      "Gusset Panel — Mobility and Hygiene Construction",
      "Silicone Grip Strip at Hem — Prevents Ride-Up Option",
      "Heat-Transfer Interior Waistband Branding"
    ],
    key_features: [
      "220 GSM nylon-spandex — matte or high-shine finish at same MOQ",
      "No inner thigh seam — uninterrupted clean silhouette",
      "10cm wide high-waist double-layer flat waistband",
      "Optional silicone grip strip at hem prevents ride-up",
      "4-inch and 6-inch inseam length options",
      "Sublimation all-over print or solid reactive dye",
      "Optional side pocket addition",
      "Co-ord production with matching sports bra or crop top",
      "Available XS to XXXL at same MOQ"
    ],
    customization_options: [
      "Matte or high-shine fabric finish",
      "4-inch or 6-inch inseam length",
      "Side pocket addition — flat outer thigh pocket",
      "Silicone hem grip strip",
      "Sublimation print or solid colour",
      "Colour-block design — contrast waistband",
      "Matching sports bra or crop top co-ord",
      "Custom heat-transfer waistband interior label",
      "Waistband width — 8cm, 10cm or 12cm"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 30,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 30, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 9.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 7.20, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 5.60, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom High-Waist Biker Shorts Manufacturer — Private Label | Gloves Storm",
    primary_keyword: "custom biker shorts manufacturer",
    secondary_keywords: "high waist biker shorts manufacturer, private label biker shorts, OEM athleisure shorts, custom cycling shorts manufacturer, wholesale biker shorts, biker shorts manufacturer USA UK",
    meta_description: "Custom high-waist biker shorts in 220 GSM matte or high-shine nylon-spandex. No inner thigh seam, wide waistband, sublimation or solid. MOQ 30 pcs. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom high-waist biker shorts front view",
      "Custom athleisure biker shorts back view showing flattering cut",
      "Custom women's biker shorts waistband and seamless inner thigh",
      "Custom high-waist biker shorts casual athleisure styling"
    ]
  },
  {
    name: "Custom Sports Hijab — Breathable Athletic Headwear",
    slug: "custom-sports-hijab-manufacturer",
    short_description: "Custom sports hijab in 160 GSM moisture-wicking polyester-spandex. Secure pin-free construction, breathable mesh zones, custom colour or print. MOQ 30 pcs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Sports Hijab addresses a significant and growing segment of the women's activewear market — Muslim women who participate in sport and fitness at every level from recreational to elite competitive, and who require headwear that combines religious modesty compliance with genuine athletic performance function.\n\nConstructed from 160 GSM 92% polyester / 8% spandex performance knit, the sports hijab provides lightweight breathability appropriate for high-intensity training. The construction is pin-free — a critical requirement for sports applications where loose fabric or pins could create safety hazards. The silhouette is produced as a two-piece or one-piece construction depending on brand specification.\n\nThe standard one-piece construction pulls on from the front, wrapping cleanly around the head and extending to cover the neck and chest. An internal non-slip silicone strip at the forehead band prevents the fabric from shifting during high-movement activities. Breathable mesh panels at the crown and rear of the head improve ventilation in the highest heat-accumulation zones.",
    materials: [
      "160 GSM 92% Polyester / 8% Spandex Performance Knit — Main Body",
      "Breathable Open-Mesh Polyester — Crown and Rear Panel Zones",
      "Non-Slip Internal Silicone Strip — Forehead Band",
      "Pin-Free One-Piece or Two-Piece Construction Options",
      "Moisture-Wicking Treatment — Full Garment",
      "Heat-Transfer or Woven Interior Brand Label"
    ],
    key_features: [
      "Pin-free construction — safe for all athletic applications",
      "Non-slip internal silicone forehead strip",
      "Breathable mesh crown and rear panels",
      "Moisture-wicking performance polyester",
      "One-piece pull-on or two-piece construction",
      "Custom colour and sublimation print options",
      "Available in one universal size with stretch accommodation",
      "Lightweight — minimal pack weight in kit bag",
      "UPF 50 rating available as fabric upgrade"
    ],
    customization_options: [
      "One-piece pull-on or two-piece tie construction",
      "Mesh panel size — small or extended ventilation zones",
      "Sublimation print or solid reactive dye",
      "Chin strap addition for high-movement sports",
      "UPF 50+ fabric upgrade",
      "Matching activewear co-ord colour",
      "Custom heat-transfer interior label"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 22,
    price_tiers: [
      { label: "Sample (1–29 pcs)", min_quantity: 1, max_quantity: 29, unit_price: 22, currency: "$" },
      { label: "Standard MOQ (30–199 pcs)", min_quantity: 30, max_quantity: 199, unit_price: 6.50, currency: "$" },
      { label: "Volume Deal (200–499 pcs)", min_quantity: 200, max_quantity: 499, unit_price: 5.00, currency: "$" },
      { label: "Enterprise Bulk (500+ pcs)", min_quantity: 500, max_quantity: null, unit_price: 3.80, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Sports Hijab Manufacturer — Athletic Headwear OEM | Gloves Storm",
    primary_keyword: "custom sports hijab manufacturer",
    secondary_keywords: "OEM sports hijab manufacturer, private label athletic hijab, custom Islamic sportswear manufacturer, wholesale sports hijab supplier, custom muslim activewear, sports hijab manufacturer USA UK",
    meta_description: "Custom sports hijabs in 160 GSM polyester-spandex. Pin-free, breathable mesh zones, non-slip forehead strip. MOQ 30 pcs. Custom colour or print. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom sports hijab front profile",
      "Custom breathable athletic hijab side mesh panels",
      "Custom athletic headscarf silicone grip band and neck coverage",
      "Custom sports hijab active training athlete"
    ]
  },
  {
    name: "Custom Gym Bag Set — Tote and Drawstring Private Label",
    slug: "custom-gym-bag-manufacturer",
    short_description: "Custom fabric gym bag set — canvas tote and polyester drawstring bag with custom screen print or embroidery. MOQ 30 sets. Ideal for brand gifting, club kits and team packs. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Gym Bag Set provides brands, gyms and sports clubs with a branded carry solution that extends the brand touchpoint beyond the garment. Produced as a two-piece set — a canvas tote and a polyester drawstring bag — the set covers the primary bag needs for most gym and training applications.\n\nThe tote bag component is produced from 12oz (330 GSM) natural cotton canvas with a gusseted base and 60cm cotton webbing handles. The main compartment is unlined with a zip interior pocket on one side wall. Branding is applied via screen print on the front panel (standard) or embroidery on the front panel (premium variant).\n\nThe drawstring bag is produced from 210 denier polyester with a reinforced corner construction and double-cord drawstring through a sleeve at the bag top. The primary branding application is screen print on the front panel — the flat surface of the drawstring bag accepts detailed, multi-colour screen print applications cleanly.",
    materials: [
      "12oz (330 GSM) Natural Cotton Canvas — Tote Bag",
      "60cm Cotton Webbing Handles — Tote Bag",
      "210 Denier Polyester — Drawstring Bag",
      "Double-Cord Drawstring with Cord Lock — Drawstring Bag",
      "Screen Print or Embroidery Branding — Both Bags",
      "Zip Interior Pocket — Tote Bag Side Wall"
    ],
    key_features: [
      "Two-piece set — canvas tote and polyester drawstring",
      "12oz cotton canvas tote — premium unbleached natural aesthetic",
      "Gusseted tote base — flat-bottom stability when loaded",
      "Zip interior pocket in tote side wall",
      "Reinforced corner construction on drawstring bag",
      "Multi-colour screen print applicable to both bags",
      "Embroidery upgrade available on tote front panel",
      "Ideal for club kits, team packs and brand gifting",
      "Custom colour options on drawstring bag"
    ],
    customization_options: [
      "Screen print colour quantity — 1 to 4 colour print",
      "Embroidery on tote front panel — premium branding",
      "Tote bag colour — natural, black, navy, or custom",
      "Drawstring bag colour — any Pantone reference",
      "Zip pocket size and placement on tote",
      "Long handle (shoulder carry) or short handle (hand carry) tote",
      "Custom cord colour on drawstring bag",
      "Set packaging — custom tissue and drawstring bag for gifting"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 28,
    price_tiers: [
      { label: "Sample (1–29 sets)", min_quantity: 1, max_quantity: 29, unit_price: 28, currency: "$" },
      { label: "Standard MOQ (30–199 sets)", min_quantity: 30, max_quantity: 199, unit_price: 8.50, currency: "$" },
      { label: "Volume Deal (200–499 sets)", min_quantity: 200, max_quantity: 499, unit_price: 6.20, currency: "$" },
      { label: "Enterprise Bulk (500+ sets)", min_quantity: 500, max_quantity: null, unit_price: 4.80, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 30,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Gym Bag Manufacturer — OEM Branded Fitness Bags | Gloves Storm",
    primary_keyword: "custom gym bag manufacturer",
    secondary_keywords: "OEM gym bag manufacturer, custom branded drawstring bag, private label gym bag, wholesale gym bag manufacturer, custom sports bag manufacturer, custom canvas tote gym bag USA UK",
    meta_description: "Custom gym bag sets — canvas tote and polyester drawstring bag with screen print or embroidery. MOQ 30 sets. Ideal for team packs and brand gifting. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom gym bag set canvas tote and drawstring bag",
      "Custom canvas gym tote bag with printed brand logo",
      "Custom polyester drawstring gym bag front print",
      "Custom fitness accessory tote bag interior pocket and zipper"
    ]
  },
  {
    name: "Custom Sports Headband and Wristband Set — OEM Athletic Accessories",
    slug: "custom-sports-headband-wristband-set-manufacturer",
    short_description: "Custom sports headband and wristband set in 260 GSM stretch terry cotton. Custom embroidery or screen print, any colour. MOQ 50 sets. Ideal for team kits, club gifting and brand accessories. Ships to USA and UK.",
    full_description: "The Gloves Storm Custom Sports Headband and Wristband Set provides athletic brands, gyms and sports clubs with a branded accessory product at an accessible MOQ — ideal for club merchandise programmes, team kit additions, corporate gifting and introductory brand products for businesses launching a gym wear line who need an entry-level branded product before committing to full garment production.\n\nThe set consists of one headband (6cm wide, elasticated full-circumference construction) and two wristbands (6cm wide, matching construction) — all produced from 260 GSM 80% cotton / 20% spandex stretch terry knit. The terry loop surface provides sweat absorption during training, while the spandex content ensures the elasticated construction maintains its return and retains circumference accuracy through repeated washing.\n\nEmbroidery is the primary branding method — the terry loop surface of the headband and wristbands is an ideal embroidery substrate, producing clean, legible brand logos and wordmarks without the puckering risk associated with finer stretch fabrics. Screen print is available as a lower cost alternative for simple one or two colour logos.",
    materials: [
      "260 GSM 80% Cotton / 20% Spandex Stretch Terry Knit",
      "6cm Wide Headband — Full Circumference Elasticated",
      "6cm Wide Wristbands — Pair, Full Circumference Elasticated",
      "Terry Loop Surface — Sweat Absorption and Embroidery Substrate",
      "Embroidery or Screen Print Branding — Both Products",
      "Custom Colour Reactive Dye — Full Pantone Range"
    ],
    key_features: [
      "260 GSM stretch terry — sweat absorption and embroidery surface",
      "Set of one headband and two wristbands 6cm wide construction — comfortable fit across head and wrist sizes",
      "Embroidery branding — clean and durable on terry substrate",
      "Any Pantone colour reactive dye",
      "Washes reliably through full season of use",
      "Ideal introductory brand product for new gym wear labels",
      "Team kit addition — matches team jersey colourway",
      "Available in full size range for headbands and wristbands"
    ],
    customization_options: [
      "Embroidery or screen print branding",
      "Headband and wristband colour — any Pantone reference",
      "Width — 4cm, 6cm or 8cm construction",
      "Embroidery size and positioning",
      "Custom branded polybag packaging for the set",
      "Matching jersey or gym wear co-ord colour",
      "Set composition — headband only, wristbands only, or full set",
      "Custom box or pouch packaging for gifting"
    ],
    show_wholesale_tiers_publicly: true,
    sample_price_usd: 18,
    price_tiers: [
      { label: "Sample (1–49 sets)", min_quantity: 1, max_quantity: 49, unit_price: 18, currency: "$" },
      { label: "Standard MOQ (50–199 sets)", min_quantity: 50, max_quantity: 199, unit_price: 5.50, currency: "$" },
      { label: "Volume Deal (200–499 sets)", min_quantity: 200, max_quantity: 499, unit_price: 4.20, currency: "$" },
      { label: "Enterprise Bulk (500+ sets)", min_quantity: 500, max_quantity: null, unit_price: 3.10, currency: "$" }
    ],
    category: "Gym & Fitness Wear",
    is_active: true,
    feature_on_homepage: false,
    moq: 50,
    lead_time: "2-3 Weeks",
    seo_title: "Custom Sports Headband and Wristband Manufacturer — OEM Accessories | Gloves Storm",
    primary_keyword: "custom sports headband manufacturer",
    secondary_keywords: "OEM sports accessories manufacturer, custom gym headband manufacturer, private label wristband manufacturer, wholesale sports headband set, custom athletic headband, custom wristband manufacturer USA UK",
    meta_description: "Custom sports headband and wristband sets in 260 GSM stretch terry cotton. Embroidery or screen print. MOQ 50 sets. Any colour. Ideal for team kits and club merchandise. Ships to USA and UK. Free quote.",
    images: [],
    image_alt_texts: [
      "Custom sports headband and wristband set display",
      "Custom embroidered sweat headband detail",
      "Custom athletic wristbands pair with stitched logo",
      "Custom tennis and gym headband wristband accessory packaging"
    ]
  }
];

async function execute() {
  console.log("=== 1. Writing updated gym-fitness-wear-products.json file ===");
  const jsonContent = {
    category: "Gym & Fitness Wear",
    products: products
  };
  fs.writeFileSync(
    path.join(__dirname, "gym-fitness-wear-products.json"),
    JSON.stringify(jsonContent, null, 2),
    "utf-8"
  );
  console.log("✅ gym-fitness-wear-products.json written with", products.length, "products.");

  console.log("\n=== 2. Connecting to Supabase REST ===");
  // Step 2a: Check existing Gym products
  const listRes = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=id,name,slug&category_id=eq.${GYM_CATEGORY_ID}`,
    {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`
      }
    }
  );
  const existingProds = await listRes.json();
  console.log(`Found ${existingProds.length} existing products in category Gym & Fitness Wear:`);
  existingProds.forEach((p) => console.log(` - [${p.slug}] ${p.name} (id: ${p.id})`));

  const existingIds = existingProds.map((p) => p.id);

  if (existingIds.length > 0) {
    console.log(`\n=== 3. Deleting previous products from category Gym & Fitness Wear ===`);
    // Delete product_images for existing products if any
    const imgDelRes = await fetch(
      `${SUPABASE_URL}/rest/v1/product_images?product_id=in.(${existingIds.join(",")})`,
      {
        method: "DELETE",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          Prefer: "return=representation"
        }
      }
    );
    console.log("Product images delete status:", imgDelRes.status);

    // Delete products in this category
    const delRes = await fetch(
      `${SUPABASE_URL}/rest/v1/products?category_id=eq.${GYM_CATEGORY_ID}`,
      {
        method: "DELETE",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          Prefer: "return=representation"
        }
      }
    );
    const delResult = await delRes.json();
    console.log(`Deleted ${delResult.length} previous products.`);
  }

  console.log(`\n=== 4. Inserting ${products.length} new products into category Gym & Fitness Wear ===`);
  let counter = 1;
  const records = products.map((prod) => {
    const id = `b0000003-0000-0000-0000-${String(counter).padStart(12, "0")}`;
    counter++;

    const customizationPayload = {
      list: prod.customization_options,
      image_alt_texts: prod.image_alt_texts,
      primary_keyword: prod.primary_keyword,
      secondary_keywords: prod.secondary_keywords,
      pricing_tiers: prod.price_tiers || [],
      sample_price: prod.sample_price_usd,
      show_pricing: prod.show_wholesale_tiers_publicly
    };

    return {
      id,
      name: prod.name,
      slug: prod.slug,
      category_id: GYM_CATEGORY_ID,
      short_description: prod.short_description,
      description: prod.full_description,
      materials: prod.materials,
      features: prod.key_features,
      customization_options: customizationPayload,
      moq: prod.moq,
      lead_time: prod.lead_time,
      featured: prod.feature_on_homepage,
      is_active: prod.is_active,
      seo_title: prod.seo_title,
      seo_description: prod.meta_description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  });

  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(records)
  });

  if (!insertRes.ok) {
    const errText = await insertRes.text();
    console.error("❌ Failed to insert products:", insertRes.status, errText);
    process.exit(1);
  }

  const inserted = await insertRes.json();
  console.log(`✅ Successfully inserted ${inserted.length} products!`);
  inserted.forEach((p, idx) => {
    console.log(` ${idx + 1}. [${p.slug}] ${p.name} (MOQ: ${p.moq})`);
  });

  console.log("\n=== 5. Verification: fetching current products in Gym & Fitness Wear ===");
  const verifyRes = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=id,name,slug,moq,lead_time&category_id=eq.${GYM_CATEGORY_ID}&order=created_at.asc`,
    {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`
      }
    }
  );
  const verifyData = await verifyRes.json();
  console.log(`Confirmed in Supabase: ${verifyData.length} products in Gym & Fitness Wear.`);
}

execute().catch((err) => {
  console.error("Execution error:", err);
  process.exit(1);
});
