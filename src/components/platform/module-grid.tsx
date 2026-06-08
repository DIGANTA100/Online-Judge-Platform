import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productModules } from "@/lib/platform-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";

export function ModuleGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {productModules.map((module) => (
        <Link className="focus-ring rounded-md" href={module.href} key={module.title}>
          <Surface className="h-full transition hover:border-mint-300/30 hover:bg-mint-300/[0.07]">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-mint-300/10 text-mint-300">
                <module.icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-white/36" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">{module.title}</h2>
            <p className="mt-3 min-h-24 leading-7 text-white/56">{module.description}</p>
            <div className="mt-5">
              <StatusPill tone={module.status.includes("Implemented") ? "good" : "warn"}>{module.status}</StatusPill>
            </div>
          </Surface>
        </Link>
      ))}
    </div>
  );
}
