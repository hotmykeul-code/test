# Project: SocialClone AI (Social AI Twin) SaaS

## Architecture
SocialClone AI is an autonomous AI twin SaaS platform that enables content creators, influencers, and agencies to clone their digital persona (tone of voice, facial/visual style, domain knowledge, conversational habits) to automate high-retention content creation, compliant 24/7 direct messaging, and resilient cross-platform publishing.

### System Components
1. **Frontend Client (React 19 + Tailwind CSS v4 + Motion + Lucide React)**:
   - Modern, high-performance responsive interface for Web, Tablet, and Mobile.
   - 7-Step Onboarding Flow with RGPD/Biometrics double-consent modal, social connect, audio capture (MediaRecorder), and 8-axis Tone Radar interactive visualizer.
   - Studio IA Multi-Formats with interactive 3-slide Carousel builder (Hook, Value, Action), PhonePreview with platform Safe Zones (Instagram, TikTok, YouTube Shorts), Trend Remix generator, and Batch Ideation scorer.
   - Copilote DM 24h console with live 24h window compliance checker, intent detection badge, 3 automation modes (100% Auto, Semi-Auto 3 variants, Hybrid keyword), and oralized voice note generator.
   - Smart Scheduler with 7x4 weekly predictive engagement heatmap, 1-click "Auto-Placer", and Level 2 Mobile Fallback modal with clipboard media copy and direct app launch.
   - Monetization & Pricing Section with monthly/annual discount toggle (-20%), Pro plan spotlight (9 €/mo / 9.99 $ IAP), 30-day recalibration lock notice, and Stripe checkout trigger.
   - Programmatic SEO tools (/tools/safe-zone-simulator, /tools/hook-generator, /vs/manychat) and Growth Playbooks hub (`GrowthPlaybooksHub.tsx`).

2. **Backend Engine (Node.js + Express 4 + Google GenAI SDK + Modular Handlers)**:
   - Modular REST API endpoints for authentication (`/api/auth/*`), human clone calibration (`/api/clone/*`), studio generation (`/api/studio/*`), copilot DM (`/api/copilot/*`), resilient scheduler (`/api/scheduler/*`), billing (`/api/billing/*`), and growth analytics (`/api/growth/*`).
   - File-backed persistent storage (`userDb.ts` / `.users_db.json`) supporting atomic user, clone, post, and DM records.
   - Google Gemini integration for multimodal profile analysis, prompt-to-video generation, and conversational tone emulation.

3. **Verification & Testing Infrastructure**:
   - Automated testing harness with unit, integration, and E2E suites.
   - Opaque-box Tier 1 (Feature Coverage), Tier 2 (Boundaries), Tier 3 (Pairwise Interactions), Tier 4 (Real-World Creator Workloads), and Tier 5 (Adversarial Coverage Hardening).
   - Strict `npm run lint` and `npm run build` verification gates.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Multi-Provider OAuth Authentication | Google, Apple, Meta, TikTok OAuth connect + simulated fallback | M1 | survey_spec_miner_2 / survey_tech_explorer_1 |
