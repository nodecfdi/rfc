import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      all: true,
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
    },
    environmentMatchGlobs: [['**/*.browser.test.ts', 'jsdom']],
    alias: {
      '#src': fileURLToPath(new URL('src', import.meta.url)),
      '#tests': fileURLToPath(new URL('tests', import.meta.url)),
    },
  },
});
