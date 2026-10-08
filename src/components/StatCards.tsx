"use client";

import React from "react";
import { useSensory } from "../context/SensoryContext";
import {
  MessageSquareShare,
  TrendingUp,
  Brain,
  HeartHandshake,
  Activity,
  Zap,
  Sparkles,
} from "lucide-react";

export default function StatCards() {
  const { lowSensoryMode } = useSensory();

  const cards = [
    {
      id: "experiences",
      title: "Expériences Partagées",
      value: "8 432",
      badge: "+14% cette semaine",
      badgeType: "growth",
      subtitle: "Vécus concrets anonymisés & validés par les pairs",
      icon: MessageSquareShare,
      accentColor: "#22d3ee", // cyan
      metricDetail: "287 témoignages ajoutés ces dernières 24h",
    },
    {
      id: "trait-discuss",
      title: "Sujet phare aujourd'hui",
      value: "Inertie Exécutive",
      badge: "Tendance communautaire",
      badgeType: "trending",
      subtitle: "« Vouloir faire sans pouvoir déclencher le geste »",
      icon: Zap,
      accentColor: "#a855f7", // purple
      metricDetail: "1 240 adultes échangent sur les stratégies d'amorce",
    },
    {
      id: "resonance",
      title: "Indice de Résonance",
      value: "94.2%",
      badge: "Validation mutuelle",
      badgeType: "positive",
      subtitle: "« Je pensais être la seule personne à vivre cela »",
      icon: HeartHandshake,
      accentColor: "#34d399", // emerald
      metricDetail: "Sentiment de soulagement et d'appartenance",
    },
    {
      id: "sensory-load",
      title: "Météo Sensorielle Globale",
      value: "Niveau 6.8 / 10",
      badge: "Charge Ambiante Élevée",
      badgeType: "warning",
      subtitle: "Saturation acoustique & météo instable signalées",
      icon: Activity,
      accentColor: "#f59e0b", // amber
      metricDetail: "Recommandation : autorisez-vous le repos et l'isolement",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`glass-panel rounded-xl p-4 sm:p-5 border border-slate-800/80 transition-all hover:border-slate-700 relative overflow-hidden group ${
              !lowSensoryMode ? "hover:-translate-y-0.5" : ""
            }`}
          >
            {/* Top decorative gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`,
              }}
            />

            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-medium text-slate-400">
                {card.title}
              </span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border"
                style={{
                  backgroundColor: `${card.accentColor}15`,
                  borderColor: `${card.accentColor}30`,
                  color: card.accentColor,
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white">
                {card.value}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-2.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  card.badgeType === "warning"
                    ? "bg-amber-950/60 text-amber-300 border border-amber-500/30"
                    : card.badgeType === "growth"
                    ? "bg-cyan-950/60 text-cyan-300 border border-cyan-500/30"
                    : card.badgeType === "trending"
                    ? "bg-purple-950/60 text-purple-300 border border-purple-500/30"
                    : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                }`}
              >
                {card.badge}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-snug line-clamp-2">
              {card.subtitle}
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span className="truncate">{card.metricDetail}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
