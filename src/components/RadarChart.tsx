"use client";

import React, { useState } from "react";
import { RadarAxis } from "../types/spectrum";
import { useSensory } from "../context/SensoryContext";
import { usePerspective } from "../context/PerspectiveContext";
import {
  Volume2,
  Compass,
  MessageSquare,
  ShieldAlert,
  Sliders,
  Users,
  Sparkles,
  Info,
  RotateCcw,
  Maximize2,
} from "lucide-react";

interface RadarChartProps {
  axes: RadarAxis[];
  onAxisChange: (axisId: string, newValue: number) => void;
  onResetAxes: () => void;
}

export default function RadarChart({
  axes,
  onAxisChange,
  onResetAxes,
}: RadarChartProps) {
  const { lowSensoryMode } = useSensory();
  const { isRelativePerspective } = usePerspective();
  const [showCommunityAverage, setShowCommunityAverage] = useState(true);
  const [selectedAxisId, setSelectedAxisId] = useState<string>("sensorialite");
  const [isEditing, setIsEditing] = useState(false);

  // Radar geometry calculations (center at 160, 160; radius 120)
  const size = 320;
  const center = size / 2;
  const radius = 115;
  const totalAxes = axes.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    // 4 axes: angle starts at -90deg (top: sensorialite), right: monotropisme, bottom: communication, left: masquage
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = radius * Math.min(Math.max(valueRatio, 0.05), 1);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build points for user profile polygon
  const userPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.value / 100);
      return `${x},${y}`;
    })
    .join(" ");

  // Build points for community average polygon
  const communityPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.communityAverage / 100);
      return `${x},${y}`;
    })
    .join(" ");

  const selectedAxis = axes.find((a) => a.id === selectedAxisId) || axes[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Volume2":
        return <Volume2 className="w-4 h-4" />;
      case "Compass":
        return <Compass className="w-4 h-4" />;
      case "MessageSquare":
        return <MessageSquare className="w-4 h-4" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-panel hud-frame hud-scanline-container rounded-2xl p-5 md:p-6 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow (subtle) */}
      {!lowSensoryMode && (
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      )}
      {!lowSensoryMode && (
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* HUD Telemetry Top Bar */}
      <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-cyan-400/80 pb-2 mb-3 border-b border-cyan-500/15">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>HUD.RADAR // COORD_SYSTEM: POLAR_4X</span>
        </span>
        <span className="hidden sm:inline">DATA_STREAM: LIVE_PEERS // ENCRYPTION: ANONYMOUS</span>
        <span>STATUS: [ONLINE]</span>
      </div>

      {/* CARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              {isRelativePerspective ? "Carte du Spectre de Votre Proche" : "Matrice Holistique du Spectre"}
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              Modèle Non-Linéaire
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Représentation multidimensionnelle : l'autisme n'est pas un curseur "plus ou moins", c'est une constellation d'axes.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowCommunityAverage(!showCommunityAverage)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showCommunityAverage
                ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/30"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
            title="Afficher ou masquer la moyenne de la communauté"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Moyenne Pairs ({showCommunityAverage ? "ON" : "OFF"})</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isEditing
                ? "bg-cyan-950/60 text-cyan-200 border-cyan-500/40"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isEditing ? "Mode Consultation" : "Ajuster Mes Axes"}</span>
          </button>

          <button
            onClick={onResetAxes}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
            title="Réinitialiser les valeurs par défaut"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MAIN RADAR VISUAL & INTERACTIVE AXES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* RADAR SVG GRAPHIC */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[340px]">
          <div className="relative">
            <svg
              width={size}
              height={size}
              className="overflow-visible select-none transition-all duration-300"
            >
              <defs>
                <linearGradient id="userRadarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.45" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* CONCENTRIC RADAR RINGS (25%, 50%, 75%, 100%) */}
              {[0.25, 0.5, 0.75, 1].map((level, i) => (
                <polygon
                  key={i}
                  points={axes
                    .map((_, idx) => {
                      const { x, y } = getCoordinates(idx, level);
                      return `${x},${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke={i === 3 ? "rgba(148, 163, 184, 0.25)" : "rgba(148, 163, 184, 0.1)"}
                  strokeWidth={i === 3 ? "1.5" : "1"}
                  strokeDasharray={i === 3 ? "none" : "3,3"}
                />
              ))}

              {/* PERCENTAGE LABELS ON NORTH AXIS */}
              <text x={center + 5} y={center - radius * 0.5} fill="#64748b" fontSize="9" fontFamily="monospace">
                50%
              </text>
              <text x={center + 5} y={center - radius * 1} fill="#64748b" fontSize="9" fontFamily="monospace">
                100%
              </text>

              {/* AXIS SPOKES (CROSSHAIRS) */}
              {axes.map((axis, i) => {
                const { x, y } = getCoordinates(i, 1);
                const isSelected = axis.id === selectedAxisId;
                return (
                  <line
                    key={axis.id}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke={isSelected ? "#22d3ee" : "rgba(148, 163, 184, 0.25)"}
                    strokeWidth={isSelected ? "1.75" : "1"}
                  />
                );
              })}

              {/* OUTER RETICLE TICKS */}
              <circle
                cx={center}
                cy={center}
                r={radius + 14}
                fill="none"
                stroke="rgba(34, 211, 238, 0.2)"
                strokeWidth="1"
                strokeDasharray="2,6"
                className="hud-reticle-spin-slow"
              />

              {/* POLAR ANGLE TELEMETRY MARKERS */}
              <text x={center} y={center - radius - 6} fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.7">
                000° NORTH
              </text>
              <text x={center + radius + 18} y={center + 3} fill="#a855f7" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.7">
                090°
              </text>
              <text x={center} y={center + radius + 15} fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.7">
                180°
              </text>
              <text x={center - radius - 18} y={center + 3} fill="#f59e0b" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.7">
                270°
              </text>

              {/* ROTATING RADAR SWEEPER BEAM */}
              {!lowSensoryMode && (
                <line
                  x1={center}
                  y1={center}
                  x2={center}
                  y2={center - radius}
                  stroke="url(#userRadarGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="hud-radar-sweep-beam"
                />
              )}

              {/* COMMUNITY AVERAGE POLYGON (DASHED GREEN) */}
              {showCommunityAverage && (
                <polygon
                  points={communityPoints}
                  fill="rgba(52, 211, 153, 0.08)"
                  stroke="#34d399"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  className="transition-all duration-300"
                />
              )}

              {/* USER PROFILE POLYGON (GLOWING CYBER-BLUE/VIOLET) */}
              <polygon
                points={userPoints}
                fill="url(#userRadarGradient)"
                stroke="#22d3ee"
                strokeWidth="2.5"
                filter={lowSensoryMode ? undefined : "url(#glow)"}
                className="transition-all duration-300"
              />

              {/* INTERACTIVE RADAR VERTICES */}
              {axes.map((axis, i) => {
                const { x, y } = getCoordinates(i, axis.value / 100);
                const isSelected = axis.id === selectedAxisId;

                return (
                  <g
                    key={axis.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedAxisId(axis.id)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && !lowSensoryMode && (
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? "7" : "5"}
                      fill="#ffffff"
                      stroke={axis.color}
                      strokeWidth="3"
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}

              {/* CENTER HUB */}
              <circle cx={center} cy={center} r="4" fill="#64748b" />
            </svg>

            {/* AXIS LABELS FLOATING AROUND RADAR */}
            {axes.map((axis, i) => {
              const { x, y } = getCoordinates(i, 1.25);
              const isSelected = axis.id === selectedAxisId;

              return (
                <button
                  key={axis.id}
                  onClick={() => setSelectedAxisId(axis.id)}
                  style={{
                    position: "absolute",
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-slate-900 border border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.3)] scale-105"
                      : "bg-slate-950/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <span style={{ color: axis.color }}>{getIcon(axis.iconName)}</span>
                  <span>{axis.shortName}</span>
                  <span className="font-mono text-[11px] opacity-80">
                    {axis.value}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* LEGEND / STATUS */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 border border-cyan-300" />
              <span className="text-slate-200 font-medium">Votre Profil Réel</span>
            </div>
            {showCommunityAverage && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-emerald-400 border-dashed border-b border-emerald-400" />
                <span className="text-emerald-300">Moyenne Communautaire (Pairs)</span>
              </div>
            )}
          </div>
        </div>

        {/* DETAILS & LIVE EDIT PANEL */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-950/60 rounded-xl p-4 sm:p-5 border border-slate-800/80">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                Détail de l'Axe Sélectionné
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-bold font-mono"
                style={{
                  backgroundColor: `${selectedAxis.color}20`,
                  color: selectedAxis.color,
                  border: `1px solid ${selectedAxis.color}50`,
                }}
              >
                Intensité : {selectedAxis.value}%
              </span>
            </div>

            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <span style={{ color: selectedAxis.color }}>
                {getIcon(selectedAxis.iconName)}
              </span>
              {selectedAxis.name}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {isRelativePerspective
                ? selectedAxis.relativeDescription
                : selectedAxis.description}
            </p>

            {isRelativePerspective && (
              <div className="mb-4 p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-200 leading-tight">
                🤝 <strong>Conseil Proche :</strong> Si vous observez de la tension chez votre proche, vérifiez en priorité cet axe avant de supposer un problème relationnel.
              </div>
            )}

            {/* COMPARATIVE PROGRESS BARS */}
            <div className="space-y-3 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300 font-medium">Votre niveau rapporté</span>
                  <span className="font-mono text-cyan-300 font-bold">{selectedAxis.value}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-500 to-purple-500"
                    style={{ width: `${selectedAxis.value}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Moyenne de la communauté adulte</span>
                  <span className="font-mono text-emerald-400 font-medium">
                    {selectedAxis.communityAverage}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500/80 transition-all duration-300"
                    style={{ width: `${selectedAxis.communityAverage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* IF EDIT MODE IS ON: DIRECT LIVE SLIDERS FOR THE 4 AXES */}
            {isEditing && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-slate-200">
                  Ajuster l'axe en direct :
                </span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="2"
                  value={selectedAxis.value}
                  onChange={(e) =>
                    onAxisChange(selectedAxis.id, parseInt(e.target.value))
                  }
                  className="w-full cyber-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Faible impact</span>
                  <span>Modéré</span>
                  <span>Profil dominant</span>
                </div>
              </div>
            )}
          </div>

          {/* COMMUNITY INSIGHT NOTE */}
          <div className="mt-4 p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-[11px] text-cyan-200/90 leading-tight">
            💡 <strong>Validation des pairs :</strong> Chez les adultes diagnostiqués ou auto-identifiés, cet axe présente un écart moyen de seuil de tolérance de 30% par rapport à la population générale.
          </div>
        </div>
      </div>
    </div>
  );
}
