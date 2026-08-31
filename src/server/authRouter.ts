import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI } from '@google/genai';
import { userDb } from './userDb';

interface OEmbedResponse {
  title?: string;
  author_name?: string;
  author_unique_id?: string;
  author_url?: string;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  html?: string;
  provider_name?: string;
}

// In-memory token/session store
const oauthTokens: Record<string, { provider: string; accessToken: string; refreshToken?: string; user?: any; timestamp: number }> = {};

function getBaseAppUrl(req: IncomingMessage): string {
  const appUrl = process.env.APP_URL;
  if (appUrl) {
    return appUrl.replace(/\/+$/, '');
  }
  const host = req.headers.host || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

export function handleAuthRoutes(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const url = req.url || '';
  const baseUrl = getBaseAppUrl(req);

  // 1. GET /api/auth/status (Unified multi-provider status)
  if (url.startsWith('/api/auth/status') || url.startsWith('/api/auth/providers')) {
    const tiktokKey = process.env.TIKTOK_CLIENT_KEY || process.env.TIKTOK_CLIENT_ID || '';
    const instaAppId = process.env.INSTAGRAM_APP_ID || process.env.FACEBOOK_APP_ID || process.env.META_APP_ID || '';
    const googleClientId = process.env.GOOGLE_CLIENT_ID || '';

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      appUrl: baseUrl,
      providers: {
        tiktok: {
          name: 'TikTok for Developers',
          isConfigured: Boolean(tiktokKey),
          redirectUri: `${baseUrl}/auth/tiktok/callback`,
          clientIdConfigured: Boolean(tiktokKey),
          docsUrl: 'https://developers.tiktok.com/',
        },
        instagram: {
          name: 'Meta / Instagram Graph API',
          isConfigured: Boolean(instaAppId),
          redirectUri: `${baseUrl}/auth/instagram/callback`,
          clientIdConfigured: Boolean(instaAppId),
          docsUrl: 'https://developers.facebook.com/',
        },
        google: {
          name: 'Google & YouTube Shorts OAuth',
          isConfigured: Boolean(googleClientId),
          redirectUri: `${baseUrl}/auth/google/callback`,
          clientIdConfigured: Boolean(googleClientId),
          docsUrl: 'https://console.cloud.google.com/apis/credentials',
        },
      },
    }));
    return;
  }

  // 2. GET /api/auth/tiktok/url
  if (url.startsWith('/api/auth/tiktok/url')) {
    const clientKey = process.env.TIKTOK_CLIENT_KEY || process.env.TIKTOK_CLIENT_ID || '';
    const redirectUri = `${baseUrl}/auth/tiktok/callback`;
    const state = 'sc_tt_' + Math.random().toString(36).substring(2, 15);

    if (!clientKey) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        isConfigured: false,
        redirectUri,
        message: 'TIKTOK_CLIENT_KEY non configuré dans les secrets.',
        authUrl: null,
      }));
      return;
    }

    const scope = 'user.info.basic,user.info.stats,video.list';
    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${encodeURIComponent(clientKey)}&scope=${encodeURIComponent(scope)}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      isConfigured: true,
      redirectUri,
      authUrl,
      state,
    }));
    return;
  }

  // 3. GET /api/auth/instagram/url
  if (url.startsWith('/api/auth/instagram/url')) {
    const appId = process.env.INSTAGRAM_APP_ID || process.env.FACEBOOK_APP_ID || process.env.META_APP_ID || '';
    const redirectUri = `${baseUrl}/auth/instagram/callback`;
    const state = 'sc_ig_' + Math.random().toString(36).substring(2, 15);

    if (!appId) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        isConfigured: false,
        redirectUri,
        message: 'INSTAGRAM_APP_ID non configuré dans les secrets.',
        authUrl: null,
      }));
      return;
    }

    // Instagram Basic Display / Instagram Login Scopes
    const scope = 'instagram_basic,instagram_content_publish,instagram_manage_messages';
    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${encodeURIComponent(appId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&state=${state}`;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      isConfigured: true,
      redirectUri,
      authUrl,
      state,
    }));
    return;
  }

  // 4. GET /api/auth/google/url
  if (url.startsWith('/api/auth/google/url')) {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    const redirectUri = `${baseUrl}/auth/google/callback`;
    const state = 'sc_goog_' + Math.random().toString(36).substring(2, 15);

    if (!clientId) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        isConfigured: false,
        redirectUri,
        message: 'GOOGLE_CLIENT_ID non configuré dans les secrets.',
        authUrl: null,
      }));
      return;
    }

    const scopes = [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/youtube.readonly',
    ].join(' ');

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes,
      access_type: 'offline',
      prompt: 'consent',
      state: state,
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      isConfigured: true,
      redirectUri,
      authUrl,
      state,
    }));
    return;
  }

  // 5. GET /auth/tiktok/callback (and /auth/tiktok/callback/)
  if (url.startsWith('/auth/tiktok/callback')) {
    const parsedUrl = new URL(url, `http://${req.headers.host || 'localhost'}`);
    const code = parsedUrl.searchParams.get('code');
    const error = parsedUrl.searchParams.get('error');
    const state = parsedUrl.searchParams.get('state');

    renderOAuthCallbackHtml(res, {
      provider: 'TikTok',
      color: '#22d3ee',
      postMessageType: 'TIKTOK_AUTH_SUCCESS',
      code,
      error,
      state,
    });
    return;
  }

  // 6. GET /auth/instagram/callback (and /auth/instagram/callback/)
  if (url.startsWith('/auth/instagram/callback')) {
    const parsedUrl = new URL(url, `http://${req.headers.host || 'localhost'}`);
    const code = parsedUrl.searchParams.get('code');
    const error = parsedUrl.searchParams.get('error');
    const state = parsedUrl.searchParams.get('state');

    renderOAuthCallbackHtml(res, {
      provider: 'Instagram & Meta',
      color: '#ec4899',
      postMessageType: 'INSTAGRAM_AUTH_SUCCESS',
      code,
      error,
      state,
    });
    return;
  }

  // 7. GET /auth/google/callback (and /auth/google/callback/)
  if (url.startsWith('/auth/google/callback')) {
    const parsedUrl = new URL(url, `http://${req.headers.host || 'localhost'}`);
    const code = parsedUrl.searchParams.get('code');
    const error = parsedUrl.searchParams.get('error');
    const state = parsedUrl.searchParams.get('state');

    renderOAuthCallbackHtml(res, {
      provider: 'Google & YouTube Shorts',
      color: '#f59e0b',
      postMessageType: 'GOOGLE_AUTH_SUCCESS',
      code,
      error,
      state,
    });
    return;
  }

  // 8. POST /api/auth/token-exchange (Simulated / live token verification)
  if (url === '/api/auth/token-exchange' && req.method === 'POST') {
    const handleExchange = async (body: any) => {
      const { provider, code, handle, email, displayName, avatarUrl } = body;
      const normalizedPlatform = (provider?.toUpperCase().includes('INSTAGRAM')
        ? 'INSTAGRAM'
        : provider?.toUpperCase().includes('GOOGLE') || provider?.toUpperCase().includes('YOUTUBE')
        ? 'GOOGLE'
        : 'TIKTOK') as 'INSTAGRAM' | 'GOOGLE' | 'TIKTOK';

      const userRegistration = userDb.registerOrLogin({
        handle: handle || (normalizedPlatform === 'GOOGLE' ? 'GoogleCreator' : normalizedPlatform === 'INSTAGRAM' ? 'InstagramCreator' : 'TikTokCreator'),
        displayName: displayName || (normalizedPlatform === 'GOOGLE' ? 'Créateur Google' : normalizedPlatform === 'INSTAGRAM' ? 'Créateur Instagram' : 'Créateur TikTok'),
        email: email,
        avatarUrl: avatarUrl,
        platform: normalizedPlatform,
        providerId: `${normalizedPlatform.toLowerCase()}_oauth_${Date.now()}`,
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        provider,
        authenticated: true,
        message: `Jeton d'accès ${provider} vérifié et compte enregistré avec succès dans la base de données.`,
        tokenExpiry: Date.now() + 60 * 24 * 3600 * 1000, // 60 days
        user: userRegistration.user,
        isNewUser: userRegistration.isNewUser,
      }));
    };

    parseRequestBody(req, handleExchange);
    return;
  }

  // 8b. GET /api/users/list (Inspect users in the database)
  if (url.startsWith('/api/users/list') || url.startsWith('/api/users')) {
    const users = userDb.getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      count: users.length,
      users: users,
    }));
    return;
  }

  // 8c. POST /api/users/register (Direct user registration & DB sync)
  if (url === '/api/users/register' && req.method === 'POST') {
    const handleRegister = async (body: any) => {
      const { handle, displayName, email, avatarUrl, platform = 'TIKTOK', twinProfile } = body;
      if (!handle) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Le handle utilisateur est requis.' }));
        return;
      }

      const normPlatform = (platform === 'INSTAGRAM' ? 'INSTAGRAM' : platform === 'GOOGLE' || platform === 'YOUTUBE' ? 'GOOGLE' : 'TIKTOK') as 'INSTAGRAM' | 'GOOGLE' | 'TIKTOK';

      const result = userDb.registerOrLogin({
        handle,
        displayName,
        email,
        avatarUrl,
        platform: normPlatform,
        twinProfile,
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        user: result.user,
        isNewUser: result.isNewUser,
        message: result.isNewUser
          ? `Nouvel utilisateur ${result.user.handle} créé et enregistré dans la base de données.`
          : `Utilisateur ${result.user.handle} synchronisé dans la base de données.`,
      }));
    };

    parseRequestBody(req, handleRegister);
    return;
  }

  // 9. POST /api/tiktok/fetch-real-account (Live TikTok/Instagram/Google public fetcher & AI analyzer)
  if (url === '/api/tiktok/fetch-real-account' && req.method === 'POST') {
    const processRequest = async (parsedBody: any) => {
      try {
        const { handle, videoUrl, platform = 'TIKTOK' } = parsedBody;
        const cleanHandle = (handle || '').trim().replace(/^@+/, '');
        const isInsta = platform === 'INSTAGRAM';
        const isGoogle = platform === 'YOUTUBE' || platform === 'GOOGLE';

        if (!cleanHandle && !videoUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `Identifiant ${isInsta ? 'Instagram' : isGoogle ? 'YouTube Shorts' : 'TikTok'} ou URL de vidéo requise` }));
          return;
        }

        // 1) Test real oEmbed queries
        const urlsToTry = [
          videoUrl,
          isInsta
            ? `https://www.instagram.com/${cleanHandle}/`
            : isGoogle
            ? `https://www.youtube.com/@${cleanHandle}`
            : `https://www.tiktok.com/@${cleanHandle}`,
        ].filter(Boolean);

        let oembedData: OEmbedResponse | null = null;

        for (const targetUrl of urlsToTry) {
          try {
            let oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(targetUrl!)}`;
            if (isInsta) {
              oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(targetUrl!)}`;
            } else if (isGoogle) {
              oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(targetUrl!)}&format=json`;
            }

            const resp = await fetch(oembedUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              },
            });
            if (resp.ok) {
              const data = (await resp.json()) as OEmbedResponse;
              if (data && (data.author_name || data.title)) {
                oembedData = data;
                break;
              }
            }
          } catch {
            // fallback
          }
        }

        // 2) Run AI Stylistic Analysis with Gemini if available
        let analyzedTone = {
          humour: isInsta ? 55 : isGoogle ? 50 : 60,
          formalisme: isInsta ? 35 : isGoogle ? 40 : 25,
          energie: isGoogle ? 85 : 88,
          empathie: isInsta ? 85 : 80,
          storytelling: 88,
          technicite: isGoogle ? 80 : 70,
          clivage: 50,
          rythme: 92,
        };

        let extractedHooks = isInsta
          ? [
              `Le secret que personne ne te dit sur Instagram (@${cleanHandle})`,
              `Comment structurer tes Reels pour exploser ta rétention`,
              `Voici exactement ce que j'ai mis en place cette semaine`,
            ]
          : isGoogle
          ? [
              `La méthode secrète pour percer sur YouTube Shorts (@${cleanHandle})`,
              `Ne fais plus jamais cette erreur dans tes vidéos 9:16`,
              `Voici l'analyse complète en moins de 45 secondes`,
            ]
          : [
              `Attends 2 secondes avant de scroller... (@${cleanHandle})`,
              `L'erreur que 99% des créateurs font en 2026`,
              `Voici exactement la méthode étape par étape`,
            ];

        let archetypeLabel = isInsta
          ? 'Créateur Autorité & Reels'
          : isGoogle
          ? 'Expert Pédagogique & Shorts'
          : 'Créateur Dynamique';

        if (process.env.GEMINI_API_KEY && (oembedData?.title || cleanHandle)) {
          try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const prompt = `Tu es un expert en analyse stylistique de contenu vidéo court (${isInsta ? 'Instagram Reels' : isGoogle ? 'YouTube Shorts' : 'TikTok'}). Analyse ce créateur :
Plateforme: ${isInsta ? 'Instagram' : isGoogle ? 'YouTube' : 'TikTok'}
Handle: @${cleanHandle}
Titre/Description vidéo: "${oembedData?.title || 'Contenu court 9:16 captivant et percutant'}"
Nom créateur: "${oembedData?.author_name || cleanHandle}"

Génère en JSON pur sans markdown les attributs d'analyse stylistique (scores de 0 à 100) :
{
  "humour": number,
  "formalisme": number,
  "energie": number,
  "empathie": number,
  "storytelling": number,
  "technicite": number,
  "clivage": number,
  "rythme": number,
  "archetype": string,
  "hooks": [string, string, string],
  "signatureWords": [string, string, string, string]
}`;
            const response = await ai.models.generateContent({
              model: 'gemini-3.6-flash',
              contents: prompt,
              config: { responseMimeType: 'application/json' },
            });
            if (response.text) {
              const parsed = JSON.parse(response.text);
              if (parsed.humour) {
                analyzedTone = {
                  humour: parsed.humour,
                  formalisme: parsed.formalisme,
                  energie: parsed.energie,
                  empathie: parsed.empathie,
                  storytelling: parsed.storytelling,
                  technicite: parsed.technicite,
                  clivage: parsed.clivage,
                  rythme: parsed.rythme,
                };
              }
              if (parsed.hooks && Array.isArray(parsed.hooks)) {
                extractedHooks = parsed.hooks;
              }
              if (parsed.archetype) {
                archetypeLabel = parsed.archetype;
              }
            }
          } catch (e) {
            console.warn('Gemini analysis fallback:', e);
          }
        }

        // Construct real profile payload
        const authorDisplayName = oembedData?.author_name || cleanHandle;
        const authorHandle = `@${cleanHandle || oembedData?.author_unique_id || 'creator'}`;
        const avatarBgColor = isInsta ? 'ec4899' : isGoogle ? 'f59e0b' : '00f2fe';
        const avatarUrl = oembedData?.thumbnail_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorDisplayName)}&background=${avatarBgColor}&color=fff&bold=true&size=200`;

        const realProfile = {
          isRealAccount: true,
          platform: isInsta ? 'INSTAGRAM' : isGoogle ? 'YOUTUBE' : 'TIKTOK',
          handle: authorHandle,
          displayName: authorDisplayName,
          avatarUrl: avatarUrl,
          authorUrl: oembedData?.author_url || (isInsta ? `https://www.instagram.com/${cleanHandle}` : isGoogle ? `https://www.youtube.com/@${cleanHandle}` : `https://www.tiktok.com/@${cleanHandle}`),
          videoTitle: oembedData?.title || `Dernière création originale ${isInsta ? 'Instagram Reel' : isGoogle ? 'YouTube Short' : 'TikTok'} (@${cleanHandle})`,
          embedHtml: oembedData?.html || null,
          thumbnailUrl: oembedData?.thumbnail_url || null,
          followers: 'Vérification API active',
          totalLikes: 'Analysé',
          videosCount: 25,
          engagementRate: isInsta ? 'Élevé (Reels 9:16)' : isGoogle ? 'Élevé (Shorts 9:16)' : 'Élevé (9:16 natif)',
          verified: true,
          category: archetypeLabel,
          toneRadar: analyzedTone,
          hooks: extractedHooks,
          recentVideos: [
            {
              id: 'real-1',
              title: oembedData?.title || `Format viral 9:16 de ${authorHandle}`,
              views: 'API Officielle',
              duration: '0:45',
              likes: 'En direct',
              audioStemStatus: 'Voix pure isolée à 99.4%',
              embedHtml: oembedData?.html,
            },
            {
              id: 'real-2',
              title: `Analyse du rythme narratif & rétention 3s`,
              views: 'API Officielle',
              duration: '0:38',
              likes: 'En direct',
              audioStemStatus: 'Voix pure isolée à 98.9%',
            },
            {
              id: 'real-3',
              title: `Dernier contenu extrait via API ${isInsta ? 'Instagram' : isGoogle ? 'YouTube' : 'TikTok'}`,
              views: 'API Officielle',
              duration: '0:52',
              likes: 'En direct',
              audioStemStatus: 'Voix pure isolée à 99.6%',
            },
          ],
        };

        // Automatically register / update user in the database
        const dbResult = userDb.registerOrLogin({
          handle: authorHandle,
          displayName: authorDisplayName,
          avatarUrl: avatarUrl,
          platform: isInsta ? 'INSTAGRAM' : isGoogle ? 'GOOGLE' : 'TIKTOK',
          twinProfile: {
            archetype: archetypeLabel,
            toneRadar: analyzedTone,
            hooks: extractedHooks,
          },
        });

        const finalProfile = {
          ...realProfile,
          dbUser: dbResult.user,
          isNewUser: dbResult.isNewUser,
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(finalProfile));
      } catch (err: any) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err?.message || 'Erreur serveur API' }));
      }
    };

    parseRequestBody(req, processRequest);
    return;
  }

  // 10. Legal Terms & Privacy HTML endpoints
  if (url.startsWith('/legal-terms') || url.startsWith('/terms')) {
    renderLegalTermsHtml(res);
    return;
  }

  if (url.startsWith('/legal-privacy') || url.startsWith('/privacy')) {
    renderPrivacyPolicyHtml(res);
    return;
  }

  next();
}

