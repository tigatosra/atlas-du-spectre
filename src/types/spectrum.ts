export type UserPerspective = "autiste" | "proche";
export type VisitorPerspective = "autistic_adult" | "questioning" | "caregiver" | "professional";

export type MediaFormat =
  | "book"
  | "audiobook"
  | "video"
  | "podcast"
  | "website"
  | "tool_app"
  | "test";

export type EnergyLevel = "low_energy" | "medium_energy" | "deep_dive";

// "Truc" ou stratégie concrète partagée par un pair autiste
export interface PeerHackTip {
  id: string;
  traitId: string;
  title: string;
  content: string;
  contextTag: "maison" | "travail" | "transports" | "social" | "urgence_shutdown" | string;
  energyCost: "zero_effort" | "faible" | "modere" | string;
  workedForCount: number;
  userValidated?: boolean;
  author: string;
  timestamp: string;
}

// Module Décodeur pour Proches: "Ce que vous voyez vs Ce qui se passe réellement"
export interface CaregiverDecoderCard {
  id: string;
  title: string;
  whatYouSee: string;
  whatActuallyHappens: string;
  neurologicalMechanism: string;
  supportiveAction: string;
  whatToNeverDo: string;
  safePhrase: string;
}

export interface RadarAxis {
  id: string;
  name: string;
  shortName: string;
  description: string;
  relativeDescription: string;
  value: number; // 0 to 100
  communityAverage: number; // 0 to 100
  category: "sensorialite" | "cognition" | "communication" | "regulation";
  color: string;
  iconName: string;
}

export interface ExperienceComment {
  id: string;
  author: string;
  avatarText: string;
  intensityLevel: number; // 1 to 10
  timestamp: string;
  contextTag: string; // e.g., "Open-space", "Soirée sociale", "Grande surface"
  text: string;
  resonancesCount: number;
  userResonated?: boolean;
  copingStrategy?: string;
  tags: string[];
  perspectiveAuthor?: "autiste" | "proche";
}

export interface IntensityStat {
  level: number;
  percentage: number;
  shortDescription: string;
  detailedSymptom: string;
  accompanyingStrategies: string[];
  auditoryThreshold: string;
  // Specific guidance for family / partners / friends
  relativeGuidance: {
    visibleSigns: string;
    whatToAvoid: string;
    effectiveAction: string;
    safePhrase: string;
  };
}

export interface SensorySphereItem {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  hyperSensibility: string;
  hypoSensibility: string;
  commonTriggers: string[];
  soothingTools: string[];
  forRelativesAdvice: string;
  defaultIntensity: number;
}

export interface CognitiveConceptItem {
  id: string;
  title: string;
  subtitle: string;
  scientificReference: string;
  executiveSummary: string;
  dailyConsequenceSelf: string;
  dailyConsequenceRelative: string;
  concreteExample: string;
  practicalTipsSelf: string[];
  practicalTipsRelative: string[];
}

export interface TheoryWidgetData {
  id: string;
  title: string;
  subtitle: string;
  authorReference: string;
  keyIdea: string;
  impactOnDailyLife: string;
  tag: string;
  readTime: string;
  dsmContrast: string;
}

export interface DiagnosticPathStep {
  stepNumber: number;
  title: string;
  description: string;
  nuance: string;
  recommendedResources: string[];
}

// Neurotype identitaire
export type NeurotypeCategory =
  | "autistic_diagnosed"
  | "autistic_self_identified"
  | "audhd"
  | "questioning"
  | "allistic_typical"
  | "other_neurodivergent";

// Profil usager (personnalisé ou archétype)
export interface UserProfileData {
  id: string;
  name: string;
  neurotype: NeurotypeCategory;
  neurotypeLabel: string;
  avatarIcon?: string;
  tagline: string;
  description: string;
  quote?: string;
  
  // Axes cardinaux (0 à 100%)
  axesScores: {
    sensorialite: number;
    monotropisme: number; // Cognition & Exécutif
    communication: number; // Social & Masquage
    masquage: number; // Régulation & Routines
  };

  // Caractéristiques & Préférences
  communicationPreferences: string[];
  sensoryTriggers: string[];
  soothingTools: string[];
  earlyWarningSigns: string[];
  specialInterests?: string[];
  
  // Clé pour les proches
  caregiverAdvice?: string;
  
  // Statut
  isArchetype?: boolean;
  createdAt?: string;
}

