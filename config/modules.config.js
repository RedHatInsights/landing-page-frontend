const { dependencies, insights: { appname }} = require('../package.json');
const { ModuleFederationPlugin } = require('webpack').container;

const modulesPlugin = new ModuleFederationPlugin({
    name: appname,
    filename: `${appname}.js`,
    library: { type: 'var', name: appname },
    exposes: {
        './RootApp': './src/moduleEntries/AppEntry',
        './RootLogout': './src/moduleEntries/LogoutEntry',
        './RootMaintenance': './src/moduleEntries/MaintenanceEntry'
    },
    shared: [
        { react: { singleton: true, requiredVersion: dependencies.react }},
        { 'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] }},
        { 'react-router-dom': { singleton: true, requiredVersion: dependencies['react-router-dom'] }},
        { '@patternfly/react-table': { singleton: true, requiredVersion: dependencies['@patternfly/react-table'] }},
        { '@patternfly/react-core': { singleton: true, requiredVersion: dependencies['@patternfly/react-core'] }},
        { 'react-redux': { singleton: true, requiredVersion: dependencies['react-redux'] }}
    ]
});

module.exports = modulesPlugin;
