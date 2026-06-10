"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Surface } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";
import { useDemoRole, useDemoUser } from "@/lib/demo-auth";

export function UserOnlyGate({ children }: { children: ReactNode }) {
  const demoUser = useDemoUser();
  const demoRole = useDemoRole();

  if (demoUser && demoRole === "ADMIN") {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <Surface className="mx-auto max-w-3xl text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-md bg-mint-300/10 text-mint-300">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold">Admin accounts use the administration workspace.</h1>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/58">
            Practice, solving, contest participation, ratings, and normal user profile tools are reserved for user accounts.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/dashboard">
              Admin Dashboard
            </Button>
            <Button as={Link} href="/admin" variant="secondary">
              Admin Studio
            </Button>
          </div>
        </Surface>
      </div>
    );
  }

  return <>{children}</>;
}
