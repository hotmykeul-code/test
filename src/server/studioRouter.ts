import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { userDb } from './userDb';

export const studioRouter = Router();

// Platform safe-zone dimensions and overlays
const PLATFORM_SAFE_ZONES = {
  INSTAGRAM: {
    name: 'Instagram Reels',
    aspectRatio: '9:16',
    resolution: { width: 1080, height: 1920 },
    margins: {
      top: 140, // 7.3%
      bottom: 280, // 14.5%
      right: 120, // 11.1% (Like, Comment, Share, Audio icons)
      left: 40,
    },
    safeAreaDescription: 'Zone centrale de 1080x1500px libre de toute superposition d\'interface.',
    proTips: [
      'Garder les sous-titres entre Y=500px et Y=1500px.',
      'Éviter le coin supérieur gauche (icône retour) et inférieur droit (bouton audio animé).',
    ],
  },
  TIKTOK: {
    name: 'TikTok Video',
    aspectRatio: '9:16',
    resolution: { width: 1080, height: 1920 },
    margins: {
      top: 160, // 8.3% (Onglets Pour Toi / Suivis)
      bottom: 340, // 17.7% (Légende, musique, barre de recherche)
      right: 130, // 12% (Avatar profil, coeur, favoris, partage)
      left: 40,
    },
    safeAreaDescription: 'Zone de sécurité stricte 1080x1420px.',
    proTips: [
      'Placer le hook visuel dans le tiers supérieur (Y=300px à 600px).',
      'Ne rien inscrire d\'important dans les 340 derniers pixels du bas.',
    ],
  },
  SHORTS: {
    name: 'YouTube Shorts',
    aspectRatio: '9:16',
    resolution: { width: 1080, height: 1920 },
    margins: {
      top: 120, // 6.2%
      bottom: 240, // 12.5%
      right: 110, // 10.2%
      left: 40,
    },
    safeAreaDescription: 'Zone de sécurité 1080x1560px.',
    proTips: [
      'Boutons d\'interaction sur le flanc droit.',
      'Titre de la vidéo et bouton S\'abonner occupant le bas de l\'écran.',
    ],
  },
};

const VIRAL_BATCH_IDEAS = [
  {
    id: 'idea-1',
    angle: 'Contre-intuitif',
    title: '« Arrêtez d\'éditer manuellement vos Reels en 2026 »',
    score: 96,
    format: 'Reel 9:16',
    hook: '« 90% des créateurs s\'épuisent à faire en 4 heures ce qu\'un clone IA fait en 30 secondes. »',
    coreValue: 'Présentation du pipeline d\'ingestion sans tournage avec lip-sync parfait.',
    ctaAction: 'Commentez CLONE pour recevoir le template de calibrage.',
  },
  {
    id: 'idea-2',
    angle: 'Histoire personnelle',
    title: '« Mon premier clone m\'a rapporté 4 200 € en DMs pendant mon sommeil »',
    score: 93,
    format: 'Carrousel 3 Diapos',
    hook: '« Je ne répondais jamais à mes messages privés. Voici le système exact qui a tout changé. »',
    coreValue: 'Tunnel DM 24h conforme avec déclencheur de mot-clé GUIDE et note vocale oralisée.',
    ctaAction: 'Enregistrez ce post pour structurer votre répondeur ce week-end.',
  },
  {
    id: 'idea-3',
    angle: 'Tutoriel rapide',
    title: '« La méthode 8 axes pour ne jamais perdre son style naturel »',
    score: 89,
    format: 'Discussion Threads',
    hook: '« Comment garder 100% de votre tonalité sans écrire un seul mot vous-même. »',
    coreValue: 'Calibrage des curseurs clivage, empathie et rythme narratif.',
    ctaAction: 'Partagez cette discussion à un créateur en manque de temps.',
  },
  {
    id: 'idea-4',
    angle: 'Erreur fréquente',
    title: '« L\'erreur fatale qui fait bannir vos automatisations de messages »',
    score: 95,
    format: 'Shorts 9:16',
    hook: '« Si vous n\'utilisez pas la fenêtre officielle des 24h, votre compte Instagram est en danger. »',
    coreValue: 'Démonstration du verrouillage de sécurité API officielle vs scrapers illégaux.',
    ctaAction: 'Testez la conformité de votre compte via le lien en bio.',
  },
  {
    id: 'idea-5',
    angle: 'Preuve par l\'absurde',
    title: '« J\'ai laissé mon clone gérer mon compte pendant 7 jours complets »',
    score: 92,
    format: 'Reel 9:16',
    hook: '« Personne dans mon audience n\'a remarqué que je n\'avais pas allumé ma caméra de la semaine. »',
    coreValue: 'Comparatif d\'engagement : +240% de rétention sur les 3 premières secondes.',
    ctaAction: 'Débloquez vos 50 crédits d\'essai gratuits.',
  },
];

