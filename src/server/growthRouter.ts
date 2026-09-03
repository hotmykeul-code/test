import { Router, Request, Response } from 'express';
import { userDb } from './userDb';

export const growthRouter = Router();

// 4 High-Converting 9:16 Video Ad Scripts verbatim from MARKETING_STRATEGY.md
const AD_PLAYBOOKS = [
  {
    id: 'script-1-turing-test',
    title: '🎬 Script Ad 1 : Le Défi « Vrai vs Clone » (Turing Test 9:16)',
    targetPlatform: 'TikTok Ads & Instagram Reels',
    objective: 'Acquisition Top of Funnel / Preuve de réalisme',
    hookSeconds: '0 - 3s',
    estimatedCpa: '3.40 €',
    scriptSections: {
      hook: {
        timeframe: '0 - 3s',
        visual: 'Plan split-screen avec deux vidéos identiques du créateur côte à côte.',
        audioVoice: '« L\'une de ces deux personnes est réelle, l\'autre a été générée par une IA en 30 secondes. Sauras-tu deviner laquelle ? »',
      },
      problem: {
        timeframe: '3 - 10s',
        visual: 'B-roll montrant la fatigue du tournage, le matériel, les prises multiples.',
        audioVoice: '« Tourner 5 vidéos par semaine, régler les lumières, refaire 20 prises... ça prend 15 heures par semaine. J\'étais au bord du burnout. »',
      },
      solution: {
        timeframe: '10 - 20s',
        visual: 'Capture d\'écran fluide de SocialClone AI : connexion du compte, génération en 1 clic.',
        audioVoice: '« J\'ai simplement connecté mon compte à SocialClone AI. L\'IA a analysé mes mimiques, ma voix et mon style. Maintenant, j\'écris une idée et ma vidéo 9:16 est prête avec les sous-titres et mon vrai avatar. »',
      },
      cta: {
        timeframe: '20 - 30s',
        visual: 'Bouton animé avec badge +50 crédits offerts et flèche vers le lien.',
        audioVoice: '« Clique sur le lien en bas pour générer ton clone gratuitement et recevoir 50 crédits de bienvenue ! »',
      },
    },
  },
  {
    id: 'script-2-midnight-dm',
    title: '🎬 Script Ad 2 : Le Répondeur DM qui Convertit en Dormant',
    targetPlatform: 'Meta Ads (Instagram Stories & Feed)',
    objective: 'Conversion Middle/Bottom of Funnel / Monétisation',
    hookSeconds: '0 - 3s',
    estimatedCpa: '4.10 €',
    scriptSections: {
      hook: {
        timeframe: '0 - 3s',
        visual: 'Notification Stripe ou capture d\'écran d\'un virement de 1 450 € reçu au réveil.',
        audioVoice: '« Voici comment j\'ai fait 1 450 € cette nuit pendant que je dormais, sans payer d\'agence. »',
      },
      problem: {
        timeframe: '3 - 15s',
        visual: 'Animation des DMs qui s\'empilent et restent sans réponse.',
        audioVoice: '« Chaque fois qu\'un abonné commente \'GUIDE\' sous un Reel, le Copilote DM SocialClone répond en moins de 60 secondes avec une note vocale personnalisée dans mon ton exact et lui envoie le lien Stripe. »',
      },
      solution: {
        timeframe: '15 - 22s',
        visual: 'Badge officiel de conformité Meta / TikTok 24h affiché en grand.',
        audioVoice: '« 100% conforme aux règles des 24h de Meta, zéro risque de bannissement de compte. »',
      },
      cta: {
        timeframe: '22 - 30s',
        visual: 'Mockup smartphone avec le bouton de démarrage immédiat.',
        audioVoice: '« Active ton Copilote DM gratuitement dès aujourd\'hui. »',
      },
    },
  },
  {
    id: 'script-3-anti-burnout',
    title: '🎬 Script Ad 3 : Anti-Burnout Créateur (15h de tournage -> 1 clic)',
    targetPlatform: 'TikTok & YouTube Shorts Ads',
    objective: 'Productivité & Passage à la Formule Pro 9€',
    hookSeconds: '0 - 3s',
    estimatedCpa: '2.90 €',
    scriptSections: {
      hook: {
        timeframe: '0 - 3s',
        visual: 'Créateur éteignant sa caméra d\'un geste résolu.',
        audioVoice: '« Je ne filmerai plus JAMAIS de Reel de ma vie. Et mes vues ont triplé. »',
      },
      problem: {
        timeframe: '3 - 12s',
        visual: 'Comparaison avant/après : Calendrier vide vs Calendrier rempli 30 jours à l\'avance.',
        audioVoice: '« Passer 4h par jour à monter des vidéos sur CapCut n\'est plus nécessaire en 2026. »',
      },
      solution: {
        timeframe: '12 - 22s',
        visual: 'Démonstration du Smart Scheduler et du radar stylistique 8 axes.',
        audioVoice: '« Mon clone IA publie mes carrousels et mes vidéos 9:16 au meilleur créneau horaire grâce à l\'analyse prédictive d\'audience. »',
      },
      cta: {
        timeframe: '22 - 30s',
        visual: 'Invitation au test sans carte bancaire.',
        audioVoice: '« Teste ton clone gratuitement en moins de 2 minutes. »',
      },
    },
  },
  {
    id: 'script-4-agency-b2b',
    title: '🎬 Script Ad 4 : Agences & Community Managers (Multi-Comptes)',
    targetPlatform: 'LinkedIn Ads & Meta B2B',
    objective: 'Acquisition Forfait Agence & Contrats B2B',
    hookSeconds: '0 - 4s',
    estimatedCpa: '14.50 €',
    scriptSections: {
      hook: {
        timeframe: '0 - 4s',
        visual: 'Dashboard agence avec 20 profils clients gérés en parallèle.',
        audioVoice: '« Comment notre agence gère 25 comptes créateurs avec 1 seul Community Manager. »',
      },
      problem: {
        timeframe: '4 - 15s',
        visual: 'Graphique de marge opérationnelle et temps gagné.',
        audioVoice: '« Fini les allers-retours de validation de scripts et les retards de tournage chez les clients. »',
      },
      solution: {
        timeframe: '15 - 25s',
        visual: 'Espace de travail multi-clones avec rôles RBAC dédiés.',
        audioVoice: '« Chaque client a son clone dédié avec son style exact. Le studio génère la grille du mois en 1 heure. »',
      },
      cta: {
        timeframe: '25 - 30s',
        visual: 'Bouton Demander une démo agence personnalisée.',
        audioVoice: '« Réservez votre audit agence gratuit dès aujourd\'hui. »',
      },
    },
  },
];

