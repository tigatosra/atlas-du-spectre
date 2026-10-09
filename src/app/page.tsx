"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import StatCards from "../components/StatCards";
import RadarChart from "../components/RadarChart";
import TraitExplorer from "../components/TraitExplorer";
import TheorySidebar from "../components/TheorySidebar";
import DiagnosticModal from "../components/DiagnosticModal";
import SensorySphereView from "../components/SensorySphereView";
import CognitiveSphereView from "../components/CognitiveSphereView";
import CaregiverGuideView from "../components/CaregiverGuideView";
import MediaLibraryView from "../components/MediaLibraryView";
import ResourcesView from "../components/ResourcesView";
import IntentNavigator from "../components/IntentNavigator";
import ProfileBuilderView from "../components/ProfileBuilderView";
import { initialRadarAxes } from "../data/mockData";
import { RadarAxis } from "../types/spectrum";
import { usePerspective } from "../context/PerspectiveContext";
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
  HeartHandshake,
  UserCheck,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [axes, setAxes] = useState<RadarAxis[]>(initialRadarAxes);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState<boolean>(false);
  const { perspective, setPerspective, isAutisticPerspective, isRelativePerspective } = usePerspective();

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
        
        {/* CONDITIONAL RENDERING ACCORDING TO ACTIVE TAB */}
        {activeTab === "profils" && (
          <ProfileBuilderView
            onApplyProfileToRadar={(newAxes) => setAxes(newAxes)}
            onGoToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === "sensorielle" && <SensorySphereView />}

        {activeTab === "cognitive" && <CognitiveSphereView />}

        {activeTab === "proches" && (
          <CaregiverGuideView
            onExploreMediaForCaregivers={() => setActiveTab("mediatheque")}
          />
        )}

        {activeTab === "mediatheque" && <MediaLibraryView />}

        {activeTab === "ressources" && (
          <ResourcesView onOpenDiagnosticModal={() => setIsDiagnosticModalOpen(true)} />
        )}

        {activeTab === "dashboard" && (
          <>
            {/* 1. INTENT NAVIGATOR: "QUE RECHERCHEZ-VOUS AUJOURD'HUI ?" */}
            <IntentNavigator
              onSelectIntent={(targetTab) => setActiveTab(targetTab)}
            />

            {/* 2. BANNER D'ACCUEIL & MANIFESTE NEURO-AFFIRMATIF */}
            <section className="hud-frame glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 relative overflow-hidden shadow-2xl">
              {/* HUD Micro-Telemetry Bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 mb-4 pb-2 border-b border-cyan-500/15">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>HUD.OVERVIEW // MISSION: CARTOGRAPHIE_NEURO_AFFIRMATIVE</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-slate-500">
                  <span>SPECTRUM_ENGINE: ACTIVE</span>
                  <span className="text-cyan-400 font-bold">[ MATRIX_ONLINE ]</span>
                </div>
              </div>

              {/* Subtle accent glow */}
              <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-10 w-64 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-3xl">
                  
                  {/* DUAL PERSPECTIVE BANNER SELECTOR */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">
                      Perspective appliquée :
                    </span>
                    <div className="inline-flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setPerspective("autiste")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          isAutisticPerspective
                            ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Adulte en questionnement / Autiste</span>
                      </button>
                      <button
                        onClick={() => setPerspective("proche")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          isRelativePerspective
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Proche, Partenaire ou Parent</span>
                      </button>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {isRelativePerspective ? (
                      <>
                        Comprendre et accompagner{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                          votre proche sans le surcharger.
                        </span>
                      </>
                    ) : (
                      <>
                        Le spectre n'est pas une ligne,{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300">
                          c'est une constellation.
                        </span>
                      </>
                    )}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {isRelativePerspective
                      ? "Ce tableau de bord vous aide à décoder les réactions de votre proche, à anticiper les surcharges sensorielles et à créer un environnement de confiance réciproque."
                      : "Le modèle clinique traditionnel (DSM-5) a été conçu à travers le regard extérieur de personnes neurotypiques. Atlas du Spectre replace l'expérience subjective et le vécu au centre : cartographiez vos traits, comparez vos seuils sensoriels avec la communauté et apprenez à démasquer en sécurité."}
                  </p>
                </div>

                {/* QUICK ACTIONS BANNER */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                  <button
                    onClick={() => setActiveTab("profils")}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-cyan-200 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.15)] transition-all cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <span>Constructeur de Profil & Archétypes</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("mediatheque")}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-purple-200" />
                    <span>Livres, Audiobooks & Vidéos</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <button
                    onClick={() => {
                      if (isRelativePerspective) {
                        setActiveTab("proches");
                      } else {
                        setActiveTab("sensorielle");
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors"
                  >
                    {isRelativePerspective ? (
                      <>
                        <HeartHandshake className="w-4 h-4 text-emerald-400" />
                        <span>Guide Simple pour l'Entourage</span>
                      </>
                    ) : (
                      <>
                        <Sliders className="w-4 h-4 text-cyan-400" />
                        <span>Tester mes Canaux Sensoriels</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* 3. CARTES DE STATISTIQUES RAPIDES */}
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

            {/* 4. GRILLE ASYMÉTRIQUE PRINCIPALE (TABLEAU DE BORD) */}
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

                {/* ACCÈS DIRECT AUX ESPACES THÉMATIQUES */}
                <section className="hud-frame glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        Explorer les Modules Approfondis
                      </h3>
                      <p className="text-xs text-slate-400">
                        Chaque thématique dispose d'outils interactifs dédiés.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      [ STATUS: 4_MODULES_ONLINE ]
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                      onClick={() => setActiveTab("sensorielle")}
                      className="hud-frame p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-400 hover:bg-slate-900 transition-all text-left group cursor-pointer relative overflow-hidden"
                    >
                      <div className="text-xs font-bold text-cyan-300 mb-1 group-hover:text-cyan-200 flex items-center justify-between">
                        <span>Sphère Sensorielle</span>
                        <span className="text-[10px] font-mono text-slate-500">MOD-01</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Audition, vision/néons, textures, proprioception et saturation.
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab("cognitive")}
                      className="hud-frame hud-frame-purple p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-400 hover:bg-slate-900 transition-all text-left group cursor-pointer relative overflow-hidden"
                    >
                      <div className="text-xs font-bold text-purple-300 mb-1 group-hover:text-purple-200 flex items-center justify-between">
                        <span>Sphère Cognitive</span>
                        <span className="text-[10px] font-mono text-slate-500">MOD-02</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Monotropisme, simulateur de Cuillères et Double Empathie.
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab("proches")}
                      className="hud-frame hud-frame-emerald p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-400 hover:bg-slate-900 transition-all text-left group cursor-pointer relative overflow-hidden"
                    >
                      <div className="text-xs font-bold text-emerald-300 mb-1 group-hover:text-emerald-200 flex items-center justify-between">
                        <span>Guide des Proches</span>
                        <span className="text-[10px] font-mono text-slate-500">MOD-03</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        4 analogies simples, gestion du meltdown/shutdown et FAQ famille.
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab("mediatheque")}
                      className="hud-frame p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-400 hover:bg-slate-900 transition-all text-left group cursor-pointer relative overflow-hidden"
                    >
                      <div className="text-xs font-bold text-amber-300 mb-1 group-hover:text-amber-200 flex items-center justify-between">
                        <span>Médiathèque</span>
                        <span className="text-[10px] font-mono text-slate-500">MOD-04</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Livres, audiobooks, documentaires Arte, podcasts et tests.
                      </p>
                    </button>
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
          </>
        )}
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
