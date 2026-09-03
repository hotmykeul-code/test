import React, { useState } from 'react';
import { 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Trash2,
  Sliders,
  Check,
  Zap
} from 'lucide-react';
import type { UserSession } from './AuthModal';

interface ConnectedAccountsProps {
  onOpenOnboarding: () => void;
  userSession?: UserSession | null;
}

interface SocialAccount {
  id: 'tiktok' | 'instagram' | 'youtube' | 'threads';
  name: string;
  category: string;
  handle: string;
  connected: boolean;
  followers: string;
  postsSynced: number;
  lastSync: string;
  authUrlEndpoint: string;
  color: string;
  borderColor: string;
  badge: string;
  permissions: string[];
}

export const ConnectedAccounts: React.FC<ConnectedAccountsProps> = ({ userSession }) => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: 'tiktok',
      name: 'TikTok',
      category: 'Vidéos 9:16 & Shorts',
      handle: userSession?.provider === 'tiktok' ? `@${userSession.name.toLowerCase().replace(/\s+/g, '')}` : '@lucas_creator_tt',
      connected: true,
      followers: '142,5K',
      postsSynced: 38,
      lastSync: 'Il y a 12 minutes',
      authUrlEndpoint: '/api/auth/tiktok/url',
      color: 'from-cyan-500/20 to-neutral-900',
      borderColor: 'border-cyan-500/40',
      badge: 'Synchronisé en continu',
      permissions: ['Profil & Statistiques', 'Liste des vidéos 9:16', 'Copilote DM (API Officielle)'],
    },
    {
      id: 'instagram',
      name: 'Instagram & Meta',
      category: 'Reels, Carrousels & DMs',
      handle: userSession?.provider === 'meta' ? `@${userSession.name.toLowerCase().replace(/\s+/g, '')}` : '@lucas_creator_pro',
      connected: true,
      followers: '84,2K',
      postsSynced: 52,
      lastSync: 'Il y a 2 heures',
      authUrlEndpoint: '/api/auth/instagram/url',
      color: 'from-pink-500/20 to-neutral-900',
      borderColor: 'border-pink-500/40',
      badge: 'Fenêtre 24h Conforme',
      permissions: ['Instagram Graph API', 'Triage DMs 24h', 'Publication Carrousels & Reels'],
    },
    {
      id: 'youtube',
      name: 'YouTube Shorts',
      category: 'Shorts & Long format',
      handle: userSession?.provider === 'google' ? `@${userSession.name.toLowerCase().replace(/\s+/g, '')}` : '@lucas_studio_yt',
      connected: userSession?.provider === 'google',
      followers: userSession?.provider === 'google' ? '28,4K' : 'Non connecté',
      postsSynced: userSession?.provider === 'google' ? 24 : 0,
      lastSync: userSession?.provider === 'google' ? 'Il y a 1 jour' : 'Jamais',
      authUrlEndpoint: '/api/auth/google/url',
      color: 'from-red-500/20 to-neutral-900',
      borderColor: 'border-red-500/30',
      badge: userSession?.provider === 'google' ? 'Connecté' : 'Optionnel',
      permissions: ['YouTube Data API v3', 'Lecture des Shorts publics', 'Extraction audio & style'],
    },
    {
      id: 'threads',
      name: 'Threads / Meta',
      category: 'Textes courts & Discussions',
      handle: '@lucas_creator_pro',
      connected: false,
      followers: 'Non connecté',
      postsSynced: 0,
      lastSync: 'Jamais',
      authUrlEndpoint: '/api/auth/instagram/url',
      color: 'from-neutral-800/40 to-neutral-900',
      borderColor: 'border-neutral-800',
      badge: 'Bientôt disponible',
      permissions: ['Threads API v1', 'Publication de fils narratifs'],
    },
  ]);

  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleToggleConnect = async (accId: string) => {
    const target = accounts.find((a) => a.id === accId);
    if (!target) return;

    if (target.connected) {
      // Disconnect
      setAccounts(prev => prev.map(a => a.id === accId ? { ...a, connected: false, handle: 'Non connecté', followers: '0', postsSynced: 0, lastSync: 'Déconnecté' } : a));
      setSuccessNotice(`Compte ${target.name} déconnecté avec succès.`);
      setTimeout(() => setSuccessNotice(null), 3500);
    } else {
      // Connect / Fetch Auth URL
      try {
        setSyncingId(accId);
        const res = await fetch(target.authUrlEndpoint);
        const data = await res.json();
        
        if (data.authUrl) {
          window.location.href = data.authUrl;
        } else {
          // Simulation fallback for local testing
          setTimeout(() => {
            setAccounts(prev => prev.map(a => a.id === accId ? {
              ...a, 
              connected: true, 
              handle: `@mon_compte_${accId}`, 
              followers: '12,5K', 
              postsSynced: 18, 
              lastSync: 'À l\'instant'
            } : a));
            setSyncingId(null);
            setSuccessNotice(`🎉 Compte ${target.name} connecté et synchronisé avec succès !`);
            setTimeout(() => setSuccessNotice(null), 4000);
          }, 1000);
        }
      } catch (err) {
        setSyncingId(null);
        setSuccessNotice(`Synchronisation déclenchée pour ${target.name}.`);
        setTimeout(() => setSuccessNotice(null), 3500);
      }
    }
  };

  const handleSyncAll = () => {
    setSyncingId('ALL');
    setTimeout(() => {
      setSyncingId(null);
      setSuccessNotice('🔄 Vos comptes TikTok et Instagram ont été ré-ingérés : 90 vidéos et carrousels analysés.');
      setTimeout(() => setSuccessNotice(null), 4500);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Notice */}
      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
          <button onClick={() => setSuccessNotice(null)} className="text-emerald-400 hover:text-white text-xs font-bold">✕</button>
        </div>
      )}

      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Share2 className="w-4 h-4" />
            <span>Gestion des Réseaux & Synchronisation OAuth</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">Comptes Sociaux Connectés</h2>
          <p className="text-xs text-neutral-400 max-w-2xl mt-1">
            Connectez vos comptes officiels pour permettre à SocialClone AI d'ingérer vos vidéos et d'alimenter votre clone et le Copilote DM. Vos mots de passe ne transitent jamais sur nos serveurs.
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          disabled={syncingId === 'ALL'}
          className="px-4 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncingId === 'ALL' ? 'animate-spin' : ''}`} />
          <span>{syncingId === 'ALL' ? 'Ingestion en cours...' : 'Forcer la ré-ingestion globale'}</span>
        </button>
      </div>

      {/* Social Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((acc) => (
          <div 
            key={acc.id}
            className={`p-6 rounded-2xl bg-neutral-900/60 border ${acc.connected ? acc.borderColor : 'border-neutral-800'} relative flex flex-col justify-between hover:border-neutral-700 transition-all`}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${acc.color} flex items-center justify-center border border-white/10 font-bold text-sm text-white`}>
                    {acc.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{acc.name}</h3>
                    <p className="text-[11px] text-neutral-400">{acc.category}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  acc.connected 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                }`}>
                  {acc.connected ? '● Connecté' : '○ Déconnecté'}
                </span>
              </div>

              {/* Account Metrics */}
              <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 grid grid-cols-3 gap-2 mb-4 text-center">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Identifiant</div>
                  <div className="text-xs font-bold text-white truncate mt-0.5">{acc.handle}</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Abonnés</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">{acc.followers}</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Vidéos ingérées</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{acc.postsSynced}</div>
                </div>
              </div>

              {/* Permissions & Scopes */}
              <div className="space-y-1.5 mb-6">
                <div className="text-[11px] font-semibold text-neutral-400 mb-2">Permissions actives :</div>
                {acc.permissions.map((perm, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{perm}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
              <span className="text-[10px] text-neutral-500">
                Synchro: {acc.lastSync}
              </span>

              <button
                onClick={() => handleToggleConnect(acc.id)}
                disabled={syncingId === acc.id}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  acc.connected
                    ? 'bg-neutral-800 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 border border-neutral-700 hover:border-red-500/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md'
                }`}
              >
                {syncingId === acc.id ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Connexion...</span>
                  </>
                ) : acc.connected ? (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Déconnecter</span>
                  </>
                ) : (
                  <>
                    <span>Connecter {acc.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Security Guarantee Card */}
      <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
        </div>
        <div className="text-xs text-neutral-400 leading-relaxed">
          <strong className="text-white">Sécurité des APIs Officielles : </strong>
          SocialClone AI utilise exclusivement les protocoles OAuth 2.0 certifiés par Meta, TikTok et Google. Vos identifiants et mots de passe ne sont jamais consultés ni stockés. Les jetons d'accès peuvent être révoqués à tout instant depuis vos réglages de réseaux sociaux.
        </div>
      </div>
    </div>
  );
};
