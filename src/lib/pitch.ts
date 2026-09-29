/**
 * YIN fundamental-frequency estimator (de Cheveigné & Kawahara, 2002).
 * Tuned for violin: 180 Hz (below G3) … 2.2 kHz.
 */
export function detectPitch(
  buf: Float32Array,
  sampleRate: number,
  opts: { minFreq?: number; maxFreq?: number; threshold?: number; minRms?: number } = {},
): { freq: number; clarity: number; rms: number } | null {
  const { minFreq = 180, maxFreq = 2200, threshold = 0.12, minRms = 0.01 } = opts;

  let rms = 0;
  for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / buf.length);
  if (rms < minRms) return null;

  const maxTau = Math.min(Math.floor(sampleRate / minFreq), Math.floor(buf.length / 2));
  const minTau = Math.max(2, Math.floor(sampleRate / maxFreq));
  const w = buf.length - maxTau;
  const d = new Float32Array(maxTau + 1);

  // difference function
  for (let tau = 1; tau <= maxTau; tau++) {
    let sum = 0;
    for (let i = 0; i < w; i++) {
      const delta = buf[i] - buf[i + tau];
      sum += delta * delta;
    }
    d[tau] = sum;
  }
  // cumulative mean normalized difference
  d[0] = 1;
  let running = 0;
  for (let tau = 1; tau <= maxTau; tau++) {
    running += d[tau];
    d[tau] = running === 0 ? 1 : (d[tau] * tau) / running;
  }

  let tauEst = -1;
  for (let tau = minTau; tau <= maxTau; tau++) {
    if (d[tau] < threshold) {
      while (tau + 1 <= maxTau && d[tau + 1] < d[tau]) tau++;
      tauEst = tau;
      break;
    }
  }
  if (tauEst === -1) return null;

  // parabolic interpolation
  let better = tauEst;
  if (tauEst > 1 && tauEst < maxTau) {
    const s0 = d[tauEst - 1], s1 = d[tauEst], s2 = d[tauEst + 1];
    const denom = 2 * (2 * s1 - s2 - s0);
    if (denom !== 0) better = tauEst + (s2 - s0) / denom;
  }
  return { freq: sampleRate / better, clarity: 1 - d[tauEst], rms };
}
