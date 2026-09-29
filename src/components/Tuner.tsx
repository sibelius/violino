"use client";

import { useRef, useState } from "react";
import { freqToMidi, midiName, midiSolfege, midiToFreq, readPitch, STRINGS } from "@/lib/music";
import { useMicPitch } from "@/lib/useMicPitch";
import { playTone } from "@/lib/synth";

type Mode = "auto" | number; // number = fixed string index

interface View {
  freq: number;
  note: string;
  solfege: string;
  cents: number;
  target: number | null; // string index
}

export default function Tuner() {
  const [a4, setA4] = useState(440);
  const [mode, setMode] = useState<Mode>("auto");
  const [view, setView] = useState<View | null>(null);
  const [inTune, setInTune] = useState(false);
  const smooth = useRef<number | null>(null);
  const inTuneSince = useRef<number | null>(null);
  const lastSeen = useRef(0);
  const stopRef = useRef<(() => void) | null>(null);

  const { status, error, start, stop } = useMicPitch(({ freq, time }) => {
    if (!freq) {
      if (time - lastSeen.current > 1200) {
        smooth.current = null;
        setView(null);
        setInTune(false);
      }
      return;
    }
    lastSeen.current = time;
    const exact = freqToMidi(freq, a4);
    smooth.current = smooth.current == null || Math.abs(smooth.current - exact) > 0.7 ? exact : smooth.current * 0.8 + exact * 0.2;
    const m = smooth.current;

    let target: number | null;
    let cents: number;
    if (mode === "auto") {
      const nearest = STRINGS.reduce((best, s, i) => (Math.abs(s.midi - m) < Math.abs(STRINGS[best].midi - m) ? i : best), 0);
      target = Math.abs(STRINGS[nearest].midi - m) <= 2.5 ? nearest : null;
      cents = target != null ? (m - STRINGS[target].midi) * 100 : readPitch(freq, a4).cents;
    } else {
      target = mode;
      cents = (m - STRINGS[mode].midi) * 100;
    }
    const r = Math.round(m);
    setView({ freq, note: midiName(r), solfege: midiSolfege(r), cents, target });

    const ok = Math.abs(cents) < 5;
    if (ok) {
      inTuneSince.current ??= time;
      setInTune(time - inTuneSince.current > 400);
    } else {
      inTuneSince.current = null;
      setInTune(false);
    }
  });

  const playString = (i: number) => {
    stopRef.current?.();
    stopRef.current = playTone(midiToFreq(STRINGS[i].midi, a4), 2.5);
  };

  const cents = view ? Math.max(-50, Math.min(50, view.cents)) : 0;
  const angle = (cents / 50) * 60;
  const color = !view ? "var(--muted)" : Math.abs(view.cents) < 5 ? "var(--good)" : Math.abs(view.cents) < 15 ? "var(--accent)" : "var(--bad)";
  const targetString = view?.target != null ? STRINGS[view.target] : null;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold">Afinador</h1>
        <p className="text-sm text-muted">Toque uma corda solta. O ponteiro mostra se está alto (♯) ou baixo (♭).</p>
      </div>

      <div className={`card relative overflow-hidden p-6 transition ${inTune ? "border-good shadow-[0_0_60px_-10px_var(--good)]" : ""}`}>
        <svg viewBox="-110 -110 220 130" className="w-full">
          {Array.from({ length: 21 }, (_, i) => {
            const c = -50 + i * 5;
            const a = ((c / 50) * 60 - 90) * (Math.PI / 180);
            const big = c % 25 === 0;
            const r1 = big ? 78 : 84;
            return (
              <line key={c} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * 92} y2={Math.sin(a) * 92}
                stroke={c === 0 ? "var(--good)" : "var(--line)"} strokeWidth={big ? 2.5 : 1.2} strokeLinecap="round" />
            );
          })}
          <path d="M -9.6 -91.5 A 92 92 0 0 1 9.6 -91.5" stroke="var(--good)" strokeWidth="6" fill="none" opacity="0.5" />
          <text x="-98" y="8" fill="var(--muted)" fontSize="11" textAnchor="middle">♭</text>
          <text x="98" y="8" fill="var(--muted)" fontSize="11" textAnchor="middle">♯</text>
          <g style={{ transform: `rotate(${angle}deg)`, transition: "transform 90ms linear" }}>
            <line x1="0" y1="0" x2="0" y2="-88" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </g>
          <circle r="6" fill={color} />
        </svg>

        <div className="-mt-2 text-center">
          <div className="font-display text-7xl font-semibold leading-none" style={{ color }}>
            {targetString ? targetString.note.replace(/\d/, "") : view ? view.note.replace(/-?\d/, "") : "–"}
          </div>
          <div className="mt-1 text-muted">
            {view ? (
              <>
                {targetString ? `corda ${midiSolfege(targetString.midi)} (${targetString.note})` : `${view.solfege} · ${view.note}`}
                {" · "}
                <span className="font-mono">{view.cents > 0 ? "+" : ""}{view.cents.toFixed(0)} cents</span>
                {" · "}
                <span className="font-mono">{view.freq.toFixed(1)} Hz</span>
              </>
            ) : status === "on" ? "Ouvindo…" : "Microfone desligado"}
          </div>
          <div className="mt-2 h-6 text-sm font-medium">
            {inTune ? <span className="text-good">✓ Afinado!</span> : view && targetString ? (
              <span style={{ color }}>{view.cents < 0 ? "Aperte (suba) a corda ↑" : "Afrouxe (desça) a corda ↓"}</span>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          {status === "on" ? (
            <button className="btn-ghost" onClick={stop}>⏹ Parar microfone</button>
          ) : (
            <button className="btn-primary" onClick={start} disabled={status === "starting"}>🎤 Ligar microfone</button>
          )}
        </div>
        {error && <p className="mt-3 text-center text-sm text-bad">Não foi possível acessar o microfone: {error}</p>}
      </div>

      <div className="card space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Corda</span>
          <button onClick={() => setMode("auto")}
            className={`rounded-full px-3 py-1 text-sm ${mode === "auto" ? "bg-accent text-[#1a1008]" : "bg-panel-2"}`}>
            Automático
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {STRINGS.map((s, i) => {
            const active = mode === i || (mode === "auto" && view?.target === i);
            return (
              <div key={s.name} className="flex flex-col gap-1">
                <button onClick={() => setMode(i)}
                  className="rounded-xl border-2 py-3 text-center transition"
                  style={{ borderColor: active ? s.color : "var(--line)", background: active ? `${s.color}22` : undefined }}>
                  <div className="font-display text-2xl font-semibold">{midiSolfege(s.midi)}</div>
                  <div className="font-mono text-xs text-muted">{s.note}</div>
                </button>
                <button onClick={() => playString(i)} className="rounded-lg bg-panel-2 py-1 text-xs hover:brightness-125" title="Ouvir nota de referência">
                  🔊 ouvir
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3 border-t border-line pt-4 text-sm">
          <span className="text-muted">Lá (A4) =</span>
          <button className="btn-ghost !px-3 !py-1" onClick={() => setA4((v) => Math.max(415, v - 1))}>−</button>
          <span className="w-16 text-center font-mono">{a4} Hz</span>
          <button className="btn-ghost !px-3 !py-1" onClick={() => setA4((v) => Math.min(446, v + 1))}>+</button>
          <button className="ml-auto text-xs text-muted underline" onClick={() => setA4(440)}>padrão 440</button>
        </div>
      </div>
    </div>
  );
}
