import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Generates physical index.html copies for /dhanteras and /diwali
// ensuring static hosts that lack rewrite rules can still serve clean paths.
function staticRoutesPlugin(): Plugin {
  return {
    name: 'static-routes-generator',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtmlPath)) {
        const routes = ['dhanteras', 'diwali'];
        for (const route of routes) {
          const targetDir = path.join(distDir, route);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          fs.copyFileSync(indexHtmlPath, path.join(targetDir, 'index.html'));
        }
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), staticRoutesPlugin()],
  server: {
    port: 3000,
    open: false
  }
});
