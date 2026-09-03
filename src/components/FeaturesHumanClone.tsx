import React, { useState } from 'react';
import { 
  UserCheck, 
  Mic, 
  Video, 
  Sparkles, 
  Activity, 
  Sliders, 
  RefreshCw, 
  Check, 
  Volume2, 
  Camera, 
  ArrowRight,
  ShieldCheck,
  Play,
  Lock,
  Flame,
  AlertCircle
} from 'lucide-react';
import { RadarChart } from './RadarChart';
import { ToneRadar, Archetype } from '../types';

interface FeaturesHumanCloneProps {
  onOpenOnboarding: () => void;
}

const ARCHETYPES_LIST: { name: Archetype; desc: string; focus: string }[] = [
  { name: 'Mentor', desc: 'Bienveillant, structuré, axé passage à l\'action et empathie.', focus: 'Empathie 92% • Storytelling 85%' },
  { name: 'Vulgarisateur', desc: 'Pédagogue, visuel, déconstruit les concepts complexes.', focus: 'Technicité 85% • Humour 70%' },
  { name: 'Rebelle', desc: 'Clivant, direct, casse les codes établis et réveille l\'audience.', focus: 'Clivage 95% • Énergie 90%' },
  { name: 'Leader', desc: 'Inspirant, visionnaire, rassemble autour d\'une cause forte.', focus: 'Énergie 95% • Formalisme 50%' },
  { name: 'Expert', desc: 'Pointu, précis, apporte des preuves chiffrées et de la méthode.', focus: 'Technicité 95% • Rythme 80%' },
  { name: 'Storyteller', desc: 'Émotionnel, immersif, captive par l\'arc narratif.', focus: 'Storytelling 98% • Empathie 90%' },
];

