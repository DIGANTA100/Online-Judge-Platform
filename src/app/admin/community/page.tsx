// src/app/admin/community/page.tsx
import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { AdminCommunityCenter } from "@/components/platform/admin-community";

export default function AdminCommunityPage() {
  return (
    <AppShell active="Admin Studio">
      <PageHeader
        eyebrow="Admin · Community"
        title="Community Control Center"
        description="Monitor, moderate, and grow the coding community."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AdminCommunityCenter />
      </div>
    </AppShell>
  );
}