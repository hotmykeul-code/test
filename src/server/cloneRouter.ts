import { Router, Request, Response } from 'express';
import { userDb } from './userDb';

export const cloneRouter = Router();

const CREATOR_ARCHETYPES = [
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Bienveillant, structuré, axé sur le passage à l\'action et l\'empathie.',
    focus: 'Empathie 92% • Storytelling 85%',
    defaultRadar: {
      humour: 45,
      formalisme: 20,
      energie: 88,
      empathie: 92,
      storytelling: 85,
      technicite: 60,
      clivage: 35,
      rythme: 90,
    },
    signatureWords: ['Franchement', 'Déclic', 'Sans détour', 'Action concrète', 'Structure'],
    forbiddenWords: ['Jargon', 'Peut-être', 'Éventuellement', 'Supercharge'],
    favouriteEmojis: ['🔥', '💡', '🎯', '⚡', '👇'],
  },
  {
    id: 'vulgarisateur',
    name: 'Vulgarisateur',
    description: 'Pédagogue, visuel, déconstruit les concepts complexes en 30 secondes.',
    focus: 'Technicité 85% • Humour 70%',
    defaultRadar: {
      humour: 70,
      formalisme: 15,
      energie: 95,
      empathie: 75,
      storytelling: 80,
      technicite: 85,
      clivage: 50,
      rythme: 92,
    },
    signatureWords: ['Regarde bien', 'En 30 secondes', 'Astuce secrète', 'Testé et prouvé'],
    forbiddenWords: ['Théorème', 'Prolégomènes', 'Empowerment', 'SaaS'],
    favouriteEmojis: ['🤯', '✨', '🚀', '👀', '📌'],
  },
  {
    id: 'rebelle',
    name: 'Rebelle',
    description: 'Clivant, direct, casse les codes établis et réveille l\'audience.',
    focus: 'Clivage 95% • Énergie 90%',
    defaultRadar: {
      humour: 65,
      formalisme: 10,
      energie: 90,
      empathie: 50,
      storytelling: 70,
      technicite: 70,
      clivage: 95,
      rythme: 85,
    },
    signatureWords: ['Vérité qui fâche', 'Arrêtez tout', 'L\'erreur 99%', 'La réalité brute'],
    forbiddenWords: ['Veuillez agréer', 'Bienveillant', 'Politiquement correct'],
    favouriteEmojis: ['🚫', '💣', '🧠', '📉', '🤫'],
  },
  {
    id: 'leader',
    name: 'Leader',
    description: 'Inspirant, visionnaire, rassemble autour d\'une cause forte et de résultats.',
    focus: 'Énergie 95% • Formalisme 50%',
    defaultRadar: {
      humour: 30,
      formalisme: 40,
      energie: 98,
      empathie: 80,
      storytelling: 90,
      technicite: 65,
      clivage: 60,
      rythme: 88,
    },
    signatureWords: ['Vision', 'Impact', 'Exécution', 'Standard élevé'],
    forbiddenWords: ['Petit à petit', 'Bricolage', 'On verra'],
    favouriteEmojis: ['🦁', '🏔️', '🏆', '💎', '📈'],
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Pointu, précis, apporte des preuves chiffrées, des études et de la méthode.',
    focus: 'Technicité 95% • Rythme 80%',
    defaultRadar: {
      humour: 25,
      formalisme: 55,
      energie: 75,
      empathie: 60,
      storytelling: 65,
      technicite: 95,
      clivage: 40,
      rythme: 80,
    },
    signatureWords: ['Données prouvées', 'Étude de cas', 'Protocole', 'Chiffres clés'],
    forbiddenWords: ['Magie', 'Incroyable', 'Devenir riche vite'],
    favouriteEmojis: ['📊', '🔬', '📋', '⚙️', '🔍'],
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    description: 'Émotionnel, immersif, captive par l\'arc narratif et la vulnérabilité.',
    focus: 'Storytelling 98% • Empathie 90%',
    defaultRadar: {
      humour: 55,
      formalisme: 20,
      energie: 82,
      empathie: 95,
      storytelling: 98,
      technicite: 50,
      clivage: 45,
      rythme: 85,
    },
    signatureWords: ['C\'était un mardi soir', 'Ce jour-là', 'La leçon que j\'ai apprise', 'Le tournant'],
    forbiddenWords: ['Slide 1', 'Pour conclure brièvement', 'Executive summary'],
    favouriteEmojis: ['📖', '🎬', '💫', '💭', '❤️'],
  },
];

// 1. GET /api/clone/profile
cloneRouter.get('/profile', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string | undefined;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    const lockInfo = userDb.checkRecalibrationLock(user.id);

    res.json({
      success: true,
      user: {
        id: user.id,
        handle: user.handle,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        platform: user.platform,
        plan: user.plan,
        credits: user.credits,
        onboardingBonusClaimed: user.onboardingBonusClaimed,
      },
      twinProfile: user.twinProfile,
      recalibrationLock: lockInfo,
      videoLoopUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-42880-large.mp4',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur clone' });
  }
});

