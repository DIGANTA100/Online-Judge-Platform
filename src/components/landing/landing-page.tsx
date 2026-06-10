"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  GitBranch,
  Play,
  Sparkles,
  Terminal,
  Timer,
  Trophy,
  Zap
} from "lucide-react";
import {
  contestRows,
  features,
  navItems,
  problems,
  stats,
  testimonials
} from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { PlatformSidebar } from "@/components/platform/platform-sidebar";
import { useDemoRole, useDemoUser } from "@/lib/demo-auth";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

const heroMetrics = [
  { label: "Verdict", value: "Accepted", icon: CheckCircle2 },
  { label: "Runtime", value: "84 ms", icon: Timer },
  { label: "Queue", value: "12 workers", icon: Cpu }
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink-950 text-white">
      <PlatformSidebar active="home" requireLogin />
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Contests />
      <EditorPreview />
      <ProblemShowcase />
      <Testimonials />
      <Footer />
    </main>
  );
}

function Header() {
  const isLoggedIn = Boolean(useDemoUser());
  const isAdmin = useDemoRole() === "ADMIN";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-ink-950/78 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="focus-ring flex items-center gap-3 rounded-md" href="#">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-premium-line text-ink-950 shadow-glow">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="font-semibold">NimbleJudge</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              className="focus-ring rounded-md px-3 py-2 text-sm text-white/62 transition hover:bg-white/[0.06] hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button as="a" href="/dashboard" size="sm" variant="secondary">
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </Button>
              <Button as="a" href={isAdmin ? "/admin/profile" : "/problems"} size="sm">
                {isAdmin ? "Admin Profile" : "Problemset"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </>
          ) : (
            <>
              <Button as="a" href="https://github.com" target="_blank" rel="noreferrer" size="sm" variant="ghost">
                <GitBranch className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
              <Button as="a" href="/auth" size="sm">
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const isLoggedIn = Boolean(useDemoUser());
  const isAdmin = useDemoRole() === "ADMIN";

  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-radial-grid bg-[length:24px_24px] opacity-[0.18]" />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-mint-300/30 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div
          animate="visible"
          className="flex flex-col justify-center"
          initial="hidden"
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-mint-300/20 bg-mint-300/10 px-3 py-2 text-sm text-mint-300"
            variants={fadeUp}
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Codeforces intensity. VS Code comfort.
          </motion.div>
          <motion.h1
            className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl"
            variants={fadeUp}
          >
            NimbleJudge
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl"
            variants={fadeUp}
          >
            A premium competitive programming platform for contests, practice, analytics,
            and secure code execution, designed for serious builders and sharp learners.
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <Button as="a" href={isLoggedIn ? "/dashboard" : "/platform"} size="lg">
              {isLoggedIn ? (isAdmin ? "Open Admin Dashboard" : "Open Dashboard") : "Explore Platform"}
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Button>
            <Button as="a" href={isLoggedIn ? (isAdmin ? "/admin" : "/problems") : "#editor"} size="lg" variant="secondary">
              <Play className="h-5 w-5" aria-hidden />
              {isLoggedIn ? (isAdmin ? "Manage Platform" : "Solve Problems") : "View Editor"}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative min-h-[520px]"
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-md bg-premium-line opacity-20 blur-3xl" />
          <div className="glass-panel relative overflow-hidden rounded-md">
            <Image
              src="/assets/platform-workspace.png"
              alt="NimbleJudge product interface preview"
              width={1600}
              height={1000}
              className="h-auto w-full"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div className="rounded-md border border-white/12 bg-ink-950/72 p-3 backdrop-blur-md" key={metric.label}>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <metric.icon className="h-4 w-4 text-mint-300" aria-hidden />
                    {metric.label}
                  </div>
                  <div className="mt-1 font-mono text-lg text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.025]">
      <div className="mx-auto grid max-w-7xl gap-px px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div className="p-5" key={stat.label}>
            <div className="font-mono text-3xl font-semibold text-white">{stat.value}</div>
            <div className="mt-2 font-semibold text-white/82">{stat.label}</div>
            <div className="mt-1 text-sm text-white/50">{stat.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" id="features">
      <SectionHeader
        eyebrow="Platform"
        title="Everything a serious judge needs."
        description="Built around the hard parts: contest integrity, fast judging, a real editor, and learning loops that keep users improving."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <motion.article
            className="glass-panel rounded-md p-6"
            initial={{ opacity: 0, y: 18 }}
            key={feature.title}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-80px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-md bg-mint-300/12 text-mint-300">
              <feature.icon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 leading-7 text-white/58">{feature.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contests() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.025] py-24" id="contests">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <SectionHeader
          eyebrow="Contests"
          title="Codeforces-grade operations, calmer interface."
          description="Rated rounds, virtual practice, private contests, team events, live ranking, and scoreboard freeze are designed into the core architecture."
          align="left"
        />
        <div className="glass-panel overflow-hidden rounded-md">
          <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.6fr] gap-3 border-b border-white/10 px-5 py-3 text-xs uppercase tracking-normal text-white/42">
            <span>Contest</span>
            <span>Starts</span>
            <span>Users</span>
            <span>Status</span>
          </div>
          {contestRows.map((contest) => (
            <div
              className="grid grid-cols-[1fr_0.7fr_0.7fr_0.6fr] gap-3 border-b border-white/[0.06] px-5 py-5 last:border-b-0"
              key={contest.name}
            >
              <div>
                <div className="font-semibold">{contest.name}</div>
                <div className="mt-1 text-sm text-white/46">{contest.type}</div>
              </div>
              <div className="self-center text-sm text-white/64">{contest.starts}</div>
              <div className="self-center font-mono text-sm text-white/64">{contest.users}</div>
              <div className="self-center">
                <span className="rounded-md border border-mint-300/20 bg-mint-300/10 px-2 py-1 text-xs text-mint-300">
                  {contest.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorPreview() {
  const codeLines = [
    "#include <bits/stdc++.h>",
    "using namespace std;",
    "",
    "int solve(vector<int>& a, int k) {",
    "  int lo = 0, hi = 1e9;",
    "  while (lo < hi) {",
    "    int mid = (lo + hi + 1) / 2;",
    "    if (can(a, k, mid)) lo = mid;",
    "    else hi = mid - 1;",
    "  }",
    "  return lo;",
    "}"
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" id="editor">
      <SectionHeader
        eyebrow="Editor"
        title="A VS Code-quality workspace inside the judge."
        description="Monaco powers the reusable editor module. The landing preview mirrors the production experience: themes, shortcuts, auto-save, font controls, and language support."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="glass-panel overflow-hidden rounded-md">
          <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-coral-400" />
              <span className="h-3 w-3 rounded-full bg-amberline-400" />
              <span className="h-3 w-3 rounded-full bg-mint-400" />
              <span className="ml-3 font-mono text-xs text-white/46">median-patrol.cpp</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/46">
              <Zap className="h-4 w-4 text-amberline-300" aria-hidden />
              Auto saved
            </div>
          </div>
          <div className="grid min-h-[430px] grid-cols-[48px_1fr] bg-ink-900 font-mono text-sm leading-7">
            <div className="border-r border-white/[0.06] py-5 text-right text-white/28">
              {codeLines.map((_, index) => (
                <div className="px-3" key={index}>
                  {index + 1}
                </div>
              ))}
            </div>
            <pre className="m-0 overflow-auto p-5 text-white/78">
              {codeLines.map((line, index) => (
                <code className="block" key={`${line}-${index}`}>
                  {highlightLine(line)}
                </code>
              ))}
            </pre>
          </div>
        </div>
        <div className="grid gap-4">
          {[
            ["Languages", "C, C++, Java, Python, JavaScript"],
            ["Shortcuts", "Run, submit, save, reset, switch pane"],
            ["Themes", "Nimble Dark, High Contrast, Warm Terminal"],
            ["Console", "Output, stderr, custom input, verdict trace"]
          ].map(([title, body]) => (
            <div className="rounded-md border border-white/10 bg-white/[0.045] p-5" key={title}>
              <div className="flex items-center gap-2 font-semibold">
                <Terminal className="h-4 w-4 text-mint-300" aria-hidden />
                {title}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/56">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemShowcase() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.025] py-24" id="problems">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Problemset"
          title="Curated problems that teach patterns."
          description="Each problem connects statements, examples, tags, public tests, hidden tests, editorials, and analytics into one authoring model."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problems.map((problem) => (
            <article className="glass-panel rounded-md p-6" key={problem.title}>
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-amberline-300/12 text-amberline-300">
                  <problem.icon className="h-5 w-5" aria-hidden />
                </div>
                <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/56">
                  {problem.difficulty}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{problem.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {problem.tags.map((tag) => (
                  <span className="rounded-md bg-white/[0.06] px-2 py-1 text-xs text-white/52" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 font-mono text-sm text-white/48">{problem.solves} solves</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Community"
        title="Built for competitors, educators, and hiring teams."
        description="The product experience is intentionally calm, fast, and professional while preserving the adrenaline of live competition."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure className="rounded-md border border-white/10 bg-white/[0.045] p-6" key={testimonial.name}>
            <blockquote className="leading-7 text-white/70">&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <figcaption className="mt-6">
              <div className="font-semibold">{testimonial.name}</div>
              <div className="mt-1 text-sm text-white/46">{testimonial.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-white/48 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-premium-line text-ink-950">
            <Trophy className="h-4 w-4" aria-hidden />
          </span>
          <span>NimbleJudge architecture foundation</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <a className="focus-ring rounded-md px-2 py-1 hover:text-white" href="#features">
            Architecture
          </a>
          <a className="focus-ring rounded-md px-2 py-1 hover:text-white" href="#editor">
            Design System
          </a>
          <a className="focus-ring rounded-md px-2 py-1 hover:text-white" href="#features">
            Features
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <div className="mb-3 font-mono text-sm uppercase tracking-normal text-mint-300">{eyebrow}</div>
      <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-white/58">{description}</p>
    </div>
  );
}

function highlightLine(line: string) {
  if (!line) return "\u00a0";

  const keyword = /^(#include|using|int|return|while|if|else)/;
  const match = line.trim().match(keyword);

  if (!match) return line;

  const leading = line.match(/^\s*/)?.[0] ?? "";
  const rest = line.trim().slice(match[0].length);

  return (
    <>
      {leading}
      <span className="text-mint-300">{match[0]}</span>
      <span>{rest}</span>
    </>
  );
}
