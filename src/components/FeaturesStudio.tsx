import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  Play,
  Film,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SAMPLE_CAROUSEL_SLIDES } from '../data/mockData';
import { BatchIdea } from '../types';

interface FeaturesStudioProps {
  onOpenOnboarding: () => void;
}

const DEFAULT_BATCH_IDEAS: BatchIdea[] = [
  {
    id: 'idea-1',
    title: '« Arrêtez d\'éditer manuellement vos Reels en 2026 »',
    angle: 'Contre-intuitif',
    score: 96,
    format: 'Reel 9:16',
    hook: '« 90% des créateurs s\'épuisent à faire ce que l\'IA fait en 4 secondes. »',
    coreValue: 'Démonstration du workflow de synchronisation labiale sans tournage.',
    ctaAction: 'Commentez CLONE pour tester.',
  },
  {
    id: 'idea-2',
    title: '« Mon premier clone m\'a rapporté 4 200 € en DMs »',
    angle: 'Histoire personnelle',
    score: 93,
    format: 'Carrousel 3 Diapos',
    hook: '« Je ne répondais jamais à mes messages. Voici ce qui a changé. »',
    coreValue: 'Tunnel de conversion 24h avec mot-clé GUIDE et note vocale.',
    ctaAction: 'Enregistrez le post.',
  },
  {
    id: 'idea-3',
    title: '« La méthode 8 axes pour ne jamais perdre son style »',
    angle: 'Tutoriel rapide',
    score: 89,
    format: 'Discussion Threads',
    hook: '« Comment garder 100% de votre tonalité sans écrire un mot. »',
    coreValue: 'Réglage des curseurs clivage, empathie et rythme.',
    ctaAction: 'Partagez la discussion.',
  },
  {
    id: 'idea-4',
    title: '« L\'erreur fatale qui fait bannir vos automatisations »',
    angle: 'Erreur fréquente',
    score: 95,
    format: 'Shorts 9:16',
    hook: '« Si vous n\'utilisez pas la fenêtre officielle des 24h, vous risquez tout. »',
    coreValue: 'Protection de compte API officielle Meta/TikTok.',
    ctaAction: 'Lien en bio.',
  },
];

export const FeaturesStudio: React.FC<FeaturesStudioProps> = ({ onOpenOnboarding }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [safeZonePlatform, setSafeZonePlatform] = useState<'INSTAGRAM' | 'TIKTOK' | 'SHORTS'>('INSTAGRAM');
  const [batchIdeas, setBatchIdeas] = useState<BatchIdea[]>(DEFAULT_BATCH_IDEAS);
  const [selectedIdea, setSelectedIdea] = useState<BatchIdea>(DEFAULT_BATCH_IDEAS[0]);
  
  // Interactive Generation State
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [videoGenResult, setVideoGenResult] = useState<any | null>(null);
  const [remixUrl, setRemixUrl] = useState('');
  const [remixResult, setRemixResult] = useState<any | null>(null);
  const [isRemixing, setIsRemixing] = useState(false);

  useEffect(() => {
    fetch('/api/studio/batch-ideation')
      .then((res) => res.json())
      .then((data) => {
        if (data.ideas && data.ideas.length > 0) {
          setBatchIdeas(data.ideas);
          setSelectedIdea(data.ideas[0]);
        }
      })
      .catch(() => {});
  }, []);

  const handleSimulateVideoGeneration = () => {
    setIsVideoGenerating(true);
    fetch('/api/studio/generate-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: selectedIdea.title,
        duration: 30,
        format: '9:16',
        platform: safeZonePlatform,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setVideoGenResult(data);
        setIsVideoGenerating(false);
      })
      .catch(() => {
        setVideoGenResult({
          jobId: `vid_mock_${Date.now()}`,
          retentionScore: 94,
          lipSyncScore: 99.4,
          aspectRatio: '9:16',
          c2paManifest: { signed: true, issuer: 'SocialClone AI C2PA Authority' },
        });
        setIsVideoGenerating(false);
      });
  };

  const handleTrendRemix = () => {
    setIsRemixing(true);
    fetch('/api/studio/trend-remix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceUrl: remixUrl || 'https://tiktok.com/@competitor/video/7289123',
        topic: 'Automatisation & Clones IA',
        competitorHook: '« Comment j\'ai fait 100k vues sans caméra »',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRemixResult(data.remix);
        setIsRemixing(false);
      })
      .catch(() => {
        setRemixResult({
          hook: '« 90% des créateurs s\'épuisent au tournage. Voici mon secret 2026 : »',
          viralRetentionScore: 95,
        });
        setIsRemixing(false);
      });
  };

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
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                      activeSlideIndex === index
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm font-bold'
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
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        safeZonePlatform === platform
                          ? 'bg-amber-500 text-neutral-950 font-bold'
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
                Vérifiez que vos sous-titres dynamiques et vos accroches ne sont jamais masqués par les boutons de commentaires ou la barre d'onglets.
              </p>

              {/* Safe Zone Visual Showcase */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-amber-400 font-bold block mb-0.5">
                      🎬 Trend Remix (Video-to-Video)
                    </span>
                    <span className="text-neutral-300 text-[11px] block mb-2">
                      Collez un lien concurrent. L'IA réécrit l'angle dans votre ton exact.
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={remixUrl}
                        onChange={(e) => setRemixUrl(e.target.value)}
                        placeholder="https://tiktok.com/@concurrent/video/..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white"
                      />
                      <button
                        onClick={handleTrendRemix}
                        disabled={isRemixing}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs cursor-pointer"
                      >
                        {isRemixing ? 'Remix...' : 'Remixer'}
                      </button>
                    </div>
                    {remixResult && (
                      <div className="mt-2 p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
                        ✨ Hook remixé : {remixResult.hook} (Score {remixResult.viralRetentionScore}%)
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-amber-400 font-bold block mb-0.5">
                        🗣️ Lip-Sync & Rendu 9:16 Incarné
                      </span>
                      <span className="text-neutral-300 text-[11px]">
                        Synchronisation labiale exacte + Manifeste C2PA v2.1
                      </span>
                    </div>
                    <button
                      onClick={handleSimulateVideoGeneration}
                      disabled={isVideoGenerating}
                      className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-neutral-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Film className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isVideoGenerating ? 'Rendu...' : 'Générer 9:16'}</span>
                    </button>
                  </div>

                  {videoGenResult && (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] flex items-center justify-between">
                      <span>✅ Vidéo 9:16 générée (LipSync {videoGenResult.lipSyncScore}%, Rétention {videoGenResult.retentionScore}%)</span>
                      <span className="font-mono text-[10px] text-neutral-400">{videoGenResult.jobId}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Respect strict des Safe Zones 2026</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>100% Calibré</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Batch Ideation Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>Moteur d'Idéation en Lot (Batch Ideation)</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Concepts viraux classés par angle psychologique avec scoring de rétention algorithmique.
              </p>
            </div>
            <span className="text-xs font-semibold text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
              Scoring Prédictif : 89% à 96%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {batchIdeas.map((idea) => {
              const isSelected = selectedIdea.title === idea.title;
              return (
                <div
                  key={idea.id || idea.title}
                  onClick={() => setSelectedIdea(idea)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-950 text-amber-400 border border-neutral-800">
                        {idea.angle}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-mono">
                        <Flame className="w-3 h-3" />
                        {idea.score}%
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white mb-2 line-clamp-2">
                      {idea.title}
                    </h4>

                    <p className="text-[11px] text-neutral-400 italic mb-4 line-clamp-3">
                      {idea.hook}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400">
                    <span>{idea.format}</span>
                    <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                      <span>Utiliser</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
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
