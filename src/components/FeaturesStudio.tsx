import React, { useState } from 'react';
import { 
  Clapperboard, 
  Layers, 
  Smartphone, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Share2, 
  Eye, 
  Send, 
  Flame, 
  Lightbulb, 
  Check, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { SAMPLE_CAROUSEL_SLIDES } from '../data/mockData';

interface FeaturesStudioProps {
  onOpenOnboarding: () => void;
}

const BATCH_IDEAS = [
  {
    title: '« Arrêtez d\'éditer manuellement vos Reels en 2026 »',
    angle: 'Contre-intuitif',
    score: 96,
    format: 'Reel 9:16',
    hook: '« 90% des créateurs s\'épuisent à faire ce que l\'IA fait en 4 secondes. »',
  },
  {
    title: '« Mon premier clone m\'a rapporté 4 200 € en DMs »',
    angle: 'Histoire personnelle',
    score: 93,
    format: 'Carrousel 3 Diapos',
    hook: '« Je ne répondais jamais à mes messages. Voici ce qui a changé. »',
  },
  {
    title: '« La méthode 8 axes pour ne jamais perdre son style »',
    angle: 'Tutoriel rapide',
    score: 89,
    format: 'Discussion Threads',
    hook: '« Comment garder 100% de votre tonalité sans écrire un mot. »',
  },
  {
    title: '« L\'erreur fatale qui fait bannir vos automatisations »',
    angle: 'Erreur fréquente',
    score: 95,
    format: 'Shorts 9:16',
    hook: '« Si vous n\'utilisez pas la fenêtre officielle des 24h, vous risquez tout. »',
  },
];

export const FeaturesStudio: React.FC<FeaturesStudioProps> = ({ onOpenOnboarding }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [safeZonePlatform, setSafeZonePlatform] = useState<'INSTAGRAM' | 'TIKTOK' | 'SHORTS'>('INSTAGRAM');
  const [selectedIdea, setSelectedIdea] = useState(BATCH_IDEAS[0]);

  return (
    <section className="py-24 bg-neutral-900/40 border-t border-neutral-800 relative" id="studio-ia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Section 3 • Studio IA de Création Unifié & Multi-Formats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Du Script au Rendu Incarné en Moins de 60 Secondes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Reels, TikTok, YouTube Shorts, Carrousels 3 diapositives et discussions Threads : pilotez tous vos formats verticaux avec synchronisation labiale et safe zones natives.
          </p>
        </div>

        {/* 2 Main Columns: Interactive Carousels & Video Studio Safe Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left: 3-Slide Carousel Generator */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">
                    Moteur de Carrousels 3 Images IA
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                  Structure Haute Rétention
                </span>
              </div>

              {/* Step Tabs (Hook -> Valeur -> Action) */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {SAMPLE_CAROUSEL_SLIDES.map((slide, index) => (
                  <button
                    key={slide.step}
                    onClick={() => setActiveSlideIndex(index)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                      activeSlideIndex === index
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                    id={`carousel-slide-tab-${index}`}
                  >
                    {slide.step === 'HOOK' && '1. Hook (Accroche)'}
                    {slide.step === 'VALEUR' && '2. Cœur (Valeur)'}
                    {slide.step === 'ACTION' && '3. Fin (Action)'}
                  </button>
                ))}
              </div>

              {/* Active Slide Card Display */}
              <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                  <span className="font-semibold text-white">
                    {SAMPLE_CAROUSEL_SLIDES[activeSlideIndex].title}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">Format 4:5 / 1:1</span>
                </div>

                <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-sm text-neutral-100 font-medium whitespace-pre-line leading-relaxed">
                  {SAMPLE_CAROUSEL_SLIDES[activeSlideIndex].content}
                </div>

                <div className="text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-lg border border-neutral-800/80">
                  <span className="text-amber-400 font-bold block mb-1">Rendu Visuel :</span>
                  {SAMPLE_CAROUSEL_SLIDES[activeSlideIndex].visualNote}
                </div>

                {SAMPLE_CAROUSEL_SLIDES[activeSlideIndex].ctaText && (
                  <div className="text-center py-1 text-xs font-bold text-amber-300">
                    {SAMPLE_CAROUSEL_SLIDES[activeSlideIndex].ctaText}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-800 text-xs">
              <span className="text-neutral-400">Export en 1 clic vers le Planificateur</span>
              <button
                onClick={onOpenOnboarding}
                className="text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Générer un carrousel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: PhonePreview Safe Zones & Trend Remix */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">
                    Simulateur PhonePreview (Safe Zones)
                  </h3>
                </div>
                <div className="flex gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
                  {(['INSTAGRAM', 'TIKTOK', 'SHORTS'] as const).map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSafeZonePlatform(platform)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                        safeZonePlatform === platform
                          ? 'bg-amber-500 text-neutral-950'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                      id={`safe-zone-platform-${platform}`}
                    >
                      {platform === 'INSTAGRAM' ? 'Reels' : platform === 'TIKTOK' ? 'TikTok' : 'Shorts'}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-neutral-400 mb-6">
                Vérifiez que vos sous-titres dynamiques et vos accroches ne sont jamais masqués par les boutons de commentaires, les descriptions ou la barre d'onglets.
              </p>

              {/* Safe Zone Visual Showcase */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-6">
                <div className="space-y-3 flex-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-amber-400 font-bold block mb-0.5">
                      🎬 Trend Remix (Video-to-Video)
                    </span>
                    <span className="text-neutral-300 text-[11px]">
                      Collez un lien concurrent TikTok/Reel. L'IA réécrit l'angle dans votre style et régénère la vidéo incarnée.
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-amber-400 font-bold block mb-0.5">
                      🗣️ Synchronisation Labiale Exacte (Lip-Sync)
                    </span>
                    <span className="text-neutral-300 text-[11px]">
                      Micro-expressions faciales, clignements des yeux naturels et mouvements corporels coordonnés.
                    </span>
                  </div>
                </div>

                <div className="w-[120px] h-[210px] bg-black rounded-2xl border-2 border-amber-500/40 p-1.5 flex flex-col justify-between text-[7px] text-amber-300 font-mono shrink-0 shadow-lg">
                  <div className="bg-neutral-900/90 p-1 rounded text-center">
                    Zone Haute OK
                  </div>
                  <div className="bg-amber-500/20 border border-amber-400 p-1 rounded text-center text-[8px] text-white font-bold">
                    Sous-titres Protégés
                  </div>
                  <div className="bg-neutral-900/90 p-1 rounded text-center">
                    Zone Basse Masquée
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-800 text-xs">
              <span className="text-neutral-400">Format 9:16 natif (WebM / MP4 H.265)</span>
              <button
                onClick={onOpenOnboarding}
                className="text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Accéder au studio vidéo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Batch Ideation Interactive Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Idéation en Lot (Batch Ideation) & Scoring Prédictif
                </h3>
                <p className="text-xs text-neutral-400">
                  Suggestions automatisées de 5 à 10 concepts viraux classés par angle d'approche.
                </p>
              </div>
            </div>
            <span className="text-xs text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
              Prédit selon votre niche & historique
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BATCH_IDEAS.map((idea) => {
              const isSelected = selectedIdea.title === idea.title;
              return (
                <div
                  key={idea.title}
                  onClick={() => setSelectedIdea(idea)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-md'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {idea.angle}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {idea.score}%
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-2 leading-snug">
                      {idea.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 italic mb-3">
                      {idea.hook}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-2 border-t border-neutral-800">
                    <span>{idea.format}</span>
                    <span className="text-amber-400 font-semibold">Générer en 1 clic →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
