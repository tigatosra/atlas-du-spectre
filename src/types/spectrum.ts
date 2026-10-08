export interface RadarAxis {
  id: string;
  name: string;
  shortName: string;
  description: string;
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
}

export interface IntensityStat {
  level: number;
  percentage: number;
  shortDescription: string;
  detailedSymptom: string;
  accompanyingStrategies: string[];
  auditoryThreshold: string;
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
