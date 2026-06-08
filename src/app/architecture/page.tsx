import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { ArchitectureSystem } from "@/components/platform/architecture-system";

export default function ArchitecturePage() {
  return (
    <AppShell active="Architecture">
      <PageHeader
        eyebrow="Phases 0, 4, 6, 7, 10, 13"
        title="Architecture, Database, Security, Judge, and Rating Blueprint"
        description="Service boundaries, API contracts, PostgreSQL model, Redis queue flow, Docker sandbox rules, rating model, and deployment architecture."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <ArchitectureSystem />
      </div>
    </AppShell>
  );
}
