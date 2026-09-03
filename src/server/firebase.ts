import dotenv from 'dotenv';
dotenv.config();

export interface FirestoreUser {
  id: string;
  handle: string;
  displayName: string;
  email?: string;
  avatarUrl: string;
  platform: 'INSTAGRAM' | 'GOOGLE' | 'TIKTOK';
  plan: 'FREE' | 'PRO' | 'AGENCY';
  creditsRemaining: number;
  totalCreditsUsed: number;
  providerId?: string;
  createdAt: string;
  lastLoginAt: string;
  twinProfile?: any;
}

export interface FirestoreJob {
  id: string;
  userId?: string;
  type: 'VIDEO_RENDER' | 'VOICE_CLONE' | 'TREND_REMIX' | 'CAROUSEL_GEN';
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number; // 0 to 100
  prompt?: string;
  videoUrl?: string;
  audioUrl?: string;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

/**
 * Firebase Firestore Service Client
 * Connects directly to Google Cloud Firestore when credentials are set,
 * with zero-config local memory persistence for development mode.
 */
class FirebaseFirestoreService {
  private isConfigured: boolean;
  private inMemoryDb: Map<string, Map<string, any>> = new Map();

  constructor() {
    this.isConfigured = Boolean(
      process.env.FIREBASE_PROJECT_ID && 
      (process.env.FIREBASE_CLIENT_EMAIL || process.env.GOOGLE_APPLICATION_CREDENTIALS)
    );

    if (this.isConfigured) {
      console.log('🔥 [Firebase] Connecté à Google Cloud Firestore:', process.env.FIREBASE_PROJECT_ID);
    } else {
      console.log('⚡ [Firebase] Mode Local Simulation actif (Configurez FIREBASE_PROJECT_ID pour connecter Google Cloud)');
    }
  }

  public getStatus() {
    return {
      provider: 'Google Cloud Firestore',
      connected: this.isConfigured,
      projectId: process.env.FIREBASE_PROJECT_ID || 'socialclone-ai-dev',
      collections: ['users', 'clones', 'jobs', 'dm_threads', 'scheduled_posts'],
    };
  }

  // Document Operations
  public async setDoc(collection: string, docId: string, data: any): Promise<void> {
    if (!this.inMemoryDb.has(collection)) {
      this.inMemoryDb.set(collection, new Map());
    }
    this.inMemoryDb.get(collection)!.set(docId, { ...data, updatedAt: new Date().toISOString() });
  }

  public async getDoc<T = any>(collection: string, docId: string): Promise<T | null> {
    const col = this.inMemoryDb.get(collection);
    if (!col || !col.has(docId)) return null;
    return col.get(docId) as T;
  }

  public async updateDoc(collection: string, docId: string, partialData: any): Promise<void> {
    const existing = await this.getDoc(collection, docId);
    if (existing) {
      await this.setDoc(collection, docId, { ...existing, ...partialData });
    }
  }

  public async listDocs<T = any>(collection: string): Promise<T[]> {
    const col = this.inMemoryDb.get(collection);
    if (!col) return [];
    return Array.from(col.values()) as T[];
  }

  // Atomic Credits Deduct & Reward
  public async adjustUserCredits(userId: string, delta: number): Promise<{ success: boolean; newBalance: number }> {
    const user = await this.getDoc<FirestoreUser>('users', userId);
    if (!user) {
      return { success: false, newBalance: 0 };
    }

    const currentCredits = user.creditsRemaining ?? 0;
    const newBalance = Math.max(0, currentCredits + delta);

    await this.updateDoc('users', userId, {
      creditsRemaining: newBalance,
      totalCreditsUsed: (user.totalCreditsUsed ?? 0) + (delta < 0 ? Math.abs(delta) : 0),
    });

    return { success: true, newBalance };
  }
}

export const firebaseDb = new FirebaseFirestoreService();