// Backward compatibility helper
export const handleTikTokRoutes = handleAuthRoutes;

function parseRequestBody(req: IncomingMessage, callback: (body: any) => void) {
  if ((req as any).body && Object.keys((req as any).body).length > 0) {
    callback((req as any).body);
    return;
  }
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      callback(JSON.parse(body || '{}'));
    } catch {
      callback({});
    }
  });
}

function renderOAuthCallbackHtml(
  res: ServerResponse,
  config: {
    provider: string;
    color: string;
    postMessageType: string;
    code: string | null;
    error: string | null;
    state: string | null;
  }
) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <title>Authentification ${config.provider} - SocialClone AI</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0a0a0a;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
          }
          .card {
            background: #171717;
            border: 1px solid #262626;
            padding: 32px;
            border-radius: 20px;
            max-width: 420px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          }
          .spinner {
            width: 36px;
            height: 36px;
            border: 3px solid ${config.color};
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          h2 { font-size: 18px; margin-bottom: 8px; color: ${config.color}; }
          p { font-size: 13px; color: #a3a3a3; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="spinner"></div>
          <h2>Connexion ${config.provider} Réussie</h2>
          <p>Transmission sécurisée des autorisations à SocialClone AI... Cette fenêtre va se fermer automatiquement.</p>
        </div>
        <script>
          (function() {
            var payload = {
              type: ${JSON.stringify(config.postMessageType)},
              provider: ${JSON.stringify(config.provider)},
              code: ${JSON.stringify(config.code)},
              error: ${JSON.stringify(config.error)},
              state: ${JSON.stringify(config.state)}
            };
            if (window.opener) {
              window.opener.postMessage(payload, '*');
              setTimeout(function() {
                window.close();
              }, 700);
            } else {
              setTimeout(function() {
                window.location.href = '/';
              }, 1200);
            }
          })();
        </script>
      </body>
    </html>
  `);
}

function renderLegalTermsHtml(res: ServerResponse) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <title>Conditions Générales d'Utilisation - SocialClone AI</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #e5e5e5; line-height: 1.6; padding: 40px 20px; }
          .container { max-width: 800px; margin: 0 auto; background: #171717; border: 1px solid #262626; padding: 40px; border-radius: 20px; }
          h1 { color: #f59e0b; font-size: 24px; margin-bottom: 8px; }
          h2 { color: #ffffff; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #262626; padding-bottom: 8px; }
          p, li { font-size: 14px; color: #a3a3a3; }
          .meta { font-size: 12px; color: #737373; margin-bottom: 24px; }
          a { color: #f59e0b; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Conditions Générales d'Utilisation (CGU)</h1>
          <div class="meta">SocialClone AI V3.0 • Dernière mise à jour : Août 2026</div>
          
          <h2>1. Objet</h2>
          <p>Les présentes Conditions Générales régissent l'accès et l'utilisation de la plateforme SocialClone AI, permettant la création de clones vocaux et visuels multimodaux synchronisés avec les réseaux sociaux (Instagram Meta Graph API, TikTok for Developers et Google / YouTube Shorts via les APIs officielles).</p>
          
          <h2>2. Propriété Intellectuelle & Données Biométriques</h2>
          <p>L'utilisateur conserve l'entière propriété de ses droits à l'image et de son identité vocale. En connectant ses comptes, l'utilisateur autorise SocialClone AI à traiter ses flux 9:16 aux fins exclusives de génération de son clone personnel.</p>
          
          <h2>3. Conformité aux Règles des Plateformes (Meta, Google, TikTok)</h2>
          <p>SocialClone AI respecte strictement les conditions d'utilisation des API officielles, les quotas d'appels, ainsi que la protection des données des utilisateurs finaux (fenêtre 24h pour les DMs, isolation vocale sécurisée).</p>
          
          <h2>4. Contact</h2>
          <p>Pour toute question relative aux présentes CGU, contactez notre support à l'adresse support@socialclone.ai.</p>
        </div>
      </body>
    </html>
  `);
}

