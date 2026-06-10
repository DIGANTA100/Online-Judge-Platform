import {
  Activity,
  BadgeCheck,
  CalendarClock,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  Users
} from "lucide-react";
import { Surface, StatusPill } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";

const adminIdentity = {
  name: "Platform Admin",
  handle: "admin123",
  email: "admin123@gmail.com",
  role: "Administrator",
  accessLevel: "Full platform control",
  joined: "June 2026"
};

const accessScopes = [
  { label: "User moderation", detail: "Suspend accounts, review reports, and resolve disputes.", icon: Users },
  { label: "Problem publishing", detail: "Create statements, test data, editorials, and visibility rules.", icon: LockKeyhole },
  { label: "System review", detail: "Track audit activity, alerts, and operational health.", icon: Activity }
];

const auditTrail = [
  { action: "Reviewed flagged discussion", time: "Today, 11:42", tone: "warn" as const },
  { action: "Published Matrix Beacon test pack", time: "Yesterday, 20:10", tone: "good" as const },
  { action: "Updated user role for bitwise_mira", time: "June 8, 2026", tone: "neutral" as const }
];

export function AdminProfileSystem() {
  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(118,247,209,0.14),rgba(255,255,255,0.045)_54%,rgba(94,164,255,0.12))] p-6 shadow-panel">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-md border border-mint-300/25 bg-mint-300/10 text-mint-300">
              <ShieldCheck className="h-11 w-11" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill tone="good">Admin account</StatusPill>
                <StatusPill>{adminIdentity.accessLevel}</StatusPill>
              </div>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                {adminIdentity.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/56">
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-mint-300" />
                  @{adminIdentity.handle}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-mint-300" />
                  {adminIdentity.email}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-mint-300" />
                  Joined {adminIdentity.joined}
                </span>
              </div>
            </div>
          </div>
          <Button variant="secondary">
            <KeyRound className="h-4 w-4" />
            Security Settings
          </Button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Surface>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Admin permissions</h2>
              <p className="mt-2 text-white/54">
                This profile is separated from normal user progress, submissions, and ratings.
              </p>
            </div>
            <StatusPill tone="good">
              <BadgeCheck className="mr-1 h-3.5 w-3.5" />
              Verified
            </StatusPill>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {accessScopes.map((scope) => (
              <div className="rounded-md border border-white/10 bg-ink-900 p-4" key={scope.label}>
                <span className="grid h-11 w-11 place-items-center rounded-md bg-mint-300/10 text-mint-300">
                  <scope.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{scope.label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{scope.detail}</p>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Security</h2>
              <p className="mt-2 text-white/54">Admin-only session and account controls.</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-md bg-mint-300/10 text-mint-300">
              <KeyRound className="h-5 w-5" />
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-md border border-white/10 bg-ink-900 p-4">
              <div className="text-sm text-white/44">Role</div>
              <div className="mt-2 font-semibold">{adminIdentity.role}</div>
            </div>
            <div className="rounded-md border border-white/10 bg-ink-900 p-4">
              <div className="text-sm text-white/44">Recovery email</div>
              <div className="mt-2 font-semibold">{adminIdentity.email}</div>
            </div>
            <div className="rounded-md border border-white/10 bg-ink-900 p-4">
              <div className="text-sm text-white/44">Session policy</div>
              <div className="mt-2 font-semibold">Admin sessions require separate authentication</div>
            </div>
          </div>
        </Surface>
      </div>

      <Surface>
        <h2 className="text-2xl font-semibold">Recent admin activity</h2>
        <div className="mt-5 grid gap-3">
          {auditTrail.map((item) => (
            <div className="grid gap-3 rounded-md border border-white/10 bg-ink-900 p-4 md:grid-cols-[1fr_150px_90px] md:items-center" key={item.action}>
              <div className="font-semibold">{item.action}</div>
              <div className="text-sm text-white/44">{item.time}</div>
              <StatusPill tone={item.tone}>{item.tone === "good" ? "Done" : item.tone === "warn" ? "Review" : "Logged"}</StatusPill>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}
