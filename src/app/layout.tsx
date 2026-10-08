import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SensoryProvider } from "../context/SensoryContext";
import { PerspectiveProvider } from "../context/PerspectiveContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlas du Spectre | Cartographie Neuro-Affirmative & Validation Communautaire",
  description:
    "Plateforme interactive pour explorer le spectre de l'autisme chez l'adulte en dehors du cadre rigide du DSM. Données collaboratives, radar multidimensionnel et mur de vécus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <SensoryProvider>
          <PerspectiveProvider>{children}</PerspectiveProvider>
        </SensoryProvider>
      </body>
    </html>
  );
}
