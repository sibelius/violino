"use client";

import { useSyncExternalStore } from "react";

const EVT = "violino:storage";

export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
  window.dispatchEvent(new Event(EVT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Raw localStorage value; `undefined` while server-rendering / hydrating. */
export function useStorage(key: string): string | null | undefined {
  return useSyncExternalStore(subscribe, () => readStorage(key), () => undefined);
}
