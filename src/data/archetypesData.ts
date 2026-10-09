import { UserProfileData, NeurotypeCategory } from "../types/spectrum";

export interface TraitOption {
  id: string;
  label: string;
  category: "communication" | "trigger" | "soothing" | "warning";
  icon?: string;
  description?: string;
}

export const neurotypeOptions: { id: NeurotypeCategory; label: string; badge: string; description: string }[] = [
  {
    id: "autistic_diagnosed",
    label: "Autiste Diagnostiqué(e)",
    badge: "DIAG_OFFICIEL",
    description: "Diagnostic formel posé par un psychiatre ou neuropsychologue.",
  },
  {
    id: "autistic_self_identified",
    label: "Autiste Auto-identifié / En questionnement",
    badge: "AUTO_IDENTIFIÉ",
    description: "Reconnaissance de son fonctionnement par le savoir expérientiel et l'introspection.",
  },
  {
    id: "audhd",
    label: "AuDHD (Autisme + TDAH)",
    badge: "CO_OCCURRENCE",
    description: "Double fonctionnement neuroatypique : friction entre besoin d'ordre et soif de nouveauté.",
  },
  {
    id: "allistic_typical",
    label: "Allistique / Neurotypique",
    badge: "TÉMOIN_TYPIQUE",
    description: "Fonctionnement neurologique standard majoritaire, sans hypersensibilité invalidante.",
  },
  {
    id: "other_neurodivergent",
    label: "Autre Neurodivergence (HPI, Dys, etc.)",
    badge: "NEUROATYPIQUE",
    description: "Profil cognitif singulier croisant d'autres formes de neurodivergence.",
  },
];

export const communicationOptions = [
  "Écrit prioritaire (SMS, Mail, Messagerie)",
  "Aucun appel vocal sans préavis convenu",
  "Clarté 100% littérale (sans sous-entendus)",
  "Temps de latence de réponse accepté (sans relance)",
  "Pas d'obligation de contact visuel soutenu",
  "Poser des questions fermées plutôt qu'ouvertes",
  "Tolérance aux silences sans interprétation négative",
  "Validation explicite des consignes partagées",
];

export const sensoryTriggerOptions = [
  "Brouhaha de foule & supermarchés",
  "Néons fluorescents & éclairages blancs violents",
  "Changements d'horaires ou de plans à la dernière minute",
  "Petits bavardages superficiels (Small talk) prolongés",
  "Vêtements synthétiques, étiquettes & coutures rêches",
  "Consignes orales multiples enchaînées sans trace écrite",
  "Bruits répétitifs (mâchonnement, clic de stylo, horloge)",
  "Contact physique tactile inattendu ou effleurement léger",
  "Odeurs chimiques fortes (parfums synthétiques, solvants)",
  "Températures extrêmes ou sensations d'humidité",
];

export const soothingToolOptions = [
  "Casque antibruit actif ANC (Sony / Bose)",
  "Bouchons d'oreilles acoustiques (Loop / Calmer)",
  "Obscurité complète & silence absolu (Sas noir)",
  "Couverture ou coussin lesté (pression proprioceptive)",
  "Plongée immersive dans un Intérêt Spécifique (SpIn)",
  "Objets de stimming & fidgets texturés discrets",
  "Playlist musicale ou bruit brun en boucle (Brown noise)",
  "Alimentation réconfortante prévisible (Safe Food)",
  "Temps de solitude inviolable après une sortie",
  "Lunettes teintées FL-41 anti-éblouissement",
];

export const earlyWarningOptions = [
  "Baisse progressive de la parole (perte de fluidité verbale)",
  "Regard fixe dans le vide ou yeux plissés contre la lumière",
  "Irritabilité soudaine face à un micro-bruit anodin",
  "Sentiment d'irréalité, de brouillard mental ou dissociation",
  "Maladresse motrice accrue (trébuchements, objets échappés)",
  "Refus brutal de prendre la moindre décision supplémentaire",
  "Maux de tête ou nausées de surchauffe sensorielle",
  "Accélération du rythme cardiaque ou serrement de poitrine",
];

