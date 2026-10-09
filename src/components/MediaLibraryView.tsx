"use client";

import React, { useState } from "react";
import { mediaLibraryData, MediaResource } from "../data/mediaLibraryData";
import { usePerspective } from "../context/PerspectiveContext";
import {
  BookOpen,
  Headphones,
  Video,
  Radio,
  Globe,
  CheckCircle,
  Search,
  ExternalLink,
  Sparkles,
  Filter,
  User,
  HeartHandshake,
  Tag,
  Zap,
  Wrench,
} from "lucide-react";

export default function MediaLibraryView() {
  const { isRelativePerspective } = usePerspective();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedEnergy, setSelectedEnergy] = useState<string>("all");
  const [selectedAudience, setSelectedAudience] = useState<string>(
    isRelativePerspective ? "Proche" : "all"
  );

  // Sync if perspective switches
  React.useEffect(() => {
    if (isRelativePerspective) {
      setSelectedAudience("Proche");
    }
  }, [isRelativePerspective]);

  const filteredResources = mediaLibraryData.filter((item) => {
    // Search match
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    // Type filter match
    const matchesType =
      selectedType === "all" ||
      (selectedType === "audio" && (item.type === "audiobook" || item.type === "podcast")) ||
      item.type === selectedType;

    // Category filter match
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    // Audience filter match
    const matchesAudience =
      selectedAudience === "all" ||
      item.targetAudience === selectedAudience ||
      item.targetAudience === "Tous";

    // Energy filter match
    const matchesEnergy =
      selectedEnergy === "all" || item.energyLevel === selectedEnergy;

    return matchesSearch && matchesType && matchesCategory && matchesAudience && matchesEnergy;
  });

  const getTypeIcon = (type: MediaResource["type"]) => {
    switch (type) {
      case "book":
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      case "audiobook":
        return <Headphones className="w-4 h-4 text-amber-400" />;
      case "podcast":
        return <Radio className="w-4 h-4 text-emerald-400" />;
      case "video":
        return <Video className="w-4 h-4 text-rose-400" />;
      case "tool_app":
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      case "test":
        return <CheckCircle className="w-4 h-4 text-cyan-400" />;
      default:
        return <Globe className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER BANNER */}
      <div className="hud-frame glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 relative overflow-hidden shadow-2xl">
        {/* HUD Micro-Telemetry Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 mb-4 pb-2 border-b border-cyan-500/15">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>HUD.ARCHIVE // MEDIA_DATABASE_CATALOG</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-500">
            <span>INDEX_SIZE: {mediaLibraryData.length}_ITEMS</span>
            <span className="text-cyan-400 font-bold">[ REPOSITORY: CURATED ]</span>
          </div>
        </div>

        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Médiathèque & Ressources Multimédias Recommandées</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            La Médiathèque Exhaustive du Spectre
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Livres de référence, audiobooks immersifs, vidéos de vulgarisation, documentaires Arte, podcasts intimistes et questionnaires scientifiques validés. Filtrez selon votre situation pour trouver exactement ce qui vous éclairera.
          </p>
        </div>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="hud-frame glass-panel rounded-2xl p-5 border border-slate-800/80 space-y-4 shadow-xl">
        
        {/* SEARCH BAR */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par auteur, livre, thème (ex: Julie Dachez, masquage, audio, couple, travail, CAT-Q)..."
            className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Effacer
            </button>
          )}
        </div>

        {/* TYPE FILTER PILLS */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Format :
          </span>

          {[
            { id: "all", label: "Tous formats" },
            { id: "book", label: "📖 Livres" },
            { id: "audio", label: "🎧 Audiobooks & Podcasts" },
            { id: "video", label: "🎥 Vidéos & Documentaires" },
            { id: "tool_app", label: "🛠️ Outils & Matériel" },
            { id: "test", label: "🧪 Tests scientifiques" },
            { id: "website", label: "🌐 Sites & Collectifs" },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedType === type.id
                  ? "bg-cyan-950 text-cyan-200 border border-cyan-500/50 shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* COGNITIVE ENERGY FILTER ("CUILLÈRES / CHARGE COGNITIVE") */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-mono text-amber-400 flex items-center gap-1 mr-1 font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Jauge d'Énergie (Cuillères) :
          </span>

          {[
            {
              id: "all",
              label: "Toutes Énergies",
              desc: "Catalogue complet sans filtre de charge",
            },
            {
              id: "low_energy",
              label: "⚡ Cuillères Basses (Shutdown)",
              desc: "Audio, capsules courtes, BD, outils physiques sans lecture lourde",
            },
            {
              id: "medium_energy",
              label: "⚡⚡ Énergie Moyenne",
              desc: "Récits de vie accessibles, documentaires, guides pratiques",
            },
            {
              id: "deep_dive",
              label: "⚡⚡⚡ Hyperfocus (Plongée profonde)",
              desc: "Essais scientifiques, monographies denses, théories fondamentales",
            },
          ].map((energy) => (
            <button
              key={energy.id}
              onClick={() => setSelectedEnergy(energy.id)}
              title={energy.desc}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedEnergy === energy.id
                  ? energy.id === "low_energy"
                    ? "bg-emerald-950 text-emerald-200 border border-emerald-500/50 shadow-[0_0_8px_rgba(52,211,153,0.25)] font-bold"
                    : energy.id === "medium_energy"
                    ? "bg-amber-950 text-amber-200 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.25)] font-bold"
                    : energy.id === "deep_dive"
                    ? "bg-purple-950 text-purple-200 border border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.25)] font-bold"
                    : "bg-cyan-950 text-cyan-200 border border-cyan-500/50 font-bold"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {energy.label}
            </button>
          ))}
        </div>

        {/* AUDIENCE & CATEGORY FILTERS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
          {/* AUDIENCE */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono">Public cible :</span>
            <button
              onClick={() => setSelectedAudience("all")}
              className={`px-2.5 py-1 rounded text-xs ${
                selectedAudience === "all"
                  ? "bg-slate-800 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedAudience("Autiste")}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 ${
                selectedAudience === "Autiste"
                  ? "bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <User className="w-3 h-3 text-cyan-400" />
              <span>Pour personnes autistes</span>
            </button>
            <button
              onClick={() => setSelectedAudience("Proche")}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 ${
                selectedAudience === "Proche"
                  ? "bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <HeartHandshake className="w-3 h-3 text-emerald-400" />
              <span>Pour l'entourage & proches</span>
            </button>
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            {filteredResources.length} ressource{filteredResources.length > 1 ? "s" : ""} trouvée{filteredResources.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* RESOURCES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.length === 0 ? (
          <div className="col-span-full py-12 text-center glass-panel-subtle rounded-xl border border-slate-800">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm text-slate-300">
              Aucune ressource ne correspond à vos filtres actuels.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("all");
                setSelectedCategory("all");
                setSelectedEnergy("all");
                setSelectedAudience("all");
              }}
              className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-cyan-300 border border-cyan-500/30"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          filteredResources.map((item) => (
            <div
              key={item.id}
              className="hud-frame glass-panel-subtle rounded-xl p-5 border border-slate-800/90 flex flex-col justify-between hover:border-cyan-500/40 transition-all group relative overflow-hidden"
            >
              <div>
                {/* TOP HEADER */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {getTypeIcon(item.type)}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {item.language}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        item.energyLevel === "low_energy"
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                          : item.energyLevel === "medium_energy"
                          ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                          : "bg-purple-950/80 text-purple-300 border-purple-500/40"
                      }`}
                    >
                      {item.energyLevel === "low_energy"
                        ? "⚡ Cuillère Basse"
                        : item.energyLevel === "medium_energy"
                        ? "⚡⚡ Énergie Moyenne"
                        : "⚡⚡⚡ Hyperfocus"}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      {item.badgeText}
                    </span>
                  </div>
                </div>

                {/* TITLE & AUTHOR */}
                <h3 className="text-sm font-bold text-white leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs text-slate-400 font-mono mb-3">
                  Par {item.creator}
                </div>

                {/* DESCRIPTION */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* KEY TAKEAWAYS FOR CAREGIVERS */}
                {item.keyTakeawayForCaregivers && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/25 text-[11px] text-emerald-200 mb-3 space-y-1">
                    <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                      <HeartHandshake className="w-3 h-3 text-emerald-400" />
                      <span>Clé pour les proches :</span>
                    </div>
                    <p className="leading-relaxed italic">
                      "{item.keyTakeawayForCaregivers}"
                    </p>
                  </div>
                )}

                {/* RECOMMENDED FOR TRAITS */}
                {item.recommendedForTraits && item.recommendedForTraits.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="text-[10px] font-mono text-slate-500">Axes liés :</span>
                    {item.recommendedForTraits.map((tId) => (
                      <span
                        key={tId}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300/90 border border-slate-800"
                      >
                        #{tId}
                      </span>
                    ))}
                  </div>
                )}

                {/* HIGHLIGHTS */}
                <div className="space-y-1.5 mb-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    Points forts :
                  </div>
                  {item.highlights.map((hl, i) => (
                    <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-slate-500" />
                  <span>Public : {item.targetAudience}</span>
                </span>

                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-colors"
                >
                  <span>Découvrir</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
