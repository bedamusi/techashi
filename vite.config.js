import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'node:child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localPhpApi = {
  name: 'techashi-local-php-api',
  configureServer(server) {
    const php = spawn(process.env.PHP_BINARY || 'php.exe', ['-S', '127.0.0.1:8081', '-t', '.'], {
      cwd: __dirname,
      stdio: 'inherit',
      windowsHide: true,
    });
    php.on('error', () => {
      console.error('[techashi] PHP API could not start. Install PHP or set PHP_BINARY, then restart Vite.');
    });
    php.on('exit', (code) => {
      if (code && code !== 0) console.error(`[techashi] PHP API exited with code ${code}.`);
    });
    server.httpServer?.once('close', () => { if (!php.killed) php.kill(); });
    console.info('[techashi] Starting local PHP API at http://127.0.0.1:8081');
  },
};

export default defineConfig({
  plugins: [react(), localPhpApi],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': { target: 'http://127.0.0.1:8081', changeOrigin: false },
    },
  },
});
