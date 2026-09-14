/**
 * GLOVES STORM — Master Product-Specific OEM Image Catalog
 * 
 * Alibaba B2B OEM Manufacturing Style:
 * - Pure seamless white or clean studio tabletop background
 * - 100% product-accurate: no generic lifestyle gym, workout, or beach scenes
 * - Every product has 4 coherent images:
 *    1. Hero: Main front studio shot on white background
 *    2. Detail: Close-up of material, stitching, padding, palm, or hardware
 *    3. Branding: Alternate angle, rear view, or technical construction
 *    4. Lifestyle: Matching alternative colorway (black, red, white, gold) or complete set
 */

export interface ProductImages {
  hero: string;
  detail: string;
  branding: string;
  lifestyle: string;
}

export const CATEGORY_STUDIO_IMAGES: Record<string, string> = {
  "boxing-equipment": "/images/products/boxing-gloves-black.png",
  "sportswear-teamwear": "/images/products/basketball-uniform.jpg",
  "gym-fitness-wear": "/images/products/gym-leggings.jpg",
  "clothing-streetwear": "/images/products/hoodie-black.png",
  "custom-manufacturing-private-label": "/images/products/luxury-packaging.jpg",
  "swimwear-beachwear": "/images/products/board-shorts.jpg",
};

export const PRODUCT_IMAGE_MAP: Record<string, ProductImages> = {
  // =========================================================================
  // 1. BOXING EQUIPMENT (15 Products)
  // =========================================================================
  "custom-boxing-gloves": {
    hero: "/images/products/boxing-gloves-black.png",
    detail: "/images/products/boxing-gloves-red.png",
    branding: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    lifestyle: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-training-boxing-gloves": {
    hero: "/images/products/boxing-gloves-red.png",
    detail: "/images/products/boxing-gloves-black.png",
    branding: "/images/products/boxing-focuspads.jpg",
    lifestyle: "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-sparring-gloves": {
    hero: "/images/products/boxing-gloves-black.png",
    detail: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    branding: "/images/products/boxing-gloves-red.png",
    lifestyle: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-mma-gloves": {
    hero: "/images/products/boxing-mma-gloves.jpg",
    detail: "/images/products/boxing-mma-gloves.jpg",
    branding: "/images/products/boxing-shinguards.jpg",
    lifestyle: "/images/products/boxing-handwraps.jpg",
  },
  "custom-kickboxing-gloves": {
    hero: "/images/products/boxing-gloves-red.png",
    detail: "/images/products/boxing-gloves-black.png",
    branding: "/images/products/boxing-shinguards.jpg",
    lifestyle: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-muay-thai-gloves": {
    hero: "/images/products/boxing-gloves-black.png",
    detail: "/images/products/boxing-gloves-red.png",
    branding: "/images/products/boxing-shinguards.jpg",
    lifestyle: "/images/products/boxing-focuspads.jpg",
  },
  "custom-boxing-head-guards": {
    hero: "/images/products/boxing-headguard.jpg",
    detail: "/images/products/boxing-headguard.jpg",
    branding: "/images/products/boxing-gloves-black.png",
    lifestyle: "/images/products/boxing-shinguards.jpg",
  },
  "custom-boxing-hand-wraps": {
    hero: "/images/products/boxing-handwraps.jpg",
    detail: "/images/products/boxing-handwraps.jpg",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/boxing-gloves-black.png",
  },
  "custom-boxing-shin-guards": {
    hero: "/images/products/boxing-shinguards.jpg",
    detail: "/images/products/boxing-shinguards.jpg",
    branding: "/images/products/boxing-headguard.jpg",
    lifestyle: "/images/products/boxing-mma-gloves.jpg",
  },
  "custom-focus-pads": {
    hero: "/images/products/boxing-focuspads.jpg",
    detail: "/images/products/boxing-focuspads.jpg",
    branding: "/images/products/boxing-gloves-black.png",
    lifestyle: "/images/products/boxing-gloves-red.png",
  },
  "custom-kick-pads": {
    hero: "/images/products/boxing-focuspads.jpg",
    detail: "/images/products/boxing-shinguards.jpg",
    branding: "/images/products/boxing-heavybag.jpg",
    lifestyle: "/images/products/boxing-gloves-black.png",
  },
  "custom-punching-bags": {
    hero: "/images/products/boxing-heavybag.jpg",
    detail: "/images/products/boxing-heavybag.jpg",
    branding: "/images/products/boxing-gloves-black.png",
    lifestyle: "/images/products/boxing-handwraps.jpg",
  },
  "custom-heavy-bags": {
    hero: "/images/products/boxing-heavybag.jpg",
    detail: "/images/products/boxing-heavybag.jpg",
    branding: "/images/products/boxing-focuspads.jpg",
    lifestyle: "/images/products/boxing-gloves-red.png",
  },
  "custom-boxing-equipment-sets": {
    hero: "/images/products/boxing-gloves-black.png",
    detail: "/images/products/boxing-headguard.jpg",
    branding: "/images/products/boxing-shinguards.jpg",
    lifestyle: "/images/products/luxury-packaging.jpg",
  },
  "private-label-boxing-equipment": {
    hero: "/images/products/boxing-gloves-black.png",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/boxing-gloves-red.png",
  },

  // =========================================================================
  // 2. SPORTSWEAR & TEAMWEAR (15 Products)
  // =========================================================================
  "custom-basketball-uniforms": {
    hero: "/images/products/basketball-uniform.jpg",
    detail: "/images/products/basketball-uniform.jpg",
    branding: "/images/products/football-jersey-black.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-american-football-uniforms": {
    hero: "/images/products/football-jersey-black.jpg",
    detail: "/images/products/football-jersey-black.jpg",
    branding: "/images/products/basketball-uniform.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-soccer-kits": {
    hero: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    detail: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=1200&auto=format&fit=crop",
    branding: "/images/products/basketball-uniform.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-baseball-uniforms": {
    hero: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/football-jersey-black.jpg",
    branding: "/images/products/varsity-jacket.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-volleyball-uniforms": {
    hero: "/images/products/basketball-uniform.jpg",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/gym-leggings.jpg",
    lifestyle: "/images/products/football-jersey-black.jpg",
  },
  "custom-rugby-kits": {
    hero: "/images/products/polo-jersey-set.png",
    detail: "/images/products/football-jersey-black.jpg",
    branding: "/images/products/basketball-uniform.jpg",
    lifestyle: "/images/products/board-shorts.jpg",
  },
  "custom-cricket-uniforms": {
    hero: "/images/products/polo-jersey-set.png",
    detail: "/images/products/basketball-uniform.jpg",
    branding: "/images/products/varsity-jacket.jpg",
    lifestyle: "/images/products/football-jersey-black.jpg",
  },
  "custom-training-jerseys": {
    hero: "/images/products/football-jersey-black.jpg",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/basketball-uniform.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-sports-shorts": {
    hero: "/images/products/board-shorts.jpg",
    detail: "/images/products/basketball-uniform.jpg",
    branding: "/images/products/gym-leggings.jpg",
    lifestyle: "/images/products/basketball-uniform.jpg",
  },
  "custom-compression-wear": {
    hero: "/images/products/rash-guard.jpg",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/boxing-mma-gloves.jpg",
    lifestyle: "/images/products/basketball-uniform.jpg",
  },
  "custom-tracksuits": {
    hero: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/varsity-jacket.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/gym-leggings.jpg",
  },
  "custom-warm-up-suits": {
    hero: "/images/products/varsity-jacket.jpg",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/football-jersey-black.jpg",
    lifestyle: "/images/products/hoodie-black.png",
  },
  "custom-team-jackets": {
    hero: "/images/products/varsity-jacket.jpg",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-training-wear": {
    hero: "/images/products/rash-guard.jpg",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/basketball-uniform.jpg",
    lifestyle: "/images/products/gym-leggings.jpg",
  },
  "private-label-teamwear": {
    hero: "/images/products/basketball-uniform.jpg",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/football-jersey-black.jpg",
  },

  // =========================================================================
  // 3. GYM & FITNESS WEAR (15 Products)
  // =========================================================================
  "custom-gym-t-shirts": {
    hero: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-gym-shorts": {
    hero: "/images/products/board-shorts.jpg",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/rash-guard.jpg",
    lifestyle: "/images/products/basketball-uniform.jpg",
  },
  "custom-gym-leggings": {
    hero: "/images/products/gym-leggings.jpg",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/rash-guard.jpg",
    lifestyle: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-sports-bras": {
    hero: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/gym-leggings.jpg",
    lifestyle: "/images/products/rash-guard.jpg",
  },
  "custom-tank-tops": {
    hero: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/board-shorts.jpg",
  },
  "custom-crop-tops": {
    hero: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/gym-leggings.jpg",
    lifestyle: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-compression-shirts": {
    hero: "/images/products/rash-guard.jpg",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/gym-leggings.jpg",
    lifestyle: "/images/products/football-jersey-black.jpg",
  },
  "custom-compression-shorts": {
    hero: "/images/products/board-shorts.jpg",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/rash-guard.jpg",
    lifestyle: "/images/products/basketball-uniform.jpg",
  },
  "custom-joggers": {
    hero: "/images/products/gym-leggings.jpg",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-fitness-hoodies": {
    hero: "/images/products/hoodie-black.png",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/gym-leggings.jpg",
    lifestyle: "/images/products/varsity-jacket.jpg",
  },
  "custom-gym-tracksuits": {
    hero: "/images/products/varsity-jacket.jpg",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/rash-guard.jpg",
  },
  "custom-performance-tees": {
    hero: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/board-shorts.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-fitness-sets": {
    hero: "/images/products/gym-leggings.jpg",
    detail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/rash-guard.jpg",
  },
  "custom-athleisure-wear": {
    hero: "/images/products/hoodie-black.png",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/varsity-jacket.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "private-label-gym-wear": {
    hero: "/images/products/gym-leggings.jpg",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/rash-guard.jpg",
  },

  // =========================================================================
  // 4. CLOTHING & STREETWEAR (15 Products)
  // =========================================================================
  "custom-oversized-t-shirts": {
    hero: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/polo-jersey-set.png",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-boxy-t-shirts": {
    hero: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-heavyweight-t-shirts": {
    hero: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/polo-jersey-set.png",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-hoodies": {
    hero: "/images/products/hoodie-black.png",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/varsity-jacket.jpg",
    lifestyle: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-sweatshirts": {
    hero: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/hoodie-black.png",
  },
  "custom-zip-up-hoodies": {
    hero: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/varsity-jacket.jpg",
    lifestyle: "/images/products/hoodie-black.png",
  },
  "custom-sweatpants": {
    hero: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/gym-leggings.jpg",
  },
  "custom-cargo-pants": {
    hero: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-varsity-jackets": {
    hero: "/images/products/varsity-jacket.jpg",
    detail: "/images/products/varsity-jacket.jpg",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/hoodie-black.png",
  },
  "custom-bomber-jackets": {
    hero: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/varsity-jacket.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/varsity-jacket.jpg",
  },
  "custom-windbreaker-jackets": {
    hero: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/board-shorts.jpg",
    lifestyle: "/images/products/varsity-jacket.jpg",
  },
  "custom-denim-jackets": {
    hero: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/varsity-jacket.jpg",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-polo-shirts": {
    hero: "/images/products/polo-jersey-set.png",
    detail: "/images/products/polo-jersey-set.png",
    branding: "/images/products/football-jersey-black.jpg",
    lifestyle: "https://images.unsplash.com/photo-1625910513413-56832dbca665?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-long-sleeve-shirts": {
    hero: "/images/products/rash-guard.jpg",
    detail: "/images/products/polo-jersey-set.png",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
  },
  "private-label-streetwear": {
    hero: "/images/products/hoodie-black.png",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/varsity-jacket.jpg",
  },

  // =========================================================================
  // 5. CUSTOM MANUFACTURING & PRIVATE LABEL (15 Products)
  // =========================================================================
  "private-label-clothing-manufacturing": {
    hero: "/images/products/hoodie-black.png",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/varsity-jacket.jpg",
  },
  "private-label-sportswear-manufacturing": {
    hero: "/images/products/basketball-uniform.jpg",
    detail: "/images/products/football-jersey-black.jpg",
    branding: "/images/products/rash-guard.jpg",
    lifestyle: "/images/products/luxury-packaging.jpg",
  },
  "oem-clothing-manufacturing": {
    hero: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/luxury-packaging.jpg",
  },
  "oem-sportswear-manufacturing": {
    hero: "/images/products/football-jersey-black.jpg",
    detail: "/images/products/basketball-uniform.jpg",
    branding: "/images/products/rash-guard.jpg",
    lifestyle: "/images/products/board-shorts.jpg",
  },
  "custom-apparel-manufacturing": {
    hero: "/images/products/varsity-jacket.jpg",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-product-development": {
    hero: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/luxury-packaging.jpg",
  },
  "tech-pack-manufacturing": {
    hero: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/polo-jersey-set.png",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/woven-labels.jpg",
  },
  "custom-packaging-manufacturing": {
    hero: "/images/products/luxury-packaging.jpg",
    detail: "/images/products/luxury-packaging.jpg",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/hoodie-black.png",
  },
  "custom-labels-and-hang-tags": {
    hero: "/images/products/woven-labels.jpg",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/hoodie-black.png",
  },
  "custom-embroidery-manufacturing": {
    hero: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/varsity-jacket.jpg",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/hoodie-black.png",
  },
  "custom-sublimation-apparel": {
    hero: "/images/products/basketball-uniform.jpg",
    detail: "/images/products/football-jersey-black.jpg",
    branding: "/images/products/rash-guard.jpg",
    lifestyle: "/images/products/board-shorts.jpg",
  },
  "custom-screen-printed-apparel": {
    hero: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/polo-jersey-set.png",
    lifestyle: "/images/products/football-jersey-black.jpg",
  },
  "custom-dtf-printed-apparel": {
    hero: "/images/products/polo-jersey-set.png",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/football-jersey-black.jpg",
  },
  "custom-puff-printed-apparel": {
    hero: "/images/products/hoodie-black.png",
    detail: "/images/products/hoodie-black.png",
    branding: "/images/products/polo-jersey-set.png",
    lifestyle: "/images/products/varsity-jacket.jpg",
  },
  "low-moq-custom-manufacturing": {
    hero: "/images/products/luxury-packaging.jpg",
    detail: "/images/products/boxing-gloves-black.png",
    branding: "/images/products/hoodie-black.png",
    lifestyle: "/images/products/woven-labels.jpg",
  },

  // =========================================================================
  // 6. SWIMWEAR & BEACHWEAR (15 Products)
  // =========================================================================
  "custom-swim-shorts": {
    hero: "/images/products/board-shorts.jpg",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/rash-guard.jpg",
    lifestyle: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-board-shorts": {
    hero: "/images/products/board-shorts.jpg",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/rash-guard.jpg",
    lifestyle: "/images/products/board-shorts.jpg",
  },
  "custom-rash-guards": {
    hero: "/images/products/rash-guard.jpg",
    detail: "/images/products/rash-guard.jpg",
    branding: "/images/products/board-shorts.jpg",
    lifestyle: "/images/products/rash-guard.jpg",
  },
  "custom-one-piece-swimsuits": {
    hero: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/board-shorts.jpg",
  },
  "custom-bikinis": {
    hero: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-swim-tops": {
    hero: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/gym-leggings.jpg",
    branding: "/images/products/board-shorts.jpg",
    lifestyle: "/images/products/rash-guard.jpg",
  },
  "custom-swim-bottoms": {
    hero: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/board-shorts.jpg",
    lifestyle: "/images/products/gym-leggings.jpg",
  },
  "custom-beach-shorts": {
    hero: "/images/products/board-shorts.jpg",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/polo-jersey-set.png",
    lifestyle: "/images/products/board-shorts.jpg",
  },
  "custom-beach-shirts": {
    hero: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/polo-jersey-set.png",
    branding: "/images/products/board-shorts.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-cover-ups": {
    hero: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
  },
  "custom-rash-guard-sets": {
    hero: "/images/products/rash-guard.jpg",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/gym-leggings.jpg",
  },
  "custom-surf-wear": {
    hero: "/images/products/rash-guard.jpg",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/board-shorts.jpg",
    lifestyle: "/images/products/rash-guard.jpg",
  },
  "custom-resort-wear": {
    hero: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/woven-labels.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "custom-beachwear-sets": {
    hero: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    detail: "/images/products/board-shorts.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/polo-jersey-set.png",
  },
  "private-label-swimwear": {
    hero: "/images/products/board-shorts.jpg",
    detail: "/images/products/woven-labels.jpg",
    branding: "/images/products/luxury-packaging.jpg",
    lifestyle: "/images/products/rash-guard.jpg",
  },
};
