import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/States";
import { Receipt } from "lucide-react";

// NOTE FOR DEVELOPER: The backend doesn't have a payment history endpoint yet.
// Razorpay payments are verified in app/services/payment_service.py but never
// written to a "payments" Firestore collection, so there's nothing to list here.
// To wire this up: write a payment record (order id, payment id, amount,
// status, plan, timestamp) to Firestore inside verify_and_activate() and
// handle_webhook(), then add GET /api/v1/subscription/payment-history.
export default function PaymentHistoryPage() {
  return (
    <div>
      <PageHeader title="Payment History" subtitle="Your past charges and invoices." />
      <EmptyState
        icon={<Receipt className="h-8 w-8 text-ink-700" />}
        title="No payment records yet"
        body="Payments you make will appear here with the payment ID, amount, status, and date."
      />
    </div>
  );
}
