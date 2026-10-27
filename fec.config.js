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
        'src/widgets/RecentlyVisited.tsx',
      ),
      './ExploreCapabilities': path.resolve(
        __dirname,
        'src/widgets/ExploreCapabilities.tsx',
      ),
      './EdgeWidget': path.resolve(__dirname, 'src/widgets/EdgeWidget.tsx'),
      './ImageBuilderWidget': path.resolve(
        __dirname,
        'src/widgets/ImageBuilderWidget.tsx',
      ),
      './RhelWidget': path.resolve(__dirname, 'src/widgets/RhelWidget.tsx'),
      './AnsibleWidget': path.resolve(
        __dirname,
        'src/widgets/AnsibleWidget.tsx',
      ),
      './OpenShiftWidget': path.resolve(
        __dirname,
        'src/widgets/OpenShiftWidget.tsx',
      ),
      './OpenShiftAiWidget': path.resolve(
        __dirname,
        'src/widgets/OpenShiftAiWidget.tsx',
      ),
      './QuayWidget': path.resolve(__dirname, 'src/widgets/QuayWidget.tsx'),
      './AcsWidget': path.resolve(__dirname, 'src/widgets/AcsWidget.tsx'),
      './SupportCaseWidget': path.resolve(
        __dirname,
        'src/widgets/SupportCaseWidget.tsx',
      ),
    },
    exclude: ['react-router-dom'],
    shared: [
      { 'react-router-dom': { singleton: true, version: '*' } },
      { '@scalprum/react-core': { singleton: true, version: '*' } },
    ],
  },
};
