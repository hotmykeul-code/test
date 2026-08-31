import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface PricingSectionProps {
  onOpenOnboarding: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenOnboarding }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-12 lg:py-14 bg-neutral-950 border-t border-neutral-900 relative" id="tarifs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Tarifs Clairs, Zéro Coût Caché
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Disponible sur le Web (Stripe) et sur mobile (App Store & Google Play). Choisissez la formule adaptée à votre rythme de publication.
          </p>

          {/* Billing Switch */}
          <div className="mt-5 inline-flex items-center gap-3 p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg transition-all ${
                !isAnnual
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Facturation Mensuelle
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Facturation Annuelle</span>
              <span className="text-[10px] bg-emerald-400 text-neutral-950 px-1.5 py-0.5 rounded font-black">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
          {/* Tier 1: Free */}
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Essai Découverte
                </span>
                <span className="text-xs font-semibold text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded">
                  Sans CB
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1.5">Formule Gratuite</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Pour analyser votre compte et générer votre premier radar 8 axes.
              </p>

              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">0 €</span>
                <span className="text-xs text-neutral-500 ml-2">/ pour toujours</span>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-300 mb-6 border-t border-neutral-800 pt-4">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 compte connecté (1 seul réseau)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clonage & Avatar Photoréaliste Inclus</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Quota découverte (3 carrousels IA)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Copilote DM (Semi-auto uniquement)</span>
                </li>
                <li className="flex items-center gap-2.5 text-neutral-500">
                  <span className="w-4 h-4 flex items-center justify-center font-bold">✕</span>
                  <span>Vidéos IA incarnées (Verrouillé)</span>
                </li>
                <li className="flex items-center gap-2.5 text-neutral-500">
                  <span className="w-4 h-4 flex items-center justify-center font-bold">✕</span>
                  <span>Recalibrage régulier (Initial uniquement)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Démarrer Gratuitement
            </button>
          </div>

          {/* Tier 2: PRO (Featured) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900 border-2 border-amber-500 shadow-2xl relative flex flex-col justify-between transform lg:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider shadow-md">
              Recommandé Créateurs
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Formule Pro
                </span>
                <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Web & Mobile IAP
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1.5">Formule Pro</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Le studio complet pour créer, publier et convertir sur tous vos réseaux.
              </p>

              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  {isAnnual ? '7,20 €' : '9 €'}
                </span>
                <span className="text-xs text-neutral-400 ml-2">/ mois (ou 9,99 $ IAP)</span>
                {isAnnual && <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Facturé 86,40 € par an</div>}
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-200 mb-6 border-t border-neutral-800 pt-4">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">1 compte par réseau supporté</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Clonage complet + Studio Guidé Mobile/Web</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-300 font-medium">🔄 1 recalibrage tous les 30 jours</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Carrousels & Textes IA Illimités</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Vidéos IA avec Clone Complet (Crédits mensuels inclus)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Packs de crédits supplémentaires au besoin</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Planificateur IA + Auto-Fallback Mobile</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Copilote DM (Auto, Semi-Auto, Hybride)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Passer à la Formule Pro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tier 3: Agency */}
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  Grandes Équipes
                </span>
                <span className="text-xs font-semibold text-neutral-300 bg-neutral-800 px-2.5 py-1 rounded">
                  Sur Devis
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1.5">Formule Agence</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Pour les agences gérant 10+ créateurs avec espaces de travail dédiés et rôles RBAC.
              </p>

              <div className="mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">Sur Mesure</span>
                <span className="text-xs text-neutral-500 ml-2">/ facturation Stripe Invoice</span>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-300 mb-6 border-t border-neutral-800 pt-4">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-comptes sur mesure (selon contrat)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-clones et avatars dédiés par créateur</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>🔄 1 recalibrage / 30 jours par compte</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Quota vidéo personnalisé & facturation groupée</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium">Gestion d'équipe (RBAC : Admin, CM, Créateur)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Support dédié & intégration API prioritaire</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Demander un Devis Agence
            </button>
          </div>
        </div>

        {/* Comparison Table Details */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800">
          <h4 className="text-xs sm:text-sm font-bold text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Synthèse des Garanties & Transparence</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-400">
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
              <strong className="text-white block mb-1">Sans Engagement</strong>
              Résiliez en 1 clic à tout moment depuis le Web ou la gestion d'abonnements Apple / Google.
            </div>
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
              <strong className="text-white block mb-1">Zéro Secret Client</strong>
              Vos identifiants et jetons d'accès API sont chiffrés en AES-256 et isolés côté serveur.
            </div>
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
              <strong className="text-white block mb-1">Droit à l'Oubli RGPD</strong>
              Supprimez votre compte à tout moment pour purger instantanément tous vos médias et modèles vocaux.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
