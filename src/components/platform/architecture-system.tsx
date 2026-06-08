import { apiContracts, judgePipeline, securityChecklist } from "@/lib/platform-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";

export function ArchitectureSystem() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <Surface>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Service architecture</h2>
          <StatusPill tone="good">Clean boundaries</StatusPill>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["Web", "Next.js frontend for product UI, editor workspace, dashboards, and admin studio."],
            ["API", "Spring Boot service for auth, users, problems, contests, submissions, discussions, and notifications."],
            ["Judge", "Redis-backed workers that compile and execute code inside Docker sandboxes."],
            ["Data", "PostgreSQL for relational data, Redis for queues/cache, object storage for source and test blobs."]
          ].map(([title, detail]) => (
            <div className="rounded-md border border-white/10 bg-ink-900 p-5" key={title}>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 leading-7 text-white/56">{detail}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-semibold">Judge flow</h2>
        <div className="mt-4 grid gap-3">
          {judgePipeline.map((step, index) => (
            <div className="grid grid-cols-[36px_1fr] gap-3 rounded-md border border-white/10 bg-ink-900 p-4" key={step.label}>
              <span className="font-mono text-mint-300">{index + 1}</span>
              <div>
                <div className="font-semibold">{step.label}</div>
                <p className="mt-1 text-sm leading-6 text-white/54">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Surface>
      <div className="grid gap-5">
        <Surface>
          <h2 className="text-xl font-semibold">API contracts</h2>
          <div className="mt-4 space-y-2">
            {apiContracts.map((contract) => (
              <div className="rounded-md bg-ink-900 p-3 font-mono text-sm text-white/64" key={contract}>
                {contract}
              </div>
            ))}
          </div>
        </Surface>
        <Surface>
          <h2 className="text-xl font-semibold">Security architecture</h2>
          <div className="mt-4 space-y-3">
            {securityChecklist.slice(0, 4).map((item) => (
              <p className="rounded-md border border-white/10 bg-ink-900 p-3 text-sm leading-6 text-white/58" key={item}>
                {item}
              </p>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}
