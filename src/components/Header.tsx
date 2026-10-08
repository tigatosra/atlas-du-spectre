"use client";

import React, { useState } from "react";
import { useSensory } from "../context/SensoryContext";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: Activity },
    { id: "sensorielle", label: "Sphère Sensorielle", icon: Sliders },
    { id: "cognitive", label: "Sphère Cognitive", icon: Compass },
    { id: "ressources", label: "Ressources", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO & BRANDING */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <svg
              className="w-6 h-6 text-cyan-400 animate-pulse-slow"
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
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                Neuro-Affirmatif
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Cartographie communautaire & émancipation du cadre DSM
            </p>
          </div>
        </div>

        {/* NAVIGATION LINKS (DESKTOP) */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ACTION TOOLS & USER PROFILE */}
        <div className="flex items-center gap-3">
          
          {/* ACCESSIBILITY TOGGLE: MODE SENSORIEL BAS */}
          <button
            onClick={toggleLowSensoryMode}
            title={
              lowSensoryMode
                ? "Désactiver le mode sensoriel bas"
                : "Activer le mode sensoriel bas (réduit animations, contrastes et lueurs)"
            }
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              lowSensoryMode
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(52,211,153,0.2)]"
                : "bg-slate-900/90 text-slate-300 border-slate-700/80 hover:border-cyan-500/40 hover:text-cyan-200"
            }`}
          >
            {lowSensoryMode ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Mode Sensoriel Bas : </span>
                <span className="text-emerald-300 font-semibold">Actif</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Mode Sensoriel Bas</span>
                <span className="inline sm:hidden">Sensible</span>
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
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                AM
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-slate-200 leading-none">
                  Alex M.
                </div>
                <div className="text-[10px] text-cyan-400 font-mono leading-none mt-0.5">
                  Profil Évolutif
                </div>
              </div>
            </button>

            {/* PROFILE DROPDOWN */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 glass-panel rounded-xl p-3 border border-slate-700/80 shadow-2xl z-50">
                <div className="pb-2 border-b border-slate-800">
                  <div className="text-xs font-bold text-white">Alex Morgan (Adulte en questionnement)</div>
                  <div className="text-[11px] text-slate-400">Membre de la communauté depuis mars 2026</div>
                </div>
                
                <div className="py-2 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Cartographie complétée :</span>
                    <span className="font-semibold text-cyan-300">74%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full w-[74%]" />
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Expériences partagées :</span>
                    <span className="font-semibold text-purple-300">5</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Résonances reçues :</span>
                    <span className="font-semibold text-emerald-300">421</span>
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
                    <span>Mon guide de parcours</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 p-4 space-y-2">
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
