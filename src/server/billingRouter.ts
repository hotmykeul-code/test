import { Router, Request, Response } from 'express';
import { userDb } from './userDb';

export const billingRouter = Router();

const PLANS_CATALOG = [
  {
    id: 'FREE',
    name: 'Formule Gratuite (Essai)',
    priceMonthlyEur: 0,
    priceAnnualEur: 0,
    priceUsdIap: 0,
    badge: 'Essai Découverte',
    features: [
      '1 compte connecté (1 seul réseau)',
      'Clonage & Avatar Photoréaliste Inclus',
      'Radar stylistique 8 axes (calibrage initial)',
      'Quota découverte : 3 carrousels IA',
      'Copilote DM (Semi-auto uniquement)',
      '10 crédits vidéo d\'accueil',
      'Filigrane discret « Made with SocialClone AI »',
    ],
    limits: {
      connectedAccounts: 1,
      recalibrationsPerMonth: 0, // Initial only
      carouselsPerMonth: 3,
      dmModes: ['COPILOT'],
      schedulerMode: 'MANUAL',
      watermark: true,
    },
  },
  {
    id: 'PRO',
    name: 'Formule Pro Créateur',
    priceMonthlyEur: 9.99,
    priceAnnualEur: 95.99,
    isPopular: true,
    badge: 'Recommandé Créateurs',
    features: [
      '1 compte par réseau supporté (TikTok, Instagram, YouTube, Threads)',
      'Clonage intégral + Studio Guidé Mobile & Web',
      '🔄 1 recalibrage complet du clone tous les 30 jours',
      'Studio Carrousels & Discussions illimité',
      'Copilote DM 24h : 100% Auto, Semi-Auto & Hybride',
      'Smart Scheduler : Optimisation IA + Auto-Fallback Niveau 2',
      '50 crédits vidéo 9:16 mensuels inclus',
      'Zéro filigrane / Export marque blanche',
    ],
    limits: {
      connectedAccounts: 4,
      recalibrationsPerMonth: 1,
      carouselsPerMonth: 999999,
      dmModes: ['AUTO', 'COPILOT', 'HYBRID'],
      schedulerMode: 'AI_OPTIMIZED_AND_FALLBACK',
      watermark: false,
    },
  },
  {
    id: 'AGENCY',
    name: 'Formule Agence & Multi-Comptes',
    priceMonthlyEur: 0,
    priceAnnualEur: 0,
    isQuoteRequired: true,
    badge: 'Sur Devis',
    features: [
      'Gestion multi-comptes créateurs sur mesure',
      'Multi-clones et avatars dédiés par marque',
      '🔄 1 recalibrage / 30 jours par compte créateur',
      'Studio IA et Copilote DM illimités',
      'Espaces de travail avec rôles et permissions (RBAC)',
      'Facturation consolidée & TVA déductible',
      'Support prioritaire dédié 7j/7 et onboarding personnalisé',
    ],
    limits: {
      connectedAccounts: 20,
      recalibrationsPerMonth: 20,
      carouselsPerMonth: 999999,
      dmModes: ['AUTO', 'COPILOT', 'HYBRID'],
      schedulerMode: 'AI_OPTIMIZED_AND_FALLBACK',
      watermark: false,
    },
  },
];

const CREDIT_PACKS = [
  { id: 'pack_50', credits: 50, priceEur: 5, priceUsd: 5.99, bonusPercent: 0 },
  { id: 'pack_200', credits: 200, priceEur: 15, priceUsd: 16.99, bonusPercent: 15, isPopular: true },
  { id: 'pack_500', credits: 500, priceEur: 30, priceUsd: 34.99, bonusPercent: 25 },
];

// 1. GET /api/billing/plans
billingRouter.get('/plans', (_req: Request, res: Response) => {
  res.json({
    success: true,
    plans: PLANS_CATALOG,
    creditPacks: CREDIT_PACKS,
    crossPlatform: {
      stripeEnabled: true,
      revenueCatEnabled: true,
      appStoreIapSku: 'ai.socialclone.pro.monthly',
      playStoreIapSku: 'ai.socialclone.pro.monthly',
    },
  });
});

