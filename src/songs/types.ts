export type Confidence = "alta" | "media" | "baixa";

export interface Song {
  /** kebab-case, unique across all volumes */
  slug: string;
  /** Portuguese display title */
  title: string;
  /** Title as printed in the Suzuki book (usually English) */
  originalTitle: string;
  composer: string;
  volume: 1 | 2 | 3 | 4 | 5;
  /** Order inside the volume (1-based, same order as the book) */
  number: number;
  /** Suggested practice tempo, quarter note = bpm */
  bpm: number;
  beatsPerBar: number;
  key: string;
  /**
   * Melody as whitespace-separated tokens "PITCH:BEATS".
   * PITCH = scientific pitch (C4 = middle C, A4 = 440 Hz), sharps "#", flats "b" (F#5, Bb4) or "r" for rest.
   * BEATS = duration where quarter note = 1 (eighth 0.5, dotted quarter 1.5, half 2, sixteenth 0.25).
   * "|" bar lines are allowed and ignored.
   */
  notes: string;
  /** When only part of the piece is included, e.g. "Tema principal (c. 1–16)" */
  excerpt?: string;
  /** How confident the transcription is */
  confidence: Confidence;
  /** Where the melody was checked (URL of ABC/score) */
  source?: string;
  /**
   * Pieces composed by Shinichi Suzuki (d. 1998) are still under copyright:
   * they are listed but ship with empty notes — the user can type them in the editor.
   */
  copyrighted?: boolean;
}
