import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { ProfileSystem } from "@/components/platform/profile-system";

export default function ProfilePage() {
  return (
    <AppShell active="Profile">
      <PageHeader
        eyebrow="User Workspace"
        title="Developer Profile"
        description="Manage your professional developer profile, track solved statistics, view contest ratings, and customize system settings."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <ProfileSystem />
      </div>
    </AppShell>
  );
}
