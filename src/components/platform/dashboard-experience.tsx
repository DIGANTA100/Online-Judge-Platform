"use client";

import { AnalyticsSystem } from "@/components/platform/analytics-system";
import { AdminDashboardSystem } from "@/components/platform/admin-dashboard-system";
import { useDemoRole, useDemoUser } from "@/lib/demo-auth";

function DashboardHeader({
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

export function DashboardExperience() {
  const demoUser = useDemoUser();
  const demoRole = useDemoRole();
  const isAdmin = demoRole === "ADMIN";

  if (!demoUser) {
    return (
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-40 animate-pulse rounded-md border border-white/10 bg-white/[0.04]" />
      </div>
    );
  }

  if (isAdmin) {
    return (
      <>
        <DashboardHeader
          eyebrow="Admin dashboard"
          title="Platform Operations Center"
          description="Monitor user activity, submissions, reports, announcements, operational health, and platform risk from one admin workspace."
        />
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <AdminDashboardSystem />
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader
        eyebrow="Dashboard"
        title="Your Competitive Programming Command Center"
        description="Track practice, contests, ratings, submissions, strengths, and next actions from one professional workspace."
      />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnalyticsSystem />
      </div>
    </>
  );
}
