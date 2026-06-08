"use client";

import { useState } from "react";
import {
  Activity,
  Award,
  Building,
  Calendar,
  CheckCircle2,
  Flame,
  Globe,
  Mail,
  Medal,
  Settings,
  Shield,
  Trophy,
  User,
  Zap
} from "lucide-react";
import { Surface, StatusPill } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProfileStats = {
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  expertSolved: number;
  expertTotal: number;
};

const defaultStats: ProfileStats = {
  easySolved: 210,
  easyTotal: 300,
  mediumSolved: 158,
  mediumTotal: 400,
  hardSolved: 52,
  hardTotal: 200,
  expertSolved: 8,
  expertTotal: 50
};

const recentSubmissions = [
  { id: "S-10492", problem: "Median Patrol", language: "C++20", verdict: "AC", runtime: "84 ms", time: "2 hours ago" },
  { id: "S-10491", problem: "Graph Relay", language: "Python 3", verdict: "TLE", runtime: "3000 ms", time: "4 hours ago" },
  { id: "S-10490", problem: "Compiler Garden", language: "Java 21", verdict: "WA", runtime: "190 ms", time: "1 day ago" },
  { id: "S-10488", problem: "String Forge", language: "C++20", verdict: "AC", runtime: "42 ms", time: "2 days ago" }
];

