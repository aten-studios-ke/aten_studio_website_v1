import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthed } from "@/lib/cms-auth";

export const runtime = "nodejs";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, ctx: Ctx) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 422 });
  }
  try {
    const updated = await db.project.update({
      where: { id },
      data: {
        title: body.title?.trim(),
        slug: body.slug?.trim() ? slugify(body.slug) : undefined,
        year: body.year != null ? String(body.year) : undefined,
        category: body.category,
        client: body.client?.trim() || null,
        description: body.description?.trim() || null,
        role: body.role?.trim() || null,
        layout: body.layout,
        heroImage: body.heroImage,
        featured: body.featured != null ? !!body.featured : undefined,
        videoUrl: body.videoUrl != null ? (body.videoUrl.trim() || null) : undefined,
        liveUrl: body.liveUrl != null ? (body.liveUrl.trim() || null) : undefined,
        galleryImages: body.galleryImages != null ? (body.galleryImages || null) : undefined,
      },
    });
    return NextResponse.json({ ok: true, project: updated });
  } catch (err) {
    console.error("[projects] update error", err);
    return NextResponse.json({ ok: false, error: "Could not update project." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    await db.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[projects] delete error", err);
    return NextResponse.json({ ok: false, error: "Could not delete project." }, { status: 500 });
  }
}
