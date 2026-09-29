// Suzuki Violin School, Volume 2 — melodias (tokens "PITCH:BEATS", ver types.ts).
// Arranjos/variações de Suzuki protegidos são listados com notes vazias ou só o tema.

import type { Song } from "./types";

export const volume2: Song[] = [
  {
    slug: "chorus-judas-maccabaeus",
    title: "Coro de \"Judas Macabeu\"",
    originalTitle: "Chorus from \"Judas Maccabaeus\"",
    composer: "G. F. Händel",
    volume: 2,
    number: 1,
    bpm: 84,
    beatsPerBar: 4,
    key: "Sol maior",
    notes: `
      D5:2 B4:1.5 C5:0.5 | D5:2 G4:2 | A4:0.5 B4:0.5 C5:0.5 D5:0.5 C5:1 B4:1 | A4:3 r:1 | B4:0.5 C5:0.5 D5:0.5 E5:0.5 D5:1 D5:1 |
      G5:2 D5:2 | C5:1 B4:1 A4:1.5 G4:0.5 | G4:3 r:1 | B4:0.5 A4:0.5 B4:0.5 C5:0.5 B4:1 B4:1 | A4:2 G4:2 |
      C5:1 B4:1 A4:1 G4:1 | F#4:3 r:1 | E5:0.5 D#5:0.5 E5:0.5 F#5:0.5 E5:1 F#5:1 | G5:2 E5:2 | F#5:1 E5:0.5 D5:0.5 C#5:1.5 D5:0.5 |
      D5:3 r:1 | D5:2 B4:1.5 C5:0.5 | D5:2 G4:2 | A4:0.5 B4:0.5 C5:0.5 D5:0.5 C5:1 B4:1 | A4:3 r:1 |
      B4:0.5 C5:0.5 D5:0.5 E5:0.5 D5:1 D5:1 | G5:2 D5:2 | C5:1 B4:1 A4:1.5 G4:0.5 | G4:3 r:1
    `,
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-2-Violin.ly",
  },
  {
    slug: "musette",
    title: "Musette",
    originalTitle: "Musette",
    composer: "J. S. Bach (BWV 808)",
    volume: 2,
    number: 2,
    bpm: 88,
    beatsPerBar: 4,
    key: "Ré maior",
    notes: `
      A4:1 B4:0.5 G4:0.5 | A4:1 D5:0.5 E5:0.5 F#5:1 E5:0.5 C#5:0.5 | D5:1 A4:1 D5:1 E5:0.5 C#5:0.5 |
      D5:0.5 E5:0.5 F#5:0.5 G5:0.5 A5:0.5 F#5:0.5 G5:0.5 E5:0.5 | F#5:2 | A4:1 B4:0.5 G4:0.5 | A4:1 D5:0.5 E5:0.5 F#5:1 E5:0.5 C#5:0.5 |
      D5:1 A4:1 D5:1 E5:0.5 C#5:0.5 | D5:0.5 E5:0.5 F#5:0.5 G5:0.5 A5:0.5 F#5:0.5 G5:0.5 E5:0.5 | F#5:2 |
      A5:1 B5:0.5 G5:0.5 | A5:1 G5:0.5 E5:0.5 F#5:0.5 D5:0.5 E5:0.5 C#5:0.5 | D5:1 A4:1 B4:0.5 A4:0.5 D5:0.5 A4:0.5 |
      B4:0.5 A4:0.5 D5:0.5 A4:0.5 B4:0.5 A4:0.5 E5:1 | E5:2 E5:1 F#5:0.5 D5:0.5 | G5:1 F#5:0.5 D5:0.5 B5:0.5 G5:0.5 A5:0.5 F#5:0.5 |
      G5:0.5 F#5:0.5 E5:0.5 D5:0.5 E5:0.5 F#5:0.5 G5:0.5 F#5:0.5 | E5:0.5 D5:0.5 C#5:0.5 D5:0.5 E5:0.5 D5:0.5 C#5:0.5 B4:0.5 |
      A4:2 A4:1 B4:0.5 G4:0.5 | A4:1 D5:0.5 E5:0.5 F#5:1 E5:0.5 C#5:0.5 | D5:1 A4:1 F#5:0.5 C#5:0.5 D5:0.5 A4:0.5 |
      A5:0.5 C#5:0.5 D5:0.5 A4:0.5 F#5:0.5 C#5:0.5 D5:0.5 A4:0.5 | D5:2
    `,
    confidence: "alta",
    source: "https://violinlab.com/wp-content/uploads/2024/08/2._Sudzuki_2_-_Musette_-_Full_Score.pdf",
  },
  {
    slug: "hunters-chorus",
    title: "Coro dos Caçadores",
    originalTitle: "Hunters' Chorus",
    composer: "C. M. von Weber",
    volume: 2,
    number: 3,
    bpm: 84,
    beatsPerBar: 2,
    key: "Sol maior",
    notes: `
      D4:0.5 | G4:1 G4:0.25 A4:0.25 B4:0.25 C5:0.25 | D5:1 B4:1 | A4:0.5 D5:0.5 A4:0.5 D5:0.5 | B4:0.25 C5:0.25 B4:0.25 A4:0.25 G4:0.5 D4:0.5 |
      G4:1 G4:0.25 A4:0.25 B4:0.25 C5:0.25 | D5:1 B4:1 | A4:0.5 D5:0.5 F#5:0.5 E5:0.5 | D5:1 r:0.5 A4:0.5 |
      B4:1 B4:0.5 B4:0.5 | G4:1 G4:0.5 G4:0.5 | C5:1 C5:0.5 C5:0.5 | A4:1 A4:0.5 A4:0.5 | B4:1 B4:0.5 B4:0.5 |
      G4:1 G4:0.5 G4:0.5 | C5:1 C5:0.5 C5:0.5 | A4:1.5 | A4:0.5 | B4:1 B4:0.5 B4:0.5 | C5:1 B4:0.5 B4:0.5 |
      A4:1 A4:0.5 A4:0.5 | B4:1 G4:1 | B4:1 B4:0.5 B4:0.5 | C5:1 B4:1 | A4:1 A4:0.5 A4:0.5 | G4:1.5
    `,
    excerpt: "Seções A e B (sem repetições e sem a coda)",
    confidence: "media",
    source: "abcnotation.com — \"Hunters Chorus to Der Freischutz TS.212\" (via github.com/baobach/abc_search)",
  },
  {
    slug: "long-long-ago-variacao",
    title: "Há Muito Tempo (com Variação)",
    originalTitle: "Long, Long Ago",
    composer: "T. H. Bayly / S. Suzuki (variação)",
    volume: 2,
    number: 4,
    bpm: 80,
    beatsPerBar: 4,
    key: "Sol maior",
    notes: `
      G4:1 G4:0.5 A4:0.5 B4:1 B4:0.5 C5:0.5 | D5:1 E5:0.5 D5:0.5 B4:2 | D5:1 C5:0.5 B4:0.5 A4:2 | C5:1 B4:0.5 A4:0.5 G4:2 |
      G4:1 G4:0.5 A4:0.5 B4:1 B4:0.5 C5:0.5 | D5:1 E5:0.5 D5:0.5 B4:2 | D5:1 C5:0.5 B4:0.5 A4:1 B4:0.5 A4:0.5 |
      G4:2 r:2 | D5:1 C5:0.5 B4:0.5 A4:1 D4:0.5 D4:0.5 | C5:1 B4:0.5 A4:0.5 G4:2 | D5:1 C5:0.5 B4:0.5 A4:1 D4:0.5 D4:0.5 |
      C5:1 B4:0.5 A4:0.5 G4:2 | G4:1 G4:0.5 A4:0.5 B4:1 B4:0.5 C5:0.5 | D5:1 E5:0.5 D5:0.5 B4:2 | D5:1 C5:0.5 B4:0.5 A4:1 B4:0.5 A4:0.5 |
      G4:2 r:2
    `,
    excerpt: "Somente o tema (a variação é de Suzuki, protegida por direitos autorais)",
    confidence: "media",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
  {
    slug: "waltz-brahms",
    title: "Valsa",
    originalTitle: "Waltz",
    composer: "J. Brahms (Op. 39 n.º 15)",
    volume: 2,
    number: 5,
    bpm: 100,
    beatsPerBar: 3,
    key: "Sol maior",
    notes: `
      B4:1.5 G4:0.5 G4:0.5 B4:0.5 | B4:1.5 G4:0.5 G4:0.5 B4:0.5 | C5:1 B4:1 A4:1 | B4:1.5 G4:0.5 G4:0.5 D5:0.5 |
      E5:1.5 B4:0.5 B4:0.5 D5:0.5 | E5:1.5 B4:0.5 B4:0.5 D5:0.5 | F#5:0.5 E5:0.5 D5:1 C#5:1 | D5:1.5 F#4:0.5 F#4:0.5 B4:0.5 |
      B4:1.5 G4:0.5 G4:0.5 B4:0.5 | B4:1.5 G4:0.5 G4:0.5 B4:0.5 | C5:1 B4:1 A4:1 | B4:1.5 G4:0.5 G4:0.5 D5:0.5 |
      E5:1.5 B4:0.5 B4:0.5 D5:0.5 | E5:1.5 B4:0.5 B4:0.5 D5:0.5 | F#5:0.5 E5:0.5 D5:1 C#5:1 | D5:1.5 B4:0.5 B4:0.5 D5:0.5 |
      D5:1.5 A4:0.5 A4:0.5 D5:0.5 | D5:1.5 B4:0.5 B4:0.5 D5:0.5 | G5:1.5 D5:0.5 D5:0.5 G5:0.5 | G5:1.5 E5:0.5 E5:0.5 G5:0.5 |
      A5:1.5 E5:0.5 E5:0.5 G5:0.5 | G5:0.5 F#5:0.5 E5:1 D5:1 | B4:1.5 G4:0.5 G4:0.5 B4:0.5 | B4:1.5 G4:0.5 G4:0.5 B4:0.5 |
      C5:1 B4:1 A4:1 | B4:1.5 G4:0.5 G4:0.5 D5:0.5 | E5:1.5 B4:0.5 B4:0.5 D5:0.5 | E5:1.5 B4:0.5 B4:0.5 D5:0.5 |
      G5:0.5 D5:0.5 C5:1 A4:1 | G4:1 r:2
    `,
    excerpt: "Sem as apojaturas (grace notes)",
    confidence: "media",
    source: "abcnotation.com — \"Waltz Op.39 No.15\" (piano, Lá bemol, transposto) via github.com/baobach/abc_search",
  },
  {
    slug: "bourree-handel",
    title: "Bourrée",
    originalTitle: "Bourrée",
    composer: "G. F. Händel",
    volume: 2,
    number: 6,
    bpm: 92,
    beatsPerBar: 4,
    key: "Sol maior",
    notes: `
      D5:1 | D5:1 B4:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | E5:1 G5:2 F#5:0.5 E5:0.5 | D5:1 C5:0.5 B4:0.5 A4:0.5 B4:0.5 C5:0.5 A4:0.5 |
      B4:1 G4:2 A4:1 | B4:0.5 C#5:0.5 D5:0.5 B4:0.5 C5:0.5 D5:0.5 E5:0.5 C5:0.5 | D5:0.5 E5:0.5 F#5:0.5 D5:0.5 E5:0.5 F#5:0.5 G5:0.5 E5:0.5 |
      F#5:0.5 G5:0.5 A5:1 A4:1 C#5:1 | D5:3 D5:1 | D5:1 B4:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | E5:1 G5:2 F#5:0.5 E5:0.5 |
      D5:1 C5:0.5 B4:0.5 A4:0.5 B4:0.5 C5:0.5 A4:0.5 | B4:1 G4:2 A4:1 | B4:0.5 C#5:0.5 D5:0.5 B4:0.5 C5:0.5 D5:0.5 E5:0.5 C5:0.5 |
      D5:0.5 E5:0.5 F#5:0.5 D5:0.5 E5:0.5 F#5:0.5 G5:0.5 E5:0.5 | F#5:0.5 G5:0.5 A5:1 A4:1 C#5:1 | D5:3 A5:1 |
      A5:1 F#5:1 G5:0.5 F#5:0.5 E5:0.5 D5:0.5 | G5:1 B5:2 F#5:1 | D#5:1 E5:1 F#5:1 G5:0.5 A5:0.5 | G5:1 E5:2 D5:1 |
      D5:1 C5:0.5 B4:0.5 C5:1 C5:1 | C5:1 B4:0.5 A4:0.5 B4:1 D5:1 | E5:0.5 F#5:0.5 G5:0.5 D5:0.5 C5:0.5 B4:0.5 A4:0.5 G4:0.5 |
      F#4:0.5 G4:0.5 A4:0.5 F#4:0.5 D4:1 D5:1 | D5:1 B4:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | E5:1 G5:2 F#5:0.5 E5:0.5 |
      D5:1 C5:0.5 B4:0.5 A4:0.5 B4:0.5 C5:0.5 A4:0.5 | B4:1 G4:2 F#4:1 | G4:0.5 A4:0.5 B4:0.5 G4:0.5 A4:0.5 B4:0.5 C5:0.5 A4:0.5 |
      B4:0.5 C5:0.5 D5:0.5 B4:0.5 C5:0.5 D5:0.5 E5:0.5 C5:0.5 | D5:1 G5:1 B4:1 A4:0.5 G4:0.5 | G4:3
    `,
    excerpt: "A, A, B, A (sem a repetição final)",
    confidence: "media",
    source: "abcnotation.com — \"Bourree, G.F. Haendel\" (violino/violoncelo, Dó maior, transposto) via github.com/baobach/abc_search",
  },
  {
    slug: "the-two-grenadiers",
    title: "Os Dois Granadeiros",
    originalTitle: "The Two Grenadiers",
    composer: "R. Schumann",
    volume: 2,
    number: 7,
    bpm: 88,
    beatsPerBar: 4,
    key: "Ré menor / Ré maior",
    notes: `
      A4:1 D5:1 D5:0.75 E5:0.25 F5:0.75 G5:0.25 | E5:0.75 F5:0.25 D5:3 | A4:1 D5:1 D5:0.75 E5:0.25 F5:1 |
      E5:1 D5:2 r:1 | F5:1 E5:1 D5:1 C#5:1 | B4:0.75 B4:0.25 A4:3 | A4:1 D5:1 D5:0.75 E5:0.25 F5:1 |
      E5:1 D5:2 r:1 | A5:1 G5:1 F5:1 E5:1 | D5:1 A4:1 A4:2 | A4:1 Bb4:1.5 Bb4:0.5 Bb4:0.5 Bb4:0.5 |
      C5:0.5 G4:0.5 A4:3 | A4:1 G4:1.5 G4:0.5 A4:1.5 E4:0.5 F4:1 F4:2 | F4:1 G4:1 G4:0.5 G4:0.5 C5:1.5 C5:0.5 A4:1 A4:1 D5:1.5 D5:0.5 D5:1 D5:0.5 D5:0.5 D5:1.5 D5:0.5 C#5:1 E5:2 |
      A4:1 A4:1.5 A4:0.5 A4:0.5 A4:0.5 | A4:0.5 D5:0.5 C#5:1 E5:2 | A4:1 A4:1 A4:0.5 A4:0.5 A4:1 | D5:1 C#5:1 A4:1 r:1 |
      A4:1 D5:1 D5:1 E5:1 | E5:1 A5:1.5 F#5:0.5 D5:1 | D5:1 B4:1 G5:1 F#5:1 | E5:1 D5:2.5 r:0.5 | A4:1 D5:1 D5:1 E5:1 |
      E5:1 A5:1.5 F#5:0.5 D5:1 | D5:1 B4:1 G5:1 F#5:1 | E5:1 D5:2.5 r:0.5 | D5:0.5 E5:0.5 F#5:1 F#5:0.75 F#5:0.25 G5:0.5 F#5:0.5 |
      E5:0.5 D5:0.5 E5:1 E5:0.75 E5:0.25 E5:1 | E5:0.5 F#5:0.5 G5:1 G5:0.75 G5:0.25 A5:0.5 G5:0.5 |
      F#5:0.5 E5:0.5 F#5:1 F#5:0.75 F#5:0.25 F#5:1 | A5:1 A5:1 F#5:0.5 D5:0.5 A5:1 | F#5:0.5 D5:0.5 A5:1 A4:2 |
      A4:1 D5:1 D5:1 E5:1 | E5:1 A5:1.5 F#5:0.5 D5:1 | D5:1 B4:1 G5:0.75 G5:0.25 F#5:1 | E5:1 D5:3 |
      r:1
    `,
    confidence: "alta",
    source: "https://violinlab.com/wp-content/uploads/2024/08/7._Sudzuki_2_-_The_Two_Grenadiers_-_Full_Score.pdf",
  },
  {
    slug: "witches-dance",
    title: "Tema da \"Dança das Bruxas\"",
    originalTitle: "Theme from \"Witches' Dance\"",
    composer: "N. Paganini",
    volume: 2,
    number: 8,
    bpm: 66,
    beatsPerBar: 2,
    key: "Ré maior",
    notes: `
      F#5:0.75 E5:0.25 D5:0.75 C#5:0.25 | D5:0.5 r:0.5 A4:1 | G5:0.75 F#5:0.25 E5:0.75 D#5:0.25 | E5:0.5 r:0.5 A4:1 |
      F#5:0.75 E5:0.25 D5:0.75 C#5:0.25 | B4:0.5 r:0.5 E5:1 | A4:0.3333 C#5:0.3333 E5:0.3333 A5:0.3333 E5:0.3333 C#5:0.3333 |
      A4:1 r:1 | F#5:0.75 E5:0.25 D5:0.75 C#5:0.25 | D5:0.5 r:0.5 A4:1 | G5:0.75 F#5:0.25 E5:0.75 D#5:0.25 |
      E5:0.5 r:0.5 A4:1 | F#5:0.75 E5:0.25 D5:0.75 C#5:0.25 | B4:0.5 r:0.5 C#5:1 | D5:0.3333 F#4:0.3333 A4:0.3333 D5:0.3333 A4:0.3333 F#4:0.3333 |
      D4:1 r:1 | A5:0.3333 E5:0.3333 C#5:0.3333 A4:0.3333 C#5:0.3333 E5:0.3333 | A5:1 r:1 | D5:0.3333 A4:0.3333 F#4:0.3333 D4:0.3333 F#4:0.3333 A4:0.3333 |
      D5:1 r:1 | B5:0.3333 G#5:0.3333 E5:0.3333 B4:0.3333 E5:0.3333 G#5:0.3333 | B5:1 G#5:1 | A5:0.3333 E5:0.3333 C#5:0.3333 A4:0.3333 C#5:0.3333 E5:0.3333 |
      A5:1 r:1 | A5:0.75 G5:0.25 F5:0.75 E5:0.25 | F5:1 C5:1 | Bb5:0.75 A5:0.25 G5:0.75 F#5:0.25 | G5:1 A5:1 |
      F5:0.75 E5:0.25 D5:0.75 C#5:0.25 | D5:1 E5:1 | A4:2 | F#5:0.75 E5:0.25 D5:0.75 C#5:0.25 | D5:0.5 r:0.5 A4:1 |
      G5:0.75 F#5:0.25 E5:0.75 D#5:0.25 | E5:0.5 r:0.5 A4:1 | F#5:0.75 E5:0.25 D5:0.75 C#5:0.25 | B4:0.75 E5:0.25 G5:0.3333 A5:0.3333 B5:0.3333 |
      F#5:0.3333 A5:0.3333 G5:0.3333 F#5:0.3333 E5:0.3333 D5:0.3333 | C#5:0.3333 B4:0.3333 A4:0.3333 G4:0.3333 F#4:0.3333 E4:0.3333 |
      D4:0.3333 F#4:0.3333 A4:0.3333 D5:0.3333 A4:0.3333 F#4:0.3333 | D4:1 r:1
    `,
    confidence: "alta",
    source: "https://violinlab.com/wp-content/uploads/2024/08/8._Sudzuki_2_-_Witches_Dance_-_Full_Score.pdf",
  },
  {
    slug: "gavotte-mignon",
    title: "Gavota de \"Mignon\"",
    originalTitle: "Gavotte from \"Mignon\"",
    composer: "A. Thomas",
    volume: 2,
    number: 9,
    bpm: 80,
    beatsPerBar: 2,
    key: "Sol maior",
    notes: `
      A4:0.5 D5:0.5 | B4:0.5 G4:0.5 D4:0.5 A4:0.5 | G4:1 A4:0.25 B4:0.25 D5:0.25 C5:0.25 | B4:0.25 C5:0.25 D5:0.25 E5:0.25 C5:0.25 D5:0.25 F#5:0.25 E5:0.25 |
      D5:1 D5:0.5 G5:0.5 | F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 | F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 |
      D5:0.25 E5:0.25 C5:0.5 C5:0.25 D5:0.25 B4:0.5 | G#4:1 A4:0.5 D5:0.5 | B4:0.5 G4:0.5 D4:0.5 A4:0.5 |
      G4:1 A4:0.25 B4:0.25 D5:0.25 C5:0.25 | B4:0.25 C5:0.25 D5:0.25 E5:0.25 C5:0.25 D5:0.25 F#5:0.25 E5:0.25 |
      D5:1 D5:0.5 G5:0.5 | F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 | F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 |
      B4:0.5 B4:0.25 D5:0.25 A4:0.5 A4:0.25 B4:0.25 | G4:1 A4:0.5 G5:0.5 | F#5:0.5 D5:0.5 C#5:0.5 E5:0.5 |
      D5:1 B4:0.25 D5:0.25 C#5:0.25 E5:0.25 | E5:0.25 D5:0.25 F#4:0.25 B4:0.25 A4:0.5 E4:0.5 | G4:0.5 F#4:0.25 r:0.25 A4:0.5 A5:0.5 |
      F#5:0.5 D5:0.1667 E5:0.1667 D5:0.1667 C#5:0.5 E5:0.5 | D5:1 B4:0.25 D5:0.25 C#5:0.25 E5:0.25 |
      A4:1 Bb4:0.25 D5:0.25 C#5:0.25 E5:0.25 | A4:0.5 G4:0.25 Bb4:0.25 A4:0.25 Bb4:0.25 G4:0.25 Bb4:0.25 |
      A4:0.25 Bb4:0.25 G4:0.25 Bb4:0.25 A4:0.25 Bb4:0.25 G4:0.25 Bb4:0.25 | A4:0.25 B4:0.25 A4:0.25 B4:0.25 A4:0.25 B4:0.25 A4:0.25 B4:0.25 |
      A4:0.25 B4:0.25 A4:0.25 B4:0.25 A4:0.5 D5:0.5 | B4:0.5 G4:0.5 D4:0.5 A4:0.5 | G4:1 A4:0.25 B4:0.25 D5:0.25 C5:0.25 |
      B4:0.25 C5:0.25 D5:0.25 E5:0.25 C5:0.25 D5:0.25 F#5:0.25 E5:0.25 | D5:1 D5:0.5 G5:0.5 | F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 |
      F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 | B4:0.5 B4:0.25 D5:0.25 A4:0.5 A4:0.25 B4:0.25 |
      G4:1 D5:0.5 G5:0.25 r:0.25 | F5:1 C5:0.25 D5:0.25 Eb5:0.25 F5:0.25 | Eb5:0.25 D5:0.25 C5:0.25 D5:0.25 F4:0.5 F4:0.25 Bb4:0.25 |
      G4:0.5 G4:0.25 C5:0.25 A4:0.5 A4:0.25 D5:0.25 | Bb4:0.25 A4:0.25 Bb4:0.25 C5:0.25 D5:0.5 G5:0.25 r:0.25 |
      F5:1 C5:0.25 D5:0.25 Eb5:0.25 F5:0.25 | Eb5:0.25 D5:0.25 C5:0.25 D5:0.25 F4:0.5 F4:0.25 Bb4:0.25 |
      G4:0.5 G4:0.25 C5:0.25 A4:0.5 A4:0.25 D5:0.25 | Bb4:0.5 A4:0.25 C5:0.25 Bb4:0.25 C5:0.25 A4:0.25 C5:0.25 |
      Bb4:0.25 C5:0.25 A4:0.25 C5:0.25 Bb4:0.25 C5:0.25 A4:0.25 C5:0.25 | Bb4:0.25 C5:0.25 Bb4:0.25 C5:0.25 Bb4:0.25 C5:0.25 Bb4:0.25 C5:0.25 |
      A4:0.25 B4:0.25 A4:0.25 B4:0.25 A4:0.5 D5:0.5 | B4:0.5 G4:0.5 D4:0.5 A4:0.5 | G4:1 A4:0.25 B4:0.25 D5:0.25 C5:0.25 |
      B4:0.25 C5:0.25 D5:0.25 E5:0.25 C5:0.25 D5:0.25 F#5:0.25 E5:0.25 | D5:1 D5:0.5 G5:0.5 | F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 |
      F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 | D5:0.25 E5:0.25 C5:0.5 C5:0.25 D5:0.25 B4:0.5 |
      G#4:1 A4:0.5 D5:0.5 | B4:0.5 G4:0.5 D4:0.5 A4:0.5 | G4:1 A4:0.25 B4:0.25 D5:0.25 C5:0.25 | B4:0.25 C5:0.25 D5:0.25 E5:0.25 C5:0.25 D5:0.25 F#5:0.25 E5:0.25 |
      D5:1 D5:0.5 G5:0.5 | F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 | F#5:0.125 G5:0.125 F#5:0.125 G5:0.125 F#5:0.25 E5:0.25 D5:0.5 G5:0.5 |
      r:2 | B4:0.5 B4:0.25 D5:0.25 A4:0.5 A4:0.25 B4:0.25 | G4:1 D4:0.5 G4:0.5 | E4:0.5 C4:0.5 G3:0.5 D4:0.5 |
      C4:1 A4:0.5 D5:0.5 | B4:0.5 G4:0.5 D4:0.5 A4:0.5 | G4:0.5 D5:0.5 B4:0.5 D5:0.5 | E5:0.5 D5:0.5 B4:0.5 D5:0.5 |
      E5:0.5 D5:0.5 B4:0.5 D5:0.5 | E5:0.5 r:0.5 F#5:0.5 r:0.5 | G5:0.5 r:1.5
    `,
    excerpt: "Acordes finais: só a nota mais aguda; trinado escrito em fusas",
    confidence: "media",
    source: "https://violinlab.com/wp-content/uploads/2024/08/9._Sudzuki_2_-_Gavotte_from_Mignon_-_Full_Score.pdf",
  },
  {
    slug: "gavotte-lully",
    title: "Gavota",
    originalTitle: "Gavotte",
    composer: "J. B. Lully (atrib.; na verdade Rondeau de M. Marais, arr. S. Suzuki)",
    volume: 2,
    number: 10,
    bpm: 84,
    beatsPerBar: 4,
    key: "Lá menor",
    notes: "",
    confidence: "media",
    source: "https://www.violinwiki.org/wiki/Rondeau_from_Pi%C3%A8ces_de_viole,_Livre_I_(Marais,_Marin)(arrangement_Suzuki)",
    copyrighted: true,
  },
  {
    slug: "minuet-in-g-beethoven",
    title: "Minueto em Sol",
    originalTitle: "Minuet in G",
    composer: "L. van Beethoven (WoO 10 n.º 2)",
    volume: 2,
    number: 11,
    bpm: 88,
    beatsPerBar: 3,
    key: "Sol maior",
    notes: `
      G4:0.75 A4:0.25 | B4:0.75 A#4:0.25 B4:0.75 A4:0.25 B4:0.75 A4:0.25 | B4:2 C5:0.75 G#4:0.25 | A4:2 B4:0.75 F#4:0.25 |
      G4:1 r:1 B3:0.75 D4:0.25 | G4:0.75 F#4:0.25 G4:0.75 F#4:0.25 G4:0.75 F#4:0.25 | G4:2 F#4:0.5 E4:0.5 |
      E4:0.5 D4:0.5 D4:0.5 F#4:0.5 E4:0.5 C#4:0.5 | D4:1 r:1 | D5:0.5 G5:0.5 | G5:1 F#5:1 G5:1 | A5:2 G5:0.25 F#5:0.25 E5:0.25 D5:0.25 |
      C5:1 B4:1 E5:0.75 C5:0.25 | B4:1 A4:0.5 r:0.5 G4:0.75 A4:0.25 | B4:0.75 A#4:0.25 B4:0.75 A4:0.25 B4:0.75 A4:0.25 |
      B4:2 C5:0.75 G#4:0.25 | A4:2 B4:0.75 F#4:0.25 | G4:1 r:0.5 D5:0.5 C#5:0.5 D5:0.5 | B4:0.5 D5:0.5 G4:0.5 B4:0.5 D4:0.5 B4:0.5 |
      A4:0.5 C5:0.5 F#4:0.5 A4:0.5 D4:0.5 F#4:0.5 | G4:0.5 F#4:0.5 G4:0.5 A4:0.5 B4:0.5 C#5:0.5 | D5:0.5 C#5:0.5 D5:0.5 E5:0.5 D5:0.5 C5:0.5 |
      B4:0.5 A#4:0.5 B4:0.5 C5:0.5 B4:0.5 A4:0.5 | G4:0.5 B4:0.5 A4:0.5 G4:0.5 F#4:0.5 A4:0.5 | E4:0.5 F#4:0.5 G4:0.5 E4:0.5 C#4:0.5 A3:0.5 |
      D4:1 r:0.5 | D5:0.5 C#5:0.5 D5:0.5 | E5:0.5 C5:0.5 A4:0.5 B4:0.5 A4:0.5 B4:0.5 | C5:0.5 A4:0.5 F#4:0.5 D5:0.5 C#5:0.5 D5:0.5 |
      E5:0.5 C5:0.5 A4:0.5 B4:0.5 A4:0.5 B4:0.5 | C5:0.5 A4:0.5 F#4:0.5 D5:0.5 C#5:0.5 D5:0.5 | B4:0.5 D5:0.5 G4:0.5 B4:0.5 D4:0.5 G5:0.5 |
      E5:0.5 G5:0.5 C5:0.5 E5:0.5 A4:0.5 C5:0.5 | F#4:0.5 A4:0.5 D4:0.5 E4:0.5 F4:0.5 F#4:0.5 | A4:1 G4:0.5 r:0.5
    `,
    excerpt: "Minueto e trio, cada seção uma vez (sem Da Capo)",
    confidence: "media",
    source: "abcnotation.com — \"Minuet in G WoO 10 No 2\" (violino e piano) via github.com/baobach/abc_search",
  },
  {
    slug: "minuet-boccherini",
    title: "Minueto",
    originalTitle: "Minuet",
    composer: "L. Boccherini",
    volume: 2,
    number: 12,
    bpm: 84,
    beatsPerBar: 3,
    key: "Lá maior",
    notes: `
      E5:0.25 D#5:0.25 E5:0.25 F#5:0.25 | E5:0.5 E4:1 G#4:1 B4:0.5 | B4:0.5 A4:0.5 A4:1 A4:0.25 G#4:0.25 A4:0.25 B4:0.25 |
      A4:0.5 B3:1 F#4:1 A4:0.5 | A4:0.5 G#4:0.5 G#4:1 E5:0.75 C#5:0.25 | B4:0.5 r:0.5 r:1 E5:0.75 C#5:0.25 |
      B4:0.5 r:0.5 r:1 E5:0.75 C#5:0.25 | D#5:0.5 B4:0.5 G#4:0.5 E5:0.5 C#5:0.5 A4:0.5 | B4:1 r:1 E5:0.25 D#5:0.25 E5:0.25 F#5:0.25 |
      E5:0.5 E4:1 G#4:1 B4:0.5 | B4:0.5 A4:0.5 A4:1 A4:0.25 G#4:0.25 A4:0.25 B4:0.25 | A4:0.5 B3:1 F#4:1 A4:0.5 |
      A4:0.5 G#4:0.5 G#4:1 E5:0.75 C#5:0.25 | B4:0.5 r:0.5 r:1 E5:0.75 C#5:0.25 | B4:0.5 r:0.5 r:1 E5:0.75 C#5:0.25 |
      D#5:0.5 B4:0.5 G#4:0.5 E5:0.5 C#5:0.5 A4:0.5 | B4:1 r:1 G4:0.75 B3:0.25 | F#4:0.5 r:0.5 r:1 E4:0.75 B3:0.25 |
      D#4:0.5 r:0.5 r:1 G4:0.75 B3:0.25 | F#4:0.5 r:0.5 r:1 E4:0.75 B3:0.25 | D#4:0.5 r:0.5 r:1 E5:0.25 D#5:0.25 E5:0.25 F#5:0.25 |
      E5:0.5 E4:1 G#4:1 B4:0.5 | B4:0.5 A4:0.5 A4:1 A4:0.25 G#4:0.25 A4:0.25 B4:0.25 | A4:0.5 B3:1 F#4:1 A4:0.5 |
      A4:0.5 G#4:0.5 G#4:1 A4:0.75 F#4:0.25 | E4:0.5 r:0.5 r:1 A4:0.75 F#4:0.25 | G#4:0.5 E4:0.5 C#4:0.5 A4:0.5 F#4:0.75 A4:0.25 |
      E4:1 r:2
    `,
    confidence: "media",
    source: "abcnotation.com — \"Boccherini Minuet\" arr. Cameron Currie (flauta, Ré maior, transposto) via github.com/baobach/abc_search",
  },
];
