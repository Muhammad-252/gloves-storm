import { NextRequest, NextResponse } from "next/server";
import { getDbBlogPosts, saveDbBlogPost, deleteDbBlogPost } from "@/lib/data/fileDb";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getDbBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const postData = body.post || body;

    if (!postData || !postData.title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }

    const saved = await saveDbBlogPost(postData);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/journal");
      revalidatePath("/journal/[slug]", "page");
      revalidatePath("/admin/blog");
      if (saved.slug) revalidatePath(`/journal/${saved.slug}`);
    } catch {}

    return NextResponse.json({ success: true, post: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    await deleteDbBlogPost(id);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/journal");
      revalidatePath("/journal/[slug]", "page");
      revalidatePath("/admin/blog");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