// 2. GET /api/clone/archetypes
cloneRouter.get('/archetypes', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: CREATOR_ARCHETYPES.length,
    archetypes: CREATOR_ARCHETYPES,
  });
});

// 3. POST /api/clone/calibrate
cloneRouter.post('/calibrate', (req: Request, res: Response) => {
  try {
    const { userId, archetype, toneRadar, signatureWords, forbiddenWords, favouriteEmojis, forceOverride } = req.body;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    // Validate 8 axes
    const axes = ['humour', 'formalisme', 'energie', 'empathie', 'storytelling', 'technicite', 'clivage', 'rythme'];
    const sanitizedRadar: Record<string, number> = {};
    if (toneRadar) {
      for (const axis of axes) {
        const val = Number(toneRadar[axis]);
        sanitizedRadar[axis] = isNaN(val) ? 50 : Math.max(0, Math.min(100, Math.round(val)));
      }
    }

    // Enforce 30-day lock
    const recalibResult = userDb.recalibrateClone(
      user.id,
      {
        archetype: archetype || user.twinProfile?.archetype || 'Mentor',
        toneRadar: sanitizedRadar,
        signatureWords: signatureWords || user.twinProfile?.signatureWords || [],
        forbiddenWords: forbiddenWords || user.twinProfile?.forbiddenWords || [],
        favouriteEmojis: favouriteEmojis || user.twinProfile?.favouriteEmojis || [],
      },
      Boolean(forceOverride)
    );

    if (!recalibResult.success) {
      if (recalibResult.error === 'RECALIBRATION_LOCKED') {
        res.status(403).json({
          error: 'RECALIBRATION_LOCKED',
          message: `Le recalibrage de votre clone est limité à 1 fois tous les 30 jours pour protéger les ressources GPU. Prochain recalibrage autorisé dans ${recalibResult.lockDetails.daysRemaining} jour(s).`,
          lockDetails: recalibResult.lockDetails,
        });
        return;
      }
      res.status(400).json({ error: recalibResult.error });
      return;
    }

    res.json({
      success: true,
      message: 'Clone calibré avec succès sur vos 8 axes stylistiques.',
      user: recalibResult.user,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur lors de la calibration du clone' });
  }
});

// 4. PUT /api/clone/update
cloneRouter.put('/update', (req: Request, res: Response) => {
  try {
    const { userId, displayName, avatarUrl, signatureWords, forbiddenWords, favouriteEmojis } = req.body;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    if (displayName) user.displayName = displayName;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (user.twinProfile) {
      if (signatureWords) user.twinProfile.signatureWords = signatureWords;
      if (forbiddenWords) user.twinProfile.forbiddenWords = forbiddenWords;
      if (favouriteEmojis) user.twinProfile.favouriteEmojis = favouriteEmojis;
    }

    userDb.updateUserStatus(user.id, user.status, user.twinProfile);

    res.json({
      success: true,
      message: 'Profil du clone mis à jour avec succès.',
      user,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur de mise à jour' });
  }
});

// 5. POST /api/clone/voice-sample
cloneRouter.post('/voice-sample', (req: Request, res: Response) => {
  try {
    const { userId, audioBase64, sampleDurationSec = 20 } = req.body;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    // Voice profiling simulation logic
    const pitchHz = Math.round(135 + Math.random() * 40);
    const cadenceWpm = Math.round(155 + Math.random() * 30);
    const clarityScore = 99.4;
    const noiseReductionDb = 42.5;

    if (user.twinProfile) {
      user.twinProfile.voiceStemStatus = `Modèle vocal Voice Twin calibré (${pitchHz} Hz, ${cadenceWpm} wpm, clarté ${clarityScore}%)`;
    }

    userDb.updateUserStatus(user.id, 'CALIBRATED', user.twinProfile);

    res.json({
      success: true,
      message: 'Échantillon vocal ingéré, débruité et modélisé avec succès.',
      voiceMetrics: {
        pitchHz,
        cadenceWpm,
        clarityScore,
        noiseReductionDb,
        sampleDurationSec,
        status: 'READY_FOR_SYNTHESIS',
        testAudioUrl: 'https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3',
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur traitement vocal' });
  }
});

// 6. POST /api/clone/onboarding-bonus
cloneRouter.post('/onboarding-bonus', (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    const bonusResult = userDb.claimOnboardingBonus(user.id);
    res.json(bonusResult);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur bonus onboarding' });
  }
});

// 7. GET /api/clone/status
cloneRouter.get('/status', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string | undefined;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    const lockInfo = userDb.checkRecalibrationLock(user.id);
    res.json({
      success: true,
      userId: user.id,
      handle: user.handle,
      plan: user.plan,
      credits: user.credits,
      onboardingBonusClaimed: user.onboardingBonusClaimed,
      recalibrationLock: lockInfo,
      status: user.status,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur statut clone' });
  }
});
