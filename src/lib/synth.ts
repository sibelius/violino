"use client";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let volume = 0.8;
const voices = new Set<() => void>();

function audio() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = volume;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function out() {
  audio();
  return master!;
}

/** Master volume 0..1 for everything the app plays. */
export function setVolume(v: number) {
  volume = Math.max(0, Math.min(1, v));
  if (ctx && master) master.gain.setTargetAtTime(volume, ctx.currentTime, 0.02);
}

/** Silences every note already playing or scheduled. */
export function stopAll() {
  for (const stop of [...voices]) stop();
  voices.clear();
}

/** Soft string-like tone (sawtooth through a low-pass). Returns a stop function. */
export function playTone(freq: number, duration = 1.2, when = 0, volume = 0.18): () => void {
  const ac = audio();
  const t0 = ac.currentTime + when;
  const osc = ac.createOscillator();
  const osc2 = ac.createOscillator();
  const filter = ac.createBiquadFilter();
  const gain = ac.createGain();
  osc.type = "sawtooth";
  osc2.type = "triangle";
  osc.frequency.value = freq;
  osc2.frequency.value = freq * 1.002;
  filter.type = "lowpass";
  filter.frequency.value = Math.min(freq * 6, 8000);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.04);
  gain.gain.setValueAtTime(volume, t0 + Math.max(0.05, duration - 0.08));
  gain.gain.linearRampToValueAtTime(0, t0 + duration);
  osc.connect(filter);
  osc2.connect(filter);
  filter.connect(gain).connect(out());
  osc.start(t0);
  osc2.start(t0);
  osc.stop(t0 + duration + 0.05);
  osc2.stop(t0 + duration + 0.05);
  const stop = () => {
    voices.delete(stop);
    const now = ac.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(now < t0 ? 0 : gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.05);
    try {
      osc.stop(now + 0.06);
      osc2.stop(now + 0.06);
    } catch {}
  };
  voices.add(stop);
  osc.onended = () => voices.delete(stop);
  return stop;
}

export function click(accent = false) {
  const ac = audio();
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.frequency.value = accent ? 1600 : 1000;
  g.gain.setValueAtTime(0.25, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  osc.connect(g).connect(out());
  osc.start(t);
  osc.stop(t + 0.06);
}
