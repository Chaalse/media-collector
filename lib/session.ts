const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

interface SessionPayload {
  email: string;
  expiresAt: number;
}

const encoder = new TextEncoder();

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET ?? "dev-secret-change-in-production";
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signToken(payload: SessionPayload): Promise<string> {
  const key = await getKey();
  const data = JSON.stringify(payload);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const dataBase64 = btoa(data);
  return `${dataBase64}.${signatureBase64}`;
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const [dataBase64, signatureBase64] = token.split(".");
    if (!dataBase64 || !signatureBase64) return null;

    const data = atob(dataBase64);
    const signature = Uint8Array.from(atob(signatureBase64), (c) => c.charCodeAt(0));

    const key = await getKey();
    const valid = await crypto.subtle.verify("HMAC", key, signature, encoder.encode(data));
    if (!valid) return null;

    const payload: SessionPayload = JSON.parse(data);
    if (Date.now() > payload.expiresAt) return null;

    return payload;
  } catch {
    return null;
  }
}

export { type SessionPayload, SESSION_DURATION };