// 2. POST /api/billing/checkout-session
billingRouter.post('/checkout-session', (req: Request, res: Response) => {
  try {
    const { userId, plan = 'PRO', billingCycle = 'monthly', successUrl, cancelUrl } = req.body;
    const user = userDb.getUser(userId);

    const isAnnual = billingCycle === 'annual';
    const amount = plan === 'PRO' ? (isAnnual ? 89 : 9) : plan === 'AGENCY' ? (isAnnual ? 990 : 99) : 0;

    const sessionId = `cs_live_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const checkoutUrl = `https://checkout.stripe.com/c/pay/${sessionId}?prefilled_email=${encodeURIComponent(user?.email || 'creator@socialclone.ai')}`;

    res.json({
      success: true,
      provider: 'STRIPE',
      sessionId,
      checkoutUrl,
      plan,
      billingCycle,
      amountEur: amount,
      revenueCatBridge: {
        packageId: isAnnual ? '$rc_annual' : '$rc_monthly',
        productIdentifier: isAnnual ? 'ai.socialclone.pro.annual' : 'ai.socialclone.pro.monthly',
      },
      message: `Session de paiement Stripe & RevenueCat générée pour le forfait ${plan} (${billingCycle}).`,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur génération session de paiement' });
  }
});

// 3. POST /api/billing/customer-portal
billingRouter.post('/customer-portal', (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = userDb.getUser(userId);

    const portalUrl = `https://billing.stripe.com/p/session/portal_${Date.now()}`;
    res.json({
      success: true,
      portalUrl,
      customerId: user?.id || 'cus_demo_123',
      message: 'Redirection vers le portail client sécurisé Stripe (gestion de carte, factures et résiliation).',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur portail de facturation' });
  }
});

// 4. GET /api/billing/credits
billingRouter.get('/credits', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string | undefined;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    res.json({
      success: true,
      userId: user.id,
      creditsBalance: user.credits,
      plan: user.plan,
      onboardingBonusClaimed: user.onboardingBonusClaimed,
      ledger: user.creditLedger,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur récupération crédits' });
  }
});

// 5. POST /api/billing/buy-credits
billingRouter.post('/buy-credits', (req: Request, res: Response) => {
  try {
    const { userId, packId } = req.body;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    const pack = CREDIT_PACKS.find((p) => p.id === packId) || CREDIT_PACKS[0];
    const addResult = userDb.addCreditsAtomically(
      user.id,
      pack.credits,
      'PACK_PURCHASE',
      `Achat pack de crédits : +${pack.credits} crédits (${pack.priceEur} €)`
    );

    res.json({
      success: true,
      packPurchased: pack,
      newCreditsBalance: addResult.newBalance,
      transaction: addResult.transaction,
      message: `🎉 +${pack.credits} crédits ajoutés à votre solde avec succès !`,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur achat pack de crédits' });
  }
});

// 6. GET /api/billing/check-throttle
billingRouter.get('/check-throttle', (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string | undefined;
    const user = userDb.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    const lock = userDb.checkRecalibrationLock(user.id);
    res.json({
      success: true,
      userId: user.id,
      isThrottled: lock.locked,
      daysRemaining: lock.daysRemaining,
      lastCalibrationDate: lock.lastCalibrationDate,
      nextAllowedCalibrationDate: lock.nextAllowedDate,
      plan: user.plan,
      policy: '1 recalibrage tous les 30 jours (GPU Protection Protocol)',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur vérification verrou 30 jours' });
  }
});

// 7. POST /api/billing/upgrade-plan
billingRouter.post('/upgrade-plan', (req: Request, res: Response) => {
  try {
    const { userId, plan } = req.body;
    if (plan !== 'FREE' && plan !== 'PRO' && plan !== 'AGENCY') {
      res.status(400).json({ error: 'Plan invalide (FREE, PRO, AGENCY).' });
      return;
    }

    const updatedUser = userDb.updatePlan(userId, plan);
    if (!updatedUser) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    res.json({
      success: true,
      message: `Forfait mis à jour vers ${plan} avec succès.`,
      user: {
        id: updatedUser.id,
        plan: updatedUser.plan,
        credits: updatedUser.credits,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur mise à niveau forfait' });
  }
});

// 8. POST /api/billing/request-quote (Formule Agence Sur Devis)
billingRouter.post('/request-quote', (req: Request, res: Response) => {
  try {
    const { email, companyName, creatorsCount = 10, notes } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Une adresse email est requise.' });
      return;
    }

    const quoteId = 'quote_' + Math.random().toString(36).substring(2, 10);
    console.log(`📋 [Demande de Devis] Devis ${quoteId} reçu pour ${companyName || email} (${creatorsCount} créateurs).`);

    res.json({
      success: true,
      quoteId,
      message: 'Votre demande de devis personnalisé a été enregistrée avec succès. Notre équipe vous recontactera sous 24h ouvrées.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur enregistrement devis' });
  }
});

// 9. POST /api/billing/webhook (Stripe Webhook Listener)
billingRouter.post('/webhook', (req: Request, res: Response) => {
  const event = req.body;
  console.log(`💳 [Stripe Webhook] Événement reçu: ${event?.type || 'checkout.session.completed'}`);
  res.status(200).json({ received: true });
});

// 10. POST /api/billing/revenuecat-webhook (Mobile In-App Purchase Listener)
billingRouter.post('/revenuecat-webhook', (req: Request, res: Response) => {
  const event = req.body?.event;
  console.log(`📱 [RevenueCat Webhook] Événement reçu: ${event?.type || 'RENEWAL'}`);
  res.status(200).json({ received: true });
});

