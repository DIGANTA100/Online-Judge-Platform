"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell, PageHeader } from "@/components/platform/app-shell";
import { ProfileSystem } from "@/components/platform/profile-system";
import { UserOnlyGate } from "@/components/platform/user-only-gate";

export default function ProfilePage() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <AppShell active="Profile">
      <div className="px-4 pt-6 sm:px-6 lg:px-8 flex justify-end">
        <button
          onClick={handleBack}
          className="focus-ring mb-2 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-sm text-white/70 hover:bg-white/[0.1] hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
      <PageHeader
        eyebrow="User Workspace"
        title="Developer Profile"
        description="Manage your professional developer profile, track solved statistics, view contest ratings, and customize system settings."
      />
      <UserOnlyGate>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <ProfileSystem />
        </div>
      </UserOnlyGate>
    </AppShell>
  );
}
