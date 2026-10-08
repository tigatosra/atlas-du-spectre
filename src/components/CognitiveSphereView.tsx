"use client";

import React, { useState } from "react";
import { cognitiveConceptsData } from "../data/mockData";
import { CognitiveConceptItem } from "../types/spectrum";
import { usePerspective } from "../context/PerspectiveContext";
import {
  Compass,
  Brain,
  Zap,
  Shield,
  MessageSquare,
  Sparkles,
  HeartHandshake,
  User,
  Coffee,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

export default function CognitiveSphereView() {
  const { isRelativePerspective } = usePerspective();
  const [activeConceptId, setActiveConceptId] = useState<string>("monotropism");

  // Spoon Theory Interactive Simulator
  const [spoons, setSpoons] = useState<number>(12);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({
    shower: true,
    work: true,
  });

  const dailyActivities = [
    { id: "shower", label: "Prendre une douche & s'habiller", cost: 1, type: "drain" },
    { id: "work", label: "4 heures de travail / études avec sollicitations", cost: 3, type: "drain" },
    { id: "groceries", label: "Faire les courses dans un supermarché bondé", cost: 4, type: "drain" },
    { id: "phone", label: "Passer un appel téléphonique administratif imprévu", cost: 2, type: "drain" },
    { id: "social", label: "Dîner avec 5 personnes dans un restaurant bruyant", cost: 5, type: "drain" },
    { id: "hyperfocus", label: "2 heures d'activité passion (intérêt spécifique) au calme", cost: -2, type: "recharge" },
    { id: "nap", label: "Sieste sous couverture lestée sans lumière", cost: -3, type: "recharge" },
  ];

  const toggleActivity = (id: string, cost: number) => {
    setCompletedActivities((prev) => {
      const willBeActive = !prev[id];
      setSpoons((s) => (willBeActive ? s - cost : s + cost));
      return { ...prev, [id]: willBeActive };
    });
  };

  const resetSpoons = () => {
    setSpoons(12);
    setCompletedActivities({});
  };

  const activeConcept =
    cognitiveConceptsData.find((c) => c.id === activeConceptId) ||
    cognitiveConceptsData[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER BANNER */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 relative overflow-hidden">
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span>Architecture Mentale & Régulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sphère Cognitive & Modèles Neuro-Affirmatifs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isRelativePerspective
              ? "Comprendre le fonctionnement interne d'un esprit autiste : pourquoi les transitions sont difficiles, d'où vient l'inertie et pourquoi l'énergie sociale s'épuise si vite."
              : "Dépassez la vision déficitaire du DSM. Vos tunnels attentionnels, votre logique directe et vos fluctuations d'énergie sont les propriétés d'un système nerveux câblé différemment."}
          </p>
        </div>
      </div>

      {/* CONCEPTS TABS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cognitiveConceptsData.map((concept) => {
          const isSelected = concept.id === activeConceptId;
          return (
            <button
              key={concept.id}
              onClick={() => setActiveConceptId(concept.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-slate-900 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="text-xs font-mono text-purple-400 font-semibold mb-1">
                {concept.scientificReference}
              </div>
              <div className="text-sm font-bold text-white mb-0.5 truncate">
                {concept.title}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-1">
                {concept.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE CONCEPT DEEP DIVE CARD */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-6">
        <div className="pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
              {activeConcept.scientificReference}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {activeConcept.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeConcept.subtitle}
            </p>
          </div>

          <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/40">
            Concept Scientifique Clé
          </span>
        </div>

        {/* SUMMARY */}
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          {activeConcept.executiveSummary}
        </p>

        {/* DUAL PERSPECTIVES IN DAILY LIFE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Conséquence vécue pour soi :</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeConcept.dailyConsequenceSelf}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Ce que perçoit l'entourage (et le piège à éviter) :</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeConcept.dailyConsequenceRelative}
            </p>
          </div>
        </div>

        {/* CONCRETE REAL-WORLD SCENARIO */}
        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1.5">
          <div className="text-xs font-mono text-purple-300 uppercase tracking-wider font-semibold">
            Exemple concret du quotidien :
          </div>
          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
            « {activeConcept.concreteExample} »
          </p>
        </div>

        {/* ACTIONABLE TIPS COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              Stratégies pratiques pour la personne :
            </h3>
            <ul className="space-y-2">
              {activeConcept.practicalTipsSelf.map((tip, i) => (
                <li
                  key={i}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed flex items-start gap-2"
                >
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-300 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              Ce que l'entourage peut faire pour soutenir :
            </h3>
            <ul className="space-y-2">
              {activeConcept.practicalTipsRelative.map((tip, i) => (
                <li
                  key={i}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed flex items-start gap-2"
                >
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MODULE: SPOON THEORY SIMULATOR */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-950 border border-amber-500/40 text-amber-400">
                <Coffee className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-white">
                Simulateur Interactif : La Théorie des Cuillères
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Un outil visuel universel créé par Christine Miserandino pour mesurer le coût invisible de chaque journée.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Cuillères restantes :</span>
              <span
                className={`text-lg font-mono font-bold ${
                  spoons <= 0
                    ? "text-rose-400"
                    : spoons <= 4
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {spoons} / 12
              </span>
            </div>
            <button
              onClick={resetSpoons}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              title="Réinitialiser à 12 cuillères"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SPOONS VISUAL ICONS */}
        <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800 items-center justify-center sm:justify-start">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                i < spoons
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                  : "bg-slate-900 text-slate-600 border border-slate-800 opacity-40 line-through"
              }`}
            >
              🥄
            </div>
          ))}
          {spoons < 0 && (
            <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-1 rounded border border-rose-500/30">
              Déficit : {Math.abs(spoons)} cuillères empruntées sur le sommeil de demain !
            </span>
          )}
        </div>

        {/* ACTIVITIES CHECKLIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {dailyActivities.map((act) => {
            const isDone = completedActivities[act.id];
            return (
              <button
                key={act.id}
                onClick={() => toggleActivity(act.id, act.cost)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  isDone
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                      isDone
                        ? "bg-cyan-500 border-cyan-400 text-black font-bold"
                        : "border-slate-700"
                    }`}
                  >
                    {isDone ? "✓" : ""}
                  </span>
                  <span>{act.label}</span>
                </div>

                <span
                  className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                    act.cost > 0
                      ? "bg-rose-950/70 text-rose-300 border border-rose-500/30"
                      : "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                  }`}
                >
                  {act.cost > 0 ? `-${act.cost} 🥄` : `+${Math.abs(act.cost)} 🥄`}
                </span>
              </button>
            );
          })}
        </div>

        {/* SUMMARY ADVICE ACCORDING TO REMAINING SPOONS */}
        <div
          className={`p-4 rounded-xl border text-xs leading-relaxed ${
            spoons <= 0
              ? "bg-rose-950/30 border-rose-500/40 text-rose-200"
              : spoons <= 4
              ? "bg-amber-950/30 border-amber-500/40 text-amber-200"
              : "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
          }`}
        >
          {spoons <= 0 ? (
            <div>
              🚨 <strong>Alerte Shutdown / Burnout :</strong> Votre budget est épuisé. Tout effort supplémentaire exigera plusieurs jours de récupération. Annulez les sorties non vitales et coupez les stimuli.
            </div>
          ) : spoons <= 4 ? (
            <div>
              ⚠️ <strong>Niveau Critique :</strong> Il vous reste peu d'énergie. Réservez vos dernières cuillères pour vous nourrir et vous reposer, ne commencez pas de grand projet ce soir.
            </div>
          ) : (
            <div>
              ✅ <strong>Énergie Suffisante :</strong> Votre budget est équilibré. Pensez à conserver des cuillères en réserve pour les imprévus.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
