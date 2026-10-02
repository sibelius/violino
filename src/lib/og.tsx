import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";
import { ImageResponse } from "next/og";
import { ALL_SONGS, getSong, type Song } from "@/songs";
import { parseNotes, STRINGS, stringForMidi, type ParsedNote } from "@/lib/music";

export const SITE_URL = "https://violino.vercel.app";
export const SITE_NAME = "Violino";
export const SITE_DESCRIPTION =
  "Afinador de violino e jogo estilo Guitar Hero que escuta seu violino, com o repertório Suzuki volumes 1 a 5.";
export const OG_SIZE = { width: 1200, height: 630 };

const C = {
  bg: "#120d0a",
  glow: "#3a2415",
  panel: "#1d1612",
  line: "#3b2e25",
  text: "#f5ece3",
  muted: "#b8a595",
  faint: "#7d6a5b",
  accent: "#e0a458",
};

type Art = "highway" | "tuner";
interface Page {
  kicker: string;
  /** Page title as used in <title> (the layout template appends "· Violino") */
  title: string;
  /** Headline drawn on the card, when different from the <title> */
  headline?: string;
  blurb: string;
  art: Art;
  /** Melody drawn on the note highway */
  melody?: string;
}

const playable = ALL_SONGS.filter((s) => !s.copyrighted).length;

const PAGES: Record<string, Page> = {
  "/": {
    kicker: "afinador · jogo · suzuki 1–5",
    title: "Violino — Afinador & Jogo",
    headline: "Afine. Toque. Pontue.",
    blurb: "Um afinador e um jogo estilo Guitar Hero que escuta o seu violino pelo microfone e confere cada nota.",
    art: "highway",
    melody: "brilha-brilha-estrelinha",
  },
  "/afinador": {
    kicker: "sol · ré · lá · mi",
    title: "Afinador",
    blurb: "Ponteiro em cents, nota de referência e calibração do Lá (440/442 Hz). Toque uma corda solta.",
    art: "tuner",
  },
  "/jogo": {
    kicker: "jogo suzuki · volumes 1 a 5",
    title: "Jogo",
    headline: "Escolha a música",
    blurb: `${playable} músicas do Método Suzuki. Modo prática (espera a nota certa) ou desafio (no ritmo).`,
    art: "highway",
    melody: "minuet-1",
  },
  "/jogo/editor": {
    kicker: "nota:tempos",
    title: "Editor",
    headline: "Editor de músicas",
    blurb: "Digite ou clique as notas das peças do seu livro e toque-as no jogo. Fica salvo no seu navegador.",
    art: "highway",
    melody: "musette",
  },
  "/jogo/minha": {
    kicker: "suas músicas",
    title: "Minha música",
    blurb: "Uma música criada no editor, tocada no jogo com o seu violino.",
    art: "highway",
    melody: "o-come-little-children",
  },
};

function songPage(song: Song): Page {
  return {
    kicker: `suzuki · volume ${song.volume} · nº ${song.number}`,
    title: song.title,
    blurb: song.copyrighted
      ? `${song.composer}. Peça protegida por direitos autorais: digite as notas do seu livro no editor e toque.`
      : [song.originalTitle.length <= 36 ? song.originalTitle : null, song.composer, song.key, `${song.bpm} bpm`]
          .filter(Boolean)
          .join(" · "),
    art: "highway",
    melody: song.slug,
  };
}

function page(href: string): Page {
  const p = PAGES[href];
  if (p) return p;
  const m = /^\/jogo\/([^/]+)$/.exec(href);
  const song = m ? getSong(m[1]) : undefined;
  if (!song) throw new Error(`No OG page for ${href}`);
  return songPage(song);
}

export function songHref(slug: string) {
  return `/jogo/${slug}`;
}

