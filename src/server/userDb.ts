import fs from 'fs';
import path from 'path';

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
  twinProfile?: {
    archetype: string;
    toneRadar: Record<string, number>;
    hooks: string[];
    voiceStemStatus?: string;
  };
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
        const list: RegisteredUser[] = JSON.parse(raw);
        if (Array.isArray(list)) {
          list.forEach((u) => this.users.set(u.id, u));
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
      twinProfile: data.twinProfile || {
        archetype: data.platform === 'INSTAGRAM' ? 'Créateur Autorité' : data.platform === 'GOOGLE' ? 'Expert Pédagogique' : 'Créateur Dynamique',
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
      },
    };

    this.users.set(userId, newUser);
    this.saveToDisk();
    return { user: newUser, isNewUser: true };
  }

  public getUser(userId: string): RegisteredUser | undefined {
    return this.users.get(userId);
  }

  public getAllUsers(): RegisteredUser[] {
    return Array.from(this.users.values());
  }

  public updateUserStatus(userId: string, status: RegisteredUser['status'], twinProfile?: any): RegisteredUser | null {
    const user = this.users.get(userId);
    if (!user) return null;
    user.status = status;
    if (twinProfile) {
      user.twinProfile = { ...user.twinProfile, ...twinProfile };
    }
    this.saveToDisk();
    return user;
  }
}

export const userDb = new UserDatabase();
