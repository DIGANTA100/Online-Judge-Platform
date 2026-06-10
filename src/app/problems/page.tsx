import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { ProblemSystem } from "@/components/platform/problem-system";
import { UserOnlyGate } from "@/components/platform/user-only-gate";

export default function ProblemsPage() {
  return (
    <AppShell active="Problemset">
      <PageHeader
        eyebrow="Problemset"
        title="Train With Problems That Actually Move You Forward"
        description="Explore curated challenges, filter by topic and difficulty, open a problem, and solve it in a full coding workspace."
      />
      <UserOnlyGate>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <ProblemSystem />
        </div>
      </UserOnlyGate>
    </AppShell>
  );
}
