"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  function logout() {
    localStorage.removeItem("nimblejudge-demo-user");
    window.location.href = "/";
  }

  return (
    <button
      className="focus-ring flex w-full items-center justify-center gap-2 rounded-md border border-coral-400/20 bg-coral-400/10 px-4 py-3 text-sm font-semibold text-coral-300 transition hover:bg-coral-400/15"
      onClick={logout}
      type="button"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}
