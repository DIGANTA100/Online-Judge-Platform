"use client";

import { useSyncExternalStore } from "react";

const authStorageKey = "nimblejudge-demo-user";
const authRoleStorageKey = "nimblejudge-demo-role";
const authEventName = "nimblejudge-demo-auth-change";
export type DemoRole = "USER" | "ADMIN";

export function getDemoUser() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(authStorageKey);
}

export function getDemoRole(): DemoRole | null {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem(authRoleStorageKey);
  return role === "ADMIN" ? "ADMIN" : role === "USER" ? "USER" : null;
}

export function getDemoSession() {
  const email = getDemoUser();
  if (!email) return null;
  return {
    email,
    role: getDemoRole() ?? "USER"
  };
}

export function setDemoUser(email: string, role: DemoRole = "USER") {
  localStorage.setItem(authStorageKey, email);
  localStorage.setItem(authRoleStorageKey, role);
  window.dispatchEvent(new Event(authEventName));
}

export function clearDemoUser() {
  localStorage.removeItem(authStorageKey);
  localStorage.removeItem(authRoleStorageKey);
  window.dispatchEvent(new Event(authEventName));
}

export function useDemoUser() {
  return useSyncExternalStore(subscribeToDemoAuth, getDemoUser, () => null);
}

export function useDemoRole() {
  return useSyncExternalStore(subscribeToDemoAuth, getDemoRole, () => null);
}

function subscribeToDemoAuth(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(authEventName, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(authEventName, onStoreChange);
  };
}
