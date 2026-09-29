import Link from "next/link";
import { ALL_SONGS } from "@/songs";

export default function Home() {
  const playable = ALL_SONGS.filter((s) => !s.copyrighted).length;
  return (
    <div className="space-y-10 py-6">
      <section className="space-y-3 text-center">
        <h1 className="font-display text-4xl font-semibold sm:text-6xl">Afine. Toque. Pontue.</h1>
        <p className="mx-auto max-w-xl text-muted">
          Um afinador de violino e um jogo estilo Guitar Hero que <strong className="text-text">escuta o seu violino</strong> pelo
          microfone e confere cada nota — com o repertório Suzuki, volumes 1 a 5.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/afinador" className="card group p-6 transition hover:border-accent">
          <div className="text-4xl">🎯</div>
          <h2 className="mt-3 font-display text-2xl font-semibold">Afinador</h2>
          <p className="mt-1 text-muted">Sol, Ré, Lá e Mi com ponteiro em cents, nota de referência e calibração do Lá (440/442 Hz).</p>
          <span className="mt-4 inline-block text-accent group-hover:underline">Afinar agora →</span>
        </Link>
        <Link href="/jogo" className="card group p-6 transition hover:border-accent">
          <div className="text-4xl">🎮</div>
          <h2 className="mt-3 font-display text-2xl font-semibold">Jogo Suzuki</h2>
          <p className="mt-1 text-muted">
            {playable} músicas em 5 volumes. Modo prática (espera a nota certa) ou desafio (no ritmo).
          </p>
          <span className="mt-4 inline-block text-accent group-hover:underline">Escolher música →</span>
        </Link>
      </section>

      <section className="card space-y-2 p-6 text-sm text-muted">
        <h3 className="font-display text-lg text-text">Dicas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Permita o acesso ao microfone. Tudo roda no seu navegador, e o áudio não sai do dispositivo.</li>
          <li>Use fones de ouvido se ligar o acompanhamento, para o microfone não ouvir o próprio app.</li>
          <li>Fique em um lugar silencioso, a 30–60 cm do microfone.</li>
        </ul>
      </section>
    </div>
  );
}
