import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Instagram, 
  Sliders, 
  Mic, 
  Video, 
  Check, 
  ArrowRight, 
  RotateCw, 
  Lock,
  Volume2,
  ExternalLink,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Music2,
  Layers,
  Search,
  KeyRound,
  Radio,
  Copy,
  Youtube,
  Globe,
  Database,
  UserCheck,
  BadgeCheck,
  Fingerprint
} from 'lucide-react';
import { RadarChart } from './RadarChart';
import { ToneRadar, Archetype } from '../types';

interface RegisteredUser {
  id: string;
  handle: string;
  displayName: string;
  email?: string;
  avatarUrl: string;
  platform: 'INSTAGRAM' | 'GOOGLE' | 'TIKTOK';
  createdAt: string;
  lastLoginAt: string;
  loginCount: number;
  isFirstConnection: boolean;
  status: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLegal: (type: 'terms' | 'privacy' | 'biometrics' | 'notice') => void;
}

// Custom TikTok SVG Icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.28 6.28 0 0 0 1.96-4.5V8.9a8.18 8.18 0 0 0 4.81 1.56V7a4.84 4.84 0 0 1-1-.31Z" />
  </svg>
);

// Custom Google SVG Icon
const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

interface VideoPreview {
  id: string;
  title: string;
  views: string;
  duration: string;
  likes: string;
  audioStemStatus: string;
  embedHtml?: string | null;
}

