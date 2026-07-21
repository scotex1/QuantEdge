import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/States";
import { Bell } from "lucide-react";

// NOTE FOR DEVELOPER: app/services/notification_service.py only sends FCM push
// notifications — it doesn't persist a notification history to Firestore, so
// there's no list endpoint to call yet. To wire this up: write each
// notification (type, title, body, timestamp, read) to a "notifications"
// collection when it's sent, then add GET /api/v1/notifications.
export default function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="New signals, subscription expiry, and payment confirmations."
      />
      <EmptyState
        icon={<Bell className="h-8 w-8 text-ink-700" />}
        title="You're all caught up"
        body="New signal alerts, subscription expiry reminders, and payment confirmations will show up here."
      />
    </div>
  );
}
