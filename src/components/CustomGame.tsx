"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Game from "./Game";
import { CUSTOM_KEY, parseCustom } from "@/lib/custom";
import { useStorage } from "@/lib/store";

export default function CustomGame() {
  const slug = useSearchParams().get("id") ?? "";
  const raw = useStorage(CUSTOM_KEY);
  if (raw === undefined) return <p className="text-muted">Carregando…</p>;
  const song = parseCustom(raw).find((s) => s.slug === slug);
  if (!song)
    return (
      <p className="text-muted">
        Música não encontrada. <Link href="/jogo/editor" className="underline">Criar no editor</Link>
      </p>
    );
  return <Game key={song.slug + song.notes} song={song} />;
}
