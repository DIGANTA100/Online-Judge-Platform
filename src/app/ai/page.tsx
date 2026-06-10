import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { AiSystem } from "@/components/platform/ai-system";
import { UserOnlyGate } from "@/components/platform/user-only-gate";

export default function AiPage() {
  return (
    <AppShell active="AI Learning">
      <PageHeader
        eyebrow="Phase 12"
        title="AI-Powered Learning Features"
        description="Hint generation, complexity analysis, code review, learning recommendations, and debug assistant workflows."
      />
      <UserOnlyGate>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <AiSystem />
        </div>
      </UserOnlyGate>
    </AppShell>
  );
}
