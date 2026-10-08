"use client";

import React, { useState } from "react";
import { usePerspective } from "../context/PerspectiveContext";
import {
  FileText,
  Copy,
  Check,
  Download,
  Heart,
  Compass,
  Shield,
  BookOpen,
  Users,
  ExternalLink,
  Mail,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface ResourcesViewProps {
  onOpenDiagnosticModal: () => void;
}

export default function ResourcesView({ onOpenDiagnosticModal }: ResourcesViewProps) {
  const { isRelativePerspective } = usePerspective();
  const [copiedKey, setCopiedKey] = useState<string>("");

  // Communication Emergency Passport custom states
  const [userName, setUserName] = useState("Alex Morgan");
  const [emergencyContact, setEmergencyContact] = useState("Sarah (Conjointe) : 06 12 34 56 78");
  const [criticalNeeds, setCriticalNeeds] = useState([
    "Ne me touchez pas sans prévenir",
    "Ne me posez pas de questions ouvertes",
    "Parlez à voix basse ou communiquez par écrit sur mon téléphone",
    "Guide-moi vers un endroit sombre et silencieux",
  ]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 3000);
  };

  const letterTemplates = [
    {
      id: "partner",
      title: "Lettre à mon/ma Partenaire ou Conjoint(e)",
      targetAudience: "Vie de couple & Intimité",
      preview: "Chéri(e), j'ai besoin de te partager une facette essentielle de mon fonctionnement...",
      content: `Chéri(e),

Je t'écris ces quelques lignes parce qu'il m'est parfois difficile de trouver les bons mots à l'oral. Je suis en train d'explorer mon profil sur le spectre de l'autisme, et cela m'aide à comprendre des réactions que nous avons tous les deux pu trouver déroutantes.

Quand je rentre du travail sans parler, ou que je me retire dans le noir après une réunion de famille, ce n'est pas un rejet de ton amour ou de notre relation. C'est simplement que mon cerveau a absorbé trop de bruits et de stimuli, et qu'il a besoin de silence pour éviter de disjoncter.

Ce qui m'aide le plus au quotidien :
- Des consignes claires et directes (sans sous-entendus que je risque de manquer).
- Un temps de décompression silencieux de 30 minutes quand je rentre.
- Savoir que tu es mon allié(e) sécurisant(e) sans pression pour "faire semblant d'aller bien".

Merci d'être à mes côtés dans cette découverte. Ton soutien bienveillant est mon plus grand refuge.`,
    },
    {
      id: "parents",
      title: "Lettre à mes Parents / Ma Famille",
      targetAudience: "Cercle familial",
      preview: "Chers parents, je souhaite vous parler de mes démarches récentes...",
      content: `Chers parents,

Je souhaite partager avec vous une démarche importante de ma vie d'adulte. J'explore actuellement mon fonctionnement neurologique sur le spectre de l'autisme. 

Je sais que ce mot peut faire peur ou évoquer des clichés de l'enfance, mais pour moi, c'est un soulagement immense. Cela explique pourquoi, depuis tout(e) petit(e), certains bruits me faisaient mal, pourquoi les fêtes me vidaient d'énergie et pourquoi je me sentais souvent en décalage.

Vous n'avez rien fait de "mal" dans mon éducation : c'est simplement la façon dont mon système nerveux est né. Comprendre cela aujourd'hui me permet de mieux vivre en paix avec moi-même.

Je serai ravi(e) de répondre à vos questions posément quand vous le souhaiterez, sans dramatiser, avec des ressources faites pour les adultes.`,
    },
    {
      id: "employer",
      title: "Demande d'Aménagements Raisonnables à l'Employeur",
      targetAudience: "Milieu Professionnel / RH",
      preview: "Madame, Monsieur, dans le cadre de l'optimisation de mes conditions de travail...",
      content: `Madame, Monsieur,

Dans le cadre de l'optimisation de mes conditions de travail et afin de maintenir une efficacité optimale, je souhaite solliciter quelques aménagements organisationnels légers, adaptés à mon profil neurodivergent (hypersensibilité sensorielle et attentionnelle) :

1. Aménagement acoustique : Autorisation du port d'un casque à réduction de bruit active pendant les plages de concentration en open-space.
2. Clarté des consignes : Privilégier les validations de tâches et directives par écrit (email ou messagerie instantanée) plutôt que de manière orale informelle impromptue.
3. Télétravail régulier : Maintien de 2 à 3 jours de travail à domicile par semaine pour réduire la fatigue liée aux transports et à la charge environnementale.

Ces ajustements simples me permettront de mobiliser pleinement mon potentiel sans subir d'épuisement évitable.

Je reste à votre entière disposition pour échanger lors d'un entretien.`,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER BANNER */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Boîte à Outils Pratiques & Démarches</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ressources, Outils & Passeport de Crise
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isRelativePerspective
                ? "Guides pratiques, modèles de communication et ressources fiables pour accompagner votre proche sans infantiliser ni aggraver les situations de crise."
                : "Des outils concrets immédiatement mobilisables : carte d'urgence sensorielle en cas de mutisme/shutdown, modèles de lettres prêtes à envoyer et repères bibliographiques."}
            </p>
          </div>

          <button
            onClick={onOpenDiagnosticModal}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all shrink-0 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-purple-200" />
            <span>Guide des Parcours Diagnostiques</span>
          </button>
        </div>
      </div>

      {/* 1. INTERACTIVE PASSPORT CARD GENERATOR */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                <Shield className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Passeport d'Urgence Sensorielle (Carte de Shutdown)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              À garder dans votre portefeuille ou sur l'écran verrouillé de votre smartphone en cas de surcharge soudaine ou de mutisme.
            </p>
          </div>

          <button
            onClick={() => {
              const text = `PASSEPORT DE SÉCURITÉ SENSORIELLE\nNom: ${userName}\nContact d'urgence: ${emergencyContact}\nBesoins essentiels en cas de surcharge:\n${criticalNeeds.map((n) => `- ${n}`).join("\n")}`;
              copyToClipboard(text, "passport");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors self-start md:self-auto"
          >
            {copiedKey === "passport" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copié dans le presse-papier !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copier la Carte</span>
              </>
            )}
          </button>
        </div>

        {/* PASSPORT PREVIEW CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950/80 p-5 rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.15)] relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                  Carte d'Information Sensorielle
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Atlas du Spectre ID
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Titulaire :</span>
                <div className="text-sm font-bold text-white">{userName}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 leading-snug">
                ⚠️ <strong>Je suis actuellement en surcharge sensorielle / shutdown.</strong> Je ne suis pas agressif(ve) et je ne fais pas de malaise médical classique : mon système nerveux est saturé de bruit ou de lumière.
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Ce dont j'ai absolument besoin maintenant :
                </span>
                <ul className="space-y-1">
                  {criticalNeeds.map((need, i) => (
                    <li key={i} className="text-xs text-slate-200 flex items-start gap-1.5">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                <span className="text-slate-400 font-mono">Contact de confiance :</span>{" "}
                <span className="font-semibold text-emerald-400">{emergencyContact}</span>
              </div>
            </div>
          </div>

          {/* EDIT FORM FOR PASSPORT */}
          <div className="lg:col-span-5 bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-mono uppercase text-slate-300 font-bold">
              Personnaliser ma carte :
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Votre Nom :</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Personne à appeler :</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Cette carte évite les interventions médicales inappropriées ou les questions insistantes lors d'un épisode de mutisme temporaire.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MODÈLES DE LETTRES NEURO-AFFIRMATIVES */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/90 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Modèles de Lettres & Explications Prêtes à l'Emploi
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Mettre des mots clairs sur ses besoins sans culpabilité. Copiez et adaptez ces modèles selon vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {letterTemplates.map((template) => (
            <div
              key={template.id}
              className="glass-panel-subtle rounded-xl p-4 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  {template.targetAudience}
                </span>
                <h3 className="text-sm font-bold text-white mb-2">
                  {template.title}
                </h3>
                <p className="text-xs text-slate-400 italic line-clamp-3 mb-4">
                  « {template.preview} »
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => copyToClipboard(template.content, template.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                >
                  {copiedKey === template.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copiée !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copier la lettre complète</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. GUIDE DES 10 RÈGLES D'OR POUR LES PROCHES & FAMILLES */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/30 space-y-4 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/20">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Guide pour l'Entourage : Les 5 Principes d'un Allié Bienveillant
          </h2>
        </div>
        <p className="text-xs text-slate-300">
          Ce que les adultes autistes souhaiteraient que chaque proche sache :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 space-y-1">
            <span className="font-bold text-emerald-400 block">1. Validez la sensorialité</span>
            Si votre proche dit que la lumière ou le bruit lui fait mal, ne débattez pas. Pour son système nerveux, c'est une réalité physique immédiate.
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 space-y-1">
            <span className="font-bold text-emerald-400 block">2. Parlez sans sous-entendus</span>
            Les formulations directes et explicites sont apaisantes. Évitez les insinuations et exprimez clairement vos demandes.
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 space-y-1">
            <span className="font-bold text-emerald-400 block">3. Respectez le sas de décompression</span>
            Après une journée de travail ou une fête, offrez 30 à 60 minutes de silence complet avant d'aborder des questions logistiques.
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 space-y-1">
            <span className="font-bold text-emerald-400 block">4. Autorisez le stimming et le repli</span>
            Se balancer, tripoter un objet ou quitter une table festive pour s'isoler 15 minutes n'est pas un manque d'éducation, c'est un acte de régulation.
          </div>
        </div>
      </div>

      {/* 4. BIBLIOTHÈQUE & OUVRAGES ESSENTIELS */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800/80">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white">
            Lectures Recommandées par la Communauté
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="font-bold text-white mb-0.5">La Différence invisible</div>
            <div className="text-[11px] text-cyan-400 mb-1">Julie Dachez & Mademoiselle Caroline</div>
            <p className="text-slate-400 text-[11px] leading-snug">
              Bande dessinée incontournable sur le diagnostic adulte tardif, le masquage et la libération.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="font-bold text-white mb-0.5">Aspergirls</div>
            <div className="text-[11px] text-purple-400 mb-1">Rudy Simone</div>
            <p className="text-slate-400 text-[11px] leading-snug">
              Ouvrage de référence sur le profil autistique chez les femmes adultes et les particularités sensorielles.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="font-bold text-white mb-0.5">Je suis à l'Est !</div>
            <div className="text-[11px] text-emerald-400 mb-1">Josef Schovanec</div>
            <p className="text-slate-400 text-[11px] leading-snug">
              Témoignage érudit et plein d'humour sur les codes sociaux vus de l'intérieur de l'esprit autiste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
