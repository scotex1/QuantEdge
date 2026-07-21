// NOTE: The backend (FastAPI + Admin SDK) has no dedicated "forgot password"
// endpoint — Firebase handles password reset client-side. This talks directly
// to the Firebase Identity Toolkit REST API using the public Web API key
// (safe to expose client-side, same key you'd use with the Firebase JS SDK).
//
// Add NEXT_PUBLIC_FIREBASE_API_KEY to your frontend .env.local — find it in
// Firebase Console > Project Settings > General > Web API Key.

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export function isFirebaseClientConfigured(): boolean {
  return Boolean(FIREBASE_API_KEY);
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  if (!FIREBASE_API_KEY) {
    throw new Error(
      "Password reset isn't configured yet. Add NEXT_PUBLIC_FIREBASE_API_KEY to enable it."
    );
  }

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestType: "PASSWORD_RESET", email }),
    }
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message || "Couldn't send reset email. Check the address and try again.");
  }
}
