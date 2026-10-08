"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import StatCards from "../components/StatCards";
import RadarChart from "../components/RadarChart";
import TraitExplorer from "../components/TraitExplorer";
import TheorySidebar from "../components/TheorySidebar";
import DiagnosticModal from "../components/DiagnosticModal";
import { initialRadarAxes } from "../data/mockData";
import { RadarAxis } from "../types/spectrum";
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Layers,
  Heart,
  BookOpen,
  Sliders,
  Activity,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [axes, setAxes] = useState<RadarAxis[]>(initialRadarAxes);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState<boolean>(false);

  // Handle axis modification from the radar or sliders
  const handleAxisChange = (axisId: string, newValue: number) => {
    setAxes((prev) =>
      prev.map((axis) =>
        axis.id === axisId ? { ...axis, value: newValue } : axis
      )
    );
  };

  const handleResetAxes = () => {
    setAxes(initialRadarAxes);
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-cyber-grid text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* HEADER COMPONENT */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDiagnosticModal={() => setIsDiagnosticModalOpen(true)}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* BANNER D'ACCUEIL & MANIFESTE NEURO-AFFIRMATIF */}
        <section className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-64 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Exploration Adulte • Données de Pairs Validées</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Le spectre n'est pas une ligne,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300">
                  c'est une constellation.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Le modèle clinique traditionnel (DSM-5) a été conçu à travers le regard extérieur de personnes neurotypiques.
                <strong> Atlas du Spectre</strong> replace l'expérience subjective et le vécu au centre : cartographiez vos traits,
                comparez vos seuils sensoriels avec la communauté et apprenez à démasquer en sécurité.
              </p>
            </div>

            {/* QUICK ACTIONS BANNER */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => setIsDiagnosticModalOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-cyan-200" />
                <span>Parcours Diagnostiques</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => {
                  const traitSection = document.getElementById("trait-explorer-section");
                  if (traitSection) {
                    traitSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Tester la Sensibilité Auditive</span>
              </button>
            </div>
          </div>
        </section>

        {/* 1. CARTES DE STATISTIQUES RAPIDES */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Indicateurs & Météo Communautaire
            </h2>
            <span className="text-[11px] font-mono text-cyan-400">
              Mise à jour en temps réel
            </span>
          </div>
          <StatCards />
        </section>

        {/* 2. GRILLE ASYMÉTRIQUE PRINCIPALE (TABLEAU DE BORD) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLONNE GAUCHE / PRINCIPALE (8 COLONNES) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* CARTE CENTRALE : GRAPHIQUE RADAR MULTIDIMENSIONNEL */}
            <section id="radar-section">
              <RadarChart
                axes={axes}
                onAxisChange={handleAxisChange}
                onResetAxes={handleResetAxes}
              />
            </section>

            {/* SECTION INTERACTIVE : EXPLORATION D'UN TRAIT (SENSIBILITÉ AUDITIVE) */}
            <div id="trait-explorer-section">
              <TraitExplorer />
            </div>

            {/* COMPLÉMENT : AUTRES SPHÈRES DU SPECTRE EN UN COUP D'ŒIL */}
            <section className="glass-panel rounded-2xl p-6 border border-slate-800/80">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Autres Traits du Spectre en Exploration
                  </h3>
                  <p className="text-xs text-slate-400">
                    Chaque sphère dispose de son module interactif étalonné par les pairs.
                  </p>
                </div>
                <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                  Prochaines versions
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="text-xs font-bold text-cyan-300 mb-1">
                    Texture & Tactile
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Étiquettes de vêtements, matières synthétiques, sensibilité à la température et au toucher léger.
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-slate-400">
                    6 120 vécus collectés
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="text-xs font-bold text-purple-300 mb-1">
                    Tunnel Attentionnel (Hyperfocus)
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Capacité d'absorption phénoménale dans un intérêt spécifique et coût du décrochage involontaire.
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-slate-400">
                    7 890 vécus collectés
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="text-xs font-bold text-emerald-300 mb-1">
                    Camouflage & Contact Visuel
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Regarder entre les deux yeux, mémoriser des expressions faciales et fatigue oculaire liée au masque.
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-slate-400">
                    9 240 vécus collectés
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* COLONNE DROITE / SIDEBAR THÉORIES & DIAGNOSTIC (4 COLONNES) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <TheorySidebar
              onOpenDiagnosticModal={() => setIsDiagnosticModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full glass-panel border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 mt-12 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Atlas du Spectre • Initiative Communautaire Indépendante</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>Respect du secret médical</span>
            <span>Sans pistage commercial</span>
            <span>Licence Ouverte Neurodiversité</span>
          </div>
        </div>
      </footer>

      {/* MODAL PARCOURS DIAGNOSTIQUE */}
      <DiagnosticModal
        isOpen={isDiagnosticModalOpen}
        onClose={() => setIsDiagnosticModalOpen(false)}
      />
    </div>
  );
}
