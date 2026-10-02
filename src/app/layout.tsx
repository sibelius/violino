import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Link from "next/link";
import VolumeControl from "@/components/VolumeControl";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/og";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });

const title = "Violino — Afinador & Jogo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s · Violino" },
  description: SITE_DESCRIPTION,
  openGraph: { title, description: SITE_DESCRIPTION, url: "/", siteName: SITE_NAME, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#120d0a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-20 border-b border-line/60 bg-bg/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
            <Link href="/" className="font-display text-xl font-semibold tracking-tight">
              🎻 Violino
            </Link>
            <div className="ml-auto flex items-center gap-1 text-sm">
              <Link href="/afinador" className="rounded-full px-3 py-1.5 hover:bg-panel-2">Afinador</Link>
              <Link href="/jogo" className="rounded-full px-3 py-1.5 hover:bg-panel-2">Jogo</Link>
              <Link href="/jogo/editor" className="rounded-full px-3 py-1.5 hover:bg-panel-2">Editor</Link>
            </div>
            <div className="hidden sm:block">
              <VolumeControl compact />
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
