import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { CommunitySystem } from "@/components/platform/community-system";

export default function PlatformPage() {
  return (
    <AppShell active="Community">
      <PageHeader
        eyebrow="Community"
        title="Discuss, Share & Learn Together"
        description="A place for all users to talk, discuss problems, and share ideas."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <CommunitySystem />
      </div>
    </AppShell>
  );
}
