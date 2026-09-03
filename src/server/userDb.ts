import fs from 'fs';
import path from 'path';

export interface ToneRadarData {
  humour: number;
  formalisme: number;
  energie: number;
  empathie: number;
  storytelling: number;
  technicite: number;
  clivage: number;
  rythme: number;
}

export interface ScheduledPostRecord {
  id: string;
  userId: string;
  platform: 'INSTAGRAM' | 'TIKTOK' | 'YOUTUBE' | 'THREADS' | 'LINKEDIN' | 'X';
  mediaUrl: string;
  caption: string;
  scheduledAt: string;
  status: 'SCHEDULED' | 'PUBLISHED' | 'LEVEL_2_FALLBACK' | 'FAILED' | 'DRAFT';
  resilienceTier: 1 | 2;
  predictedEngagementScore: number;
  bestTimeSlot?: string;
  createdAt: string;
}

export interface CreditTransaction {
  id: string;
  timestamp: string;
  amount: number;
  type: 'ONBOARDING_BONUS' | 'GENERATION_DEBIT' | 'PACK_PURCHASE' | 'PLAN_RENEWAL' | 'AFFILIATE_PAYOUT';
  description: string;
  balanceAfter: number;
}

export interface RegisteredUser {
  id: string;
  handle: string;
  displayName: string;
  email?: string;
  avatarUrl: string;
  platform: 'INSTAGRAM' | 'GOOGLE' | 'TIKTOK';
  providerId: string;
  createdAt: string;
  lastLoginAt: string;
  loginCount: number;
  isFirstConnection: boolean;
  status: 'ACTIVE' | 'PENDING_CALIBRATION' | 'CALIBRATED';
  plan: 'FREE' | 'PRO' | 'AGENCY';
  credits: number;
  onboardingBonusClaimed: boolean;
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  calibrationsRemainingDays: number;
  twinProfile?: {
    name?: string;
    archetype: string;
    toneRadar: ToneRadarData;
    hooks: string[];
    signatureWords?: string[];
    forbiddenWords?: string[];
    favouriteEmojis?: string[];
    voiceStemStatus?: string;
    avatarVideoUrl?: string;
  };
  dmSettings: {
    masterActive: boolean;
    emergencyPause: boolean;
    mode: 'AUTO' | 'COPILOT' | 'HYBRID';
    triggerKeywords: string[];
  };
  affiliate: {
    code: string;
    referralCount: number;
    activeSubscribers: number;
    earningsEur: number;
    referredBy?: string;
  };
  scheduledPosts: ScheduledPostRecord[];
  creditLedger: CreditTransaction[];
}

// In-memory + file-backed persistent store
const DB_FILE_PATH = path.join(process.cwd(), '.users_db.json');

class UserDatabase {
  private users: Map<string, RegisteredUser> = new Map();

