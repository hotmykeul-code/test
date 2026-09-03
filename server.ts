import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { handleAuthRoutes } from './src/server/authRouter';
import { cloneRouter } from './src/server/cloneRouter';
import { studioRouter } from './src/server/studioRouter';
import { copilotRouter } from './src/server/copilotRouter';
import { schedulerRouter } from './src/server/schedulerRouter';
import { billingRouter } from './src/server/billingRouter';
import { growthRouter } from './src/server/growthRouter';
import { webhookRouter } from './src/server/webhookRouter';
import { jobQueue } from './src/server/jobQueue';
import { firebaseDb } from './src/server/firebase';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));

  // Modular REST API Routers
  app.use('/api/clone', cloneRouter);
  app.use('/api/studio', studioRouter);
  app.use('/api/copilot', copilotRouter);
  app.use('/api/scheduler', schedulerRouter);
  app.use('/api/billing', billingRouter);
  app.use('/api/growth', growthRouter);
  app.use('/api/webhooks', webhookRouter);

  // Asynchronous Job Queue Endpoints (Polling & Server-Sent Events)
  app.post('/api/jobs/create', async (req, res) => {
    try {
      const { type = 'VIDEO_RENDER', prompt, userId } = req.body;
      const job = await jobQueue.createJob({ type, prompt, userId });
      res.json({ success: true, job });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/jobs/:id', async (req, res) => {
    const job = await jobQueue.getJob(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Tâche introuvable' });
    }
    res.json({ success: true, job });
  });

  app.get('/api/jobs/:id/progress', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const unsubscribe = jobQueue.subscribe(req.params.id, (job) => {
      res.write(`data: ${JSON.stringify(job)}\n\n`);
      if (job.status === 'COMPLETED' || job.status === 'FAILED') {
        res.end();
      }
    });

    req.on('close', () => {
      unsubscribe();
    });
  });

  // Firebase Firestore Service Status
  app.get('/api/firebase/status', (_req, res) => {
    res.json({ success: true, ...firebaseDb.getStatus() });
  });

  // Unified Multi-Provider OAuth (TikTok, Instagram/Meta, Google/YouTube) & Ingestion API Middleware
  app.use((req, res, next) => {
    handleAuthRoutes(req, res, next);
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'SocialClone AI Engine',
      timestamp: new Date().toISOString(),
      modules: {
        clone: 'ACTIVE',
        studio: 'ACTIVE',
        copilot: 'ACTIVE',
        scheduler: 'ACTIVE',
        billing: 'ACTIVE',
        growth: 'ACTIVE',
        webhooks: 'ACTIVE',
        jobQueue: 'ACTIVE',
        firebase: 'ACTIVE',
      },
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SocialClone AI] Server running on http://localhost:${PORT}`);
  });
}

startServer();
