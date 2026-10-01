import { NextResponse } from "next/server";
import { getCategories, getProducts } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);

    // Attach product counts and preview items to categories
    const categoriesWithMeta = categories.map((cat) => {
      const catProducts = products.filter((p) => p.category_id === cat.id);
      return {
        ...cat,
        productCount: catProducts.length,
        featuredItems: catProducts.slice(0, 14).map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          image: p.images?.[0]?.image_url || null,
          moq: p.moq,
          samplePrice: p.sample_price || p.pricing_tiers?.[0]?.unit_price || null,
          leadTime: p.lead_time,
        })),
      };
    });

    const featuredSelections = products
      .filter((p) => p.featured || p.images?.[0]?.image_url)
      .slice(0, 14)
      .map((p) => {
        const cat = categories.find((c) => c.id === p.category_id);
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          categorySlug: cat?.slug || "products",
          categoryName: cat?.name || "Equipment",
          image: p.images?.[0]?.image_url || null,
          moq: p.moq,
        };
      });

    return NextResponse.json({
      categories: categoriesWithMeta,
      featuredSelections,
      totalProducts: products.length,
    });
  } catch (error) {
    console.error("Failed to get categories:", error);
    return NextResponse.json({ categories: [], featuredSelections: [], totalProducts: 0 }, { status: 500 });
  }
}
