import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  UserCheck, 
  Video, 
  MessageSquareText, 
  CalendarCheck2, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { FeaturesHumanClone } from './FeaturesHumanClone';
import { FeaturesStudio } from './FeaturesStudio';
import { FeaturesCopilotDM } from './FeaturesCopilotDM';
import { FeaturesScheduler } from './FeaturesScheduler';
import { ComplianceSection } from './ComplianceSection';
import { InteractiveSimulatorSandbox } from './InteractiveSimulatorSandbox';

interface FeaturesFullPageProps {
  onBackToHome: () => void;
  onGoToPricing: () => void;
  onOpenOnboarding: () => void;
  onOpenLegal: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
}

export const FeaturesFullPage: React.FC<FeaturesFullPageProps> = ({
  onBackToHome,
  onGoToPricing,
  onOpenOnboarding,
  onOpenLegal,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const featureNavigationItems = [
    { label: 'Simulateur Interactif', id: 'simulateur-interactif', icon: Sparkles },
    { label: 'Total Human Clone', id: 'human-clone', icon: UserCheck },
    { label: 'Studio IA & Formats', id: 'studio-ia', icon: Video },
    { label: 'Copilote DM & Vente', id: 'copilote-dm', icon: MessageSquareText },
    { label: 'Smart Scheduler', id: 'smart-scheduler', icon: CalendarCheck2 },
    { label: 'Conformité & RGPD', id: 'conformite', icon: ShieldCheck },
  ];

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-28 pb-20 bg-neutral-950 text-neutral-100" id="features-full-page">
      {/* Top Banner with Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition-all cursor-pointer group"
            id="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Retour à l’accueil (Présentation & Tarifs)</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToPricing}
              className="text-xs font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
            >
              Consulter les tarifs →
            </button>
            <button
              onClick={onOpenOnboarding}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Créer mon Clone</span>
            </button>
          </div>
        </div>

        {/* Page Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue Technologique Complet</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Toutes les fonctionnalités en détail
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Explorez l'ensemble des modules technologiques : du clonage photoréaliste à la modélisation vocale, en passant par le studio vidéo 9:16 et la conversion conversationnelle par DM.
          </p>
        </div>

        {/* Quick Anchor Navigation Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-sm max-w-5xl mx-auto">
          {featureNavigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToAnchor(item.id)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-neutral-950/60 hover:bg-neutral-800 border border-neutral-800/80 transition-all cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Modules */}
      <div className="space-y-4">
        {/* Interactive Live Sandbox Simulator */}
        <InteractiveSimulatorSandbox onOpenOnboarding={onOpenOnboarding} />

        {/* Section 1: Total Human Clone */}
        <FeaturesHumanClone onOpenOnboarding={onOpenOnboarding} />

        {/* Section 2: Studio IA */}
        <FeaturesStudio onOpenOnboarding={onOpenOnboarding} />

        {/* Section 3: Copilote DM */}
        <FeaturesCopilotDM onOpenOnboarding={onOpenOnboarding} />

        {/* Section 4: Smart Scheduler */}
        <FeaturesScheduler onOpenOnboarding={onOpenOnboarding} />

        {/* Section 5: Conformité & C2PA */}
        <ComplianceSection onOpenLegal={onOpenLegal} />
      </div>

      {/* Bottom CTA Block on Features Page */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-900 to-neutral-800 border border-neutral-800 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Prêt à configurer votre clone personnalisé ?
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Démarrez l'analyse stylistique et l'ingestion multimodale en moins de 2 minutes, sans carte bancaire requise.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenOnboarding}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                id="features-bottom-onboard-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>Créer mon Clone (Essai Gratuit)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onGoToPricing}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm border border-neutral-700 transition-all flex items-center justify-center cursor-pointer"
                id="features-bottom-pricing-btn"
              >
                <span>Voir la grille tarifaire</span>
              </button>

              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-5 py-3.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Revenir à l'accueil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
