import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: { port: 4173 },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://server:3000', // Docker service name, accessible from client container
        changeOrigin: true,
      },
    },
  },
});
