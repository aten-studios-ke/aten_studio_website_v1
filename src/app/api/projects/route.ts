import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthed } from "@/lib/cms-auth";

export const runtime = "nodejs";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function GET() {
  const projects = await db.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== "string") {
    return NextResponse.json({ ok: false, error: "Title is required." }, { status: 422 });
  }
  const slug = body.slug?.trim() ? slugify(body.slug) : slugify(body.title);
  try {
    const created = await db.project.create({
      data: {
        title: body.title.trim(),
        slug,
        year: String(body.year ?? new Date().getFullYear()),
        category: body.category ?? "Creative Technology",
        client: body.client?.trim() || null,
        description: body.description?.trim() || null,
        role: body.role?.trim() || null,
        layout: body.layout ?? "square",
        heroImage: body.heroImage || "/images/work-software.jpg",
        featured: !!body.featured,
        videoUrl: body.videoUrl?.trim() || null,
        liveUrl: body.liveUrl?.trim() || null,
        galleryImages: body.galleryImages || null,
      },
    });
    return NextResponse.json({ ok: true, project: created }, { status: 201 });
  } catch (err) {
    console.error("[projects] create error", err);
    return NextResponse.json(
      { ok: false, error: "Could not create project (slug may already exist)." },
      { status: 500 },
    );
  }
}
