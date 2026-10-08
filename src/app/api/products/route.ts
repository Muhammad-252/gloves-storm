import { NextRequest, NextResponse } from "next/server";
import { getDbProducts, saveDbProduct, deleteDbProduct } from "@/lib/data/fileDb";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const products = await getDbProducts();
    const url = new URL(req.url);
    const categoryId = url.searchParams.get("categoryId");
    const featured = url.searchParams.get("featured");
    const search = url.searchParams.get("search");

    let result = products;

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

    return NextResponse.json({ success: true, products: result, total: result.length });
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
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
