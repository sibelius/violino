import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Game from "@/components/Game";
import { ALL_SONGS, getSong } from "@/songs";

export function generateStaticParams() {
  return ALL_SONGS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jogo/[slug]">): Promise<Metadata> {
  const song = getSong((await params).slug);
  return { title: song?.title ?? "Música" };
}

export default async function Page({ params }: PageProps<"/jogo/[slug]">) {
  const song = getSong((await params).slug);
  if (!song) notFound();
  return <Game song={song} />;
}
