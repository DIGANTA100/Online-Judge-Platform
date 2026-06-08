import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { AnalyticsSystem } from "@/components/platform/analytics-system";

export default function DashboardPage() {
  return (
    <AppShell active="Analytics">
      <PageHeader
        eyebrow="Dashboard"
        title="Your Competitive Programming Command Center"
        description="Track practice, contests, ratings, submissions, strengths, and next actions from one professional workspace."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnalyticsSystem />
      </div>
    </AppShell>
  );
}
