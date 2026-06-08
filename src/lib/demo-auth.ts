"use client";

import { useSyncExternalStore } from "react";

const authStorageKey = "nimblejudge-demo-user";
const authEventName = "nimblejudge-demo-auth-change";

export function getDemoUser() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(authStorageKey);
}

export function setDemoUser(email: string) {
  localStorage.setItem(authStorageKey, email);
  window.dispatchEvent(new Event(authEventName));
}

export function clearDemoUser() {
  localStorage.removeItem(authStorageKey);
  window.dispatchEvent(new Event(authEventName));
}

export function useDemoUser() {
  return useSyncExternalStore(subscribeToDemoAuth, getDemoUser, () => null);
}

function subscribeToDemoAuth(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(authEventName, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(authEventName, onStoreChange);
  };
}
