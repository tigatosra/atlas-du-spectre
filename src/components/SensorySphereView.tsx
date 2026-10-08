"use client";

import React, { useState } from "react";
import { sensorySphereItems } from "../data/mockData";
import { SensorySphereItem } from "../types/spectrum";
import { usePerspective } from "../context/PerspectiveContext";
import { useSensory } from "../context/SensoryContext";
import {
  Volume2,
  Sun,
  Fingerprint,
  Activity,
  Sliders,
  Shield,
  AlertTriangle,
  HeartHandshake,
  User,
  Sparkles,
  Info,
  CheckCircle,
} from "lucide-react";

export default function SensorySphereView() {
  const { isRelativePerspective } = usePerspective();
  const { lowSensoryMode } = useSensory();

  const [activeSensoryId, setActiveSensoryId] = useState<string>("audition");
  const [intensities, setIntensities] = useState<Record<string, number>>({
    audition: 8,
    vision: 7,
    tactile: 7,
    proprioception: 6,
  });

  const [activeTriggers, setActiveTriggers] = useState<Record<string, boolean>>({
    "Open space": true,
    "Néons fluorescents": true,
    "Étiquettes de cols": true,
    "Foules": true,
  });

  const activeItem =
    sensorySphereItems.find((item) => item.id === activeSensoryId) ||
    sensorySphereItems[0];

  const handleIntensityChange = (id: string, val: number) => {
    setIntensities((prev) => ({ ...prev, [id]: val }));
  };

  const toggleTrigger = (trigger: string) => {
    setActiveTriggers((prev) => ({ ...prev, [trigger]: !prev[trigger] }));
  };

  // Calculate Cumulative Sensory Saturation Index
  const averageIntensity =
    Object.values(intensities).reduce((a, b) => a + b, 0) /
    Object.values(intensities).length;

  const getSensoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Volume2":
        return <Volume2 className="w-5 h-5" />;
      case "Sun":
        return <Sun className="w-5 h-5" />;
      case "Fingerprint":
        return <Fingerprint className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER BANNER */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cartographie Complète des 4 Canaux Sensoriels</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sphère Sensorielle & Traitement Neurologique
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isRelativePerspective
                ? "Découvrez comment votre proche perçoit physiquement le monde. Ce qui vous paraît anodin (un néon, un bruit de mastication, une étiquette) peut être une véritable agression neurologique pour lui."
                : "Chez les personnes autistes, l'absence de filtrage automatique des stimuli rend l'environnement physique hautement sollicitant. Évaluez vos canaux et identifiez vos outils régulateurs."}
            </p>
          </div>

          {/* SENSORY SATURATION METER */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 shrink-0 text-center sm:text-left">
            <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
              {isRelativePerspective ? "Charge sensorielle estimée du proche" : "Votre Charge Sensorielle Globale"}
            </div>
            <div className="flex items-baseline gap-2 justify-center sm:justify-start">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300">
                {averageIntensity.toFixed(1)} / 10
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded font-semibold ${
                  averageIntensity >= 7.5
                    ? "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                    : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                }`}
              >
                {averageIntensity >= 7.5 ? "Haute Saturation" : "Modérée"}
              </span>
            </div>
            <div className="w-48 bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 h-full transition-all duration-300"
                style={{ width: `${(averageIntensity / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SENSORY CHANNELS SELECTOR TABS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sensorySphereItems.map((item) => {
          const isSelected = item.id === activeSensoryId;
          const currentVal = intensities[item.id] || 5;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSensoryId(item.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={isSelected ? "text-cyan-400" : "text-slate-400"}>
                  {getSensoryIcon(item.icon)}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  {currentVal}/10
                </span>
              </div>
              <div className="text-sm font-bold text-white mb-0.5 truncate">
                {item.shortName}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-1">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE SENSORY CHANNEL DEEP DIVE */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-6">
        
        {/* TOP CHANNEL SUMMARY & LIVE INTENSITY SLIDER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                {getSensoryIcon(activeItem.icon)}
              </span>
              <h2 className="text-xl font-bold text-white">
                {activeItem.name}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeItem.description}
            </p>
          </div>

          {/* SLIDER FOR THIS CHANNEL */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 w-full md:w-80 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Niveau de sensibilité :</span>
              <span className="text-cyan-300 font-bold">{intensities[activeItem.id]} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensities[activeItem.id]}
              onChange={(e) => handleIntensityChange(activeItem.id, parseInt(e.target.value))}
              className="w-full cyber-slider cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Faible</span>
              <span>Modéré</span>
              <span>Hypersensible</span>
            </div>
          </div>
        </div>

        {/* HYPER VS HYPO COMPARISON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>⚡</span> Profil Hypersensible (Surcharge fréquente) :
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeItem.hyperSensibility}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>🌊</span> Profil Hyposensible / Recherche de Stimming :
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeItem.hypoSensibility}
            </p>
          </div>
        </div>

        {/* DUAL PERSPECTIVE ADVICE BOX */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-500/40 space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>
              {isRelativePerspective
                ? "Conseil Essentiel pour l'Entourage & la Vie Commune :"
                : "Ce que votre entourage a besoin de comprendre :"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeItem.forRelativesAdvice}
          </p>
        </div>

        {/* TRIGGERS & SOOTHING TOOLS DUAL COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* TRIGGERS CHECKLIST */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white">
                Déclencheurs Fréquents (Cochez les vôtres)
              </h3>
            </div>
            <div className="space-y-2">
              {activeItem.commonTriggers.map((trig, i) => {
                const isActive = activeTriggers[trig];
                return (
                  <button
                    key={i}
                    onClick={() => toggleTrigger(trig)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-all ${
                      isActive
                        ? "bg-rose-950/40 border-rose-500/40 text-rose-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span>{trig}</span>
                    <span className="font-mono text-[10px]">
                      {isActive ? "✓ Déclencheur identifié" : "+ Déclarer"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SOOTHING TOOLS */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                Outils & Stratégies d'Apaisement Recommandés
              </h3>
            </div>
            <div className="space-y-2">
              {activeItem.soothingTools.map((tool, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
