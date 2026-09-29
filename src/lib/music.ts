export const A4_DEFAULT = 440;

const NOTE_INDEX: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const SHARP_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SOLFEGE = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"];

/** "F#5" -> MIDI number (C4 = 60, A4 = 69). */
export function noteToMidi(note: string): number {
  const m = /^([A-Ga-g])(#{1,2}|b{1,2})?(-?\d)$/.exec(note.trim());
  if (!m) throw new Error(`Nota inválida: ${note}`);
  const [, letter, acc = "", octave] = m;
  const shift = acc.startsWith("#") ? acc.length : -acc.length;
  return (Number(octave) + 1) * 12 + NOTE_INDEX[letter.toUpperCase()] + shift;
}

export function midiToFreq(midi: number, a4 = A4_DEFAULT): number {
  return a4 * 2 ** ((midi - 69) / 12);
}

export function freqToMidi(freq: number, a4 = A4_DEFAULT): number {
  return 69 + 12 * Math.log2(freq / a4);
}

export function midiName(midi: number): string {
  const r = Math.round(midi);
  return `${SHARP_NAMES[((r % 12) + 12) % 12]}${Math.floor(r / 12) - 1}`;
}

export function midiSolfege(midi: number): string {
  return SOLFEGE[((Math.round(midi) % 12) + 12) % 12];
}

export interface PitchReading {
  freq: number;
  midi: number; // nearest semitone
  cents: number; // -50..+50 from nearest semitone
}

export function readPitch(freq: number, a4 = A4_DEFAULT): PitchReading {
  const exact = freqToMidi(freq, a4);
  const midi = Math.round(exact);
  return { freq, midi, cents: (exact - midi) * 100 };
}

// ---- Violin -----------------------------------------------------------------

export type ViolinString = "G" | "D" | "A" | "E";
export const STRINGS: { name: ViolinString; note: string; midi: number; color: string }[] = [
  { name: "G", note: "G3", midi: 55, color: "#f97316" },
  { name: "D", note: "D4", midi: 62, color: "#eab308" },
  { name: "A", note: "A4", midi: 69, color: "#22c55e" },
  { name: "E", note: "E5", midi: 76, color: "#3b82f6" },
];

/** Lane (0=G … 3=E) where a note is normally played in first position. */
export function stringForMidi(midi: number): number {
  if (midi < 62) return 0;
  if (midi < 69) return 1;
  if (midi < 76) return 2;
  return 3;
}

/** Approximate first-position finger (0 = open string) — a hint, not a fingering. */
export function fingerForMidi(midi: number): number | null {
  const lane = stringForMidi(midi);
  const semis = midi - STRINGS[lane].midi;
  if (semis < 0) return null;
  if (semis === 0) return 0;
  if (semis <= 2) return 1;
  if (semis <= 4) return 2;
  if (semis <= 6) return 3;
  if (semis === 7) return 4;
  return null; // higher position
}

// ---- Song parsing -------------------------------------------------------------

export interface ParsedNote {
  midi: number | null; // null = rest
  start: number; // beats
  beats: number;
}

export function parseNotes(src: string): ParsedNote[] {
  const out: ParsedNote[] = [];
  let t = 0;
  for (const raw of src.split(/\s+/)) {
    const tok = raw.trim();
    if (!tok || tok === "|" || tok === "||") continue;
    const [pitch, dur = "1"] = tok.replace(/\|/g, "").split(":");
    if (!pitch) continue;
    const beats = Number(dur);
    if (!Number.isFinite(beats) || beats <= 0) throw new Error(`Duração inválida em "${tok}"`);
    const midi = pitch.toLowerCase() === "r" ? null : noteToMidi(pitch);
    out.push({ midi, start: t, beats });
    t += beats;
  }
  return out;
}

export function totalBeats(notes: ParsedNote[]): number {
  const last = notes[notes.length - 1];
  return last ? last.start + last.beats : 0;
}