export const archetypeProfilesData: UserProfileData[] = [
  {
    id: "archetype-cameleon",
    name: "La Caméléon Épuisée",
    neurotype: "autistic_self_identified",
    neurotypeLabel: "Femme adulte — Diagnostic tardif & Masquage intensif",
    avatarIcon: "Sparkles",
    tagline: "Compensation invisible colossale, sociable en apparence, burnout récurrent.",
    description: "Femme adulte ayant passé sa vie à analyser minutieusement les codes sociaux comme une langue étrangère. Extrêmement empathique mais épuisée par l'effort conscient de paraître 'normale'. Longtemps diagnostiquée à tort anxio-dépressive avant de découvrir la clé autistique.",
    quote: "Tout le monde me trouvait sociable et souriante le vendredi soir au bureau. Ce qu'ils ne voyaient pas, c'est que je passais tout le weekend prostrée dans le noir absolu sans pouvoir parler.",
    axesScores: {
      sensorialite: 84,
      monotropisme: 76,
      communication: 92,
      masquage: 88,
    },
    communicationPreferences: [
      "Écrit prioritaire (SMS, Mail, Messagerie)",
      "Aucun appel vocal sans préavis convenu",
      "Pas d'obligation de contact visuel soutenu",
      "Temps de latence de réponse accepté (sans relance)",
    ],
    sensoryTriggers: [
      "Brouhaha de foule & supermarchés",
      "Néons fluorescents & éclairages blancs violents",
      "Petits bavardages superficiels (Small talk) prolongés",
      "Bruits répétitifs (mâchonnement, clic de stylo, horloge)",
    ],
    soothingTools: [
      "Casque antibruit actif ANC (Sony / Bose)",
      "Obscurité complète & silence absolu (Sas noir)",
      "Plongée immersive dans un Intérêt Spécifique (SpIn)",
      "Temps de solitude inviolable après une sortie",
      "Lunettes teintées FL-41 anti-éblouissement",
    ],
    earlyWarningSigns: [
      "Baisse progressive de la parole (perte de fluidité verbale)",
      "Sentiment d'irréalité, de brouillard mental ou dissociation",
      "Refus brutal de prendre la moindre décision supplémentaire",
    ],
    specialInterests: ["Psychologie cognitive", "Écriture & Littérature", "Botanique", "Séries documentaires criminelles"],
    caregiverAdvice: "Ne prenez jamais son besoin de solitude pour un rejet. Quand elle rentre à la maison, accordez-lui au moins 45 minutes de silence sans questions logistiques.",
    isArchetype: true,
  },
  {
    id: "archetype-audhd",
    name: "L'Explorateur AuDHD",
    neurotype: "audhd",
    neurotypeLabel: "Co-occurrence Autisme + TDAH (Monotropisme Paradoxal)",
    avatarIcon: "Zap",
    tagline: "Le paradoxe d'un cerveau qui a besoin de routine pour survivre mais meurt d'ennui sans nouveauté.",
    description: "Un profil dynamique caractérisé par une inertie exécutive forte mais capable d'hyperfocus vertigineux (12h d'affilée sur un sujet passionnant). Recherche de stimulations intenses (bruit brun, musique forte) couplée à une intolérance aux micro-bruits parasites.",
    quote: "Mon TDAH veut partir explorer l'univers à minuit, pendant que mon côté autiste panique parce que mon bol de céréales n'est pas rangé à sa place exacte.",
    axesScores: {
      sensorialite: 78,
      monotropisme: 94,
      communication: 65,
      masquage: 72,
    },
    communicationPreferences: [
      "Clarté 100% littérale (sans sous-entendus)",
      "Validation explicite des consignes partagées",
      "Tolérance aux silences sans interprétation négative",
    ],
    sensoryTriggers: [
      "Consignes orales multiples enchaînées sans trace écrite",
      "Changements d'horaires ou de plans à la dernière minute",
      "Bruits répétitifs (mâchonnement, clic de stylo, horloge)",
      "Petits bavardages superficiels (Small talk) prolongés",
    ],
    soothingTools: [
      "Playlist musicale ou bruit brun en boucle (Brown noise)",
      "Objets de stimming & fidgets texturés discrets",
      "Plongée immersive dans un Intérêt Spécifique (SpIn)",
      "Bouchons d'oreilles acoustiques (Loop / Calmer)",
    ],
    earlyWarningSigns: [
      "Irritabilité soudaine face à un micro-bruit anodin",
      "Maladresse motrice accrue (trébuchements, objets échappés)",
      "Accélération du rythme cardiaque ou serrement de poitrine",
    ],
    specialInterests: ["Jeux vidéo de stratégie complexe", "Intelligence Artificielle & Code", "Instruments de musique", "Astrophysique"],
    caregiverAdvice: "Fractionnez les demandes en une seule action à la fois par écrit. Laissez-lui manipuler un objet en parlant, cela l'aide à écouter.",
    isArchetype: true,
  },
  {
    id: "archetype-architecte",
    name: "L'Architecte Méthodique",
    neurotype: "autistic_diagnosed",
    neurotypeLabel: "Autiste Affirmé — Littéralité, Précision & Routines Vitales",
    avatarIcon: "Compass",
    tagline: "Précision chirurgicale, dévotion à la vérité objective et souveraineté du cadre prévisible.",
    description: "Excellence dans les domaines logiques et analytiques. Besoin absolu de vérité factuelle et d'exhaustivité. Les conventions sociales implicites lui semblent absurdes et inefficientes. L'imprévu déclenche une panique somatique directe, mais un cadre clair lui permet de s'épanouir au plus haut niveau.",
    quote: "Si vous me dites 'fais au mieux', je suis tétanisé. Donnez-moi un cahier des charges avec 15 critères stricts, et je vous livrerai une solution sans la moindre faille.",
    axesScores: {
      sensorialite: 88,
      monotropisme: 82,
      communication: 79,
      masquage: 94,
    },
    communicationPreferences: [
      "Clarté 100% littérale (sans sous-entendus)",
      "Poser des questions fermées plutôt qu'ouvertes",
      "Aucun appel vocal sans préavis convenu",
      "Écrit prioritaire (SMS, Mail, Messagerie)",
    ],
    sensoryTriggers: [
      "Changements d'horaires ou de plans à la dernière minute",
      "Brouhaha de foule & supermarchés",
      "Contact physique tactile inattendu ou effleurement léger",
      "Néons fluorescents & éclairages blancs violents",
    ],
    soothingTools: [
      "Casque antibruit actif ANC (Sony / Bose)",
      "Alimentation réconfortante prévisible (Safe Food)",
      "Obscurité complète & silence absolu (Sas noir)",
      "Temps de solitude inviolable après une sortie",
    ],
    earlyWarningSigns: [
      "Refus brutal de prendre la moindre décision supplémentaire",
      "Regard fixe dans le vide ou yeux plissés contre la lumière",
      "Baisse progressive de la parole (perte de fluidité verbale)",
    ],
    specialInterests: ["Systèmes d'exploitation & Unix", "Cartographie & Réseaux ferroviaires", "Histoire militaire médiévale", "Taxonomie des espèces"],
    caregiverAdvice: "Ne modifiez jamais un programme convenu sans un préavis clair. Utilisez des mots précis : évitez les expressions vagues comme 'on verra plus tard' ou 'fais comme tu le sens'.",
    isArchetype: true,
  },
  {
    id: "archetype-proprioceptif",
    name: "Le Sensoriel Proprioceptif",
    neurotype: "autistic_diagnosed",
    neurotypeLabel: "Recherche Sensorielle & Basse Intéroception Somatique",
    avatarIcon: "Sliders",
    tagline: "Recherche active de stimuli kinesthésiques, difficulté à percevoir ses signaux corporels internes.",
    description: "Un profil chez qui l'intéroception (faim, soif, température corporelle, vessie) n'émet pas de signaux nets. A besoin de stimming moteur soutenu (balancements, pressions profondes, textures riches) pour se situer dans l'espace et réguler son anxiété somatique.",
    quote: "Je peux travailler 8h sans me rendre compte que je meurs de soif et que j'ai froid. J'ai besoin d'une couverture de 9 kg sur les jambes pour sentir la frontière de mon corps.",
    axesScores: {
      sensorialite: 66,
      monotropisme: 74,
      communication: 58,
      masquage: 80,
    },
    communicationPreferences: [
      "Tolérance aux silences sans interprétation négative",
      "Pas d'obligation de contact visuel soutenu",
      "Clarté 100% littérale (sans sous-entendus)",
    ],
    sensoryTriggers: [
      "Températures extrêmes ou sensations d'humidité",
      "Vêtements synthétiques, étiquettes & coutures rêches",
      "Brouhaha de foule & supermarchés",
      "Consignes orales multiples enchaînées sans trace écrite",
    ],
    soothingTools: [
      "Couverture ou coussin lesté (pression proprioceptive)",
      "Objets de stimming & fidgets texturés discrets",
      "Playlist musicale ou bruit brun en boucle (Brown noise)",
      "Alimentation réconfortante prévisible (Safe Food)",
    ],
    earlyWarningSigns: [
      "Maladresse motrice accrue (trébuchements, objets échappés)",
      "Maux de tête ou nausées de surchauffe sensorielle",
      "Irritabilité soudaine face à un micro-bruit anodin",
    ],
    specialInterests: ["Minéralogie & Pierres semi-précieuses", "Sculpture sur bois", "Aquariophilie", "Anatomie & Biomécanique"],
    caregiverAdvice: "Rappelez-lui gentiment de boire de l'eau et de manger à heures fixes sans le faire de façon infantilisante. Ne le forcez jamais à rester assis immobile sans bouger les mains ou les pieds.",
    isArchetype: true,
  },
  {
    id: "archetype-allistique",
    name: "Le Témoin Allistique (Neurotypique)",
    neurotype: "allistic_typical",
    neurotypeLabel: "Profil de Référence / Étalonnage Comparatif (Non-Autiste)",
    avatarIcon: "Activity",
    tagline: "Filtrage sensoriel automatique, flexibilité spontanée et décodage intuitif des non-dits sociaux.",
    description: "Profil typique servant de point de comparaison pédagogique. Le cerveau allistique filtre les bruits de fond sans effort conscient (thalamus actif). La communication intègre spontanément l'implicite, l'humour à tiroirs et les micro-expressions sans coût d'énergie métabolique notable.",
    quote: "Pour moi, un dîner de famille de 20 personnes est un moment de détente où je me recharge. Je ne réalise pas que pour une personne autiste, c'est l'équivalent d'un marathon cognitif sous sirènes de chantier.",
    axesScores: {
      sensorialite: 22,
      monotropisme: 28,
      communication: 18,
      masquage: 24,
    },
    communicationPreferences: [
      "Aisance avec les appels vocaux spontanés",
      "Sensibilité naturelle aux sous-entendus et au langage corporel",
      "Appréciation du 'small talk' comme lubrifiant social",
    ],
    sensoryTriggers: [
      "Niveau de tolérance élevé aux bruits de fond du quotidien",
      "Capacité à converser facilement dans un restaurant animé",
    ],
    soothingTools: [
      "Discussions informelles avec des amis",
      "Sorties en groupe & activités récréatives collectives",
    ],
    earlyWarningSigns: [
      "Fatigue mentale classique de fin de semaine réparable par une simple nuit de sommeil",
    ],
    specialInterests: ["Relations sociales", "Culture générale", "Voyages variés"],
    caregiverAdvice: "Ce profil sert de référence pour mesurer le gouffre d'énergie : ce qui est gratuit pour un système allistique coûte 80% de la batterie mentale d'un adulte autiste.",
    isArchetype: true,
  },
];
