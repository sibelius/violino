import type { Metadata } from "next";
import SongList from "@/components/SongList";
import { VOLUMES } from "@/songs";

export const metadata: Metadata = { title: "Jogo" };

export default function Page() {
  return <SongList volumes={VOLUMES} />;
}
