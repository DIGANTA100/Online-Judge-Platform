import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, Database, Lightbulb, Target } from "lucide-react";
import { AppShell, StatusPill, Surface } from "@/components/platform/app-shell";
import { WorkspaceSystem } from "@/components/platform/workspace-system";
import { sampleProblems } from "@/lib/platform-data";

export function generateStaticParams() {
  return sampleProblems.map((problem) => ({ slug: problem.slug }));
}

export default async function ProblemDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = sampleProblems.find((item) => item.slug === slug);

  if (!problem) notFound();

  return (
    <AppShell active="Problemset">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <Link className="focus-ring mb-6 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-white/54 hover:bg-white/[0.06] hover:text-white" href="/problems">
          <ArrowLeft className="h-4 w-4" />
          Back to problemset
        </Link>

        <section className="rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(118,247,209,0.11),rgba(255,255,255,0.045)_58%,rgba(255,184,77,0.08))] p-6 shadow-panel">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill tone={difficultyTone(problem.difficulty)}>{problem.difficulty}</StatusPill>
                <span className="rounded-md border border-white/10 bg-white/[0.055] px-2 py-1 text-xs text-white/50">
                  {problem.source}
                </span>
              </div>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                {problem.title}
              </h1>
              <p className="mt-5 max-w-4xl text-lg leading-8 text-white/68">{problem.statement}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {problem.tags.map((tag) => (
                  <span className="rounded-md bg-white/[0.07] px-2 py-1 text-xs text-white/52" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid min-w-64 gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <Metric icon={Clock} label="Time" value={problem.timeLimit} />
              <Metric icon={Database} label="Memory" value={problem.memoryLimit} />
              <Metric icon={Target} label="Acceptance" value={problem.acceptance} />
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <Surface>
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <BookOpen className="h-5 w-5 text-mint-300" />
              Statement
            </h2>
            <div className="mt-5 space-y-5 text-white/64">
              <p className="leading-8">
                Read input from standard input and print the required answer to standard output.
                Your solution must satisfy the limits and handle all edge cases implied by the constraints.
              </p>
              <div>
                <h3 className="font-semibold text-white">Constraints</h3>
                <ul className="mt-3 grid gap-2">
                  {problem.constraints.map((constraint) => (
                    <li className="rounded-md border border-white/10 bg-ink-900 px-3 py-2 font-mono text-sm" key={constraint}>
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white">Examples</h3>
                <div className="mt-3 grid gap-4">
                  {problem.examples.map((example, index) => (
                    <div className="grid gap-4 md:grid-cols-2" key={`${example.input}-${index}`}>
                      <pre className="overflow-auto rounded-md border border-white/10 bg-ink-900 p-4 font-mono text-sm leading-6 text-white/72">
                        <span className="mb-2 block text-xs uppercase text-white/34">Input</span>
                        {example.input}
                      </pre>
                      <pre className="overflow-auto rounded-md border border-white/10 bg-ink-900 p-4 font-mono text-sm leading-6 text-white/72">
                        <span className="mb-2 block text-xs uppercase text-white/34">Output</span>
                        {example.output}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Surface>

          <Surface>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Lightbulb className="h-5 w-5 text-amberline-300" />
              Solve smarter
            </h2>
            <div className="mt-5 space-y-4">
              {[
                ["Think first", "Identify constraints, monotonicity, graph structure, or state transitions before coding."],
                ["Test samples", "Run the given examples in the editor before submitting hidden tests."],
                ["Watch limits", `${problem.timeLimit} and ${problem.memoryLimit} shape the intended complexity.`]
              ].map(([title, detail]) => (
                <div className="rounded-md border border-white/10 bg-ink-900 p-4" key={title}>
                  <div className="font-semibold">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/54">{detail}</p>
                </div>
              ))}
            </div>
          </Surface>
        </div>

        <section className="mt-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-sm uppercase tracking-normal text-mint-300">Code Workspace</div>
              <h2 className="mt-2 text-3xl font-semibold">Solve {problem.title}</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/48">
              Choose any supported language, write your solution, run custom input, and inspect output without leaving the problem page.
            </p>
          </div>
          <WorkspaceSystem />
        </section>
      </div>
    </AppShell>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-ink-950/64 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-normal text-white/38">
        <Icon className="h-4 w-4 text-mint-300" />
        {label}
      </div>
      <div className="mt-2 font-mono text-lg font-semibold">{value}</div>
    </div>
  );
}

function difficultyTone(difficulty: string) {
  if (difficulty === "Easy") return "good";
  if (difficulty === "Medium") return "warn";
  return "bad";
}
