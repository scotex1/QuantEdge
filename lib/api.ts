import Cookies from "js-cookie";
import type {
  TokenResponse,
  UserProfile,
  AnySignal,
  Plan,
  SubscriptionStatus,
} from "./types";

// This is the ONLY base URL the frontend ever talks to. All market data
// (Twelve Data, CoinGecko, Angel One) is fetched server-side by the backend —
// the frontend never calls those APIs directly.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const API_V1 = `${API_BASE}/api/v1`;

const ACCESS_TOKEN_COOKIE = "ts_access_token";
const REFRESH_TOKEN_COOKIE = "ts_refresh_token";

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_COOKIE);
}

export function setTokens(tokens: TokenResponse) {
  // 1 day for access, 30 days for refresh — mirrors backend JWT expiry settings
  Cookies.set(ACCESS_TOKEN_COOKIE, tokens.access_token, { expires: 1, sameSite: "lax" });
  Cookies.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, { expires: 30, sameSite: "lax" });
}

export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_COOKIE);
  Cookies.remove(REFRESH_TOKEN_COOKIE);
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth: boolean = true
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_V1}${path}`, { ...options, headers });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      /* ignore parse errors */
    }
    throw new ApiError(detail, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ---------------- Authentication API ----------------
export const authApi = {
  signup: (data: { email: string; password: string; full_name: string }) =>
    request<TokenResponse>("/auth/signup", { method: "POST", body: JSON.stringify(data) }, false),

  login: (data: { email: string; password: string }) =>
    request<TokenResponse>("/auth/login", { method: "POST", body: JSON.stringify(data) }, false),

  firebaseLogin: (idToken: string) =>
    request<TokenResponse>(
      "/auth/firebase-login",
      { method: "POST", body: JSON.stringify({ id_token: idToken }) },
      false
    ),

  refresh: (refreshToken: string) =>
    request<{ access_token: string; token_type: string }>(
      "/auth/refresh",
      { method: "POST", body: JSON.stringify({ refresh_token: refreshToken }) },
      false
    ),

  me: () => request<UserProfile>("/auth/me"),
};

// ---------------- Signal API ----------------
export const signalApi = {
  getAllLive: () => request<AnySignal[]>("/signals/live"),
  getLive: (instrument: string) => request<AnySignal>(`/signals/live/${instrument}`),
};

// ---------------- History API ----------------
export const historyApi = {
  getHistory: (params?: { instrument?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.instrument) query.set("instrument", params.instrument);
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return request<AnySignal[]>(`/history${qs ? `?${qs}` : ""}`);
  },
};

// ---------------- Subscription API ----------------
export const subscriptionApi = {
  getPlans: () => request<Plan[]>("/subscription/plans", {}, false),
  getStatus: () => request<SubscriptionStatus>("/subscription/status"),
  createOrder: (planId: string) =>
    request<{ order_id: string; amount: number; currency: string; razorpay_key_id: string }>(
      "/subscription/create-order",
      { method: "POST", body: JSON.stringify({ plan_id: planId }) }
    ),
  verifyPayment: (
    planId: string,
    payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }
  ) =>
    request<{ status: string; message: string }>(
      `/subscription/verify-payment?plan_id=${planId}`,
      { method: "POST", body: JSON.stringify(payload) }
    ),
};

// ---------------- Profile API ----------------
// NOTE: backend has no dedicated /profile route yet — profile data currently
// comes from /auth/me. Kept as a separate export so the frontend call sites
// don't need to change if a dedicated endpoint is added later.
export const profileApi = {
  get: () => authApi.me(),
};

// ---------------- Payment API ----------------
export interface PaymentRecord {
  id: string;
  plan_id: string;
  plan_name: string;
  amount_inr: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  status: "success" | "failed";
  created_at: string;
}

export const paymentApi = {
  getHistory: () => request<PaymentRecord[]>("/subscription/payment-history"),
};

// ---------------- Notification API ----------------
export interface NotificationRecord {
  id: string;
  uid: string | null;
  type: "new_signal" | "payment_success" | "expiry_reminder";
  title: string;
  body: string;
  instrument?: string;
  read: boolean;
  created_at: string;
}

export const notificationApi = {
  getAll: () => request<NotificationRecord[]>("/notifications"),
  markRead: (id: string) => request<{ status: string }>(`/notifications/${id}/read`, { method: "POST" }),
};
