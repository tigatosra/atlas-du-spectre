export interface AnalogyItem {
  id: string;
  title: string;
  analogyConcept: string;
  simpleExplanation: string;
  whatItLooksLike: string;
  whatHelpsMost: string;
}

export interface CrisisGuideItem {
  id: string;
  phenomenon: string;
  whatItIsActually: string;
  commonMistake: string;
  threeRulesImmediate: string[];
  safePhraseToSay: string;
}

export interface FAQItem {
  question: string;
  simpleAnswer: string;
  actionableTip: string;
}

export const caregiverAnalogies: AnalogyItem[] = [
  {
    id: "os",
    title: "1. L'Analogie du Système d'Exploitation (Linux vs Windows)",
    analogyConcept: "Un ordinateur n'est pas 'cassé' parce qu'il tourne sous Linux plutôt que Windows.",
    simpleExplanation: "Le cerveau de votre proche exécute le même monde avec un système d'exploitation différent. Les raccourcis clavier ne sont pas les mêmes, l'interface utilisateur est différente, mais le processeur est parfaitement fonctionnel.",
    whatItLooksLike: "Forcer une personne autiste à adopter tous les codes neurotypiques revient à forcer un programme Linux à tourner sur Windows sans émulateur : cela provoque des surchauffes (burnout).",
    whatHelpsMost: "Ne cherchez pas à installer 'Windows' sur votre proche. Apprenez plutôt les commandes de son système pour dialoguer harmonieusement.",
  },
  {
    id: "mic",
    title: "2. L'Analogie du Microphone sans Réduction de Bruit",
    analogyConcept: "Votre cerveau a un logiciel de réduction de bruit intégré ; le sien enregistre en 'RAW' brut.",
    simpleExplanation: "Un cerveau neurotypique atténue automatiquement le bruit du frigo, la conversation de la table d'à côté et la lumière des néons. Le cerveau autiste reçoit chaque son et chaque reflet au volume maximal simultanément.",
    whatItLooksLike: "Quand votre proche se plaint que la sonnette du micro-ondes ou le cliquetis d'une fourchette lui fait mal, ce n'est pas une exagération : c'est une saturation sensorielle physique.",
    whatHelpsMost: "Ne remettez jamais en question ce qu'il entend ou voit. Acceptez qu'il porte un casque ou qu'il s'isole au calme sans le prendre pour un rejet.",
  },
  {
    id: "battery",
    title: "3. La Batterie à Cuillères (Théorie des Cuillères)",
    analogyConcept: "Une réserve d'énergie quotidienne limitée pour chaque acte social et sensoriel.",
    simpleExplanation: "Pour une personne non-autiste, dire bonjour à 10 personnes et aller faire les courses coûte 5% d'énergie. Pour une personne autiste qui doit décoder chaque visage et supporter les lumières, cela coûte 60%.",
    whatItLooksLike: "Il ou elle peut être souriant(e) et dynamique lors d'un déjeuner, puis incapable de prononcer un mot le soir en rentrant. La batterie est tombée à 0%.",
    whatHelpsMost: "Respectez le besoin de silence au retour à la maison. Un silence de 45 minutes permet à la batterie de se recharger sans conflit.",
  },
  {
    id: "direct",
    title: "4. L'Analogie du Langage Littéral (Zéro Sous-Texte)",
    analogyConcept: "Les mots sont pris pour ce qu'ils désignent, au premier degré exact.",
    simpleExplanation: "La communication autiste est purement informative. Il n'y a pas de deuxième niveau caché, de reproche déguisé ou de passif-agressif dissimulé derrière une remarque.",
    whatItLooksLike: "Si vous demandez 'Tu as faim ?' en espérant qu'il vous propose de cuisiner, il répondra simplement 'Non' parce qu'il a répondu sincèrement à la question posée.",
    whatHelpsMost: "Formulez vos souhaits de manière explicite : 'J'ai faim, est-ce que tu peux m'aider à préparer le dîner s'il te plaît ?'. Vous gagnerez un temps précieux et éviterez toute frustration.",
  },
];

