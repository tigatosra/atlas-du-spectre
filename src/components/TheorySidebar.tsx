"use client";

import React, { useState } from "react";
import { theoriesList } from "../data/mockData";
import { TheoryWidgetData } from "../types/spectrum";
import {
  Compass,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Brain,
  Shield,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface TheorySidebarProps {
  onOpenDiagnosticModal: () => void;
}

export default function TheorySidebar({
  onOpenDiagnosticModal,
}: TheorySidebarProps) {
  const [expandedId, setExpandedId] = useState<string>("monotropism");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  const getTheoryIcon = (id: string) => {
    switch (id) {
      case "monotropism":
        return <Brain className="w-4 h-4 text-purple-400" />;
      case "masking":
        return <Shield className="w-4 h-4 text-amber-400" />;
      case "double-empathy":
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <aside className="space-y-5">
      {/* 1. CALL TO ACTION: EXPLORER LES PARCOURS DIAGNOSTIQUES */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/40 relative overflow-hidden shadow-[0_0_25px_rgba(34,211,238,0.15)] group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
            <Compass className="w-5 h-5 text-cyan-400" />
          </span>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
              Orientation & Démarches
            </span>
            <h3 className="text-base font-bold text-white">
              Parcours Diagnostiques
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          De l'auto-identification bienveillante aux bilans officiels (CRA, psychiatres spécialisés adultes). Découvrez vos options étape par étape.
        </p>

        <button
          onClick={onOpenDiagnosticModal}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-200" />
            <span>Explorer les parcours diagnostiques</span>
          </div>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>✓ Auto-évaluation reconnue</span>
          <span>✓ Éviter l'errance</span>
        </div>
      </div>

      {/* 2. THEORIES & CONCEPTS ESSENTIELS WIDGETS */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">
              Théories Neuro-Affirmatives
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Hors du DSM
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Comprendre l'autisme par le prisme de la neurodiversité contemporaine plutôt que par le seul modèle du déficit.
        </p>

        <div className="space-y-3">
          {theoriesList.map((theory) => {
            const isExpanded = expandedId === theory.id;
            return (
              <div
                key={theory.id}
                className={`rounded-xl border transition-all ${
                  isExpanded
                    ? "bg-slate-900/90 border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.08)]"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* WIDGET HEADER */}
                <button
                  onClick={() => toggleExpand(theory.id)}
                  className="w-full text-left p-3.5 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    {getTheoryIcon(theory.id)}
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {theory.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {theory.authorReference}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/20">
                      {theory.tag}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* EXPANDED CONTENT */}
                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 space-y-2.5 text-xs border-t border-slate-800/80">
                    <div>
                      <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block mb-0.5">
                        Concept clé :
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {theory.keyIdea}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-0.5">
                        Impact au quotidien :
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        {theory.impactOnDailyLife}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-0.5">
                        Pourquoi c'est mieux que le DSM :
                      </span>
                      <p className="text-emerald-200/90 leading-relaxed text-[11px]">
                        {theory.dsmContrast}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. MANIFESTO / COMMUNITY PHILOSOPHY */}
      <div className="glass-panel-subtle rounded-xl p-4 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="text-slate-200 font-semibold flex items-center gap-1.5">
          <span>🤝</span> « Rien sur nous sans nous »
        </div>
        <p className="leading-relaxed">
          Atlas du Spectre valorise l'expertise expérientielle des adultes concernés. Vos sensations sont réelles, valides et partagées.
        </p>
      </div>
    </aside>
  );
}
