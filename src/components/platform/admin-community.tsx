"use client";

// src/components/platform/admin-community.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Admin Community Control Center
// Premium dark SaaS dashboard — Linear / Vercel quality
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  Eye,
  Flag,
  MessageSquare,
  Megaphone,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  ShieldAlert,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  UserX,
  Zap,
  Pin,
  FileText,
  BookOpen
} from "lucide-react";
import {
  adminStats,
  adminThreads,
  announcements,
  communityAnalytics,
  communityUsers,
  moderationQueue,
  moderatorLeaderboard,
  type AdminThread,
  type Announcement,
  type CommunityUser,
  type ModerationReport,
  type Severity,
  type UserStatus
} from "@/lib/admin-community-data";
import { cn } from "@/lib/utils";

// ── Tiny sparkline (pure SVG, no deps) ───────────────────────────────────────
function Sparkline({
  data,
  color = "#34d399"
}: {
  data: number[];
  color?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M0,${h} L${pts
    .split(" ")
    .map((p) => p)
    .join(" L")} L${w},${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sg-${color.replace("#", "")})`} />
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── Bar chart ─────────────────────────────────────────────────────────────────
function BarChart({
  data,
  color = "#34d399",
  height = 80
}: {
  data: { day: string; value: number }[];
  color?: string;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((d) => (
        <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-sm transition-all"
            style={{
              height: `${(d.value / max) * (height - 18)}px`,
              backgroundColor: color,
              opacity: 0.75
            }}
          />
          <span className="text-[10px] text-white/30">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

// ── Severity badge ────────────────────────────────────────────────────────────
const severityConfig: Record<Severity, { label: string; className: string }> = {
  critical: { label: "Critical", className: "border-rose-500/30 bg-rose-500/10 text-rose-400" },
  high:     { label: "High",     className: "border-orange-400/30 bg-orange-400/10 text-orange-400" },
  medium:   { label: "Medium",   className: "border-amber-400/30 bg-amber-400/10 text-amber-300" },
  low:      { label: "Low",      className: "border-white/10 bg-white/[0.05] text-white/48" }
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const cfg = severityConfig[severity];
  return (
    <span className={cn("inline-flex rounded px-2 py-0.5 text-xs font-medium border", cfg.className)}>
      {cfg.label}
    </span>
  );
}

// ── Status badge for users / threads ─────────────────────────────────────────
const userStatusConfig: Record<UserStatus, { label: string; className: string }> = {
  active:    { label: "Active",    className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400" },
  warned:    { label: "Warned",    className: "border-amber-400/25 bg-amber-400/10 text-amber-300" },
  suspended: { label: "Suspended", className: "border-orange-400/25 bg-orange-400/10 text-orange-400" },
  banned:    { label: "Banned",    className: "border-rose-500/25 bg-rose-500/10 text-rose-400" }
};

function UserStatusBadge({ status }: { status: UserStatus }) {
  const cfg = userStatusConfig[status];
  return (
    <span className={cn("inline-flex rounded px-2 py-0.5 text-xs font-medium border", cfg.className)}>
      {cfg.label}
    </span>
  );
}

// ── Announcement status badge ─────────────────────────────────────────────────
const announcementStatusConfig = {
  published: { label: "Published", className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400" },
  scheduled: { label: "Scheduled", className: "border-sky-400/25 bg-sky-400/10 text-sky-400" },
  draft:     { label: "Draft",     className: "border-white/10 bg-white/[0.05] text-white/48" }
};

function AnnouncementStatusBadge({ status }: { status: "published" | "scheduled" | "draft" }) {
  const cfg = announcementStatusConfig[status];
  return (
    <span className={cn("inline-flex rounded px-2 py-0.5 text-xs font-medium border", cfg.className)}>
      {cfg.label}
    </span>
  );
}

// ── Glassmorphism card ────────────────────────────────────────────────────────
function GlassCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.07] bg-white/[0.035] p-5 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  accent = "emerald"
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  accent?: "emerald" | "amber" | "rose" | "sky";
}) {
  const accentMap = {
    emerald: "text-emerald-400",
    amber:   "text-amber-400",
    rose:    "text-rose-400",
    sky:     "text-sky-400"
  };
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-md border border-white/[0.07] bg-white/[0.04] p-2">
        <Icon className={cn("h-4 w-4", accentMap[accent])} />
      </div>
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Action button ─────────────────────────────────────────────────────────────
function ActionBtn({
  children,
  variant = "ghost",
  onClick,
  className
}: {
  children: React.ReactNode;
  variant?: "ghost" | "danger" | "warn" | "emerald" | "primary";
  onClick?: () => void;
  className?: string;
}) {
  const variants = {
    ghost:   "border-white/10 bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]",
    danger:  "border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20",
    warn:    "border-amber-400/20 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20",
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
    primary: "border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

// ── Tab bar ───────────────────────────────────────────────────────────────────
function TabBar({
  tabs,
  active,
  onChange
}: {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg border border-white/[0.07] bg-white/[0.03] p-1">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            active === t
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
              : "text-white/40 hover:text-white/70"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export function AdminCommunityCenter() {
  // ── local UI state ──────────────────────────────────────────────────────────
  const [contentTab, setContentTab] = useState("All Threads");
  const [userQuery, setUserQuery]   = useState("");
  const [showAnnounceForm, setShowAnnounceForm] = useState(false);
  const [newTitle, setNewTitle]     = useState("");
  const [newBody, setNewBody]       = useState("");
  const [reportActions, setReportActions] = useState<Record<string, string>>({});
  const [userActions, setUserActions]     = useState<Record<string, UserStatus>>({});

  const contentTabs = ["All Threads", "Flagged", "Pinned", "Editorials", "Announcements", "Deleted"];

  const filteredUsers = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    if (!q) return communityUsers;
    return communityUsers.filter(
      (u) => u.handle.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [userQuery]);

  const filteredThreads = useMemo(() => {
    if (contentTab === "All Threads") return adminThreads;
    const map: Record<string, string> = {
      Flagged: "flagged", Pinned: "pinned", Deleted: "deleted", Editorials: "active", Announcements: "active"
    };
    const status = map[contentTab];
    if (!status) return adminThreads;
    return adminThreads.filter((t) => {
      if (contentTab === "Editorials") return t.topic === "Editorial";
      if (contentTab === "Announcements") return t.topic === "Announcement";
      return t.status === status;
    });
  }, [contentTab]);

  function handleReportAction(reportId: string, action: string) {
    setReportActions((prev) => ({ ...prev, [reportId]: action }));
    // API call: PATCH /api/v1/admin/community/reports/{reportId} { action }
  }

  function handleUserAction(userId: string, action: string) {
    const statusMap: Record<string, UserStatus> = {
      warn: "warned", suspend: "suspended", ban: "banned", activate: "active"
    };
    if (action in statusMap) {
      setUserActions((prev) => ({ ...prev, [userId]: statusMap[action] }));
    }
    // API call: PATCH /api/v1/admin/community/users/{userId} { action }
  }

  return (
    <div className="grid gap-7 pb-16">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between rounded-xl border border-white/[0.06] bg-[linear-gradient(135deg,rgba(52,211,153,0.08),rgba(255,255,255,0.025)_55%,rgba(56,189,248,0.06))] p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400 mb-4">
            <Shield className="h-3.5 w-3.5" />
            Admin Access
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Community Control Center
          </h1>
          <p className="mt-2 text-sm text-white/44">
            Monitor, moderate, and grow the coding community.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowAnnounceForm(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/25"
          >
            <Plus className="h-4 w-4" />
            Create Announcement
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/60 transition hover:text-white hover:bg-white/[0.08]"
          >
            <BarChart3 className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* ── Analytics Overview ────────────────────────────────────────────── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminStats.map((stat, i) => {
          const sparkData = communityAnalytics.dau.map((d) => d.value + i * 120);
          const isUp = stat.trend >= 0;
          const isAlert = stat.label === "Pending Reports" || stat.label === "Flagged Content";
          return (
            <GlassCard key={stat.label} className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="rounded-md border border-white/[0.07] bg-white/[0.04] p-2">
                  {stat.label === "Total Threads"      && <MessageSquare className="h-4 w-4 text-emerald-400" />}
                  {stat.label === "Total Replies"      && <MessageSquare className="h-4 w-4 text-sky-400" />}
                  {stat.label === "Active Users Today" && <Users className="h-4 w-4 text-violet-400" />}
                  {stat.label === "Solved Questions"   && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                  {stat.label === "Pending Reports"    && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                  {stat.label === "Flagged Content"    && <Flag className="h-4 w-4 text-rose-400" />}
                </div>
                <Sparkline
                  data={sparkData.map((v) => v % 3000 + 500)}
                  color={isAlert ? (isUp ? "#f87171" : "#34d399") : "#34d399"}
                />
              </div>
              <div>
                <div className="font-mono text-3xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-white/40">{stat.label}</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-xs font-medium",
                      isUp ? (isAlert ? "text-rose-400" : "text-emerald-400") : "text-emerald-400"
                    )}
                  >
                    {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(stat.trend)}% this week
                  </span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </section>

      {/* ── Community Health Charts ───────────────────────────────────────── */}
      <section>
        <div className="mb-4">
          <SectionHeading icon={BarChart3} title="Community Health" subtitle="7-day engagement metrics" accent="emerald" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Daily Active Users", data: communityAnalytics.dau, color: "#34d399" },
            { title: "Thread Growth",      data: communityAnalytics.threadGrowth, color: "#60a5fa" },
            { title: "Reply Activity",     data: communityAnalytics.replyActivity, color: "#a78bfa" },
            { title: "Engagement Rate %",  data: communityAnalytics.engagementRate, color: "#f59e0b" }
          ].map((chart) => (
            <GlassCard key={chart.title}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-white/50">{chart.title}</span>
                <span className="font-mono text-lg font-semibold text-white">
                  {chart.data[chart.data.length - 1].value.toLocaleString()}
                </span>
              </div>
              <BarChart data={chart.data} color={chart.color} height={80} />
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── Moderation Queue ──────────────────────────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <SectionHeading icon={ShieldAlert} title="Moderation Queue" subtitle={`${moderationQueue.filter(r => r.status === "pending").length} items pending review`} accent="rose" />
          <span className="inline-flex items-center gap-1.5 rounded-md border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs text-rose-400">
            <AlertTriangle className="h-3 w-3" />
            {moderationQueue.filter((r) => r.severity === "critical" && r.status === "pending").length} critical
          </span>
        </div>
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Report Type", "Reported Content", "Reported By", "Time", "Severity", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-white/36 first:pl-5 last:pr-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {moderationQueue.map((report) => {
                  const acted = reportActions[report.id];
                  const isDone = acted || report.status !== "pending";
                  return (
                    <tr
                      key={report.id}
                      className={cn(
                        "border-b border-white/[0.04] transition last:border-b-0",
                        isDone ? "opacity-40" : "hover:bg-white/[0.025]"
                      )}
                    >
                      <td className="px-4 py-3.5 pl-5">
                        <span className="font-medium text-white/80">{report.reportType}</span>
                      </td>
                      <td className="max-w-xs px-4 py-3.5">
                        <span className="block truncate text-white/52">{report.content}</span>
                        <span className="text-[11px] text-white/28 mt-0.5">by @{report.targetUser}</span>
                      </td>
                      <td className="px-4 py-3.5 text-white/56">@{report.reportedBy}</td>
                      <td className="px-4 py-3.5 text-white/40 whitespace-nowrap">{report.time}</td>
                      <td className="px-4 py-3.5">
                        <SeverityBadge severity={report.severity} />
                      </td>
                      <td className="px-4 py-3.5 pr-5">
                        {isDone ? (
                          <span className="text-xs text-white/30 italic">{acted ?? report.status}</span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            <ActionBtn variant="emerald" onClick={() => handleReportAction(report.id, "approved")}>
                              <CheckCircle2 className="h-3 w-3" /> Approve
                            </ActionBtn>
                            <ActionBtn variant="danger" onClick={() => handleReportAction(report.id, "removed")}>
                              <Trash2 className="h-3 w-3" /> Remove
                            </ActionBtn>
                            <ActionBtn variant="warn" onClick={() => handleReportAction(report.id, "warned")}>
                              <Bell className="h-3 w-3" /> Warn
                            </ActionBtn>
                            <ActionBtn variant="ghost" onClick={() => handleReportAction(report.id, "suspended")}>
                              <UserX className="h-3 w-3" /> Suspend
                            </ActionBtn>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      {/* ── User Management ───────────────────────────────────────────────── */}
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading icon={Users} title="User Management" subtitle="Search, review and act on community members" accent="sky" />
          <div className="relative max-w-60">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/28" />
            <input
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Search users…"
              className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-9 pr-3 text-xs text-white placeholder:text-white/28 outline-none focus:border-emerald-500/40"
            />
          </div>
        </div>
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["User", "Reputation", "Threads", "Comments", "Reports", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-white/36 first:pl-5 last:pr-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const effectiveStatus = userActions[user.id] ?? user.status;
                  return (
                    <tr key={user.id} className="border-b border-white/[0.04] transition last:border-b-0 hover:bg-white/[0.025]">
                      <td className="px-4 py-3.5 pl-5">
                        <div>
                          <div className="font-medium text-white">@{user.handle}</div>
                          <div className="text-[11px] text-white/30">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-emerald-400">{user.reputation.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-white/60">{user.threads}</td>
                      <td className="px-4 py-3.5 text-white/60">{user.comments}</td>
                      <td className="px-4 py-3.5">
                        <span className={cn("font-medium", user.reports > 0 ? "text-rose-400" : "text-white/40")}>
                          {user.reports}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <UserStatusBadge status={effectiveStatus} />
                      </td>
                      <td className="px-4 py-3.5 pr-5">
                        <div className="flex flex-wrap gap-1.5">
                          <ActionBtn variant="ghost">
                            <Eye className="h-3 w-3" /> View
                          </ActionBtn>
                          {effectiveStatus === "active" && (
                            <>
                              <ActionBtn variant="warn" onClick={() => handleUserAction(user.id, "warn")}>Warn</ActionBtn>
                              <ActionBtn variant="ghost" onClick={() => handleUserAction(user.id, "suspend")}>Suspend</ActionBtn>
                            </>
                          )}
                          {(effectiveStatus === "warned" || effectiveStatus === "suspended") && (
                            <>
                              <ActionBtn variant="emerald" onClick={() => handleUserAction(user.id, "activate")}>Restore</ActionBtn>
                              <ActionBtn variant="danger" onClick={() => handleUserAction(user.id, "ban")}>Ban</ActionBtn>
                            </>
                          )}
                          {effectiveStatus === "banned" && (
                            <ActionBtn variant="emerald" onClick={() => handleUserAction(user.id, "activate")}>Unban</ActionBtn>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-xs text-white/30">
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      {/* ── Content Management ────────────────────────────────────────────── */}
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading icon={FileText} title="Content Management" subtitle="Review and manage all community threads" accent="amber" />
          <TabBar tabs={contentTabs} active={contentTab} onChange={setContentTab} />
        </div>
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Thread", "Author", "Topic", "Replies", "Views", "Votes", "Status", "Reports", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-white/36 first:pl-5 last:pr-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredThreads.map((thread) => (
                  <tr key={thread.id} className="border-b border-white/[0.04] transition last:border-b-0 hover:bg-white/[0.025]">
                    <td className="max-w-xs px-4 py-3.5 pl-5">
                      <span className="block truncate font-medium text-white/80">{thread.title}</span>
                      <span className="text-[11px] text-white/30">{thread.createdAt}</span>
                    </td>
                    <td className="px-4 py-3.5 text-white/56">@{thread.author}</td>
                    <td className="px-4 py-3.5 text-white/40">{thread.topic}</td>
                    <td className="px-4 py-3.5 font-mono text-white/60">{thread.replies}</td>
                    <td className="px-4 py-3.5 font-mono text-white/60">{thread.views.toLocaleString()}</td>
                    <td className={cn("px-4 py-3.5 font-mono", thread.votes >= 0 ? "text-emerald-400" : "text-rose-400")}>
                      {thread.votes >= 0 ? "+" : ""}{thread.votes}
                    </td>
                    <td className="px-4 py-3.5">
                      {thread.status === "flagged" && (
                        <span className="inline-flex rounded px-2 py-0.5 text-xs border border-rose-500/25 bg-rose-500/10 text-rose-400">Flagged</span>
                      )}
                      {thread.status === "pinned" && (
                        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs border border-sky-400/25 bg-sky-400/10 text-sky-400">
                          <Pin className="h-2.5 w-2.5" /> Pinned
                        </span>
                      )}
                      {thread.status === "deleted" && (
                        <span className="inline-flex rounded px-2 py-0.5 text-xs border border-white/10 bg-white/[0.04] text-white/36">Deleted</span>
                      )}
                      {thread.status === "active" && (
                        <span className="inline-flex rounded px-2 py-0.5 text-xs border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">Active</span>
                      )}
                    </td>
                    <td className={cn("px-4 py-3.5 font-mono text-xs", thread.reports > 0 ? "text-rose-400" : "text-white/28")}>
                      {thread.reports > 0 ? `⚑ ${thread.reports}` : "—"}
                    </td>
                    <td className="px-4 py-3.5 pr-5">
                      <div className="flex gap-1.5">
                        <ActionBtn variant="ghost"><Eye className="h-3 w-3" /></ActionBtn>
                        {thread.status !== "pinned" && (
                          <ActionBtn variant="ghost"><Pin className="h-3 w-3" /></ActionBtn>
                        )}
                        {thread.status !== "deleted" && (
                          <ActionBtn variant="danger"><Trash2 className="h-3 w-3" /></ActionBtn>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredThreads.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-xs text-white/30">
                      No threads in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      {/* ── Bottom row: Announcements + Moderator Leaderboard ─────────────── */}
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">

        {/* Announcements Management */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <SectionHeading icon={Megaphone} title="Announcements" subtitle="Manage published, scheduled and draft posts" accent="amber" />
            <ActionBtn variant="primary" onClick={() => setShowAnnounceForm((v) => !v)}>
              <Plus className="h-3.5 w-3.5" />
              {showAnnounceForm ? "Cancel" : "Create"}
            </ActionBtn>
          </div>

          {showAnnounceForm && (
            <GlassCard className="mb-4">
              <h3 className="mb-3 text-sm font-medium text-white">New Announcement</h3>
              <div className="grid gap-2.5">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Title"
                  className="h-10 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/28 outline-none focus:border-emerald-500/40"
                />
                <textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Body text…"
                  rows={3}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-white placeholder:text-white/28 outline-none focus:border-emerald-500/40 resize-none"
                />
                <div className="flex gap-2">
                  <ActionBtn variant="primary" onClick={() => { setShowAnnounceForm(false); setNewTitle(""); setNewBody(""); }}>
                    Publish
                  </ActionBtn>
                  <ActionBtn variant="ghost">Save as Draft</ActionBtn>
                  <ActionBtn variant="ghost">Schedule</ActionBtn>
                </div>
              </div>
            </GlassCard>
          )}

          <div className="grid gap-3">
            {announcements.map((item) => (
              <GlassCard key={item.id} className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <AnnouncementStatusBadge status={item.status} />
                    {item.status === "scheduled" && (
                      <span className="text-[11px] text-white/36">{item.publishAt}</span>
                    )}
                  </div>
                  <div className="font-medium text-white/80 text-sm truncate">{item.title}</div>
                  <div className="mt-1 text-xs text-white/36 line-clamp-1">{item.body}</div>
                  <div className="mt-2 flex gap-3 text-[11px] text-white/28">
                    <span>by @{item.author}</span>
                    <span>{item.createdAt}</span>
                    {item.views > 0 && <span>{item.views.toLocaleString()} views</span>}
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <ActionBtn variant="ghost"><Eye className="h-3 w-3" /></ActionBtn>
                  <ActionBtn variant="danger"><Trash2 className="h-3 w-3" /></ActionBtn>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Moderator Activity Leaderboard */}
        <section>
          <div className="mb-4">
            <SectionHeading icon={Star} title="Moderator Activity" subtitle="Actions this week" accent="emerald" />
          </div>
          <GlassCard className="p-0 overflow-hidden">
            <div className="divide-y divide-white/[0.05]">
              {moderatorLeaderboard.map((mod, i) => (
                <div key={mod.moderator} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-5 text-center font-mono text-xs text-white/28">
                    {i + 1 === 1 ? "🥇" : i + 1 === 2 ? "🥈" : i + 1 === 3 ? "🥉" : `${i + 1}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm">@{mod.moderator}</div>
                    <div className="mt-1 flex gap-3 text-[11px] text-white/36">
                      <span className="text-rose-400">{mod.removed} removed</span>
                      <span className="text-amber-400">{mod.warned} warned</span>
                      <span className="text-orange-400">{mod.suspended} suspended</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-semibold text-emerald-400">{mod.actionsWeek}</div>
                    <div className="text-[11px] text-white/28">{mod.actionsToday} today</div>
                  </div>
                  <div className="w-8 text-right">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500/20 overflow-hidden"
                      style={{ width: "32px" }}
                    >
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${mod.rating}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick stats under leaderboard */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "Actions today", value: moderatorLeaderboard.reduce((a, m) => a + m.actionsToday, 0).toString(), color: "text-emerald-400" },
              { label: "Actions this week", value: moderatorLeaderboard.reduce((a, m) => a + m.actionsWeek, 0).toString(), color: "text-sky-400" },
              { label: "Total removed", value: moderatorLeaderboard.reduce((a, m) => a + m.removed, 0).toString(), color: "text-rose-400" },
              { label: "Total warned", value: moderatorLeaderboard.reduce((a, m) => a + m.warned, 0).toString(), color: "text-amber-400" }
            ].map((s) => (
              <GlassCard key={s.label} className="py-3">
                <div className={cn("font-mono text-xl font-semibold", s.color)}>{s.value}</div>
                <div className="mt-0.5 text-[11px] text-white/36">{s.label}</div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}