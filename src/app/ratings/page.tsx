import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { RatingSystem } from "@/components/platform/rating-system";

export default function RatingsPage() {
  return (
    <AppShell active="Rating System">
      <PageHeader
        eyebrow="Phase 10"
        title="Codeforces-Like Rating System"
        description="Rating changes, rank titles, expected rank calculation, performance estimation, volatility damping, and contest history modeling."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <RatingSystem />
      </div>
    </AppShell>
  );
}
