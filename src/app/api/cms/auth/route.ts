import { NextResponse } from "next/server";
import { isAuthed, getCmsPassword, setAuthed, clearAuthed } from "@/lib/cms-auth";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ authed: await isAuthed() });
}

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({}));
  if (typeof password !== "string" || password !== getCmsPassword()) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 },
    );
  }
  await setAuthed();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAuthed();
  return NextResponse.json({ ok: true });
}
