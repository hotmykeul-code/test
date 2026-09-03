# 📚 WIKI GLOBAL & MASTER SPECIFICATIONS — SOCIALCLONE AI (V3.0)

Document maître consolidé de référence technique, produit, architecture et légal pour l'implémentation de la plateforme **SocialClone AI**.

---

## 📑 TABLE DES MATIÈRES
1. [Vision Produit & Charte de Vocabulaire](#1-vision-produit--charte-de-vocabulaire)
2. [Onboarding, Consentement & Total Human Clone](#2-onboarding-consentement--total-human-clone)
3. [Studio IA de Création Unifié & Multi-Formats](#3-studio-ia-de-création-unifié--multi-formats)
4. [Copilote DM & Messagerie Conforme (API Officielle)](#4-copilote-dm--messagerie-conforme-api-officielle)
5. [Smart Scheduler & Planificateur Résilient](#5-smart-scheduler--planificateur-résilient)
6. [Modèle Économique, Tarification & Monétisation Cross-Platform](#6-modèle-économique-tarification--monétisation-cross-platform)
7. [Architecture Logicielle & Patterns d'Ingénierie](#7-architecture-logicielle--patterns-dingénierie)
8. [Schéma de Base de Données (Prisma PostgreSQL)](#8-schéma-de-base-de-données-prisma-postgresql)
9. [Conformité Juridique, RGPD & Traçabilité C2PA](#9-conformité-juridique-rgpd--traçabilité-c2pa)
10. [Variables d'Environnement (.env.example)](#10-variables-denvironnement-envexample)
11. [Stratégie Marketing, SEO, Publicité & Croissance Virale](#11-stratégie-marketing-seo-publicité--croissance-virale)

---

## 1. VISION PRODUIT & CHARTE DE VOCABULAIRE

### 1.1. Proposition de Valeur
SocialClone AI est une plateforme SaaS cross-platform (Web, iOS, Android) permettant aux créateurs de contenu, solopreneurs et agences de cloner automatiquement leur identité numérique (« Total Human Clone » : voix, gestuelle, vêtements, visage et style rédactionnel) dès la première synchronisation de compte, de générer et modifier leurs contenus au sein d'un Studio IA unifié, de maximiser leur portée organique et de convertir leurs abonnés en clients via des messages privés automatisés et conformes.

### 1.2. Règles de Vocabulaire & Philosophie du Langage (FR)
L'interface utilisateur, les notifications et les invites IA bannissent tout jargon technique abstrait au profit de termes clairs, directs et orientés action :

| Terme Déconseillé / Jargon | Terme Standard SocialClone AI | Description / Rôle dans l'UI |
| :--- | :--- | :--- |
| *Copywriting abstrait* | **Rédaction de post / Contenu vidéo** | Désigne le texte ou le script produit. |
| *Hook neuro-linguistique* | **Phrase de départ / Accroche (Hook)** | Les 3 premières secondes ou la 1ère ligne. |
| *Clone multimodal abstrait* | **Votre Clone Intégral / Human Twin** | L'ensemble voix, gestuelle, visage et corps. |
| *Avatar IA / Deepfake* | **Avatar Photoréaliste Sublimé** | Version animée, valorisée et photoréaliste. |
| *Sample audio upload* | **Studio de Calibrage Guidé** | Enregistrement express in-app de la voix et du corps. |
| *Style prompt engineering* | **Votre Style Rédactionnel / Voice Twin** | Calibrage de votre manière unique de communiquer. |
| *Call to Action (CTA)* | **Phrase de fin (Conclusion & Invitation)** | L'invitation finale au partage, like ou commentaire. |
| *Thread social* | **Discussion / Suite de messages** | Séquence connectée de plusieurs posts sur Threads. |

---

## 2. ONBOARDING, CONSENTEMENT & TOTAL HUMAN CLONE

Le parcours d'onboarding de l'utilisateur (Écran 1) est articulé autour d'un tunnel séquentiel fluide et conforme en 7 étapes clés :

### 2.1. Étape 1 — Inscription OAuth Multicanaux
L'utilisateur crée son compte principal via les fournisseurs d'identité sécurisés :
- **Google Sign-In** (Web & Mobile).
- **Apple Sign-In** (iOS & Web).
- **Meta (Facebook / Instagram Auth)**.
- **TikTok Login Kit**.

### 2.2. Étape 2 — Étape Obligatoire de Consentement Biométrique & Légal (RGPD)
Avant toute synchronisation de compte ou traitement de média, validation obligatoire de deux consentements explicites :
1. **Case 1 (CGU & Confidentialité)** : *« J'accepte les Conditions Générales d'Utilisation (CGU) et la Politique de Confidentialité. »*
2. **Case 2 (Données Biométriques & Droit à l'Image)** : *« J'autorise expressément SocialClone AI à analyser et traiter mes traits faciaux, ma silhouette et ma voix dans le but exclusif de générer mon clone numérique personnel. Je certifie être le titulaire légitime du compte connecté et/ou des médias fournis. »*

### 2.3. Étape 3 — Synchronisation OAuth du Compte Social (Instagram ou TikTok)
Connexion en 1 clic du compte créateur ou professionnel à cloner via les API officielles (*Instagram Basic Display / Graph API* ou *TikTok Creator API*).

### 2.4. Étape 4 — Analyse Multimodale Approfondie du Profil
Dès la synchronisation réussie, le moteur IA ingère et traite les données publiques et autorisées :
- **Analyse des Posts & DMs** : Évaluation des 20 à 30 dernières légendes et des échanges DMs pour extraire le vocabulaire signature, les emojis fétiches et structurer le **Radar Stylistique à 8 Axes**.
- **Extraction Vocale Débruitée** : Isolation des pistes audio où la voix du créateur est nette pour modéliser le **Voice Twin**.
- **Extraction Visuelle & Keyframes** : Sélection automatique des 3 à 5 meilleures images clés (visage net, posture, style vestimentaire habituel).
- **Studio de Calibrage Guidé Express (Fallback)** : Si le compte manque de matière, enregistrement express in-app (audio 20s + vidéo 10s).

### 2.5. Étape 5 — Validation du Clone, de la Voix et du Style
Présentation interactive du clone généré :
- **Écoute du Voice Twin** : Test d'échantillon audio généré avec la voix clonée.
- **Aperçu de l'Avatar Photoréaliste Sublimé** : Rendu dynamique avec option *Subtle Beauty Enhancement* activable.
- **Ajustement du Radar Stylistique** : Réglage fin des curseurs (Humour, Énergie, Empathie, Formalisme, etc.).

### 2.6. Étape 6 — Proposition Virale : Génération du Clip Promotionnel (+50 Crédits)
Proposition d'un boost de démarrage immédiat :
- Message : *« 🎁 Générez et postez votre première vidéo officielle "Mon clone IA est en ligne" pour débloquer immédiatement 50 crédits vidéo offerts ! »*
- Choix utilisateur : Accepter (*Générer & Publier*) ou Passer (*Continuer vers le Studio*).

### 2.7. Étape 7 — Publication Automatique & Confirmation d'Inscription
- **En cas de validation** : L'IA génère la vidéo 9:16 avec l'avatar et les sous-titres, la publie automatiquement sur le compte Instagram ou TikTok synchronisé via l'API officielle, et crédite instantanément les **50 crédits offerts**.
- **Envoi de Confirmation** : Envoi immédiat d'un email transactionnel et/ou d'une notification in-app confirmant l'inscription, le succès du clonage et le solde de crédits disponible.
- Redirection directe vers le tableau de bord principal.

---

## 3. STUDIO IA DE CRÉATION UNIFIÉ & MULTI-FORMATS

### 3.1. Formats & Réseaux Pris en Charge
- **TikTok & Instagram Reels (9:16)** : Vidéos courtes rythmées avec voix off clonée et sous-titres dynamiques.
- **YouTube Shorts (9:16)** : Formats vidéo verticaux.
- **Carrousels Instagram (4:5 / 1:1)** : 3 diapositives optimisées pour la rétention et l'interaction.
- **Stories Interactives** : Visuels et sondages prêts à publier.
- **Discussions Threads** : Suites de 3 à 5 messages connectés.

### 3.2. Moteur de Production Vidéo IA (Nano Banana)
- **Génération Complète Incarnée (Prompt-to-Video)** :
  - Production de vidéos 9:16 ou 16:9 mettant en scène le clone intégral du créateur.
  - Synchronisation labiale exacte (lip-sync), mouvements corporels et des mains naturels, respect du look vestimentaire et incrustation de sous-titres dynamiques.
- **Remix de Tendances (Trend Remix / Video-to-Video)** :
  - Saisie d'un lien public TikTok / Reel / Short concurrent ou téléversement d'un clip.
  - Réécriture immédiate de la structure dans le ton du créateur + régénération complète incarnée par son propre avatar sublimé.

### 3.3. Moteur de Carrousels 3 Images IA
Structure narrative en 3 diapositives :
1. **Diapositive 1 (Hook)** : Phrase d'accroche percutante + visuel fort d'interruption de défilement (scroll-stopper) intégrant l'avatar sublimé.
2. **Diapositive 2 (Valeur)** : Cœur de la méthode / tutoriel pas à pas.
3. **Diapositive 3 (Action)** : Conclusion, synthèse et invitation à l'action (sauvegarde, commentaire, partage).

### 3.4. Outils Complémentaires Intégrés
- **Simulateur PhonePreview (Safe Zones)** : Prévisualisation responsive en conditions réelles avec calques d'interface (TikTok, Reels, Shorts) pour s'assurer qu'aucun sous-titre n'est masqué par les boutons natifs de l'application.
- **Idéation en Lot (Batch Ideation)** : Suggestions automatisées de 5 à 10 concepts viraux classés par angle d'approche (Contre-intuitif, Histoire personnelle, Tutoriel rapide, Erreur fréquente) avec score prédictif.
- **Envoi direct vers le Planificateur** : Export immédiat du contenu finalisé dans le calendrier éditorial.

---

## 4. COPILOTE DM & MESSAGERIE CONFORME (API OFFICIELLE)

### 4.1. Conformité API Officielle & Fenêtre des 24 Heures
Le module de messagerie privée est connecté exclusivement aux API officielles (*Messenger API for Instagram* et *TikTok Direct Message API*) :
- **Éligibilité** : Réservé aux comptes professionnels (*Instagram Business / Creator Accounts* reliés à une page Facebook, et comptes professionnels TikTok).
- **Règle stricte des 24 heures (24h Standard Messaging Window)** : L'IA ne peut générer et envoyer de réponses automatisées que si l'utilisateur externe a initié un échange au cours des 24 dernières heures.
- **Verrouillage hors fenêtre** : Si la fenêtre de 24h est expirée, l'envoi direct est automatiquement bloqué côté backend, et l'interface affiche l'indicateur *« Fenêtre 24h expirée — Réponse manuelle requise »*.

### 4.2. Triage Intelligent & Détection d'Intention
Chaque message entrant est analysé en temps réel pour déterminer :
- L'intention : Prospect qualifié, Question technique, Collaboration / Partenariat, Remerciement, Réclamation.
- Le niveau d'urgence et le sentiment associé.

### 4.3. Interrupteur Général & Contrôle d'Activation du Bot (Master Toggle ON/OFF)
L'encart latéral droit du Copilote IA intègre un panneau de contrôle en tête d'interface :
- **Interrupteur Général (Bot Status : ACTIVE / INACTIVE)** : Commutateur visuel lumineux permettant d'activer ou de désactiver instantanément l'assistance et les réponses IA pour le compte ou la conversation en cours.
- **Bouton d'Arrêt d'Urgence (*Emergency Pause*)** : Permet de suspendre en 1 clic toutes les files d'attente d'envois automatiques et de basculer en mode manuel exclusif.
- **Sélecteur de Mode en 1-Clic** : Bascule immédiate entre les 3 modes (*100% Auto*, *Semi-Auto*, *Hybride*).

### 4.4. Les 3 Modes d'Automatisation Configurables
1. **Mode Automatique (100 % Auto)** : L'IA répond immédiatement aux messages entrants selon le Voice Twin calibré, sans validation manuelle préalable.
2. **Mode Semi-Automatique (Copilote)** : L'IA prépare 3 variantes de réponses (*Directe & Chaleureuse*, *Pédagogique & Complète*, *Conversion & Vente*). Le créateur ou son Community Manager clique sur la variante choisie pour l'expédier instantanément.
3. **Mode Hybride** : Traitement 100 % automatique immédiat sur les mots-clés configurés (ex. "GUIDE", "PRIX", "PROMO", "LIEN"), et mise en attente copilote pour toutes les autres requêtes complexes.

### 4.5. Notes Vocales Stylisées (Texte Oralisé)
Génération de scripts de réponses formulés pour l'oral (rythme parlé, phrases courtes et dynamiques), prêts à être dictés ou enregistrés directement par le créateur.

---

## 5. SMART SCHEDULER & PLANIFICATEUR RÉSILIENT

### 5.1. Optimiseur d'Audience IA (Smart Scheduler)
- **Analyse d'Audience en Continu** : L'algorithme croise l'historique d'engagement du compte et les tendances horaires de la niche.
- **Scoring Prédictif** : Chaque créneau horaire de la semaine reçoit une note de portée algorithmique estimée.
- **Bouton « Auto-Placer au Meilleur Moment »** : En un clic, la publication est programmée sur le créneau garantissant la plus haute visibilité.

### 5.2. Système de Publication Résilient à 2 Niveaux
- **Niveau 1 (Publication Directe)** : Envoi automatique du post à l'heure programmée via les API officielles des plateformes sociales.
- **Niveau 2 (Fallback Mobile Intelligent)** : En cas d'échec de publication API (erreur 400/401/500 ou indisponibilité réseau), le système déclenche immédiatement :
  1. Une notification push mobile haute priorité sur le smartphone du créateur via Expo Notifications.
  2. Le téléchargement local du média (vidéo ou images du carrousel).
  3. La copie automatique de la légende, des hashtags et mentions dans le presse-papier de l'appareil.
  4. L'ouverture en un clic de l'application native (Instagram/TikTok) prête à recevoir le média.

---

## 6. MODÈLE ÉCONOMIQUE, TARIFICATION & MONÉTISATION CROSS-PLATFORM

| Paramètres & Fonctionnalités | 🟢 Formule Gratuite (Essai) | ⚡ Formule Pro (9 € / mois - 9,99 $ IAP) | 👑 Formule Agence (Sur Devis) |
| :--- | :---: | :---: | :---: |
| **Facturation Supportée** | Gratuit | Web (Stripe), iOS (App Store), Android (Play Store) | Web uniquement (Facturation Stripe Invoice) |
| **Comptes Réseaux Connectés** | 1 compte (1 seul réseau) | 1 compte par réseau supporté | Multi-comptes sur mesure (selon contrat) |
| **Clonage & Avatar Photoréaliste** | Inclus (Voix propre / Keyframes) | Inclus + Studio Guidé Mobile/Web | Multi-clones et avatars dédiés |
| **Recalibrage du Clone Avatar** | Initial uniquement | 🔄 1 recalibrage tous les 30 jours | 🔄 1 recalibrage / 30 jours par compte |
| **Studio IA : Carrousels & Textes**| Quota découverte (3 carrousels) | Illimité | Illimité |
| **Vidéos IA avec Clone Complet** | ❌ Verrouillé | Quota mensuel inclus (via crédits) | Quota sur mesure selon devis |
| **Packs de Crédits Supplémentaires**| Non disponible | ✅ Achat in-app (IAP) & Web (Stripe) | ✅ Facturation consolidée |
| **Planificateur IA & Auto-Placer** | Manuel uniquement | ✅ Optimisation IA + Auto-Fallback | ✅ Optimisation IA + Auto-Fallback |
| **Copilote DM & Mots-Clés** | Semi-auto uniquement | ✅ Auto, Semi-Auto, Hybride | ✅ Auto, Semi-Auto, Hybride |
| **Membres d'Équipe Inclus** | 1 utilisateur | 1 utilisateur | Équipe personnalisée (RBAC complet) |

---

## 7. ARCHITECTURE LOGICIELLE & PATTERNS D'INGÉNIERIE

### 7.1. Structure du Monorepo Turborepo
- `apps/web` : Application Next.js 14+ (App Router, Server Actions, Route Handlers).
- `apps/mobile` : Application React Native / Expo SDK 51+ (iOS & Android).
- `apps/worker` : Microservice autonome Node.js pour le traitement d'arrière-plan BullMQ.
- `packages/core` : Logique métier pure, ports/interfaces, règles de domaine, validation Zod.
- `packages/db` : Implémentations concrètes des accès données et factory dynamique.
- `packages/ai-providers` : Adaptateurs des fournisseurs d'IA avec circuit breaker.
- `packages/ui` : Composants partagés (Tailwind / NativeWind).
- `packages/api` : Client API typé, wrappers RevenueCat & Stripe.

### 7.2. Pattern SGBD Agnostique (Repository Pattern)
Le domaine métier (`packages/core`) ne dépend d'aucun ORM ou pilote de base de données spécifique :
- **Contrats d'interface (`packages/core/ports/repositories`)** : `IUserRepository`, `IJobRepository`, `ISocialAccountRepository`, etc.
- **Adaptateurs (`packages/db/adapters`)** : Implémentations concrètes pour Prisma (PostgreSQL), Drizzle (MySQL) ou Turso (libSQL/SQLite).
- **Factory d'injection (`packages/db/factory.ts`)** : Sélection dynamique de l'adaptateur via la variable `DB_DRIVER`.

```typescript
// packages/core/ports/repositories/index.ts
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  updateCreditsAtomically(userId: string, amount: number): Promise<User>;
  updateSubscription(userId: string, plan: Plan, customerId?: string): Promise<User>;
}

export interface IJobRepository {
  createJob(data: CreateJobDTO): Promise<GenerationJob>;
  updateStatus(jobId: string, status: JobStatus, progress: number, result?: any, error?: string): Promise<void>;
  getJobById(jobId: string): Promise<GenerationJob | null>;
}
```

### 7.3. Pattern IA Agnostique & Routeur de Coûts (Strategy Pattern)
Aucun fournisseur d'IA n'est couplé en dur dans le code :
- **Interfaces IA (`packages/core/ports/ai`)** : `IVideoGenerator`, `IVoiceCloneEngine`, `ILLMProvider`.
- **Arbitrage de Coût & Fallback (`AIRouterService`)** :
  - *Tâches légères / Triage DM* : Google Gemini 1.5 Flash ou Claude 3.5 Haiku (faible coût).
  - *Générations Pro / Voice Twin* : Claude 3.5 Sonnet / GPT-4o.
  - *Génération Vidéo* : Nano Banana avec bascule automatique vers Fal.ai / Replicate en cas d'erreur API (HTTP 429/500).

### 7.4. Traitement Asynchrone (BullMQ + Redis + SSE)
- Les requêtes de génération de vidéo ne bloquent jamais la connexion HTTP :
  1. `POST /api/studio/generate-video` décrémente les crédits atomiquement et crée un `GenerationJob` (`status: PENDING`).
  2. Le payload est poussé dans la file **BullMQ / Redis**.
  3. L'API répond immédiatement `202 Accepted` avec le `jobId`.
  4. Le client (Web/Mobile) ouvre un flux **Server-Sent Events (SSE)** sur `/api/jobs/:id/stream`.
  5. Le microservice `apps/worker` traite le rendu, émet la progression en temps réel via Redis Pub/Sub et clôture l'opération en base.

### 7.5. Pipeline d'Upload Direct (Presigned URLs)
Les fichiers vidéo lourds de calibrage ne transitent jamais par les serveurs Next.js :
1. Le client demande une URL de téléversement : `POST /api/storage/presigned-url`.
2. Le serveur génère une URL signée S3 / Cloudflare R2 expirant en 5 minutes.
3. Le client téléverse directement le binaire en `PUT` vers le bucket de stockage objet.

---

## 8. SCHÉMA DE BASE DE DONNÉES (PRISMA POSTGRESQL)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  OWNER
  ADMIN
  CREATOR
  COMMUNITY_MANAGER
}

enum Plan {
  FREE
  PRO
  AGENCY
}

enum JobStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

enum DmMode {
  AUTO
  COPILOT
  HYBRID
}

model User {
  id                String         @id @default(cuid())
  email             String         @unique
  passwordHash      String?
  name              String?
  role              Role           @default(CREATOR)
  plan              Plan           @default(FREE)
  creditsBalance    Int            @default(10)
  stripeCustomerId  String?
  revenueCatAppId   String?
  consentBiometrics Boolean        @default(false)
  consentTermsAt    DateTime?
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt

  accounts          SocialAccount[]
  clones            HumanClone[]
  jobs              GenerationJob[]
  scheduledPosts    ScheduledPost[]
  dmAutomations     DmAutomation[]
}

model SocialAccount {
  id             String    @id @default(cuid())
  userId         String
  platform       String    // INSTAGRAM, TIKTOK, THREADS, YOUTUBE
  accountId      String
  username       String
  accessToken    String    // AES-256 Encrypted
  refreshToken   String?   // AES-256 Encrypted
  tokenExpiresAt DateTime?
  isActive       Boolean   @default(true)
  createdAt      DateTime  @default(now())

  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model HumanClone {
  id             String    @id @default(cuid())
  userId         String
  voiceModelId   String?
  avatarVideoUrl String?   // WebM 60fps Loop
  avatarGifUrl   String?   // Fallback GIF
  toneRadar      Json      // 8 axes (0-100)
  archetype      String
  signatureWords String[]
  forbiddenWords String[]
  emojis         String[]
  lastRecalibAt  DateTime  @default(now())
  nextRecalibAt  DateTime
  createdAt      DateTime  @default(now())

  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model GenerationJob {
  id           String     @id @default(cuid())
  userId       String
  type         String     // VIDEO_GEN, CAROUSEL_GEN, VOICE_CLONE, AVATAR_RENDER
  status       JobStatus  @default(PENDING)
  progress     Int        @default(0)
  creditsCost  Int        @default(1)
  inputPayload Json
  outputResult Json?
  errorMessage String?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model ScheduledPost {
  id            String    @id @default(cuid())
  userId        String
  platform      String
  mediaUrl      String
  caption       String
  scheduledAt   DateTime
  status        String    // DRAFT, SCHEDULED, PUBLISHED, FAILED_FALLBACK
  bestTimeScore Float?
  createdAt     DateTime  @default(now())

  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model DmAutomation {
  id           String    @id @default(cuid())
  userId       String
  mode         DmMode    @default(HYBRID)
  triggerWords String[]
  autoReply    String?
  isActive     Boolean   @default(true)
  createdAt    DateTime  @default(now())

  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 9. CONFORMITÉ JURIDIQUE, RGPD & TRAÇABILITÉ C2PA

### 9.1. Pages Légales Publiques Dédiées
- `/legal/terms` : Conditions Générales d'Utilisation & de Vente (CGU / CGV).
- `/legal/notice` : Mentions Légales et identification de l'éditeur.
- `/legal/privacy` : Politique de Confidentialité & gestion des cookies (RGPD).
- `/legal/biometrics` : Politique spécifique sur le traitement des données biométriques.

### 9.2. Protection des Données Biométriques (RGPD & EU AI Act)
- **Finalité Exclusive** : Les données faciales, morphologiques et vocales sont strictement réservées à l'entraînement et à l'exécution du clone de l'utilisateur. Aucune revente ni réutilisation externe n'est autorisée.
- **Chiffrement au Repos (AES-256-GCM)** : Les jetons OAuth et les métadonnées d'empreinte vocale sont chiffrés avant enregistrement en base.
- **Droit à l'Effacement Immédiat** : La suppression du compte utilisateur purge instantanément tous les fichiers audio/vidéo stockés sur Cloudflare R2 / AWS S3 et révoque les modèles associés.

### 9.3. Marquage Numérique & Traçabilité C2PA
- Conformément aux exigences de l'EU AI Act sur la transparence des contenus générés par IA, chaque vidéo exportée conserve ou intègre une signature numérique de provenance (**manifeste C2PA**).
- Ce manifeste atteste que la vidéo contient des éléments de synthèse visuelle et vocale générés artificiellement.

### 9.4. Sécurité Backend & Zero Secret Client
- **Zéro Secret côté client** : Aucune clé d'API (Stripe, RevenueCat, Nano Banana, Meta, TikTok) n'est incluse dans les bundles web ou mobiles.
- **Rate Limiting Distribué** : Middleware Redis/Upstash protégeant l'ensemble des routes API contre les abus (20 requêtes/minute/IP sur les routes d'exécution IA).

---

## 10. VARIABLES D'ENVIRONNEMENT (.ENV.EXAMPLE)

```bash
# ==========================================
# 🗄️ BASE DE DONNÉES (AGNOSTIQUE)
# ==========================================
DB_DRIVER="prisma_postgres"
DATABASE_URL="postgresql://postgres:password@localhost:5432/socialclone?schema=public"

# ==========================================
# ⚡ MESSAGE BROKER & CACHE (BULLMQ / REDIS)
# ==========================================
REDIS_URL="redis://localhost:6379"

# ==========================================
# ☁️ STOCKAGE OBJET (S3 / CLOUDFLARE R2)
# ==========================================
STORAGE_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com"
STORAGE_ACCESS_KEY="your_access_key"
STORAGE_SECRET_KEY="your_secret_key"
STORAGE_BUCKET_NAME="socialclone-media"
NEXT_PUBLIC_STORAGE_PUBLIC_URL="https://media.socialclone.ai"

# ==========================================
# 🧠 MOTEURS IA (DÉCOUPLÉS & ROUTEUR DE COÛT)
# ==========================================
PRIMARY_VIDEO_PROVIDER="nano_banana"
NANO_BANANA_API_KEY="nb_live_xxxxxxxxxxxx"
FAL_AI_API_KEY="fal_xxxxxxxxxxxx"
REPLICATE_API_KEY="r8_xxxxxxxxxxxx"

GEMINI_API_KEY="AIzaSyxxxxxxxxxxxx"
ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxx"
OPENAI_API_KEY="sk-xxxxxxxxxxxx"

ELEVENLABS_API_KEY="el_xxxxxxxxxxxx"
CARTESIA_API_KEY="cur_xxxxxxxxxxxx"

# ==========================================
# 💳 FACTURATION & MONÉTISATION (CROSS-PLATFORM)
# ==========================================
STRIPE_SECRET_KEY="sk_live_xxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxx"
REVENUECAT_API_KEY="appl_xxxxxxxxxxxx"
REVENUECAT_WEBHOOK_SECRET="rc_wh_xxxxxxxxxxxx"

# ==========================================
# 🔐 AUTHENTIFICATION & APIS RÉSEAUX SOCIAUX
# ==========================================
NEXTAUTH_SECRET="super_secret_jwt_key_at_least_32_characters"
NEXTAUTH_URL="https://app.socialclone.ai"

INSTAGRAM_CLIENT_ID="xxxxxx"
INSTAGRAM_CLIENT_SECRET="xxxxxx"
TIKTOK_CLIENT_KEY="xxxxxx"
TIKTOK_CLIENT_SECRET="xxxxxx"
```

---

## 11. STRATÉGIE MARKETING, SEO, PUBLICITÉ & CROISSANCE VIRALE

### 11.1. Piliers SEO & Stratégie de Contenu Programmatique
1. **Clusters Thématiques à Forte Intention** :
   - *Cluster 1 (Clonage & Identité IA)* : « clone IA créateur », « cloner sa voix et son visage », « avatar photoréaliste TikTok / Reels ».
   - *Cluster 2 (Automatisation & Productivité)* : « répondeur automatique DM Instagram », « planificateur IA TikTok », « safe zone vidéo short / reels ».
   - *Cluster 3 (Monétisation & Conversion)* : « tunnel de vente DM Instagram », « convertir abonnés en clients DM », « copilote messagerie créateur ».
2. **Architecture Technique & Données Structurées (Schema.org)** :
   - Balisage `SoftwareApplication` et `FAQPage` sur toutes les pages publiques d'outils et de templates.
   - Génération dynamique des balises OpenGraph et Twitter Cards avec prévisualisation personnalisée du clone créateur.
   - Sitemap XML dynamique généré automatiquement pour les templates de posts et études de cas.

### 11.2. Playbook Publicitaire & Acquisition Payante (Ads)
- **Campagnes Meta Ads & TikTok Ads (Formats 9:16 Verticaux)** :
  - *Angle 1 (Gain de Temps / Anti-Burnout)* : « Passez de 15h de tournage par semaine à 1 clic grâce à votre clone IA. »
  - *Angle 2 (Preuve de Réalisme / Side-by-Side)* : Démonstration visuelle côte à côte entre le créateur réel et son avatar animé avec lip-sync parfait.
  - *Angle 3 (Conversion DM)* : « Comment convertir 100% de vos commentaires 'INFO' en ventes en pilote automatique sous 60 secondes. »
- **Campagnes Google Search (Mots-Clés Transactionnels)** :
  - Ciblage d'expressions à haute intention d'achat : *« outil création contenu IA »*, *« automatisation DM Instagram prix »*, *« logiciel clone avatar vidéo »*.

### 11.3. Boucles de Viralité & Programme Partenaires / Affiliation
1. **Marquage Subtil (« Made with SocialClone AI »)** :
   - Présent par défaut sur les contenus générés en formule gratuite (supprimé automatiquement sur les comptes Pro & Agence).
   - Lien cliquable dans la bio ou tag automatique redirigeant vers la page d'inscription avec tracking de parrainage.
2. **Programme d'Affiliation Créateurs & Agences** :
   - 30 % de commission récurrente à vie sur tous les abonnements apportés.
   - Attribution de 50 crédits vidéo offerts pour le parrain et le filleul dès l'activation du compte.
3. **Tunnel d'Acquisition B2B (Agences & Gestionnaires de Comptes)** :
   - Audit gratuit de régularité et de tonalité de compte social (Lead Magnet interactif).
   - Démonstration sur mesure avec clonage instantané du compte de l'agence.

