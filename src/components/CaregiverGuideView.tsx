"use client";

import React, { useState } from "react";
import {
  caregiverAnalogies,
  crisisGuideData,
  caregiverFAQ,
} from "../data/caregiverGuideData";
import { caregiverDecoderCards } from "../data/mockData";
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
  Eye,
  AlertCircle,
  Sliders,
} from "lucide-react";

interface CaregiverGuideViewProps {
  onExploreMediaForCaregivers: () => void;
}

export default function CaregiverGuideView({
  onExploreMediaForCaregivers,
}: CaregiverGuideViewProps) {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [activeCrisisTab, setActiveCrisisTab] = useState<string>("meltdown");
  const [selectedDecoderId, setSelectedDecoderId] = useState<string>(
    caregiverDecoderCards[0].id
  );

  const selectedDecoderCard =
    caregiverDecoderCards.find((c) => c.id === selectedDecoderId) ||
    caregiverDecoderCards[0];

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex((prev) => (prev === index ? null : index));
  };

  const currentCrisis =
    crisisGuideData.find((c) => c.id === activeCrisisTab) || crisisGuideData[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER BANNER */}
      <div className="hud-frame hud-frame-emerald glass-panel rounded-2xl p-6 sm:p-7 border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 relative overflow-hidden shadow-2xl">
        {/* HUD Micro-Telemetry Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400/80 mb-4 pb-2 border-b border-emerald-500/15">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>HUD.CARE_INTERFACE // PROCHE_AIDANT_SUPPORT</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-500">
            <span>PEDAGOGY: NON_CLINICAL</span>
            <span className="text-emerald-400 font-bold">[ MATRIX: ACTIVE ]</span>
          </div>
        </div>

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
      <div className="hud-frame glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-5 shadow-xl">
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

      {/* 2. LE DÉCODEUR DU SPECTRE : CE QUE VOUS VOYEZ VS CE QUI SE PASSE */}
      <div className="hud-frame hud-frame-emerald glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  MODULE 4 // DECODER_HUD
                </span>
                <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                  [ MATRIX_REALITY: ACTIVE ]
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Le Décodeur du Spectre : Ce que vous voyez vs Ce qui se passe
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 max-w-xs sm:text-right">
            Distinguer le comportement visible de la réalité neurologique intérieure.
          </span>
        </div>

        {/* SELECTOR PILLS */}
        <div className="flex flex-wrap items-center gap-2">
          {caregiverDecoderCards.map((card, idx) => {
            const isSelected = card.id === selectedDecoderId;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedDecoderId(card.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-950 to-teal-950 text-emerald-200 border border-emerald-500/60 shadow-[0_0_12px_rgba(52,211,153,0.25)] font-bold"
                    : "bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">CAS 0{idx + 1}</span>
                <span>{card.title}</span>
              </button>
            );
          })}
        </div>

        {/* COMPARATIVE ACTIVE CARD */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* EXTERNAL VIEW (AMBER/ROSE) */}
            <div className="rounded-xl p-5 bg-gradient-to-br from-rose-950/30 via-slate-950 to-slate-950 border border-rose-500/30 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-rose-500/20">
                <div className="flex items-center gap-1.5 font-bold text-rose-300">
                  <Eye className="w-4 h-4 text-rose-400" />
                  <span>Ce que vous observez de l'extérieur</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30">
                  PERCEPTION BRUTE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed italic">
                "{selectedDecoderCard.whatYouSee}"
              </p>
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-[11px] text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Piège relationnel :</strong> Risque d'interpréter à tort comme du caprice, du rejet ou un désintérêt pour la relation.
                </span>
              </div>
            </div>

            {/* INTERNAL REALITY (CYAN/EMERALD) */}
            <div className="rounded-xl p-5 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-slate-950 border border-emerald-500/40 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-emerald-500/20">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <Brain className="w-4 h-4 text-emerald-400" />
                  <span>Ce qui se passe réellement dans son cerveau</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  RÉALITÉ NEUROLOGIQUE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                {selectedDecoderCard.whatActuallyHappens}
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Réalité scientifique :</strong> Réaction adaptative involontaire pour empêcher l'effondrement ou la douleur somatique.
                </span>
              </div>
            </div>
          </div>

          {/* NEUROLOGICAL MECHANISM */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1.5">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Mécanisme neurocognitif sous-jacent :</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {selectedDecoderCard.neurologicalMechanism}
            </p>
          </div>

          {/* TWO ACTIONS COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* NEVER DO */}
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5 text-rose-200">
              <div className="flex items-center gap-1.5 font-bold text-rose-400 font-mono text-[11px] uppercase">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Ce qu'il faut bannir (aggrave la situation) :</span>
              </div>
              <p className="leading-relaxed">
                {selectedDecoderCard.whatToNeverDo}
              </p>
            </div>

            {/* WHAT HELPS */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5 text-emerald-200">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 font-mono text-[11px] uppercase">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ce qui apaise concrètement :</span>
              </div>
              <p className="leading-relaxed">
                {selectedDecoderCard.supportiveAction}
              </p>
            </div>
          </div>

          {/* SAFE PHRASE BANNER */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-950 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-purple-900/60 text-purple-300 font-mono text-[10px] uppercase font-bold shrink-0">
                Phrase Clé
              </span>
              <span className="text-purple-200 italic font-medium">
                "{selectedDecoderCard.safePhrase}"
              </span>
            </div>
            <span className="text-[10px] font-mono text-purple-400 shrink-0">
              Désamorce le stress sans forcer
            </span>
          </div>
        </div>
      </div>

      {/* 3. PROTOCOLE DE CRISE : MELTDOWN ET SHUTDOWN */}
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
