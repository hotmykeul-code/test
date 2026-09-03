import React from 'react';
import { 
  Sparkles, 
  Coins, 
  Plus, 
  LogIn, 
  Flame,
  LogOut
} from 'lucide-react';
import type { ActiveTab } from './Sidebar';
import type { UserSession } from './AuthModal';

interface AppHeaderProps {
  activeTab: ActiveTab;
  onOpenOnboarding: () => void;
  onOpenLogin: (mode?: 'login' | 'signup') => void;
  userSession: UserSession | null;
  onLogout?: () => void;
}

const TAB_TITLES: Record<ActiveTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Tableau de Bord',
    subtitle: 'Vue d\'ensemble de votre clone, de vos contenus et de vos conversions',
  },
  clone: {
    title: 'Mon Clone Intégral (Voice & Total Human Twin)',
    subtitle: 'Calibrage morphologique, radar stylistique 8 axes et avatar photoréaliste',
  },
  studio: {
    title: 'Studio IA de Création Multi-Formats',
    subtitle: 'Production Prompt-to-Video 9:16, Safe-Zones, Carrousels 3 slides & Threads',
  },
  copilot: {
    title: 'Copilote DM & Messagerie Conforme 24h',
    subtitle: 'Triage intelligent, répondeur automatique et conversion de followers en clients',
  },
  scheduler: {
    title: 'Smart Scheduler & Planificateur Résilient',
    subtitle: 'Optimisation prédictive d\'audience et publication automatisée multicanaux',
  },
  accounts: {
    title: 'Comptes & Réseaux Sociaux Synchronisés',
    subtitle: 'Gérez vos connexions officielles TikTok, Instagram, YouTube et Threads pour l\'ingestion et la publication',
  },
  pricing: {
    title: 'Tarifs, Abonnements & Crédits Vidéo',
    subtitle: 'Gérez votre formule Pro (9,99 €/mois), vos devis et vos recharges de crédits',
  },
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeTab,
  onOpenOnboarding,
  onOpenLogin,
  userSession,
  onLogout,
}) => {
  const current = TAB_TITLES[activeTab] || { title: 'SocialClone AI', subtitle: 'Plateforme de création IA' };

  return (
    <header className="h-18 px-6 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-bold text-white font-display">
            {current.title}
          </h1>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
            Actif
          </span>
        </div>
        <p className="text-[11px] text-neutral-400 hidden sm:block">
          {current.subtitle}
        </p>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Promo Credits Unlock CTA */}
        <button
          onClick={onOpenOnboarding}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-amber-500/20 hover:from-purple-600/30 hover:to-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all cursor-pointer animate-pulse-subtle"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>+50 Crédits</span>
        </button>

        {/* New Creation Quick Button */}
        <button
          onClick={onOpenOnboarding}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl gold-gradient-btn text-xs font-bold cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Créer</span>
        </button>

        {/* User Session Avatar or Login Button */}
        {userSession ? (
          <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
            <img
              src={userSession.avatar}
              alt={userSession.name}
              className="w-8 h-8 rounded-lg object-cover border border-amber-500/40"
            />
          </div>
        ) : (
          <button
            onClick={() => onOpenLogin('login')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 text-neutral-200 text-xs font-semibold transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Connexion</span>
          </button>
        )}
      </div>
    </header>
  );
};