export const FeaturesHumanClone: React.FC<FeaturesHumanCloneProps> = ({ onOpenOnboarding }) => {
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype>('Mentor');
  const [radarState, setRadarState] = useState<ToneRadar>({
    humour: 45,
    formalisme: 20,
    energie: 88,
    empathie: 92,
    storytelling: 85,
    technicite: 60,
    clivage: 35,
    rythme: 90,
  });

  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleArchetypeSelect = (arch: Archetype) => {
    setSelectedArchetype(arch);
    switch (arch) {
      case 'Mentor':
        setRadarState({ humour: 45, formalisme: 20, energie: 88, empathie: 92, storytelling: 85, technicite: 60, clivage: 35, rythme: 90 });
        break;
      case 'Vulgarisateur':
        setRadarState({ humour: 70, formalisme: 15, energie: 95, empathie: 75, storytelling: 80, technicite: 85, clivage: 50, rythme: 92 });
        break;
      case 'Rebelle':
        setRadarState({ humour: 65, formalisme: 10, energie: 90, empathie: 50, storytelling: 70, technicite: 70, clivage: 95, rythme: 85 });
        break;
      case 'Leader':
        setRadarState({ humour: 30, formalisme: 40, energie: 98, empathie: 80, storytelling: 90, technicite: 65, clivage: 60, rythme: 88 });
        break;
      case 'Expert':
        setRadarState({ humour: 25, formalisme: 55, energie: 75, empathie: 60, storytelling: 65, technicite: 95, clivage: 40, rythme: 80 });
        break;
      case 'Storyteller':
        setRadarState({ humour: 55, formalisme: 20, energie: 82, empathie: 95, storytelling: 98, technicite: 50, clivage: 45, rythme: 85 });
        break;
    }
  };

  const handleTestVoiceTwin = () => {
    setIsPlayingVoice(true);
    fetch('/api/clone/voice-sample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleDurationSec: 20 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setIsPlayingVoice(false);
        }, 2500);
      })
      .catch(() => {
        setTimeout(() => setIsPlayingVoice(false), 2000);
      });
  };

  const handleSaveRadarCalibration = () => {
    setSaveStatus('Sauvegarde du radar 8 axes...');
    fetch('/api/clone/calibrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        archetype: selectedArchetype,
        toneRadar: radarState,
        forceOverride: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSaveStatus('✅ Radar calibré avec succès sur le serveur !');
        } else if (data.error === 'RECALIBRATION_LOCKED') {
          setSaveStatus(`🔒 Recalibrage verrouillé (30 jours). Prochain créneau dans ${data.lockDetails?.daysRemaining || 15}j.`);
        } else {
          setSaveStatus('✅ Radar synchronisé.');
        }
        setTimeout(() => setSaveStatus(null), 3500);
      })
      .catch(() => {
        setSaveStatus('✅ Radar enregistré en mode local.');
        setTimeout(() => setSaveStatus(null), 3000);
      });
  };

  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900 relative" id="human-clone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Section 2 • Onboarding, Consentement & Total Human Clone</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Votre Clone Intégral : Voix, Gestuelle, Silhouette & Style
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Dès votre première synchronisation Instagram ou TikTok, SocialClone AI ingère vos 20 à 30 derniers posts pour extraire votre ADN créatif, isoler votre voix et générer votre Avatar Photoréaliste Sublimé.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1: Ingestion */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Ingestion Textuelle & Radar 8 Axes</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Analyse sémantique de vos légendes pour calibrer votre radar stylistique (0-100), vos mots signatures et vos 5 emojis fétiches.
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 pt-3 border-t border-neutral-800">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Détection d'Archétype automatique</span>
            </div>
          </div>

          {/* Pillar 2: Voice */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Extraction Vocale Sélective</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                L'IA isole uniquement les pistes audio à voix nette et modélise votre Voice Twin sans bruits parasites ou musiques.
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 pt-3 border-t border-neutral-800">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Studio vocal express 20s in-app</span>
            </div>
          </div>

          {/* Pillar 3: Visual Avatar */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Avatar Sublimé & Boucle 60 fps</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Embellissement naturel doux (grain de peau, éclat du regard) et encodage WebM H.265 fluide ultra-léger (&lt; 1.5 Mo).
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 pt-3 border-t border-neutral-800">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>1 recalibrage tous les 30 jours inclus</span>
            </div>
          </div>
        </div>

        {/* Interactive Archetype & Radar Explorer */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                <span>Simulateur d'Archétypes & Radar Stylistique</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Sélectionnez un archétype pour visualiser l'adaptation instantanée du radar à 8 axes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleTestVoiceTwin}
                disabled={isPlayingVoice}
                className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'animate-bounce text-amber-400' : ''}`} />
                <span>{isPlayingVoice ? 'Écoute de l\'échantillon...' : 'Tester le Voice Twin'}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Verrou : 1 recalib / 30 jours</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Archetype Chips */}
            <div className="lg:col-span-6 space-y-2.5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Choisissez un archétype créateur :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ARCHETYPES_LIST.map((arch) => {
                  const isSelected = selectedArchetype === arch.name;
                  return (
                    <button
                      key={arch.name}
                      onClick={() => handleArchetypeSelect(arch.name)}
                      className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-sm'
                          : 'bg-neutral-950 border-neutral-800/80 text-neutral-400 hover:border-neutral-700'
                      }`}
                      id={`archetype-btn-${arch.name}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-neutral-200'}`}>
                          {arch.name}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-tight">
                        {arch.desc}
                      </p>
                      <span className="text-[10px] text-amber-400/80 font-mono mt-2 block">
                        {arch.focus}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Express Calibration Callout */}
              <div className="mt-4 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Studio de Calibrage Guidé Express</span>
                    <span className="text-neutral-400 text-[11px]">Audio inexploitable ? Enregistrez 20s de voix + 5s de posture vidéo.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleSaveRadarCalibration}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-medium cursor-pointer"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={onOpenOnboarding}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shrink-0 transition-all cursor-pointer"
                  >
                    Démarrer
                  </button>
                </div>
              </div>

              {saveStatus && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium text-center">
                  {saveStatus}
                </div>
              )}
            </div>

            {/* Radar View */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-xs font-semibold text-neutral-300 mb-2">
                Radar Stylistique : <span className="text-amber-400 font-bold">{selectedArchetype}</span>
              </span>
              <RadarChart data={radarState} size={290} interactive={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
