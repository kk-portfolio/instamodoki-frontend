import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
});