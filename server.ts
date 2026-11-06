import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Read index.html
      let template = fs.readFileSync(
        resolve(__dirname, 'index.html'),
        'utf-8',
      );

      // Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template);

      // Send the transformed index.html
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(3000, '0.0.0.0', () => {
    console.log('Server running at http://0.0.0.0:3000');
  });
}

createServer();
