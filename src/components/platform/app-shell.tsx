import Link from "next/link";
import type { ReactNode } from "react";
import { Code2, Home } from "lucide-react";
import { productModules } from "@/lib/platform-data";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/platform/logout-button";

export function AppShell({
  children,
  active
}: {
  children: ReactNode;
  active?: string;
}) {
  return (
    <main className="min-h-screen bg-ink-950 text-white">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/[0.06] bg-ink-950/90 p-4 backdrop-blur-xl lg:block">
        <Link className="focus-ring mb-6 flex items-center gap-3 rounded-md px-2 py-2" href="/">
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
          >
            <Home className="h-4 w-4" />
            Landing
          </Link>
          {productModules.filter((module) => module.title !== "Architecture").map((module) => (
            <Link
              className={cn(
                "focus-ring flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/62 transition hover:bg-white/[0.06] hover:text-white",
                active === module.title && "bg-white/[0.08] text-white"
              )}
              href={module.href}
              key={module.title}
            >
              <module.icon className="h-4 w-4" />
              {module.title}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <LogoutButton />
        </div>
      </div>
      <div className="lg:pl-72">
        <div className="border-b border-white/[0.06] bg-ink-950/82 px-4 py-3 backdrop-blur-xl lg:hidden">
          <Link className="flex items-center gap-3" href="/">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-premium-line text-ink-950">
              <Code2 className="h-5 w-5" />
            </span>
            <span className="font-semibold">NimbleJudge</span>
          </Link>
        </div>
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
