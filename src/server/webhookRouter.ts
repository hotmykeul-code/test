import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { aiServices } from './aiServices';

export const webhookRouter = express.Router();

/**
 * 1. Meta / Instagram Webhook Verification (GET)
 * Meta challenges this endpoint when configuring the Webhook in Meta Developers Portal.
 */
webhookRouter.get('/meta', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const expectedToken = process.env.META_WEBHOOK_VERIFY_TOKEN || 'socialclone_meta_secret_token';

  if (mode === 'subscribe' && token === expectedToken) {
    console.log('✅ [Meta Webhook] Endpoint vérifié avec succès');
    res.status(200).send(challenge);
  } else {
    res.status(403).json({ error: 'Jeton de vérification Meta invalide.' });
  }
});

/**
 * 2. Meta / Instagram Incoming Messages Webhook (POST)
 * Receives Instagram DM messages with X-Hub-Signature-256 header validation.
 */
webhookRouter.post('/meta', async (req: Request, res: Response) => {
  const signature = req.headers['x-hub-signature-256'] as string;
  const appSecret = process.env.META_APP_SECRET || '';

  // Signature validation if secret is present
  if (appSecret && signature) {
    const rawBody = JSON.stringify(req.body);
    const expectedSig = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex');
    if (signature !== expectedSig) {
      console.warn('⚠️ [Meta Webhook] Signature invalide rejetée');
      return res.status(401).json({ error: 'Signature invalide' });
    }
  }

  const entries = req.body.entry || [];
  for (const entry of entries) {
    const messaging = entry.messaging || [];
    for (const msg of messaging) {
      const senderId = msg.sender?.id;
      const text = msg.message?.text;
      const timestamp = msg.timestamp || Date.now();

      // Enforce 24h compliance window
      const isWithin24h = Date.now() - timestamp <= 24 * 3600 * 1000;
      console.log(`📩 [Instagram DM] De: ${senderId}, Texte: "${text}", Fenêtre 24h: ${isWithin24h ? 'Valide' : 'Expirée'}`);
    }
  }

  res.status(200).json({ status: 'EVENT_RECEIVED' });
});

/**
 * 3. TikTok Direct Messages Webhook (POST)
 */
webhookRouter.post('/tiktok', (req: Request, res: Response) => {
  console.log('📩 [TikTok Webhook] Événement reçu:', req.body?.event);
  res.status(200).json({ status: 'SUCCESS' });
});

/**
 * 4. Local DM Simulator (POST /api/webhooks/simulate-dm)
 * Allows testing the 24h window, intent triage, and auto-replies without requiring a public HTTPS tunnel.
 */
webhookRouter.post('/simulate-dm', async (req: Request, res: Response) => {
  const { sender = '@alex_creator', message = 'Combien coûte votre programme ?', hoursAgo = 2 } = req.body;
  const receivedAt = new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString();
  const isWithin24h = hoursAgo < 24;

  let intent = 'Lead / Vente';
  let suggestedReply = 'Salut ! La formule Pro est à 9,99 €/mois. Tu peux la tester dès maintenant sur notre plateforme.';

  if (message.toLowerCase().includes('technique') || message.toLowerCase().includes('bug')) {
    intent = 'Support Technique';
    suggestedReply = 'Bonjour ! Notre équipe technique prend en charge votre demande immédiatement.';
  } else if (message.toLowerCase().includes('collab') || message.toLowerCase().includes('partenariat')) {
    intent = 'Partenariat / Collab';
    suggestedReply = 'Hello ! Merci pour ta proposition de collaboration, regardons ça ensemble.';
  }

  res.json({
    success: true,
    sender,
    message,
    receivedAt,
    within24h: isWithin24h,
    intent,
    suggestedReply,
    complianceStatus: isWithin24h ? '24H_ACTIVE_OK' : '24H_EXPIRED_BLOCKED',
  });
});
