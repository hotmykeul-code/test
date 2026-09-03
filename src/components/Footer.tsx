import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  ArrowUp,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
  onOpenOnboarding: () => void;
  onNavigate?: (page: 'home' | 'features', hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onOpenOnboarding,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTarifs = () => {
    const el = document.getElementById('tarifs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Proposition */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md">
                <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-display text-base font-bold tracking-tight text-white">
                SocialClone <span className="text-amber-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Plateforme permettant aux créateurs de cloner leur voix, gestuelle et style pour générer des vidéos 9:16 incarnées et convertir leurs abonnés en DMs officiels conformes.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[11px] text-neutral-400">
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Meta & TikTok Partner API
              </span>
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Conforme RGPD & C2PA
              </span>
            </div>
          </div>

          {/* Col 2: Accès Rapide */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Accès Rapide
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToTarifs}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Grille Tarifaire
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOnboarding}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer text-amber-400 font-semibold"
                >
                  Créer mon Clone →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cadre Légal & RGPD */}
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
                  Conditions Générales (CGU / CGV)
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
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© 2026 SocialClone AI. Tous droits réservés.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