export const crisisGuideData: CrisisGuideItem[] = [
  {
    id: "meltdown",
    phenomenon: "Le Meltdown (Surcharge Explosive)",
    whatItIsActually: "Ce n'est PAS un caprice, ni une colère manipulatrice. C'est un réflexe involontaire du système nerveux en état de terreur physiologique due à un trop-plein sensoriel ou émotionnel.",
    commonMistake: "Tenter de raisonner la personne, crier plus fort, la toucher de force ou faire une leçon de morale pendant la crise.",
    threeRulesImmediate: [
      "1. Sécurité : Éloignez les objets dangereux et les regards d'inconnus.",
      "2. Éteignez les stimuli : Coupez immédiatement la lumière, la musique, écartez les badauds.",
      "3. Zéro question : Ne posez aucune question ouverte. Restez silencieux et assis à distance bienveillante.",
    ],
    safePhraseToSay: "(Ne parlez pas. Si nécessaire, dites à voix basse) : 'Tu es en sécurité. Je veille sur toi, prends tout ton temps.'",
  },
  {
    id: "shutdown",
    phenomenon: "Le Shutdown (Surcharge Implosive / Mutisme)",
    whatItIsActually: "Le système nerveux coupe l'alimentation des canaux de communication pour protéger le cerveau. La personne devient immobile, incapable de parler ou de soutenir le regard.",
    commonMistake: "Prendre ce silence pour de la 'bouderie', insister pour qu'elle réponde ('Mais réponds-moi enfin !') ou secouer l'épaule.",
    threeRulesImmediate: [
      "1. Pas de reproche : Le mutisme n'est pas un choix délibéré, c'est une déconnexion de secours.",
      "2. Passez par l'écrit : Envoyez un SMS doux ('Je te laisse au calme, dis-moi par texto si tu as soif').",
      "3. Offrez un sas d'ombre : Proposez une couverture ou fermez les rideaux sans faire de bruit.",
    ],
    safePhraseToSay: "Par SMS ou mot écrit : 'Pas besoin de me répondre. Repose-toi, je suis là si besoin.'",
  },
];

export const caregiverFAQ: FAQItem[] = [
  {
    question: "Est-ce qu'il/elle m'aime vraiment même s'il/elle ne me regarde pas dans les yeux ?",
    simpleAnswer: "Oui, profondément. Pour un cerveau autiste, soutenir le regard demande un effort de traitement cognitif intense qui empêche d'écouter les mots. Regarder ailleurs permet de vous entendre avec tout son cœur.",
    actionableTip: "Ne forcez jamais le contact visuel. Parlez côte à côte (en marchant ou en voiture) : la conversation sera dix fois plus intime et fluide.",
  },
  {
    question: "Pourquoi peut-il/elle passer 10h sur son ordinateur et être incapable de vider le lave-vaisselle ?",
    simpleAnswer: "C'est l'Inertie Exécutive et le Monotropisme. L'ordinateur engage un hyperfocus profond. Le lave-vaisselle nécessite de sortir de ce tunnel, de coordonner 10 micro-actions différentes et de supporter le bruit des assiettes qui s'entrechoquent.",
    actionableTip: "Aidez-le à franchir l'amorce sans jugement : 'Viens, je commence à ranger les verres avec toi' ou convenez d'une tâche moins bruyante.",
  },
  {
    question: "Comment réagir quand il/elle s'isole dans sa chambre pendant des jours ?",
    simpleAnswer: "C'est sa dialyse sensorielle. Après avoir masqué au travail ou en famille, l'isolement est le seul moyen de dégonfler l'inflammation du système nerveux et d'éviter un burnout de plusieurs mois.",
    actionableTip: "Laissez-lui cet espace sans culpabilisation : glissez un plateau repas ou un mot réconfortant sans exiger de conversation en retour.",
  },
  {
    question: "Pourquoi les imprévus déclenchent-ils autant d'angoisse ?",
    simpleAnswer: "Une personne autiste prépare mentalement chaque étape de sa journée pour compenser le manque de scripts automatiques. Changer le plan à la dernière minute détruit toute sa carte mentale et génère une panique de perte de repères.",
    actionableTip: "Prévenez le plus tôt possible, même d'un détail minime : 'Attention, au restaurant ce soir, le menu a changé par rapport à d'habitude'.",
  },
];
