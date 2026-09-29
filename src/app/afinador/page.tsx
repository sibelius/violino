import type { Metadata } from "next";
import Tuner from "@/components/Tuner";

export const metadata: Metadata = { title: "Afinador" };

export default function Page() {
  return <Tuner />;
}
