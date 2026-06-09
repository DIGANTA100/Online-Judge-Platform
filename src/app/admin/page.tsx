import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { AdminSystem } from "@/components/platform/admin-system";

export default function AdminPage() {
  return (
    <AppShell active="Admin Studio">
      <PageHeader
        eyebrow="Admin"
        title="Platform Administration"
        description="Manage users, publish problems, review reports, and keep the online judge organized."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AdminSystem />
      </div>
    </AppShell>
  );
}
