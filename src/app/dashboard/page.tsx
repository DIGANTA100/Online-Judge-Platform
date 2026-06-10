import { AppShell } from "@/components/platform/app-shell";
import { DashboardExperience } from "@/components/platform/dashboard-experience";

export default function DashboardPage() {
  return (
    <AppShell active="Dashboard">
      <DashboardExperience />
    </AppShell>
  );
}
