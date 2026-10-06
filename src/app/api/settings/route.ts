import { NextRequest, NextResponse } from "next/server";
import { getDbSiteSettings, saveDbSiteSettings } from "@/lib/data/fileDb";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getDbSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const settingsData = body.settings || body;

    const saved = await saveDbSiteSettings(settingsData);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admin/settings");
    } catch {}

    return NextResponse.json({ success: true, settings: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
