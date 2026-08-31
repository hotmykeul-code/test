import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { handleAuthRoutes } from './src/server/authRouter';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Unified Multi-Provider OAuth (TikTok, Instagram/Meta, Google/YouTube) & Ingestion API Middleware
  app.use((req, res, next) => {
    handleAuthRoutes(req, res, next);
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

