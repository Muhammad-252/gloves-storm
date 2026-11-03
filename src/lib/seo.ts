import { BUSINESS_CONFIG } from "./business";

/**
 * Standard brand name used for all page titles.
 */
export const BRAND_NAME = BUSINESS_CONFIG.name;
export const BRAND_SUFFIX = ` | ${BRAND_NAME}`; // 15 characters

/**
 * Ensures title phrases do not repeat brand name and fit 50-60 character limits
 * when combined with " | Gloves Storm".
 */
export function buildProductTitlePhrase(name: string): string {
  let clean = name
    .replace(/\s*\|\s*gloves\s*storm.*$/i, "")
    .replace(/\s*—\s*gloves\s*storm.*$/i, "")
    .trim();

  // If already starts with Custom, keep it, else prefix if room
  if (!clean.toLowerCase().startsWith("custom") && clean.length <= 35) {
    clean = "Custom " + clean;
  }

  // Max phrase length allowed is 60 - 15 = 45 characters
  if (clean.length > 45) {
    const slice = clean.slice(0, 45);
    const lastSpace = slice.lastIndexOf(" ");
    clean = lastSpace > 25 ? slice.slice(0, lastSpace) : slice;
  }

  // If too short, expand with relevant term to reach 35-45 chars
  if (clean.length < 35) {
    if (!/apparel/i.test(clean) && clean.length + " Apparel".length <= 45) {
      clean += " Apparel";
    }
    if (!/manufacturer|factory|oem/i.test(clean)) {
      if (clean.length + " Manufacturer".length <= 45) {
        clean += " Manufacturer";
      } else if (clean.length + " Factory".length <= 45) {
        clean += " Factory";
      } else if (clean.length + " OEM".length <= 45) {
        clean += " OEM";
      }
    }
  }

  return clean;
}

/**
 * Generates an exact 140–155 character meta description for any product.
 */
export function buildProductDescription(name: string, materials: any): string {
  let matStr = "";
  if (Array.isArray(materials) && materials.length > 0) {
    matStr = String(materials[0]);
  } else if (typeof materials === "string" && materials.trim()) {
    matStr = materials.split(",")[0].trim();
  }
  matStr = matStr.replace(/^[0-9]+%?\s*/, "").replace(/[—–].*$/, "").trim();
  if (matStr.length > 30) matStr = matStr.slice(0, 30).trim();

  let desc = `Order custom ${name.trim()} from our Sialkot OEM factory.`;
  if (matStr) {
    desc += ` Built with ${matStr},`;
  } else {
    desc += ` Premium technical fabrics,`;
  }
  desc += ` private label branding, low MOQ ${BUSINESS_CONFIG.moqShort}, ${BUSINESS_CONFIG.samplingDaysShort} samples, and door-to-door DDP export delivery.`;

  if (desc.length > 155) {
    desc = `Custom OEM ${name.trim()} by Sialkot factory. ${matStr ? matStr + ", " : ""}private label branding, low MOQ ${BUSINESS_CONFIG.moqShort}, ${BUSINESS_CONFIG.samplingDaysShort} samples, and door-to-door DDP export shipping.`;
  }
  if (desc.length > 155) {
    desc = `Custom ${name.trim()} OEM manufacturing in Sialkot. Private label trims, low MOQ ${BUSINESS_CONFIG.moqShort}, ${BUSINESS_CONFIG.samplingDaysShort} sample delivery, and door-to-door DDP global export freight.`;
  }
  if (desc.length > 155) {
    const slice = desc.slice(0, 154);
    const lastSpace = slice.lastIndexOf(" ");
    desc = slice.slice(0, lastSpace).replace(/[,;]?$/, ".");
  }

  if (desc.length < 140) {
    const pad = " Get a free factory quote today.";
    if (desc.length + pad.length <= 155) {
      desc = desc.replace(/\.$/, "") + pad;
    } else {
      const padShort = " Free quote.";
      if (desc.length + padShort.length <= 155) {
        desc = desc.replace(/\.$/, "") + padShort;
      }
    }
  }

  return desc;
}

/**
 * Curated SEO titles and descriptions for known blog posts.
 */
export const BLOG_META_OVERRIDES: Record<
  string,
  { titlePhrase: string; description: string }
> = {
  "private-label-activewear-manufacturer-guide": {
    titlePhrase: "Private Label Activewear Sourcing Guide",
    description:
      "Launch your private label activewear and gym wear line. Learn fabric sourcing, low MOQ 30 pcs, technical grading, and direct Sialkot factory production.",
  },
  "custom-team-uniforms-manufacturer-usa-guide": {
    titlePhrase: "Custom Team Uniforms USA Sourcing Guide",
    description:
      "Sourcing custom team uniforms for USA athletic clubs: Italian sublimation printing, low MOQ 30 pcs, 5–7 day sample delivery, and DDP shipping logistics.",
  },
  "mastering-450-gsm-french-terry-luxury-streetwear-guide": {
    titlePhrase: "450 GSM French Terry Streetwear Guide",
    description:
      "Guide to 450+ GSM French Terry fabric: yarn spinning, loopback knitting, shrinkage control, and crafting luxury heavyweight streetwear hoodies at low MOQ.",
  },
  "from-tech-pack-to-bulk-production-oem-manufacturing-guide": {
    titlePhrase: "Tech Pack to Bulk OEM Production Guide",
    description:
      "From digital CAD tech pack to bulk apparel manufacturing: pattern grading, fabric lab dips, 5–7 day pre-production sampling, and AQL 2.5 quality audits.",
  },
  "custom-gym-wear-manufacturer-guide": {
    titlePhrase: "Custom Gym Wear Manufacturing Guide",
    description:
      "Everything fitness brands need to know before ordering custom gym wear: 4-way stretch fabrics, squat-proof opacity, low MOQ 30 pcs, and sizing curves.",
  },
  "private-label-clothing-manufacturer-guide": {
    titlePhrase: "Find Private Label Clothing Factory",
    description:
      "How to evaluate and partner with a private label clothing manufacturer: factory vetting, low MOQ 30 pcs, sample timelines, and IP protection agreements.",
  },
  "oem-vs-odm-vs-private-label-clothing-manufacturing-guide": {
    titlePhrase: "OEM vs ODM vs Private Label Apparel Guide",
    description:
      "Compare OEM, ODM, and private label clothing manufacturing models. Understand tooling costs, MOQ thresholds, sample lead times, and brand customization.",
  },
  "low-moq-clothing-manufacturers-for-startups": {
    titlePhrase: "Low MOQ Clothing Manufacturers 2026",
    description:
      "Guide to low MOQ clothing manufacturers for apparel startups in 2026: compare minimum order quantities, sample speed, pricing tiers, and direct factories.",
  },
  "custom-team-uniforms-manufacturer-guide": {
    titlePhrase: "Custom Team Uniforms Ordering Guide",
    description:
      "Complete ordering guide for custom team sportswear: dye sublimation jerseys, custom player roster names, low MOQ 30 pcs, and turnkey DDP export delivery.",
  },
};
