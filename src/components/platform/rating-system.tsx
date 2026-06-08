import { Calculator, Medal, TrendingUp } from "lucide-react";
import { ratingModel } from "@/lib/platform-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";

export function RatingSystem() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <Surface>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Contest performance model</h2>
          <StatusPill tone="good">Codeforces-like</StatusPill>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Current", ratingModel.currentRating],
            ["Performance", ratingModel.projectedPerformance],
            ["Actual rank", ratingModel.actualRank],
            ["Delta", `+${ratingModel.delta}`]
          ].map(([label, value]) => (
            <div className="rounded-md border border-white/10 bg-ink-900 p-4" key={label as string}>
              <div className="text-sm text-white/50">{label as string}</div>
              <div className="mt-2 font-mono text-2xl font-semibold">{value as string}</div>
            </div>
          ))}
        </div>
        <h3 className="mt-8 flex items-center gap-2 text-xl font-semibold">
          <Calculator className="h-5 w-5 text-mint-300" />
          Mathematical formulas
        </h3>
        <div className="mt-4 space-y-3">
          {ratingModel.formulas.map((formula) => (
            <div className="rounded-md border border-white/10 bg-ink-900 p-4 font-mono text-sm text-white/70" key={formula}>
              {formula}
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-md border border-mint-300/20 bg-mint-300/10 p-5">
          <div className="flex items-center gap-2 font-semibold text-mint-300">
            <TrendingUp className="h-5 w-5" />
            Rating update result
          </div>
          <p className="mt-3 leading-7 text-mint-300/74">
            A rank better than expected produces a positive delta. The final change is damped
            by contest count and volatility so early users move faster while mature profiles
            remain stable.
          </p>
        </div>
      </Surface>
      <Surface>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Medal className="h-5 w-5 text-amberline-300" />
          Rank titles
        </h2>
        <div className="mt-5 space-y-3">
          {ratingModel.titles.map((rank) => (
            <div className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-ink-900 p-4" key={rank.title}>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: rank.color }} />
                <span className="font-semibold">{rank.title}</span>
              </div>
              <span className="font-mono text-sm text-white/52">{rank.range}</span>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}
