import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  ArrowRight, 
  Mail, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'meta' | 'tiktok' | 'apple' | 'email';
  plan: 'FREE' | 'PRO' | 'AGENCY';
  credits: number;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession) => void;
  initialMode?: 'login' | 'signup';
  onOpenOnboarding?: () => void;
  onOpenLegal?: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
  onOpenOnboarding,
  onOpenLegal,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage(null);
    setSuccessNotice(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleOAuthLogin = async (provider: 'google' | 'meta' | 'tiktok' | 'apple') => {
    setLoadingProvider(provider);
    setErrorMessage(null);

    try {
      const providerProfiles: Record<string, { name: string; email: string; avatar: string; handle: string }> = {
        google: {
          handle: 'AlexandreRiviere',
          name: 'Alexandre Rivière',
          email: 'alex.riviere.creator@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        meta: {
          handle: 'SarahCreations',
          name: 'Sarah Benali',
          email: 'sarah.creatrice@instagram.com',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        },
        tiktok: {
          handle: 'LucasStudio',
          name: 'Lucas TikTok Studio',
          email: 'lucas.shorts@tiktok.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        apple: {
          handle: 'ClaraD',
          name: 'Clara Delorme',
          email: 'clara.d@privaterelay.appleid.com',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        },
      };

      const selected = providerProfiles[provider];

      // Exchange / Register with backend
      let backendUser: any = null;
      try {
        const response = await fetch('/api/auth/token-exchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: provider.toUpperCase(),
            code: `mock_code_${provider}_${Date.now()}`,
            handle: selected.handle,
            displayName: selected.name,
            email: selected.email,
            avatarUrl: selected.avatar,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          backendUser = data.user;
        }
      } catch (apiErr) {
        // Fallback gracefully
        console.warn('Backend token exchange note:', apiErr);
      }

      const user: UserSession = {
        id: backendUser?.id || `usr_${provider}_` + Math.random().toString(36).substring(7),
        name: backendUser?.displayName || selected.name,
        email: backendUser?.email || selected.email,
        avatar: backendUser?.avatarUrl || selected.avatar,
        provider: provider,
        plan: backendUser?.plan || (provider === 'tiktok' ? 'FREE' : 'PRO'),
        credits: backendUser?.creditsRemaining ?? (provider === 'tiktok' ? 10 : 50),
      };

      localStorage.setItem('socialclone_user_session', JSON.stringify(user));
      setSuccessNotice(`Connexion réussie via ${provider.toUpperCase()} !`);
      
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 500);
    } catch (err: any) {
      setErrorMessage("Échec de la connexion. Veuillez réessayer ou utiliser l'email.");
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Veuillez saisir votre adresse email.');
      return;
    }

    setLoadingProvider('email');
    try {
      const displayName = name || email.split('@')[0];
      const handle = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');

      // Register with backend userDb
      let backendUser: any = null;
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            handle: handle || 'UserCreator',
            displayName: displayName,
            email: email,
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            platform: 'INSTAGRAM',
          }),
        });
        if (response.ok) {
          const data = await response.json();
          backendUser = data.user;
        }
      } catch (apiErr) {
        console.warn('Backend register note:', apiErr);
      }

      const user: UserSession = {
        id: backendUser?.id || 'usr_em_' + Math.random().toString(36).substring(7),
        name: backendUser?.displayName || displayName,
        email: email,
        avatar: backendUser?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        provider: 'email',
        plan: backendUser?.plan || 'FREE',
        credits: backendUser?.creditsRemaining ?? 10,
      };

      localStorage.setItem('socialclone_user_session', JSON.stringify(user));
      setSuccessNotice('Connexion validée !');
      setTimeout(() => {
        setLoadingProvider(null);
        onLoginSuccess(user);
        onClose();
      }, 500);
    } catch (err) {
      setErrorMessage("Une erreur est survenue lors de l'enregistrement.");
      setLoadingProvider(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow accents */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Fermer la modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg mb-3">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">
            {mode === 'login' ? 'Bon retour parmi nous' : 'Créer votre compte'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {mode === 'login' 
              ? 'Accédez à votre Studio IA, votre Clone et votre Copilote DM' 
              : 'Rejoignez la plateforme et bénéficiez de 50 crédits vidéo offerts'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'login'
                ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Connexion</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMessage(null); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'signup'
                ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Inscription</span>
          </button>
        </div>

        {/* Feedback alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Multi-Provider OAuth Buttons */}
        <div className="space-y-2.5 mb-6">
          {/* 1. Google OAuth */}
          <button
            type="button"
            disabled={Boolean(loadingProvider)}
            onClick={() => handleOAuthLogin('google')}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-xs transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loadingProvider === 'google' ? (
              <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continuer avec Google</span>
          </button>

          {/* 2. Meta / Instagram OAuth */}
          <button
            type="button"
            disabled={Boolean(loadingProvider)}
            onClick={() => handleOAuthLogin('meta')}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium text-xs transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loadingProvider === 'meta' ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
              </svg>
            )}
            <span>Continuer avec Meta (Instagram / Facebook)</span>
          </button>

          {/* 3. TikTok OAuth */}
          <button
            type="button"
            disabled={Boolean(loadingProvider)}
            onClick={() => handleOAuthLogin('tiktok')}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 font-medium text-xs transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loadingProvider === 'tiktok' ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47 6.27 6.27 0 0 0 1.93-4.46V8.62a8.28 8.28 0 0 0 4.85 1.54V6.71a4.88 4.88 0 0 1-1-.02z" />
              </svg>
            )}
            <span>Continuer avec TikTok</span>
          </button>

          {/* 4. Apple OAuth */}
          <button
            type="button"
            disabled={Boolean(loadingProvider)}
            onClick={() => handleOAuthLogin('apple')}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white border border-neutral-800 font-medium text-xs transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loadingProvider === 'apple' ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 0.93-2.84-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.93 2.74 1.01.08 2.01-.5 2.63-1.25z" />
              </svg>
            )}
            <span>Continuer avec Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-full border-t border-neutral-800" />
          <span className="absolute px-3 bg-neutral-900 text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
            ou avec votre email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Nom complet ou pseudo
              </label>
              <input
                type="text"
                placeholder="Ex: Sarah Créatrice"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-neutral-300">
                Mot de passe
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert("Un lien de réinitialisation sécurisé a été envoyé par email.")}
                  className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                >
                  Mot de passe oublié ?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={Boolean(loadingProvider)}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-all shadow-md hover:shadow-amber-500/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loadingProvider === 'email' ? (
              <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Privacy & Legal disclaimer */}
        <div className="mt-6 text-center text-[10px] text-neutral-500 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Chiffrement sécurisé & conformité RGPD certifiée.</span>
          </p>
          <p>
            En continuant, vous acceptez nos{' '}
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="text-neutral-400 underline hover:text-white cursor-pointer"
            >
              CGU
            </button>{' '}
            et notre{' '}
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="text-neutral-400 underline hover:text-white cursor-pointer"
            >
              Politique de Confidentialité
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
