import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
export default defineConfig({
  esbuild: {
    // Automatic JSX runtime for the unit project (the Storybook project gets
    // its transform from the react-vite framework itself).
    jsx: 'automatic',
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'happy-dom',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['**/node_modules/**', '**/dist/**'],
          root: '.',
          setupFiles: ['./config/setupTests.ts'],
          globals: true,
          testTimeout: 30000,
          hookTimeout: 30000,
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            // Parity with the retired test-runner's --excludeTags skip-test
            tags: { exclude: ['skip-test'] },
          }),
        ],
        test: {
          name: 'storybook',
          testTimeout: 60_000,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            viewport: { width: 1200, height: 500 },
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
});
