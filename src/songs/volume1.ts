// Suzuki Violin School, Volume 1 — melodias (tokens "PITCH:BEATS", ver types.ts).
// Peças compostas por Shinichi Suzuki estão protegidas: listadas com notes vazias.

import type { Song } from "./types";

export const volume1: Song[] = [
  {
    slug: "brilha-brilha-estrelinha",
    title: "Brilha, Brilha Estrelinha (Tema)",
    originalTitle: "Twinkle, Twinkle, Little Star (Theme)",
    composer: "Folclore (francês)",
    volume: 1,
    number: 1,
    bpm: 90,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: `
      A4:1 A4:1 E5:1 E5:1 | F#5:1 F#5:1 E5:2 | D5:1 D5:1 C#5:1 C#5:1 | B4:1 B4:1 A4:2 | E5:1 E5:1 D5:1 D5:1 |
      C#5:1 C#5:1 B4:2 | E5:1 E5:1 D5:1 D5:1 | C#5:1 C#5:1 B4:2 | A4:1 A4:1 E5:1 E5:1 | F#5:1 F#5:1 E5:2 |
      D5:1 D5:1 C#5:1 C#5:1 | B4:1 B4:1 A4:2
    `,
    excerpt: "Somente o tema folclórico (as variações rítmicas são de Suzuki)",
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
  {
    slug: "variacoes-brilha-brilha",
    title: "Variações de Brilha Brilha",
    originalTitle: "Twinkle, Twinkle, Little Star Variations",
    composer: "S. Suzuki",
    volume: 1,
    number: 1,
    bpm: 80,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: "",
    confidence: "alta",
    copyrighted: true,
  },
  {
    slug: "lightly-row",
    title: "Remando Suavemente",
    originalTitle: "Lightly Row",
    composer: "Folclore (alemão)",
    volume: 1,
    number: 2,
    bpm: 90,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: `
      E5:1 C#5:1 C#5:2 | D5:1 B4:1 B4:2 | A4:1 B4:1 C#5:1 D5:1 | E5:1 E5:1 E5:2 | E5:1 C#5:1 C#5:1 C#5:1 |
      D5:1 B4:1 B4:1 B4:1 | A4:1 C#5:1 E5:1 E5:1 | C#5:1 C#5:1 C#5:2 | B4:1 B4:1 B4:1 B4:1 | B4:1 C#5:1 D5:2 |
      C#5:1 C#5:1 C#5:1 C#5:1 | C#5:1 D5:1 E5:2 | E5:1 C#5:1 C#5:1 C#5:1 | D5:1 B4:1 B4:1 B4:1 | A4:1 C#5:1 E5:1 E5:1 |
      C#5:1 C#5:1 C#5:2
    `,
    confidence: "alta",
    source: "https://cdnsm5-ss19.sharpschool.com/UserFiles/Servers/Server_1742341/File/Lightly%20Row%20Sheet%202019.pdf",
  },
  {
    slug: "song-of-the-wind",
    title: "Canção do Vento",
    originalTitle: "Song of the Wind",
    composer: "Folclore (alemão)",
    volume: 1,
    number: 3,
    bpm: 88,
    beatsPerBar: 2,
    key: "Lá maior",
    notes: `
      A4:0.5 B4:0.5 C#5:0.5 D5:0.5 | E5:0.5 E5:0.5 E5:0.5 E5:0.5 | F#5:0.5 D5:0.5 A5:0.5 F#5:0.5 | E5:1 r:1 |
      F#5:0.5 D5:0.5 A5:0.5 F#5:0.5 | E5:1 r:1 | E5:0.5 D5:0.5 D5:0.5 D5:0.5 | D5:0.5 C#5:0.5 C#5:0.5 C#5:0.5 |
      C#5:0.5 B4:0.5 B4:0.5 B4:0.5 | A4:0.5 C#5:0.5 E5:1 | E5:0.5 D5:0.5 D5:0.5 D5:0.5 | D5:0.5 C#5:0.5 C#5:0.5 C#5:0.5 |
      C#5:0.5 B4:0.5 B4:0.5 B4:0.5 | A4:1 r:1
    `,
    confidence: "alta",
    source: "https://cdnsm5-ss19.sharpschool.com/UserFiles/Servers/Server_1742341/File/song%20of%20the%20wind%20practice%20sheet.pdf",
  },
  {
    slug: "go-tell-aunt-rhody",
    title: "Vá Contar à Tia Rhody",
    originalTitle: "Go Tell Aunt Rhody",
    composer: "Folclore (J.-J. Rousseau)",
    volume: 1,
    number: 4,
    bpm: 92,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: `
      C#5:2 C#5:1 B4:1 | A4:2 A4:2 | B4:2 B4:1 D5:1 | C#5:1 B4:1 A4:2 | E5:2 E5:1 D5:1 | C#5:2 C#5:2 |
      B4:1 A4:1 B4:1 C#5:1 | A4:4
    `,
    excerpt: "Melodia principal (8 compassos); o livro pode conter seção intermediária/repetição",
    confidence: "media",
    source: "https://www.violinwiki.org/wiki/Go_Tell_Aunt_Rhody_(Folk_song)(arrangement_Suzuki)",
  },
  {
    slug: "o-come-little-children",
    title: "Vinde, Criancinhas",
    originalTitle: "O Come, Little Children",
    composer: "J. A. P. Schulz",
    volume: 1,
    number: 5,
    bpm: 76,
    beatsPerBar: 2,
    key: "Lá maior",
    notes: `
      E5:0.5 | E5:1 C#5:0.5 E5:0.5 | E5:1 C#5:0.5 E5:0.5 | D5:1 B4:0.5 D5:0.5 | C#5:1 r:0.5 E5:0.5 |
      E5:1 C#5:0.5 E5:0.5 | E5:1 C#5:0.5 E5:0.5 | D5:1 B4:0.5 D5:0.5 | C#5:1 r:0.5 C#5:0.5 | B4:1 B4:0.5 B4:0.5 |
      D5:1 D5:0.5 D5:0.5 | C#5:1 C#5:0.5 C#5:0.5 | F#5:1 r:0.5 F#5:0.5 | E5:1 E5:0.5 E5:0.5 | A5:1 E5:0.5 C#5:0.5 |
      D5:1 B4:0.5 G#4:0.5 | A4:1.5
    `,
    confidence: "media",
    source: "https://de.wikipedia.org/wiki/Ihr_Kinderlein,_kommet",
  },
  {
    slug: "may-song",
    title: "Canção de Maio",
    originalTitle: "May Song",
    composer: "Folclore (alemão)",
    volume: 1,
    number: 6,
    bpm: 92,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: `
      A4:1.5 C#5:0.5 E5:1 A5:1 | F#5:1 A5:0.5 F#5:0.5 E5:2 | D5:1.5 E5:0.5 C#5:1 A4:1 | B4:2 A4:2 |
      E5:1 E5:1 D5:1 D5:1 | C#5:1 E5:0.5 C#5:0.5 B4:2 | E5:1 E5:1 D5:1 D5:1 | C#5:1 E5:0.5 C#5:0.5 B4:2 |
      A4:1.5 C#5:0.5 E5:1 A5:1 | F#5:1 A5:0.5 F#5:0.5 E5:2 | D5:1.5 E5:0.5 C#5:1 A4:1 | B4:2 A4:2
    `,
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
  {
    slug: "long-long-ago",
    title: "Há Muito Tempo",
    originalTitle: "Long, Long Ago",
    composer: "T. H. Bayly",
    volume: 1,
    number: 7,
    bpm: 80,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: `
      A4:1 A4:0.5 B4:0.5 C#5:1 C#5:0.5 D5:0.5 | E5:1 F#5:0.5 E5:0.5 C#5:2 | E5:1 D5:0.5 C#5:0.5 B4:2 |
      D5:1 C#5:0.5 B4:0.5 A4:2 | A4:1 A4:0.5 B4:0.5 C#5:1 C#5:0.5 D5:0.5 | E5:1 F#5:0.5 E5:0.5 C#5:2 |
      E5:1 D5:0.5 C#5:0.5 B4:1 C#5:0.5 B4:0.5 | A4:2 r:2 | E5:1 D5:0.5 C#5:0.5 B4:1 E4:0.5 E4:0.5 |
      D5:1 C#5:0.5 B4:0.5 A4:2 | E5:1 D5:0.5 C#5:0.5 B4:1 E4:0.5 E4:0.5 | D5:1 C#5:0.5 B4:0.5 A4:2 |
      A4:1 A4:0.5 B4:0.5 C#5:1 C#5:0.5 D5:0.5 | E5:1 F#5:0.5 E5:0.5 C#5:2 | E5:1 D5:0.5 C#5:0.5 B4:1 C#5:0.5 B4:0.5 |
      A4:2 r:2
    `,
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
  {
    slug: "allegro",
    title: "Allegro",
    originalTitle: "Allegro",
    composer: "S. Suzuki",
    volume: 1,
    number: 8,
    bpm: 80,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: "",
    confidence: "alta",
    copyrighted: true,
  },
  {
    slug: "perpetual-motion",
    title: "Moto Perpétuo",
    originalTitle: "Perpetual Motion",
    composer: "S. Suzuki",
    volume: 1,
    number: 9,
    bpm: 80,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: "",
    confidence: "alta",
    copyrighted: true,
  },
  {
    slug: "allegretto",
    title: "Allegretto",
    originalTitle: "Allegretto",
    composer: "S. Suzuki",
    volume: 1,
    number: 10,
    bpm: 80,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: "",
    confidence: "alta",
    copyrighted: true,
  },
  {
    slug: "andantino",
    title: "Andantino",
    originalTitle: "Andantino",
    composer: "S. Suzuki",
    volume: 1,
    number: 11,
    bpm: 80,
    beatsPerBar: 4,
    key: "Lá maior",
    notes: "",
    confidence: "alta",
    copyrighted: true,
  },
  {
    slug: "etude",
    title: "Estudo",
    originalTitle: "Etude",
    composer: "S. Suzuki",
    volume: 1,
    number: 12,
    bpm: 80,
    beatsPerBar: 4,
    key: "Sol maior",
    notes: "",
    confidence: "alta",
    copyrighted: true,
  },
  {
    slug: "minuet-1",
    title: "Minueto 1",
    originalTitle: "Minuet 1",
    composer: "J. S. Bach (BWV 822)",
    volume: 1,
    number: 13,
    bpm: 96,
    beatsPerBar: 3,
    key: "Sol maior",
    notes: `
      D5:1 D5:1 D5:1 | B4:1 A4:0.5 B4:0.5 G4:1 | A4:1 D5:1 C5:1 | B4:2 A4:1 | D5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 |
      E5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | F#4:1 E4:0.5 D4:0.5 F#4:1 | G4:3 | D5:1 D5:1 D5:1 | B4:1 A4:0.5 B4:0.5 G4:1 |
      A4:1 D5:1 C5:1 | B4:2 A4:1 | D5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | E5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 |
      F#4:1 E4:0.5 D4:0.5 F#4:1 | G4:3 | B4:1 E5:2 | C#5:1 B4:0.5 C#5:0.5 A4:1 | D5:1 E5:1 F#5:1 | E5:0.5 D5:0.5 C#5:0.5 B4:0.5 A4:1 |
      A5:1 G5:0.5 F#5:0.5 E5:0.5 D5:0.5 | B5:1 G5:0.5 F#5:0.5 E5:0.5 D5:0.5 | C#5:1 A4:1 C#5:1 | D5:3 |
      D5:1 C5:0.5 B4:0.5 A4:1 | B4:1 A4:0.5 B4:0.5 G4:1 | C5:2 C5:0.5 B4:0.5 | A4:3 | D5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 |
      E5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | F#4:1 E4:0.5 D4:0.5 F#4:1 | G4:3
    `,
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
  {
    slug: "minuet-2",
    title: "Minueto 2",
    originalTitle: "Minuet 2",
    composer: "J. S. Bach (BWV Anh. 116)",
    volume: 1,
    number: 14,
    bpm: 96,
    beatsPerBar: 3,
    key: "Sol maior",
    notes: `
      G4:0.5 B4:0.5 D5:0.5 G5:0.5 A4:0.5 F#5:0.5 | G5:1 G4:1 G4:1 | G4:0.5 B4:0.5 D5:0.5 G5:0.5 A4:0.5 F#5:0.5 |
      G5:1 G4:1 G4:1 | E5:1 E5:1 E5:0.5 G5:0.5 | D5:1 D5:1 D5:0.5 G5:0.5 | C5:1 D5:0.5 C5:0.5 B4:0.5 C5:0.5 |
      A4:3 | G4:0.5 B4:0.5 D5:0.5 G5:0.5 A4:0.5 F#5:0.5 | G5:1 G4:1 G4:1 | G4:0.5 B4:0.5 D5:0.5 G5:0.5 A4:0.5 F#5:0.5 |
      G5:1 G4:1 G4:1 | E5:1 D5:0.5 C5:0.5 B4:0.5 A4:0.5 | D5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | A4:0.3333 B4:0.3333 C5:0.3333 D4:1 F#4:1 |
      G4:3 | G4:0.5 A4:0.5 B4:0.5 A4:0.5 G4:0.5 F#4:0.5 | G4:1 E4:1 E4:1 | G5:0.5 F#5:0.5 E5:0.5 G5:0.5 F#5:0.5 E5:0.5 |
      F#5:1 B4:1 B4:1 | G5:0.5 F#5:0.5 E5:0.5 G5:0.5 F#5:0.5 E5:0.5 | F#5:1 B4:1 E5:1 | F#5:0.3333 G5:0.3333 A5:0.3333 B4:1 D#5:1 |
      E5:1 D#5:0.5 E5:0.5 F#5:1 | G5:1 G5:0.5 F#5:0.5 E5:0.5 D5:0.5 | E5:1 E5:0.5 D5:0.5 C5:0.5 B4:0.5 |
      C5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | F#4:1 E4:0.5 F#4:0.5 D4:1 | A4:1 D4:1 D4:1 | B4:1 D4:1 D4:1 |
      C5:1 D5:0.5 C5:0.5 B4:0.5 C5:0.5 | A4:3 | G4:0.5 B4:0.5 D5:0.5 G5:0.5 A4:0.5 F#5:0.5 | G5:1 G4:1 G4:1 |
      G4:0.5 B4:0.5 D5:0.5 G5:0.5 A4:0.5 F#5:0.5 | G5:1 G4:1 G4:1 | E5:1 D5:0.5 C5:0.5 B4:0.5 A4:0.5 |
      D5:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | A4:0.3333 B4:0.3333 C5:0.3333 D4:1 F#4:1 | G4:3
    `,
    excerpt: "Cada seção uma vez (sem repetições)",
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
  {
    slug: "minuet-3",
    title: "Minueto 3",
    originalTitle: "Minuet 3",
    composer: "J. S. Bach (BWV Anh. 114, atrib. C. Petzold)",
    volume: 1,
    number: 15,
    bpm: 100,
    beatsPerBar: 3,
    key: "Sol maior",
    notes: `
      D5:1 G4:0.5 A4:0.5 B4:0.5 C5:0.5 | D5:1 G4:1 G4:1 | E5:1 C5:0.5 D5:0.5 E5:0.5 F#5:0.5 | G5:1 G4:1 G4:1 |
      C5:1 D5:0.5 C5:0.5 B4:0.5 A4:0.5 | B4:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | F#4:1 G4:0.5 A4:0.5 B4:0.5 G4:0.5 |
      A4:3 | D5:1 G4:0.5 A4:0.5 B4:0.5 C5:0.5 | D5:1 G4:1 G4:1 | E5:1 C5:0.5 D5:0.5 E5:0.5 F#5:0.5 |
      G5:1 G4:1 G4:1 | C5:1 D5:0.5 C5:0.5 B4:0.5 A4:0.5 | B4:1 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | A4:1 B4:0.5 A4:0.5 G4:0.5 F#4:0.5 |
      G4:3 | B5:1 G5:0.5 A5:0.5 B5:0.5 G5:0.5 | A5:1 D5:0.5 E5:0.5 F#5:0.5 D5:0.5 | G5:1 E5:0.5 F#5:0.5 G5:0.5 D5:0.5 |
      C#5:1 B4:0.5 C#5:0.5 A4:1 | A4:0.5 B4:0.5 C#5:0.5 D5:0.5 E5:0.5 F#5:0.5 | G5:1 F#5:1 E5:1 | F#5:1 A4:1 C#5:1 |
      D5:3 | D5:1 G4:0.5 F#4:0.5 G4:1 | E5:1 G4:0.5 F#4:0.5 G4:1 | D5:1 C5:1 B4:1 | A4:0.5 G4:0.5 F#4:0.5 G4:0.5 A4:1 |
      D4:0.5 E4:0.5 F#4:0.5 G4:0.5 A4:0.5 B4:0.5 | C5:1 B4:1 A4:1 | B4:0.5 D5:0.5 G4:1 F#4:1 | G4:3
    `,
    excerpt: "Cada seção uma vez (sem repetições)",
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
  {
    slug: "the-happy-farmer",
    title: "O Alegre Camponês",
    originalTitle: "The Happy Farmer",
    composer: "R. Schumann",
    volume: 1,
    number: 16,
    bpm: 88,
    beatsPerBar: 4,
    key: "Sol maior",
    notes: `
      D4:0.5 | G4:1.5 B4:0.5 D5:1.5 G4:0.5 | C5:0.5 E5:0.5 G5:0.5 E5:0.5 D5:1.5 B4:0.5 | C5:0.5 A4:0.5 D4:0.5 C5:0.5 B4:0.5 G4:0.5 D4:0.5 B4:0.5 |
      F#4:1 E4:1 D4:1 r:0.5 D4:0.5 | G4:1.5 B4:0.5 D5:1.5 G4:0.5 | C5:0.5 E5:0.5 G5:0.5 E5:0.5 D5:1.5 B4:0.5 |
      C5:0.5 A4:0.5 D4:0.5 C5:0.5 B4:0.5 G4:0.5 D4:0.5 B4:0.5 | F#4:1 E4:1 D4:1 r:0.5 D4:0.5 | C5:1.5 B4:0.5 A4:1.5 D4:0.5 |
      C5:0.5 B4:0.5 A4:0.5 G4:0.5 A4:1.5 D4:0.5 | G4:1.5 B4:0.5 D5:1.5 G4:0.5 | C5:0.5 E5:0.5 G5:0.5 E5:0.5 D5:1.5 B4:0.5 |
      C5:0.5 A4:0.5 D4:0.5 C5:0.5 B4:0.5 G4:0.5 D4:0.5 B4:0.5 | A4:1 F#4:1 G4:1 r:0.5 D4:0.5 | C5:1.5 B4:0.5 A4:1.5 D4:0.5 |
      C5:0.5 B4:0.5 A4:0.5 G4:0.5 A4:1.5 D4:0.5 | G4:1.5 B4:0.5 D5:1.5 G4:0.5 | C5:0.5 E5:0.5 G5:0.5 E5:0.5 D5:1.5 B4:0.5 |
      C5:0.5 A4:0.5 D4:0.5 C5:0.5 B4:0.5 G4:0.5 D4:0.5 B4:0.5 | A4:1 F#4:1 G4:1 r:0.5
    `,
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
  {
    slug: "gavotte-gossec",
    title: "Gavota",
    originalTitle: "Gavotte",
    composer: "F.-J. Gossec",
    volume: 1,
    number: 17,
    bpm: 100,
    beatsPerBar: 4,
    key: "Sol maior",
    notes: `
      D5:0.5 E5:0.5 D5:0.5 B4:0.5 C5:0.5 D5:0.5 C5:0.5 A4:0.5 | G4:1 G5:1 G4:1 r:1 | C5:0.5 D5:0.5 C5:0.5 A4:0.5 B4:0.5 C5:0.5 B4:0.5 G4:0.5 |
      A4:1 D5:1 D4:1 r:1 | D5:0.5 E5:0.5 D5:0.5 B4:0.5 C5:0.5 D5:0.5 C5:0.5 A4:0.5 | G4:1 G5:1 G4:1 r:1 |
      B4:1 G4:0.5 E4:0.5 G4:1 E4:0.5 C#4:0.5 | D4:1 D5:1 D4:1 r:1 | D5:0.5 E5:0.5 D5:0.5 B4:0.5 C5:0.5 D5:0.5 C5:0.5 A4:0.5 |
      G4:1 G5:1 G4:1 r:1 | C5:0.5 D5:0.5 C5:0.5 A4:0.5 B4:0.5 C5:0.5 B4:0.5 G4:0.5 | A4:1 D5:1 D4:1 r:1 |
      D5:0.5 E5:0.5 D5:0.5 B4:0.5 C5:0.5 D5:0.5 C5:0.5 A4:0.5 | G4:1 G5:1 G4:1 r:1 | B4:1 G4:0.5 E4:0.5 G4:1 E4:0.5 C#4:0.5 |
      D4:1 D5:1 D4:1 r:1 | A4:0.5 C5:0.5 B4:0.5 D5:0.5 C5:0.5 B4:0.5 A4:0.5 G4:0.5 | F#4:1 A4:1 C5:1 r:1 |
      B4:0.5 D5:0.5 C5:0.5 E5:0.5 D5:0.5 C5:0.5 B4:0.5 A4:0.5 | G4:1 B4:1 D5:1 r:1 | E5:0.5 D5:0.5 D5:0.5 C5:0.5 C5:0.5 B4:0.5 B4:0.5 A4:0.5 |
      A4:1 C5:1 E5:1 r:1 | D5:0.5 B4:0.5 F#4:0.5 G4:0.5 C5:0.5 A4:0.5 E4:0.5 F#4:0.5 | G4:1 G5:1 G4:1 r:1
    `,
    confidence: "alta",
    source: "https://github.com/Buschke/sheet-music/blob/HEAD/suzuki/Suzuki%20Violin%20School/Suzuki-Violin-School-1-Violin.ly",
  },
];
