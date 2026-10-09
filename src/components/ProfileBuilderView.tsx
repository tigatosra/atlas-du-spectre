"use client";

import React, { useState, useEffect } from "react";
import {
  UserProfileData,
  NeurotypeCategory,
  RadarAxis,
} from "../types/spectrum";
import {
  archetypeProfilesData,
  neurotypeOptions,
  communicationOptions,
  sensoryTriggerOptions,
  soothingToolOptions,
  earlyWarningOptions,
} from "../data/archetypesData";
import { useSensory } from "../context/SensoryContext";
import {
  UserCheck,
  Sparkles,
  Zap,
  Compass,
  Sliders,
  Activity,
  Copy,
  Check,
  RotateCcw,
  HeartHandshake,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Info,
  Save,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  PlusCircle,
  FileText,
  User,
} from "lucide-react";

interface ProfileBuilderViewProps {
  onApplyProfileToRadar: (newAxes: RadarAxis[]) => void;
  onGoToTab?: (tab: string) => void;
}

const LOCAL_STORAGE_CUSTOM_PROFILE_KEY = "atlas_spectre_custom_profile_v1";

export default function ProfileBuilderView({
  onApplyProfileToRadar,
  onGoToTab,
}: ProfileBuilderViewProps) {
  const { lowSensoryMode } = useSensory();

  // Active top sub-module: "archetypes" | "builder" | "comparator"
  const [activeSubTab, setActiveSubTab] = useState<"archetypes" | "builder" | "comparator">("archetypes");

  // Selected Archetype in Archetype Bank
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>(archetypeProfilesData[0].id);

  // Custom Profile in Builder
  const [profileName, setProfileName] = useState<string>("Mon Profil");
  const [selectedNeurotype, setSelectedNeurotype] = useState<NeurotypeCategory>("autistic_self_identified");
  const [tagline, setTagline] = useState<string>("Exploration de mon fonctionnement neurocognitif.");
  const [caregiverNote, setCaregiverNote] = useState<string>(
    "Lorsque je suis en retrait, merci de me laisser 30 minutes au calme sans me poser de question."
  );

  // 4 Axis Scores (0 to 100)
  const [sensoryScore, setSensoryScore] = useState<number>(80);
  const [monotropismScore, setMonotropismScore] = useState<number>(75);
  const [communicationScore, setCommunicationScore] = useState<number>(70);
  const [regulationScore, setRegulationScore] = useState<number>(85);

  // Custom toggles
  const [selectedCommOptions, setSelectedCommOptions] = useState<string[]>([
    "Écrit prioritaire (SMS, Mail, Messagerie)",
    "Clarté 100% littérale (sans sous-entendus)",
    "Aucun appel vocal sans préavis convenu",
  ]);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([
    "Brouhaha de foule & supermarchés",
    "Néons fluorescents & éclairages blancs violents",
    "Changements d'horaires ou de plans à la dernière minute",
  ]);
  const [selectedSoothing, setSelectedSoothing] = useState<string[]>([
    "Casque antibruit actif ANC (Sony / Bose)",
    "Obscurité complète & silence absolu (Sas noir)",
    "Plongée immersive dans un Intérêt Spécifique (SpIn)",
  ]);
  const [selectedWarnings, setSelectedWarnings] = useState<string[]>([
    "Baisse progressive de la parole (perte de fluidité verbale)",
    "Irritabilité soudaine face à un micro-bruit anodin",
  ]);

  // Special interests tag inputs
  const [spinInput, setSpinInput] = useState<string>("");
  const [specialInterests, setSpecialInterests] = useState<string[]>([
    "Psychologie",
    "Jeux vidéo & Code",
    "Musique",
  ]);

  // UI Feedback states
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);
  const [saveFeedback, setSaveFeedback] = useState<boolean>(false);
  const [radarAppliedFeedback, setRadarAppliedFeedback] = useState<boolean>(false);

  // Load custom profile from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_PROFILE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setProfileName(parsed.name);
        if (parsed.neurotype) setSelectedNeurotype(parsed.neurotype);
        if (parsed.tagline) setTagline(parsed.tagline);
        if (parsed.caregiverNote) setCaregiverNote(parsed.caregiverNote);
        if (parsed.axesScores) {
          setSensoryScore(parsed.axesScores.sensorialite ?? 80);
          setMonotropismScore(parsed.axesScores.monotropisme ?? 75);
          setCommunicationScore(parsed.axesScores.communication ?? 70);
          setRegulationScore(parsed.axesScores.masquage ?? 85);
        }
        if (parsed.communicationPreferences) setSelectedCommOptions(parsed.communicationPreferences);
        if (parsed.sensoryTriggers) setSelectedTriggers(parsed.sensoryTriggers);
        if (parsed.soothingTools) setSelectedSoothing(parsed.soothingTools);
        if (parsed.earlyWarningSigns) setSelectedWarnings(parsed.earlyWarningSigns);
        if (parsed.specialInterests) setSpecialInterests(parsed.specialInterests);
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  const selectedArchetype =
    archetypeProfilesData.find((a) => a.id === selectedArchetypeId) ||
    archetypeProfilesData[0];

  const allisticArchetype =
    archetypeProfilesData.find((a) => a.id === "archetype-allistique") ||
    archetypeProfilesData[4];

  // Toggle helpers
  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const addSpinTag = () => {
    if (!spinInput.trim()) return;
    if (!specialInterests.includes(spinInput.trim())) {
      setSpecialInterests([...specialInterests, spinInput.trim()]);
    }
    setSpinInput("");
  };

  const removeSpinTag = (tagToRemove: string) => {
    setSpecialInterests(specialInterests.filter((t) => t !== tagToRemove));
  };

  // Duplicate an archetype into custom builder
  const loadArchetypeIntoBuilder = (archetype: UserProfileData) => {
    setProfileName(archetype.name + " (Copie)");
    setSelectedNeurotype(archetype.neurotype);
    setTagline(archetype.tagline);
    setSensoryScore(archetype.axesScores.sensorialite);
    setMonotropismScore(archetype.axesScores.monotropisme);
    setCommunicationScore(archetype.axesScores.communication);
    setRegulationScore(archetype.axesScores.masquage);
    setSelectedCommOptions([...archetype.communicationPreferences]);
    setSelectedTriggers([...archetype.sensoryTriggers]);
    setSelectedSoothing([...archetype.soothingTools]);
    setSelectedWarnings([...archetype.earlyWarningSigns]);
    if (archetype.specialInterests) setSpecialInterests([...archetype.specialInterests]);
    if (archetype.caregiverAdvice) setCaregiverNote(archetype.caregiverAdvice);

    setActiveSubTab("builder");
  };

  // Convert current scores to RadarAxis array for home radar injection
  const buildRadarAxesFromScores = (scores: {
    sensorialite: number;
    monotropisme: number;
    communication: number;
    masquage: number;
  }): RadarAxis[] => {
    return [
      {
        id: "sensorialite",
        name: "Sphère Sensorielle",
        shortName: "Sensorialité",
        description: "Traitement des stimuli physiques (bruit, textures, lumière, proprioception) et seuil de saturation.",
        relativeDescription: "Indicateur de la charge physique que votre proche endure.",
        value: scores.sensorialite,
        communityAverage: 76,
        category: "sensorialite",
        color: "#22d3ee",
        iconName: "Volume2",
      },
      {
        id: "monotropisme",
        name: "Monotropisme & Attention",
        shortName: "Monotropisme",
        description: "Concentration intense sur un canal unique, difficulté aux interruptions et inertie exécutive.",
        relativeDescription: "Capacité d'immersion totale qui rend les interruptions brutales très coûteuses.",
        value: scores.monotropisme,
        communityAverage: 82,
        category: "cognition",
        color: "#a855f7",
        iconName: "Compass",
      },
      {
        id: "communication",
        name: "Double Empathie & Social",
        shortName: "Communication",
        description: "Fluidité naturelle entre pairs neurodivergents vs décalage réciproque avec personnes typiques.",
        relativeDescription: "Différence de dialecte relationnel plutôt qu'un déficit d'affection.",
        value: scores.communication,
        communityAverage: 71,
        category: "communication",
        color: "#34d399",
        iconName: "MessageSquare",
      },
      {
        id: "masquage",
        name: "Masquage & Compensation",
        shortName: "Masquage",
        description: "Effort conscient pour dissimuler ses traits et paraître 'typique', coût énergétique colossal.",
        relativeDescription: "L'énergie invisible dépensée à donner le change en public.",
        value: scores.masquage,
        communityAverage: 79,
        category: "regulation",
        color: "#f59e0b",
        iconName: "ShieldAlert",
      },
    ];
  };

  const applyCurrentScoresToCentralRadar = (scores: {
    sensorialite: number;
    monotropisme: number;
    communication: number;
    masquage: number;
  }) => {
    const newAxes = buildRadarAxesFromScores(scores);
    onApplyProfileToRadar(newAxes);
    setRadarAppliedFeedback(true);
    setTimeout(() => setRadarAppliedFeedback(false), 2500);
  };

  // Save custom profile to LocalStorage
  const handleSaveToLocalStorage = () => {
    const profileToSave = {
      name: profileName,
      neurotype: selectedNeurotype,
      tagline,
      caregiverNote,
      axesScores: {
        sensorialite: sensoryScore,
        monotropisme: monotropismScore,
        communication: communicationScore,
        masquage: regulationScore,
      },
      communicationPreferences: selectedCommOptions,
      sensoryTriggers: selectedTriggers,
      soothingTools: selectedSoothing,
      earlyWarningSigns: selectedWarnings,
      specialInterests,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_PROFILE_KEY, JSON.stringify(profileToSave));
      setSaveFeedback(true);
      setTimeout(() => setSaveFeedback(false), 2500);
    } catch {
      // ignore storage error
    }
  };

  // Copy profile text summary to clipboard
  const handleCopyProfileSummary = (profile: {
    name: string;
    neurotypeLabel: string;
    axesScores: { sensorialite: number; monotropisme: number; communication: number; masquage: number };
    communicationPreferences: string[];
    sensoryTriggers: string[];
    soothingTools: string[];
    earlyWarningSigns: string[];
    caregiverNote?: string;
  }) => {
    const text = `
=== PASSEPORT NEUROCOGNITIF // ATLAS DU SPECTRE ===
Identifiant : ${profile.name}
Profil / Neurotype : ${profile.neurotypeLabel}

CALIBRATION DES AXES (0-100%) :
• Sensorialité : ${profile.axesScores.sensorialite}%
• Monotropisme & Attention : ${profile.axesScores.monotropisme}%
• Communication & Social : ${profile.axesScores.communication}%
• Masquage & Routines : ${profile.axesScores.masquage}%

MODALITÉS DE COMMUNICATION PRÉFÉRÉES :
${profile.communicationPreferences.map((c) => `• ${c}`).join("\n")}

DÉCLENCHEURS DE SURCHARGE (TRIGGERS) :
${profile.sensoryTriggers.map((t) => `• ${t}`).join("\n")}

OUTILS D'APAISEMENT & RÉGULATION :
${profile.soothingTools.map((s) => `• ${s}`).join("\n")}

SIGNAUX D'ALERTE PRÉCURSEURS :
${profile.earlyWarningSigns.map((w) => `• ${w}`).join("\n")}

NOTE POUR L'ENTOURAGE :
"${profile.caregiverNote || "Respecter le temps de silence et de récupération après une surcharge."}"
===================================================
`.trim();

    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const getArchetypeIcon = (iconName?: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case "Zap":
        return <Zap className="w-4 h-4 text-amber-400" />;
      case "Compass":
        return <Compass className="w-4 h-4 text-cyan-400" />;
      case "Sliders":
        return <Sliders className="w-4 h-4 text-emerald-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER HUD COCKPIT BANNER */}
      <div className="hud-frame glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 relative overflow-hidden shadow-2xl">
        {/* HUD Micro-Telemetry Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 mb-4 pb-2 border-b border-cyan-500/15">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>HUD.PROFILE_ARCHITECT // SYSTEM: CALIBRATION_V2.5</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-500">
            <span>DATABASE: 5_ARCHETYPES_LOADED</span>
            <span className="text-cyan-400 font-bold">[ MATRIX: CONFIGURABLE ]</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Constructeur Autistique & Banque d'Usagers Types</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Constructeur de Profil & Banque d'Archétypes
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explorez la banque de profils types de la communauté pour vous reconnaître d'un coup d'œil, ou assemblez votre propre Passeport Sensoriel et Cognitif sur mesure. Exportable pour vos proches, médecins ou collègues.
            </p>
          </div>

          {/* Quick Stats Widget */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 shrink-0 font-mono text-xs">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-cyan-400 font-bold text-base">5</div>
              <div className="text-[10px] text-slate-400">Archétypes</div>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-purple-400 font-bold text-base">4</div>
              <div className="text-[10px] text-slate-400">Axes HUD</div>
            </div>
            <div className="text-center px-3">
              <div className="text-emerald-400 font-bold text-base">100%</div>
              <div className="text-[10px] text-slate-400">Confidentiel</div>
            </div>
          </div>
        </div>

        {/* SUB-TABS NAVIGATION (HUD BUTTONS) */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          {[
            { id: "archetypes", label: "🏛️ Banque de Profils Types (Archétypes)", icon: UserCheck },
            { id: "builder", label: "⚡ Mon Constructeur Sur Mesure", icon: SlidersHorizontal },
            { id: "comparator", label: "⚖️ Comparateur (Autiste vs Allistique)", icon: Brain },
          ].map((tab) => {
            const isTabActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isTabActive
                    ? "bg-gradient-to-r from-cyan-950 to-purple-950 text-cyan-200 border border-cyan-500/60 shadow-[0_0_12px_rgba(34,211,238,0.25)] font-bold"
                    : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FEEDBACK NOTIFICATION BAR */}
      {(saveFeedback || copyFeedback || radarAppliedFeedback) && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>
              {saveFeedback && "Profil sauvegardé localement dans votre navigateur !"}
              {copyFeedback && "Passeport neurocognitif copié dans votre presse-papiers !"}
              {radarAppliedFeedback && "Valeurs injectées avec succès dans le Radar Central de l'accueil !"}
            </span>
          </div>
          <span className="text-[10px] opacity-75">[ OPÉRATION RÉUSSIE ]</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 1: BANQUE DE PROFILS TYPES & ARCHÉTYPES */}
      {/* ======================================================== */}
      {activeSubTab === "archetypes" && (
        <div className="space-y-6">
          {/* ARCHETYPE SELECTOR CHIPS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {archetypeProfilesData.map((arch) => {
              const isSelected = arch.id === selectedArchetypeId;
              const isAllistic = arch.neurotype === "allistic_typical";
              return (
                <button
                  key={arch.id}
                  onClick={() => setSelectedArchetypeId(arch.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? isAllistic
                        ? "bg-slate-900 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)] text-white"
                        : "bg-slate-900 border-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.25)] text-white"
                      : "bg-slate-950/70 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                        {getArchetypeIcon(arch.avatarIcon)}
                      </div>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {arch.neurotype === "allistic_typical" ? "TÉMOIN" : "ARCHÉTYPE"}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white mb-1">
                      {arch.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {arch.tagline}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyan-400">Sensibilité: {arch.axesScores.sensorialite}%</span>
                    <span className={isSelected ? "text-cyan-300 font-bold" : "opacity-0"}>● ACTIF</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE ARCHETYPE DOSSIER VIEW */}
          <div className="hud-frame glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-6 shadow-xl relative overflow-hidden">
            {/* Top Identity Dossier Header */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                    DOSSIER TYPE #{selectedArchetype.id.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-purple-300">
                    {selectedArchetype.neurotypeLabel}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <span>{selectedArchetype.name}</span>
                </h2>

                <p className="text-xs sm:text-sm text-cyan-200/90 italic font-medium">
                  « {selectedArchetype.tagline} »
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  {selectedArchetype.description}
                </p>
              </div>

              {/* ACTION BUTTONS (INJECT, DUPLICATE, COPY) */}
              <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
                <button
                  onClick={() => applyCurrentScoresToCentralRadar(selectedArchetype.axesScores)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Charger dans le Radar Central</span>
                </button>

                <button
                  onClick={() => loadArchetypeIntoBuilder(selectedArchetype)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-200 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 transition-all cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dupliquer & Personnaliser</span>
                </button>

                <button
                  onClick={() =>
                    handleCopyProfileSummary({
                      name: selectedArchetype.name,
                      neurotypeLabel: selectedArchetype.neurotypeLabel,
                      axesScores: selectedArchetype.axesScores,
                      communicationPreferences: selectedArchetype.communicationPreferences,
                      sensoryTriggers: selectedArchetype.sensoryTriggers,
                      soothingTools: selectedArchetype.soothingTools,
                      earlyWarningSigns: selectedArchetype.earlyWarningSigns,
                      caregiverNote: selectedArchetype.caregiverAdvice,
                    })
                  }
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copier la Fiche Résumé</span>
                </button>
              </div>
            </div>

            {/* QUOTE BLOCK */}
            {selectedArchetype.quote && (
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs sm:text-sm text-purple-200 leading-relaxed italic relative">
                <span className="font-mono text-purple-400 text-xs block mb-1 uppercase font-bold not-italic">
                  🎙️ Témoignage d'Expérience Vécu :
                </span>
                "{selectedArchetype.quote}"
              </div>
            )}

            {/* 4 AXES TELEMETRY BARS */}
            <div className="space-y-3 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800/80">
                <span className="text-cyan-400 uppercase font-bold">
                  TÉLÉMÉTRIE DES 4 AXES CARDINAUX :
                </span>
                <span className="text-slate-500">[ ÉCHELLE 0-100% ]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* 1. SENSORIALITE */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Sphère Sensorielle (Bruit, Lumière)</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {selectedArchetype.axesScores.sensorialite}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                      style={{ width: `${selectedArchetype.axesScores.sensorialite}%` }}
                    />
                  </div>
                </div>

                {/* 2. MONOTROPISME */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Monotropisme & Inertie Exécutive</span>
                    <span className="font-mono text-purple-400 font-bold">
                      {selectedArchetype.axesScores.monotropisme}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full bg-purple-400 transition-all duration-300"
                      style={{ width: `${selectedArchetype.axesScores.monotropisme}%` }}
                    />
                  </div>
                </div>

                {/* 3. COMMUNICATION */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Communication & Double Empathie</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {selectedArchetype.axesScores.communication}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                      style={{ width: `${selectedArchetype.axesScores.communication}%` }}
                    />
                  </div>
                </div>

                {/* 4. MASQUAGE */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Masquage Social & Routines</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {selectedArchetype.axesScores.masquage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all duration-300"
                      style={{ width: `${selectedArchetype.axesScores.masquage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* TRAITS & PREFERENCES 4-PANEL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* COMMUNICATION PREFERENCES */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <span>💬 Modalités de Communication Préférées :</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArchetype.communicationPreferences.map((pref, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/50 text-cyan-200 border border-cyan-500/30"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>

              {/* SENSORY TRIGGERS */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                <div className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <span>⚠️ Déclencheurs de Surcharge (Triggers) :</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArchetype.sensoryTriggers.map((trig, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-rose-950/40 text-rose-200 border border-rose-500/30"
                    >
                      {trig}
                    </span>
                  ))}
                </div>
              </div>

              {/* SOOTHING TOOLS */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <span>🛡️ Outils d'Apaisement & Régulation :</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArchetype.soothingTools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/40 text-emerald-200 border border-emerald-500/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* EARLY WARNING SIGNS */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <span>🚨 Signaux Précurseurs de Crise :</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArchetype.earlyWarningSigns.map((warn, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-200 border border-amber-500/30"
                    >
                      {warn}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SPECIAL INTERESTS (SPINS) & CAREGIVER ADVICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedArchetype.specialInterests && (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2 text-xs">
                  <div className="font-mono text-purple-400 uppercase tracking-wider font-bold">
                    🪐 Intérêts Spécifiques & Carburants Dopaminergiques (SpIns) :
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArchetype.specialInterests.map((spin, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-200 border border-purple-500/40 font-mono"
                      >
                        #{spin}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedArchetype.caregiverAdvice && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5 text-xs text-emerald-200">
                  <div className="font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Conseil Clé pour l'Entourage & Conjoints :</span>
                  </div>
                  <p className="leading-relaxed">
                    {selectedArchetype.caregiverAdvice}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: MON CONSTRUCTEUR SUR MESURE (PROFILE BUILDER) */}
      {/* ======================================================== */}
      {activeSubTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: FORM CONTROLS */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. IDENTITÉ & NEUROTYPE */}
            <div className="hud-frame glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800/90 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <User className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  1. Identité & Positionnement
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Nom ou Pseudo du Profil :
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Ex: Alex, Profil Travail, Profil Épuisé..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Sélection du Neurotype :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {neurotypeOptions.map((opt) => {
                      const isOptSelected = selectedNeurotype === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedNeurotype(opt.id)}
                          className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                            isOptSelected
                              ? "bg-cyan-950/70 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                              : "bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold">{opt.label}</span>
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-900 text-slate-400">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-tight">
                            {opt.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Slogan ou devise synthétique du profil :
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Ex: Grande capacité de focus, besoin de silence absolu."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* 2. CALIBRATION DES 4 AXES (0-100%) */}
            <div className="hud-frame glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800/90 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                    2. Calibration des 4 Sphères Cardinaux
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Sliders 0 à 100%</span>
              </div>

              <div className="space-y-4">
                {/* SENSORIALITE */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-medium">Sensorialité (Bruits, Lumière, Toucher) :</span>
                    <span className="font-mono text-cyan-400 font-bold">{sensoryScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={sensoryScore}
                    onChange={(e) => setSensoryScore(parseInt(e.target.value))}
                    className="w-full cyber-slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Faible sensibilité</span>
                    <span>Modérée</span>
                    <span>Hyper-réactivité aiguë</span>
                  </div>
                </div>

                {/* MONOTROPISME */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-medium">Monotropisme & Attention Unique :</span>
                    <span className="font-mono text-purple-400 font-bold">{monotropismScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={monotropismScore}
                    onChange={(e) => setMonotropismScore(parseInt(e.target.value))}
                    className="w-full cyber-slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Polyvalence aisée</span>
                    <span>Canal unique / Inertie</span>
                    <span>Hyperfocus absolu</span>
                  </div>
                </div>

                {/* COMMUNICATION */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-medium">Communication Sociale & Littéralité :</span>
                    <span className="font-mono text-emerald-400 font-bold">{communicationScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={communicationScore}
                    onChange={(e) => setCommunicationScore(parseInt(e.target.value))}
                    className="w-full cyber-slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Codes intuitifs</span>
                    <span>Besoin d'explicite</span>
                    <span>Littéralité totale</span>
                  </div>
                </div>

                {/* MASQUAGE */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-medium">Masquage Social & Routines :</span>
                    <span className="font-mono text-amber-400 font-bold">{regulationScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={regulationScore}
                    onChange={(e) => setRegulationScore(parseInt(e.target.value))}
                    className="w-full cyber-slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Zéro compensation</span>
                    <span>Adaptation consciente</span>
                    <span>Camouflage épuisant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. MODALITÉS & PRÉFÉRENCES (PILLS CLICABLES) */}
            <div className="hud-frame glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800/90 space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Brain className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  3. Préférences, Déclencheurs & Outils
                </h3>
              </div>

              {/* COMM PREFERENCES */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-bold flex items-center justify-between">
                  <span>💬 Modalités de Communication Préférées :</span>
                  <span className="text-[10px] text-slate-500 font-normal">Cochez vos préférences</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {communicationOptions.map((opt) => {
                    const isSelected = selectedCommOptions.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleItem(selectedCommOptions, setSelectedCommOptions, opt)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-cyan-950 text-cyan-200 border-cyan-400/80 font-bold shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SENSORY TRIGGERS */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono text-rose-400 font-bold flex items-center justify-between">
                  <span>⚠️ Déclencheurs de Surcharge (Triggers) :</span>
                  <span className="text-[10px] text-slate-500 font-normal">Ce qui épuise le système</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sensoryTriggerOptions.map((opt) => {
                    const isSelected = selectedTriggers.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleItem(selectedTriggers, setSelectedTriggers, opt)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-rose-950 text-rose-200 border-rose-400/80 font-bold shadow-[0_0_8px_rgba(244,63,94,0.2)]"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                        }`}
                      >
                        {isSelected ? "⚠️ " : "+ "}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SOOTHING TOOLS */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono text-emerald-400 font-bold flex items-center justify-between">
                  <span>🛡️ Outils d'Apaisement & Régulation :</span>
                  <span className="text-[10px] text-slate-500 font-normal">Ce qui vous recharge</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {soothingToolOptions.map((opt) => {
                    const isSelected = selectedSoothing.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleItem(selectedSoothing, setSelectedSoothing, opt)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-950 text-emerald-200 border-emerald-400/80 font-bold shadow-[0_0_8px_rgba(52,211,153,0.2)]"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                        }`}
                      >
                        {isSelected ? "🛡️ " : "+ "}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* EARLY WARNING SIGNS */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono text-amber-400 font-bold flex items-center justify-between">
                  <span>🚨 Signaux Précurseurs de Crise :</span>
                  <span className="text-[10px] text-slate-500 font-normal">Signaux d'alerte discrets</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {earlyWarningOptions.map((opt) => {
                    const isSelected = selectedWarnings.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleItem(selectedWarnings, setSelectedWarnings, opt)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-950 text-amber-200 border-amber-400/80 font-bold shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                        }`}
                      >
                        {isSelected ? "🚨 " : "+ "}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SPECIAL INTERESTS (SPINS) INPUT */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono text-purple-400 font-bold">
                  🪐 Vos Intérêts Spécifiques (SpIns) :
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={spinInput}
                    onChange={(e) => setSpinInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSpinTag()}
                    placeholder="Ajouter une passion (ex: Linguistique, Astronomie, LEGO)..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="button"
                    onClick={addSpinTag}
                    className="px-3 py-1.5 rounded-xl bg-purple-900/60 text-purple-200 border border-purple-500/40 text-xs font-bold hover:bg-purple-800 cursor-pointer"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {specialInterests.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950 text-purple-200 border border-purple-500/40 text-xs font-mono"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeSpinTag(tag)}
                        className="text-purple-400 hover:text-white cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* NOTE FOR CAREGIVERS / WORK */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <label className="block text-xs font-mono text-emerald-400 font-bold">
                  🤝 Message / Consigne Clé pour Vos Proches ou Collègues :
                </label>
                <textarea
                  rows={2}
                  value={caregiverNote}
                  onChange={(e) => setCaregiverNote(e.target.value)}
                  placeholder="Ce que votre entourage doit savoir en priorité pour respecter votre énergie..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: LIVE PASSPORT PREVIEW & ACTIONS */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="hud-frame hud-frame-emerald glass-panel rounded-2xl p-6 border border-emerald-500/30 space-y-5 shadow-2xl relative overflow-hidden">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 pb-2 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PASSEPORT NEUROCOGNITIF // LIVE_PREVIEW</span>
                </div>
                <span className="font-bold">[ APERÇU GÉNÉRÉ ]</span>
              </div>

              {/* Passport Card Header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase">
                    {neurotypeOptions.find((n) => n.id === selectedNeurotype)?.badge || "PROFIL"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ID: #{profileName.replace(/\s+/g, "_").toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  {profileName || "Profil Anonyme"}
                </h3>
                <p className="text-xs text-slate-300 italic mt-0.5">
                  "{tagline || "Sans description particulière."}"
                </p>
              </div>

              {/* 4 Mini Progress Bars */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Sensorialité :</span>
                  <span className="font-mono text-cyan-400 font-bold">{sensoryScore}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${sensoryScore}%` }} />
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Monotropisme :</span>
                  <span className="font-mono text-purple-400 font-bold">{monotropismScore}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: `${monotropismScore}%` }} />
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Communication :</span>
                  <span className="font-mono text-emerald-400 font-bold">{communicationScore}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${communicationScore}%` }} />
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Masquage / Routines :</span>
                  <span className="font-mono text-amber-400 font-bold">{regulationScore}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${regulationScore}%` }} />
                </div>
              </div>

              {/* Summary Counts */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-cyan-300">
                  💬 {selectedCommOptions.length} Préférence(s) comm.
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-rose-300">
                  ⚠️ {selectedTriggers.length} Déclencheur(s)
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-emerald-300">
                  🛡️ {selectedSoothing.length} Outil(s) secours
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-purple-300">
                  🪐 {specialInterests.length} Intérêt(s) (SpIns)
                </div>
              </div>

              {/* Note for Caregivers Preview */}
              {caregiverNote && (
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200">
                  <span className="font-mono text-emerald-400 block font-bold mb-0.5">
                    Conseil entourage :
                  </span>
                  "{caregiverNote}"
                </div>
              )}

              {/* ACTION BUTTONS (SAVE, APPLY TO RADAR, COPY) */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button
                  onClick={handleSaveToLocalStorage}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_12px_rgba(52,211,153,0.3)] transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder dans mon Navigateur</span>
                </button>

                <button
                  onClick={() =>
                    applyCurrentScoresToCentralRadar({
                      sensorialite: sensoryScore,
                      monotropisme: monotropismScore,
                      communication: communicationScore,
                      masquage: regulationScore,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-cyan-200 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Injecter dans le Radar Central</span>
                </button>

                <button
                  onClick={() =>
                    handleCopyProfileSummary({
                      name: profileName,
                      neurotypeLabel:
                        neurotypeOptions.find((n) => n.id === selectedNeurotype)?.label ||
                        "Autiste",
                      axesScores: {
                        sensorialite: sensoryScore,
                        monotropisme: monotropismScore,
                        communication: communicationScore,
                        masquage: regulationScore,
                      },
                      communicationPreferences: selectedCommOptions,
                      sensoryTriggers: selectedTriggers,
                      soothingTools: selectedSoothing,
                      earlyWarningSigns: selectedWarnings,
                      caregiverNote,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-950 hover:bg-slate-900 border border-slate-800 transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copier mon Passeport Texte</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: COMPARATEUR DE PROFILS (AUTISTE VS ALLISTIQUE) */}
      {/* ======================================================== */}
      {activeSubTab === "comparator" && (
        <div className="space-y-6">
          <div className="hud-frame glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Le Gouffre Énergétique : Comparer le Fonctionnement Autiste & Allistique
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              Ce comparateur met en lumière pourquoi deux personnes placées dans le même environnement (ex. un repas de famille, un supermarché ou une réunion d'entreprise) ne dépensent pas du tout la même énergie métabolique. Ce qui est gratuit et instinctif pour un système allistique coûte 80% de la batterie d'un adulte autiste.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AUTISTIC ARCHETYPE CARD (OU CUSTOM) */}
            <div className="hud-frame hud-frame-cyan glass-panel rounded-2xl p-6 border border-cyan-500/40 space-y-5 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/20">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 text-xs">
                <div className="flex items-center gap-2 font-bold text-cyan-300 font-mono">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>PROFIL AUTISTIQUE DE RÉFÉRENCE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  TRAITEMENT DENSE SANS FILTRE
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedArchetype.name}
                </h3>
                <p className="text-xs text-cyan-200/90 italic">
                  « {selectedArchetype.tagline} »
                </p>
              </div>

              {/* 4 AXES COMPARED */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Sensibilité Sensorielle :</span>
                    <span className="font-mono text-cyan-400 font-bold">{selectedArchetype.axesScores.sensorialite}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${selectedArchetype.axesScores.sensorialite}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Monotropisme & Inertie :</span>
                    <span className="font-mono text-purple-400 font-bold">{selectedArchetype.axesScores.monotropisme}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: `${selectedArchetype.axesScores.monotropisme}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Masquage & Compensation :</span>
                    <span className="font-mono text-amber-400 font-bold">{selectedArchetype.axesScores.masquage}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedArchetype.axesScores.masquage}%` }} />
                  </div>
                </div>
              </div>

              {/* DAILY REALITY BULLETS */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-mono text-cyan-400 text-[11px] uppercase font-bold">
                  Ce que cela implique au quotidien :
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 leading-relaxed">
                  <div>• <strong>Filtrage conscient :</strong> Le cerveau doit traiter manuellement chaque son, lumière et micro-mouvement.</div>
                  <div>• <strong>Coût social :</strong> Le décodage du second degré et des micro-expressions demande un calcul cognitif permanent.</div>
                  <div>• <strong>Temps de récupération :</strong> Indispensable pour éviter le shutdown ou le meltdown somatique.</div>
                </div>
              </div>
            </div>

            {/* ALLISTIC ARCHETYPE CARD */}
            <div className="hud-frame glass-panel rounded-2xl p-6 border border-slate-800 space-y-5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-300 font-mono">
                  <Activity className="w-4 h-4 text-slate-400" />
                  <span>PROFIL ALLISTIQUE (NEUROTYPIQUE)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                  FILTRAGE THALAMIQUE AUTOMATIQUE
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {allisticArchetype.name}
                </h3>
                <p className="text-xs text-slate-400 italic">
                  « {allisticArchetype.tagline} »
                </p>
              </div>

              {/* 4 AXES COMPARED */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Sensibilité Sensorielle :</span>
                    <span className="font-mono text-slate-400 font-bold">{allisticArchetype.axesScores.sensorialite}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width: `${allisticArchetype.axesScores.sensorialite}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Monotropisme & Inertie :</span>
                    <span className="font-mono text-slate-400 font-bold">{allisticArchetype.axesScores.monotropisme}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width: `${allisticArchetype.axesScores.monotropisme}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Masquage & Compensation :</span>
                    <span className="font-mono text-slate-400 font-bold">{allisticArchetype.axesScores.masquage}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width: `${allisticArchetype.axesScores.masquage}%` }} />
                  </div>
                </div>
              </div>

              {/* DAILY REALITY BULLETS */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-mono text-slate-400 text-[11px] uppercase font-bold">
                  Ce que cela implique au quotidien :
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 leading-relaxed">
                  <div>• <strong>Filtrage passif :</strong> Le cerveau élimine automatiquement 95% des bruits parasites sans intervention consciente.</div>
                  <div>• <strong>Aisance sociale :</strong> Le bavardage informel et les sous-entendus sont traités par des automatismes innés.</div>
                  <div>• <strong>Recharge par le groupe :</strong> Les interactions sociales collectives rechargent l'énergie plutôt que de la consumer.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
