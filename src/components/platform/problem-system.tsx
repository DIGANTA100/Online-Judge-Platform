"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Filter, Search, SlidersHorizontal, Star, Target, Trophy } from "lucide-react";
import { sampleProblems } from "@/lib/platform-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";
import { cn } from "@/lib/utils";

const difficulties = ["All", "Easy", "Medium", "Hard", "Expert"] as const;
const categories = ["All", "Practice", "Contest"] as const;
const popularTags = ["binary search", "dp", "strings", "graphs", "trees", "prefix sums", "math"];

export function ProblemSystem() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [tag, setTag] = useState("All");

  const filteredProblems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return sampleProblems.filter((problem) => {
      const matchesQuery =
        !normalizedQuery ||
        problem.title.toLowerCase().includes(normalizedQuery) ||
        problem.tags.some((item) => item.toLowerCase().includes(normalizedQuery));
      const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
      const matchesCategory = category === "All" || problem.category === category;
      const matchesTag = tag === "All" || problem.tags.includes(tag);

      return matchesQuery && matchesDifficulty && matchesCategory && matchesTag;
    });
  }, [category, difficulty, query, tag]);

  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(118,247,209,0.12),rgba(255,255,255,0.045)_54%,rgba(255,184,77,0.08))] p-6 shadow-panel">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-mint-300/20 bg-mint-300/10 px-3 py-2 text-sm text-mint-300">
              <Trophy className="h-4 w-4" />
              Curated competitive programming practice
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Choose a problem. Open the arena. Start coding.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/62">
              Search by topic, difficulty, contest source, acceptance rate, and tags.
              Every problem opens with the statement first and a full IDE directly below it.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:min-w-[360px]">
            {[
              ["Problems", sampleProblems.length],
              ["Solved", 428],
              ["Streak", "23d"]
            ].map(([label, value]) => (
              <div className="rounded-md border border-white/10 bg-ink-950/64 p-4 text-center" key={label as string}>
                <div className="font-mono text-2xl font-semibold">{value}</div>
                <div className="mt-1 text-xs text-white/42">{label as string}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Surface>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative max-w-2xl flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/36" />
            <input
              className="focus-ring h-12 w-full rounded-md border border-white/10 bg-ink-900 pl-10 pr-3 text-white placeholder:text-white/30"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title or tag"
              value={query}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((item) => (
              <button
                className={cn(
                  "focus-ring rounded-md border border-white/10 px-3 py-2 text-sm text-white/58 transition hover:bg-white/[0.06] hover:text-white",
                  difficulty === item && "border-mint-300/30 bg-mint-300/10 text-mint-300"
                )}
                key={item}
                onClick={() => setDifficulty(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-white/38" />
            {categories.map((item) => (
              <button
                className={cn(
                  "focus-ring rounded-md bg-white/[0.05] px-3 py-2 text-sm text-white/54 transition hover:bg-white/[0.08] hover:text-white",
                  category === item && "bg-amberline-300/10 text-amberline-300"
                )}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <select
            className="focus-ring h-11 rounded-md border border-white/10 bg-ink-900 px-3 text-sm text-white"
            onChange={(event) => setTag(event.target.value)}
            value={tag}
          >
            <option>All</option>
            {popularTags.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </Surface>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Surface className="p-0">
          <div className="grid grid-cols-[1fr_110px_110px_110px] gap-4 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-normal text-white/38 max-md:hidden">
            <span>Problem</span>
            <span>Difficulty</span>
            <span>Acceptance</span>
            <span>Solved</span>
          </div>
          <div>
            {filteredProblems.map((problem) => (
              <Link
                className="focus-ring grid gap-4 border-b border-white/[0.06] px-5 py-5 transition last:border-b-0 hover:bg-mint-300/[0.055] md:grid-cols-[1fr_110px_110px_110px] md:items-center"
                href={`/problems/${problem.slug}`}
                key={problem.slug}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold">{problem.title}</h2>
                    <span className="rounded-md border border-white/10 bg-white/[0.055] px-2 py-1 text-xs text-white/48">
                      {problem.source}
                    </span>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/52">{problem.statement}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {problem.tags.map((item) => (
                      <span className="rounded-md bg-white/[0.06] px-2 py-1 text-xs text-white/50" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <StatusPill tone={difficultyTone(problem.difficulty)}>{problem.difficulty}</StatusPill>
                <span className="font-mono text-sm text-white/58">{problem.acceptance}</span>
                <span className="flex items-center justify-between gap-3 font-mono text-sm text-white/58">
                  {problem.solved.toLocaleString()}
                  <ArrowRight className="h-4 w-4 text-white/32" />
                </span>
              </Link>
            ))}
            {filteredProblems.length === 0 && (
              <div className="px-5 py-12 text-center text-white/52">
                No problems match the current filters.
              </div>
            )}
          </div>
        </Surface>

        <div className="grid gap-4">
          <Surface>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Target className="h-5 w-5 text-mint-300" />
              Practice focus
            </h2>
            <div className="mt-5 space-y-4">
              {[
                ["Today", "Solve 3 medium problems"],
                ["Weak area", "Graphs and rerooting"],
                ["Goal", "Reach 1900 rating"]
              ].map(([label, value]) => (
                <div className="rounded-md border border-white/10 bg-ink-900 p-4" key={label}>
                  <div className="text-xs uppercase tracking-normal text-white/36">{label}</div>
                  <div className="mt-2 font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </Surface>
          <Surface>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <SlidersHorizontal className="h-5 w-5 text-amberline-300" />
              Popular tags
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {popularTags.map((item) => (
                <button
                  className={cn(
                    "focus-ring rounded-md border border-white/10 px-3 py-2 text-sm text-white/54 hover:bg-white/[0.06] hover:text-white",
                    tag === item && "border-mint-300/30 bg-mint-300/10 text-mint-300"
                  )}
                  key={item}
                  onClick={() => setTag(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </Surface>
          <Surface>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Star className="h-5 w-5 text-amberline-300" />
              Recommended
            </h2>
            <div className="mt-4 space-y-3">
              {sampleProblems.slice(0, 3).map((problem) => (
                <Link className="focus-ring block rounded-md border border-white/10 bg-ink-900 p-4 hover:border-mint-300/30" href={`/problems/${problem.slug}`} key={problem.slug}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{problem.title}</span>
                    <CheckCircle2 className="h-4 w-4 text-mint-300" />
                  </div>
                  <div className="mt-2 text-sm text-white/42">{problem.tags.slice(0, 2).join(" • ")}</div>
                </Link>
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}

function difficultyTone(difficulty: string) {
  if (difficulty === "Easy") return "good";
  if (difficulty === "Medium") return "warn";
  return "bad";
}
