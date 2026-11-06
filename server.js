import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { execSync } from 'child_process';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8080;

const distPath = resolve(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('Building project for production...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (err) {
    console.error('Build failed during startup:', err);
  }
}

// Serve static files from the dist directory
app.use(express.static(distPath));

// Handle SPA routing: serve index.html for any request
app.use((req, res) => {
  res.sendFile(resolve(distPath, 'index.html'));
});

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
