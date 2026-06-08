import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { WorkspaceSystem } from "@/components/platform/workspace-system";

export default function WorkspacePage() {
  return (
    <AppShell active="Judge Workspace">
      <PageHeader
        eyebrow="Phases 5, 6, 7"
        title="VS Code Quality Editor, Compiler, and Judge"
        description="Monaco editor experience with custom input, output console, verdict trace, Docker sandbox pipeline, and scalable judge worker flow."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <WorkspaceSystem />
      </div>
    </AppShell>
  );
}
