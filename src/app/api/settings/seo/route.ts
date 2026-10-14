import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const seoConfigPath = path.resolve(process.cwd(), "src/lib/data/globalSeoSettings.json");

export async function GET() {
  try {
    if (fs.existsSync(seoConfigPath)) {
      const data = JSON.parse(fs.readFileSync(seoConfigPath, "utf-8"));
      return NextResponse.json({ success: true, settings: data });
    }
    return NextResponse.json({ success: false, error: "Settings file not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.settings) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    fs.writeFileSync(seoConfigPath, JSON.stringify(body.settings, null, 2), "utf-8");
    return NextResponse.json({ success: true, settings: body.settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
