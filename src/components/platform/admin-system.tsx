"use client";

import {
  Ban,
  CheckCircle2,
  FileCode2,
  Flag,
  LockKeyhole,
  Plus,
  Save,
  Search,
  ShieldCheck,
  UserCheck,
  Users
} from "lucide-react";
import { Surface, StatusPill } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";

const adminMetrics = [
  { label: "Users", value: "312K", icon: Users },
  { label: "Pending reports", value: "7", icon: Flag },
  { label: "Draft problems", value: "18", icon: FileCode2 },
  { label: "Hidden tests", value: "642", icon: LockKeyhole }
];

const managedUsers = [
  { handle: "afd123", email: "afd123@gmail.com", role: "USER", status: "Active", solved: 428 },
  { handle: "bitwise_mira", email: "mira@example.com", role: "AUTHOR", status: "Active", solved: 912 },
  { handle: "spam_probe", email: "probe@example.com", role: "USER", status: "Flagged", solved: 3 },
  { handle: "graphsmith", email: "graph@example.com", role: "USER", status: "Active", solved: 611 }
];

const problemQueue = [
  { title: "Matrix Beacon", difficulty: "Medium", status: "Ready", tests: 38 },
  { title: "Tree Teleport", difficulty: "Hard", status: "Review", tests: 51 },
  { title: "Cache Race", difficulty: "Expert", status: "Draft", tests: 74 }
];

const moderationQueue = [
  { item: "Spoiler in Median Patrol discussion", type: "Discussion", severity: "Medium" },
  { item: "Suspicious submissions from spam_probe", type: "User", severity: "High" },
  { item: "Incorrect sample report on Graph Relay", type: "Problem", severity: "Low" }
];

export function AdminSystem() {
  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(118,247,209,0.12),rgba(255,255,255,0.045)_58%,rgba(255,118,118,0.08))] p-6 shadow-panel">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-mint-300/20 bg-mint-300/10 px-3 py-2 text-sm text-mint-300">
              <ShieldCheck className="h-4 w-4" />
              Admin Control Center
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Manage users, problems, moderation, and platform quality.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/62">
              Review flagged activity, publish problemset content, monitor reports,
              and keep the competitive environment clean and reliable.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button>
              <Plus className="h-4 w-4" />
              New Problem
            </Button>
            <Button variant="secondary">
              <UserCheck className="h-4 w-4" />
              Invite Admin
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        {adminMetrics.map((metric) => (
          <Surface key={metric.label}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-white/50">{metric.label}</div>
                <div className="mt-3 font-mono text-3xl font-semibold">{metric.value}</div>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-md bg-mint-300/10 text-mint-300">
                <metric.icon className="h-5 w-5" />
              </span>
            </div>
          </Surface>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">User management</h2>
              <p className="mt-2 text-white/54">Search users, update roles, review status, and handle moderation actions.</p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/34" />
              <input
                className="focus-ring h-11 w-full rounded-md border border-white/10 bg-ink-900 pl-10 pr-3 text-sm text-white placeholder:text-white/30"
                placeholder="Search users"
              />
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-md border border-white/10">
            {managedUsers.map((user) => (
              <div className="grid gap-4 border-b border-white/[0.06] bg-ink-900 p-4 last:border-b-0 lg:grid-cols-[1fr_120px_110px_150px] lg:items-center" key={user.email}>
                <div>
                  <div className="font-semibold">@{user.handle}</div>
                  <div className="mt-1 text-sm text-white/42">{user.email}</div>
                </div>
                <StatusPill>{user.role}</StatusPill>
                <StatusPill tone={user.status === "Flagged" ? "bad" : "good"}>{user.status}</StatusPill>
                <div className="flex gap-2 lg:justify-end">
                  <button className="focus-ring rounded-md border border-white/10 p-2 text-white/54 hover:bg-white/[0.06]" type="button" aria-label="Approve user">
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                  <button className="focus-ring rounded-md border border-coral-400/20 p-2 text-coral-300 hover:bg-coral-400/10" type="button" aria-label="Restrict user">
                    <Ban className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <h2 className="text-2xl font-semibold">Problem publisher</h2>
          <div className="mt-5 grid gap-3">
            <input className="focus-ring h-11 rounded-md border border-white/10 bg-ink-900 px-3 text-sm text-white placeholder:text-white/30" placeholder="Problem title" />
            <select className="focus-ring h-11 rounded-md border border-white/10 bg-ink-900 px-3 text-sm text-white">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
              <option>Expert</option>
            </select>
            <textarea className="focus-ring min-h-32 rounded-md border border-white/10 bg-ink-900 p-3 text-sm leading-6 text-white placeholder:text-white/30" placeholder="Problem statement" />
            <textarea className="focus-ring min-h-24 rounded-md border border-white/10 bg-ink-900 p-3 font-mono text-sm leading-6 text-white placeholder:text-white/30" placeholder="Sample input / output" />
            <Button>
              <Save className="h-4 w-4" />
              Save Problem
            </Button>
          </div>
        </Surface>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Surface>
          <h2 className="text-2xl font-semibold">Problem review queue</h2>
          <div className="mt-5 space-y-3">
            {problemQueue.map((problem) => (
              <div className="grid gap-4 rounded-md border border-white/10 bg-ink-900 p-4 md:grid-cols-[1fr_110px_100px_80px] md:items-center" key={problem.title}>
                <div className="font-semibold">{problem.title}</div>
                <StatusPill tone={problem.difficulty === "Medium" ? "warn" : "bad"}>{problem.difficulty}</StatusPill>
                <StatusPill tone={problem.status === "Ready" ? "good" : problem.status === "Review" ? "warn" : "neutral"}>{problem.status}</StatusPill>
                <div className="font-mono text-sm text-white/52">{problem.tests} tests</div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <h2 className="text-2xl font-semibold">Moderation queue</h2>
          <div className="mt-5 space-y-3">
            {moderationQueue.map((item) => (
              <div className="rounded-md border border-white/10 bg-ink-900 p-4" key={item.item}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold">{item.item}</div>
                    <div className="mt-1 text-sm text-white/42">{item.type}</div>
                  </div>
                  <StatusPill tone={item.severity === "High" ? "bad" : item.severity === "Medium" ? "warn" : "neutral"}>{item.severity}</StatusPill>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}