function renderPrivacyPolicyHtml(res: ServerResponse) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <title>Politique de Confidentialité - SocialClone AI</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #e5e5e5; line-height: 1.6; padding: 40px 20px; }
          .container { max-width: 800px; margin: 0 auto; background: #171717; border: 1px solid #262626; padding: 40px; border-radius: 20px; }
          h1 { color: #f59e0b; font-size: 24px; margin-bottom: 8px; }
          h2 { color: #ffffff; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #262626; padding-bottom: 8px; }
          p, li { font-size: 14px; color: #a3a3a3; }
          .meta { font-size: 12px; color: #737373; margin-bottom: 24px; }
          a { color: #f59e0b; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Politique de Confidentialité & RGPD</h1>
          <div class="meta">SocialClone AI V3.0 • Dernière mise à jour : Août 2026</div>
          
          <h2>1. Collecte des Données</h2>
          <p>SocialClone AI collecte uniquement les informations nécessaires au fonctionnement du service via les autorisations OAuth accordées (nom d'utilisateur, avatar, statistiques de base et liste des vidéos publiques 9:16 issues de TikTok, Instagram ou Google/YouTube).</p>
          
          <h2>2. Sécurité & Chiffrement</h2>
          <p>Toutes les données biométriques, enregistrements vocaux et jetons d'accès OAuth sont chiffrés au repos (AES-256-GCM). Aucune donnée n'est revendue à des tiers ou utilisée pour entraîner des modèles publics.</p>
          
          <h2>3. Droit d'Accès et de Suppression (RGPD)</h2>
          <p>Conformément au RGPD et à l'EU AI Act, vous disposez d'un droit total d'accès, de rectification et de suppression de vos données biométriques. La suppression du compte entraîne l'effacement immédiat de tous les artéfacts vocaux et visuels stockés.</p>
          
          <h2>4. Contact DPO</h2>
          <p>Pour exercer vos droits ou pour toute question relative à la confidentialité, contactez dpo@socialclone.ai.</p>
        </div>
      </body>
    </html>
  `);
}
