import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { ModuleGrid } from "@/components/platform/module-grid";

export default function PlatformPage() {
  return (
    <AppShell active="home">
      <PageHeader
        eyebrow="Full Build Map"
        title="Competitive Programming Platform"
        description="Every requested phase is represented in this same project as a production-style interface, API contract, or implementation blueprint."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <ModuleGrid />
      </div>
    </AppShell>
  );
}
