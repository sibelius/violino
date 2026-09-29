import { readStorage, writeStorage } from "./store";

export interface BestScore {
  score: number;
  accuracy: number; // 0..1
  stars: number; // 0..5
  mode: "pratica" | "desafio";
  date: number;
}

export const SCORES_KEY = "violino:best";

export function parseScores(raw: string | null | undefined): Record<string, BestScore> {
  try {
    return JSON.parse(raw ?? "{}") ?? {};
  } catch {
    return {};
  }
}

/** Saves if better than the previous record. */
export function saveBest(slug: string, res: BestScore) {
  const all = parseScores(readStorage(SCORES_KEY));
  const prev = all[slug];
  if (!prev || res.score > prev.score) {
    all[slug] = res;
    writeStorage(SCORES_KEY, JSON.stringify(all));
  }
}
