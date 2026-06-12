"use client";

import { useState } from "react";
import { AppShell } from "@/components/platform/app-shell";
import { CommunitySystem } from "@/components/platform/community-system";
import { AdminCommunityCenter } from "@/components/platform/admin-community";
import { useDemoRole } from "@/lib/demo-auth";
import { Shield } from "lucide-react";

export default function PlatformPage() {
  const role = useDemoRole();
  const [isAdminView, setIsAdminView] = useState(true);

  const showAdmin = role === "ADMIN" && isAdminView;

  return (
    <AppShell active="Community">
      <header className="border-b border-white/[0.06] px-4 py-8 sm:px-6 lg:px-8 bg-ink-950/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between max-w-5xl">
          <div>
            <div className="font-mono text-sm uppercase tracking-normal text-mint-300">
              {showAdmin ? "Admin · Community" : "Community"}
            </div>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              {showAdmin ? "Community Control Center" : "Discuss, Share & Learn Together"}
            </h1>
            <p className="mt-4 text-lg leading-8 text-white/60">
              {showAdmin 
                ? "Monitor, moderate, and grow the coding community."
                : "A place for all users to talk, discuss problems, and share ideas."
              }
            </p>
          </div>
          {role === "ADMIN" && (
            <div className="shrink-0 sm:mt-0 mt-2">
              <button
                type="button"
                onClick={() => setIsAdminView(!isAdminView)}
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 shadow-sm"
              >
                <Shield className="h-4 w-4" />
                {isAdminView ? "Switch to User View" : "Switch to Admin View"}
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {showAdmin ? <AdminCommunityCenter /> : <CommunitySystem />}
      </div>
    </AppShell>
  );
}