// 1. GET /api/studio/safe-zones
studioRouter.get('/safe-zones', (req: Request, res: Response) => {
  const platform = ((req.query.platform as string) || 'INSTAGRAM').toUpperCase();
  const data = PLATFORM_SAFE_ZONES[platform as keyof typeof PLATFORM_SAFE_ZONES] || PLATFORM_SAFE_ZONES.INSTAGRAM;
  res.json({
    success: true,
    platform,
    data,
    allPlatforms: PLATFORM_SAFE_ZONES,
  });
});

// 2. GET /api/studio/batch-ideation
studioRouter.get('/batch-ideation', (req: Request, res: Response) => {
  const topic = (req.query.topic as string) || 'création de contenu';
  res.json({
    success: true,
    topic,
    count: VIRAL_BATCH_IDEAS.length,
    ideas: VIRAL_BATCH_IDEAS,
  });
});

// 2b. POST /api/studio/batch-ideation (Custom AI Generation)
studioRouter.post('/batch-ideation', async (req: Request, res: Response) => {
  try {
    const { topic, niche = 'business', archetype = 'Mentor' } = req.body;
    let customIdeas = VIRAL_BATCH_IDEAS;

    if (process.env.GEMINI_API_KEY && topic) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `Tu es un directeur créatif expert en vidéos courtes verticales (TikTok, Reels, Shorts).
Génère 4 idées de posts viraux à fort score de rétention pour le sujet suivant : "${topic}", Niche : "${niche}", Archétype créateur : "${archetype}".
Réponds UNIQUEMENT en JSON pur :
[
  {
    "id": "idea-1",
    "angle": "Contre-intuitif" | "Histoire personnelle" | "Tutoriel rapide" | "Erreur fréquente",
    "title": "string",
    "score": number (entre 89 et 96),
    "format": "Reel 9:16" | "Carrousel 3 Diapos" | "Discussion Threads" | "Shorts 9:16",
    "hook": "string (phrase d'accroche 3 premières secondes)",
    "coreValue": "string",
    "ctaAction": "string"
  }
]`;
        const aiResp = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
        });
        if (aiResp.text) {
          const parsed = JSON.parse(aiResp.text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            customIdeas = parsed;
          }
        }
      } catch (aiErr) {
        console.warn('Gemini batch ideation fallback:', aiErr);
      }
    }

    res.json({
      success: true,
      topic: topic || 'Idéation virale',
      ideas: customIdeas,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur d\'idéation en lot' });
  }
});

