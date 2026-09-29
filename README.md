# 🎻 Violino — Afinador & Jogo Suzuki

Web app em Next.js com:

- **Afinador** (`/afinador`): detecta a nota pelo microfone (algoritmo YIN), ponteiro em cents, seleção automática/manual das cordas Sol-Ré-Lá-Mi, nota de referência e calibração do Lá (415–446 Hz).
- **Jogo** (`/jogo`): estilo Guitar Hero. As notas descem pelas 4 cordas e o app **escuta o violino** e valida se você tocou a nota certa.
  - **Prática**: a música para em cada nota até você acertar.
  - **Desafio**: no ritmo, com notas Perfeito / Ótimo / Bom / Errou, combo e multiplicador.
  - Velocidade, tolerância de afinação, nota guia, aceitar oitava e calibração do Lá.
  - Recordes e estrelas salvos no navegador.
- **Editor** (`/jogo/editor`): crie ou corrija músicas no formato `NOTA:TEMPOS` (ex.: `A4:1 F#5:0.5 r:1`).

Tudo roda **no navegador**: o áudio do microfone não sai do dispositivo, então não há backend.

## Repertório

`src/songs/volume1.ts` … `volume5.ts` têm os volumes 1–5 do Método Suzuki para violino.
As peças compostas pelo próprio Shinichi Suzuki (Allegro, Moto Perpétuo, Allegretto, Andantino, Estudo e as variações de Brilha Brilha)
ainda são protegidas por direitos autorais. Por isso aparecem na lista **sem notas**, e você pode digitá-las do seu livro no editor.
As demais são domínio público. Cada música tem um campo `confidence` (`alta`/`media`/`baixa`). Confira as de confiança baixa com o livro.

## Rodando

```bash
pnpm install
pnpm dev   # http://localhost:3000
```

O microfone só funciona em `localhost` ou HTTPS.
