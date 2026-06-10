"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  Megaphone,
  Send,
  Trophy,
  UserRound,
  X,
  Zap
} from "lucide-react";
import { useDemoRole } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    icon: Trophy,
    iconColor: "text-[#ffb84d]",
    iconBg: "bg-[#ffb84d]/10",
    title: "Rating updated",
    detail: "Your rating increased by +38 after Nimble Round 127.",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    icon: CheckCircle2,
    iconColor: "text-mint-300",
    iconBg: "bg-mint-300/10",
    title: "Submission accepted",
    detail: "Median Patrol - C++20 - 84 ms. Accepted.",
    time: "4 hours ago",
    unread: true
  },
  {
    id: 3,
    icon: Zap,
    iconColor: "text-[#5ea4ff]",
    iconBg: "bg-[#5ea4ff]/10",
    title: "Contest starting soon",
    detail: "Nimble Round 128 begins in 30 minutes. Register now.",
    time: "30 minutes ago",
    unread: false
  }
];

const announcementDrafts = [
  { title: "Problemset maintenance", audience: "All users", status: "Draft" },
  { title: "New editorial release", audience: "Practice users", status: "Queued" }
];

export function DashboardTopBar() {
  const demoRole = useDemoRole();

  if (!demoRole) return null;

  return (
    <div className="relative flex items-center gap-3">
      {demoRole === "ADMIN" ? <AdminAnnouncementControl /> : <UserNotificationControl />}

      <Link
        id="dashboard-profile-link"
        href={demoRole === "ADMIN" ? "/admin/profile" : "/profile"}
        aria-label={demoRole === "ADMIN" ? "Go to admin profile" : "Go to your profile"}
        className="focus-ring group relative flex h-10 w-10 items-center justify-center rounded-full border border-mint-300/30 bg-mint-300/10 text-mint-300 transition hover:border-mint-300/60 hover:bg-mint-300/20 hover:shadow-glow"
      >
        {demoRole === "ADMIN" ? <UserRound className="h-5 w-5" /> : <span className="font-mono text-sm font-semibold tracking-wide">AD</span>}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-mint-400" />
      </Link>
    </div>
  );
}

function AdminAnnouncementControl() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  async function publishAnnouncement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setStatus("saving");
    await fetch("/api/v1/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, audience: "ALL_USERS" })
    });
    setStatus("saved");
    setTitle("");
    setBody("");
  }

  return (
    <div className="relative">
      <button
        id="dashboard-announcements-toggle"
        aria-label="Create platform announcement"
        onClick={() => setPanelOpen((prev) => !prev)}
        type="button"
        className={cn(
          "focus-ring relative grid h-10 w-10 place-items-center rounded-full border transition",
          panelOpen
            ? "border-mint-300/30 bg-mint-300/10 text-mint-300"
            : "border-white/10 bg-white/[0.05] text-white/70 hover:border-white/20 hover:bg-white/[0.09] hover:text-white"
        )}
      >
        <Megaphone className="h-5 w-5" />
      </button>

      {panelOpen && (
        <>
          <button
            aria-label="Close announcements"
            className="fixed inset-0 z-30"
            onClick={() => setPanelOpen(false)}
            type="button"
          />

          <div className="absolute right-0 top-12 z-40 w-80 overflow-hidden rounded-md border border-white/10 bg-ink-900 shadow-panel sm:w-96">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-mint-300" />
                <span className="text-sm font-semibold">Announcements</span>
              </div>
              <button
                aria-label="Close announcements panel"
                onClick={() => setPanelOpen(false)}
                type="button"
                className="grid h-6 w-6 place-items-center rounded text-white/40 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-3 p-4" onSubmit={publishAnnouncement}>
              <input
                className="focus-ring h-10 w-full rounded-md border border-white/10 bg-ink-950 px-3 text-sm text-white placeholder:text-white/30"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Announcement title"
                value={title}
              />
              <textarea
                className="focus-ring min-h-24 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm leading-6 text-white placeholder:text-white/30"
                onChange={(event) => setBody(event.target.value)}
                placeholder="Write the message users will see"
                value={body}
              />
              <button
                className="focus-ring inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-ink-950 transition hover:bg-mint-300"
                disabled={status === "saving"}
                type="submit"
              >
                <Send className="h-4 w-4" />
                {status === "saving" ? "Publishing..." : "Publish Announcement"}
              </button>
              {status === "saved" && (
                <p className="text-xs text-mint-300">Announcement saved to the admin publishing API.</p>
              )}
            </form>

            <div className="border-t border-white/[0.07] p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-normal text-white/42">Recent drafts</div>
              <div className="space-y-2">
                {announcementDrafts.map((draft) => (
                  <div className="rounded-md border border-white/10 bg-white/[0.035] p-3" key={draft.title}>
                    <div className="text-sm font-semibold">{draft.title}</div>
                    <div className="mt-1 flex items-center justify-between text-xs text-white/42">
                      <span>{draft.audience}</span>
                      <span>{draft.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function UserNotificationControl() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const unreadCount = notifications.filter(
    (n) => n.unread && !readIds.has(n.id)
  ).length;

  function markAllRead() {
    setReadIds(new Set(notifications.map((n) => n.id)));
  }

  return (
    <div className="relative">
      <button
        id="dashboard-notifications-toggle"
        aria-label="Toggle notifications"
        onClick={() => setPanelOpen((prev) => !prev)}
        type="button"
        className={cn(
          "focus-ring relative grid h-10 w-10 place-items-center rounded-full border transition",
          panelOpen
            ? "border-mint-300/30 bg-mint-300/10 text-mint-300"
            : "border-white/10 bg-white/[0.05] text-white/70 hover:border-white/20 hover:bg-white/[0.09] hover:text-white"
        )}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral-400 text-[9px] font-bold text-white shadow">
            {unreadCount}
          </span>
        )}
      </button>

      {panelOpen && (
        <>
          <button
            aria-label="Close notifications"
            className="fixed inset-0 z-30"
            onClick={() => setPanelOpen(false)}
            type="button"
          />

          <div className="absolute right-0 top-12 z-40 w-80 overflow-hidden rounded-md border border-white/10 bg-ink-900 shadow-panel sm:w-96">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-mint-300" />
                <span className="text-sm font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-coral-400/20 px-1.5 py-0.5 text-[10px] font-bold text-coral-300">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    type="button"
                    className="text-xs text-white/42 transition hover:text-mint-300"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  aria-label="Close notifications panel"
                  onClick={() => setPanelOpen(false)}
                  type="button"
                  className="grid h-6 w-6 place-items-center rounded text-white/40 transition hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <ul className="divide-y divide-white/[0.05]">
              {notifications.map((notif) => {
                const isRead = readIds.has(notif.id) || !notif.unread;
                return (
                  <li
                    key={notif.id}
                    className={cn(
                      "flex gap-3 px-4 py-3.5 transition hover:bg-white/[0.03]",
                      !isRead && "bg-mint-300/[0.025]"
                    )}
                  >
                    <span className={cn("mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full", notif.iconBg)}>
                      <notif.icon className={cn("h-4 w-4", notif.iconColor)} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-snug text-white">{notif.title}</p>
                        {!isRead && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-mint-400" />}
                      </div>
                      <p className="mt-0.5 text-xs leading-5 text-white/52">{notif.detail}</p>
                      <p className="mt-1 text-[10px] text-white/32">{notif.time}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-white/[0.07] px-4 py-2.5 text-center">
              <button
                type="button"
                className="text-xs text-white/40 transition hover:text-mint-300"
                onClick={() => setPanelOpen(false)}
              >
                View all notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
