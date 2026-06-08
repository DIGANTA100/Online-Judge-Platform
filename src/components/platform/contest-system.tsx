import { CalendarClock, Medal, Snowflake, Users } from "lucide-react";
import { contests, standings } from "@/lib/platform-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";

export function ContestSystem() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <Surface>
        <h2 className="text-2xl font-semibold">Contest operations</h2>
        <div className="mt-6 grid gap-4">
          {contests.map((contest) => (
            <article className="rounded-md border border-white/10 bg-ink-900 p-5" key={contest.slug}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold">{contest.name}</h3>
                    <StatusPill tone={contest.status === "Live" ? "good" : "warn"}>{contest.status}</StatusPill>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-white/58 sm:grid-cols-2 lg:grid-cols-4">
                    <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-mint-300" />{contest.startsAt}</span>
                    <span>{contest.duration}</span>
                    <span className="flex items-center gap-2"><Users className="h-4 w-4 text-mint-300" />{contest.registered.toLocaleString()}</span>
                    <span className="flex items-center gap-2"><Snowflake className="h-4 w-4 text-mint-300" />{contest.freeze}</span>
                  </div>
                </div>
                <StatusPill>{contest.type}</StatusPill>
              </div>
            </article>
          ))}
        </div>
      </Surface>
      <Surface>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Live rankings</h2>
          <StatusPill tone="good">Penalty aware</StatusPill>
        </div>
        <div className="mt-5 overflow-hidden rounded-md border border-white/10">
          {standings.map((row) => (
            <div className="grid grid-cols-[44px_1fr_64px_70px] gap-3 border-b border-white/[0.06] bg-ink-900 px-4 py-3 text-sm last:border-b-0" key={row.handle}>
              <span className="font-mono text-white/42">#{row.rank}</span>
              <span className="flex items-center gap-2 font-semibold">
                <Medal className="h-4 w-4 text-amberline-300" />
                {row.handle}
              </span>
              <span className="font-mono">{row.solved}</span>
              <span className="font-mono text-mint-300">+{row.ratingDelta}</span>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}
