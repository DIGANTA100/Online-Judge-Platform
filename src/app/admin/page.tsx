import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { AdminSystem } from "@/components/platform/admin-system";

export default function AdminPage() {
  return (
    <AppShell active="Admin Studio">
      <PageHeader
        eyebrow="Phases 8 and 13"
        title="Admin Studio and Production Readiness"
        description="Problem authoring, test case management, contest setup, moderation queues, sandbox status, and critical security checks."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AdminSystem />
      </div>
    </AppShell>
  );
}
