import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { ContestSystem } from "@/components/platform/contest-system";
import { UserOnlyGate } from "@/components/platform/user-only-gate";

export default function ContestsPage() {
  return (
    <AppShell active="Contest Engine">
      <PageHeader
        eyebrow="Phase 9"
        title="Contest Engine"
        description="Live, virtual, private, and team contests with registration, live rankings, penalty calculations, and scoreboard freezing."
      />
      <UserOnlyGate>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <ContestSystem />
        </div>
      </UserOnlyGate>
    </AppShell>
  );
}
