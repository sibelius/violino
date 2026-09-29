import type { Metadata } from "next";
import { Suspense } from "react";
import Editor from "@/components/Editor";

export const metadata: Metadata = { title: "Editor" };

export default function Page() {
  return (
    <Suspense fallback={<p className="text-muted">Carregando…</p>}>
      <Editor />
    </Suspense>
  );
}
