import type { Song } from "@/songs/types";
import { readStorage, writeStorage } from "./store";

export const CUSTOM_KEY = "violino:custom";

export function parseCustom(raw: string | null | undefined): Song[] {
  try {
    return JSON.parse(raw ?? "[]") ?? [];
  } catch {
    return [];
  }
}

export function getCustom(slug: string): Song | undefined {
  return parseCustom(readStorage(CUSTOM_KEY)).find((s) => s.slug === slug);
}

export function saveCustom(song: Song) {
  const all = parseCustom(readStorage(CUSTOM_KEY)).filter((s) => s.slug !== song.slug);
  all.unshift(song);
  writeStorage(CUSTOM_KEY, JSON.stringify(all));
}

export function deleteCustom(slug: string) {
  writeStorage(CUSTOM_KEY, JSON.stringify(parseCustom(readStorage(CUSTOM_KEY)).filter((s) => s.slug !== slug)));
}