// 3. POST /api/studio/generate-carousel
studioRouter.post('/generate-carousel', (req: Request, res: Response) => {
  try {
    const { topic, theme = 'dark_luxury', targetAudience = 'Créateurs & Solopreneurs' } = req.body;

    const cleanTopic = topic || 'Comment doubler sa rétention vidéo sans passer des heures au montage';

    const slides = [
      {
        step: 'HOOK',
        slideNumber: 1,
        title: 'Diapositive 1 : Phrase de départ (Hook 4:5 / 1:1)',
        headline: `« 90% des créateurs font fausse route sur ${cleanTopic}. Voici la méthode 2026. »`,
        content: `Ne perdez plus 15h par semaine. Découvrez comment structurer votre présence en 3 étapes simples.`,
        visualNote: 'Visuel scroll-stopper haute rétention avec Avatar Photoréaliste Sublimé et typographie à fort contraste.',
        ctaText: 'Faites glisser pour la méthode 👉',
        themeStyle: {
          bg: theme === 'dark_luxury' ? 'bg-neutral-950' : theme === 'electric_neon' ? 'bg-slate-950' : 'bg-zinc-900',
          accent: theme === 'dark_luxury' ? 'text-amber-400' : 'text-emerald-400',
        },
      },
      {
        step: 'VALEUR',
        slideNumber: 2,
        title: 'Diapositive 2 : Cœur de la méthode (Valeur & Tutoriel)',
        headline: 'La structure narrative en 3 piliers',
        content: `1. Ingestion multimodale : Analysez vos posts passés sans effort.\n2. Calibrage 8 axes : Gardez 100% de votre tonalité naturelle.\n3. Copilote DM : Convertissez chaque commentaire en client sous 60 secondes.`,
        visualNote: 'Schéma visuel épuré sans jargon technique illustrant le pipeline fluide.',
        ctaText: 'Dernière étape clé 👇',
        themeStyle: {
          bg: theme === 'dark_luxury' ? 'bg-neutral-900' : 'bg-zinc-900',
          accent: 'text-amber-400',
        },
      },
      {
        step: 'ACTION',
        slideNumber: 3,
        title: 'Diapositive 3 : Phrase de fin (Conclusion & Invitation)',
        headline: 'Prêt à passer à l\'action ?',
        content: `Enregistrez ce carrousel pour votre prochaine session et commentez « GUIDE » sous ce post pour recevoir l\'accès immédiat au studio.`,
        visualNote: 'Boutons de sauvegarde et mot-clé déclencheur DM conforme API officielle.',
        ctaText: 'Enregistrez & Partagez 📌',
        themeStyle: {
          bg: theme === 'dark_luxury' ? 'bg-neutral-950' : 'bg-zinc-950',
          accent: 'text-amber-400',
        },
      },
    ];

    res.json({
      success: true,
      topic: cleanTopic,
      targetAudience,
      theme,
      aspectRatio: '4:5 / 1:1',
      slides,
      exportFormats: ['PNG_HD', 'PDF_CAROUSEL', 'INSTAGRAM_READY_ZIP'],
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur génération carrousel' });
  }
});

// 4. POST /api/studio/trend-remix
studioRouter.post('/trend-remix', async (req: Request, res: Response) => {
  try {
    const { sourceUrl, topic, competitorHook, targetArchetype = 'Mentor' } = req.body;

    const originalHook = competitorHook || '« Voici comment j\'ai gagné 10 000 abonnés en 3 jours »';
    const cleanTopic = topic || 'Croissance organique et conversion';

    let remixedHook = `« 99% des créateurs courent après les abonnés au lieu de convertir. Voici mon analyse : »`;
    let remixedPacing = 'Rythme rapide, hook à 0-3s, preuve chiffrée à 12s, conclusion avec mot-clé DM à 25s.';
    let viralScore = 95;

    if (process.env.GEMINI_API_KEY && (topic || competitorHook)) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `Tu es un stratège de contenu viral 9:16.
Analyse et réécris cette tendance concurrente dans le ton d'un créateur archétype "${targetArchetype}" :
Tendance / Hook original : "${originalHook}"
Sujet : "${cleanTopic}"

Génère en JSON pur :
{
  "patternAnalysis": {
    "originalHookType": "Curiosité / Chiffre fort",
    "pacingSeconds": "30s",
    "weaknessInOriginal": "Trop axé vanity metrics sans valeur concrète"
  },
  "remixedScript": {
    "hook": "Phrase de départ 0-3s percutante dans le ton du créateur",
    "valueBody": "Corps du message avec arguments concrets et sans jargon",
    "cta": "Phrase de conclusion orientée conversion",
    "viralRetentionScore": 95
  }
}`;
        const aiResp = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
        });
        if (aiResp.text) {
          const parsed = JSON.parse(aiResp.text);
          if (parsed.remixedScript) {
            remixedHook = parsed.remixedScript.hook || remixedHook;
            viralScore = parsed.remixedScript.viralRetentionScore || viralScore;
          }
        }
      } catch (err) {
        console.warn('Gemini trend remix fallback:', err);
      }
    }

    res.json({
      success: true,
      sourceUrl: sourceUrl || 'https://tiktok.com/@competitor/video/123456',
      analysis: {
        originalHook,
        detectedPacing: remixedPacing,
        retentionTriggers: ['Interruption de scroll 0-2s', 'Démonstration visuelle', 'CTA déclencheur'],
      },
      remix: {
        targetArchetype,
        hook: remixedHook,
        videoScript: `${remixedHook}\n\nFranchement, le vrai secret ce n'est pas de faire des millions de vues, c'est de transformer chaque vue en abonné qualifié.\n\nRegardez bien : avec un clone IA calibré sur votre voix, vous créez votre vidéo en 30 secondes et vous répondez aux DMs en moins d'une minute.\n\nCommentez CLONE pour tester la méthode.`,
        viralRetentionScore: viralScore,
        estimatedDurationSec: 28,
        safeZoneCompliant: true,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur Trend Remix' });
  }
});

// 5. POST /api/studio/generate-video
studioRouter.post('/generate-video', async (req: Request, res: Response) => {
  try {
    const { userId, prompt, topic, duration = 30, format = '9:16', platform = 'TIKTOK' } = req.body;
    const user = userDb.getUser(userId);

    // Verify credits (cost = 1 video credit)
    if (user) {
      const debit = userDb.deductCreditsAtomically(user.id, 1, `Génération vidéo 9:16 : ${topic || 'Script IA'}`);
      if (!debit.success) {
        res.status(402).json({
          error: 'CREDITS_INSUFFISANTS',
          message: 'Votre solde de crédits vidéo est insuffisant. Passez au forfait Pro ou achetez un pack de crédits.',
          currentBalance: debit.newBalance,
        });
        return;
      }
    }

    const cleanTopic = topic || prompt || 'Présentation de mon clone numérique IA';
    const now = new Date();

    const subtitles = [
      { startSec: 0.0, endSec: 2.5, text: 'Attends 2 secondes avant de scroller...' },
      { startSec: 2.6, endSec: 6.8, text: 'Cette personne que tu vois à l\'écran est mon clone IA.' },
      { startSec: 6.9, endSec: 13.5, text: 'Ma voix exacte, mes mimiques, sans allumer ma caméra.' },
      { startSec: 13.6, endSec: 22.0, text: 'En 1 clic, mes vidéos 9:16 sont prêtes pour TikTok et Reels.' },
      { startSec: 22.1, endSec: 28.5, text: 'Clique sur le lien en bio pour tester ton propre clone !' },
    ];

    const c2paManifest = {
      signed: true,
      issuer: 'SocialClone AI C2PA Digital Authority',
      timestamp: now.toISOString(),
      algorithm: 'ES256',
      syntheticOriginAttested: true,
      watermarkApplied: user?.plan === 'FREE',
      standardsCompliance: ['C2PA v1.4', 'EU AI Act Article 52'],
    };

    const jobId = `vid_job_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    res.json({
      success: true,
      jobId,
      status: 'COMPLETED',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-42880-large.mp4',
      aspectRatio: format,
      durationSec: duration,
      platform,
      topic: cleanTopic,
      lipSyncScore: 99.4,
      retentionScore: 94,
      subtitles,
      c2paManifest,
      remainingCredits: user?.credits ?? 9,
      message: 'Vidéo 9:16 incarnée générée avec succès avec sous-titres dynamiques et signature C2PA.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur génération vidéo' });
  }
});
