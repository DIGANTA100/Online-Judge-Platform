import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PlatformSidebar } from "@/components/platform/platform-sidebar";
import { DashboardTopBar } from "@/components/platform/dashboard-topbar";

export function AppShell({
  children,
  active
}: {
  children: ReactNode;
  active?: string;
}) {
  return (
    <main className="min-h-screen bg-ink-950 text-white">
      <PlatformSidebar active={active} requireLogin />
      {active === "Dashboard" && (
        <div className="flex justify-end px-4 pt-4 sm:px-6 lg:px-8">
          <DashboardTopBar />
        </div>
      )}
      <div>
        {children}
      </div>
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-white/[0.06] px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl">
        <div className="font-mono text-sm uppercase tracking-normal text-mint-300">{eyebrow}</div>
        <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">{description}</p>
      </div>
    </header>
  );
}

export function Surface({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("rounded-md border border-white/10 bg-white/[0.045] p-5", className)}>{children}</section>;
}

export function StatusPill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "warn" | "bad" }) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.06] text-white/62",
    good: "border-mint-300/20 bg-mint-300/10 text-mint-300",
    warn: "border-amberline-300/20 bg-amberline-300/10 text-amberline-300",
    bad: "border-coral-400/20 bg-coral-400/10 text-coral-300"
  };

  return <span className={cn("inline-flex rounded-md border px-2 py-1 text-xs", tones[tone])}>{children}</span>;
}
