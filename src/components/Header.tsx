"use client";

import React, { useState } from "react";
import { useSensory } from "../context/SensoryContext";
import { usePerspective } from "../context/PerspectiveContext";
import {
  Sparkles,
  Eye,
  Sliders,
  ShieldCheck,
  Compass,
  Activity,
  User,
  Menu,
  X,
  VolumeX,
  ExternalLink,
  Info,
  HeartHandshake,
  UserCheck,
  BookOpen,
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDiagnosticModal: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  onOpenDiagnosticModal,
}: HeaderProps) {
  const { lowSensoryMode, toggleLowSensoryMode } = useSensory();
  const { perspective, setPerspective, isAutisticPerspective, isRelativePerspective } = usePerspective();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: Activity },
    { id: "sensorielle", label: "Sensorialité", icon: Sliders },
    { id: "cognitive", label: "Cognition", icon: Compass },
    { id: "proches", label: "Guide Proches", icon: HeartHandshake },
    { id: "mediatheque", label: "Médiathèque", icon: BookOpen },
    { id: "ressources", label: "Boîte à Outils", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      {/* HUD SYSTEM STATUS TELEMETRY STRIP */}
      <div className="w-full bg-slate-950/95 border-b border-cyan-500/15 px-4 sm:px-6 lg:px-8 py-0.5 text-[10px] font-mono flex items-center justify-between text-slate-500 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-bold">SYS.VER // 2.4.0-HUD</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">SPECTRE_GRID: 8-AXIS_ACTIVE</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-400">
          <span>PEER_TELEMETRY: SYNC 99.8%</span>
          <span>PROTOCOL: NEURO-AFFIRMATIVE</span>
          <span className="text-cyan-400/80 font-semibold">[ LAT: 0.12ms ]</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">MODE:</span>
          <span className={`font-semibold ${lowSensoryMode ? "text-emerald-400" : "text-cyan-400"}`}>
            {lowSensoryMode ? "LOW_STIM" : "FULL_IMMERSIVE"}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* LOGO & BRANDING */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="hud-frame relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
              <svg
                className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-sm pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-white to-purple-200">
                  Atlas du Spectre
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider">
                  HUD v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Cartographie communautaire & émancipation du cadre DSM
              </p>
            </div>
          </button>
        </div>

        {/* NAVIGATION LINKS (DESKTOP) */}
        <nav className="hidden xl:flex items-center space-x-1 bg-slate-900/70 p-1.5 rounded-xl border border-slate-800/90 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)] font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{isActive ? `[ ${item.label} ]` : item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ROLE PERSPECTIVE SWITCH & ACTION TOOLS */}
        <div className="flex items-center gap-2.5">
          
          {/* USER PURPOSE / ROLE PERSPECTIVE SELECTOR */}
          <div className="hidden sm:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setPerspective("autiste")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isAutisticPerspective
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Je suis autiste ou en questionnement (auto-exploration & validation)"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Autiste / En quête</span>
            </button>

            <button
              onClick={() => setPerspective("proche")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isRelativePerspective
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Je suis un proche, partenaire, parent ou allié (comprendre & soutenir)"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>Proche / Allié</span>
            </button>
          </div>

          {/* ACCESSIBILITY TOGGLE: MODE SENSORIEL BAS */}
          <button
            onClick={toggleLowSensoryMode}
            title={
              lowSensoryMode
                ? "Désactiver le mode sensoriel bas"
                : "Activer le mode sensoriel bas (réduit animations, contrastes et lueurs)"
            }
            className={`relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              lowSensoryMode
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(52,211,153,0.2)]"
                : "bg-slate-900/90 text-slate-300 border-slate-700/80 hover:border-cyan-500/40 hover:text-cyan-200"
            }`}
          >
            {lowSensoryMode ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Mode Sensoriel Bas : </span>
                <span className="text-emerald-300 font-semibold">Actif</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Mode Sensoriel Bas</span>
                <span className="inline md:hidden">Calme</span>
              </>
            )}
          </button>

          {/* QUICK DIAGNOSTIC ACTION BUTTON */}
          <button
            onClick={onOpenDiagnosticModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-300 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/40 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Parcours Diagnostique</span>
          </button>

          {/* USER PROFILE PILL */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${
                  isRelativePerspective
                    ? "bg-gradient-to-tr from-emerald-500 to-teal-600"
                    : "bg-gradient-to-tr from-cyan-500 to-indigo-600"
                }`}
              >
                {isRelativePerspective ? "PR" : "AM"}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-slate-200 leading-none">
                  {isRelativePerspective ? "Espace Proche" : "Alex M."}
                </div>
                <div
                  className={`text-[10px] font-mono leading-none mt-0.5 ${
                    isRelativePerspective ? "text-emerald-400" : "text-cyan-400"
                  }`}
                >
                  {isRelativePerspective ? "Guide Allié" : "Profil Évolutif"}
                </div>
              </div>
            </button>

            {/* PROFILE DROPDOWN */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 glass-panel rounded-xl p-3.5 border border-slate-700/80 shadow-2xl z-50">
                <div className="pb-2.5 border-b border-slate-800">
                  <div className="text-xs font-bold text-white">
                    {isRelativePerspective
                      ? "Perspective : Proche & Accompagnant"
                      : "Perspective : Alex Morgan (En questionnement)"}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isRelativePerspective
                      ? "Accès aux fiches de soutien, décodage et désamorçage de crise."
                      : "Cartographie personnelle et validation par les pairs."}
                  </div>
                </div>

                <div className="py-2.5 space-y-2 text-xs text-slate-300">
                  <div className="text-[11px] font-mono uppercase text-slate-400">
                    Changer d'angle de lecture :
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => {
                        setPerspective("autiste");
                        setProfileDropdownOpen(false);
                      }}
                      className={`p-2 rounded-lg text-left text-xs border ${
                        isAutisticPerspective
                          ? "bg-cyan-950/80 text-cyan-200 border-cyan-400/50"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <div className="font-bold">Pour Moi</div>
                      <div className="text-[10px] text-slate-400">Auto-évaluation</div>
                    </button>
                    <button
                      onClick={() => {
                        setPerspective("proche");
                        setProfileDropdownOpen(false);
                      }}
                      className={`p-2 rounded-lg text-left text-xs border ${
                        isRelativePerspective
                          ? "bg-emerald-950/80 text-emerald-200 border-emerald-400/50"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <div className="font-bold">Pour Mon Proche</div>
                      <div className="text-[10px] text-slate-400">Comprendre l'autre</div>
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenDiagnosticModal();
                    }}
                    className="w-full text-left py-1 text-xs text-cyan-300 hover:text-cyan-200 flex items-center justify-between"
                  >
                    <span>Guide des parcours diagnostiques</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950/95 p-4 space-y-3">
          
          {/* MOBILE ROLE TOGGLE */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setPerspective("autiste")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center ${
                isAutisticPerspective
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400"
              }`}
            >
              Mode Autiste
            </button>
            <button
              onClick={() => setPerspective("proche")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center ${
                isRelativePerspective
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-400"
              }`}
            >
              Mode Proche / Allié
            </button>
          </div>

          {/* NAV ITEMS */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnosticModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-purple-900/40 text-purple-200 border border-purple-500/30"
            >
              <Compass className="w-4 h-4" />
              Explorer les parcours diagnostiques
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
