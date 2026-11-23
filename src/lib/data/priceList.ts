/**
 * Public price list 2026–27 (from Gloves_Storm_Price_List.xlsx).
 *
 * Only customer-facing columns live here: guide prices for 30–99, 100–299 and 300+ pieces,
 * the all-in sample price, production time and the product pages each item maps to.
 * Internal columns from the spreadsheet (market price, buyer saves, lowest/floor price,
 * discount settings, free-sample option) are intentionally NOT included.
 *
 * Used by the /pricing page and by scripts/sync-price-list.mjs, which writes these prices
 * to the matching products in Supabase.
 */

export type PriceUnit = "pc" | "set" | "pair";

export interface PriceListItem {
  product: string;
  spec: string;
  unit: PriceUnit;
  /** USD per unit at 30–99, 100–299 and 300+ pieces */
  prices: [number, number, number];
  /** All-in sample price in USD: pattern, materials, making and express courier */
  sample: number;
  production: string;
  /** Product page slugs that sell this item */
  slugs: string[];
}

export interface PriceListGroup {
  group: string;
  note?: string;
  items: PriceListItem[];
}

export const PRICE_TIERS = ["30–99 pcs", "100–299 pcs", "300+ pcs"] as const;

export const SPORTSWEAR_PRICES: PriceListGroup[] = [
  {
    group: "Soccer",
    note: "Names, numbers, crest and sponsors included",
    items: [
      { product: "Sublimated soccer kit (jersey + shorts)", spec: "140–160 gsm interlock/mesh poly", unit: "set", prices: [21, 18.9, 17.22], sample: 80, production: "2–3 weeks", slugs: ["custom-soccer-kits"] },
      { product: "Soccer jersey", spec: "140–160 gsm poly, fully sublimated", unit: "pc", prices: [13, 11.7, 10.66], sample: 60, production: "2–3 weeks", slugs: ["custom-soccer-jerseys"] },
      { product: "Goalkeeper kit, padded (jersey + shorts)", spec: "Long sleeve, elbow and hip padding", unit: "set", prices: [27, 24.3, 22.14], sample: 90, production: "3 weeks", slugs: ["custom-goalkeeper-kits"] },
    ],
  },
  {
    group: "Basketball & volleyball",
    note: "Fully sublimated, names and numbers included",
    items: [
      { product: "Basketball uniform (jersey + shorts)", spec: "Mesh or dazzle poly, fully sublimated", unit: "set", prices: [23, 20.7, 18.86], sample: 80, production: "2–3 weeks", slugs: ["custom-basketball-uniforms"] },
      { product: "Reversible basketball uniform", spec: "Double-layer mesh, two designs", unit: "set", prices: [33, 29.7, 27.06], sample: 100, production: "3 weeks", slugs: ["custom-reversible-basketball-uniforms"] },
      { product: "Volleyball jersey", spec: "Lightweight poly, sublimated", unit: "pc", prices: [13, 11.7, 10.66], sample: 60, production: "2–3 weeks", slugs: ["custom-volleyball-uniforms"] },
    ],
  },
  {
    group: "American football & baseball",
    items: [
      { product: "American football game jersey", spec: "Pro cut, stretch shoulders, sublimated or tackle twill", unit: "pc", prices: [25, 22.5, 20.5], sample: 70, production: "3 weeks", slugs: ["custom-american-football-uniforms"] },
      { product: "American football pants", spec: "4-way stretch, pad pockets", unit: "pc", prices: [29, 26.1, 23.78], sample: 70, production: "3 weeks", slugs: ["custom-football-pants"] },
      { product: "Baseball jersey, button front", spec: "Sublimated poly, piping options", unit: "pc", prices: [22, 19.8, 18.04], sample: 65, production: "2–3 weeks", slugs: ["custom-baseball-uniforms"] },
      { product: "Baseball pants", spec: "Poly/spandex, belt loops", unit: "pc", prices: [19, 17.1, 15.58], sample: 60, production: "2–3 weeks", slugs: ["custom-baseball-pants"] },
    ],
  },
  {
    group: "Rugby, hockey, cricket & lacrosse",
    items: [
      { product: "Rugby jersey, heavy-duty", spec: "220–260 gsm reinforced knit, sublimated", unit: "pc", prices: [23, 20.7, 18.86], sample: 65, production: "3 weeks", slugs: ["custom-rugby-kits"] },
      { product: "Rugby shorts", spec: "Twill/poly, reinforced seams", unit: "pc", prices: [11, 9.9, 9.02], sample: 60, production: "2–3 weeks", slugs: ["custom-rugby-shorts"] },
      { product: "Ice hockey jersey", spec: "Heavy mesh, sublimated, fight strap optional", unit: "pc", prices: [27, 24.3, 22.14], sample: 75, production: "3 weeks", slugs: ["custom-ice-hockey-jerseys"] },
      { product: "Cricket kit (shirt + trousers)", spec: "Sublimated poly, colored or whites", unit: "set", prices: [27, 24.3, 22.14], sample: 90, production: "3 weeks", slugs: ["custom-cricket-uniforms"] },
      { product: "Lacrosse uniform (pinnie + shorts)", spec: "Mesh poly, sublimated", unit: "set", prices: [23, 20.7, 18.86], sample: 80, production: "2–3 weeks", slugs: ["custom-lacrosse-uniforms"] },
    ],
  },
  {
    group: "Training & teamwear",
    note: "Embroidered or printed crest included",
    items: [
      { product: "Training T-shirt", spec: "Dri-fit poly, sublimated or printed", unit: "pc", prices: [10, 9, 8.2], sample: 60, production: "2 weeks", slugs: ["custom-training-jerseys"] },
      { product: "Training shorts", spec: "Poly, zip pockets optional", unit: "pc", prices: [10, 9, 8.2], sample: 60, production: "2 weeks", slugs: ["custom-sports-shorts"] },
      { product: "Team tracksuit (jacket + pants)", spec: "Poly tricot or sublimated, embroidered crest", unit: "set", prices: [39, 35.1, 31.98], sample: 100, production: "3–4 weeks", slugs: ["custom-tracksuits"] },
      { product: "Quarter-zip / warm-up top", spec: "Brushed poly, embroidered logo", unit: "pc", prices: [23, 20.7, 18.86], sample: 70, production: "3 weeks", slugs: ["custom-quarter-zip-tops"] },
      { product: "Custom sports socks", spec: "Knitted logo, cushioned sole", unit: "pair", prices: [4.5, 4.05, 3.69], sample: 50, production: "3 weeks", slugs: ["custom-sports-socks"] },
    ],
  },
  {
    group: "Gym & fitness",
    items: [
      { product: "Compression shirt / base layer", spec: "Poly/spandex, sublimated", unit: "pc", prices: [13, 11.7, 10.66], sample: 60, production: "2–3 weeks", slugs: ["custom-compression-base-layer-top-manufacturer"] },
      { product: "Leggings", spec: "Nylon/spandex, high waist, squat-proof", unit: "pc", prices: [17, 15.3, 13.94], sample: 65, production: "3 weeks", slugs: ["custom-high-waist-seamless-gym-leggings"] },
      { product: "Sports bra", spec: "Nylon/spandex, removable pads", unit: "pc", prices: [13, 11.7, 10.66], sample: 60, production: "3 weeks", slugs: ["custom-sports-bras"] },
      { product: "2-in-1 gym shorts", spec: "Liner and phone pocket", unit: "pc", prices: [15, 13.5, 12.3], sample: 60, production: "3 weeks", slugs: ["custom-mens-training-shorts-manufacturer"] },
      { product: "Gym stringer / tank top", spec: "Cotton or poly blend, printed", unit: "pc", prices: [9.5, 8.55, 7.79], sample: 60, production: "2 weeks", slugs: ["custom-mens-stringer-tank-top-manufacturer"] },
    ],
  },
  {
    group: "Fight shorts",
    note: "MMA, boxing, Muay Thai and grappling",
    items: [
      { product: "MMA fight shorts", spec: "4-way stretch, sublimated, velcro and drawcord", unit: "pc", prices: [17, 15.3, 13.94], sample: 65, production: "3 weeks", slugs: ["custom-mma-fight-shorts"] },
      { product: "Boxing trunks", spec: "Satin, embroidered or sublimated", unit: "pc", prices: [19, 17.1, 15.58], sample: 65, production: "3 weeks", slugs: ["custom-boxing-trunks"] },
      { product: "Muay Thai shorts", spec: "Satin, wide leg, side slits, embroidered or sublimated", unit: "pc", prices: [19, 17.1, 15.58], sample: 65, production: "3 weeks", slugs: ["custom-muay-thai-shorts"] },
      { product: "Compression fight shorts (vale tudo / grappling)", spec: "Poly/spandex, sublimated", unit: "pc", prices: [13, 11.7, 10.66], sample: 60, production: "3 weeks", slugs: ["custom-grappling-shorts"] },
    ],
  },
];

