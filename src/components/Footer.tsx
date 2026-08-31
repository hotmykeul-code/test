import React from 'react';
import { Sparkles, ShieldCheck, Lock, ArrowUpRight, Heart, Layers } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: 'home' | 'features', hash?: string) => void;
  onOpenLegal: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
  onOpenOnboarding: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal, onOpenOnboarding }) => {
  const handleFeatureClick = (hash: string) => {
    if (onNavigate) {
      onNavigate('features', hash);
    }
  };

  const handlePricingClick = () => {
    if (onNavigate) {
      onNavigate('home', 'tarifs');
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-10 pb-8 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md">
                <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-display text-base font-bold tracking-tight text-white">
                SocialClone <span className="text-amber-400">AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                V3.0
              </span>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Plateforme SaaS cross-platform permettant aux créateurs et agences de cloner automatiquement leur voix, gestuelle, silhouette et style rédactionnel pour générer des vidéos 9:16 incarnées et convertir leurs abonnés en DMs officiels conformes.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[11px] text-neutral-400">
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Meta & TikTok Partner API
              </span>
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Manifeste C2PA v2.1
              </span>
            </div>
          </div>

          {/* Nav Col 1: Plateforme & Page Dédiée */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Fonctionnalités Détaillées
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleFeatureClick('human-clone')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Votre Clone Intégral (Human Twin)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick('human-clone')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Radar Stylistique à 8 Axes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick('studio-ia')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Studio Vidéo 9:16 & Safe Zones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick('studio-ia')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Carrousels & Stories 3 Diapos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick('copilote-dm')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Copilote DM (Fenêtre 24h)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick('smart-scheduler')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Smart Scheduler & Fallback Expo
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => onNavigate && onNavigate('features')}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  <Layers className="w-3 h-3" />
                  <span>Voir la page complète →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2: Charte Vocabulaire & Légal */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Cadre Légal & RGPD
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenLegal('biometrics')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Charte Données Biométriques
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  CGU & Conditions Générales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Politique de Confidentialité
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('notice')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Mentions Légales
                </button>
              </li>
              <li>
                <button
                  onClick={handlePricingClick}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer font-medium text-neutral-300"
                >
                  Grille Tarifs & Abonnements
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 3: Démarrage express */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Accès Immédiat
            </span>
            <p className="text-[11px] text-neutral-400">
              Démarrez l'ingestion multimodale en 1 clic sans carte bancaire requise.
            </p>
            <button
              onClick={onOpenOnboarding}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Créer mon Clone (Essai)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            © 2026 SocialClone AI. Tous droits réservés. Conforme EU AI Act, RGPD & C2PA v2.1.
          </div>

          <div className="flex items-center gap-2">
            <span>Conçu pour les créateurs, solopreneurs & agences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

