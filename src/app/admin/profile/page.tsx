import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { AdminProfileSystem } from "@/components/platform/admin-profile-system";

export default function AdminProfilePage() {
  return (
    <AppShell active="Admin Profile">
      <PageHeader
        eyebrow="Admin profile"
        title="Administrator Identity"
        description="A separate admin account area for platform permissions, security status, and administrative activity."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AdminProfileSystem />
      </div>
    </AppShell>
  );
}
