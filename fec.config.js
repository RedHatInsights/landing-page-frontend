const path = require('path');

module.exports = {
  appUrl: [/^\/$/],
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  _unstableHotReload: true,
  plugins: [],
  // localChrome: '/home/zsleiman/development/insights-chrome/build',
  moduleFederation: {
    exposes: {
      './RootApp': path.resolve(__dirname, './src/moduleEntries/AppEntry.js'),
    },
    exclude: ['react-router-dom'],
    shared: [{ 'react-router-dom': { singleton: true } }],
  },
};
