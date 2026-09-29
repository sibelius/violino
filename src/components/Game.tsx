"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  fingerForMidi,
  freqToMidi,
  midiName,
  midiSolfege,
  midiToFreq,
  parseNotes,
  STRINGS,
  totalBeats,
  stringForMidi,
} from "@/lib/music";
import { useMicPitch } from "@/lib/useMicPitch";
import { click, playTone, stopAll } from "@/lib/synth";
import VolumeControl from "./VolumeControl";
import type { Song } from "@/songs/types";
import { parseScores, saveBest, SCORES_KEY, type BestScore } from "@/lib/scores";
import { useStorage, writeStorage } from "@/lib/store";

type Mode = "pratica" | "desafio";
type Grade = "perfeito" | "otimo" | "bom" | "erro";

interface GNote {
  midi: number;
  lane: number;
  start: number; // seconds (at 100% speed)
  dur: number; // seconds
  status: "pending" | Grade;
  hold: number; // seconds of correct pitch accumulated
  firstMatch: number | null;
  cents: number[];
  played: boolean; // guide tone already triggered
}

interface Popup {
  text: string;
  color: string;
  lane: number;
  born: number;
}

interface Stats {
  score: number;
  streak: number;
  maxStreak: number;
  perfeito: number;
  otimo: number;
  bom: number;
  erro: number;
  done: number;
  total: number;
}

const GRADE_INFO: Record<Grade, { label: string; color: string; points: number }> = {
  perfeito: { label: "Perfeito!", color: "#4ade80", points: 100 },
  otimo: { label: "Ótimo", color: "#a3e635", points: 70 },
  bom: { label: "Bom", color: "#e0a458", points: 40 },
  erro: { label: "Errou", color: "#f87171", points: 0 },
};

const emptyStats = (total: number): Stats => ({
  score: 0, streak: 0, maxStreak: 0, perfeito: 0, otimo: 0, bom: 0, erro: 0, done: 0, total,
});

