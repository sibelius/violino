import { Suspense } from "react";
import Editor from "@/components/Editor";
import { pageMetadata } from "@/lib/og";

export const metadata = pageMetadata("/jogo/editor");

export default function Page() {
  return (
    <Suspense fallback={<p className="text-muted">Carregando…</p>}>
      <Editor />
    </Suspense>
  );
}
