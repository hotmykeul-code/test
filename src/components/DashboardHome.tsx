import React from 'react';
import { 
  Sparkles, 
  Clapperboard, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Coins, 
  Bot, 
  Fingerprint
} from 'lucide-react';
import { ActiveTab } from './Sidebar';
import type { UserSession } from './AuthModal';

interface DashboardHomeProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenOnboarding: () => void;
  userSession: UserSession | null;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onSelectTab,
  onOpenOnboarding,
  userSession,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Welcome Banner with Avatar & Viral Promo CTA */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-neutral-800 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-xl shrink-0">
              <img
                src={userSession?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt="Avatar"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Bienvenue, {userSession?.name || 'Créateur SocialClone'} 👋
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase">
                  {userSession?.plan || 'PRO'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Votre Clone Intégral est synchronisé. Vos outils de création et d'automatisation sont prêts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenOnboarding}
              className="px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Générer avec mon Clone</span>
            </button>
            <button
              onClick={() => onSelectTab('studio')}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Clapperboard className="w-4 h-4 text-amber-400" />
              <span>Ouvrir le Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 : Clone Status */}
        <div 
          onClick={() => onSelectTab('clone')}
          className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-400">Total Human Clone</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Fingerprint className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-display">100% Calibré</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Voice Twin Actif
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Radar 8 axes calibré</p>
        </div>

        {/* KPI 2 : Video Credits */}
        <div 
          onClick={() => onSelectTab('pricing')}
          className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-400">Solde de Crédits IA</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-400 font-display">
              {userSession?.credits ?? 50} Crédits
            </span>
            <span className="text-[10px] text-amber-300 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              Recharge auto
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Env. 25 vidéos 9:16 complètes</p>
        </div>

        {/* KPI 3 : DM Copilot Activity */}
        <div 
          onClick={() => onSelectTab('copilot')}
          className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-400">Copilote DM 24h</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-display">142 Répondus</span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Bot Actif
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">28 leads qualifiés cette semaine</p>
        </div>

        {/* KPI 4 : Smart Scheduler */}
        <div 
          onClick={() => onSelectTab('scheduler')}
          className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-400">Publications Prévues</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-display">8 au Planning</span>
            <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
              98% Portée
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Prochain post : Aujourd'hui 18h30</p>
        </div>
      </div>

      {/* Main Module Quick Launcher Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1 : Studio IA 9:16 Video & Safe Zones */}
        <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between hover:border-amber-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Clapperboard className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Studio Unifié
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Création Vidéo 9:16 & Safe-Zones
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Générez vos Reels, TikToks et Shorts avec votre avatar incarné, synchronisation labiale et simulation des zones de sécurité.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('studio')}
            className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Accéder au Studio IA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2 : Copilote DM & Triage */}
        <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between hover:border-amber-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                API Officielle 24h
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Copilote DM & Conversion
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Automatisez vos messages Instagram et TikTok de façon conforme. Activez le répondeur hybride et envoyez des notes vocales oralisées.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('copilot')}
            className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Gérer les DMs & Bot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3 : Smart Scheduler */}
        <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between hover:border-amber-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Planification IA
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Smart Scheduler & Calendrier
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Planifiez vos publications sur les créneaux d'engagement maximum et bénéficiez du système de publication résiliente.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('scheduler')}
            className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Ouvrir le Planning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
