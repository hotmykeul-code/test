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
}
