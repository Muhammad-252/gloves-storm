import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getCategories, getProducts } from "@/lib/data/store";
import { BUSINESS_CONFIG } from "@/lib/business";
import type { Product } from "@/types/database";

/**
 * Product cards pulled live from the admin product list (Supabase).
 * Picks products from the preferred categories first (taking turns so the
 * grid stays varied), favours products whose slug matches a keyword and
 * products with real photos, then fills up from any other category.
 */
export interface DynamicProductGridProps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** Category slugs in order of preference */
  categorySlugs: string[];
  /** Words to look for in product slugs, e.g. ["hoodie", "jersey"] */
  keywords?: string[];
  limit?: number;
  /** Used in image alt text, e.g. "USA brands" */
  audience?: string;
  className?: string;
}

const primaryImage = (p: Product) =>
  p.images?.find((i) => i.is_primary)?.image_url || p.images?.[0]?.image_url || "";

export async function pickProducts(
  categorySlugs: string[],
  keywords: string[] = [],
  limit = 8
): Promise<{ product: Product; categorySlug: string; categoryName: string }[]> {
  const [products, categories] = await Promise.all([
    getProducts().catch(() => [] as Product[]),
    getCategories().catch(() => []),
  ]);
  const catById = new Map(categories.map((c) => [c.id, c]));

  const usable = products.filter(
    (p) => p.is_active && primaryImage(p) && p.category_id && catById.has(p.category_id)
  );

  const score = (p: Product) => {
    let s = 0;
    if (keywords.some((k) => p.slug.includes(k))) s += 4;
    // Photos uploaded through admin beat generated mockups and old stock images in /images/
    if (!primaryImage(p).startsWith("/images/")) s += 2;
    if (p.featured) s += 1;
    return s;
  };

  const byCategory = new Map<string, Product[]>();
  for (const p of usable) {
    const slug = catById.get(p.category_id!)!.slug;
    byCategory.set(slug, [...(byCategory.get(slug) ?? []), p]);
  }
  for (const list of byCategory.values()) list.sort((a, b) => score(b) - score(a));

  const order = [
    ...categorySlugs.filter((s) => byCategory.has(s)),
    ...[...byCategory.keys()].filter((s) => !categorySlugs.includes(s)),
  ];
  const preferred = order.filter((s) => categorySlugs.includes(s));

  const picked: Product[] = [];
  const take = (slugs: string[]) => {
    let added = true;
    while (picked.length < limit && added) {
      added = false;
      for (const s of slugs) {
        const next = byCategory.get(s)?.find((p) => !picked.includes(p));
        if (next && picked.length < limit) {
          picked.push(next);
          added = true;
        }
      }
    }
  };
  take(preferred.length ? preferred : order); // preferred categories, taking turns
  take(order); // fill from anything else if the preferred ones run out

  return picked.map((product) => {
    const cat = catById.get(product.category_id!)!;
    return { product, categorySlug: cat.slug, categoryName: cat.name };
  });
}

export default async function DynamicProductGrid({
  eyebrow,
  heading,
  intro,
  categorySlugs,
  keywords,
  limit = 8,
  audience,
  className = "",
}: DynamicProductGridProps) {
  const items = await pickProducts(categorySlugs, keywords, limit);
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="text-[10px] sm:text-xs text-neutral-500 block mb-2 font-medium">{eyebrow}</span>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-ink leading-tight">
            {heading}
          </h2>
          {intro && <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">{intro}</p>}
        </div>
        <Link
          href="/products"
          className="shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink"
        >
          View full catalog
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {items.map(({ product: p, categorySlug, categoryName }) => {
          const img = p.images?.find((i) => i.is_primary) || p.images?.[0];
          return (
            <Link
              key={p.id}
              href={`/products/${categorySlug}/${p.slug}`}
              className="group rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-slate-100">
                {img && (
                  <Image
                    src={img.image_url}
                    alt={img.alt_text || `${p.name}${audience ? ` for ${audience}` : ""}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                )}
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] text-slate-800 font-medium max-w-[calc(100%-1rem)] truncate">
                  {categoryName}
                </span>
              </div>
              <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-ink leading-snug line-clamp-2 group-hover:text-[#B07F00] transition-colors">
                  {p.name}
                </h3>
                {p.short_description && (
                  <p className="hidden sm:block text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {p.short_description}
                  </p>
                )}
                <span className="mt-auto pt-2 text-[10px] sm:text-[11px] text-slate-500">
                  MOQ {p.moq || BUSINESS_CONFIG.moq} pcs
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
