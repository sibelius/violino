import { notFound } from "next/navigation";
import { renderOg, songHref } from "@/lib/og";
import { ALL_SONGS, getSong } from "@/songs";

export const alt = "Música do Método Suzuki no jogo do Violino";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ALL_SONGS.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSong(slug)) notFound();
  return renderOg(songHref(slug));
}
