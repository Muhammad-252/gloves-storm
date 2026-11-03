import { Product } from "@/types/database";

export interface CatalogPriorityTier {
  id: string;
  name: string;
  description: string;
  priority: number;
  matcher: (p: {
    name: string;
    slug: string;
    materials?: any;
    category_id?: string;
    category?: any;
  }) => boolean;
}

/**
 * CONFIGURABLE CATALOG DISPLAY ORDER
 *
 * Task 12: Put heavyweight hoodies, team uniforms and compression wear
 * first in the default catalog and homepage product grid.
 *
 * Changing priorities or adding new tiers here immediately updates the
 * catalog ranking across the entire site.
 */
export const CATALOG_PRIORITY_TIERS: CatalogPriorityTier[] = [
  // 1. Heavyweight Hoodies & French Terry (Rank 1)
  {
    id: "heavyweight-hoodies",
    name: "Heavyweight Hoodies & Zip-Ups",
    description: "400-500 GSM Heavyweight French Terry hoodies and zip-ups",
    priority: 1,
    matcher: (p) => {
      const slug = (p.slug || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      // Flagship heavyweight 450 GSM hoodies
      if (slug === "custom-hoodies" || slug === "custom-zip-up-hoodies") return true;
      if (name.includes("heavyweight") && name.includes("hoodie")) return true;
      return false;
    },
  },

  // 2. Streetwear Fleece & Heavyweight Tops (Rank 2)
  {
    id: "streetwear-fleece-tops",
    name: "Streetwear Fleece & Heavyweight Tops",
    description: "Sweatshirts, lightweight hoodies, and heavyweight streetwear t-shirts",
    priority: 2,
    matcher: (p) => {
      const slug = (p.slug || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      return (
        name.includes("hoodie") ||
        slug.includes("hoodie") ||
        name.includes("sweatshirt") ||
        slug.includes("sweatshirt") ||
        (name.includes("heavyweight") && (name.includes("t-shirt") || name.includes("tee")))
      );
    },
  },

  // 3. Team Uniforms & Match Kits (Rank 3)
  {
    id: "team-uniforms",
    name: "Team Uniforms & Match Kits",
    description: "Sublimated team kits, football/soccer/basketball uniforms, and athletic jerseys",
    priority: 3,
    matcher: (p) => {
      const slug = (p.slug || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      return (
        name.includes("uniform") ||
        slug.includes("uniform") ||
        name.includes("jersey") ||
        slug.includes("jersey") ||
        name.includes("soccer kit") ||
        slug.includes("soccer-kit") ||
        name.includes("match kit") ||
        name.includes("teamwear") ||
        name.includes("tracksuit")
      );
    },
  },

  // 4. Compression Wear & Performance Activewear (Rank 4)
  {
    id: "compression-wear",
    name: "Compression Wear & Gym Gear",
    description: "Rash guards, compression base layers, seamless leggings, and performance activewear",
    priority: 4,
    matcher: (p) => {
      const slug = (p.slug || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      return (
        name.includes("compression") ||
        slug.includes("compression") ||
        name.includes("rash guard") ||
        slug.includes("rash-guard") ||
        name.includes("legging") ||
        slug.includes("legging") ||
        name.includes("biker short") ||
        name.includes("cycling short") ||
        name.includes("co-ord") ||
        name.includes("base layer")
      );
    },
  },
];

/**
 * Returns the priority score for a product (lower number = ranks higher).
 * Default fallback priority is 999.
 */
export function getProductPriorityRank(product: {
  name: string;
  slug: string;
  materials?: any;
  category_id?: string;
  category?: any;
}): number {
  for (const tier of CATALOG_PRIORITY_TIERS) {
    if (tier.matcher(product)) {
      return tier.priority;
    }
  }
  return 999;
}

/**
 * Sorts products according to the configurable catalog priority tiers.
 * Products within the same tier maintain stable relative order.
 */
export function sortProductsByConfiguredPriority<
  T extends {
    name: string;
    slug: string;
    materials?: any;
    category_id?: string;
    category?: any;
  }
>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    const rankA = getProductPriorityRank(a);
    const rankB = getProductPriorityRank(b);
    return rankA - rankB;
  });
}
