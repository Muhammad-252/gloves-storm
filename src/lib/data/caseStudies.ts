export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientType: string;
  country: string;
  productCategory: string;
  fabricAndGsm: string;
  decorationMethod: string;
  quantity: string;
  timeline: string;
  photos: string[];
  resultSummary: string;
  isPlaceholder?: boolean;
}

/**
 * Reusable Production Case Studies Data
 *
 * RULES COMPLIANCE:
 * Zero invented clients, metrics, or case studies.
 * The entry below is a clearly marked TODO template for the business owner
 * to populate with verified real production orders.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-todo-01",
    slug: "todo-custom-streetwear-capsule",
    title: "[TODO: Client Case Study Title — e.g. Custom Heavyweight Hoodie Production]",
    clientType: "[TODO: Client Type — e.g. Independent Streetwear Brand / Collegiate Club]",
    country: "[TODO: Client Country — e.g. United States / United Kingdom / Germany]",
    productCategory: "[TODO: Product Category — e.g. Heavyweight Streetwear & Hoodies]",
    fabricAndGsm: "[TODO: Fabric & GSM — e.g. 450 GSM 100% Combed Cotton French Terry]",
    decorationMethod: "[TODO: Decoration Method — e.g. Tajima 3D Puff Embroidery + Woven Labels]",
    quantity: "[TODO: Production Run Quantity — e.g. 150 pieces]",
    timeline: "[TODO: Tech Pack to Delivery Timeline — e.g. 18 working days]",
    photos: [
      "/images/products/hoodie-black.png",
      "/images/products/varsity-jacket.jpg",
      "/images/products/luxury-packaging.jpg",
    ],
    resultSummary:
      "[TODO: Short Result Summary — e.g. Delivered pre-shrunk, color-matched Pantone production run with retail-ready custom polybags. Zero defective items reported during client QC intake.]",
    isPlaceholder: true,
  },
];
