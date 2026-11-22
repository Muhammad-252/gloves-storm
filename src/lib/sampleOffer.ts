import { BUSINESS_CONFIG } from "@/lib/business";
import { SPORTSWEAR_PRICES, STREETWEAR_PRICES } from "@/lib/data/priceList";

/**
 * The public sample offer, shown on the homepage and the niche landing pages.
 * Edit the wording here and it changes everywhere.
 */
const allItems = [...SPORTSWEAR_PRICES, ...STREETWEAR_PRICES].flatMap((g) => g.items);

export const SAMPLE_OFFER = {
  headline: "Hold your sample before you commit to bulk",
  days: BUSINESS_CONFIG.sampleLeadTime,
  fromPrice: Math.min(...allItems.map((i) => i.sample)),
  creditTerms: "Your sample fee is credited against your first bulk order.",
  points: [
    "Made to your tech pack, sketch or reference photo",
    "All-in price: pattern, fabric, making and express courier",
    "Fit, fabric and print approved by you before production starts",
  ],
  // A few real examples from the 2026–27 price list
  examples: [
    { label: "Heavyweight hoodie", price: allItems.find((i) => i.slugs.includes("custom-hoodies"))?.sample },
    { label: "Heavyweight T-shirt", price: allItems.find((i) => i.slugs.includes("custom-heavyweight-t-shirts"))?.sample },
    { label: "MMA fight shorts", price: allItems.find((i) => i.slugs.includes("custom-mma-fight-shorts"))?.sample },
    { label: "Sublimated soccer kit", price: allItems.find((i) => i.product.startsWith("Sublimated soccer kit"))?.sample },
  ].filter((e): e is { label: string; price: number } => typeof e.price === "number"),
} as const;
