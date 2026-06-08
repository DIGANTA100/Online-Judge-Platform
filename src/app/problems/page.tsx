import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { ProblemSystem } from "@/components/platform/problem-system";

export default function ProblemsPage() {
  return (
    <AppShell active="Problemset">
      <PageHeader
        eyebrow="Problemset"
        title="Train With Problems That Actually Move You Forward"
        description="Explore curated challenges, filter by topic and difficulty, open a problem, and solve it in a full coding workspace."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <ProblemSystem />
      </div>
    </AppShell>
  );
}
