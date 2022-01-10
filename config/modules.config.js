const {
  dependencies,
  insights: { appname },
} = require('../package.json');
const { ModuleFederationPlugin } = require('webpack').container;

const modulesPlugin = new ModuleFederationPlugin({
  name: appname,
  filename: `${appname}.[hash].js`,
  library: { type: 'var', name: appname },
  exposes: {
    './RootApp': './src/moduleEntries/AppEntry',
    './RootLogout': './src/moduleEntries/LogoutEntry',
    './RootMaintenance': './src/moduleEntries/MaintenanceEntry',
  },
  shared: [
    { react: { singleton: true, requiredVersion: dependencies.react } },
    {
      'react-dom': {
        singleton: true,
        requiredVersion: dependencies['react-dom'],
      },
    },
    {
      'react-router-dom': {
        requiredVersion: dependencies['react-router-dom'],
      },
    },
    {
      '@patternfly/react-table': {
        requiredVersion: dependencies['@patternfly/react-table'],
      },
    },
    {
      '@patternfly/react-core': {
        requiredVersion: dependencies['@patternfly/react-core'],
      },
    },
    {
      'react-redux': {
        requiredVersion: dependencies['react-redux'],
      },
    },
  ],
});

module.exports = modulesPlugin;
