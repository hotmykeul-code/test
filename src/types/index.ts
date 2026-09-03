export type PlanType = 'FREE' | 'PRO' | 'AGENCY';

export type Archetype = 'Mentor' | 'Vulgarisateur' | 'Rebelle' | 'Leader' | 'Expert' | 'Storyteller';

export interface ToneRadar {
  humour: number;       // 0 - 100
  formalisme: number;   // 0 - 100
  energie: number;      // 0 - 100
  empathie: number;     // 0 - 100
  storytelling: number; // 0 - 100
  technicite: number;   // 0 - 100
  clivage: number;      // 0 - 100
  rythme: number;       // 0 - 100
}

export interface HumanCloneProfile {
  name: string;
  handle: string;
  platform: 'INSTAGRAM' | 'TIKTOK' | 'YOUTUBE' | 'THREADS';
  avatarUrl: string;
  videoLoopUrl: string;
  archetype: Archetype;
  toneRadar: ToneRadar;
  signatureWords: string[];
  forbiddenWords: string[];
  favouriteEmojis: string[];
  voiceSampleUrl?: string;
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  calibrationsRemainingDays: number;
}

export type DmMode = 'AUTO' | 'COPILOT' | 'HYBRID';

export interface DmMessageSimulation {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  within24h: boolean;
  intent: 'PROSPECT_QUALIFIE' | 'QUESTION_TECHNIQUE' | 'COLLABORATION' | 'REMERCIEMENT' | 'RECLAMATION';
  urgency: 'BASSE' | 'MOYENNE' | 'HAUTE';
  suggestedReplies: {
    directe: string;
    pedagogique: string;
    conversion: string;
  };
  autoReplyTriggered?: boolean;
}

export interface CarouselSlide {
  step: 'HOOK' | 'VALEUR' | 'ACTION';
  title: string;
  content: string;
  visualNote: string;
  ctaText?: string;
  headline?: string;
  slideNumber?: number;
}

export interface ScheduledPost {
  id: string;
  platform: 'INSTAGRAM' | 'TIKTOK' | 'YOUTUBE' | 'THREADS' | 'LINKEDIN' | 'X';
  mediaUrl: string;
  caption: string;
  scheduledAt: string;
  status: 'SCHEDULED' | 'PUBLISHED' | 'LEVEL_2_FALLBACK' | 'FAILED' | 'DRAFT';
  resilienceTier: 1 | 2;
  predictedEngagementScore: number;
  bestTimeSlot?: string;
}

export interface BatchIdea {
  id: string;
  angle: string;
  title: string;
  score: number;
  format: string;
  hook: string;
  coreValue?: string;
  ctaAction?: string;
}

export interface AdScriptSection {
  timeframe: string;
  visual: string;
  audioVoice: string;
}

export interface AdScript {
  id: string;
  title: string;
  targetPlatform: string;
  objective: string;
  hookSeconds: string;
  estimatedCpa: string;
  scriptSections: {
    hook: AdScriptSection;
    problem: AdScriptSection;
    solution: AdScriptSection;
    cta: AdScriptSection;
  };
}

export interface EmailFunnelStage {
  stage: string;
  trigger: string;
  subject: string;
  previewText: string;
  objective: string;
  ctaUrl: string;
}

export interface AffiliateDashboardData {
  code: string;
  referralLink: string;
  commissionRate: string;
  bonusOnboarding: string;
  totalClicks: number;
  referralCount: number;
  activeSubscribers: number;
  monthlyRecurringCommissionEur: number;
  totalPaidOutEur: number;
  nextPayoutDate: string;
  payoutThresholdEur: number;
}
