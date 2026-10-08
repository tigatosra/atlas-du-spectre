"use client";

import React, { useState } from "react";
import {
  caregiverAnalogies,
  crisisGuideData,
  caregiverFAQ,
} from "../data/caregiverGuideData";
import {
  HeartHandshake,
  Brain,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  CheckCircle,
  XCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface CaregiverGuideViewProps {
  onExploreMediaForCaregivers: () => void;
}

export default function CaregiverGuideView({
  onExploreMediaForCaregivers,
}: CaregiverGuideViewProps) {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [activeCrisisTab, setActiveCrisisTab] = useState<string>("meltdown");

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex((prev) => (prev === index ? null : index));
  };

  const currentCrisis =
    crisisGuideData.find((c) => c.id === activeCrisisTab) || crisisGuideData[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER BANNER */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>Guide Sans Jargon pour l'Entourage, Familles & Conjoints</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Comprendre Simplement l'Autisme de son Proche
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Votre proche n'est pas froid, fainéant ou manipulateur : son système nerveux traite le monde avec une intensité radicalement différente. Ce guide vous donne les clés limpides pour décoder ses réactions, éviter les disputes inutiles et construire une relation apaisée.
            </p>
          </div>

          <button
            onClick={onExploreMediaForCaregivers}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all shrink-0 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-200" />
            <span>Livres & Vidéos pour Proches</span>
          </button>
        </div>
      </div>

      {/* 1. L'AUTISME EN 4 ANALOGIES SIMPLES */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Brain className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Les 4 Analogies Claires du Fonctionnement Autistique
            </h2>
            <p className="text-xs text-slate-400">
              Des images simples et concrètes pour se représenter ce qui se passe dans sa tête :
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caregiverAnalogies.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-3"
            >
              <h3 className="text-sm font-bold text-emerald-300">
                {item.title}
              </h3>
              
              <div className="text-xs font-medium text-slate-200 italic bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                💡 {item.analogyConcept}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.simpleExplanation}
              </p>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <div>
                  <span className="text-amber-400 font-semibold font-mono">Au quotidien : </span>
                  {item.whatItLooksLike}
                </div>
                <div>
                  <span className="text-emerald-400 font-semibold font-mono">Ce qui aide : </span>
                  {item.whatHelpsMost}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. PROTOCOLE DE CRISE : MELTDOWN ET SHUTDOWN */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Guide de Survie en Cas de Crise
              </h2>
              <p className="text-xs text-slate-400">
                Comment réagir quand votre proche est en surcharge aiguë.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveCrisisTab("meltdown")}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                activeCrisisTab === "meltdown"
                  ? "bg-rose-950 text-rose-300 border border-rose-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Meltdown (Explosion)
            </button>
            <button
              onClick={() => setActiveCrisisTab("shutdown")}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                activeCrisisTab === "shutdown"
                  ? "bg-purple-950 text-purple-300 border border-purple-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Shutdown (Mutisme / Implosion)
            </button>
          </div>
        </div>

        {/* ACTIVE CRISIS CARD */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              {currentCrisis.phenomenon}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentCrisis.whatItIsActually}
            </p>
          </div>

          {/* COMMON MISTAKE WARNING */}
          <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-200 leading-relaxed">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-300">L'erreur la plus fréquente :</strong>{" "}
              {currentCrisis.commonMistake}
            </div>
          </div>

          {/* 3 IMMEDIATE RULES */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Les 3 gestes immédiats qui sauvent la situation :
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {currentCrisis.threeRulesImmediate.map((rule, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>

          {/* SAFE PHRASE */}
          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200">
            <span className="font-mono text-purple-300 font-bold block mb-0.5">
              La phrase la plus sécurisante :
            </span>
            <span className="italic">{currentCrisis.safePhraseToSay}</span>
          </div>
        </div>
      </div>

      {/* 3. FOIRE AUX QUESTIONS DES PROCHES (ACCORDÉON) */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Questions Fréquentes des Conjoints, Parents & Amis
            </h2>
            <p className="text-xs text-slate-400">
              Les interrogations intimes que tout l'entourage se pose légitimement :
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {caregiverFAQ.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-cyan-300"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-3 text-xs border-t border-slate-800/80">
                    <p className="text-slate-200 leading-relaxed">
                      {faq.simpleAnswer}
                    </p>

                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 leading-relaxed">
                      💡 <strong className="text-emerald-300">Conseil d'action concret :</strong>{" "}
                      {faq.actionableTip}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
