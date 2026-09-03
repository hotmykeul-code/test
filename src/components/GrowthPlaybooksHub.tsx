import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Search, 
  Video, 
  Users, 
  Mail, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  DollarSign, 
  Clock, 
  Share2,
  ChevronRight,
  BarChart3,
  Flame,
  Award
} from 'lucide-react';
import { AdScript, EmailFunnelStage, AffiliateDashboardData } from '../types';

interface GrowthPlaybooksHubProps {
  onOpenOnboarding: () => void;
}

export const GrowthPlaybooksHub: React.FC<GrowthPlaybooksHubProps> = ({ onOpenOnboarding }) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'seo_tools' | 'affiliate' | 'emails'>('ads');
  
  // Ad scripts state
  const [adScripts, setAdScripts] = useState<AdScript[]>([]);
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number>(0);

  // SEO Hook generator state
  const [hookTopic, setHookTopic] = useState<string>('création de contenu vidéo');
  const [hookNiche, setHookNiche] = useState<string>('Solopreneurs & Coachs');
  const [generatedHooks, setGeneratedHooks] = useState<any[]>([]);
  const [isGeneratingHooks, setIsGeneratingHooks] = useState<boolean>(false);

  // Safe zones simulator platform
  const [simPlatform, setSimPlatform] = useState<'TIKTOK' | 'INSTAGRAM' | 'SHORTS'>('TIKTOK');

  // Affiliate dashboard state
  const [affiliateData, setAffiliateData] = useState<AffiliateDashboardData>({
    code: 'CLONE-CREATOR-30',
    referralLink: 'https://socialclone.ai/r/CLONE-CREATOR-30',
    commissionRate: '30% récurrent à vie',
    bonusOnboarding: '50 crédits vidéo offerts pour le parrain et le filleul',
    totalClicks: 148,
    referralCount: 19,
    activeSubscribers: 14,
    monthlyRecurringCommissionEur: 37.80,
    totalPaidOutEur: 120.00,
    nextPayoutDate: '2026-09-15',
    payoutThresholdEur: 50.00,
  });

  // Email funnel state
  const [emailStages, setEmailStages] = useState<EmailFunnelStage[]>([]);
  const [selectedEmailStage, setSelectedEmailStage] = useState<number>(0);

  // Copy toast feedback
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  useEffect(() => {
    // 1. Fetch Ad Playbooks
    fetch('/api/growth/playbooks')
      .then((res) => res.json())
      .then((data) => {
        if (data.playbooks) setAdScripts(data.playbooks);
      })
      .catch((err) => console.warn('Playbooks fetch fallback:', err));

    // 2. Fetch Affiliate Stats
    fetch('/api/growth/affiliate/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.affiliate) setAffiliateData(data.affiliate);
      })
      .catch((err) => console.warn('Affiliate stats fetch fallback:', err));

    // 3. Fetch Email Funnel
    fetch('/api/growth/email-funnel')
      .then((res) => res.json())
      .then((data) => {
        if (data.funnel) setEmailStages(data.funnel);
      })
      .catch((err) => console.warn('Email funnel fetch fallback:', err));

    // 4. Initial Hook Generator run
    handleGenerateHooks();
  }, []);

  const handleGenerateHooks = () => {
    setIsGeneratingHooks(true);
    fetch('/api/growth/tools/hook-generator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: hookTopic, niche: hookNiche }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.hooks) setGeneratedHooks(data.hooks);
        setIsGeneratingHooks(false);
      })
      .catch(() => {
        setGeneratedHooks([
          { id: 'h1', pattern: 'Interruption contre-intuitive', text: `« 90% des créateurs font fausse route sur ${hookTopic}. Voici pourquoi : »`, retentionScore: 96 },
          { id: 'h2', pattern: 'Secret 2026', text: `« Le secret que personne ne vous dit sur ${hookTopic} en 2026... »`, retentionScore: 94 },
          { id: 'h3', pattern: 'Méthode chiffrée', text: `« Comment doubler vos résultats sur ${hookTopic} en 3 étapes sans y passer 15h : »`, retentionScore: 95 },
          { id: 'h4', pattern: 'Avertissement direct', text: `« Arrêtez immédiatement de faire cette erreur sur ${hookTopic} ! »`, retentionScore: 92 },
        ]);
        setIsGeneratingHooks(false);
      });
  };

  const currentScript = adScripts[selectedScriptIndex] || adScripts[0];

  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900 relative" id="growth-playbooks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
            <Rocket className="w-3.5 h-3.5" />
            <span>Section 6 • Marketing, SEO, Ads Playbook & Affiliation 30%</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Moteur de Croissance Virale & Playbooks de Conversion
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Exploitez nos scripts publicitaires 9:16 haute conversion, nos outils SEO programmatiques intégrés, notre boucle d'affiliation récurrente à 30% et nos tunnels d'emails automatisés.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 max-w-3xl mx-auto mb-12">
          <button
            onClick={() => setActiveTab('ads')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ads'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Scripts Ads 9:16 (4 Formats)</span>
          </button>

          <button
            onClick={() => setActiveTab('seo_tools')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'seo_tools'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Outils SEO & Safe-Zones</span>
          </button>

          <button
            onClick={() => setActiveTab('affiliate')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'affiliate'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Affiliation 30% & Viral Loop</span>
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'emails'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Tunnel Emails Nurture (H+0 à J+14)</span>
          </button>
        </div>

        {/* TAB 1: 4 HIGH-CONVERTING 9:16 AD SCRIPTS */}
        {activeTab === 'ads' && (
          <div className="space-y-8">
            {/* Script Selection Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {adScripts.map((script, idx) => (
                <button
                  key={script.id || idx}
                  onClick={() => setSelectedScriptIndex(idx)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedScriptIndex === idx
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-lg'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-amber-400">
                      Ad #{idx + 1}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>CPA {script.estimatedCpa}</span>
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">{script.title}</h4>
                  <p className="text-[11px] text-neutral-400">{script.targetPlatform}</p>
                </button>
              ))}
            </div>

            {/* Active Script Breakdown Card */}
            {currentScript && (
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                        {currentScript.targetPlatform}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        Objectif : {currentScript.objective}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{currentScript.title}</h3>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        `${currentScript.title}\n\n` +
                          `1. Accroche (0-3s) :\nVisuel: ${currentScript.scriptSections.hook.visual}\nVoix: ${currentScript.scriptSections.hook.audioVoice}\n\n` +
                          `2. Problème :\nVisuel: ${currentScript.scriptSections.problem.visual}\nVoix: ${currentScript.scriptSections.problem.audioVoice}\n\n` +
                          `3. Solution :\nVisuel: ${currentScript.scriptSections.solution.visual}\nVoix: ${currentScript.scriptSections.solution.audioVoice}\n\n` +
                          `4. CTA :\nVisuel: ${currentScript.scriptSections.cta.visual}\nVoix: ${currentScript.scriptSections.cta.audioVoice}`,
                        'ad-script-copy'
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 border border-neutral-700 transition-all cursor-pointer self-start sm:self-auto"
                  >
                    {copiedKey === 'ad-script-copy' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Script Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-neutral-400" />
                        <span>Copier le Script 9:16</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 4 Timeline Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Step 1: Hook */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-400">1. Accroche Hook ({currentScript.scriptSections.hook.timeframe})</span>
                        <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-mono">Scroll-Stopper</span>
                      </div>
                      <p className="text-xs text-neutral-400 mb-2 font-mono">
                        🎬 Visuel : {currentScript.scriptSections.hook.visual}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white font-medium italic">
                      {currentScript.scriptSections.hook.audioVoice}
                    </div>
                  </div>

                  {/* Step 2: Problem */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-neutral-300">2. Problème / Frustration ({currentScript.scriptSections.problem.timeframe})</span>
                        <span className="text-[10px] bg-red-500/10 text-red-300 px-2 py-0.5 rounded font-mono">Pain Point</span>
                      </div>
                      <p className="text-xs text-neutral-400 mb-2 font-mono">
                        🎬 Visuel : {currentScript.scriptSections.problem.visual}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 font-medium italic">
                      {currentScript.scriptSections.problem.audioVoice}
                    </div>
                  </div>

                  {/* Step 3: Solution */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-400">3. Solution SocialClone AI ({currentScript.scriptSections.solution.timeframe})</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono">Démonstration</span>
                      </div>
                      <p className="text-xs text-neutral-400 mb-2 font-mono">
                        🎬 Visuel : {currentScript.scriptSections.solution.visual}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white font-medium italic">
                      {currentScript.scriptSections.solution.audioVoice}
                    </div>
                  </div>

                  {/* Step 4: CTA */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-400">4. Appel à l'Action ({currentScript.scriptSections.cta.timeframe})</span>
                        <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-mono">+50 Crédits Offerts</span>
                      </div>
                      <p className="text-xs text-neutral-400 mb-2 font-mono">
                        🎬 Visuel : {currentScript.scriptSections.cta.visual}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-medium italic">
                      {currentScript.scriptSections.cta.audioVoice}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SEO TOOLS & SAFE ZONE SIMULATOR */}
        {activeTab === 'seo_tools' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Interactive Viral Hook Generator */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Générateur de Hooks SEO & Viraux</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Score 89-97%
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mb-6">
                  Générez 5 phrases d'accroches percutantes optimisées pour le référencement et la rétention 3 secondes sur vos réseaux sociaux.
                </p>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                      Sujet ou Thématique de votre contenu :
                    </label>
                    <input
                      type="text"
                      value={hookTopic}
                      onChange={(e) => setHookTopic(e.target.value)}
                      placeholder="Ex: Automatisation DM, Investissement, Productivité..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleGenerateHooks}
                      disabled={isGeneratingHooks}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isGeneratingHooks ? 'Génération en cours...' : 'Générer 5 Hooks Viraux'}</span>
                    </button>
                  </div>
                </div>

                {/* Generated Hooks List */}
                <div className="space-y-2.5">
                  {generatedHooks.map((h, i) => (
                    <div
                      key={h.id || i}
                      className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start justify-between gap-3 group hover:border-amber-500/30 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-neutral-500">#{i + 1}</span>
                          <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded">
                            {h.pattern}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">
                            Rétention {h.retentionScore}%
                          </span>
                        </div>
                        <p className="text-xs text-neutral-200 font-medium leading-snug">{h.text}</p>
                      </div>

                      <button
                        onClick={() => handleCopy(h.text, `hook-${i}`)}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer shrink-0"
                        title="Copier le hook"
                      >
                        {copiedKey === `hook-${i}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Safe Zone Simulator Guide & ManyChat Comparison */}
            <div className="lg:col-span-6 space-y-6">
              {/* Safe-Zone Interactive Visualizer */}
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">Simulateur Phone Safe-Zones 2026</h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                    {(['TIKTOK', 'INSTAGRAM', 'SHORTS'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setSimPlatform(p)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          simPlatform === p
                            ? 'bg-amber-500 text-neutral-950'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Résolution standard :</span>
                    <span className="font-mono text-amber-400 font-bold">1080 x 1920 (9:16 Vertical)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block">Marge supérieure</span>
                      <span className="font-mono text-neutral-200">
                        {simPlatform === 'TIKTOK' ? '160 px (8.3%)' : simPlatform === 'INSTAGRAM' ? '140 px (7.3%)' : '120 px (6.2%)'}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block">Marge inférieure</span>
                      <span className="font-mono text-neutral-200">
                        {simPlatform === 'TIKTOK' ? '340 px (17.7%)' : simPlatform === 'INSTAGRAM' ? '280 px (14.5%)' : '240 px (12.5%)'}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Tous les formats générés dans le Studio respectent automatiquement ces marges.</span>
                  </p>
                </div>
              </div>

              {/* Comparison Box */}
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>SocialClone AI vs ManyChat vs Création Manuelle</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-300">Clone Vidéo 9:16 Incarné</span>
                    <span className="font-bold text-emerald-400">SocialClone : Inclus</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-300">Conformité 24h & Verrouillage</span>
                    <span className="font-bold text-emerald-400">SocialClone : 100% Automatique</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-300">Tarification mensuelle</span>
                    <span className="font-bold text-amber-400">SocialClone : 9 €/mois fixe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 30% RECURRING AFFILIATE LOOP */}
        {activeTab === 'affiliate' && (
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Programme Partenaire Officiel</span>
                </div>
                <h3 className="text-2xl font-bold text-white">30 % de Commission Récurrente à Vie</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Partagez votre lien de parrainage. Vos filleuls reçoivent 50 crédits vidéo offerts et vous touchez 30% sur chaque mensualité.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-neutral-500 block">Commissions cumulées</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                  {affiliateData.monthlyRecurringCommissionEur.toFixed(2)} € <span className="text-xs text-neutral-400 font-normal">/ mois</span>
                </span>
              </div>
            </div>

            {/* Referral Link Copy Block */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Share2 className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-neutral-500 font-semibold block uppercase">Votre lien d'affiliation unique</span>
                  <span className="text-xs text-white font-mono font-medium">{affiliateData.referralLink}</span>
                </div>
              </div>

              <button
                onClick={() => handleCopy(affiliateData.referralLink, 'affiliate-link')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedKey === 'affiliate-link' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Lien Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copier mon Lien Partenaire</span>
                  </>
                )}
              </button>
            </div>

            {/* Metrics 4 Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                <span className="text-xs text-neutral-500 block mb-1">Clics uniques</span>
                <span className="text-xl font-extrabold text-white">{affiliateData.totalClicks}</span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                <span className="text-xs text-neutral-500 block mb-1">Inscriptions</span>
                <span className="text-xl font-extrabold text-white">{affiliateData.referralCount}</span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                <span className="text-xs text-neutral-500 block mb-1">Abonnements Pro</span>
                <span className="text-xl font-extrabold text-emerald-400">{affiliateData.activeSubscribers}</span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
                <span className="text-xs text-neutral-500 block mb-1">Déjà versé</span>
                <span className="text-xl font-extrabold text-amber-400">{affiliateData.totalPaidOutEur.toFixed(2)} €</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-200">
              <span>🎁 Bonus Onboarding : +50 crédits vidéo injectés dès que votre filleul valide son premier clip.</span>
              <button
                onClick={onOpenOnboarding}
                className="font-bold underline hover:text-white cursor-pointer shrink-0 ml-4"
              >
                Créer un compte d'affiliation →
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: 5-STAGE EMAIL NURTURE FUNNEL */}
        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {emailStages.map((stage, idx) => (
                <button
                  key={stage.stage || idx}
                  onClick={() => setSelectedEmailStage(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedEmailStage === idx
                      ? 'bg-amber-500 text-neutral-950 border-amber-500'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{stage.stage}</span>
                </button>
              ))}
            </div>

            {emailStages[selectedEmailStage] && (
              <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Étape {emailStages[selectedEmailStage].stage} • {emailStages[selectedEmailStage].trigger}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {emailStages[selectedEmailStage].subject}
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        `Objet : ${emailStages[selectedEmailStage].subject}\n` +
                          `Aperçu : ${emailStages[selectedEmailStage].previewText}\n` +
                          `Objectif : ${emailStages[selectedEmailStage].objective}\n` +
                          `Lien CTA : ${emailStages[selectedEmailStage].ctaUrl}`,
                        'email-copy'
                      )
                    }
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === 'email-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copier l'Email</span>
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-500 block mb-1">Texte de prévisualisation (Inbox Preview) :</span>
                    <p className="text-neutral-200 italic">{emailStages[selectedEmailStage].previewText}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-500 block mb-1">Objectif Stratégique :</span>
                    <p className="text-white font-semibold">{emailStages[selectedEmailStage].objective}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-400">Bouton d'action (CTA Link) :</span>
                    <span className="text-amber-400 font-mono font-medium">{emailStages[selectedEmailStage].ctaUrl}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