| 2 | Mandatory Double Consent | Blocking consent for CGU/RGPD + Biometrics / EU AI Act | M1 | survey_spec_miner_2 |
| 3 | Multimodal Ingestion Pipeline | Social scraping (oEmbed) + manual audio/video/text fallback | M1 | survey_spec_miner_2 / survey_tech_explorer_1 |
| 4 | ToneRadar 8-Axis Engine | 8 personality traits calibration (Humour, Provocation, etc.) | M1 | survey_spec_miner_2 |
| 5 | 6 Creator Archetypes | Mentor, Vulgarisateur, Rebelle, Leader, Expert, Storyteller | M1 | survey_spec_miner_2 |
| 6 | Voice Clone & MediaRecorder | 20s in-app audio capture, speech cadence, and pitch profiling | M1 | survey_spec_miner_2 |
| 7 | Viral Onboarding Incentive | +50 free video credits awarded upon completing onboarding | M1 | survey_spec_miner_2 / survey_growth_explorer_3 |
| 8 | Prompt-to-Video 9:16 Generator | Ultra-realistic 9:16 short-form video generation (Nano Banana, lip-sync) | M2 | survey_spec_miner_2 |
| 9 | Trend Remix (Video-to-Video) | Competitor video viral pattern analysis and clone rewrite | M2 | survey_spec_miner_2 |
| 10 | 3-Slide Carousel Generator | Narrative structure (Hook 4:5/1:1, Valeur, Action) with styling | M2 | survey_spec_miner_2 |
| 11 | PhonePreview Platform Safe-Zones | Overlays for TikTok, Instagram Reels, and YouTube Shorts UI | M2 | survey_spec_miner_2 / survey_growth_explorer_3 |
| 12 | Batch Ideation & Scoring Engine | 4 angles generation with predictive retention scoring (89-96%) | M2 | survey_spec_miner_2 |
| 13 | 24h Messaging Compliance Enforcement | Official API compliance & automatic lock outside 24h window | M3 | survey_spec_miner_2 |
| 14 | Lead Intent & Urgency Classifier | 5 intent categories (ACHAT, INFO, SUPPORT, COLLAB, SPAM) + 3 urgencies | M3 | survey_spec_miner_2 |
| 15 | 3 DM Automation Modes | 100% Auto, Semi-Auto (3 AI variants), Hybrid (Trigger keyword e.g. "GUIDE") | M3 | survey_spec_miner_2 |
| 16 | Oralized Voice Note Synthesizer | Conversational voice notes with realistic human hesitation/intonation | M3 | survey_spec_miner_2 |
| 17 | Emergency Pause & Human Takeover | Instant kill-switch and seamless agent-to-human escalation | M3 | survey_spec_miner_2 |
| 18 | 7x4 Audience Engagement Heatmap | Predictive hourly/weekly best time recommendation scoring (0-100%) | M4 | survey_spec_miner_2 |
| 19 | 1-Click "Auto-Placer" Scheduling | Optimal queue slotting based on creator audience activity | M4 | survey_spec_miner_2 |
| 20 | 2-Tier Resilient Publishing Engine | Level 1 direct API + Level 2 Expo mobile push fallback & clipboard media | M4 | survey_spec_miner_2 |
| 21 | Multi-Channel Queue Management | Unified queue for TikTok, Instagram, YouTube Shorts, LinkedIn, X | M4 | survey_spec_miner_2 |
| 22 | Tiered Monetization (Gratuit, Pro, Agence) | Free (0€, watermark, manual), Pro (9€/mo, 100% auto, no watermark), Agence | M5 | survey_spec_miner_2 / survey_growth_explorer_3 |
| 23 | 30-Day Clone Recalibration Lock | Protection against GPU abuse limiting tone recalibration to once/30d | M5 | survey_spec_miner_2 |
| 24 | Stripe & IAP Cross-Platform Checkout | Stripe customer portal & RevenueCat mobile entitlement bridge | M5 | survey_spec_miner_2 / survey_tech_explorer_1 |
| 25 | SEO Keyword Clusters & Programmatic Pages | High-intent tool pages (/tools/safe-zone-simulator, /tools/hook-generator) | M6 | survey_growth_explorer_3 |
| 26 | High-Converting 9:16 Video Ad Playbooks | 4 structured scripts (Turing Test, Anti-Burnout, Midnight DM, Agency) | M6 | survey_growth_explorer_3 |
| 27 | 5-Stage Automated Email Nurture Funnel | Automated lifecycle email sequence (H+0 to Day 14) for Pro conversion | M6 | survey_growth_explorer_3 |
| 28 | 30% Lifetime Recurring Affiliate Loop | Creator referral loop with dashboard and tracking links | M6 | survey_growth_explorer_3 |
| 29 | Comprehensive Automated E2E Test Suite | Tiers 1-4 opaque-box + Tier 5 adversarial test suite passing 100% | M7 | survey_growth_explorer_3 / survey_tech_explorer_1 |
| 30 | Production Lint & Build Verification | `npm run lint` and `npm run build` with 0 errors and 0 warnings | M8 | survey_tech_explorer_1 |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Onboarding & Total Human Clone 7-Step Engine | 7-step onboarding flow, OAuth, double consent, ToneRadar 8 axes, 6 archetypes, voice recorder, viral bonus | none | DONE |
| M2 | Studio IA Multi-Formats & Generation Engine | Prompt-to-video, Trend remix, 3-slide Carousels, Safe-Zones phone preview, batch ideation | M1 | DONE |
| M3 | Copilote DM 24h & Compliant Messaging Engine | 24h window compliance, intent detection, 3 modes, voice notes, emergency pause | M1 | DONE |
| M4 | Smart Scheduler & 2-Tier Resilient Publishing | 7x4 heatmap, 1-click Auto-Placer, Level 1 API / Level 2 Mobile push fallback, queue manager | M1, M2 | DONE |
| M5 | Monetization, Stripe Billing & Pricing Tiers | Free/Pro 9€/Agence tiers, 30-day recalibration lock, Stripe checkout/portal, quota metering | M1 | DONE |
| M6 | Marketing, SEO, Growth Engine & Ad Playbooks | Programmatic SEO tools, 4 ad scripts, email nurture sequence, 30% affiliate loop | M1, M5 | DONE |
| M7 | E2E Testing Suite (Tiers 1-4) & Adversarial Hardening (Tier 5) | Comprehensive automated test runner, 100% test pass (217 tests), adversarial test cases | M1, M2, M3, M4, M5, M6 | DONE |
| M8 | Final Integration, Build & Lint Zero-Error Verification & Victory Audit | Production build, zero lint errors, forensic integrity audit pass, final handoff | M7 | DONE |

