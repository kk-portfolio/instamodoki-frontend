import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react()],
  base: './',
});
