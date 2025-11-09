import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  preview: { port: 4173 },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
});