---

## Interface Contracts

### `HumanCloneProfile` & Tone Model
```typescript
export interface ToneRadar {
  humour: number;       // 0-100
  energie: number;      // 0-100
  vulgarisation: number;// 0-100
  empathie: number;     // 0-100
  provocation: number;  // 0-100
  autorite: number;     // 0-100
  storytelling: number; // 0-100
  concision: number;    // 0-100
}

export type Archetype = 'Mentor' | 'Vulgarisateur' | 'Rebelle' | 'Leader' | 'Expert' | 'Storyteller';

export interface HumanCloneProfile {
  id: string;
  name: string;
  archetype: Archetype;
  tone: ToneRadar;
  voiceSampleUrl?: string;
  avatarVideoUrl?: string;
  lastRecalibratedAt: string; // ISO date, enforced 30-day throttle
}
```

### Studio & Content Generation Contracts
```typescript
export interface CarouselSlide {
  id: string;
  type: 'HOOK' | 'VALEUR' | 'ACTION';
  headline: string;
  body: string;
  ctaText?: string;
  backgroundTheme: string;
}

export interface StudioGenerationRequest {
  cloneId: string;
  format: 'VIDEO_9_16' | 'CAROUSEL_3_SLIDES' | 'TREND_REMIX' | 'THREAD';
  topic: string;
  platform: 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE' | 'LINKEDIN';
}
```

### Copilot DM & Messaging Contracts
```typescript
export type DmIntent = 'ACHAT' | 'INFO' | 'SUPPORT' | 'COLLAB' | 'SPAM';
export type DmUrgency = 'CHAUD' | 'TIEDE' | 'FROID';
export type DmMode = 'AUTO' | 'COPILOT' | 'HYBRID';

export interface DmMessageSimulation {
  id: string;
  sender: string;
  avatar: string;
  platform: 'instagram' | 'tiktok';
  receivedAt: string;
  within24h: boolean;
  intent: DmIntent;
  urgency: DmUrgency;
  customerMessage: string;
  suggestedReplies: string[];
  selectedReplyIndex: number;
}
```

### Resilient Scheduler Contracts
```typescript
export interface ScheduledPost {
  id: string;
  cloneId: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'x';
  mediaUrl: string;
  caption: string;
  scheduledTime: string; // ISO format
  status: 'PENDING' | 'PUBLISHED' | 'LEVEL_2_FALLBACK' | 'FAILED';
  resilienceTier: 1 | 2;
  predictedEngagementScore: number; // 0-100
}
```

---

## Code Layout
- `src/App.tsx` — Main application shell & router
- `src/components/`
  - `OnboardingModal.tsx` — 7-step Total Human Clone onboarding flow
  - `FeaturesHumanClone.tsx` — 8-axis Tone Radar & Archetypes
  - `FeaturesStudio.tsx` — Multi-Format Studio, 3-Slide Carousel, Safe-Zones
  - `FeaturesCopilotDM.tsx` — 24h Copilot DM, Intent classifier, Automation modes
  - `FeaturesScheduler.tsx` — 7x4 Heatmap scheduler & Level 2 Mobile Fallback
  - `PricingSection.tsx` — Pricing tiers, 30-day recalibration lock, billing
  - `GrowthPlaybooksHub.tsx` — Marketing, SEO tools, Ad scripts, affiliate dashboard
  - `InteractiveSimulatorSandbox.tsx` — Unified interactive playground
  - `ComplianceSection.tsx`, `LegalModals.tsx` — RGPD, AI Act, C2PA disclosures
- `src/types/index.ts` — Canonical TypeScript data contracts
- `src/data/mockData.ts` — Production demo fixtures and calibrated profiles
- `src/server/`
  - `authRouter.ts` — Authentication & OAuth handlers
  - `cloneRouter.ts` — Human Clone calibration & Tone Radar engine
  - `studioRouter.ts` — Studio Multi-Format generation endpoints
  - `copilotRouter.ts` — 24h Copilot DM engine & intent classifier
  - `schedulerRouter.ts` — Smart Scheduler & Level 2 fallback dispatcher
  - `billingRouter.ts` — Stripe billing & credit ledger
  - `growthRouter.ts` — Growth, SEO tools, Ad playbooks & affiliate tracking
  - `userDb.ts` — Persistent storage layer (.users_db.json)
- `tests/`
  - `testRunner.ts` — Automated test suite execution harness
  - `e2e/` — Opaque-box Tier 1-4 tests and Tier 5 adversarial tests
