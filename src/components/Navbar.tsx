import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Menu, 
  X, 
  LogIn, 
  LogOut
} from 'lucide-react';
import type { UserSession } from './AuthModal';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: 'home' | 'features', hash?: string) => void;
  onOpenOnboarding: () => void;
  onOpenLegal?: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
  onOpenLogin?: (mode?: 'login' | 'signup') => void;
  userSession?: UserSession | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenOnboarding,
  onOpenLogin,
  userSession,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (hash?: string) => {
    setMobileMenuOpen(false);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick()}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              SocialClone <span className="text-amber-400">AI</span>
            </span>
            <span className="text-[11px] text-neutral-400 font-medium">
              Votre Clone Intégral & Studio de Création
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <button
            onClick={() => handleNavClick()}
            className="text-amber-400 font-semibold py-1 hover:text-amber-300 transition-colors cursor-pointer"
          >
            Accueil
          </button>

          <button
            onClick={() => handleNavClick('tarifs')}
            className="hover:text-amber-400 transition-colors py-1 cursor-pointer"
          >
            Tarifs
          </button>
        </nav>

        {/* CTA & Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* User Session or Login Button */}
          {userSession ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer text-left"
              >
                <img
                  src={userSession.avatar}
                  alt={userSession.name}
                  className="w-7 h-7 rounded-lg object-cover border border-amber-500/40"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white leading-tight">
                    {userSession.name}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                    <span className="text-amber-400 font-bold">{userSession.credits} cr.</span>
                    <span>•</span>
                    <span className="uppercase text-[9px] px-1 rounded bg-amber-500/10 text-amber-300 font-medium">
                      {userSession.plan}
                    </span>
                  </div>
                </div>
              </button>

              {/* Dropdown menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl py-1 z-50 text-xs animate-fadeIn">
                  <div className="px-3 py-2 border-b border-neutral-800">
                    <p className="font-semibold text-white truncate">{userSession.name}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{userSession.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenOnboarding();
                    }}
                    className="w-full text-left px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mon Clone & Profil</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout?.();
                    }}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 flex items-center gap-2 border-t border-neutral-800 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenLogin?.('login')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-850 border border-neutral-750 hover:border-amber-500/40 transition-all cursor-pointer"
              id="nav-login-btn"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Connexion</span>
            </button>
          )}

          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl gold-gradient-btn cursor-pointer"
            id="nav-create-clone-btn"
          >
            <span>Créer mon Clone</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
          id="mobile-menu-toggle"
          aria-label="Ouvrir le menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick()}
              className="text-left text-base font-semibold text-amber-400 py-1"
            >
              Accueil
            </button>

            <button
              onClick={() => handleNavClick('tarifs')}
              className="text-left text-base font-medium text-neutral-300 hover:text-amber-400 py-1"
            >
              Tarifs
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-3">
            {userSession ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <img src={userSession.avatar} alt={userSession.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-white">{userSession.name}</p>
                    <p className="text-[10px] text-amber-400 font-medium">{userSession.credits} crédits disponibles</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout?.();
                  }}
                  className="p-1.5 text-neutral-400 hover:text-red-400 cursor-pointer"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin?.('login');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 border border-neutral-750 text-neutral-200 text-xs font-semibold cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>Connexion</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gold-gradient-btn text-xs font-bold shadow-md cursor-pointer"
            >
              <span>Créer mon Clone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
