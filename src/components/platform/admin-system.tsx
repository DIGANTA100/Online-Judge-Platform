import { CheckCircle2, Container, Plus, ShieldCheck } from "lucide-react";
import { adminQueues, securityChecklist } from "@/lib/platform-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";

export function AdminSystem() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-4">
        {adminQueues.map((item) => (
          <Surface key={item.label}>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <item.icon className="h-4 w-4 text-mint-300" />
              {item.label}
            </div>
            <div className="mt-3 font-mono text-3xl font-semibold">{item.value}</div>
          </Surface>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <Surface>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Problem authoring</h2>
              <p className="mt-2 text-white/56">Admin interface for statements, examples, limits, validators, and hidden tests.</p>
            </div>
            <Button>
              <Plus className="h-4 w-4" />
              New problem
            </Button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {["Statement editor", "Test case upload", "Editorial review", "Contest assignment"].map((item) => (
              <div className="rounded-md border border-white/10 bg-ink-900 p-5" key={item}>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-mint-300" />
                  {item}
                </div>
                <p className="mt-2 text-sm leading-6 text-white/54">Ready for integration with Spring Boot admin APIs and audit logs.</p>
              </div>
            ))}
          </div>
        </Surface>
        <Surface>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Production checks</h2>
            <StatusPill tone="good">Critical path</StatusPill>
          </div>
          <div className="mt-5 space-y-3">
            {securityChecklist.map((item) => (
              <div className="flex gap-3 rounded-md border border-white/10 bg-ink-900 p-4 text-sm leading-6 text-white/60" key={item}>
                <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-mint-300" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-md border border-amberline-300/20 bg-amberline-300/10 p-4 text-sm text-amberline-300">
            <Container className="h-4 w-4" />
            Docker sandbox worker implementation remains the backend build priority.
          </div>
        </Surface>
      </div>
    </div>
  );
}
