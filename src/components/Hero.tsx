import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

interface HeroProps {
  onOpenOnboarding: () => void;
  onNavigateToFeatures?: () => void;
  onOpenLogin?: (mode?: 'login' | 'signup') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOnboarding, onNavigateToFeatures, onOpenLogin }) => {
  return (
    <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden" id="hero-section">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-amber-600/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.14] mb-4">
            Votre Clone Intégral.{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Votre Voix, Votre Image, Vos Ventes
            </span>{' '}
            en Pilote Automatique.
          </h1>
          
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Grâce à l'IA, clonez instantanément votre voix, votre gestuelle, vos traits et votre style rédactionnel dès la première synchronisation de votre compte Insta ou TikTok. Générez vos vidéos, vos carrousels ou stories, plannifier leur publication à l'heure de la plus forte audience pour maximiser vos vues. Laissez votre jumeau IA répondre à vos DM et convertissez les en vente ou maintenez vos follower en contact 24/24.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenOnboarding}
              className="w-full sm:w-auto px-8 py-4 rounded-xl gold-gradient-btn text-base flex items-center justify-center gap-2.5 cursor-pointer group shadow-xl"
              id="hero-primary-cta"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              <span>Créer mon Clone IA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Direct Login Link */}
          {onOpenLogin && (
            <p className="mt-3 text-xs text-neutral-400">
              Déjà inscrit ?{' '}
              <button
                type="button"
                onClick={() => onOpenLogin('login')}
                className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
              >
                Se connecter (Google, Meta, TikTok)
              </button>
            </p>
          )}

          {/* Micro-assurances */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400 pt-4 border-t border-neutral-900 max-w-2xl mx-auto">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Ingestion automatique 20-30 posts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Zéro carte bancaire requise
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Consentement biométrique RGPD strict
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
