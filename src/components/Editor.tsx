"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { midiSolfege, midiToFreq, parseNotes, STRINGS, totalBeats } from "@/lib/music";
import { playTone, stopAll } from "@/lib/synth";
import { CUSTOM_KEY, parseCustom, saveCustom } from "@/lib/custom";
import { useStorage } from "@/lib/store";
import { getSong } from "@/songs";
import type { Song } from "@/songs/types";

const DURATIONS = [
  { label: "𝅘𝅥𝅯 semicolcheia", beats: 0.25 },
  { label: "♪ colcheia", beats: 0.5 },
  { label: "♩ semínima", beats: 1 },
  { label: "♩. pontuada", beats: 1.5 },
  { label: "𝅗𝅥 mínima", beats: 2 },
  { label: "𝅗𝅥. pontuada", beats: 3 },
  { label: "𝅝 semibreve", beats: 4 },
];

const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const tokenName = (midi: number) => `${NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;

interface Initial {
  slug: string | null; // editing an existing custom song
  base?: Song; // built-in song being adapted
  title: string;
  bpm: number;
  beatsPerBar: number;
  notes: string;
}

/** Prefills from ?id= (custom song), ?de= (built-in song) or ?titulo=&bpm=. */
export default function Editor() {
  const params = useSearchParams();
  const customRaw = useStorage(CUSTOM_KEY);
  if (customRaw === undefined) return <p className="text-muted">Carregando…</p>;

  const id = params.get("id");
  const de = params.get("de");
  const custom = id ? parseCustom(customRaw).find((s) => s.slug === id) : undefined;
  const builtIn = de ? getSong(de) : undefined;
  const src = custom ?? builtIn;
  const initial: Initial = src
    ? {
        slug: custom ? custom.slug : null,
        base: builtIn,
        title: custom ? src.title : `${src.title} (minha versão)`,
        bpm: src.bpm,
        beatsPerBar: src.beatsPerBar,
        notes: src.notes,
      }
    : {
        slug: null,
        title: params.get("titulo") ?? "Minha música",
        bpm: Number(params.get("bpm")) || 80,
        beatsPerBar: 4,
        notes: params.get("titulo") ? "" : "A4:1 A4:1 E5:1 E5:1 | F#5:1 F#5:1 E5:2 |",
      };
  return <EditorForm key={params.toString()} initial={initial} />;
}

function EditorForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [bpm, setBpm] = useState(initial.bpm);
  const [beatsPerBar, setBeatsPerBar] = useState(initial.beatsPerBar);
  const [notes, setNotes] = useState(initial.notes);
  const [dur, setDur] = useState(1);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const check = useMemo(() => {
    try {
      const p = parseNotes(notes);
      return { ok: true as const, count: p.filter((n) => n.midi != null).length, beats: totalBeats(p) };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : String(e) };
    }
  }, [notes]);

  const insert = (token: string) => {
    const ta = taRef.current;
    const pos = ta?.selectionStart ?? notes.length;
    const before = notes.slice(0, pos).replace(/\s*$/, "");
    const after = notes.slice(pos);
    const next = `${before}${before ? " " : ""}${token} ${after.replace(/^\s*/, "")}`;
    setNotes(next);
    requestAnimationFrame(() => {
      const p = before.length + token.length + (before ? 2 : 1);
      ta?.focus();
      ta?.setSelectionRange(p, p);
    });
  };

  const addNote = (midi: number) => {
    playTone(midiToFreq(midi), 0.35);
    insert(`${tokenName(midi)}:${dur}`);
  };

  const [previewing, setPreviewing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stopPreview = () => {
    stopAll();
    if (timer.current) clearTimeout(timer.current);
    setPreviewing(false);
  };
  useEffect(() => () => stopAll(), []);
  const preview = () => {
    if (previewing) return stopPreview();
    if (!check.ok) return;
    const spb = 60 / bpm;
    const p = parseNotes(notes);
    for (const n of p) if (n.midi != null) playTone(midiToFreq(n.midi), n.beats * spb * 0.95, n.start * spb + 0.1, 0.14);
    setPreviewing(true);
    timer.current = setTimeout(() => setPreviewing(false), (totalBeats(p) * spb + 0.5) * 1000);
  };

  const save = () => {
    if (!check.ok) return;
    const id = initial.slug ?? `minha-${Date.now().toString(36)}`;
    const base = initial.base;
    saveCustom({
      slug: id,
      title: title.trim() || "Sem título",
      originalTitle: title,
      composer: base?.composer ?? "Minha transcrição",
      volume: base?.volume ?? 1,
      number: 0,
      bpm,
      beatsPerBar,
      key: base?.key ?? "",
      notes,
      confidence: "alta",
    });
    router.push(`/jogo/minha?id=${id}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold">Editor de músicas</h1>
        <p className="text-sm text-muted">
          Digite (ou clique) as notas no formato <code className="rounded bg-panel-2 px-1">NOTA:TEMPOS</code>. Exemplos:{" "}
          <code>A4:1</code> = Lá semínima, <code>F#5:0.5</code> = Fá# colcheia, <code>r:1</code> = pausa. A barra{" "}
          <code>|</code> separa compassos e é opcional.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_110px_110px]">
        <label className="space-y-1 text-sm">
          <span className="text-muted">Título</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-line bg-panel px-3 py-2" />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted">♩ = BPM</span>
          <input type="number" min={30} max={200} value={bpm} onChange={(e) => setBpm(Number(e.target.value) || 80)} className="w-full rounded-lg border border-line bg-panel px-3 py-2 font-mono" />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted">Tempos/compasso</span>
          <input type="number" min={1} max={12} value={beatsPerBar} onChange={(e) => setBeatsPerBar(Number(e.target.value) || 4)} className="w-full rounded-lg border border-line bg-panel px-3 py-2 font-mono" />
        </label>
      </div>

      <div className="card space-y-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {DURATIONS.map((d) => (
            <button key={d.beats} onClick={() => setDur(d.beats)}
              className={`rounded-full px-3 py-1 text-xs ${dur === d.beats ? "bg-accent text-[#1a1008]" : "bg-panel-2"}`}>
              {d.label}
            </button>
          ))}
          <button onClick={() => insert(`r:${dur}`)} className="rounded-full bg-panel-2 px-3 py-1 text-xs">𝄽 pausa</button>
          <button onClick={() => insert("|")} className="rounded-full bg-panel-2 px-3 py-1 text-xs">| compasso</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {STRINGS.map((s, i) => {
            const top = i === 3 ? s.midi + 12 : s.midi + 6;
            return (
              <div key={s.name} className="space-y-1">
                <div className="text-center text-xs font-medium" style={{ color: s.color }}>Corda {midiSolfege(s.midi)}</div>
                <div className="flex flex-col-reverse gap-1">
                  {Array.from({ length: top - s.midi + 1 }, (_, k) => s.midi + k).map((m) => (
                    <button key={m} onClick={() => addNote(m)}
                      className="rounded-md border border-line py-1 text-xs hover:brightness-125"
                      style={{ background: `${s.color}${NAMES[m % 12].includes("#") ? "18" : "30"}` }}>
                      {midiSolfege(m)} <span className="font-mono text-muted">{tokenName(m)}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <textarea ref={taRef} value={notes} onChange={(e) => setNotes(e.target.value)} rows={8} spellCheck={false}
        className="w-full rounded-xl border border-line bg-panel p-3 font-mono text-sm" />

      <div className="flex flex-wrap items-center gap-3">
        <span className={`text-sm ${check.ok ? "text-muted" : "text-bad"}`}>
          {check.ok
            ? `${check.count} notas · ${check.beats} tempos (${(check.beats / beatsPerBar).toFixed(1)} compassos)`
            : check.error}
        </span>
        <div className="ml-auto flex gap-2">
          <button className="btn-ghost" onClick={preview} disabled={!check.ok}>{previewing ? "⏹ Parar" : "🔊 Ouvir"}</button>
          <button className="btn-primary" onClick={save} disabled={!check.ok || check.count === 0}>Salvar e jogar ▶</button>
        </div>
      </div>
    </div>
  );
}
