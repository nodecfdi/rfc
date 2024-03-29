/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'rfc',
      fileName: 'rfc',
    },
    rollupOptions: {
      external: ['luxon'],
      output: {
        globals: {
          luxon: 'luxon',
        },
      },
    },
  },
  plugins: [dts({ rollupTypes: true })],
  test: {
    globals: true,
    coverage: {
      all: true,
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
    },
    environmentMatchGlobs: [['**/*.browser.test.ts', 'jsdom']],
  },
});
