import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Fingerprint, 
  Sparkles, 
  Check, 
  ExternalLink,
  Cpu,
  Trash2
} from 'lucide-react';

interface ComplianceSectionProps {
  onOpenLegal: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
}

export const ComplianceSection: React.FC<ComplianceSectionProps> = ({ onOpenLegal }) => {
  const [consent1, setConsent1] = useState(true);
  const [consent2, setConsent2] = useState(true);

  return (
    <section className="py-24 bg-neutral-900/30 border-t border-neutral-800 relative" id="conformite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Section 9 • Conformité Juridique, RGPD & Traçabilité C2PA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Éthique, Traçabilité & Protection Biométrique
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            SocialClone AI applique les standards les plus exigeants du RGPD et du règlement européen sur l'IA (EU AI Act). Vos données biométriques restent votre propriété exclusive.
          </p>
        </div>

        {/* 4 Compliance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Item 1 */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Fingerprint className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Finalité Biométrique Exclusive</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Vos traits faciaux, votre voix et votre silhouette ne servent qu'à animer votre propre clone. Zéro revente, zéro réutilisation pour des tiers.
              </p>
            </div>
            <button
              onClick={() => onOpenLegal('biometrics')}
              className="text-xs font-bold text-amber-400 hover:underline pt-4 flex items-center gap-1 cursor-pointer"
            >
              <span>Charte Biométrique</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Item 2 */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Manifeste C2PA (EU AI Act)</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Chaque vidéo générée intègre une signature numérique de provenance certifiant la présence de synthèse IA conformément aux lois européennes.
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono pt-4">
              Traçabilité C2PA v2.1
            </span>
          </div>

          {/* Item 3 */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Chiffrement AES-256-GCM</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Les jetons OAuth officiels et vos empreintes vocales sont chiffrés au repos avant d'être sauvegardés en base sécurisée.
              </p>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono pt-4">
              Zéro Secret Client
            </span>
          </div>

          {/* Item 4 */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Purge Immédiate RGPD</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                D'un simple clic sur « Supprimer mon compte », l'intégralité de vos modèles vocaux, vidéos et carrousels est purgée de nos serveurs et du stockage objet.
              </p>
            </div>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="text-xs font-bold text-amber-400 hover:underline pt-4 flex items-center gap-1 cursor-pointer"
            >
              <span>Politique Confidentialité</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Mandatory Double Consent Checkbox Preview */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Étape Obligatoire de Consentement (Onboarding Bloquant sans Validation)
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mb-6">
            Conformément à nos spécifications V3.0, aucune connexion OAuth ni ingestion de média ne démarre sans l'acceptation expresse de ces deux clauses juridiques :
          </p>

          <div className="space-y-4">
            {/* Checkbox 1 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-all">
              <input
                type="checkbox"
                checked={consent1}
                onChange={(e) => setConsent1(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded bg-neutral-950 border-neutral-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
              <div className="text-xs text-neutral-300">
                <span className="font-semibold text-white block mb-0.5">
                  1. Conditions Générales & Confidentialité
                </span>
                « J'accepte les{' '}
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="text-amber-400 underline hover:text-amber-300"
                >
                  Conditions Générales d'Utilisation (CGU)
                </button>{' '}
                et la{' '}
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="text-amber-400 underline hover:text-amber-300"
                >
                  Politique de Confidentialité
                </button>
                . »
              </div>
            </label>

            {/* Checkbox 2 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-all">
              <input
                type="checkbox"
                checked={consent2}
                onChange={(e) => setConsent2(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded bg-neutral-950 border-neutral-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
              <div className="text-xs text-neutral-300">
                <span className="font-semibold text-white block mb-0.5">
                  2. Données Biométriques & Droit à l'Image
                </span>
                « J'autorise expressément SocialClone AI à analyser et traiter mes traits faciaux, ma silhouette et ma voix dans le but exclusif de générer mon clone numérique personnel. Je certifie être le titulaire légitime du compte connecté et/ou des médias fournis. »
              </div>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800 text-xs">
            <span className="text-neutral-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Statut : {consent1 && consent2 ? 'Prêt pour l\'ingestion 1-clic' : 'Consentement requis'}
            </span>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenLegal('terms')}
                className="text-neutral-400 hover:text-white"
              >
                CGU / CGV
              </button>
              <button
                onClick={() => onOpenLegal('privacy')}
                className="text-neutral-400 hover:text-white"
              >
                Confidentialité
              </button>
              <button
                onClick={() => onOpenLegal('biometrics')}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Données Biométriques
              </button>
              <button
                onClick={() => onOpenLegal('notice')}
                className="text-neutral-400 hover:text-white"
              >
                Mentions Légales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
