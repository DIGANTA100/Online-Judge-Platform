"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, Home, Menu, X } from "lucide-react";
import { productModules } from "@/lib/platform-data";
import { useDemoRole, useDemoUser } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/platform/logout-button";

const hiddenSidebarItems = new Set([
  "Architecture",
  "Contest Engine",
  "Judge Workspace",
  "Rating System"
]);

const adminHiddenSidebarItems = new Set(["Problemset", "AI Learning"]);

export function PlatformSidebar({
  active,
  requireLogin = false
}: {
  active?: string;
  requireLogin?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const demoUser = useDemoUser();
  const demoRole = useDemoRole();
  const isLoggedIn = !requireLogin || Boolean(demoUser);

  if (!isLoggedIn) return null;

  const visibleModules = productModules.filter((module) => {
    if (hiddenSidebarItems.has(module.title)) return false;
    if (demoRole === "ADMIN" && adminHiddenSidebarItems.has(module.title)) return false;
    if (module.title === "Admin Studio") return demoRole === "ADMIN";
    return true;
  });

  return (
    <>
      <button
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="focus-ring fixed left-4 top-4 z-[70] grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-ink-950/88 text-white shadow-panel backdrop-blur-xl transition hover:bg-white/[0.08]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <button
          aria-label="Close navigation backdrop"
          className="fixed inset-0 z-[55] bg-black/45 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          type="button"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[60] flex w-72 flex-col border-r border-white/[0.08] bg-ink-950/96 p-4 shadow-panel backdrop-blur-xl transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Link className="focus-ring mb-6 ml-12 flex items-center gap-3 rounded-md px-2 py-2" href="/" onClick={() => setIsOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-premium-line text-ink-950">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="font-semibold">NimbleJudge</span>
        </Link>

        <nav className="space-y-1" aria-label="Platform modules">
          <Link
            className={cn(
              "focus-ring flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/62 transition hover:bg-white/[0.06] hover:text-white",
              active === "home" && "bg-white/[0.08] text-white"
            )}
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-4 w-4" />
            Landing
          </Link>
          {visibleModules.map((module) => {
            const isAdminProfile = demoRole === "ADMIN" && module.title === "Profile";
            const title = isAdminProfile ? "Admin Profile" : module.title;
            const href = isAdminProfile ? "/admin/profile" : module.href;

            return (
              <Link
                className={cn(
                  "focus-ring flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/62 transition hover:bg-white/[0.06] hover:text-white",
                  active === title && "bg-white/[0.08] text-white"
                )}
                href={href}
                key={`${module.title}-${title}`}
                onClick={() => setIsOpen(false)}
              >
                <module.icon className="h-4 w-4" />
                {title}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
