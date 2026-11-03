import { Product } from "@/types/database";

/**
 * Parses raw product materials into a clean array of strings.
 */
export function parseMaterialsList(materials: any): string[] {
  if (!materials) return [];
  if (Array.isArray(materials)) {
    return materials
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean);
  }
  if (typeof materials === "string") {
    const trimmed = materials.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseMaterialsList(parsed);
      } catch {}
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (typeof materials === "object") {
    if (Array.isArray(materials.materials)) return parseMaterialsList(materials.materials);
    return Object.values(materials)
      .filter((v): v is string => typeof v === "string" && Boolean(v.trim()))
      .map((s) => s.trim());
  }
  return [];
}

/**
 * Extracts a verified fabric and GSM tag strictly from the product's own data.
 * If the product has no fabric or GSM data (e.g. non-garment service, trims, inks),
 * it returns null rather than falling back to any default.
 */
export function getProductFabricTag(product: {
  materials?: any;
  specifications?: any;
  name?: string;
}): string | null {
  const list = parseMaterialsList(product.materials);
  let primary = list[0] || "";

  if (!primary && product.specifications) {
    primary =
      product.specifications.fabric ||
      product.specifications.material ||
      product.specifications.gsm ||
      "";
  }

  if (!primary) return null;

  // Filter out non-fabric supplies (inks, films, threads, boxes, labels)
  if (
    /ink|thread|film|foil|box|label|zipper|hardware|buckle|velcro|foam padding|sponge/i.test(
      primary
    ) &&
    !/cotton|poly|wool|fleece|terry|jersey|spandex|nylon|denim|leather/i.test(primary)
  ) {
    return null;
  }

  // Clean primary string: remove dash annotations like " — Main Body", "(Optional)", etc.
  const cleaned = primary
    .replace(/\s*[—–].*$/, "")
    .replace(/\s*\([^)]*optional[^)]*\)/gi, "")
    .trim();

  // Check for explicit GSM or oz in the string
  const gsmMatch =
    cleaned.match(/(\d+(?:[–-]\d+)?\+?\s*GSM)/i) ||
    primary.match(/(\d+(?:[–-]\d+)?\+?\s*GSM)/i);
  const ozMatch = cleaned.match(/(\d+(?:\.\d+)?\s*oz)/i);

  // Leather & Cowhide detection
  if (/cowhide|leather/i.test(cleaned)) {
    if (/top-grain/i.test(cleaned)) return "Top-Grain Cowhide";
    if (/full-grain/i.test(cleaned)) return "Full-Grain Cowhide";
    if (/pu\s*leather/i.test(cleaned) || /engineered\s*pu/i.test(cleaned)) return "Engineered PU";
    if (/melton.*wool/i.test(cleaned)) {
      if (gsmMatch) return `${gsmMatch[1].toUpperCase()} Melton Wool`;
      if (ozMatch) return `${ozMatch[1]} Melton Wool`;
      return "Melton Wool";
    }
    return "Genuine Leather";
  }

  // Detect specific fabric type
  let fabricName = "";
  if (/french\s*terry/i.test(cleaned)) fabricName = "French Terry";
  else if (/fleece/i.test(cleaned)) fabricName = "Cotton Fleece";
  else if (/ripstop\s*nylon/i.test(cleaned)) fabricName = "Ripstop Nylon";
  else if (/flight\s*nylon/i.test(cleaned)) fabricName = "Flight Nylon";
  else if (/ripstop/i.test(cleaned) && /poly/i.test(cleaned)) fabricName = "Ripstop Poly";
  else if (/ripstop/i.test(cleaned)) fabricName = "Ripstop Nylon";
  else if (/seamless\s*knit/i.test(cleaned)) fabricName = "Seamless Knit";
  else if (/dazzle/i.test(cleaned)) fabricName = "Poly Dazzle";
  else if (/interlock/i.test(cleaned)) fabricName = "Poly Interlock";
  else if (/mesh/i.test(cleaned)) fabricName = "Poly Mesh";
  else if (/tricot/i.test(cleaned)) fabricName = "Poly Tricot";
  else if (/piqu[eé]/i.test(cleaned)) {
    fabricName = /poly/i.test(cleaned) ? "Pique Poly" : "Pique Cotton";
  } else if (/warp\s*knit/i.test(cleaned)) fabricName = "Warp Knit";
  else if (/twill/i.test(cleaned)) fabricName = "Cotton Twill";
  else if (/spandex|elastane|lycra/i.test(cleaned)) {
    if (/nylon/i.test(cleaned)) fabricName = "Nylon-Spandex";
    else if (/poly/i.test(cleaned)) fabricName = "Poly-Spandex";
    else fabricName = "Stretch Spandex";
  } else if (/carded\s*cotton|combed\s*cotton|cotton\s*jersey/i.test(cleaned)) {
    fabricName = "Combed Cotton";
  } else if (/denim/i.test(cleaned)) fabricName = "Cotton Denim";
  else if (/canvas/i.test(cleaned)) fabricName = "Cotton Canvas";
  else if (/melton\s*wool/i.test(cleaned)) fabricName = "Melton Wool";
  else if (/performance\s*poly/i.test(cleaned) || (/polyester/i.test(cleaned) && gsmMatch)) {
    fabricName = "Performance Poly";
  }

  if (gsmMatch && fabricName) {
    return `${gsmMatch[1].toUpperCase()} ${fabricName}`;
  }
  if (ozMatch && fabricName) {
    return `${ozMatch[1]} ${fabricName}`;
  }
  if (gsmMatch) {
    return gsmMatch[1].toUpperCase();
  }
  if (fabricName) {
    return fabricName;
  }

  // Fallback: if primary explicitly states a concise fabric/garment material (< 26 chars)
  if (
    cleaned.length <= 26 &&
    !/adherence|sourcing|specifications|client|strict/i.test(cleaned)
  ) {
    return cleaned;
  }

  return null;
}

/**
 * Strips heavy unneeded properties (full long markdown descriptions, SEO metadata,
 * internal specs, and extra gallery images) to produce a lightweight card projection.
 * This drastically reduces RSC payload size when passing products to client components.
 */
export function projectProductCard(p: Product): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category_id: p.category_id,
    short_description:
      p.short_description ||
      (typeof p.description === "string" ? p.description.slice(0, 160) : null),
    description:
      typeof p.description === "string" ? p.description.slice(0, 160) : null,
    materials: p.materials,
    features: Array.isArray(p.features)
      ? p.features.slice(0, 3)
      : typeof p.features === "string"
      ? p.features.slice(0, 120)
      : null,
    customization_options: null,
    moq: p.moq,
    lead_time: p.lead_time,
    featured: Boolean(p.featured),
    is_active: p.is_active,
    seo_title: null,
    seo_description: null,
    created_at: p.created_at || "",
    updated_at: "",
    images: (p.images || []).slice(0, 2).map((img, i) => ({
      id: img.id || `${p.id}-${i}`,
      product_id: p.id,
      image_url: img.image_url,
      alt_text: img.alt_text,
      sort_order: img.sort_order || i,
      is_primary: Boolean(img.is_primary),
      created_at: "",
    })),
    category: p.category
      ? {
          id: p.category.id,
          name: p.category.name,
          slug: p.category.slug,
          description: null,
          image_url: null,
          parent_id: null,
          sort_order: 0,
          is_active: true,
          created_at: "",
          updated_at: "",
        }
      : undefined,
  };
}
