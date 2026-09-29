"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { detectPitch } from "./pitch";

export interface MicFrame {
  freq: number | null;
  rms: number;
  clarity: number;
  time: number;
}

/**
 * Opens the microphone and runs YIN on every animation frame.
 * `onFrame` is called ~60×/s; use refs inside it, not React state, for speed.
 */
export function useMicPitch(onFrame: (f: MicFrame) => void, sensitivity = 0.01) {
  const [status, setStatus] = useState<"idle" | "starting" | "on" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const cb = useRef(onFrame);
  const sens = useRef(sensitivity);
  useEffect(() => {
    cb.current = onFrame;
    sens.current = sensitivity;
  });

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    ctxRef.current?.close();
    ctxRef.current = null;
    streamRef.current = null;
    setStatus("idle");
  }, []);

  const start = useCallback(async () => {
    if (ctxRef.current) return;
    setStatus("starting");
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 4096;
      src.connect(analyser);
      ctxRef.current = ctx;
      streamRef.current = stream;
      const buf = new Float32Array(analyser.fftSize);
      // median of the last 3 readings removes octave blips
      const hist: number[] = [];
      const loop = () => {
        analyser.getFloatTimeDomainData(buf);
        const r = detectPitch(buf, ctx.sampleRate, { minRms: sens.current });
        let freq: number | null = null;
        if (r) {
          hist.push(r.freq);
          if (hist.length > 3) hist.shift();
          freq = [...hist].sort((a, b) => a - b)[Math.floor(hist.length / 2)];
        } else {
          hist.length = 0;
        }
        cb.current({ freq, rms: r?.rms ?? 0, clarity: r?.clarity ?? 0, time: performance.now() });
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
      setStatus("on");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
    }
  }, []);

  useEffect(() => stop, [stop]);
  return { status, error, start, stop };
}
