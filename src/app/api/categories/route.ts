import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/data/store";
import {
  loadPersistedCategories,
  savePersistedCategory,
  deletePersistedCategory,
} from "@/lib/data/categoryPersistence";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [categories, products] = await Promise.all([
      loadPersistedCategories(),
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const categoryData = body.category || body;

    if (!categoryData || !categoryData.name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const saved = await savePersistedCategory(categoryData);

    // Revalidate affected routes
    try {
      revalidatePath("/", "layout");
      revalidatePath("/products");
      revalidatePath("/admin/categories");
      revalidatePath("/products/[category]", "page");
      revalidatePath("/products/[category]/[product]", "page");
      if (saved.slug) {
        revalidatePath(`/products/${saved.slug}`);
      }
    } catch (revalidateErr) {
      console.warn("Revalidation notice:", revalidateErr);
    }

    return NextResponse.json({
      success: true,
      category: saved,
      message: `Category "${saved.name}" successfully saved.`,
    });
  } catch (error: any) {
    console.error("Failed to save category:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error saving category" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    await deletePersistedCategory(id);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/products");
      revalidatePath("/admin/categories");
      revalidatePath("/products/[category]", "page");
      revalidatePath("/products/[category]/[product]", "page");
    } catch (revalidateErr) {
      console.warn("Revalidation notice:", revalidateErr);
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error: any) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error deleting category" },
      { status: 500 }
    );
  }
}
