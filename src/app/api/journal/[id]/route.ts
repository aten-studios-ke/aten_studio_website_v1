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
    const updated = await db.journalPost.update({
      where: { id },
      data: {
        title: body.title?.trim(),
        slug: body.slug?.trim() ? slugify(body.slug) : undefined,
        type: body.type,
        date: body.date?.trim(),
        readTime: body.readTime?.trim(),
        excerpt: body.excerpt?.trim(),
        coverImage: body.coverImage,
        content: body.content?.trim() || null,
      },
    });
    return NextResponse.json({ ok: true, post: updated });
  } catch (err) {
    console.error("[journal] update error", err);
    return NextResponse.json({ ok: false, error: "Could not update post." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    await db.journalPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[journal] delete error", err);
    return NextResponse.json({ ok: false, error: "Could not delete post." }, { status: 500 });
  }
}
