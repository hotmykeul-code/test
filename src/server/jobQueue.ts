import { firebaseDb, FirestoreJob } from './firebase';

type JobListener = (job: FirestoreJob) => void;

class AsyncJobQueue {
  private listeners: Map<string, Set<JobListener>> = new Map();

  public async createJob(params: {
    userId?: string;
    type: 'VIDEO_RENDER' | 'VOICE_CLONE' | 'TREND_REMIX' | 'CAROUSEL_GEN';
    prompt?: string;
  }): Promise<FirestoreJob> {
    const jobId = 'job_' + Math.random().toString(36).substring(2, 12);
    const newJob: FirestoreJob = {
      id: jobId,
      userId: params.userId || 'usr_anonymous',
      type: params.type,
      status: 'QUEUED',
      progress: 0,
      prompt: params.prompt,
      createdAt: new Date().toISOString(),
    };

    await firebaseDb.setDoc('jobs', jobId, newJob);
    this.processJobInBackground(jobId);
    return newJob;
  }

  public async getJob(jobId: string): Promise<FirestoreJob | null> {
    return await firebaseDb.getDoc<FirestoreJob>('jobs', jobId);
  }

  public subscribe(jobId: string, listener: JobListener): () => void {
    if (!this.listeners.has(jobId)) {
      this.listeners.set(jobId, new Set());
    }
    this.listeners.get(jobId)!.add(listener);

    return () => {
      const set = this.listeners.get(jobId);
      if (set) {
        set.delete(listener);
        if (set.size === 0) this.listeners.delete(jobId);
      }
    };
  }

  private notify(job: FirestoreJob) {
    const set = this.listeners.get(job.id);
    if (set) {
      set.forEach((listener) => {
        try {
          listener(job);
        } catch (e) {}
      });
    }
  }

  private async processJobInBackground(jobId: string) {
    // Simulates realistic progressive rendering stages
    const steps = [
      { progress: 15, status: 'PROCESSING' as const, delay: 600 },
      { progress: 40, status: 'PROCESSING' as const, delay: 1000 },
      { progress: 75, status: 'PROCESSING' as const, delay: 1200 },
      { progress: 100, status: 'COMPLETED' as const, delay: 800 },
    ];

    let currentJob = await this.getJob(jobId);
    if (!currentJob) return;

    for (const step of steps) {
      await new Promise((res) => setTimeout(res, step.delay));
      
      const updateData: Partial<FirestoreJob> = {
        progress: step.progress,
        status: step.status,
      };

      if (step.status === 'COMPLETED') {
        updateData.completedAt = new Date().toISOString();
        if (currentJob.type === 'VIDEO_RENDER' || currentJob.type === 'TREND_REMIX') {
          updateData.videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-vertical-video-of-a-woman-talking-to-the-camera-42862-large.mp4';
        } else if (currentJob.type === 'VOICE_CLONE') {
          updateData.audioUrl = 'https://actions.google.com/sounds/v1/speech/greeting.ogg';
        }
      }

      await firebaseDb.updateDoc('jobs', jobId, updateData);
      currentJob = await this.getJob(jobId);
      if (currentJob) {
        this.notify(currentJob);
      }
    }
  }
}

export const jobQueue = new AsyncJobQueue();
