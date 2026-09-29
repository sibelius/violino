"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Song } from "@/songs/types";
import { parseScores, SCORES_KEY } from "@/lib/scores";
import { CUSTOM_KEY, deleteCustom, parseCustom } from "@/lib/custom";
import { useStorage, writeStorage } from "@/lib/store";

const VOLUME_BLURB: Record<number, string> = {
  1: "Primeiras canções em Lá maior, minuetos de Bach",
  2: "Coros, gavotas e minuetos",
  3: "Gavotas de Bach, Martini e Becker",
  4: "Concertos de Seitz, Vivaldi e Bach",
  5: "Vivaldi, Bach e danças",
};

export default function SongList({ volumes }: { volumes: { volume: number; songs: Song[] }[] }) {
  const volRaw = useStorage("violino:vol");
  const vol = volRaw != null && /^[0-5]$/.test(volRaw) ? Number(volRaw) : 1;
  const scoresRaw = useStorage(SCORES_KEY);
  const customRaw = useStorage(CUSTOM_KEY);
  const best = useMemo(() => parseScores(scoresRaw), [scoresRaw]);
  const custom = useMemo(() => parseCustom(customRaw), [customRaw]);
  const pick = (v: number) => writeStorage("violino:vol", String(v));

  const songs = vol === 0 ? custom : [...(volumes.find((v) => v.volume === vol)?.songs ?? [])].sort((a, b) => a.number - b.number);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Escolha a música</h1>
        <p className="text-sm text-muted">Repertório do Método Suzuki para violino.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {volumes.map((v) => (
          <button key={v.volume} onClick={() => pick(v.volume)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${vol === v.volume ? "bg-accent text-[#1a1008]" : "bg-panel hover:bg-panel-2"}`}>
            Volume {v.volume}
          </button>
        ))}
        <button onClick={() => pick(0)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${vol === 0 ? "bg-accent text-[#1a1008]" : "bg-panel hover:bg-panel-2"}`}>
          Minhas músicas {custom.length ? `(${custom.length})` : ""}
        </button>
      </div>
      {vol > 0 && <p className="-mt-3 text-sm text-muted">{VOLUME_BLURB[vol]}</p>}

      {vol === 0 && (
        <Link href="/jogo/editor" className="btn-primary">+ Nova música</Link>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {songs.map((s) => {
          const b = best[s.slug];
          const locked = s.copyrighted && !s.notes.trim();
          const href = vol === 0 ? `/jogo/minha?id=${s.slug}` : `/jogo/${s.slug}`;
          return (
            <li key={s.slug}>
              <div className={`card flex items-center gap-4 p-4 transition hover:border-accent ${locked ? "opacity-60" : ""}`}>
                <Link href={href} className="flex min-w-0 flex-1 items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-panel-2 font-mono text-sm text-muted">
                    {vol === 0 ? "♪" : s.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{s.title}</span>
                    <span className="block truncate text-xs text-muted">
                      {s.composer}
                      {s.excerpt ? ` · ${s.excerpt}` : ""}
                    </span>
                    {locked && <span className="text-xs text-accent">🔒 obra protegida — digite no editor</span>}
                    {!locked && s.confidence === "baixa" && <span className="text-xs text-muted">⚠️ transcrição a revisar</span>}
                  </span>
                  {b && <span className="shrink-0 text-sm text-accent" title={`${b.score} pts`}>{"★".repeat(b.stars)}</span>}
                </Link>
                {vol === 0 && (
                  <div className="flex shrink-0 gap-2 text-xs">
                    <Link href={`/jogo/editor?id=${s.slug}`} className="text-muted underline">editar</Link>
                    <button className="text-bad underline" onClick={() => deleteCustom(s.slug)}>apagar</button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {vol === 0 && custom.length === 0 && (
        <p className="text-sm text-muted">Você ainda não criou nenhuma música. Use o editor para digitar peças do seu livro.</p>
      )}
    </div>
  );
}
