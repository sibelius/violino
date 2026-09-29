"use client";

import { useEffect } from "react";
import { setVolume } from "@/lib/synth";
import { useStorage, writeStorage } from "@/lib/store";

const KEY = "violino:volume";

/** Master volume (saved in localStorage). Every instance stays in sync. */
export default function VolumeControl({ compact = false }: { compact?: boolean }) {
  const raw = useStorage(KEY);
  const vol = raw != null && raw !== "" && !Number.isNaN(Number(raw)) ? Number(raw) : 0.8;

  useEffect(() => setVolume(vol), [vol]);

  const set = (v: number) => writeStorage(KEY, String(v));
  const icon = vol === 0 ? "🔇" : vol < 0.4 ? "🔈" : vol < 0.75 ? "🔉" : "🔊";

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => set(vol === 0 ? 0.8 : 0)} title={vol === 0 ? "Ativar som" : "Silenciar"} className="text-base">
        {icon}
      </button>
      <input type="range" min={0} max={1} step={0.05} value={vol} aria-label="Volume"
        onChange={(e) => set(Number(e.target.value))}
        className={`${compact ? "w-20" : "w-full"} accent-[var(--accent)]`} />
      {!compact && <span className="w-10 text-right font-mono text-xs text-muted">{Math.round(vol * 100)}%</span>}
    </div>
  );
}
