import React, { useState } from 'react';
import { 
  Sliders, 
  Video, 
  MessageSquareText, 
  CalendarCheck2, 
  CheckCircle2, 
  Mic2, 
  Smartphone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/mockData';
import { RadarChart } from './RadarChart';
import { ToneRadar } from '../types';

interface InteractiveSimulatorSandboxProps {
  onOpenOnboarding: () => void;
}

export const InteractiveSimulatorSandbox: React.FC<InteractiveSimulatorSandboxProps> = ({ onOpenOnboarding }) => {
  const [selectedCreatorKey, setSelectedCreatorKey] = useState<string>('alex');
  const [activeTab, setActiveTab] = useState<'RADAR' | 'STUDIO' | 'COPILOT' | 'SCHEDULER'>('RADAR');
  const [interactiveRadar, setInteractiveRadar] = useState<ToneRadar>(SAMPLE_PROFILES['alex'].toneRadar);

  const currentProfile = SAMPLE_PROFILES[selectedCreatorKey];

  const handleProfileSwitch = (key: string) => {
    setSelectedCreatorKey(key);
    setInteractiveRadar(SAMPLE_PROFILES[key].toneRadar);
  };

  const handleRadarChange = (key: keyof ToneRadar, value: number) => {
    setInteractiveRadar((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="py-12 bg-neutral-950 border-b border-neutral-900" id="simulateur-interactif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Console Interactive Live</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Espace de Travail de Production
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Basculez entre les profils de créateurs et manipulez directement le radar 8 axes, les safe zones vidéo et la console DM.
          </p>
        </div>

        {/* Interactive Showcase Sandbox Card */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Top Bar with Creator Switcher & Tabs */}
          <div className="p-4 sm:p-5 border-b border-neutral-800/80 bg-neutral-950/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Creator Profile Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase text-neutral-400 tracking-wider">
                Profil calibré :
              </span>
              <div className="flex items-center gap-2">
                {Object.keys(SAMPLE_PROFILES).map((key) => {
                  const prof = SAMPLE_PROFILES[key];
                  const isSelected = selectedCreatorKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleProfileSwitch(key)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                      id={`sandbox-profile-tab-${key}`}
                    >
                      <img
                        src={prof.avatarUrl}
                        alt={prof.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{prof.name}</span>
                      <span className="text-[10px] text-neutral-500">({prof.archetype})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feature Tabs */}
            <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('RADAR')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'RADAR'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                id="sandbox-tab-radar"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Radar Stylistique</span>
              </button>

              <button
                onClick={() => setActiveTab('STUDIO')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'STUDIO'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                id="sandbox-tab-studio"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Studio & Safe Zones</span>
              </button>

              <button
                onClick={() => setActiveTab('COPILOT')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'COPILOT'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                id="sandbox-tab-copilot"
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>Copilote DM (24h)</span>
              </button>

              <button
                onClick={() => setActiveTab('SCHEDULER')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'SCHEDULER'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                id="sandbox-tab-scheduler"
              >
                <CalendarCheck2 className="w-3.5 h-3.5" />
                <span>Smart Scheduler</span>
              </button>
            </div>
          </div>

          {/* Interactive Card Body */}
          <div className="p-6 sm:p-8">
            {activeTab === 'RADAR' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Interactive Radar */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-neutral-950/60 rounded-xl border border-neutral-800">
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-xs font-semibold text-neutral-300">
                      Empreinte Stylistique Calibrée
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      Archétype : {currentProfile.archetype}
                    </span>
                  </div>
                  <RadarChart
                    data={interactiveRadar}
                    size={280}
                    interactive={true}
                    onChange={handleRadarChange}
                  />
                </div>

                {/* Right: Extracted DNA and Voice Twin */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={currentProfile.avatarUrl}
                        alt={currentProfile.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {currentProfile.name}
                          <span className="text-xs text-neutral-400 font-normal">
                            {currentProfile.handle}
                          </span>
                        </h4>
                        <p className="text-xs text-neutral-400">
                          Avatar Photoréaliste Sublimé • Boucle 60 fps WebM
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-neutral-800">
                      <div>
                        <span className="text-neutral-500 block mb-1">Mots Signatures :</span>
                        <div className="flex flex-wrap gap-1">
                          {currentProfile.signatureWords.map((word) => (
                            <span
                              key={word}
                              className="px-1.5 py-0.5 rounded bg-neutral-900 text-amber-300 border border-neutral-800 font-medium text-[10px]"
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-neutral-500 block mb-1">Emojis Fétiches :</span>
                        <div className="flex gap-1.5 text-base">
                          {currentProfile.favouriteEmojis.map((emoji) => (
                            <span key={emoji}>{emoji}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sample Voice Twin Output Script */}
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Mic2 className="w-3.5 h-3.5" />
                        Aperçu Script Généré (Voice Twin)
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Rythme : {interactiveRadar.rythme}% • Énergie : {interactiveRadar.energie}%
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 italic leading-relaxed">
                      « {currentProfile.signatureWords[0]}, si tu passes encore 3h par jour à éditer tes vidéos, arrête tout. Voici le déclic : ton clone génère ta phrase de départ, déroule ton tutoriel et t'envoie les leads en DMs. {currentProfile.favouriteEmojis.slice(0, 2).join(' ')} »
                    </p>
                  </div>

                  {/* Recalibration rule reminder */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
                    <span>Recalibrage régulier :</span>
                    <span className="text-amber-400 font-medium">
                      1 recalibrage tous les 30 jours (Prochains dans {currentProfile.calibrationsRemainingDays} j)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'STUDIO' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 flex justify-center">
                  {/* Phone Mockup with Safe Zones */}
                  <div className="relative w-[240px] h-[440px] bg-black rounded-[36px] border-4 border-neutral-700 shadow-2xl overflow-hidden p-2">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-neutral-800 rounded-full z-30" />
                    
                    {/* Simulated Reel Screen */}
                    <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-neutral-900">
                      <img
                        src={currentProfile.avatarUrl}
                        alt="Preview"
                        className="w-full h-full object-cover opacity-80"
                      />
                      
                      {/* Safe Zone Overlay Bounds */}
                      <div className="absolute inset-0 border-2 border-dashed border-amber-400/40 pointer-events-none m-3 rounded-lg flex flex-col justify-between p-2 text-[8px] text-amber-300 font-mono">
                        <span className="bg-neutral-950/70 px-1 py-0.5 rounded w-fit">
                          Safe Zone Haut (Pas de masque)
                        </span>

                        {/* Animated Caption */}
                        <div className="bg-neutral-950/80 p-2 rounded-lg text-center backdrop-blur-xs border border-neutral-800">
                          <span className="text-[10px] font-bold text-amber-300 block">
                            Phrase d'accroche (Hook) :
                          </span>
                          <span className="text-[9px] text-white">
                            « Comment doubler vos conversions DMs en 48h ? »
                          </span>
                        </div>

                        <span className="bg-neutral-950/70 px-1 py-0.5 rounded w-fit">
                          Safe Zone Bas (Sous-titres sécurisés)
                        </span>
                      </div>

                      {/* Right action icons simulation */}
                      <div className="absolute right-2 bottom-16 flex flex-col gap-3 text-white text-[9px] items-center">
                        <div className="w-6 h-6 rounded-full bg-neutral-900/80 flex items-center justify-center">❤️</div>
                        <div className="w-6 h-6 rounded-full bg-neutral-900/80 flex items-center justify-center">💬</div>
                        <div className="w-6 h-6 rounded-full bg-neutral-900/80 flex items-center justify-center">↗️</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold">
                    <Video className="w-4 h-4" />
                    <span>Moteur Prompt-to-Video & Trend Remix</span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Production Vidéo 9:16 Incarnée & Carrousels 3 Images
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Le moteur génère vos vidéos au format vertical avec synchronisation labiale exacte, mouvements naturels et sous-titres dynamiques calés dans les safe zones des applications natives (TikTok, Reels, Shorts).
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-xs font-bold text-white block mb-1">
                        🎬 Trend Remix (Video-to-Video)
                      </span>
                      <p className="text-[11px] text-neutral-400">
                        Collez un lien public viral : l'IA extrait la structure et régénère la vidéo incarnée par votre avatar.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-xs font-bold text-white block mb-1">
                        📱 Simulateur PhonePreview
                      </span>
                      <p className="text-[11px] text-neutral-400">
                        Prévisualisez vos placements de sous-titres sous les calques natifs d'Instagram et TikTok.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenOnboarding}
                      className="px-5 py-2.5 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Accéder au Studio de Création</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'COPILOT' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-white">
                        Fenêtre 24h Meta Standard
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Actif • Conforme API Officielle
                    </span>
                  </div>

                  {/* 3 Modes selector */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-center font-medium">
                      100% Auto
                      <span className="block text-[9px] text-neutral-400 mt-0.5">Réponse directe</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 text-center font-medium">
                      Copilote (3 choix)
                      <span className="block text-[9px] text-neutral-400 mt-0.5">1-clic validation</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 text-center font-medium">
                      Hybride (Mots-clés)
                      <span className="block text-[9px] text-neutral-400 mt-0.5">"GUIDE", "PROMO"</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2">
                    <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                      <span>Détection d'intention :</span>
                      <span className="text-amber-400 font-semibold">Prospect Qualifié (Urgence Haute)</span>
                    </div>
                    <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs">
                      « Salut Alex ! J'ai vu ton Reel, tu as un lien pour utiliser SocialClone ? »
                    </div>
                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                      <span className="text-[10px] text-amber-400 font-bold block mb-0.5">
                        Réponse Générée (Voice Twin) :
                      </span>
                      « Salut ! Carrément, voici ton lien d'accès express : app.socialclone.ai 🔥 Tu veux publier quel format en premier ? »
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Convertissez vos abonnés sans risquer votre compte
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Connecté exclusivement aux API officielles (*Messenger API for Instagram* et *TikTok Direct Message API*). Respect strict de la fenêtre d'échange de 24 heures et verrouillage automatique avec alerte si la fenêtre expire.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Notes Vocales Oralisées</strong> : scripts formulés pour être dictés en 1 clic par le créateur.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Triage Intelligent</strong> : priorisation immédiate des prospects chauds et collaborations agence.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Zéro Scraping / Zéro Bannissement</strong> : 100% conforme aux conditions de service Meta.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'SCHEDULER' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-3">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Optimiseur d'Audience IA (Scoring Horaire)
                      </span>
                      <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">
                        Mardi 18h45 • Score 98/100
                      </span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 text-center text-[10px]">
                      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                        <div key={day} className="flex flex-col gap-1">
                          <span className="text-neutral-500">{day}</span>
                          <div
                            className={`h-12 rounded flex items-center justify-center font-bold ${
                              i === 1
                                ? 'bg-amber-500 text-neutral-950'
                                : i === 3 || i === 5
                                ? 'bg-amber-500/30 text-amber-300'
                                : 'bg-neutral-900 text-neutral-500'
                            }`}
                          >
                            {i === 1 ? '98%' : i === 3 ? '87%' : i === 5 ? '92%' : '45%'}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer">
                      ⚡ Auto-Placer au Meilleur Moment
                    </button>
                  </div>

                  {/* Fallback Mobile Box */}
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">
                        Fallback Mobile Intelligent (Niveau 2)
                      </span>
                      <span className="text-neutral-400 text-[11px]">
                        En cas d'aléa réseau, notification push + téléchargement + légende copiée dans le presse-papier.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Planification intelligente et résilience absolue
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Le Smart Scheduler analyse l'historique d'engagement de votre audience et les tendances de votre niche pour vous garantir la portée maximale à chaque publication.
                  </p>

                  <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-xs">
                    <div className="text-neutral-300 font-semibold">Système Résilient à 2 Niveaux :</div>
                    <div className="text-neutral-400">
                      <strong>Niveau 1</strong> : Envoi automatisé direct via l'API officielle programmée.
                    </div>
                    <div className="text-neutral-400">
                      <strong>Niveau 2</strong> : En cas d'échec API externe (400/500), déclenchement immédiat de la notification mobile Expo et ouverture de l'application native prête à publier.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
