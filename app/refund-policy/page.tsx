import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" updated="17 July 2026">
      <LegalSection heading="Digital subscriptions">
        <p>
          SignalDesk subscriptions grant immediate access to live signals upon payment. Because
          access is delivered instantly and consumed in real time, subscription payments are
          generally non-refundable once activated.
        </p>
      </LegalSection>
      <LegalSection heading="Exceptions">
        <p>
          We will issue a full refund if you were charged due to a verified technical error (for
          example, a duplicate charge, or a failed activation where access was never granted).
          Contact{" "}
          <a href="/contact" className="text-signal underline">
            support
          </a>{" "}
          within 7 days of the charge with your payment ID.
        </p>
      </LegalSection>
      <LegalSection heading="How refunds are processed">
        <p>
          Approved refunds are issued to the original payment method via Razorpay and typically
          reflect within 5–7 business days, depending on your bank or payment provider.
        </p>
      </LegalSection>
      <LegalSection heading="Cancellations">
        <p>
          You may stop a subscription from renewing at any time from your Subscription page;
          your existing access continues until the current plan period ends.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
