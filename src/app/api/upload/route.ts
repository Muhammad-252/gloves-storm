import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/client";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Uploaded file must be an image (JPEG, PNG, WEBP, GIF, SVG, etc.)" },
        { status: 400 }
      );
    }

    // Max 15MB size limit
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image file exceeds 15MB size limit" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize folder name
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase() || "uploads";
    
    // Generate clean unique filename
    const originalExt = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 40);
    const uniqueFileName = `${Date.now()}-${baseName || "image"}${originalExt.toLowerCase()}`;

    // 1. Try uploading to Supabase Storage if configured and online
    if (isSupabaseConfigured) {
      const storageClient = supabaseAdmin || supabase;
      if (storageClient) {
        try {
          const bucketMap: Record<string, string> = {
            categories: "products",
            products: "products",
            projects: "projects",
            blog: "blog",
            testimonials: "testimonials",
            settings: "site-assets",
            assets: "site-assets",
            inquiries: "inquiries",
          };
          const bucketName = bucketMap[safeFolder] || "products";
          const storagePath = `${safeFolder}/${uniqueFileName}`;

          const { error: uploadError } = await storageClient.storage
            .from(bucketName)
            .upload(storagePath, buffer, {
              contentType: file.type,
              upsert: true,
            });

          if (!uploadError) {
            const { data: publicData } = storageClient.storage
              .from(bucketName)
              .getPublicUrl(storagePath);

            if (publicData?.publicUrl) {
              return NextResponse.json({
                success: true,
                url: publicData.publicUrl,
                filename: uniqueFileName,
                source: "supabase",
              });
            }
          } else {
            console.warn("Supabase storage upload error:", uploadError);
          }
        } catch (supabaseErr) {
          console.warn("Supabase storage upload skipped/failed, falling back to local disk:", supabaseErr);
        }
      }
    }

    // 2. Local Disk Storage: save into public/uploads/<folder>/<filename>
    try {
      const publicDir = path.join(process.cwd(), "public", "uploads", safeFolder);
      await fs.mkdir(publicDir, { recursive: true });
      const filePath = path.join(publicDir, uniqueFileName);
      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${safeFolder}/${uniqueFileName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: uniqueFileName,
        source: "local",
      });
    } catch (diskErr) {
      console.warn("Local disk write failed (e.g. read-only filesystem), converting to base64 fallback:", diskErr);

      // 3. Fallback for read-only environments (e.g. ephemeral serverless container without storage credentials)
      const base64Data = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64Data}`;
      return NextResponse.json({
        success: true,
        url: dataUri,
        filename: uniqueFileName,
        source: "base64",
      });
    }
  } catch (err: any) {
    console.error("Image upload route error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error uploading image" },
      { status: 500 }
    );
  }
}
