import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="17 July 2026">
      <LegalSection heading="Information we collect">
        <p>
          When you create an account, we collect your name, email address, and authentication
          details via Firebase Authentication. When you subscribe, Razorpay processes your
          payment details directly — we never store your card or UPI credentials on our servers.
        </p>
      </LegalSection>
      <LegalSection heading="How we use your information">
        <p>
          We use your account information to authenticate you, deliver signals relevant to your
          subscription tier, send transactional notifications (new signals, subscription expiry,
          payment confirmations), and provide customer support.
        </p>
      </LegalSection>
      <LegalSection heading="Data storage">
        <p>
          User profiles, subscription status, and signal history are stored in Firebase
          Firestore. Data is retained for as long as your account remains active, or as required
          for legal and accounting purposes thereafter.
        </p>
      </LegalSection>
      <LegalSection heading="Third parties">
        <p>
          We use Razorpay for payment processing, Firebase for authentication and data storage,
          and market data providers (Twelve Data, CoinGecko, Angel One) to generate signals —
          these providers never receive your personal account information.
        </p>
      </LegalSection>
      <LegalSection heading="Your rights">
        <p>
          You may request a copy of your data or account deletion at any time by contacting{" "}
          <a href="/contact" className="text-signal underline">
            support
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
