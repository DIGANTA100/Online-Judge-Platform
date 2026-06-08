import { Bot, Send } from "lucide-react";
import { aiTools } from "@/lib/platform-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";

export function AiSystem() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <Surface>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Learning assistant</h2>
          <StatusPill tone="warn">Hidden tests protected</StatusPill>
        </div>
        <div className="mt-6 rounded-md border border-white/10 bg-ink-900 p-4">
          <div className="flex items-center gap-2 font-semibold">
            <Bot className="h-5 w-5 text-mint-300" />
            Ask for help without spoiling the solution
          </div>
          <textarea
            className="focus-ring mt-4 min-h-48 w-full rounded-md border border-white/10 bg-ink-950 p-4 text-sm leading-7 text-white"
            defaultValue={"I think Median Patrol can be solved with binary search, but I cannot prove the feasibility check. Give me a hint, not the full solution."}
          />
          <div className="mt-4 flex justify-end">
            <Button>
              <Send className="h-4 w-4" />
              Generate hint
            </Button>
          </div>
        </div>
      </Surface>
      <div className="grid gap-4">
        {aiTools.map((tool) => (
          <Surface key={tool.title}>
            <div className="flex items-center gap-2 font-semibold">
              <tool.icon className="h-4 w-4 text-mint-300" />
              {tool.title}
            </div>
            <p className="mt-3 leading-7 text-white/58">{tool.output}</p>
          </Surface>
        ))}
      </div>
    </div>
  );
}
