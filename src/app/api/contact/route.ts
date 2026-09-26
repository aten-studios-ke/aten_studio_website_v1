import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthed } from "@/lib/cms-auth";

export const runtime = "nodejs";

function clean(value: FormDataEntryValue | null): string {
  return (value ?? "").toString().trim();
}

// CMS: list contact submissions (auth-gated)
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const messages = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = clean(form.get("name"));
  const email = clean(form.get("email"));
  const company = clean(form.get("company")) || null;
  const discipline = clean(form.get("discipline")) || null;
  const budget = clean(form.get("budget")) || null;
  const message = clean(form.get("message"));

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, email and a message." },
      { status: 422 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 422 },
    );
  }

  try {
    await db.contactSubmission.create({
      data: { name, email, company, discipline, budget, message },
    });
  } catch (err) {
    console.error("[contact] db error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your message." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Thanks — we'll be in touch within two business days.",
    },
    { status: 201 },
  );
}
