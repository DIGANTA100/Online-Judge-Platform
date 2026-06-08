"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCircle2, Trophy, X, Zap } from "lucide-react";
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
    detail: "Median Patrol — C++20 — 84 ms. Accepted.",
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

export function DashboardTopBar() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const unreadCount = notifications.filter(
    (n) => n.unread && !readIds.has(n.id)
  ).length;

  function markAllRead() {
    setReadIds(new Set(notifications.map((n) => n.id)));
  }

  return (
    <div className="relative flex items-center gap-3">
      {/* Bell icon */}
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

        {/* Notification dropdown panel */}
        {panelOpen && (
          <>
            {/* Backdrop */}
            <button
              aria-label="Close notifications"
              className="fixed inset-0 z-30"
              onClick={() => setPanelOpen(false)}
              type="button"
            />

            <div className="absolute right-0 top-12 z-40 w-80 overflow-hidden rounded-md border border-white/10 bg-ink-900 shadow-panel sm:w-96">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-mint-300" />
                  <span className="font-semibold text-sm">Notifications</span>
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

              {/* Notification list */}
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
                      <span
                        className={cn(
                          "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full",
                          notif.iconBg
                        )}
                      >
                        <notif.icon className={cn("h-4 w-4", notif.iconColor)} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-snug text-white">
                            {notif.title}
                          </p>
                          {!isRead && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-mint-400" />
                          )}
                        </div>
                        <p className="mt-0.5 text-xs leading-5 text-white/52">
                          {notif.detail}
                        </p>
                        <p className="mt-1 text-[10px] text-white/32">{notif.time}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Panel footer */}
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

      {/* Profile avatar button */}
      <Link
        id="dashboard-profile-link"
        href="/profile"
        aria-label="Go to your profile"
        className="focus-ring group relative flex h-10 w-10 items-center justify-center rounded-full border border-mint-300/30 bg-mint-300/10 text-mint-300 transition hover:border-mint-300/60 hover:bg-mint-300/20 hover:shadow-glow"
      >
        <span className="font-mono text-sm font-semibold tracking-wide">AD</span>
        {/* Online indicator */}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-mint-400" />
      </Link>
    </div>
  );
}
