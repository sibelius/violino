import { Suspense } from "react";
import CustomGame from "@/components/CustomGame";
import { pageMetadata } from "@/lib/og";

export const metadata = pageMetadata("/jogo/minha");

export default function Page() {
  return (
    <Suspense fallback={<p className="text-muted">Carregando…</p>}>
      <CustomGame />
    </Suspense>
  );
}
