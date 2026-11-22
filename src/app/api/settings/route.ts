import { NextRequest, NextResponse } from "next/server";
import { getDbSiteSettings, saveDbSiteSettings } from "@/lib/data/fileDb";
import { revalidatePath, revalidateTag } from "next/cache";
import { SITE_SETTINGS_TAG } from "@/lib/siteSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // This endpoint is public, so never return the Instagram secrets.
    const { instagram_access_token: _t, instagram_widget_code: _w, ...settings } =
      await getDbSiteSettings();
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
      revalidateTag(SITE_SETTINGS_TAG, { expire: 0 });
      revalidatePath("/", "layout");
      revalidatePath("/admin/settings");
    } catch {}

    return NextResponse.json({ success: true, settings: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
