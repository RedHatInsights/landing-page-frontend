/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  appUrl: [/^\/$/],
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  hotReload: true,
  plugins: [],
  routes: {
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
    },
    exclude: ['react-router-dom'],
    shared: [
      { 'react-router-dom': { singleton: true, version: '*' } },
      { frontendStarterApp: { singleton: true, version: '*' } },
      { '@scalprum/react-core': { singleton: true, version: '*' } },
      { '@patternfly/react-core': { singleton: true, version: '*' } },
      { 'react-redux': { singleton: true, version: '*' } },
    ],
  },
};
