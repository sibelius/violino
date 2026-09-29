import type { Metadata } from "next";
import { Suspense } from "react";
import CustomGame from "@/components/CustomGame";

export const metadata: Metadata = { title: "Minha música" };

export default function Page() {
  return (
    <Suspense fallback={<p className="text-muted">Carregando…</p>}>
      <CustomGame />
    </Suspense>
  );
}