  constructor() {
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const list: any[] = JSON.parse(raw);
        if (Array.isArray(list)) {
          list.forEach((u) => {
            const sanitized = this.hydrateUserDefaults(u);
            this.users.set(sanitized.id, sanitized);
          });
        }
      }
    } catch (err) {
      console.warn('Could not load user DB from disk, starting fresh:', err);
    }
  }

  private saveToDisk() {
    try {
      const list = Array.from(this.users.values());
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
    } catch (err) {
      console.warn('Could not persist user DB to disk:', err);
    }
  }

  private hydrateUserDefaults(u: Partial<RegisteredUser>): RegisteredUser {
    const now = new Date();
    const lastCalib = u.lastCalibrationDate || new Date(now.getTime() - 15 * 86400000).toISOString();
    const lastCalibTime = new Date(lastCalib).getTime();
    const nextCalibTime = lastCalibTime + 30 * 86400000;
    const remainingDays = Math.max(0, Math.ceil((nextCalibTime - now.getTime()) / 86400000));

    return {
      id: u.id || `user_${Date.now()}`,
      handle: u.handle || '@creator',
      displayName: u.displayName || 'Créateur',
      email: u.email || 'creator@socialclone.ai',
      avatarUrl: u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      platform: u.platform || 'INSTAGRAM',
      providerId: u.providerId || `prov_${Date.now()}`,
      createdAt: u.createdAt || now.toISOString(),
      lastLoginAt: u.lastLoginAt || now.toISOString(),
      loginCount: u.loginCount || 1,
      isFirstConnection: u.isFirstConnection !== undefined ? u.isFirstConnection : false,
      status: u.status || 'ACTIVE',
      plan: u.plan || 'FREE',
      credits: typeof u.credits === 'number' ? u.credits : 10,
      onboardingBonusClaimed: Boolean(u.onboardingBonusClaimed),
      lastCalibrationDate: lastCalib,
      nextCalibrationDate: u.nextCalibrationDate || new Date(nextCalibTime).toISOString(),
      calibrationsRemainingDays: remainingDays,
      twinProfile: u.twinProfile || {
        archetype: 'Mentor',
        toneRadar: {
          humour: 55,
          formalisme: 25,
          energie: 88,
          empathie: 85,
          storytelling: 88,
          technicite: 70,
          clivage: 45,
          rythme: 90,
        },
        hooks: [
          '« Attends 2 secondes avant de scroller... »',
          '« Voici l\'erreur que 99% des créateurs font : »',
          '« La méthode exacte pour doubler ton engagement : »',
        ],
        signatureWords: ['Franchement', 'Sans détour', 'Déclic', 'Action concrète'],
        forbiddenWords: ['Jargon', 'Peut-être', 'Supercharge'],
        favouriteEmojis: ['🔥', '💡', '🎯', '⚡', '👇'],
      },
      dmSettings: u.dmSettings || {
        masterActive: true,
        emergencyPause: false,
        mode: 'HYBRID',
        triggerKeywords: ['GUIDE', 'PRIX', 'PROMO', 'LIEN', 'CLONE'],
      },
      affiliate: u.affiliate || {
        code: `CLONE-${(u.handle || 'CREATOR').replace('@', '').toUpperCase().slice(0, 8)}-30`,
        referralCount: 14,
        activeSubscribers: 9,
        earningsEur: 24.30,
      },
      scheduledPosts: Array.isArray(u.scheduledPosts) ? u.scheduledPosts : [],
      creditLedger: Array.isArray(u.creditLedger) ? u.creditLedger : [
        {
          id: `tx_init_${Date.now()}`,
          timestamp: now.toISOString(),
          amount: typeof u.credits === 'number' ? u.credits : 10,
          type: 'PLAN_RENEWAL',
          description: 'Solde initial d\'essai découverte',
          balanceAfter: typeof u.credits === 'number' ? u.credits : 10,
        },
      ],
    };
  }

  public registerOrLogin(data: {
    handle: string;
    displayName?: string;
    email?: string;
    avatarUrl?: string;
    platform: 'INSTAGRAM' | 'GOOGLE' | 'TIKTOK';
    providerId?: string;
    twinProfile?: any;
  }): { user: RegisteredUser; isNewUser: boolean } {
    const cleanHandle = data.handle.trim().replace(/^@+/, '');
    const userId = `${data.platform.toLowerCase()}_${cleanHandle.toLowerCase()}`;
    const now = new Date().toISOString();

    const existing = this.users.get(userId);

    if (existing) {
      existing.lastLoginAt = now;
      existing.loginCount += 1;
      existing.isFirstConnection = false;
      if (data.displayName) existing.displayName = data.displayName;
      if (data.avatarUrl) existing.avatarUrl = data.avatarUrl;
      if (data.email) existing.email = data.email;
      if (data.twinProfile) existing.twinProfile = { ...existing.twinProfile, ...data.twinProfile };
      this.saveToDisk();
      return { user: existing, isNewUser: false };
    }

    const initialCredits = 10;
    const nowTime = Date.now();
    const lastCalib = new Date(nowTime - 15 * 86400000).toISOString();
    const nextCalib = new Date(nowTime + 15 * 86400000).toISOString();

    const newUser: RegisteredUser = {
      id: userId,
      handle: `@${cleanHandle}`,
      displayName: data.displayName || cleanHandle,
      email: data.email || `${cleanHandle}@${data.platform.toLowerCase()}.auth`,
      avatarUrl:
        data.avatarUrl ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(data.displayName || cleanHandle)}&background=${
          data.platform === 'INSTAGRAM' ? 'ec4899' : data.platform === 'GOOGLE' ? 'f59e0b' : '00f2fe'
        }&color=fff&bold=true`,
      platform: data.platform,
      providerId: data.providerId || `${data.platform}_${Date.now()}`,
      createdAt: now,
      lastLoginAt: now,
      loginCount: 1,
      isFirstConnection: true,
      status: 'ACTIVE',
      plan: 'FREE',
      credits: initialCredits,
      onboardingBonusClaimed: false,
      lastCalibrationDate: lastCalib,
      nextCalibrationDate: nextCalib,
      calibrationsRemainingDays: 15,
      twinProfile: data.twinProfile || {
        archetype: data.platform === 'INSTAGRAM' ? 'Mentor' : data.platform === 'GOOGLE' ? 'Vulgarisateur' : 'Rebelle',
        toneRadar: {
          humour: 60,
          formalisme: 30,
          energie: 85,
          empathie: 80,
          storytelling: 85,
          technicite: 70,
          clivage: 45,
          rythme: 90,
        },
        hooks: [
          '« Attends 2 secondes avant de scroller... »',
          '« Voici l\'erreur que 99% des créateurs font : »',
          '« La méthode exacte pour doubler ton engagement : »',
        ],
        signatureWords: ['Franchement', 'Sans détour', 'Déclic', 'Action concrète'],
        forbiddenWords: ['Jargon', 'Peut-être', 'Supercharge'],
        favouriteEmojis: ['🔥', '💡', '🎯', '⚡', '👇'],
      },
      dmSettings: {
        masterActive: true,
        emergencyPause: false,
        mode: 'HYBRID',
        triggerKeywords: ['GUIDE', 'PRIX', 'PROMO', 'LIEN', 'CLONE'],
      },
      affiliate: {
        code: `CLONE-${cleanHandle.toUpperCase().slice(0, 8)}-30`,
        referralCount: 0,
        activeSubscribers: 0,
        earningsEur: 0,
      },
      scheduledPosts: [],
      creditLedger: [
        {
          id: `tx_welcome_${nowTime}`,
          timestamp: now,
          amount: initialCredits,
          type: 'PLAN_RENEWAL',
          description: 'Solde de bienvenue essai découverte',
          balanceAfter: initialCredits,
        },
      ],
    };

    this.users.set(userId, newUser);
    this.saveToDisk();
    return { user: newUser, isNewUser: true };
  }

  public getUser(userId?: string): RegisteredUser | undefined {
    if (!userId) {
      // return first user or default creator
      const first = Array.from(this.users.values())[0];
      if (first) return first;
      // seed a demo user if completely empty
      const demo = this.registerOrLogin({
        handle: 'alex.growth',
        displayName: 'Alex V.',
        email: 'alex@socialclone.ai',
        platform: 'INSTAGRAM',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      });
      return demo.user;
    }
    return this.users.get(userId);
  }

  public getAllUsers(): RegisteredUser[] {
    if (this.users.size === 0) {
      this.getUser(); // seed default
    }
    return Array.from(this.users.values());
  }

  public updateUserStatus(userId: string, status: RegisteredUser['status'], twinProfile?: any): RegisteredUser | null {
    const user = this.getUser(userId);
    if (!user) return null;
    user.status = status;
    if (twinProfile) {
      user.twinProfile = { ...user.twinProfile, ...twinProfile };
    }
    this.saveToDisk();
    return user;
  }

  public addCreditsAtomically(userId: string, amount: number, type: CreditTransaction['type'], description: string): { success: boolean; newBalance: number; transaction?: CreditTransaction } {
    const user = this.getUser(userId);
    if (!user) return { success: false, newBalance: 0 };

    user.credits += amount;
    const tx: CreditTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      amount,
      type,
      description,
      balanceAfter: user.credits,
    };
    user.creditLedger.unshift(tx);
    this.saveToDisk();
    return { success: true, newBalance: user.credits, transaction: tx };
  }

  public deductCreditsAtomically(userId: string, amount: number, description: string): { success: boolean; newBalance: number; error?: string } {
    const user = this.getUser(userId);
    if (!user) return { success: false, newBalance: 0, error: 'UTILISATEUR_INTROUVABLE' };
    if (user.credits < amount) {
      return { success: false, newBalance: user.credits, error: 'CREDITS_INSUFFISANTS' };
    }

    user.credits -= amount;
    const tx: CreditTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      amount: -amount,
      type: 'GENERATION_DEBIT',
      description,
      balanceAfter: user.credits,
    };
    user.creditLedger.unshift(tx);
    this.saveToDisk();
    return { success: true, newBalance: user.credits };
  }

  public claimOnboardingBonus(userId: string): { success: boolean; newBalance: number; bonusAwarded: number; message: string } {
    const user = this.getUser(userId);
    if (!user) return { success: false, newBalance: 0, bonusAwarded: 0, message: 'Utilisateur introuvable' };

    if (user.onboardingBonusClaimed) {
      return { success: true, newBalance: user.credits, bonusAwarded: 0, message: 'Bonus d\'onboarding (+50 crédits) déjà réclamé.' };
    }

    user.onboardingBonusClaimed = true;
    const bonus = 50;
    const result = this.addCreditsAtomically(
      user.id,
      bonus,
      'ONBOARDING_BONUS',
      '🎁 Bonus viral Onboarding : Première vidéo clone publiée (+50 crédits offerts)'
    );

    return {
      success: true,
      newBalance: result.newBalance,
      bonusAwarded: bonus,
      message: '🎁 +50 crédits vidéo offerts ajoutés instantanément à votre compte !',
    };
  }

  public checkRecalibrationLock(userId: string): { locked: boolean; daysRemaining: number; nextAllowedDate: string; lastCalibrationDate: string } {
    const user = this.getUser(userId);
    const now = Date.now();
    const lastCalibTime = user?.lastCalibrationDate ? new Date(user.lastCalibrationDate).getTime() : now - 40 * 86400000;
    const nextAllowedTime = lastCalibTime + 30 * 86400000;
    const remainingMs = nextAllowedTime - now;

    if (remainingMs > 0) {
      const days = Math.ceil(remainingMs / 86400000);
      return {
        locked: true,
        daysRemaining: days,
        nextAllowedDate: new Date(nextAllowedTime).toISOString(),
        lastCalibrationDate: new Date(lastCalibTime).toISOString(),
      };
    }

    return {
      locked: false,
      daysRemaining: 0,
      nextAllowedDate: new Date().toISOString(),
      lastCalibrationDate: new Date(lastCalibTime).toISOString(),
    };
  }

  public recalibrateClone(userId: string, newProfileData: any, forceOverride = false): { success: boolean; user?: RegisteredUser; error?: string; lockDetails?: any } {
    const user = this.getUser(userId);
    if (!user) return { success: false, error: 'UTILISATEUR_INTROUVABLE' };

    const lockStatus = this.checkRecalibrationLock(user.id);
    if (lockStatus.locked && !forceOverride) {
      return {
        success: false,
        error: 'RECALIBRATION_LOCKED',
        lockDetails: lockStatus,
      };
    }

    const now = new Date();
    const nextCalib = new Date(now.getTime() + 30 * 86400000);

    user.lastCalibrationDate = now.toISOString();
    user.nextCalibrationDate = nextCalib.toISOString();
    user.calibrationsRemainingDays = 30;
    user.status = 'CALIBRATED';

    user.twinProfile = {
      ...user.twinProfile,
      ...newProfileData,
    };

    this.saveToDisk();
    return { success: true, user };
  }

  public addScheduledPost(userId: string, post: Omit<ScheduledPostRecord, 'id' | 'userId' | 'createdAt'>): ScheduledPostRecord {
    const user = this.getUser(userId) || this.getUser();
    const newPost: ScheduledPostRecord = {
      ...post,
      id: `post_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      userId: user!.id,
      createdAt: new Date().toISOString(),
    };
    user!.scheduledPosts.unshift(newPost);
    this.saveToDisk();
    return newPost;
  }

  public getScheduledPosts(userId: string): ScheduledPostRecord[] {
    const user = this.getUser(userId) || this.getUser();
    return user ? user.scheduledPosts : [];
  }

  public updateScheduledPost(userId: string, postId: string, updates: Partial<ScheduledPostRecord>): ScheduledPostRecord | null {
    const user = this.getUser(userId) || this.getUser();
    if (!user) return null;
    const idx = user.scheduledPosts.findIndex((p) => p.id === postId);
    if (idx === -1) return null;
    user.scheduledPosts[idx] = { ...user.scheduledPosts[idx], ...updates };
    this.saveToDisk();
    return user.scheduledPosts[idx];
  }

  public deleteScheduledPost(userId: string, postId: string): boolean {
    const user = this.getUser(userId) || this.getUser();
    if (!user) return false;
    const initLen = user.scheduledPosts.length;
    user.scheduledPosts = user.scheduledPosts.filter((p) => p.id !== postId);
    const changed = user.scheduledPosts.length !== initLen;
    if (changed) this.saveToDisk();
    return changed;
  }

  public updateDmSettings(userId: string, settings: Partial<RegisteredUser['dmSettings']>): RegisteredUser['dmSettings'] {
    const user = this.getUser(userId) || this.getUser();
    if (!user) {
      return { masterActive: true, emergencyPause: false, mode: 'HYBRID', triggerKeywords: ['GUIDE', 'PRIX'] };
    }
    user.dmSettings = { ...user.dmSettings, ...settings };
    this.saveToDisk();
    return user.dmSettings;
  }

  public updatePlan(userId: string, plan: 'FREE' | 'PRO' | 'AGENCY'): RegisteredUser | null {
    const user = this.getUser(userId) || this.getUser();
    if (!user) return null;
    user.plan = plan;
    if (plan === 'PRO') {
      this.addCreditsAtomically(user.id, 100, 'PLAN_RENEWAL', 'Attribution forfait Pro (100 crédits mensuels)');
    } else if (plan === 'AGENCY') {
      this.addCreditsAtomically(user.id, 500, 'PLAN_RENEWAL', 'Attribution forfait Agence (500 crédits mensuels)');
    }
    this.saveToDisk();
    return user;
  }
}

export const userDb = new UserDatabase();
