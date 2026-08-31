import React from 'react';
import { UserCheck, Sparkles, MessageCircle, ArrowRight, Layers, ShieldCheck, Zap } from 'lucide-react';

interface HomeBriefOverviewProps {
  onNavigateToFeatures: () => void;
  onOpenOnboarding: () => void;
}

export const HomeBriefOverview: React.FC<HomeBriefOverviewProps> = ({
  onNavigateToFeatures,
  onOpenOnboarding,
}) => {
  const pillars = [
    {
      icon: UserCheck,
      badge: 'Jumeau Numérique',
      title: "Votre jumeau dopé à l'IA",
      description:
        'Votre voix, votre timbre, vos mimiques et votre style rédactionnel sont analysés dès la première synchronisation de compte pour recréer une présence incarnée indifférenciable.',
      highlights: ['Voix & intonations clonées', 'Radar stylistique 8 axes', 'Recalibrage mensuel sécurisé'],
    },
    {
      icon: Layers,
      badge: 'Création Multi-Formats',
      title: 'Studio Vidéos, Carrousels & Stories',
      description:
        'Générez en quelques clics des vidéos 9:16 avec respect strict des safe zones (Reels, TikTok, Shorts), des carrousels à fort taux de rétention et des stories prêtes à publier.',
      highlights: ['Lip-sync haute fidélité', 'Respect des safe zones', 'Idéation de scripts viraux'],
    },
    {
      icon: MessageCircle,
      badge: 'Conversion 24/7',
      title: 'Copilote DM & Vente Automatisée',
      description:
        'Engagez vos prospects dès qu’ils interagissent avec vos contenus. Le copilote qualifie le besoin, répond avec votre style et guide vers vos liens de vente.',
      highlights: ['Conformité API Meta & TikTok', 'Fenêtre 24h respectée', 'Recommandations & liens directs'],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-neutral-950 border-t border-neutral-900 relative" id="presentation-essentielle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-amber-400 mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>L’essentiel en 3 piliers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Une présence sociale incarnée, sans y passer des heures.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            SocialClone AI combine la puissance d’un clone multimodal et l’automatisation de vos interactions pour maximiser votre visibilité et vos revenus.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 p-7 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-950/80 px-2.5 py-1 rounded border border-neutral-800">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80">
                  <ul className="space-y-2">
                    {pillar.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bridge to Dedicated Features Page */}
        <div className="rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-amber-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Exploration complète</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Envie d'explorer chaque technologie en détail ?
            </h4>
            <p className="text-neutral-400 text-sm max-w-xl">
              Découvrez le radar à 8 axes, la console de simulation DM interactive, les safe zones vidéo et la matrice horaire sur notre page dédiée aux fonctionnalités.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onNavigateToFeatures}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
              id="goto-all-features-btn"
            >
              <span>Voir toutes les fonctionnalités</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenOnboarding}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm border border-neutral-700 transition-all flex items-center justify-center cursor-pointer"
              id="try-free-clone-btn"
            >
              <span>Démarrer gratuitement</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
