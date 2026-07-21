// Types mirror the FastAPI backend's Pydantic schemas exactly
// (app/schemas/market.py, app/schemas/user.py)

export type AssetType = "forex" | "crypto" | "stock" | "index";
export type TrendDirection = "Bullish" | "Bearish" | "Sideways";
export type SignalAction = "BUY" | "SELL" | "NO_TRADE";
export type EngineType = "long_term" | "short_term";

export interface AIAnalysis {
  instrument: string;
  professional_analysis: string;
  trade_summary: string;
  risk_summary: string;
  why_buy: string | null;
  why_sell: string | null;
  generated_at: string;
}

export interface TradeSignal {
  instrument: string;
  asset_type: AssetType;
  engine: EngineType;
  signal: SignalAction;
  entry: number | null;
  stop_loss: number | null;
  tp1: number | null;
  tp2: number | null;
  risk_reward: number | null;
  confidence: number;
  trend: TrendDirection;
  indicators: Record<string, unknown>;
  generated_at: string;
  ai_analysis?: AIAnalysis;
  updated_at?: string;
}

export interface IndexTrendSignal {
  instrument: string;
  asset_type: "index";
  trend: TrendDirection;
  confidence: number;
  indicators: Record<string, unknown>;
  generated_at: string;
  ai_analysis?: AIAnalysis;
  updated_at?: string;
}

export type AnySignal = TradeSignal | IndexTrendSignal;

export function isTradeSignal(s: AnySignal): s is TradeSignal {
  return (s as TradeSignal).signal !== undefined;
}

export interface UserProfile {
  uid: string;
  email: string;
  full_name: string;
  photo_url?: string | null;
  is_subscribed: boolean;
  subscription_plan?: string | null;
  subscription_expiry?: string | null;
  trial_expiry?: string | null;
  created_at: string;
}

export interface Plan {
  plan_id: string;
  name: string;
  price_inr: number;
  duration_days: number;
  features?: string[];
}

export interface SubscriptionStatus {
  is_active: boolean;
  is_paid_subscriber: boolean;
  is_on_trial: boolean;
  plan: string | null;
  subscription_expiry: string | null;
  trial_expiry: string | null;
  free_instruments: string[];
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
