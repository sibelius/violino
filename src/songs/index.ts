import type { Song } from "./types";
import { volume1 } from "./volume1";
import { volume2 } from "./volume2";
import { volume3 } from "./volume3";
import { volume4 } from "./volume4";
import { volume5 } from "./volume5";

export type { Song } from "./types";

export const VOLUMES: { volume: Song["volume"]; songs: Song[] }[] = [
  { volume: 1, songs: volume1 },
  { volume: 2, songs: volume2 },
  { volume: 3, songs: volume3 },
  { volume: 4, songs: volume4 },
  { volume: 5, songs: volume5 },
];

export const ALL_SONGS: Song[] = VOLUMES.flatMap((v) => [...v.songs].sort((a, b) => a.number - b.number));

export function getSong(slug: string): Song | undefined {
  return ALL_SONGS.find((s) => s.slug === slug);
}
