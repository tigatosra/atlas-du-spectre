"use client";

import React, { useState } from "react";
import { usePerspective } from "../context/PerspectiveContext";
import {
  Compass,
  Zap,
  HeartHandshake,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Shield,
  UserCheck,
} from "lucide-react";

interface IntentNavigatorProps {
  onSelectIntent: (targetTab: string, role?: "autiste" | "proche") => void;
}

export default function IntentNavigator({ onSelectIntent }: IntentNavigatorProps) {
  const { setPerspective } = usePerspective();
  const [selectedIntentId, setSelectedIntentId] = useState<string>("");

  const intents = [
    {
      id: "profils",
      icon: UserCheck,
      title: "Construire mon Profil / Archétypes Types",
      subtitle: "Explorer la banque de profils (AuDHD, Caméléon, etc.) et créer son passeport sensoriel sur mesure.",
      actionLabel: "Ouvrir le constructeur",
      targetTab: "profils",
      role: "autiste" as const,
      color: "#38bdf8", // sky
    },
    {
      id: "questionnement",
      icon: Compass,
      title: "Je découvre mon autisme / En questionnement",
      subtitle: "Auto-évaluations scientifiques, livres cultes, démasquage et parcours adulte.",
      actionLabel: "Découvrir mes repères",
      targetTab: "mediatheque",
      role: "autiste" as const,
      color: "#22d3ee", // cyan
    },
    {
      id: "proche",
      icon: HeartHandshake,
      title: "Je suis un proche, conjoint ou parent",
      subtitle: "Comprendre simplement sans jargon, désamorcer les conflits et soutenir avec amour.",
      actionLabel: "Guide simple pour proches",
      targetTab: "proches",
      role: "proche" as const,
      color: "#34d399", // emerald
    },
    {
      id: "surcharge",
      icon: Zap,
      title: "Je suis en surcharge sensorielle / Fatigue",
      subtitle: "Passeport d'urgence pour mutisme/shutdown, bruits bruns et trousse d'apaisement.",
      actionLabel: "Outils de régulation d'urgence",
      targetTab: "sensorielle",
      role: "autiste" as const,
      color: "#f59e0b", // amber
    },
    {
      id: "mediatheque",
      icon: BookOpen,
      title: "Médiathèque, Livres & Audiobooks",
      subtitle: "Vidéos, documentaires Arte, podcasts francophones et sites communautaires fiables.",
      actionLabel: "Explorer toute la médiathèque",
      targetTab: "mediatheque",
      color: "#c084fc", // purple
    },
  ];

  const handleIntentClick = (intent: typeof intents[0]) => {
    setSelectedIntentId(intent.id);
    if (intent.role) {
      setPerspective(intent.role);
    }
    onSelectIntent(intent.targetTab, intent.role);
  };

  return (
    <section className="hud-frame glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800/90 relative overflow-hidden shadow-xl">
      {/* HUD ROUTER TELEMETRY HEADER */}
      <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 mb-3 pb-2 border-b border-cyan-500/15">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>HUD.INTENT_ROUTER // ADAPTIVE_NEURAL_PATHWAY</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-500">
          <span>ROUTING_NODES: 04</span>
          <span>AUTONOMOUS_CALIBRATION: ACTIVE</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              Que recherchez-vous aujourd'hui sur l'Atlas ?
            </h2>
            <p className="text-[11px] text-slate-400">
              Sélectionnez votre situation pour adapter immédiatement l'affichage et les contenus à vos besoins réels.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-slate-900 text-cyan-300 border border-cyan-500/30 self-start sm:self-auto">
          [ ADAPTATION // DYNAMIQUE ]
        </span>
      </div>

      {/* 4 INTERACTIVE INTENT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {intents.map((intent, idx) => {
          const Icon = intent.icon;
          const isSelected = selectedIntentId === intent.id;

          return (
            <button
              key={intent.id}
              onClick={() => handleIntentClick(intent)}
              className={`hud-frame p-4 rounded-xl border text-left transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                isSelected
                  ? "bg-slate-900/90 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] scale-[1.01]"
                  : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm"
                    style={{
                      backgroundColor: `${intent.color}15`,
                      borderColor: `${intent.color}40`,
                      color: intent.color,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">
                    VECTOR-0{idx + 1}
                  </span>
                </div>

                <div className="text-xs font-bold text-white mb-1.5 leading-snug group-hover:text-cyan-200 transition-colors">
                  {intent.title}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {intent.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono font-medium" style={{ color: intent.color }}>
                <span>{intent.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
