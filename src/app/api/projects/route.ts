import { NextRequest, NextResponse } from "next/server";
import { getDbProjects, saveDbProject, deleteDbProject } from "@/lib/data/fileDb";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getDbProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projectData = body.project || body;

    if (!projectData || !projectData.title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }

    const saved = await saveDbProject(projectData);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/projects");
      revalidatePath("/previous-work");
      revalidatePath("/admin/projects");
    } catch {}

    return NextResponse.json({ success: true, project: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    await deleteDbProject(id);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/projects");
      revalidatePath("/previous-work");
      revalidatePath("/admin/projects");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