export const STREETWEAR_PRICES: PriceListGroup[] = [
  {
    group: "T-shirts & polos",
    note: "One print or embroidery included",
    items: [
      { product: "Heavyweight T-shirt", spec: "220–260 gsm combed cotton", unit: "pc", prices: [15.5, 13.18, 10.85], sample: 60, production: "2–3 weeks", slugs: ["custom-heavyweight-t-shirts"] },
      { product: "Oversized boxy T-shirt", spec: "280–300 gsm cotton, drop shoulder", unit: "pc", prices: [17, 14.45, 11.9], sample: 60, production: "3 weeks", slugs: ["custom-oversized-t-shirts"] },
      { product: "Polo shirt", spec: "Cotton piqué, embroidered logo", unit: "pc", prices: [16.5, 14.03, 11.55], sample: 60, production: "3 weeks", slugs: ["custom-polo-shirts"] },
    ],
  },
  {
    group: "Hoodies & sweats",
    note: "One print or embroidery included",
    items: [
      { product: "Pullover hoodie", spec: "350–400 gsm cotton fleece", unit: "pc", prices: [32, 28, 28], sample: 70, production: "3–4 weeks", slugs: [] },
      { product: "Heavyweight hoodie", spec: "450–500 gsm French terry, boxy fit", unit: "pc", prices: [35, 29.75, 28], sample: 80, production: "3–4 weeks", slugs: ["custom-hoodies"] },
      { product: "Zip-up hoodie", spec: "400 gsm fleece, metal zip", unit: "pc", prices: [34, 28.9, 28], sample: 75, production: "3–4 weeks", slugs: ["custom-zip-up-hoodies"] },
      { product: "Crewneck sweatshirt", spec: "350–400 gsm fleece", unit: "pc", prices: [26.5, 22.53, 18.55], sample: 70, production: "3–4 weeks", slugs: ["custom-sweatshirts"] },
    ],
  },
  {
    group: "Bottoms & sets",
    items: [
      { product: "Sweatpants / joggers", spec: "400 gsm fleece", unit: "pc", prices: [26.5, 22.53, 18.55], sample: 70, production: "3–4 weeks", slugs: ["custom-sweatpants"] },
      { product: "Flared / stacked sweatpants", spec: "400 gsm fleece, custom cut", unit: "pc", prices: [30, 25.5, 21], sample: 75, production: "3–4 weeks", slugs: ["custom-flared-sweatpants"] },
      { product: "Fleece or mesh shorts", spec: "Cotton fleece or poly mesh", unit: "pc", prices: [18.5, 15.73, 12.95], sample: 60, production: "3 weeks", slugs: ["custom-fleece-mesh-shorts"] },
      { product: "Cargo pants", spec: "Cotton twill, 6 pockets", unit: "pc", prices: [32, 27.2, 22.4], sample: 75, production: "4 weeks", slugs: ["custom-cargo-pants"] },
      { product: "Baggy denim jeans", spec: "12–14 oz denim, washes available", unit: "pc", prices: [38, 32.3, 26.6], sample: 80, production: "4–5 weeks", slugs: ["custom-baggy-denim-jeans"] },
      { product: "Tracksuit set (hoodie + pants)", spec: "400 gsm fleece, matching set", unit: "set", prices: [58, 49.3, 40.6], sample: 100, production: "4 weeks", slugs: ["custom-sweatsuit-sets"] },
    ],
  },
  {
    group: "Outerwear",
    note: "Lined, custom trims",
    items: [
      { product: "Windbreaker / nylon track jacket", spec: "Taslan or ripstop nylon, lined", unit: "pc", prices: [48, 40.8, 33.6], sample: 90, production: "4 weeks", slugs: ["custom-windbreaker-jackets"] },
      { product: "Puffer jacket", spec: "Nylon shell, poly fill, custom quilting", unit: "pc", prices: [64, 54.4, 44.8], sample: 120, production: "4–6 weeks", slugs: ["custom-puffer-jackets"] },
      { product: "Varsity jacket", spec: "Wool body, leather or PU sleeves, chenille patches", unit: "pc", prices: [60, 51, 42], sample: 130, production: "4–6 weeks", slugs: ["custom-team-jackets"] },
      { product: "Denim jacket", spec: "12–14 oz denim, washes available", unit: "pc", prices: [48, 40.8, 33.6], sample: 100, production: "4–5 weeks", slugs: ["custom-denim-jackets"] },
      { product: "Genuine leather jacket", spec: "Sheep or cow nappa, lined", unit: "pc", prices: [100, 85, 80], sample: 160, production: "4–6 weeks", slugs: ["custom-leather-jackets"] },
    ],
  },
  {
    group: "Knitwear & headwear",
    items: [
      { product: "Jacquard knit sweater", spec: "Acrylic or cotton blend, custom pattern", unit: "pc", prices: [32, 27.2, 22.4], sample: 80, production: "4–5 weeks", slugs: ["custom-jacquard-knit-sweaters"] },
      { product: "Embroidered cap", spec: "Cotton twill, 6-panel or 5-panel", unit: "pc", prices: [11, 9.35, 7.7], sample: 50, production: "3 weeks", slugs: ["custom-embroidered-caps"] },
      { product: "Beanie", spec: "Acrylic knit, woven or embroidered logo", unit: "pc", prices: [9, 7.65, 6.3], sample: 50, production: "3 weeks", slugs: ["custom-beanies"] },
    ],
  },
];

