import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      '@app': resolve(__dirname, 'src'),
      '#types': resolve(__dirname, 'src/shared/types'),
    },
    globals: true,
    environment: 'happy-dom',
    coverage: {
      clean: true,
      all: true,
      include: ['src'],
      exclude: ['src/**/*.{test,spec}.{ts,js,tsx,jsx}', 'src/**/index.{ts,js}'],
    },
    include: ['src/**/*.{test,spec}.{ts,js,tsx,jsx}'],
  },
});
