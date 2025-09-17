import { defineConfig } from 'vitest/config';
import type { ViteUserConfig } from 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/** https://vite.dev/config/ */
export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: { watch: { usePolling: true } },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
  },
  build: { copyPublicDir: false, cssMinify: true, ssr: false },
  // define: { 'process.env': process.env },
}) as ViteUserConfig;
