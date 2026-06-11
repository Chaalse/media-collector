"use server";

import { cookies } from "next/headers";
import { signToken, verifyToken, SESSION_DURATION } from "./session";

export type AuthResult =
  | { success: true }
  | { success: false; error: string };

export async function loginWithEmail(email: string): Promise<AuthResult> {
  // TODO(impl): Stub implementation. Replace with actual DB authentication logic.
  await new Promise((resolve) => setTimeout(resolve, 500));

  await createSession(email);
  return { success: true };
}

export async function createSession(email: string): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION;
  const token = await signToken({ email, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt),
    path: "/",
  });
}

export async function getSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  return { email: payload.email };
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