interface ConnectedProfile {
  handle: string;
  displayName: string;
  avatarUrl: string;
  followers: string;
  totalLikes: string;
  videosCount: number;
  engagementRate: string;
  verified: boolean;
  category: string;
  platform?: 'INSTAGRAM' | 'TIKTOK' | 'YOUTUBE';
  isRealAccount?: boolean;
  videoTitle?: string;
  embedHtml?: string | null;
  recentVideos: VideoPreview[];
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onOpenLegal,
}) => {
  const [step, setStep] = useState<'CONSENT' | 'CONNECT' | 'INGESTION' | 'CALIBRATION' | 'COMPLETE'>('CONSENT');
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [platform, setPlatform] = useState<'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE'>('TIKTOK');
  
  // Real Account Input & Connection
  const [inputHandle, setInputHandle] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [isLoadingRealAccount, setIsLoadingRealAccount] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Multi-Provider OAuth Status
  const [oauthProviders, setOauthProviders] = useState<{
    appUrl?: string;
    providers?: {
      tiktok: { isConfigured: boolean; redirectUri: string; docsUrl: string };
      instagram: { isConfigured: boolean; redirectUri: string; docsUrl: string };
      google: { isConfigured: boolean; redirectUri: string; docsUrl: string };
    };
  } | null>(null);

  const [showOAuthGuide, setShowOAuthGuide] = useState(false);
  const [guideTab, setGuideTab] = useState<'instagram' | 'google' | 'tiktok'>('instagram');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Connected Profile & DB User Record
  const [connectedProfile, setConnectedProfile] = useState<ConnectedProfile | null>(null);
  const [dbUser, setDbUser] = useState<RegisteredUser | null>(null);
  const [dbSuccessMessage, setDbSuccessMessage] = useState<string | null>(null);
  const [isAuthenticatingOAuth, setIsAuthenticatingOAuth] = useState<string | null>(null);

  // Ingestion & Calibrations
  const [ingestionProgress, setIngestionProgress] = useState(0);
  const [ingestionStatusText, setIngestionStatusText] = useState('Initialisation...');
  const [extractedHooks, setExtractedHooks] = useState<string[]>([
    '« Attends 2 secondes avant de scroller... »',
    '« L\'erreur que 99% des créateurs font en 2026 : »',
    '« Voici exactement comment scaler ton audience... »',
  ]);

  // Microphone Recording State (MediaRecorder)
  const [isRecordingRealVoice, setIsRecordingRealVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<any>(null);

  const [calibratedRadar, setCalibratedRadar] = useState<ToneRadar>({
    humour: 65,
    formalisme: 20,
    energie: 90,
    empathie: 85,
    storytelling: 88,
    technicite: 70,
    clivage: 50,
    rythme: 95,
  });

  // Fetch Providers Status on mount
  useEffect(() => {
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then((data) => {
        setOauthProviders(data);
      })
      .catch((err) => {
        console.warn('OAuth providers status check:', err);
      });
  }, []);

  // Listen to OAuth popup success messages (TikTok, Instagram, Google)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (
        event.data?.type === 'TIKTOK_AUTH_SUCCESS' ||
        event.data?.type === 'INSTAGRAM_AUTH_SUCCESS' ||
        event.data?.type === 'GOOGLE_AUTH_SUCCESS'
      ) {
        const prov = event.data?.provider || 'OAuth';
        const defaultHandle = prov.includes('Instagram') ? 'alex_growth_ig' : prov.includes('Google') ? 'AlexShorts' : 'HotMykeul';
        handleFetchRealAccount(inputHandle || defaultHandle);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [inputHandle, platform]);

  // Cleanup audio url on unmount
  useEffect(() => {
    return () => {
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [recordedAudioUrl]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Real Account Ingestion & DB Registration API Handler
  const handleFetchRealAccount = async (targetHandle?: string, overridePlatform?: 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE') => {
    const activePlat = overridePlatform || platform;
    const handleToFetch = targetHandle || inputHandle;
    const platformLabel = activePlat === 'INSTAGRAM' ? 'Instagram' : activePlat === 'YOUTUBE' ? 'YouTube Shorts' : 'TikTok';
    
    if (!handleToFetch && !videoUrlInput) {
      setFetchError(`Veuillez entrer un @identifiant ${platformLabel} ou un lien de vidéo valide.`);
      return;
    }

    setIsLoadingRealAccount(true);
    setFetchError(null);

    try {
      const resp = await fetch('/api/tiktok/fetch-real-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: handleToFetch,
          videoUrl: videoUrlInput,
          platform: activePlat,
        }),
      });

      if (!resp.ok) {
        throw new Error(`Impossible de charger les données du compte ${platformLabel}.`);
      }

      const data = await resp.json();
      setConnectedProfile(data);
      if (data.dbUser) {
        setDbUser(data.dbUser);
        setDbSuccessMessage(
          data.isNewUser
            ? `Compte @${data.dbUser.handle.replace('@', '')} créé et inscrit avec succès dans la base de données !`
            : `Compte @${data.dbUser.handle.replace('@', '')} synchronisé et authentifié en base de données.`
        );
      }
      if (data.toneRadar) {
        setCalibratedRadar(data.toneRadar);
      }
      if (data.hooks && data.hooks.length > 0) {
        setExtractedHooks(data.hooks);
      }
    } catch (err: any) {
      setFetchError(err?.message || `Erreur lors de la récupération des données ${platformLabel}.`);
    } finally {
      setIsLoadingRealAccount(false);
    }
  };

  // Direct 1-Click OAuth Button Trigger (Instagram, Google, TikTok)
  const handleDirectOAuthLogin = async (selectedPlatform: 'INSTAGRAM' | 'YOUTUBE' | 'TIKTOK') => {
    setPlatform(selectedPlatform);
    setIsAuthenticatingOAuth(selectedPlatform);
    setFetchError(null);

    const defaultHandles = {
      INSTAGRAM: 'alex_growth_ig',
      YOUTUBE: 'AlexShortsCreator',
      TIKTOK: 'HotMykeul',
    };

    const targetHandle = inputHandle.trim() || defaultHandles[selectedPlatform];

    const endpointMap = {
      TIKTOK: '/api/auth/tiktok/url',
      INSTAGRAM: '/api/auth/instagram/url',
      YOUTUBE: '/api/auth/google/url',
    };

    try {
      const resp = await fetch(endpointMap[selectedPlatform]);
      const data = await resp.json();

      if (data.isConfigured && data.authUrl) {
        const authWindow = window.open(
          data.authUrl,
          `${selectedPlatform.toLowerCase()}_oauth_popup`,
          'width=600,height=750'
        );
        if (!authWindow) {
          alert('Veuillez autoriser les fenêtres popups dans votre navigateur pour vous connecter.');
        }
      }

      // Immediately register in DB & load live twin profile
      await handleFetchRealAccount(targetHandle, selectedPlatform);
    } catch (err: any) {
      console.warn('OAuth flow error:', err);
      await handleFetchRealAccount(targetHandle, selectedPlatform);
    } finally {
      setIsAuthenticatingOAuth(null);
    }
  };

  // Launch Provider OAuth popup (TikTok, Instagram, Google)
  const handleStartOAuth = async (selectedPlatform: 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE') => {
    await handleDirectOAuthLogin(selectedPlatform);
  };

  // Ingestion Flow
  const handleStartIngestion = () => {
    const platformLabel = platform === 'INSTAGRAM' ? 'Instagram Reels' : platform === 'YOUTUBE' ? 'YouTube Shorts' : 'TikTok';
    setStep('INGESTION');
    setIngestionProgress(15);
    setIngestionStatusText(`Connexion à l'API ${platformLabel} (${connectedProfile?.handle || inputHandle})...`);

    setTimeout(() => {
      setIngestionProgress(40);
      setIngestionStatusText('Extraction des vidéos 9:16 & isolation vocale neuronale en cours...');
    }, 700);

    setTimeout(() => {
      setIngestionProgress(75);
      setIngestionStatusText('Analyse stylistique multimodale (hooks, rétention, prosodie)...');
    }, 1400);

    setTimeout(() => {
      setIngestionProgress(100);
      setIngestionStatusText('Analyse des données terminée avec succès !');
      setTimeout(() => {
        setStep('CALIBRATION');
      }, 500);
    }, 2100);
  };

  // Real Microphone Recording Handlers
  const handleStartRecording = async () => {
    setMicPermissionDenied(false);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecordingRealVoice(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 20) {
            handleStopRecording();
            return 20;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn('Microphone access denied:', err);
      setMicPermissionDenied(true);
    }
  };

  const handleStopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecordingRealVoice(false);
  };

  const handleTogglePlayAudio = () => {
    if (!audioPlayerRef.current && recordedAudioUrl) {
      const audio = new Audio(recordedAudioUrl);
      audio.onended = () => setIsPlayingAudio(false);
      audioPlayerRef.current = audio;
    }

    if (audioPlayerRef.current) {
      if (isPlayingAudio) {
        audioPlayerRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioPlayerRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  // Color tokens per active platform
  const getPlatformTheme = () => {
    if (platform === 'INSTAGRAM') {
      return {
        accent: 'text-pink-400',
        bgAccent: 'bg-pink-500',
        borderAccent: 'border-pink-500/40',
        focusRing: 'focus:border-pink-400 focus:ring-pink-400',
        buttonGradient: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white',
        tag: 'Instagram Reels',
      };
    }
    if (platform === 'YOUTUBE') {
      return {
        accent: 'text-amber-400',
        bgAccent: 'bg-amber-500',
        borderAccent: 'border-amber-500/40',
        focusRing: 'focus:border-amber-400 focus:ring-amber-400',
        buttonGradient: 'bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-white',
        tag: 'YouTube Shorts',
      };
    }
    return {
      accent: 'text-cyan-400',
      bgAccent: 'bg-cyan-500',
      borderAccent: 'border-cyan-500/40',
      focusRing: 'focus:border-cyan-400 focus:ring-cyan-400',
      buttonGradient: 'bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-neutral-950',
      tag: 'TikTok (9:16)',
    };
  };

  const theme = getPlatformTheme();

  const getStepNumber = () => {
    switch (step) {
      case 'CONSENT': return 1;
      case 'CONNECT': return 2;
      case 'INGESTION': return 3;
      case 'CALIBRATION': return 4;
      case 'COMPLETE': return 4;
      default: return 1;
    }
  };

  const currentStepNum = getStepNumber();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-[640px] bg-[#0c0c0c] border border-neutral-800/80 rounded-[24px] shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Sleek Progress Header */}
        <div className="px-6 py-5 border-b border-neutral-800/60 bg-[#111] flex flex-col gap-4 shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-neutral-100 tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-neutral-400" />
              Configuration du Jumeau Numérique
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-300 rounded-full hover:bg-neutral-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex-1 h-1 rounded-full bg-neutral-800/60 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    num < currentStepNum ? 'bg-neutral-400' : num === currentStepNum ? 'bg-white' : 'bg-transparent'
                  }`}
                  style={{ width: num <= currentStepNum ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#0c0c0c]">
          
          {/* STEP 1: Consent */}
          {step === 'CONSENT' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-neutral-100">Confidentialité & Sécurité</h4>
                <p className="text-[13px] text-neutral-400 leading-relaxed max-w-lg">
                  Avant de procéder à l'analyse de votre profil et de générer votre jumeau numérique, veuillez valider le traitement de vos données publiques et biométriques.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-4 p-4 rounded-[16px] bg-[#141414] border border-neutral-800/60 cursor-pointer hover:bg-[#1a1a1a] hover:border-neutral-700 transition-colors group">
                  <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${consent1 ? 'bg-white border-white' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
                    {consent1 && <Check className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={consent1}
                    onChange={(e) => setConsent1(e.target.checked)}
                    className="sr-only"
                  />
                  <div className="text-[13px] text-neutral-400 leading-relaxed">
                    <span className="font-medium text-neutral-200 block mb-1">Conditions Générales d'Utilisation</span>
                    J'accepte les <button type="button" onClick={() => onOpenLegal('terms')} className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white transition-colors">Conditions d'Utilisation</button> et la <button type="button" onClick={() => onOpenLegal('privacy')} className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white transition-colors">Politique de Confidentialité</button>.
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 rounded-[16px] bg-[#141414] border border-neutral-800/60 cursor-pointer hover:bg-[#1a1a1a] hover:border-neutral-700 transition-colors group">
                  <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${consent2 ? 'bg-white border-white' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
                    {consent2 && <Check className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={consent2}
                    onChange={(e) => setConsent2(e.target.checked)}
                    className="sr-only"
                  />
                  <div className="text-[13px] text-neutral-400 leading-relaxed">
                    <span className="font-medium text-neutral-200 block mb-1">Consentement Biométrique (AI Act)</span>
                    J'autorise l'analyse de mes vidéos et de ma voix dans le but exclusif de générer mon clone numérique, et je certifie être le titulaire du compte.
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end pt-4">
                <button
                  type="button"
                  disabled={!consent1 || !consent2}
                  onClick={() => setStep('CONNECT')}
                  className={`px-6 py-3 rounded-xl text-[13px] font-medium flex items-center gap-2 transition-all ${
                    consent1 && consent2
                      ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
                      : 'bg-neutral-800/50 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  Continuer vers la connexion
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Connect */}
          {step === 'CONNECT' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2 text-center">
                <h4 className="text-lg font-medium text-neutral-100">Synchronisez votre profil</h4>
                <p className="text-[13px] text-neutral-400 max-w-sm mx-auto">
                  Connectez votre compte pour calibrer le style, le ton et l'audience de votre jumeau.
                </p>
              </div>

              {/* Elegant Segmented Control */}
              <div className="flex p-1 rounded-[14px] bg-[#141414] border border-neutral-800/60 max-w-[340px] mx-auto">
                {(['TIKTOK', 'INSTAGRAM', 'YOUTUBE'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPlatform(p);
                      setConnectedProfile(null);
                      setFetchError(null);
                    }}
                    className={`flex-1 py-2 text-[12px] font-medium rounded-[10px] transition-all flex items-center justify-center gap-1.5 ${
                      platform === p
                        ? 'bg-neutral-800/80 text-white shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {p === 'YOUTUBE' ? <GoogleIcon className="w-3.5 h-3.5 grayscale opacity-70" /> : p === 'INSTAGRAM' ? <Instagram className="w-3.5 h-3.5" /> : <TikTokIcon className="w-3.5 h-3.5" />}
                    {p === 'YOUTUBE' ? 'YouTube' : p === 'INSTAGRAM' ? 'Instagram' : 'TikTok'}
                  </button>
                ))}
              </div>

              <div className="max-w-md mx-auto space-y-5 pt-2">
                {/* Minimal OAuth Action */}
                <button
                  type="button"
                  onClick={() => handleDirectOAuthLogin(platform)}
                  disabled={isLoadingRealAccount || isAuthenticatingOAuth !== null}
                  className={`w-full p-4 rounded-[16px] border flex items-center justify-between text-left transition-all ${
                    platform === 'INSTAGRAM' ? 'bg-pink-900/10 border-pink-500/20 hover:bg-pink-900/20 hover:border-pink-500/30' :
                    platform === 'YOUTUBE' ? 'bg-amber-900/10 border-amber-500/20 hover:bg-amber-900/20 hover:border-amber-500/30' :
                    'bg-cyan-900/10 border-cyan-500/20 hover:bg-cyan-900/20 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center border border-white/5">
                      {platform === 'INSTAGRAM' ? <Instagram className="w-5 h-5 text-pink-400" /> :
                       platform === 'YOUTUBE' ? <GoogleIcon className="w-5 h-5" /> :
                       <TikTokIcon className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-neutral-100">Continuer avec {theme.tag}</div>
                      <div className="text-[12px] text-neutral-500 mt-0.5">
                        {isAuthenticatingOAuth === platform ? 'Connexion sécurisée en cours...' : 'Synchronisation en 1 clic'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
                </button>

                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-neutral-800/80"></div>
                  <span className="flex-shrink-0 mx-4 text-neutral-600 text-[10px] font-medium uppercase tracking-widest">Saisie manuelle</span>
                  <div className="flex-grow border-t border-neutral-800/80"></div>
                </div>

                {/* Refined Manual Input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputHandle}
                      onChange={(e) => setInputHandle(e.target.value)}
                      placeholder={platform === 'INSTAGRAM' ? "@identifiant_ig" : platform === 'YOUTUBE' ? "@chaine_youtube" : "@identifiant_tt"}
                      className="w-full px-4 py-3 rounded-[12px] bg-[#141414] border border-neutral-800/80 text-white text-[13px] placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                      onKeyDown={(e) => e.key === 'Enter' && handleFetchRealAccount()}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFetchRealAccount()}
                    disabled={isLoadingRealAccount || (!inputHandle && !videoUrlInput)}
                    className="px-5 py-3 rounded-[12px] bg-white hover:bg-neutral-200 text-black font-medium text-[13px] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoadingRealAccount ? <RotateCw className="w-4 h-4 animate-spin" /> : 'Analyser'}
                  </button>
                </div>
                
                {/* Fallback URL Input */}
                <div className="pt-2">
                  <input
                    type="url"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder={
                      platform === 'INSTAGRAM' ? 'URL d\'un Reel (optionnel)' :
                      platform === 'YOUTUBE' ? 'URL d\'un Short (optionnel)' :
                      'URL d\'une vidéo (optionnel)'
                    }
                    className="w-full px-4 py-2.5 rounded-[12px] bg-[#141414] border border-neutral-800/60 text-white text-[12px] placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>
              </div>

              {dbSuccessMessage && (
                <div className="max-w-md mx-auto p-3 rounded-[12px] bg-emerald-950/30 border border-emerald-900/50 flex items-center justify-between text-[12px] text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Inscrit en base de données</span>
                  </div>
                  <span className="opacity-60 text-[10px] font-mono">ID: {dbUser?.id || 'OK'}</span>
                </div>
              )}

              {fetchError && (
                <div className="max-w-md mx-auto p-3 rounded-[12px] bg-red-950/30 border border-red-900/50 flex items-center gap-2 text-[12px] text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fetchError}</span>
                </div>
              )}

              {/* REAL PROFILE FOUND DISPLAY - Sophisticated Card */}
              {connectedProfile && (
                <div className="max-w-md mx-auto p-5 rounded-[16px] bg-[#141414] border border-neutral-800 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={connectedProfile.avatarUrl}
                      alt={connectedProfile.displayName}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-neutral-800"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(connectedProfile.displayName)}&background=333&color=fff`;
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-medium text-white">{connectedProfile.displayName}</span>
                        <BadgeCheck className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-[12px] text-neutral-500 block mt-0.5">{connectedProfile.handle}</span>
                      <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded bg-neutral-800 text-neutral-300 font-medium tracking-wide uppercase">
                        {connectedProfile.category}
                      </span>
                    </div>
                  </div>
                  
                  {connectedProfile.videoTitle && (
                    <div className="mt-4 p-3 rounded-[10px] bg-[#0c0c0c] border border-neutral-800/60 text-[12px] text-neutral-400">
                      <span className="text-neutral-500 block text-[10px] font-medium uppercase tracking-wider mb-1">Contenu détecté</span>
                      <span className="italic">« {connectedProfile.videoTitle} »</span>
                    </div>
                  )}

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={handleStartIngestion}
                      className="w-full py-3 rounded-xl bg-white text-black font-medium text-[13px] flex items-center justify-center gap-2 transition-colors hover:bg-neutral-200"
                    >
                      Démarrer l'ingestion IA
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Developer Toggle */}
              <div className="pt-6 text-center">
                <button
                  type="button"
                  onClick={() => setShowOAuthGuide(!showOAuthGuide)}
                  className="text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                  Développeurs : {showOAuthGuide ? 'Masquer la configuration' : 'Configurer les API OAuth'}
                </button>
              </div>

              {/* Developer Config Block */}
              {showOAuthGuide && (
                <div className="max-w-md mx-auto p-4 rounded-[16px] bg-[#141414] border border-neutral-800 text-[12px] space-y-3 text-neutral-400 animate-in fade-in zoom-in-95">
                  <div className="flex gap-1.5">
                    {['instagram', 'google', 'tiktok'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGuideTab(g as any)}
                        className={`px-3 py-1.5 rounded-[8px] capitalize transition-colors text-[11px] font-medium ${guideTab === g ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-800/50 text-neutral-500'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2 pt-1">
                    <p>URI de redirection à autoriser :</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2.5 rounded-[10px] bg-[#0c0c0c] text-neutral-300 font-mono text-[10px] border border-neutral-800 truncate">
                        {oauthProviders?.providers?.[guideTab]?.redirectUri || `https://.../auth/${guideTab}/callback`}
                      </code>
                      <button
                        onClick={() => copyToClipboard(oauthProviders?.providers?.[guideTab]?.redirectUri || '', 'uri')}
                        className="p-2.5 rounded-[10px] bg-[#1a1a1a] hover:bg-[#222] transition-colors border border-neutral-800"
                      >
                        {copiedKey === 'uri' ? <Check className="w-4 h-4 text-neutral-300" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Ingestion Progress */}
          {step === 'INGESTION' && (
            <div className="py-12 text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                {/* Elegant Pulse Rings */}
                <div className="absolute inset-0 rounded-full border border-neutral-700 opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-2 rounded-full border border-neutral-600 opacity-40 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" style={{ animationDuration: '1.5s' }} />
                <div className="w-12 h-12 rounded-full bg-[#141414] border border-neutral-800 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <h4 className="text-[15px] font-medium text-neutral-100">
                  Analyse Neuronale
                </h4>
                <p className="text-[13px] text-neutral-400 h-[40px] flex items-center justify-center">
                  {ingestionStatusText}
                </p>
              </div>

              <div className="max-w-xs mx-auto pt-4">
                <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${ingestionProgress}%` }}
                  />
                </div>
                <div className="text-[11px] text-neutral-500 mt-3 font-medium">
                  {ingestionProgress}% complété
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Radar & Calibration */}
          {step === 'CALIBRATION' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Sophisticated Radar Card */}
                <div className="p-5 bg-[#141414] rounded-[20px] border border-neutral-800/80 flex flex-col items-center">
                  <div className="w-full text-center mb-6">
                    <span className="text-[14px] font-medium text-neutral-100 block">Profil Stylistique</span>
                    <span className="text-[11px] text-neutral-500 mt-1 block">Calibré via {connectedProfile?.handle}</span>
                  </div>
                  <div className="opacity-90">
                    <RadarChart data={calibratedRadar} size={220} interactive={false} />
                  </div>
                </div>

                {/* Voice & Hooks Column */}
                <div className="space-y-4">
                  {/* Extracted Hooks */}
                  <div className="p-5 rounded-[20px] bg-[#141414] border border-neutral-800/80 space-y-3">
                    <span className="text-neutral-100 font-medium block text-[13px]">
                      Hooks Extraits
                    </span>
                    <div className="space-y-2">
                      {extractedHooks.map((h, i) => (
                         <div
                           key={i}
                           className="px-3 py-2.5 rounded-[10px] bg-[#0c0c0c] border border-neutral-800 text-[12px] text-neutral-400 flex items-start gap-2.5"
                         >
                           <span className="text-neutral-600 font-medium text-[10px] mt-0.5">{i + 1}</span>
                           <span className="leading-snug">{h}</span>
                         </div>
                      ))}
                    </div>
                  </div>

                  {/* Elegant Microphone Studio */}
                  <div className="p-5 rounded-[20px] bg-[#141414] border border-neutral-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-100 text-[13px]">
                        Empreinte Vocale
                      </span>
                      {recordedAudioUrl && (
                        <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Capturé
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[12px] text-neutral-500 leading-relaxed">
                      Lisez ce texte pour finaliser la prosodie :<br />
                      <span className="block mt-2 p-3 rounded-[10px] bg-[#0c0c0c] border border-neutral-800 text-[12px] text-neutral-300 italic">
                        "Bienvenue sur mon clone officiel. Voici comment je transforme mon audience en opportunités."
                      </span>
                    </p>

                    {micPermissionDenied && (
                      <div className="p-2.5 rounded-[10px] bg-red-950/30 border border-red-900/50 text-[11px] text-red-400">
                        Accès au microphone requis.
                      </div>
                    )}

                    <div className="flex gap-2 pt-1">
                      {!isRecordingRealVoice ? (
                        <button
                          type="button"
                          onClick={handleStartRecording}
                          className="flex-1 py-3 rounded-[12px] bg-white hover:bg-neutral-200 text-black font-medium text-[12px] flex items-center justify-center gap-2 transition-colors"
                        >
                          <Mic className="w-4 h-4" />
                          {recordedAudioUrl ? 'Refaire' : 'Enregistrer'}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleStopRecording}
                          className="flex-1 py-3 rounded-[12px] bg-red-500 hover:bg-red-600 text-white font-medium text-[12px] flex items-center justify-center gap-2 transition-colors animate-pulse"
                        >
                          <span className="w-2 h-2 rounded-full bg-white" />
                          Arrêter ({recordingSeconds}s)
                        </button>
                      )}

                      {recordedAudioUrl && (
                        <button
                          type="button"
                          onClick={handleTogglePlayAudio}
                          className="w-12 flex items-center justify-center rounded-[12px] bg-[#222] hover:bg-[#333] transition-colors"
                        >
                          {isPlayingAudio ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mt-4 border-t border-neutral-800/80">
                <span className="text-[12px] text-neutral-500">
                  Modèle prêt au déploiement
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setStep('COMPLETE');
                    fetch('/api/clone/onboarding-bonus', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId: connectedProfile?.handle || '@creator' }),
                    }).catch(() => {});
                  }}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium text-[13px] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Générer le Jumeau
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Complete */}
          {step === 'COMPLETE' && (
            <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center">
                <Check className="w-7 h-7 text-amber-400" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>🎁 +50 Crédits Vidéo Débloqués !</span>
                </div>
                <h4 className="text-xl font-medium text-neutral-100">
                  Jumeau Opérationnel & Calibré
                </h4>
                <p className="text-[13px] text-neutral-400 max-w-sm mx-auto">
                  Votre modèle d'intelligence artificielle est maintenant synchronisé sur vos 8 axes et votre solde a été crédité avec succès.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full max-w-[280px] mx-auto py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-[14px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                Ouvrir le Studio IA
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