export const DECORATION_ADD_ONS: { name: string; price: string }[] = [
  { name: "Embroidery, per location (up to ~8,000 stitches)", price: "$1.50" },
  { name: "3D puff print or puff embroidery, per location", price: "$2.00" },
  { name: "Screen print, per location", price: "$1.00" },
  { name: "DTF print, per location", price: "$1.50" },
  { name: "Chenille patch, per patch", price: "$3.00" },
  { name: "Rubber / PVC patch, per patch", price: "$1.50" },
  { name: "Custom woven label + hang tag", price: "$0.50" },
  { name: "Custom printed poly bag", price: "$0.30" },
  { name: "Acid, vintage or garment-dye wash", price: "$2.50" },
  { name: "Sizes 4XL and above", price: "+10%" },
];

export const ORDER_TERMS: { title: string; body: string }[] = [
  { title: "Prices", body: "In USD per piece, set or pair, ex-factory Sialkot. Bulk shipping is quoted for each order; door-to-door DDP delivery is available on request." },
  { title: "What's included", body: "Fabric, pattern, cutting, stitching, sublimation on sportswear, one logo position and standard poly-bag packing." },
  { title: "Minimum order", body: "30 pieces per style. Sizes can be mixed within a style." },
  { title: "Samples", body: "All-in price covering pattern, materials, making and express courier (DHL or FedEx). Made in 5–7 days, then 4–7 working days by courier." },
  { title: "Production", body: "2–4 weeks for sportswear and 3–6 weeks for streetwear, starting after sample and artwork approval." },
  { title: "Payment", body: "50% advance to start production, 50% before dispatch." },
  { title: "Delivery", body: "DHL or FedEx: 4–7 working days to the USA, UK, Europe and Australia." },
  { title: "Design", body: "Free digital mockup and quote within 48 hours of receiving your design." },
];

export const CATALOGS = [
  {
    title: "Sportswear & Teamwear",
    description: "Sublimated uniforms, training wear, gym wear and fight shorts with 2026–27 prices.",
    href: "/catalogs/gloves-storm-sportswear-catalog-2026-27.pdf",
    pages: 14,
  },
  {
    title: "Streetwear & Fashion",
    description: "Hoodies, tees, sweatsuits, denim and jackets with 2026–27 prices.",
    href: "/catalogs/gloves-storm-streetwear-catalog-2026-27.pdf",
    pages: 12,
  },
] as const;

export function unitLabel(unit: PriceUnit) {
  return unit === "set" ? "per set" : unit === "pair" ? "per pair" : "per piece";
}
