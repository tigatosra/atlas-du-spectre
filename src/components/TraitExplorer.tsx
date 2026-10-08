"use client";

import React, { useState } from "react";
import {
  intensityStatsData,
  initialExperiences,
} from "../data/mockData";
import { ExperienceComment } from "../types/spectrum";
import { useSensory } from "../context/SensoryContext";
import {
  Volume2,
  VolumeX,
  Volume1,
  Headphones,
  Send,
  Heart,
  Tag,
  Sparkles,
  CheckCircle2,
  Shield,
  Layers,
  BarChart2,
  AlertTriangle,
  Lightbulb,
  Sliders,
  HeartHandshake,
  User,
  HelpCircle,
} from "lucide-react";
import { usePerspective } from "../context/PerspectiveContext";

export default function TraitExplorer() {
  const { lowSensoryMode } = useSensory();
  const { perspective, isRelativePerspective } = usePerspective();

  const [intensity, setIntensity] = useState<number>(8); // Default peak 8
  const [filterMode, setFilterMode] = useState<"current" | "all">("current");
  const [activeLens, setActiveLens] = useState<"self" | "relative">("self");
  const [authorType, setAuthorType] = useState<"autiste" | "proche">("autiste");
  const [experiences, setExperiences] =
    useState<ExperienceComment[]>(initialExperiences);

  // Sync active lens with global perspective
  React.useEffect(() => {
    setActiveLens(isRelativePerspective ? "relative" : "self");
    setAuthorType(perspective);
  }, [perspective, isRelativePerspective]);

  // New experience form states
  const [newText, setNewText] = useState("");
  const [newContext, setNewContext] = useState("Open-space");
  const [newCoping, setNewCoping] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const currentStat = intensityStatsData[intensity];

  // Filter experiences according to mode
  const filteredExperiences = experiences.filter((exp) =>
    filterMode === "current" ? exp.intensityLevel === intensity : true
  );

  // Handle Resonance (Like / "Je résonne")
  const handleToggleResonance = (id: string) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id === id) {
          const wasResonated = exp.userResonated;
          return {
            ...exp,
            userResonated: !wasResonated,
            resonancesCount: wasResonated
              ? exp.resonancesCount - 1
              : exp.resonancesCount + 1,
          };
        }
        return exp;
      })
    );
  };

  // Submit new testimony
  const handleSubmitExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newComment: ExperienceComment = {
      id: `custom-${Date.now()}`,
      author: authorType === "proche" ? "Vous (Proche / Allié)" : "Vous (Personne concernée)",
      avatarText: authorType === "proche" ? "PR" : "VS",
      intensityLevel: intensity,
      timestamp: "À l'instant",
      contextTag: newContext,
      text: newText.trim(),
      resonancesCount: 1,
      userResonated: true,
      copingStrategy: newCoping.trim() || (authorType === "proche" ? "Sas de décompression sans questions." : "Sas de repos dans une pièce calme."),
      tags: [authorType === "proche" ? "Regard Proche" : "Vécu Direct", newContext, "Partage Récent"],
      perspectiveAuthor: authorType,
    };

    setExperiences([newComment, ...experiences]);
    setNewText("");
    setNewCoping("");
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  // Soundwave waveform simulation bars
  const waveHeights = [20, 35, 60, 40, 85, 95, 50, 70, 90, 45, 65, 80, 55, 30];

  return (
    <section className="hud-frame glass-panel rounded-2xl p-5 md:p-8 border border-slate-800/80 shadow-2xl relative overflow-hidden">
      {/* HUD TELEMETRY BAR */}
      <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/80 tracking-widest pb-3 mb-4 border-b border-cyan-500/15">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>HUD.MODULE // 02-ACOUSTIC_SPECTRAL_SCANNER</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-500 text-[10px]">
          <span>FREQ: 20Hz - 20kHz</span>
          <span>NEURAL_FILTER: PASSIVE</span>
          <span className="text-cyan-400 font-bold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
            CH-AUDITORY // LIVE
          </span>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Headphones className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Sphère Sensorielle • Trait Explorer HUD
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-950/60 text-purple-300 border border-purple-500/30">
              Données Collaboratives
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
            Sensibilité Auditive & Traitement Acoustique
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Chez les personnes neuroatypiques, le cerveau ne dispose souvent pas du filtre automatique
            qui atténue les bruits de fond. Explorez ci-dessous comment l'intensité se vit concrètement.
          </p>
        </div>

        {/* SOUND INTENSITY TACTICAL HUD ANALYZER BADGE */}
        <div className="flex items-center gap-3 bg-slate-950/90 px-4 py-2.5 rounded-xl border border-cyan-500/30 self-start lg:self-auto shadow-[0_0_15px_rgba(34,211,238,0.1)]">
          <div className="flex items-end gap-1 h-8 px-1 py-0.5 bg-slate-900/80 rounded border border-slate-800">
            {waveHeights.map((h, i) => {
              const adjustedHeight = Math.min(
                100,
                Math.round(h * (intensity / 7))
              );
              return (
                <span
                  key={i}
                  className="w-1 rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.max(15, adjustedHeight)}%`,
                    backgroundColor:
                      intensity > 7
                        ? "#f43f5e"
                        : intensity > 4
                        ? "#a855f7"
                        : "#22d3ee",
                  }}
                />
              );
            })}
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <span>SCAN_AMP :</span>
              <span className="text-cyan-400 font-bold">{(intensity * 9.8).toFixed(1)} dB</span>
            </div>
            <div className="text-sm font-bold font-mono text-white flex items-center gap-1.5">
              <span>NIVEAU {intensity}/10</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                  intensity >= 8
                    ? "text-rose-300 bg-rose-950/80 border border-rose-500/40"
                    : intensity >= 5
                    ? "text-purple-300 bg-purple-950/80 border border-purple-500/40"
                    : "text-cyan-300 bg-cyan-950/80 border border-cyan-500/40"
                }`}
              >
                {intensity >= 8
                  ? "Surcharge vive"
                  : intensity >= 5
                  ? "Fatigue progressive"
                  : "Filtrable"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. GRAND SLIDER STYLISÉ (1 À 10) */}
      <div className="py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <label
            htmlFor="auditory-slider"
            className="text-sm font-semibold text-slate-200 flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            Curseur d'Intensité Sensorielle :
          </label>
          <div className="text-xs text-slate-400 font-mono">
            Glissez pour explorer les vécus de 1 (Filtrage naturel) à 10 (Shutdown acoustique)
          </div>
        </div>

        {/* SLIDER INPUT */}
        <div className="relative px-2">
          <input
            id="auditory-slider"
            type="range"
            min="1"
            max="10"
            step="1"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full cyber-slider h-3 cursor-pointer"
          />

          {/* TICKS / NUMBERS */}
          <div className="flex justify-between items-center mt-3 text-xs font-mono select-none px-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setIntensity(num)}
                className={`flex flex-col items-center transition-all ${
                  intensity === num
                    ? "text-cyan-300 font-bold scale-110"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs transition-colors ${
                    intensity === num
                      ? "bg-cyan-500/20 border border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                      : "bg-slate-900 border border-slate-800"
                  }`}
                >
                  {num}
                </span>
                <span className="text-[10px] hidden md:block mt-1">
                  {num === 1
                    ? "Faible"
                    : num === 5
                    ? "Moyen"
                    : num === 8
                    ? "Douloureux"
                    : num === 10
                    ? "Critique"
                    : ""}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE INTENSITY DESCRIPTION CARD WITH DUAL LENS TABS */}
        <div className="hud-frame mt-6 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-cyan-500/30 relative overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.05)]">
          {/* Top HUD micro-telemetry */}
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 mb-2 pb-1 border-b border-cyan-500/10">
            <span>[ SENSORY_VECTOR // CH-01: ACOUSTIC ]</span>
            <span>TELEMETRY_STATUS: LEVEL_{currentStat.level}_CALIBRATED</span>
          </div>
          
          {/* LENS SWITCHER BUTTONS */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Niveau {currentStat.level} / 10 • {currentStat.shortDescription}
              </span>
            </div>

            <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveLens("self")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  activeLens === "self"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30 shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <User className="w-3 h-3 text-cyan-400" />
                <span>Vécu Réel</span>
              </button>
              <button
                onClick={() => setActiveLens("relative")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  activeLens === "relative"
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30 shadow-[0_0_8px_rgba(52,211,153,0.2)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <HeartHandshake className="w-3 h-3 text-emerald-400" />
                <span>Guide Proche</span>
              </button>
            </div>
          </div>

          {activeLens === "self" ? (
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {currentStat.detailedSymptom}
                </p>
                <div className="pt-2 text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Seuil auditif : {currentStat.auditoryThreshold}</span>
                </div>
              </div>

              {/* STRATEGIES PILL BOX */}
              <div className="md:w-72 bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
                <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Adaptations pour soi :
                </div>
                <ul className="space-y-1">
                  {currentStat.accompanyingStrategies.map((strat, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-300 flex items-start gap-1.5"
                    >
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* RELATIVE GUIDANCE LENS */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>👁️</span> Signes observables chez votre proche :
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {currentStat.relativeGuidance.visibleSigns}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30">
                <div className="text-[11px] font-mono text-rose-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>🚫</span> Ce qu'il faut absolument éviter :
                </div>
                <p className="text-xs text-rose-100/90 leading-relaxed">
                  {currentStat.relativeGuidance.whatToAvoid}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <div className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>🛡️</span> L'action la plus efficace :
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {currentStat.relativeGuidance.effectiveAction}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/30">
                <div className="text-[11px] font-mono text-purple-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>💬</span> Phrase sécurisante à prononcer :
                </div>
                <p className="text-xs text-purple-100/90 italic font-medium leading-relaxed">
                  "{currentStat.relativeGuidance.safePhrase}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. STATISTIQUES DE LA COMMUNAUTÉ (VISUEL DYNAMIQUE HUD) */}
      <div className="py-4 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white font-mono tracking-wide">
              HUD.DISTRIBUTION // Communauté Neurodivergente
            </h3>
          </div>
          <div className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.15)]">
            📊 <strong>{currentStat.percentage}%</strong> des utilisateurs se situent au niveau {intensity}
          </div>
        </div>

        {/* DISTRIBUTION BAR CHART WITH HUD GRID */}
        <div className="grid grid-cols-10 gap-1 sm:gap-2 items-end h-28 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 relative overflow-hidden bg-cyber-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => {
            const stat = intensityStatsData[lvl];
            const isSelected = lvl === intensity;
            return (
              <div
                key={lvl}
                onClick={() => setIntensity(lvl)}
                className="group h-full flex flex-col justify-end items-center cursor-pointer relative z-10"
              >
                <div className="text-[10px] font-mono mb-1 text-slate-400 group-hover:text-cyan-300 transition-colors">
                  {stat.percentage}%
                </div>
                <div className="w-full bg-slate-800/60 rounded-t-sm h-full flex items-end overflow-hidden">
                  <div
                    className={`w-full transition-all duration-300 rounded-t-sm ${
                      isSelected
                        ? "bg-gradient-to-t from-cyan-500 to-purple-400 shadow-[0_0_14px_rgba(34,211,238,0.6)]"
                        : "bg-slate-700/60 group-hover:bg-slate-600"
                    }`}
                    style={{ height: `${(stat.percentage / 25) * 100}%` }}
                  />
                </div>
                <div
                  className={`mt-1.5 text-[10px] font-mono ${
                    isSelected ? "font-bold text-cyan-300" : "text-slate-500"
                  }`}
                >
                  N{lvl}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center justify-between">
          <span>* Pic remarquable à 7 et 8 chez les adultes non-diagnostiqués dans l'enfance.</span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">[ POPULATION_SAMPLE: N=14,280 ]</span>
        </p>
      </div>

      {/* 3. MUR D'EXPÉRIENCES (COMMUNITY WALL) */}
      <div className="mt-6 pt-6 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Mur d'Expériences Vécues</span>
              <span className="text-xs font-mono font-normal text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                {filteredExperiences.length} témoignage{filteredExperiences.length > 1 ? "s" : ""}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Ce que ressentent les personnes réelles à ce palier d'intensité.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterMode("current")}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                filterMode === "current"
                  ? "bg-cyan-950/60 text-cyan-200 border-cyan-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800"
              }`}
            >
              Niveau {intensity} uniquement
            </button>
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                filterMode === "all"
                  ? "bg-cyan-950/60 text-cyan-200 border-cyan-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800"
              }`}
            >
              Tous les vécus
            </button>
          </div>
        </div>

        {/* EXPERIENCES SCROLLABLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[460px] overflow-y-auto pr-1">
          {filteredExperiences.length === 0 ? (
            <div className="col-span-full py-10 text-center glass-panel-subtle rounded-xl border border-slate-800">
              <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm text-slate-300">
                Aucun témoignage enregistré pour le niveau {intensity} pour l'instant.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Soyez la première personne à ajouter votre vécu ci-dessous !
              </p>
            </div>
          ) : (
            filteredExperiences.map((exp, expIdx) => (
              <div
                key={exp.id}
                className="hud-frame glass-panel-subtle rounded-xl p-4 border border-slate-800/90 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
              >
                <div>
                  {/* CARD TOP INFO */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-200">
                        {exp.avatarText}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white leading-none">
                          {exp.author}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {exp.timestamp}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">
                        #REC-{String(expIdx + 1).padStart(2, "0")}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                        Niv. {exp.intensityLevel}
                      </span>
                    </div>
                  </div>

                  {/* CONTEXT PILL & PERSPECTIVE BADGE */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900 text-slate-300 border border-slate-800">
                      <Tag className="w-3 h-3 text-cyan-400" />
                      <span>{exp.contextTag}</span>
                    </span>

                    {exp.perspectiveAuthor === "proche" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                        <HeartHandshake className="w-3 h-3 text-emerald-400" />
                        <span>Regard Proche</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                        <User className="w-3 h-3 text-cyan-400" />
                        <span>Vécu Direct</span>
                      </span>
                    )}
                  </div>

                  {/* COMMENT TEXT */}
                  <p className="text-xs text-slate-200 leading-relaxed italic mb-3">
                    "{exp.text}"
                  </p>
                </div>

                <div>
                  {/* STRATEGY IF AVAILABLE */}
                  {exp.copingStrategy && (
                    <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 text-[11px] text-emerald-300/90 mb-3">
                      🛡️ <span className="font-semibold text-emerald-400">Ce qui aide :</span>{" "}
                      {exp.copingStrategy}
                    </div>
                  )}

                  {/* BOTTOM ACTIONS (RESONANCE) */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleResonance(exp.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        exp.userResonated
                          ? "bg-rose-950/60 text-rose-300 border border-rose-500/40"
                          : "text-slate-400 hover:text-rose-300 hover:bg-rose-950/20"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          exp.userResonated
                            ? "fill-rose-400 text-rose-400"
                            : "text-slate-400"
                        }`}
                      />
                      <span>Je résonne</span>
                      <span className="font-mono text-[11px] opacity-80">
                        ({exp.resonancesCount})
                      </span>
                    </button>

                    <span className="text-[10px] font-mono text-slate-500">
                      Validé par les pairs
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. CHAMP DE SAISIE MODERNE (AJOUT D'EXPÉRIENCE - CONSOLE HUD) */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <div className="hud-frame bg-slate-950/90 rounded-xl p-4 sm:p-5 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.06)]">
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 mb-2 pb-1 border-b border-cyan-500/10">
            <span>[ CONSOLE // TRANSMISSION_ANONYME ]</span>
            <span>SECURE_PEER_FEED: ENCRYPTED</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Ajoutez votre propre expérience pour l'intensité {intensity} / 10
            </h4>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Totalement Anonyme • Espace Sécurisé
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Votre partage aide d'autres adultes en questionnement à briser le sentiment d'isolement.
          </p>

          <form onSubmit={handleSubmitExperience} className="space-y-3.5">
            {/* ROLE SELECTOR FOR SUBMISSION */}
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="text-[11px] font-mono text-slate-400">
                Vous témoignez en tant que :
              </span>
              <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setAuthorType("autiste")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                    authorType === "autiste"
                      ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <User className="w-3 h-3 text-cyan-400" />
                  <span>Personne concernée</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthorType("proche")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                    authorType === "proche"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <HeartHandshake className="w-3 h-3 text-emerald-400" />
                  <span>Proche / Partenaire / Parent</span>
                </button>
              </div>
            </div>

            <div>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                rows={3}
                placeholder={
                  authorType === "proche"
                    ? `Partagez une situation vécue avec votre proche au niveau ${intensity} (comment vous l'avez vu réagir, ce qui l'a aidé ou apaisé, votre prise de conscience)...`
                    : `Racontez une situation vécue au niveau ${intensity} (ex: le bourdonnement des néons au travail, l'effet d'une fête d'anniversaire, la sensation physique)...`
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Contexte environnemental :
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Open-space",
                    "Transports",
                    "Supermarché",
                    "Repas de famille",
                    "Chez soi",
                    "Lieu public",
                  ].map((ctx) => (
                    <button
                      type="button"
                      key={ctx}
                      onClick={() => setNewContext(ctx)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        newContext === ctx
                          ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-semibold"
                          : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {ctx}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Ce qui vous soulage (stratégie / outil) :
                </label>
                <input
                  type="text"
                  value={newCoping}
                  onChange={(e) => setNewCoping(e.target.value)}
                  placeholder="Ex: Bouchons d'oreille Loop, fuite aux toilettes, couverture lestée..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                {submittedSuccess ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Votre vécu a été ajouté au mur d'expériences !
                  </span>
                ) : (
                  <span>Les récits respectueux et authentiques sont précieux.</span>
                )}
              </span>

              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publier mon expérience</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