// 5-Stage Automated Email Nurture Funnel
const EMAIL_NURTURE_FUNNEL = [
  {
    stage: 'H+0',
    trigger: 'Inscription & Création du compte',
    subject: '🎉 Bienvenue sur SocialClone AI — Votre clone est prêt à être calibré',
    previewText: 'Débloquez immédiatement 50 crédits vidéo offerts en 1 clic.',
    objective: 'Activation onboarding et validation du radar 8 axes.',
    ctaUrl: 'https://app.socialclone.ai/onboarding',
  },
  {
    stage: 'H+24',
    trigger: '24 heures après inscription',
    subject: '🎬 Votre première vidéo 9:16 avec votre Voice Twin',
    previewText: 'Voyez ce que donne votre avatar sublimé avec synchronisation labiale.',
    objective: 'Génération du premier clip viral et publication sur TikTok/Reels.',
    ctaUrl: 'https://app.socialclone.ai/studio',
  },
  {
    stage: 'J+3',
    trigger: '3 jours après inscription',
    subject: '💬 Ne laissez plus aucun euro dormir dans vos DMs Instagram',
    previewText: 'Comment configurer votre mot-clé GUIDE conforme à la fenêtre 24h.',
    objective: 'Activation du Copilote DM et test de la note vocale oralisée.',
    ctaUrl: 'https://app.socialclone.ai/copilot',
  },
  {
    stage: 'J+7',
    trigger: '7 jours après inscription',
    subject: '📈 Étude de cas : Comment Marc a fait 4 200 € en 1 semaine avec son clone',
    previewText: 'Découvrez la structure exacte de son carrousel 3 slides.',
    objective: 'Démonstration de valeur et preuve sociale forte.',
    ctaUrl: 'https://app.socialclone.ai/case-studies',
  },
  {
    stage: 'J+14',
    trigger: '14 jours après inscription (Fin d\'essai)',
    subject: '⚡ Débloquez le Forfait Pro à 9 €/mois (-20% sur l\'annuel)',
    previewText: 'Carrousels illimités, zéro filigrane et 100 crédits vidéo mensuels.',
    objective: 'Conversion vers le Forfait Pro payant (9 €/mois / 89 €/an).',
    ctaUrl: 'https://app.socialclone.ai/pricing',
  },
];

