/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  appUrl: [/^\/$/],
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  hotReload: true,
  plugins: [],
  moduleFederation: {
    exposes: {
      './RootApp': path.resolve(__dirname, './src/moduleEntries/AppEntry.tsx'),
    },
    exclude: ['react-router-dom'],
    shared: [{ 'react-router-dom': { singleton: true, version: '*' } }],
  },
};
