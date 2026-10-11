import { NextRequest, NextResponse } from "next/server";
import { getDbProducts, getDbCategories, saveDbProduct, deleteDbProduct } from "@/lib/data/fileDb";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

// Slugs hidden from the public site (keep in sync with /api/categories)
const HIDDEN_CATEGORY_SLUGS = ["boxing-equipment", "swimwear-beachwear"];

export async function GET(req: NextRequest) {
  try {
    console.log("[API /api/products] 🚀 GET requested. Querying products from DB...");
    const [allProducts, allCategories] = await Promise.all([getDbProducts(), getDbCategories()]);

    // Build a set of IDs for hidden categories so we can exclude their products
    const hiddenCatIds = new Set(
      allCategories.filter((c) => HIDDEN_CATEGORY_SLUGS.includes(c.slug)).map((c) => c.id)
    );

    const url = new URL(req.url);
    const categoryId = url.searchParams.get("categoryId");
    const featured = url.searchParams.get("featured");
    const search = url.searchParams.get("search");

    // Start by removing hidden-category products
    let result = allProducts.filter((p) => !hiddenCatIds.has(p.category_id ?? ""));

    if (categoryId && categoryId !== "all") {
      result = result.filter((p) => p.category_id === categoryId);
    }
    if (featured === "true") {
      result = result.filter((p) => p.featured);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.short_description && p.short_description.toLowerCase().includes(q))
      );
    }

    console.log(`[API /api/products] 📊 Returning ${result.length} of ${allProducts.length} total products.`);
    return NextResponse.json({ success: true, products: result, total: result.length });
  } catch (error: any) {
    console.error("[API /api/products] ❌ Failed to fetch products:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productData = body.product || body;

    if (!productData || !productData.name) {
      return NextResponse.json(
        { success: false, error: "Product name is required" },
        { status: 400 }
      );
    }

    const saved = await saveDbProduct(productData);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/products");
      revalidatePath("/admin/products");
      revalidatePath("/products/[category]", "page");
      revalidatePath("/products/[category]/[product]", "page");

      if (saved.slug) {
        if (saved.category_id) {
          const { getDbCategories } = await import("@/lib/data/fileDb");
          const categories = await getDbCategories();
          const cat = categories.find((c) => c.id === saved.category_id);
          if (cat?.slug) {
            revalidatePath(`/products/${cat.slug}/${saved.slug}`);
            revalidatePath(`/products/${cat.slug}`);
          }
        }
      }
    } catch (e) {
      console.warn("Revalidation notice:", e);
    }

    return NextResponse.json({
      success: true,
      product: saved,
      message: `Product "${saved.name}" successfully saved.`,
    });
  } catch (error: any) {
    console.error("Failed to save product:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    await deleteDbProduct(id);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/products");
      revalidatePath("/admin/products");
      revalidatePath("/products/[category]", "page");
      revalidatePath("/products/[category]/[product]", "page");
    } catch (e) {
      console.warn("Revalidation notice:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Product successfully deleted.",
    });
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
