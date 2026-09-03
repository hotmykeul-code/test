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

  // Unified Multi-Provider OAuth (TikTok, Instagram/Meta, Google/YouTube) & Ingestion API Middleware
  app.use((req, res, next) => {
    handleAuthRoutes(req, res, next);
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'SocialClone AI Master Engine',
      version: '3.0.0',
      timestamp: new Date().toISOString(),
      modules: {
        clone: 'ACTIVE',
        studio: 'ACTIVE',
        copilot: 'ACTIVE',
        scheduler: 'ACTIVE',
        billing: 'ACTIVE',
        growth: 'ACTIVE',
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
