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
  const posts = await db.journalPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ posts });
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
    const created = await db.journalPost.create({
      data: {
        title: body.title.trim(),
        slug,
        type: body.type ?? "Story",
        date: body.date?.trim() || new Date().toLocaleString("en-US", { month: "short", year: "numeric" }),
        readTime: body.readTime?.trim() || "5 min",
        excerpt: body.excerpt?.trim() || "",
        coverImage: body.coverImage || "/images/journal-1.jpg",
        content: body.content?.trim() || null,
      },
    });
    return NextResponse.json({ ok: true, post: created }, { status: 201 });
  } catch (err) {
    console.error("[journal] create error", err);
    return NextResponse.json(
      { ok: false, error: "Could not create post (slug may already exist)." },
      { status: 500 },
    );
  }
}
