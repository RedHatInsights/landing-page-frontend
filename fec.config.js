/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  appUrl: [/^\/$/],
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  hotReload: true,
  plugins: [],
  chromeHost: process.env.FEC_CHROME_HOST ?? undefined,
  chromePort: process.env.FEC_CHROME_PORT ?? undefined,
  frontendCRDPath: path.resolve(__dirname, './frontend.yml'),
  publicPath: 'auto',
  routes: {
    ...(process.env.LOCAL_PDF && {
      '/api/crc-pdf-generator': {
        host: 'http://localhost:8000',
      },
    }),
    ...(process.env.CONFIG_PORT && {
      '/api/chrome-service/v1/static': {
        host: `http://localhost:${process.env.CONFIG_PORT}`,
      },
      '/api/chrome-service/v1/dashboard-templates': {
        host: `http://localhost:${process.env.CONFIG_PORT}`,
      },
    }),
    ...(process.env.LOCAL_WIDGET_LAYOUT && {
      '/apps/widget-layout': {
        host: `http://localhost:8003`,
      },
      '/beta/apps/widget-layout': {
        host: `http://localhost:8003`,
      },
    }),
  },
  moduleFederation: {
    exposes: {
      './RootApp': path.resolve(__dirname, './src/moduleEntries/AppEntry.tsx'),
      './PdfEntry': path.resolve(__dirname, './src/moduleEntries/PdfEntry.tsx'),
      './RecentlyVisited': path.resolve(
        __dirname,
        'src/widgets/recently-visited/index.tsx',
      ),
      './ExploreCapabilities': path.resolve(
        __dirname,
        'src/widgets/explore-capabilities/index.tsx',
      ),
      './EdgeWidget': path.resolve(__dirname, 'src/widgets/edge/index.tsx'),
      './ImageBuilderWidget': path.resolve(
        __dirname,
        'src/widgets/image-builder/index.tsx',
      ),
      './RhelWidget': path.resolve(__dirname, 'src/widgets/rhel/index.tsx'),
      './AnsibleWidget': path.resolve(
        __dirname,
        'src/widgets/ansible/index.tsx',
      ),
      './OpenShiftWidget': path.resolve(
        __dirname,
        'src/widgets/openshift/index.tsx',
      ),
      './OpenShiftAiWidget': path.resolve(
        __dirname,
        'src/widgets/openshift-ai/index.tsx',
      ),
      './QuayWidget': path.resolve(__dirname, 'src/widgets/quay/index.tsx'),
      './AcsWidget': path.resolve(__dirname, 'src/widgets/acs/index.tsx'),
      './SupportCaseWidget': path.resolve(
        __dirname,
        'src/widgets/support-case/index.tsx',
      ),
    },
    exclude: ['react-router-dom'],
    shared: [
      { 'react-router-dom': { singleton: true, version: '*' } },
      { '@scalprum/react-core': { singleton: true, version: '*' } },
    ],
  },
};
