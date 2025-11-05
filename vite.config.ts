import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist/react',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        // Exclude Node.js built-in modules
        'fs',
        'path',
        'crypto',
        'util',
        'stream',
        'events',
        // Exclude Node.js-only dependencies
        'better-sqlite3',
        'pdf-parse',
        'tesseract.js',
      ],
    },
  },
  optimizeDeps: {
    exclude: [
      'better-sqlite3',
      'pdf-parse',
      'tesseract.js',
    ],
  },
});