export function ProfileSystem() {
  // Form states
  const [handle, setHandle] = useState("afd123");
  const [email, setEmail] = useState("afd123@gmail.com");
  const [prefLanguage, setPrefLanguage] = useState("cpp");
  const [fontSize, setFontSize] = useState(14);
  const [autoComplete, setAutoComplete] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  // Interaction states
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate saving settings to backend
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 4000);
    }, 900);
  };

  const totalSolved = defaultStats.easySolved + defaultStats.mediumSolved + defaultStats.hardSolved + defaultStats.expertSolved;
  const totalProblems = defaultStats.easyTotal + defaultStats.mediumTotal + defaultStats.hardTotal + defaultStats.expertTotal;
  const overallPercentage = Math.round((totalSolved / totalProblems) * 100);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      {/* Left Column: Stats & Submissions */}
      <div className="space-y-6">
        {/* User Identity Banner Card */}
        <section className="relative overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(118,247,209,0.1)_0%,rgba(16,21,29,0.95)_60%,rgba(21,27,36,0.95)_100%)] p-6 shadow-panel">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint-300/5 blur-3xl" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar block */}
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-mint-300/30 bg-mint-300/10 text-mint-300 shadow-glow">
              <span className="font-mono text-3xl font-semibold tracking-wider">AD</span>
              <div className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-mint-400 text-ink-950 shadow-md">
                <Award className="h-4 w-4" />
              </div>
            </div>

            {/* Profile details */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold leading-none">{handle}</h1>
                <span className="inline-flex rounded-md border border-[#5ea4ff]/20 bg-[#5ea4ff]/10 px-2.5 py-1 text-xs font-semibold text-[#5ea4ff]">
                  Expert
                </span>
              </div>
              <p className="text-white/64">Fullstack Engineer & Competitive Programming enthusiast.</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-white/46">
                <span className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-white/30" /> Bangladesh
                </span>
                <span className="flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-white/30" /> Competitive Coding Club
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-white/30" /> Member since June 2024
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Solved Statistics Overview */}
        <Surface>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Solved stats</h2>
              <p className="mt-1 text-sm text-white/54">Breakdown of solved problems across competitive track pools.</p>
            </div>
            <div className="text-right">
              <div className="font-mono text-3xl font-semibold text-mint-300">{totalSolved} <span className="text-base text-white/42">/ {totalProblems}</span></div>
              <div className="text-xs text-white/46">{overallPercentage}% overall accuracy</div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* Easy Stats */}
            <div className="rounded-md border border-white/10 bg-ink-900 p-5">
              <div className="flex justify-between font-semibold">
                <span className="text-mint-300">Easy</span>
                <span className="font-mono text-sm text-white/64">
                  {defaultStats.easySolved} <span className="text-white/30">/ {defaultStats.easyTotal}</span>
                </span>
              </div>
              <div className="mt-3 h-2.5 rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-mint-300"
                  style={{ width: `${(defaultStats.easySolved / defaultStats.easyTotal) * 100}%` }}
                />
              </div>
              <p className="mt-2.5 text-xs text-white/46">Foundational syntax and simple mapping metrics.</p>
            </div>

            {/* Medium Stats */}
            <div className="rounded-md border border-white/10 bg-ink-900 p-5">
              <div className="flex justify-between font-semibold">
                <span className="text-amberline-300">Medium</span>
                <span className="font-mono text-sm text-white/64">
                  {defaultStats.mediumSolved} <span className="text-white/30">/ {defaultStats.mediumTotal}</span>
                </span>
              </div>
              <div className="mt-3 h-2.5 rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-amberline-300"
                  style={{ width: `${(defaultStats.mediumSolved / defaultStats.mediumTotal) * 100}%` }}
                />
              </div>
              <p className="mt-2.5 text-xs text-white/46">Greedy predicates, binary searches, and prefix operations.</p>
            </div>

            {/* Hard Stats */}
            <div className="rounded-md border border-white/10 bg-ink-900 p-5">
              <div className="flex justify-between font-semibold">
                <span className="text-coral-400">Hard</span>
                <span className="font-mono text-sm text-white/64">
                  {defaultStats.hardSolved} <span className="text-white/30">/ {defaultStats.hardTotal}</span>
                </span>
              </div>
              <div className="mt-3 h-2.5 rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-coral-400"
                  style={{ width: `${(defaultStats.hardSolved / defaultStats.hardTotal) * 100}%` }}
                />
              </div>
              <p className="mt-2.5 text-xs text-white/46">Complex graph flows, tree modifications, and segment query caches.</p>
            </div>

            {/* Expert Stats */}
            <div className="rounded-md border border-white/10 bg-ink-900 p-5">
              <div className="flex justify-between font-semibold">
                <span className="text-[#b58cff]">Expert</span>
                <span className="font-mono text-sm text-white/64">
                  {defaultStats.expertSolved} <span className="text-white/30">/ {defaultStats.expertTotal}</span>
                </span>
              </div>
              <div className="mt-3 h-2.5 rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-[#b58cff]"
                  style={{ width: `${(defaultStats.expertSolved / defaultStats.expertTotal) * 100}%` }}
                />
              </div>
              <p className="mt-2.5 text-xs text-white/46">Advanced scheduling, probability DP, and national olympiad questions.</p>
            </div>
          </div>
        </Surface>

        {/* Recent Submissions */}
        <Surface>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent activity</h2>
            <StatusPill tone="good">Live Feed</StatusPill>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm" aria-label="Recent submissions">
              <thead>
                <tr className="border-b border-white/10 text-white/42 font-semibold">
                  <th className="pb-3 pr-4">Run ID</th>
                  <th className="pb-3 pr-4">Problem</th>
                  <th className="pb-3 pr-4">Language</th>
                  <th className="pb-3 pr-4">Verdict</th>
                  <th className="pb-3 pr-4">Runtime</th>
                  <th className="pb-3">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="text-white/78 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-4 font-mono text-white/50">{sub.id}</td>
                    <td className="py-3.5 pr-4 font-semibold text-white">{sub.problem}</td>
                    <td className="py-3.5 pr-4 font-mono text-xs text-white/54">{sub.language}</td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={cn(
                          "inline-flex rounded px-1.5 py-0.5 text-xs font-semibold",
                          sub.verdict === "AC"
                            ? "bg-mint-300/10 text-mint-300 border border-mint-300/20"
                            : sub.verdict === "WA"
                            ? "bg-amberline-300/10 text-amberline-300 border border-amberline-300/20"
                            : "bg-coral-400/10 text-coral-300 border border-coral-400/20"
                        )}
                      >
                        {sub.verdict}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-xs text-white/50">{sub.runtime}</td>
                    <td className="py-3.5 text-xs text-white/42">{sub.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>
      </div>

      {/* Right Column: Rating summaries, Badges, settings form */}
      <div className="space-y-6">
        {/* Competitive Stats Summary Card */}
        <Surface>
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-[#ffb84d]" />
            <h2 className="text-xl font-semibold">Competitive metrics</h2>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-md border border-white/10 bg-ink-900 p-4">
              <div className="text-xs text-white/42 uppercase">Current Rating</div>
              <div className="mt-1 font-mono text-2xl font-semibold text-mint-300">1842</div>
            </div>
            <div className="rounded-md border border-white/10 bg-ink-900 p-4">
              <div className="text-xs text-white/42 uppercase">Max Rating</div>
              <div className="mt-1 font-mono text-2xl font-semibold text-[#5ea4ff]">1890</div>
            </div>
            <div className="rounded-md border border-white/10 bg-ink-900 p-4">
              <div className="text-xs text-white/42 uppercase">Global Rank</div>
              <div className="mt-1 font-mono text-2xl font-semibold text-white">#1,842</div>
            </div>
            <div className="rounded-md border border-white/10 bg-ink-900 p-4">
              <div className="text-xs text-white/42 uppercase">Volatility</div>
              <div className="mt-1 font-mono text-2xl font-semibold text-white/62">72</div>
            </div>
          </div>
        </Surface>

        {/* Achievements / Badges Grid */}
        <Surface>
          <div className="flex items-center gap-2">
            <Medal className="h-6 w-6 text-[#5ea4ff]" />
            <h2 className="text-xl font-semibold">Achievements</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { title: "Contest Master", desc: "Rating exceeded 1800+", icon: Trophy, color: "text-[#ffb84d] bg-[#ffb84d]/10 border-[#ffb84d]/20" },
              { title: "23-Day Streak", desc: "Maintained active practice", icon: Flame, color: "text-coral-400 bg-coral-400/10 border-coral-400/20" },
              { title: "Speed Demon", desc: "Accepted runs in < 5 mins", icon: Zap, color: "text-mint-300 bg-mint-300/10 border-mint-300/20" },
              { title: "Graph Wizard", desc: "Completed graph shortest path pool", icon: Activity, color: "text-[#5ea4ff] bg-[#5ea4ff]/10 border-[#5ea4ff]/20" }
            ].map((badge) => (
              <div
                className="group relative flex flex-col items-center rounded-md border border-white/10 bg-ink-900 p-4 text-center transition hover:border-mint-300/20 hover:bg-mint-300/[0.02]"
                key={badge.title}
              >
                <span className={cn("grid h-12 w-12 place-items-center rounded-full border shadow-sm transition group-hover:scale-105 duration-200", badge.color)}>
                  <badge.icon className="h-5 w-5" />
                </span>
                <div className="mt-3 text-sm font-semibold text-white">{badge.title}</div>
                <div className="mt-1 text-xs text-white/46">{badge.desc}</div>
              </div>
            ))}
          </div>
        </Surface>

        {/* Interactive Preferences Form */}
        <Surface>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-mint-300" />
            <h2 className="text-xl font-semibold">Workspace settings</h2>
          </div>

          <form onSubmit={handleSave} className="mt-5 space-y-4">
            <label className="grid gap-1.5 text-sm font-medium text-white/64">
              Display Handle
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="focus-ring h-10 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-sm text-white transition hover:border-white/20"
                required
              />
            </label>

            <label className="grid gap-1.5 text-sm font-medium text-white/64">
              Contact Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring h-10 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-sm text-white transition hover:border-white/20"
                required
              />
            </label>

            <label className="grid gap-1.5 text-sm font-medium text-white/64">
              Preferred Language
              <select
                value={prefLanguage}
                onChange={(e) => setPrefLanguage(e.target.value)}
                className="focus-ring h-10 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-sm text-white transition hover:border-white/20"
              >
                <option value="cpp">C++20 (GCC)</option>
                <option value="c">C17 (GCC)</option>
                <option value="java">Java 21 (OpenJDK)</option>
                <option value="python">Python 3 (CPython)</option>
                <option value="javascript">JavaScript (Node.js)</option>
              </select>
            </label>

            <div className="grid gap-2 text-sm font-medium text-white/64">
              <div className="flex justify-between">
                <span>Editor Font Size</span>
                <span className="font-mono text-mint-300">{fontSize}px</span>
              </div>
              <input
                type="range"
                min={12}
                max={20}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="h-2 w-full accent-mint-400 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-3 text-sm font-medium text-white/64 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoComplete}
                  onChange={(e) => setAutoComplete(e.target.checked)}
                  className="focus-ring h-4.5 w-4.5 rounded border-white/10 bg-ink-900 text-mint-300 accent-mint-300"
                />
                Enable autocomplete hints
              </label>

              <label className="flex items-center gap-3 text-sm font-medium text-white/64 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="focus-ring h-4.5 w-4.5 rounded border-white/10 bg-ink-900 text-mint-300 accent-mint-300"
                />
                Enable editor drafts auto-save
              </label>
            </div>

            {/* Status alerts */}
            {saveSuccess && (
              <div className="flex items-center gap-2 rounded-md border border-mint-300/20 bg-mint-300/10 p-3 text-sm text-mint-300 animate-fadeIn">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Preferences saved successfully!</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSaving}
              className="w-full mt-2 font-semibold"
            >
              {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
          </form>
        </Surface>
      </div>
    </div>
  );
}