export function pageMetadata(href: string): Metadata {
  const p = page(href);
  const home = href === "/";
  const title = home ? p.title : `${p.title} · ${SITE_NAME}`;
  const description = home ? SITE_DESCRIPTION : p.blurb;
  return {
    title: home ? { absolute: p.title } : p.title,
    description,
    openGraph: { title, description, url: href, siteName: SITE_NAME, type: home ? "website" : "article", locale: "pt_BR" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function ogAlt(href: string) {
  const p = page(href);
  return `${p.headline ?? p.title}: ${p.blurb} ${SITE_NAME}`;
}

// ---- Art ----------------------------------------------------------------------

function seeded(seed: string) {
  let s = [...seed].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Real melody when the song ships notes, otherwise a seeded ghost phrase. */
function melodyNotes(slug: string): { notes: ParsedNote[]; ghost: boolean } {
  const song = getSong(slug);
  const notes = song?.notes.trim() ? parseNotes(song.notes) : [];
  if (notes.length) return { notes, ghost: false };
  const rand = seeded(slug);
  const out: ParsedNote[] = [];
  let t = 0;
  while (t < 24) {
    const beats = [0.5, 1, 1, 1, 2][Math.floor(rand() * 5)];
    out.push({ midi: 55 + Math.floor(rand() * 28), start: t, beats });
    t += beats;
  }
  return { notes: out, ghost: true };
}

const LANE_ORDER = [3, 2, 1, 0]; // E on top, G at the bottom, like looking down at the strings

function Highway({ slug }: { slug: string }) {
  const { notes, ghost } = melodyNotes(slug);
  const w = 1040;
  const laneH = 38;
  const h = laneH * 4;
  // Show about two dozen notes, so fast passages don't turn into a smear
  const sounding = notes.filter((n) => n.midi !== null);
  const nth = sounding[Math.min(24, sounding.length - 1)];
  const window = Math.min(Math.max(nth ? nth.start : 22, 8), 22);
  const x0 = 40;
  const ppb = (w - x0 - 4) / window;
  const visible = sounding.filter((n) => n.start + n.beats <= window + 1e-6);
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", width: 24, fontFamily: "Geist Mono", fontSize: 20 }}>
        {LANE_ORDER.map((i) => (
          <div key={i} style={{ height: laneH, display: "flex", alignItems: "center", color: STRINGS[i].color }}>
            {STRINGS[i].name}
          </div>
        ))}
      </div>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {LANE_ORDER.map((s, row) => (
          <line
            key={s}
            x1={0}
            x2={w}
            y1={row * laneH + laneH / 2}
            y2={row * laneH + laneH / 2}
            stroke={STRINGS[s].color}
            strokeOpacity={0.35}
            strokeWidth={1 + (3 - s) * 0.6}
          />
        ))}
        <rect x={x0 - 3} y={0} width={6} height={h} rx={3} fill={C.accent} />
        {visible.map((n, i) => {
          const s = stringForMidi(n.midi!);
          const row = LANE_ORDER.indexOf(s);
          const x = x0 + n.start * ppb + 3;
          const bw = Math.max(n.beats * ppb - 6, 10);
          const y = row * laneH + 8;
          const color = STRINGS[s].color;
          return ghost ? (
            <rect key={i} x={x} y={y} width={bw} height={laneH - 16} rx={(laneH - 16) / 2} fill="none" stroke={color} strokeOpacity={0.55} strokeWidth={2} strokeDasharray="5 4" />
          ) : (
            <rect key={i} x={x} y={y} width={bw} height={laneH - 16} rx={(laneH - 16) / 2} fill={color} fillOpacity={i === 0 ? 1 : 0.85} />
          );
        })}
      </svg>
    </div>
  );
}

function TunerArt() {
  const w = 1080;
  const h = 152;
  const cx = w / 2;
  const ticks = Array.from({ length: 51 }, (_, i) => i - 25); // -50..+50 cents in steps of 2
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect x={cx - 46} y={h - 92} width={92} height={60} rx={8} fill={C.accent} fillOpacity={0.12} />
        {ticks.map((t) => {
          const x = cx + t * 18;
          const major = t % 5 === 0;
          const th = major ? 46 : 24;
          return (
            <rect
              key={t}
              x={x - (major ? 1.5 : 1)}
              y={h - 34 - th}
              width={major ? 3 : 2}
              height={th}
              rx={1}
              fill={t === 0 ? C.accent : major ? C.muted : C.line}
            />
          );
        })}
        <line x1={cx + 3 * 18} y1={16} x2={cx + 3 * 18} y2={h - 30} stroke={C.text} strokeWidth={4} strokeLinecap="round" />
        <circle cx={cx + 3 * 18} cy={h - 30} r={8} fill={C.text} />
      </svg>
      <div style={{ display: "flex", width: w, justifyContent: "space-between", marginTop: -18, fontFamily: "Geist Mono", fontSize: 20, color: C.faint }}>
        <span>−50 ¢</span>
        <div style={{ display: "flex", gap: 28 }}>
          {STRINGS.map((s) => (
            <span key={s.name} style={{ color: s.color }}>
              {s.note}
            </span>
          ))}
        </div>
        <span>+50 ¢</span>
      </div>
    </div>
  );
}

/** Violin silhouette used for the site mark (same drawing as app/icon.svg). */
export function ViolinMark({ size = 40, bg = C.accent, fg = C.bg }: { size?: number; bg?: string; fg?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width={32} height={32} rx={8} fill={bg} />
      <g transform="rotate(32 16 16)">
        <circle cx={16} cy={3.6} r={1.6} fill={fg} />
        <rect x={15.05} y={4} width={1.9} height={7} rx={0.6} fill={fg} />
        <path
          d="M16 9.6C13.2 9.6 11.6 10.8 11.6 12.8C11.6 14.2 12.9 14.9 12.9 15.9C12.9 16.9 11 17.6 11 20.1C11 23.1 13.2 25 16 25C18.8 25 21 23.1 21 20.1C21 17.6 19.1 16.9 19.1 15.9C19.1 14.9 20.4 14.2 20.4 12.8C20.4 10.8 18.8 9.6 16 9.6Z"
          fill={fg}
        />
        <path d="M14.1 16.4C13.5 17.4 14.7 18.6 14.1 19.8M17.9 16.4C18.5 17.4 17.3 18.6 17.9 19.8" stroke={bg} strokeWidth={0.8} fill="none" strokeLinecap="round" />
        <rect x={14.3} y={20.4} width={3.4} height={0.9} rx={0.45} fill={bg} />
        <path d="M15.2 22.3L16.8 22.3L16.5 24.2L15.5 24.2Z" fill={bg} fillOpacity={0.75} />
      </g>
      <line x1={5} y1={23.5} x2={27} y2={10.5} stroke={fg} strokeWidth={1.2} strokeLinecap="round" />
    </svg>
  );
}

// ---- Render -------------------------------------------------------------------

const font = (f: string) => readFile(join(process.cwd(), "assets/fonts", f));

export async function renderOg(href: string) {
  const [display, sans, mono] = await Promise.all([
    font("Fraunces-SemiBold.woff"),
    font("Geist-Regular.woff"),
    font("GeistMono-Medium.woff"),
  ]);
  const p = page(href);
  const headline = p.headline ?? p.title;
  const size = headline.length > 40 ? 66 : headline.length > 22 ? 80 : 100;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: C.bg,
          backgroundImage: `radial-gradient(circle at 50% -20%, ${C.glow} 0%, ${C.bg} 62%)`,
          color: C.text,
          padding: "52px 60px 44px",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono", fontSize: 24, color: C.accent }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: C.accent }} />
          <span>{p.kicker}</span>
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: "Fraunces",
            fontSize: size,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 1080,
          }}
        >
          {headline}
        </div>
        <div style={{ marginTop: 18, fontSize: 30, lineHeight: 1.3, color: C.muted, maxWidth: 1040 }}>{p.blurb}</div>

        <div style={{ flex: 1 }} />
        {p.art === "tuner" ? <TunerArt /> : <Highway slug={p.melody ?? "brilha-brilha-estrelinha"} />}
        <div
          style={{
            marginTop: 22,
            paddingTop: 18,
            borderTop: `1px solid ${C.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: C.faint,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ViolinMark size={34} />
            <span style={{ fontFamily: "Fraunces", fontSize: 28, color: C.text }}>{SITE_NAME}</span>
          </div>
          <span>violino.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Fraunces", data: display, weight: 600, style: "normal" },
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
