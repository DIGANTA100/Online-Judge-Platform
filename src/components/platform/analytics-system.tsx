import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Code2,
  Flame,
  Gauge,
  Medal,
  Target,
  Trophy,
  Zap
} from "lucide-react";
import { analytics, contests, sampleProblems, submissions } from "@/lib/platform-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";

const metricCards = [
  { label: "Problems solved", value: analytics.solved, caption: "+18 this month", icon: CheckCircle2 },
  { label: "Current rating", value: analytics.rating, caption: "Expert division", icon: Medal },
  { label: "Practice streak", value: `${analytics.streak}d`, caption: "Keep it alive", icon: Flame },
  { label: "Accuracy", value: analytics.accuracy, caption: "Last 90 submissions", icon: Gauge }
];

const practicePlan = [
  { title: "Binary search on answer", count: "8 problems", progress: 72 },
  { title: "Graph shortest paths", count: "6 problems", progress: 46 },
  { title: "Dynamic programming basics", count: "10 problems", progress: 58 }
];

const contestHistory = [
  { name: "Nimble Round 127", rank: 84, solved: 5, delta: "+42" },
  { name: "Array Sprint", rank: 21, solved: 4, delta: "+31" },
  { name: "Graph Practice Cup", rank: 136, solved: 3, delta: "-8" }
];

export function AnalyticsSystem() {
  const nextContest = contests[0];
  const recommendedProblems = sampleProblems.slice(0, 3);

  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(118,247,209,0.12),rgba(255,184,77,0.08)_46%,rgba(255,255,255,0.045))] p-6 shadow-panel">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-mint-300/20 bg-mint-300/10 px-3 py-2 text-sm text-mint-300">
              <Zap className="h-4 w-4" />
              Ready for today&apos;s practice
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Welcome back, afd123.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/62">
              Your dashboard brings practice, contests, submissions, rating progress,
              and recommended next steps into one focused workspace.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button as={Link} href="/workspace" size="lg">
              <Code2 className="h-5 w-5" />
              Start Solving
            </Button>
            <Button as={Link} href="/contests" size="lg" variant="secondary">
              <Trophy className="h-5 w-5" />
              View Contests
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => (
          <Surface key={metric.label}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-white/50">{metric.label}</div>
                <div className="mt-3 font-mono text-3xl font-semibold">{metric.value}</div>
                <div className="mt-2 text-sm text-white/42">{metric.caption}</div>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-md bg-mint-300/10 text-mint-300">
                <metric.icon className="h-5 w-5" />
              </span>
            </div>
          </Surface>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Surface>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Practice hub</h2>
              <p className="mt-2 text-white/54">Recommended problem paths based on your recent submissions.</p>
            </div>
            <StatusPill tone="good">3 active tracks</StatusPill>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {practicePlan.map((track) => (
              <div className="rounded-md border border-white/10 bg-ink-900 p-5" key={track.title}>
                <div className="flex items-center gap-2 font-semibold">
                  <Target className="h-4 w-4 text-mint-300" />
                  {track.title}
                </div>
                <div className="mt-2 text-sm text-white/46">{track.count}</div>
                <div className="mt-5 h-2 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-mint-300" style={{ width: `${track.progress}%` }} />
                </div>
                <div className="mt-3 font-mono text-xs text-white/42">{track.progress}% complete</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            {recommendedProblems.map((problem) => (
              <Link
                className="focus-ring flex items-center justify-between gap-4 rounded-md border border-white/10 bg-ink-900 p-4 transition hover:border-mint-300/30 hover:bg-mint-300/[0.07]"
                href="/problems"
                key={problem.slug}
              >
                <div>
                  <div className="font-semibold">{problem.title}</div>
                  <div className="mt-1 text-sm text-white/46">{problem.tags.join(" • ")}</div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill tone={problem.difficulty === "Easy" ? "good" : problem.difficulty === "Medium" ? "warn" : "bad"}>
                    {problem.difficulty}
                  </StatusPill>
                  <ArrowRight className="h-4 w-4 text-white/36" />
                </div>
              </Link>
            ))}
          </div>
        </Surface>

        <Surface>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Next contest</h2>
              <p className="mt-2 text-white/54">Stay ready for upcoming rated and virtual rounds.</p>
            </div>
            <StatusPill tone="warn">{nextContest.status}</StatusPill>
          </div>
          <div className="mt-6 rounded-md border border-amberline-300/20 bg-amberline-300/10 p-5">
            <div className="flex items-center gap-2 text-amberline-300">
              <CalendarClock className="h-5 w-5" />
              {nextContest.startsAt}
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{nextContest.name}</h3>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-white/42">Type</div>
                <div className="mt-1 font-semibold">{nextContest.type}</div>
              </div>
              <div>
                <div className="text-white/42">Duration</div>
                <div className="mt-1 font-semibold">{nextContest.duration}</div>
              </div>
              <div>
                <div className="text-white/42">Players</div>
                <div className="mt-1 font-semibold">{nextContest.registered.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {contestHistory.map((contest) => (
              <div className="grid grid-cols-[1fr_64px_64px_64px] gap-3 rounded-md border border-white/10 bg-ink-900 p-4 text-sm" key={contest.name}>
                <span className="font-semibold">{contest.name}</span>
                <span className="font-mono text-white/52">#{contest.rank}</span>
                <span className="font-mono text-white/52">{contest.solved} AC</span>
                <span className={contest.delta.startsWith("+") ? "font-mono text-mint-300" : "font-mono text-coral-300"}>
                  {contest.delta}
                </span>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Surface>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Activity heatmap</h2>
            <StatusPill tone="good">42 days</StatusPill>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2">
            {analytics.heatmap.map((level, index) => (
              <div
                className="aspect-square rounded-md border border-white/10"
                key={index}
                style={{ backgroundColor: `rgba(118, 247, 209, ${0.08 + level * 0.16})` }}
              />
            ))}
          </div>
          <h3 className="mt-8 flex items-center gap-2 font-semibold">
            <BarChart3 className="h-4 w-4 text-mint-300" />
            Rating movement
          </h3>
          <div className="mt-4 flex h-44 items-end gap-3 rounded-md border border-white/10 bg-ink-900 p-4">
            {analytics.ratingHistory.map((rating, index) => (
              <div className="flex flex-1 flex-col items-center gap-2" key={`${rating}-${index}`}>
                <div
                  className="w-full rounded-t-md bg-premium-line"
                  style={{ height: `${Math.max(20, (rating - 1300) / 5)}px` }}
                />
                <span className="font-mono text-xs text-white/42">{index + 1}</span>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <h2 className="text-2xl font-semibold">Language usage</h2>
          <div className="mt-5 space-y-4">
            {analytics.languages.map((language) => (
              <div key={language.label}>
                <div className="flex justify-between text-sm">
                  <span>{language.label}</span>
                  <span className="font-mono text-white/52">{language.value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-mint-300" style={{ width: `${language.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <h2 className="mt-8 text-2xl font-semibold">Recent submissions</h2>
          <div className="mt-4 space-y-2">
            {submissions.map((submission) => (
              <div className="rounded-md border border-white/10 bg-ink-900 p-3" key={submission.id}>
                <div className="flex justify-between gap-3 text-sm">
                  <span>{submission.problem}</span>
                  <span className="font-mono text-white/52">{submission.verdict}</span>
                </div>
                <div className="mt-1 flex justify-between text-xs text-white/36">
                  <span>{submission.language}</span>
                  <span>{submission.runtime}</span>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}
