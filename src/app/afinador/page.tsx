import Tuner from "@/components/Tuner";
import { pageMetadata } from "@/lib/og";

export const metadata = pageMetadata("/afinador");

export default function Page() {
  return <Tuner />;
}
