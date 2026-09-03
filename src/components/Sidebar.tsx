import React, { useState } from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Clapperboard, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  LogOut, 
  LogIn, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  Fingerprint,
  Share2
} from 'lucide-react';
import type { UserSession } from './AuthModal';

export type ActiveTab = 
  | 'dashboard' 
  | 'clone' 
  | 'studio' 
  | 'copilot' 
  | 'scheduler' 
  | 'accounts'
  | 'pricing';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenOnboarding: () => void;
  onOpenLogin: (mode?: 'login' | 'signup') => void;
  userSession: UserSession | null;
  onLogout: () => void;
  onOpenLegal: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenOnboarding,
  onOpenLogin,
  userSession,
  onLogout,
  onOpenLegal,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const navigationItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
    { id: 'clone', label: 'Mon Clone Intégral', icon: Fingerprint, badge: 'IA' },
    { id: 'studio', label: 'Studio IA Multi-Formats', icon: Clapperboard, badge: '9:16' },
    { id: 'copilot', label: 'Copilote DM 24h', icon: MessageSquare, badge: 'Auto' },
    { id: 'scheduler', label: 'Smart Scheduler', icon: Calendar, badge: 'IA' },
    { id: 'accounts', label: 'Comptes & Réseaux', icon: Share2, badge: 'OAuth' },
    { id: 'pricing', label: 'Tarifs & Crédits', icon: CreditCard },
  ];

  return (
    <aside 
      className={`relative flex flex-col justify-between bg-neutral-950/95 border-r border-neutral-800/80 backdrop-blur-xl transition-all duration-300 z-40 shrink-0 h-screen sticky top-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Logo and Header */}
      <div>
        <div className="h-18 flex items-center justify-between px-4 border-b border-neutral-800/60">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-3 text-left overflow-hidden group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="font-display text-base font-bold text-white tracking-tight">
                  SocialClone <span className="text-amber-400">AI</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-medium truncate">
                  Votre Clone & Studio IA
                </span>
              </div>
            )}
          </button>

          {/* Collapse/Expand toggle button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer"
            title={collapsed ? "Agrandir le menu" : "Réduire le menu"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Nav Items */}
        <nav className="p-3 space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/80 border border-transparent'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <div className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-amber-400' : 'text-neutral-400 group-hover:text-white'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {!collapsed && (
                  <div className="flex items-center justify-between w-full truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isActive 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Active left indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-400 rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Card / Footer */}
      <div className="p-3 border-t border-neutral-800/60 bg-neutral-950/60">
        {/* Onboarding action banner */}
        {!collapsed && (
          <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-1.5">
              <Flame className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              <span className="text-[11px] font-bold text-amber-300">50 Crédits Offerts</span>
            </div>
            <p className="text-[10px] text-neutral-400 leading-tight mb-2">
              Clonez votre voix & activez votre avatar en 1 clic.
            </p>
            <button
              onClick={onOpenOnboarding}
              className="w-full py-1.5 rounded-lg gold-gradient-btn text-[11px] font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Calibrer mon Clone</span>
            </button>
          </div>
        )}

        {/* User Session Profile or Login button */}
        {userSession ? (
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-neutral-900 border border-neutral-800 ${collapsed ? 'justify-center p-1.5' : ''}`}>
            <img 
              src={userSession.avatar} 
              alt={userSession.name} 
              className="w-8 h-8 rounded-lg object-cover border border-amber-500/40 shrink-0" 
            />
            {!collapsed && (
              <div className="flex flex-col truncate flex-1 min-w-0">
                <span className="text-xs font-semibold text-white truncate leading-tight">
                  {userSession.name}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 mt-0.5">
                  <span className="text-amber-400 font-bold">{userSession.credits} cr.</span>
                  <span>•</span>
                  <span className="uppercase text-[9px] px-1 rounded bg-amber-500/15 text-amber-300 font-medium">
                    {userSession.plan}
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={onLogout}
              className="p-1.5 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onOpenLogin('login')}
            className={`w-full flex items-center gap-2 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 hover:border-amber-500/30 text-neutral-200 hover:text-white text-xs font-semibold transition-all cursor-pointer ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogIn className="w-4 h-4 text-amber-400 shrink-0" />
            {!collapsed && <span>Se connecter</span>}
          </button>
        )}
      </div>
    </aside>
  );
};
