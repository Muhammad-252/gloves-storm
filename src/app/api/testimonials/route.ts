import { NextRequest, NextResponse } from "next/server";
import { getDbTestimonials, saveDbTestimonial, deleteDbTestimonial } from "@/lib/data/fileDb";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await getDbTestimonials();
    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const testimonialData = body.testimonial || body;

    if (!testimonialData || !testimonialData.client_name) {
      return NextResponse.json({ success: false, error: "Client name is required" }, { status: 400 });
    }

    const saved = await saveDbTestimonial(testimonialData);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admin/testimonials");
    } catch {}

    return NextResponse.json({ success: true, testimonial: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    await deleteDbTestimonial(id);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admin/testimonials");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
