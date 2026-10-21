import { NextRequest, NextResponse } from "next/server";
import { getDbInquiries, saveDbInquiry, updateDbInquiryStatus } from "@/lib/data/fileDb";
import { sendInquiryNotificationEmail } from "@/lib/email/sendInquiryEmail";
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

    // 1. Save to Database
    let saved;
    try {
      saved = await saveDbInquiry(inquiryData);
    } catch (dbErr: any) {
      console.error("[api/inquiries] Database save warning:", dbErr?.message || dbErr);
      // Fallback object so email dispatch and user experience still succeed
      saved = {
        id: `local-${Date.now()}`,
        status: "New",
        created_at: new Date().toISOString(),
        ...inquiryData,
      };
    }

    // 2. Dispatch email to glovesstorm@gmail.com
    let emailResult = { success: false };
    try {
      emailResult = await sendInquiryNotificationEmail(saved);
    } catch (emailErr: any) {
      console.error("[api/inquiries] Email dispatch warning:", emailErr?.message || emailErr);
    }

    try {
      revalidatePath("/admin/inquiries");
    } catch {}

    return NextResponse.json({
      success: true,
      inquiry: saved,
      emailSent: emailResult.success,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
