import React from 'react';
import { X, ShieldCheck, FileText, Fingerprint, Lock } from 'lucide-react';

interface LegalModalsProps {
  type: 'terms' | 'privacy' | 'biometrics' | 'notice' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              {type === 'biometrics' ? (
                <Fingerprint className="w-5 h-5" />
              ) : type === 'privacy' ? (
                <Lock className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {type === 'terms' && 'Conditions Générales d\'Utilisation & de Vente (CGU/CGV)'}
                {type === 'privacy' && 'Politique de Confidentialité & RGPD'}
                {type === 'biometrics' && 'Charte de Protection des Données Biométriques & EU AI Act'}
                {type === 'notice' && 'Mentions Légales & Identification de l\'Éditeur'}
              </h3>
              <span className="text-xs text-neutral-400">
                SocialClone AI V3.0 • Dernière mise à jour : Août 2026
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6 text-xs text-neutral-300 leading-relaxed">
          {type === 'biometrics' && (
            <>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <strong>Règle Fondamentale :</strong> Vos données faciales, morphologiques et vocales sont strictement réservées à l'entraînement et à l'exécution de votre propre clone personnel. Aucune revente, réutilisation ni intégration à un modèle de fondation public n'est effectuée.
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">1. Nature des Données Collectées</h4>
                <p>
                  Dans le cadre du Studio de Calibrage et de l'ingestion multimodale, SocialClone AI traite :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                  <li>Les traits faciaux et la silhouette corporelle extraits de 3 à 5 images clés (keyframes).</li>
                  <li>L'empreinte spectrale vocale isolée issue de vos vidéos sans musique ou de votre enregistrement express de 20 secondes.</li>
                  <li>Le radar stylistique textuel issu de vos légendes de publications.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">2. Chiffrement et Sécurité</h4>
                <p>
                  Toutes les données biométriques et les jetons OAuth officiels sont chiffrés au repos à l'aide de l'algorithme <strong>AES-256-GCM</strong>. Aucun tiers n'a accès aux flux bruts.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">3. Droit à l'Oubli et Purge Immédiate</h4>
                <p>
                  Conformément au RGPD et au règlement européen sur l'intelligence artificielle (EU AI Act), la suppression de votre compte utilisateur purge instantanément tous les fichiers audio/vidéo stockés sur Cloudflare R2 / AWS S3 et révoque définitivement les modèles de synthèse associés.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">4. Traçabilité et Manifeste C2PA</h4>
                <p>
                  Chaque vidéo générée par SocialClone AI intègre une signature numérique de provenance conforme aux exigences de transparence C2PA v2.1.
                </p>
              </section>
            </>
          )}

          {type === 'terms' && (
            <>
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">1. Objet et Acceptation</h4>
                <p>
                  Les présentes Conditions Générales régissent l'accès et l'utilisation de la plateforme SocialClone AI (Web et applications mobiles iOS / Android). En cochant la case obligatoire lors de l'onboarding, l'utilisateur accepte sans réserve les présentes stipulations.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">2. Respect des API Officielles et Règle des 24 Heures</h4>
                <p>
                  Le module de messagerie automatisée est raccordé exclusivement aux API officielles de Meta (Messenger API for Instagram) et TikTok. L'utilisateur s'engage à respecter la fenêtre stricte de 24 heures. Toute tentative de contournement via du scraping non autorisé entraîne la résiliation immédiate du compte.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">3. Modèle d'Abonnement et Recalibrage</h4>
                <p>
                  La Formule Pro est facturée à hauteur de 9 € / mois (ou 9,99 $ IAP via App Store / Google Play). Les utilisateurs Pro bénéficient d'un (1) recalibrage de leur clone tous les 30 jours calendrier. Les crédits vidéo supplémentaires peuvent être acquis par packs dédiés.
                </p>
              </section>
            </>
          )}

          {type === 'privacy' && (
            <>
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">1. Responsable de Traitement</h4>
                <p>
                  SocialClone AI SAS agit en qualité de responsable de traitement pour les données personnelles hébergées sur le territoire de l'Union Européenne.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">2. Vos Droits RGPD</h4>
                <p>
                  Vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression intégrale de vos données personnelles et biométriques. Vous pouvez exercer ce droit à tout moment depuis les paramètres de votre compte ou par e-mail à dpo@socialclone.ai.
                </p>
              </section>
            </>
          )}

          {type === 'notice' && (
            <>
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">Éditeur du Service</h4>
                <p>
                  <strong>SocialClone AI SAS</strong><br />
                  Société par Actions Simplifiée au capital de 50 000 €<br />
                  RCS Paris B 987 654 321<br />
                  Siège social : Paris, France<br />
                  Contact : contact@socialclone.ai
                </p>
              </section>
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white">Hébergement Sécurisé</h4>
                <p>
                  Serveurs applicatifs et stockage objet hébergés au sein de l'Union Européenne (Google Cloud Platform Frankfurt & Cloudflare R2 Europe).
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
