"use client";

import React, { useState } from "react";
import { diagnosticSteps } from "../data/mockData";
import {
  X,
  Compass,
  CheckCircle,
  AlertCircle,
  FileText,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Heart,
} from "lucide-react";

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagnosticModal({
  isOpen,
  onClose,
}: DiagnosticModalProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="hud-frame relative w-full max-w-4xl glass-panel bg-slate-900/95 border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden my-8">
        {/* HUD MICRO-TELEMETRY STRIP */}
        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 px-5 sm:px-6 py-1 bg-slate-950/95 border-b border-cyan-500/15">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>HUD.ROADMAP // PROTOCOLE_DIAGNOSTIQUE_ADULTE</span>
          </div>
          <span className="hidden sm:inline text-slate-500">AUTONOMY_LEVEL: HIGH // AFFIRMATIVE</span>
        </div>
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              <Compass className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Cartographie des Parcours Diagnostiques
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Adulte & Affirmation
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Comprendre les chemins possibles : de l'auto-identification éclairée au bilan officiel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* DISCLAIMER / MANIFESTO */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-900 border border-cyan-500/30">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <span className="font-semibold text-cyan-300">
                  Au-delà du cadre pathologique du DSM-5 :
                </span>{" "}
                Le DSM définit historiquement l'autisme par des « déficits » observables de l'extérieur chez de jeunes garçons. À l'âge adulte, en particulier chez les femmes et personnes masquées, le diagnostic nécessite une grille neuro-affirmative qui honore le coût intérieur et l'expérience vécue.
              </div>
            </div>
          </div>

          {/* STEPPING TABS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-800 pb-4">
            {diagnosticSteps.map((step) => {
              const isActive = activeStep === step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`text-left p-2.5 rounded-lg border transition-all ${
                    isActive
                      ? "bg-slate-800 text-white border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                      : "bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold">
                    Étape 0{step.stepNumber}
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE STEP DETAILS */}
          {(() => {
            const current = diagnosticSteps.find(
              (s) => s.stepNumber === activeStep
            )!;
            return (
              <div className="space-y-4 bg-slate-950/50 p-5 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold font-mono flex items-center justify-center border border-cyan-400/40">
                    {current.stepNumber}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {current.title}
                  </h4>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {current.description}
                </p>

                <div className="p-3.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 leading-relaxed">
                  💡 <strong className="text-purple-300">Point clé de nuance :</strong>{" "}
                  {current.nuance}
                </div>

                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Ressources recommandées pour cette étape :
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {current.recommendedResources.map((res, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* CRITICAL QUESTIONS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h5 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Faut-il absolument un diagnostic officiel ?
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Non. Si vous cherchez avant tout à vous comprendre, à adapter votre quotidien et à déculpabiliser, l'auto-identification éclairée suffit amplement. Le diagnostic médical est nécessaire si vous demandez une reconnaissance RQTH (aménagements professionnels) ou des aides MDPH.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h5 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-emerald-400" />
                Comment éviter l'invalidation médicale ?
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rédigez un dossier personnel récapitulant vos traits depuis l'enfance (sensorialité, fatigue sociale, stimming masqué). Choisissez des praticiens recommandés par les associations de personnes autistes elles-mêmes.
              </p>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Réseau d'entraide communautaire • Données validées 2026
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                alert("Dossier d'auto-évaluation et liste des praticiens référencés téléchargés !");
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all"
            >
              <span>Télécharger le Guide PDF</span>
              <FileText className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
