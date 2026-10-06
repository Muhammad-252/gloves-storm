import { NextRequest, NextResponse } from "next/server";
import { getDbInquiries, saveDbInquiry, updateDbInquiryStatus } from "@/lib/data/fileDb";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const inquiries = await getDbInquiries();
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.action === "updateStatus" && body.id) {
      const ok = await updateDbInquiryStatus(body.id, body.status, body.internalNotes);
      try {
        revalidatePath("/admin/inquiries");
      } catch {}
      return NextResponse.json({ success: ok });
    }

    const inquiryData = body.inquiry || body;
    if (!inquiryData.name || !inquiryData.email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 });
    }

    const saved = await saveDbInquiry(inquiryData);

    try {
      revalidatePath("/admin/inquiries");
    } catch {}

    return NextResponse.json({ success: true, inquiry: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
