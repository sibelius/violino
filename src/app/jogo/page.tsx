import SongList from "@/components/SongList";
import { VOLUMES } from "@/songs";
import { pageMetadata } from "@/lib/og";

export const metadata = pageMetadata("/jogo");

export default function Page() {
  return <SongList volumes={VOLUMES} />;
}