export default function Game({ song }: { song: Song }) {
  const [mode, setMode] = useState<Mode>("pratica");
  const [speed, setSpeed] = useState(0.8);
  const [tolerance, setTolerance] = useState(40);
  const [octaveOk, setOctaveOk] = useState(false);
  const guideRaw = useStorage("violino:guide");
  const guide = guideRaw === "1";
  const setGuide = (on: boolean) => writeStorage("violino:guide", on ? "1" : "0");
  const [a4, setA4] = useState(440);
  const [phase, setPhase] = useState<"menu" | "playing" | "paused" | "done">("menu");
  const [stats, setStats] = useState<Stats>(() => emptyStats(0));
  const [live, setLive] = useState<{ note: string; cents: number } | null>(null);
  const [result, setResult] = useState<BestScore | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [target, setTarget] = useState<{ midi: number; lane: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // ----- game state kept in refs (mutated every frame) -----
  const notesRef = useRef<GNote[]>([]);
  const tRef = useRef(0); // song time in seconds (100%-speed timeline)
  const statsRef = useRef<Stats>(emptyStats(0));
  const popupsRef = useRef<Popup[]>([]);
  const freqRef = useRef<number | null>(null);
  const phaseRef = useRef(phase);
  const waitingRef = useRef(false);
  const lastBeatRef = useRef(-99);
  const guideStop = useRef<(() => void) | null>(null);
  const settings = useRef({ mode, speed, tolerance, octaveOk, guide, a4 });
  useEffect(() => {
    settings.current = { mode, speed, tolerance, octaveOk, guide, a4 };
    phaseRef.current = phase;
  });

  const secPerBeat = 60 / song.bpm;

  const parsed = useMemo(() => {
    try {
      return parseNotes(song.notes);
    } catch (e) {
      return e instanceof Error ? e.message : String(e);
    }
  }, [song.notes]);

  const parseError = typeof parsed === "string" ? parsed : null;
  const scoresRaw = useStorage(SCORES_KEY);
  const best = useMemo(() => parseScores(scoresRaw)[song.slug] ?? null, [scoresRaw, song.slug]);

  const buildNotes = useCallback((): GNote[] => {
    if (typeof parsed === "string") return [];
    return parsed
      .filter((n) => n.midi != null)
      .map((n) => ({
        midi: n.midi!,
        lane: stringForMidi(n.midi!),
        start: n.start * secPerBeat,
        dur: n.beats * secPerBeat,
        status: "pending" as const,
        hold: 0,
        firstMatch: null,
        cents: [],
        played: false,
      }));
  }, [parsed, secPerBeat]);

  const mic = useMicPitch(({ freq }) => {
    freqRef.current = freq;
    if (freq) {
      const m = freqToMidi(freq, settings.current.a4);
      const r = Math.round(m);
      setLive({ note: `${midiSolfege(r)} ${midiName(r)}`, cents: (m - r) * 100 });
    } else setLive(null);
  });

  const stopMusic = useCallback(() => {
    stopAll();
    if (previewTimer.current) clearTimeout(previewTimer.current);
    setPreviewing(false);
  }, []);

  // silence everything when leaving the page
  useEffect(() => stopMusic, [stopMusic]);

  const startGame = async () => {
    stopMusic();
    if (mic.status !== "on") await mic.start();
    notesRef.current = buildNotes();
    statsRef.current = emptyStats(notesRef.current.length);
    setStats(statsRef.current);
    popupsRef.current = [];
    waitingRef.current = false;
    // one bar count-in
    tRef.current = -song.beatsPerBar * secPerBeat;
    lastBeatRef.current = -99;
    setPhase("playing");
  };

  const finish = useCallback(() => {
    const s = statsRef.current;
    const acc = s.total ? (s.perfeito + s.otimo * 0.8 + s.bom * 0.5) / s.total : 0;
    const stars = acc >= 0.95 ? 5 : acc >= 0.85 ? 4 : acc >= 0.7 ? 3 : acc >= 0.5 ? 2 : acc > 0 ? 1 : 0;
    const res: BestScore = { score: s.score, accuracy: acc, stars, mode: settings.current.mode, date: Date.now() };
    setResult(res);
    saveBest(song.slug, res);
    guideStop.current?.();
    setStats({ ...s });
    setPhase("done");
  }, [song.slug]);

  // ----- main loop -----
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let lastUi = 0;
    let lastTarget: GNote | null = null;

    const judge = (n: GNote, grade: Grade, now: number) => {
      n.status = grade;
      const s = statsRef.current;
      s[grade]++;
      s.done++;
      if (grade === "erro") s.streak = 0;
      else {
        s.streak++;
        s.maxStreak = Math.max(s.maxStreak, s.streak);
        s.score += GRADE_INFO[grade].points * Math.min(4, 1 + Math.floor(s.streak / 10));
      }
      popupsRef.current.push({ text: GRADE_INFO[grade].label, color: GRADE_INFO[grade].color, lane: n.lane, born: now });
    };

    const matches = (n: GNote, freq: number | null): number | null => {
      if (!freq) return null;
      const { a4, tolerance, octaveOk } = settings.current;
      const m = freqToMidi(freq, a4);
      let diff = (m - n.midi) * 100;
      if (octaveOk) diff = ((((diff + 600) % 1200) + 1200) % 1200) - 600;
      return Math.abs(diff) <= tolerance ? diff : null;
    };

    const tick = (now: number) => {
      const dtReal = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { mode, speed } = settings.current;
      const notes = notesRef.current;
      const playing = phaseRef.current === "playing";

      if (playing) {
        const freq = freqRef.current;
        let t = tRef.current;
        const dt = dtReal * speed;

        // count-in clicks
        if (t < 0) {
          const beat = Math.floor(t / secPerBeat);
          if (beat !== lastBeatRef.current) {
            lastBeatRef.current = beat;
            click(beat === -song.beatsPerBar);
          }
        }

        if (mode === "pratica") {
          const next = notes.find((n) => n.status === "pending");
          if (next) {
            if (t + dt >= next.start) {
              t = next.start;
              if (!waitingRef.current) {
                waitingRef.current = true;
                if (settings.current.guide) {
                  guideStop.current?.();
                  guideStop.current = playTone(midiToFreq(next.midi, settings.current.a4), 0.6);
                }
              }
              const c = matches(next, freq);
              if (c != null) {
                next.hold += dtReal;
                next.cents.push(c);
                next.firstMatch ??= now;
                if (next.hold >= 0.09) {
                  waitingRef.current = false;
                  const waited = (now - (next.firstMatch ?? now)) / 1000;
                  judge(next, waited < 0.25 ? "perfeito" : waited < 0.8 ? "otimo" : "bom", now);
                }
              } else {
                next.hold = Math.max(0, next.hold - dtReal);
              }
            } else t += dt;
          } else {
            t += dt;
          }
        } else {
          // desafio: continuous time, judge each note in its window
          t += dt;
          const early = 0.18;
          for (const n of notes) {
            if (n.status !== "pending") continue;
            const winEnd = n.start + Math.max(n.dur * 0.9, 0.2);
            if (t < n.start - early) break;
            if (t > winEnd) {
              judge(n, "erro", now);
              continue;
            }
            const c = matches(n, freq);
            if (c != null) {
              n.hold += dt;
              n.cents.push(c);
              n.firstMatch ??= t;
              if (n.hold >= Math.min(0.12, n.dur * 0.4)) {
                const off = Math.abs(n.firstMatch - n.start) / speed;
                judge(n, off < 0.1 ? "perfeito" : off < 0.2 ? "otimo" : "bom", now);
              }
            }
            break; // only the earliest pending note is active
          }
          if (settings.current.guide) {
            const cur = notes.find((n) => !n.played && t >= n.start && t < n.start + dt + 0.001);
            if (cur) {
              cur.played = true;
              playTone(midiToFreq(cur.midi, settings.current.a4), (cur.dur / speed) * 0.95, 0, 0.12);
            }
          }
        }
        tRef.current = t;

        const tgt = mode === "pratica" ? (notes.find((n) => n.status === "pending") ?? null) : null;
        if (tgt !== lastTarget) {
          lastTarget = tgt;
          setTarget(tgt && { midi: tgt.midi, lane: tgt.lane });
        }

        const lastNote = notes[notes.length - 1];
        if (!lastNote || (statsRef.current.done >= notes.length && t > lastNote.start + lastNote.dur + 0.3)) {
          finish();
        }
        if (now - lastUi > 100) {
          lastUi = now;
          setStats({ ...statsRef.current });
        }
      }

      draw(now);
      raf = requestAnimationFrame(tick);
    };

    const draw = (now: number) => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const dpr = window.devicePixelRatio || 1;
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
      }
      const g = canvas.getContext("2d")!;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);

      const laneW = W / 4;
      const hitY = H - 70;
      const pps = 90 / secPerBeat; // 90 px per beat
      const t = tRef.current;
      const freq = freqRef.current;
      const liveMidi = freq ? freqToMidi(freq, settings.current.a4) : null;
      const liveLane = liveMidi != null ? stringForMidi(Math.round(liveMidi)) : -1;

      // lanes
      STRINGS.forEach((s, i) => {
        const x = i * laneW;
        const grad = g.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, i === liveLane ? `${s.color}40` : `${s.color}14`);
        g.fillStyle = grad;
        g.fillRect(x + 2, 0, laneW - 4, H);
        g.strokeStyle = `${s.color}55`;
        g.lineWidth = 1 + (3 - i) * 0.6; // thicker for lower strings
        g.beginPath();
        g.moveTo(x + laneW / 2, 0);
        g.lineTo(x + laneW / 2, H);
        g.stroke();
      });

      // beat lines
      const beatsVisible = Math.ceil(hitY / (pps * secPerBeat)) + 1;
      const firstBeat = Math.floor(t / secPerBeat);
      for (let b = firstBeat; b < firstBeat + beatsVisible; b++) {
        const y = hitY - (b * secPerBeat - t) * pps;
        const isBar = ((b % song.beatsPerBar) + song.beatsPerBar) % song.beatsPerBar === 0;
        g.strokeStyle = isBar ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.04)";
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(W, y);
        g.stroke();
      }

      // notes
      const notes = notesRef.current;
      g.textAlign = "center";
      g.textBaseline = "middle";
      for (const n of notes) {
        const yBottom = hitY - (n.start - t) * pps;
        const h = Math.max(22, n.dur * pps - 4);
        const yTop = yBottom - h;
        if (yTop > H || yBottom < -10) continue;
        const s = STRINGS[n.lane];
        const x = n.lane * laneW + 8;
        const w = laneW - 16;
        const done = n.status !== "pending";
        const hit = done && n.status !== "erro";
        g.globalAlpha = done ? (hit ? 0.35 : 0.25) : 1;
        g.fillStyle = n.status === "erro" ? "#7f1d1d" : hit ? "#14532d" : s.color;
        roundRect(g, x, yTop, w, h, 10);
        g.fill();
        if (!done && n.hold > 0) {
          g.strokeStyle = "#fff";
          g.lineWidth = 3;
          roundRect(g, x, yTop, w, h, 10);
          g.stroke();
        }
        g.globalAlpha = 1;
        if (!done || yBottom > hitY - 40) {
          const finger = fingerForMidi(n.midi);
          g.fillStyle = done ? "rgba(255,255,255,0.6)" : "#1a1008";
          g.font = "600 15px var(--font-geist-sans), sans-serif";
          const label = `${midiSolfege(n.midi)}${finger != null ? ` · ${finger}` : ""}`;
          g.fillText(label, x + w / 2, yBottom - Math.min(h, 34) / 2);
        }
      }

      // hit line
      g.fillStyle = "rgba(255,255,255,0.08)";
      g.fillRect(0, hitY, W, H - hitY);
      g.strokeStyle = waitingRef.current ? "#e0a458" : "rgba(255,255,255,0.7)";
      g.lineWidth = waitingRef.current ? 4 : 3;
      g.beginPath();
      g.moveTo(0, hitY);
      g.lineTo(W, hitY);
      g.stroke();

      STRINGS.forEach((s, i) => {
        const cx = i * laneW + laneW / 2;
        g.beginPath();
        g.arc(cx, hitY + 32, 18, 0, Math.PI * 2);
        g.fillStyle = i === liveLane ? s.color : "rgba(0,0,0,0.4)";
        g.fill();
        g.strokeStyle = s.color;
        g.lineWidth = 2;
        g.stroke();
        g.fillStyle = i === liveLane ? "#1a1008" : s.color;
        g.font = "700 14px var(--font-geist-sans), sans-serif";
        g.fillText(midiSolfege(s.midi), cx, hitY + 33);
      });

      // count-in
      if (t < 0 && phaseRef.current !== "menu") {
        g.fillStyle = "rgba(255,255,255,0.9)";
        g.font = "700 64px var(--font-fraunces), serif";
        g.fillText(String(Math.ceil(-t / secPerBeat)), W / 2, H / 2 - 40);
      }

      // popups
      popupsRef.current = popupsRef.current.filter((p) => now - p.born < 700);
      for (const p of popupsRef.current) {
        const age = (now - p.born) / 700;
        g.globalAlpha = 1 - age;
        g.fillStyle = p.color;
        g.font = "700 18px var(--font-geist-sans), sans-serif";
        g.fillText(p.text, p.lane * laneW + laneW / 2, hitY - 30 - age * 40);
      }
      g.globalAlpha = 1;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [finish, secPerBeat, song.beatsPerBar]);

  // keyboard: space = pause
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      setPhase((p) => {
        if (p === "playing") stopAll();
        return p === "playing" ? "paused" : p === "paused" ? "playing" : p;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const togglePreview = () => {
    if (previewing) return stopMusic();
    if (typeof parsed === "string") return;
    const spb = secPerBeat / speed;
    for (const n of parsed) {
      if (n.midi != null) playTone(midiToFreq(n.midi, a4), n.beats * spb * 0.95, n.start * spb + 0.1, 0.14);
    }
    setPreviewing(true);
    previewTimer.current = setTimeout(() => setPreviewing(false), (totalBeats(parsed) * spb + 0.5) * 1000);
  };

  const pause = () => {
    stopAll();
    setPhase("paused");
  };

  const quit = () => {
    stopAll();
    setPhase("menu");
  };

  const targetNow = phase === "playing" ? target : null;

  const accuracy = stats.done ? Math.round(((stats.perfeito + stats.otimo + stats.bom) / stats.done) * 100) : 100;

  if (song.copyrighted && !song.notes.trim()) {
    return (
      <div className="card mx-auto max-w-lg space-y-3 p-6 text-center">
        <h1 className="font-display text-2xl">{song.title}</h1>
        <p className="text-muted">
          Esta peça (ou o arranjo usado no livro) ainda é protegida por direitos autorais, então as notas não vêm
          incluídas. Você pode digitá-la a partir do seu livro no editor.
        </p>
        <Link href={`/jogo/editor?titulo=${encodeURIComponent(song.title)}&bpm=${song.bpm}`} className="btn-primary">
          Abrir editor
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/jogo" className="text-sm text-muted hover:text-text">← Músicas</Link>
          <h1 className="font-display text-3xl font-semibold">{song.title}</h1>
          <p className="text-sm text-muted">
            {song.composer} · {!song.slug.startsWith("minha-") ? `Suzuki vol. ${song.volume} · ` : ""}{song.key} · ♩ = {song.bpm}
            {song.excerpt ? ` · ${song.excerpt}` : ""}
          </p>
        </div>
        {best && (
          <div className="text-right text-sm text-muted">
            Recorde: <span className="text-accent">{"★".repeat(best.stars)}{"☆".repeat(5 - best.stars)}</span>{" "}
            <span className="font-mono text-text">{best.score}</span>
          </div>
        )}
      </div>

      {parseError && <p className="rounded-lg bg-bad/10 p-3 text-sm text-bad">Erro nas notas: {parseError}</p>}

      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <div ref={wrapRef} className="card relative h-[68vh] min-h-[420px] overflow-hidden !bg-[#0c0806]">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {phase === "playing" && (
            <div className="pointer-events-none absolute left-3 top-3 flex gap-4 font-mono text-sm">
              <span>{stats.score.toLocaleString("pt-BR")}</span>
              {stats.streak >= 5 && <span className="text-accent">🔥 {stats.streak}</span>}
              <span className="text-muted">{accuracy}%</span>
            </div>
          )}
          {targetNow && (
            <div className="pointer-events-none absolute right-3 top-3 rounded-xl bg-black/60 px-3 py-2 text-right">
              <div className="text-xs text-muted">toque</div>
              <div className="font-display text-2xl" style={{ color: STRINGS[targetNow.lane].color }}>
                {midiSolfege(targetNow.midi)} <span className="text-base text-muted">{midiName(targetNow.midi)}</span>
              </div>
            </div>
          )}

          {phase === "menu" && (
            <Overlay>
              <h2 className="font-display text-2xl">Pronto?</h2>
              <p className="max-w-sm text-sm text-muted">
                As notas descem pelas cordas <b className="text-text">Sol · Ré · Lá · Mi</b>. O número é o dedo sugerido na 1ª
                posição. Toque a nota quando ela chegar na linha.
              </p>
              <div className="flex gap-2">
                <ModeBtn active={mode === "pratica"} onClick={() => setMode("pratica")} title="Prática" sub="espera você acertar" />
                <ModeBtn active={mode === "desafio"} onClick={() => setMode("desafio")} title="Desafio" sub="no ritmo, sem parar" />
              </div>
              <div className="flex gap-2">
                <button className="btn-primary" onClick={startGame} disabled={!!parseError}>▶ Começar</button>
                <button className="btn-ghost" onClick={togglePreview}>{previewing ? "⏹ Parar música" : "🔊 Ouvir a música"}</button>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={guide} onChange={(e) => setGuide(e.target.checked)} className="accent-[var(--accent)]" />
                Tocar o som da música enquanto eu jogo <span className="text-xs text-muted">(use fones)</span>
              </label>
              {mic.error && <p className="text-sm text-bad">Microfone: {mic.error}</p>}
            </Overlay>
          )}
          {phase === "paused" && (
            <Overlay>
              <h2 className="font-display text-2xl">Pausado</h2>
              <div className="flex gap-2">
                <button className="btn-primary" onClick={() => setPhase("playing")}>Continuar</button>
                <button className="btn-ghost" onClick={startGame}>Recomeçar</button>
                <button className="btn-ghost" onClick={quit}>Sair</button>
              </div>
            </Overlay>
          )}
          {phase === "done" && (
            <Overlay>
              <h2 className="font-display text-3xl">Fim!</h2>
              <div className="text-4xl text-accent">
                {"★".repeat(result?.stars ?? 0)}
                {"☆".repeat(5 - (result?.stars ?? 0))}
              </div>
              {result && best && result.date === best.date && result.score > 0 && <p className="text-good">🏆 Novo recorde!</p>}
              <div className="font-mono text-2xl">{stats.score.toLocaleString("pt-BR")} pts</div>
              <div className="grid grid-cols-4 gap-3 text-center text-sm">
                {(["perfeito", "otimo", "bom", "erro"] as Grade[]).map((k) => (
                  <div key={k}>
                    <div className="font-mono text-xl" style={{ color: GRADE_INFO[k].color }}>{stats[k]}</div>
                    <div className="text-muted">{GRADE_INFO[k].label.replace("!", "")}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted">Maior sequência: {stats.maxStreak}</p>
              <div className="flex gap-2">
                <button className="btn-primary" onClick={startGame}>Jogar de novo</button>
                <Link className="btn-ghost" href="/jogo">Outras músicas</Link>
              </div>
            </Overlay>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card p-4">
            <div className="text-xs uppercase tracking-wide text-muted">Ouvindo</div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-display text-2xl">{live?.note ?? "—"}</span>
              {live && (
                <span className={`font-mono text-sm ${Math.abs(live.cents) < 10 ? "text-good" : "text-accent"}`}>
                  {live.cents > 0 ? "+" : ""}{live.cents.toFixed(0)}¢
                </span>
              )}
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-panel-2">
              <div className="h-full bg-accent transition-all" style={{ width: `${stats.total ? (stats.done / stats.total) * 100 : 0}%` }} />
            </div>
            <div className="mt-3 flex gap-2">
              {phase === "playing" ? (
                <>
                  <button className="btn-ghost flex-1 !px-2 !py-1.5 text-sm" onClick={pause}>⏸ Pausar</button>
                  <button className="btn-ghost flex-1 !px-2 !py-1.5 text-sm" onClick={quit}>⏹ Parar</button>
                </>
              ) : mic.status !== "on" ? (
                <button className="btn-ghost w-full !py-1.5 text-sm" onClick={mic.start}>🎤 Testar microfone</button>
              ) : null}
              {targetNow && (
                <button className="btn-ghost !py-1.5 text-sm" title="Ouvir a nota" onClick={() => playTone(midiToFreq(targetNow.midi, a4), 0.8)}>🔊</button>
              )}
            </div>
          </div>

          <div className="card space-y-4 p-4 text-sm">
            <Setting label="Volume">
              <VolumeControl />
            </Setting>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={guide} onChange={(e) => { setGuide(e.target.checked); if (!e.target.checked) stopAll(); }} className="accent-[var(--accent)]" />
              Som da música durante o jogo <span className="text-xs text-muted">(use fones)</span>
            </label>
            {previewing && (
              <button className="btn-ghost w-full !py-1.5" onClick={stopMusic}>⏹ Parar música</button>
            )}
            <Setting label={`Velocidade: ${Math.round(speed * 100)}%`}>
              <input type="range" min={0.4} max={1.3} step={0.05} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            </Setting>
            <Setting label={`Tolerância de afinação: ±${tolerance} cents`}>
              <input type="range" min={15} max={60} step={5} value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            </Setting>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={octaveOk} onChange={(e) => setOctaveOk(e.target.checked)} className="accent-[var(--accent)]" />
              Aceitar oitava diferente
            </label>
            <div className="flex items-center gap-2">
              <span className="text-muted">Lá =</span>
              <input type="number" min={415} max={446} value={a4} onChange={(e) => setA4(Number(e.target.value) || 440)}
                className="w-20 rounded-lg border border-line bg-panel-2 px-2 py-1 font-mono" />
              <span className="text-muted">Hz</span>
            </div>
          </div>

          {song.confidence !== "alta" && (
            <p className="rounded-xl border border-line p-3 text-xs text-muted">
              ⚠️ Transcrição de confiança {song.confidence}. Confira com o seu livro. Se algo estiver diferente, corrija no{" "}
              <Link className="underline" href={`/jogo/editor?de=${song.slug}`}>editor</Link>.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.roundRect(x, y, w, h, Math.min(r, h / 2));
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 p-6 text-center backdrop-blur-sm">
      {children}
    </div>
  );
}

function ModeBtn({ active, onClick, title, sub }: { active: boolean; onClick: () => void; title: string; sub: string }) {
  return (
    <button onClick={onClick}
      className={`rounded-xl border-2 px-4 py-2 text-left transition ${active ? "border-accent bg-accent/10" : "border-line"}`}>
      <div className="font-medium">{title}</div>
      <div className="text-xs text-muted">{sub}</div>
    </button>
  );
}

function Setting({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-muted">{label}</div>
      {children}
    </div>
  );
}
