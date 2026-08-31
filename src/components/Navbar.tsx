import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Play, Menu, X, ArrowRight, Layers } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'features';
  onNavigate: (page: 'home' | 'features', hash?: string) => void;
  onOpenOnboarding: () => void;
  onOpenLegal: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenOnboarding,
  onOpenLegal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'features', hash?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, hash);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 shadow-lg'
          : 'bg-neutral-950/40 backdrop-blur-sm border-b border-neutral-900/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-tight text-white">
                SocialClone <span className="text-amber-400">AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                V3.0 Master
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 font-medium">
              Votre Clone Intégral & Studio de Création
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`py-1 relative group cursor-pointer transition-colors ${
              currentPage === 'home' ? 'text-amber-400 font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span>Accueil</span>
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('features')}
            className={`py-1 relative group cursor-pointer transition-colors flex items-center gap-1.5 ${
              currentPage === 'features' ? 'text-amber-400 font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span>Fonctionnalités</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Détaillées
            </span>
            {currentPage === 'features' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400" />
            )}
          </button>

          {currentPage === 'features' ? (
            <>
              <button
                onClick={() => handleNavClick('features', 'human-clone')}
                className="hover:text-amber-400 transition-colors py-1 cursor-pointer text-neutral-400 text-xs"
              >
                Clone Intégral
              </button>
              <button
                onClick={() => handleNavClick('features', 'studio-ia')}
                className="hover:text-amber-400 transition-colors py-1 cursor-pointer text-neutral-400 text-xs"
              >
                Studio Vidéo
              </button>
              <button
                onClick={() => handleNavClick('features', 'copilote-dm')}
                className="hover:text-amber-400 transition-colors py-1 cursor-pointer text-neutral-400 text-xs"
              >
                Copilote DM
              </button>
            </>
          ) : null}

          <button
            onClick={() => handleNavClick('home', 'tarifs')}
            className="hover:text-amber-400 transition-colors py-1 cursor-pointer"
          >
            Tarifs
          </button>

          <button
            onClick={() => (currentPage === 'home' ? handleNavClick('home', 'conformite') : handleNavClick('features', 'conformite'))}
            className="hover:text-amber-400 transition-colors py-1 cursor-pointer"
          >
            Conformité
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {currentPage === 'home' ? (
            <button
              onClick={() => handleNavClick('features')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all cursor-pointer"
              id="nav-explore-features-btn"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Voir tout en détail</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all cursor-pointer"
            >
              <span>Accueil & Tarifs</span>
            </button>
          )}

          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all shadow-sm hover:shadow-amber-500/20 font-medium cursor-pointer"
            id="nav-create-clone-btn"
          >
            <span>Créer mon Clone (Essai)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
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
              onClick={() => handleNavClick('home')}
              className={`text-left text-base font-medium py-1 ${
                currentPage === 'home' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              Accueil (Présentation & Tarifs)
            </button>

            <button
              onClick={() => handleNavClick('features')}
              className={`text-left text-base font-medium py-1 flex items-center justify-between ${
                currentPage === 'features' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              <span>Toutes les Fonctionnalités</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Page dédiée
              </span>
            </button>

            <button
              onClick={() => handleNavClick('home', 'tarifs')}
              className="text-left text-base font-medium text-neutral-300 hover:text-amber-400 py-1"
            >
              Tarifs
            </button>

            <button
              onClick={() => (currentPage === 'home' ? handleNavClick('home', 'conformite') : handleNavClick('features', 'conformite'))}
              className="text-left text-base font-medium text-neutral-300 hover:text-amber-400 py-1"
            >
              Conformité & RGPD
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="w-full py-2.5 rounded-lg bg-amber-500 text-neutral-950 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Créer mon Clone Intégral</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegal('biometrics');
              }}
              className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center justify-center gap-1.5 pt-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Charte Données Biométriques & RGPD</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

