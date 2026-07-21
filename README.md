# SignalDesk Frontend

Next.js 14 (App Router) + TypeScript + Tailwind. Talks only to the FastAPI backend —
never calls Twelve Data, CoinGecko, or Angel One directly.

## Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_BASE_URL to your backend
npm run dev
```
Runs at `http://localhost:3000`. Backend must be running (see `/backend/README.md`).

## Structure
- `app/` — routes (public site, auth, legal pages, `dashboard/*`)
- `components/` — shared UI, landing sections, dashboard widgets
- `lib/api.ts` — the only place that calls the backend; typed functions per API group
- `lib/auth-context.tsx` — JWT session state (cookies), login/signup/logout
- `lib/types.ts` — mirrors the backend's Pydantic schemas exactly

## Design
Dark trading-terminal aesthetic: charcoal-navy surfaces, amber/gold signature accent
(`#F2B705`, nodding to "signal" and XAUUSD gold), functional green/red for BUY/SELL —
the one domain-authentic exception to "no decorative color." Type: Space Grotesk
(display), Inter (body), JetBrains Mono (all numbers/prices/tickers). Signature
element: the scrolling live-signal ticker strip in the hero, echoed as data-grid
signal cards throughout the dashboard.

## Known gaps — backend work needed
These pages are built and wired to real endpoints where they exist, but four
things need backend additions before they're fully live:

1. **Payment History** (`/dashboard/payment-history`) — `payment_service.py` verifies
   Razorpay payments but never writes a record anywhere. Add a `payments` Firestore
   collection write in `verify_and_activate()` / `handle_webhook()`, plus a
   `GET /api/v1/subscription/payment-history` route.
2. **Notifications** (`/dashboard/notifications`) — `notification_service.py` only
   sends FCM push, no history is stored. Add a `notifications` Firestore collection
   and a `GET /api/v1/notifications` route.
3. **Email verification** — signup creates the user via Firebase Admin SDK but
   doesn't send a verification email. Use `auth.generate_email_verification_link()`
   plus an email provider (or switch signup to the Firebase client SDK flow, which
   sends it automatically).
4. **Win/Loss outcome tracking** — `TradeSignal` has no field for whether TP or SL
   was actually hit, so Signal History can only ever show "Running." Needs a
   backend job that checks live price against stored levels and updates status.
5. **Profile photo upload** — no upload endpoint exists yet (this is the Cloudinary
   use case flagged earlier). Add an upload route + Cloudinary integration, store
   the resulting URL on the user's Firestore doc as `photo_url`.

Everything else — auth, live signals (long-term/short-term, free-instrument +
trial gating), signal history, subscription status, Razorpay checkout, profile,
settings, and all public/legal pages — is fully wired to the existing backend.
