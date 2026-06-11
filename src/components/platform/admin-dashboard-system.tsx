"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  Gauge,
  Megaphone,
  ServerCog,
  ShieldCheck,
  TrendingUp,
  Users
} from "lucide-react";
import { Surface, StatusPill } from "@/components/platform/app-shell";

const overviewMetrics = [
  { label: "Active users", value: "18,420", detail: "+9.8% in 24h", icon: Users, tone: "good" as const },
  { label: "Submissions today", value: "62,814", detail: "74.2% accepted", icon: Activity, tone: "good" as const },
  { label: "Average queue time", value: "1.8s", detail: "judge response", icon: Clock3, tone: "good" as const },
  { label: "Open reports", value: "7", detail: "3 high priority", icon: AlertTriangle, tone: "warn" as const }
];

const healthRows = [
  { service: "Judge workers", status: "Healthy", load: "72%", latency: "1.8s" },
  { service: "Submission API", status: "Healthy", load: "48%", latency: "96ms" },
  { service: "Community API", status: "Watch", load: "63%", latency: "142ms" },
  { service: "Auth service", status: "Healthy", load: "34%", latency: "61ms" }
];

const userSegments = [
  { label: "New users", value: 34, width: "34%" },
  { label: "Returning users", value: 52, width: "52%" },
  { label: "Flagged accounts", value: 4, width: "4%" },
  { label: "Inactive users", value: 10, width: "10%" }
];

const reviewQueue = [
  { item: "Flagged discussion replies", owner: "Moderation", count: "12", tone: "warn" as const },
  { item: "Problem feedback reports", owner: "Content review", count: "5", tone: "neutral" as const },
  { item: "Account restriction appeals", owner: "Trust team", count: "3", tone: "bad" as const }
];

const announcementStats = [
  { title: "Problemset maintenance", reach: "18.2K", engagement: "42%" },
  { title: "New editorial release", reach: "9.7K", engagement: "31%" },
  { title: "Policy reminder", reach: "22.4K", engagement: "57%" }
];

const activityTimeline = [
  { label: "High priority user report assigned", time: "12 minutes ago", tone: "warn" as const },
  { label: "Community thread restored after review", time: "48 minutes ago", tone: "good" as const },
  { label: "Judge queue returned to normal load", time: "1 hour ago", tone: "good" as const },
  { label: "Announcement draft scheduled", time: "2 hours ago", tone: "neutral" as const }
];

export function AdminDashboardSystem() {
  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(118,247,209,0.13),rgba(255,255,255,0.045)_52%,rgba(94,164,255,0.1))] p-6 shadow-panel">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-mint-300/20 bg-mint-300/10 px-3 py-2 text-sm text-mint-300">
              <ShieldCheck className="h-4 w-4" />
              Executive Overview
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Platform health, user behavior, and operational risk at a glance.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/62">
              Monitor live usage, judge stability, moderation pressure, account safety,
              and announcement performance without entering creation workflows.
            </p>
          </div>
          <div className="grid min-w-64 gap-3 rounded-md border border-white/10 bg-ink-950/60 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/48">Operational status</span>
              <StatusPill tone="good">Stable</StatusPill>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/48">Last refresh</span>
              <span className="font-mono text-sm text-white/70">Live</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <Surface key={metric.label}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-white/50">{metric.label}</div>
                <div className="mt-3 font-mono text-3xl font-semibold">{metric.value}</div>
                <div className="mt-2 text-xs text-white/38">{metric.detail}</div>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-md bg-mint-300/10 text-mint-300">
                <metric.icon className="h-5 w-5" />
              </span>
            </div>
          </Surface>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Surface>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Service health</h2>
              <p className="mt-2 text-white/54">Live operational state across user-facing systems.</p>
            </div>
            <ServerCog className="h-5 w-5 text-mint-300" />
          </div>
          <div className="mt-6 overflow-hidden rounded-md border border-white/10">
            {healthRows.map((row) => (
              <div className="grid gap-4 border-b border-white/[0.06] bg-ink-900 p-4 last:border-b-0 md:grid-cols-[1fr_100px_90px_90px] md:items-center" key={row.service}>
                <div className="font-semibold">{row.service}</div>
                <StatusPill tone={row.status === "Healthy" ? "good" : "warn"}>{row.status}</StatusPill>
                <div className="font-mono text-sm text-white/52">{row.load}</div>
                <div className="font-mono text-sm text-white/52">{row.latency}</div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">User composition</h2>
              <p className="mt-2 text-white/54">Current account mix and trust signals.</p>
            </div>
            <BarChart3 className="h-5 w-5 text-mint-300" />
          </div>
          <div className="mt-6 space-y-4">
            {userSegments.map((segment) => (
              <div key={segment.label}>
                <div className="flex justify-between text-sm">
                  <span>{segment.label}</span>
                  <span className="font-mono text-white/52">{segment.value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-mint-300" style={{ width: segment.width }} />
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Surface>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Review pressure</h2>
            <Gauge className="h-5 w-5 text-mint-300" />
          </div>
          <div className="mt-5 space-y-3">
            {reviewQueue.map((item) => (
              <div className="grid gap-3 rounded-md border border-white/10 bg-ink-900 p-4 md:grid-cols-[1fr_120px_70px] md:items-center" key={item.item}>
                <div>
                  <div className="font-semibold">{item.item}</div>
                  <div className="mt-1 text-sm text-white/42">{item.owner}</div>
                </div>
                <StatusPill tone={item.tone}>{item.tone === "bad" ? "Urgent" : item.tone === "warn" ? "Review" : "Queued"}</StatusPill>
                <div className="font-mono text-sm text-white/52">{item.count}</div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Announcement impact</h2>
              <p className="mt-2 text-white/54">Reach and engagement from recent platform messages.</p>
            </div>
            <Megaphone className="h-5 w-5 text-mint-300" />
          </div>
          <div className="mt-5 grid gap-3">
            {announcementStats.map((announcement) => (
              <div className="grid gap-4 rounded-md border border-white/10 bg-ink-900 p-4 md:grid-cols-[1fr_90px_90px] md:items-center" key={announcement.title}>
                <div className="font-semibold">{announcement.title}</div>
                <div>
                  <div className="text-xs text-white/34">Reach</div>
                  <div className="mt-1 font-mono text-sm text-white/62">{announcement.reach}</div>
                </div>
                <div>
                  <div className="text-xs text-white/34">Engage</div>
                  <div className="mt-1 font-mono text-sm text-white/62">{announcement.engagement}</div>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <Surface>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Operational timeline</h2>
          <TrendingUp className="h-5 w-5 text-mint-300" />
        </div>
        <div className="mt-5 grid gap-3">
          {activityTimeline.map((item) => (
            <div className="grid gap-3 rounded-md border border-white/10 bg-ink-900 p-4 md:grid-cols-[1fr_150px_90px] md:items-center" key={item.label}>
              <div className="flex items-center gap-3 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-mint-300" />
                {item.label}
              </div>
              <div className="text-sm text-white/44">{item.time}</div>
              <StatusPill tone={item.tone}>{item.tone === "good" ? "Resolved" : item.tone === "warn" ? "Watch" : "Logged"}</StatusPill>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}
