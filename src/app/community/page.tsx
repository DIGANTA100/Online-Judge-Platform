import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { CommunitySystem } from "@/components/platform/community-system";

export default function CommunityPage() {
  return (
    <AppShell active="Community">
      <PageHeader
        eyebrow="Community"
        title="Talk With Coders, Share Ideas, Learn Faster"
        description="Join problem discussions, contest threads, editorials, announcements, and Q&A with the people practicing beside you."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <CommunitySystem />
      </div>
    </AppShell>
  );
}
