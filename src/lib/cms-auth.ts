import { cookies } from "next/headers";

/**
 * Lightweight CMS auth.
 * Password is read from CMS_PASSWORD env (fallback: "aten2026").
 * An httpOnly cookie `aten_cms` marks an authed session.
 */
const COOKIE = "aten_cms";
const TOKEN = "aten-cms-authed-v1";

export function getCmsPassword(): string {
  return process.env.CMS_PASSWORD?.trim() || "aten2026";
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const c = store.get(COOKIE);
  return c?.value === TOKEN;
}

export async function setAuthed(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthed(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, "", { path: "/", maxAge: 0 });
}
