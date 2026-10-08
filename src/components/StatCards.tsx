"use client";

import React from "react";
import { useSensory } from "../context/SensoryContext";
import { usePerspective } from "../context/PerspectiveContext";
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
  const { isRelativePerspective } = usePerspective();

  const cards = [
    {
      id: "experiences",
      title: isRelativePerspective ? "Vécus de Pairs & Proches" : "Expériences Partagées",
      value: "8 432",
      badge: isRelativePerspective ? "+180 récits d'alliés" : "+14% cette semaine",
      badgeType: "growth",
      subtitle: isRelativePerspective
        ? "Témoignages croisés de personnes autistes et de leurs conjoints"
        : "Vécus concrets anonymisés & validés par les pairs",
      icon: MessageSquareShare,
      accentColor: "#22d3ee", // cyan
      metricDetail: isRelativePerspective
        ? "2 140 partages rédigés par des proches et familles"
        : "287 témoignages ajoutés ces dernières 24h",
    },
    {
      id: "trait-discuss",
      title: isRelativePerspective ? "Sujet décrypté aujourd'hui" : "Sujet phare aujourd'hui",
      value: "Inertie Exécutive",
      badge: "Tendance communautaire",
      badgeType: "trending",
      subtitle: isRelativePerspective
        ? "« Pourquoi votre proche semble bloqué sans pouvoir démarrer »"
        : "« Vouloir faire sans pouvoir déclencher le geste »",
      icon: Zap,
      accentColor: "#a855f7", // purple
      metricDetail: isRelativePerspective
        ? "Conseil clé : proposer une aide d'amorce sans jugement"
        : "1 240 adultes échangent sur les stratégies d'amorce",
    },
    {
      id: "resonance",
      title: isRelativePerspective ? "Apaisement Relationnel" : "Indice de Résonance",
      value: "94.2%",
      badge: isRelativePerspective ? "Conflits évités" : "Validation mutuelle",
      badgeType: "positive",
      subtitle: isRelativePerspective
        ? "Des proches rapportent une nette diminution des disputes"
        : "« Je pensais être la seule personne à vivre cela »",
      icon: HeartHandshake,
      accentColor: "#34d399", // emerald
      metricDetail: isRelativePerspective
        ? "Meilleure communication grâce à la Double Empathie"
        : "Sentiment de soulagement et d'appartenance",
    },
    {
      id: "sensory-load",
      title: "Météo Sensorielle Globale",
      value: "Niveau 6.8 / 10",
      badge: "Charge Ambiante Élevée",
      badgeType: "warning",
      subtitle: isRelativePerspective
        ? "Environnements bruyants aujourd'hui : prévoyez un retour au calme"
        : "Saturation acoustique & météo instable signalées",
      icon: Activity,
      accentColor: "#f59e0b", // amber
      metricDetail: isRelativePerspective
        ? "Offrez un sas silencieux de 30 min ce soir"
        : "Recommandation : autorisez-vous le repos et l'isolement",
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
