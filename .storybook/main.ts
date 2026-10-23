import path from 'path';
import { fileURLToPath } from 'node:url';
import { createMainConfig } from '@redhat-cloud-services/hcc-storybook-hub/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = createMainConfig({
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  msw: true,
  a11y: false,
  extraAliases: {
    '@redhat-cloud-services/chrome': path.resolve(dirname, 'mocks/chrome.ts'),
    '@scalprum/react-core': path.resolve(dirname, 'mocks/scalprum.tsx'),
  },
});

// The fec utilities mixins (frontend-components-utilities/styles/_mixins)
// use Sass global built-ins (round(), unit(), type-of()) that Dart Sass
// deprecates. That's library-internal — silence those IDs, keep ours loud.
const originalViteFinal = config.viteFinal;
config.viteFinal = async (
  viteConfig: Parameters<NonNullable<typeof originalViteFinal>>[0],
) => {
  const result = await originalViteFinal?.(viteConfig);
  if (result) {
    result.css = result.css ?? {};
    result.css.preprocessorOptions = {
      ...(result.css.preprocessorOptions ?? {}),
      scss: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...((result.css.preprocessorOptions as any)?.scss ?? {}),
        silenceDeprecations: ['global-builtin', 'import'],
      },
    };
  }
  return result;
};

export default config;