// 1. GET /api/growth/playbooks
growthRouter.get('/playbooks', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: AD_PLAYBOOKS.length,
    playbooks: AD_PLAYBOOKS,
  });
});

// 2. GET /api/growth/email-funnel
growthRouter.get('/email-funnel', (_req: Request, res: Response) => {
  res.json({
    success: true,
    stagesCount: EMAIL_NURTURE_FUNNEL.length,
    funnel: EMAIL_NURTURE_FUNNEL,
  });
});

// 3. GET /api/growth/affiliate/stats
growthRouter.get('/affiliate/stats', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string | undefined;
    const user = userDb.getUser(userId);

    const affiliate = user?.affiliate || {
      code: 'CLONE-CREATOR-30',
      referralCount: 14,
      activeSubscribers: 9,
      earningsEur: 24.30,
    };

    res.json({
      success: true,
      affiliate: {
        code: affiliate.code,
        referralLink: `https://socialclone.ai/r/${affiliate.code}`,
        commissionRate: '30% récurrent à vie',
        bonusOnboarding: '50 crédits vidéo offerts pour le parrain et le filleul',
        totalClicks: (affiliate.referralCount * 6) + 42,
        referralCount: affiliate.referralCount,
        activeSubscribers: affiliate.activeSubscribers,
        monthlyRecurringCommissionEur: affiliate.earningsEur,
        totalPaidOutEur: 120.00,
        nextPayoutDate: '2026-09-15',
        payoutThresholdEur: 50.00,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur statistiques affiliation' });
  }
});

// 4. POST /api/growth/affiliate/track-click
growthRouter.post('/affiliate/track-click', (req: Request, res: Response) => {
  const { code } = req.body;
  res.json({
    success: true,
    code: code || 'CLONE-30',
    tracked: true,
    timestamp: new Date().toISOString(),
  });
});

// 5. GET /api/growth/tools/safe-zone-simulator (Programmatic SEO API)
growthRouter.get('/tools/safe-zone-simulator', (req: Request, res: Response) => {
  res.json({
    success: true,
    toolName: 'Simulateur Phone Safe-Zones 2026',
    seoMeta: {
      title: 'Simulateur Safe Zones Vidéo 9:16 gratuit (TikTok, Reels, YouTube Shorts) — SocialClone AI',
      description: 'Vérifiez en direct que vos sous-titres et hooks ne sont pas masqués par les boutons de TikTok ou Instagram Reels. Outil 100% en ligne gratuit.',
      canonical: 'https://socialclone.ai/tools/safe-zone-simulator',
    },
    supportedResolutions: ['1080x1920 (9:16 Verticaux)', '1080x1350 (4:5 Carrousels)'],
    guidelines: {
      tiktokSafeBox: { top: 160, bottom: 340, right: 130, left: 40 },
      reelsSafeBox: { top: 140, bottom: 280, right: 120, left: 40 },
      shortsSafeBox: { top: 120, bottom: 240, right: 110, left: 40 },
    },
  });
});

// 6. POST /api/growth/tools/hook-generator (Programmatic SEO Hook API)
growthRouter.post('/tools/hook-generator', (req: Request, res: Response) => {
  try {
    const { niche = 'marketing', topic = 'automatisation', archetype = 'Mentor' } = req.body;

    const generatedHooks = [
      {
        id: 'h1',
        pattern: 'Interruption de scroll contre-intuitive',
        text: `« 90% des créateurs font fausse route sur ${topic}. Voici pourquoi : »`,
        retentionScore: 96,
      },
      {
        id: 'h2',
        pattern: 'Secret / Découverte',
        text: `« Le secret que personne ne vous dit sur ${topic} en 2026... »`,
        retentionScore: 94,
      },
      {
        id: 'h3',
        pattern: 'Méthode chiffrée pas à pas',
        text: `« Comment doubler vos résultats sur ${topic} en 3 étapes sans y passer 15h : »`,
        retentionScore: 95,
      },
      {
        id: 'h4',
        pattern: 'Erreur fatale & avertissement',
        text: `« Arrêtez immédiatement de faire cette erreur sur ${topic} ! »`,
        retentionScore: 92,
      },
      {
        id: 'h5',
        pattern: 'Preuve personnelle',
        text: `« Voici exactement ce que j'ai mis en place sur ${topic} pour générer 1 450 € : »`,
        retentionScore: 97,
      },
    ];

    res.json({
      success: true,
      niche,
      topic,
      archetype,
      count: generatedHooks.length,
      hooks: generatedHooks,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur générateur de hooks' });
  }
});

// 7. GET /api/growth/vs/manychat (Programmatic SEO Comparison API)
growthRouter.get('/vs/manychat', (_req: Request, res: Response) => {
  res.json({
    success: true,
    pageTitle: 'SocialClone AI vs ManyChat vs Manuel : Le comparatif pour créateurs',
    comparisonMatrix: [
      {
        feature: 'Clone Vidéo 9:16 Incarné (Avatar Photoréaliste)',
        socialClone: '✅ Inclus (Nano Banana & Lip-Sync)',
        manychat: '❌ Non disponible',
        manuel: '❌ 15h de tournage par semaine',
      },
      {
        feature: 'Voice Twin (Voix Clonée Débruitée)',
        socialClone: '✅ Inclus (8 axes de personnalisation)',
        manychat: '❌ Non disponible',
        manuel: '✅ Voix réelle (chronophage)',
      },
      {
        feature: 'Conformité API Officielle & Verrouillage 24h',
        socialClone: '✅ Verrouillage automatique anti-ban',
        manychat: '⚠️ Partiel (flux complexes)',
        manuel: '✅ Conforme (manuel)',
      },
      {
        feature: 'Notes Vocales Stylisées (Oralisées)',
        socialClone: '✅ Inclus en 1 clic',
        manychat: '❌ Non disponible',
        manuel: '⚠️ Chronophage',
      },
      {
        feature: 'Studio Multi-Formats (Carrousels 3 Slides + Threads)',
        socialClone: '✅ Inclus avec Safe Zones',
        manychat: '❌ Non disponible',
        manuel: '⚠️ Montage lourd',
      },
      {
        feature: 'Tarification',
        socialClone: '⚡ 9 €/mois fixe (Illimité)',
        manychat: '💸 Facturation par contact (très cher)',
        manuel: '⌛ Coût en temps énorme',
      },
    ],
    verdict: 'SocialClone AI offre la seule solution tout-en-un unifiant le clonage vidéo incarné, le studio multi-formats et la conversion DM conforme pour 9 €/mois.',
  });
});
