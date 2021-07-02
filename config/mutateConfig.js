const path = require('path');

function mutateConfig(webpackConfig) {
  const entry =
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '../src/entry.js')
      : path.resolve(__dirname, '../src/entry-dev.js');

  const logout = path.resolve(__dirname, '../src/logout.js');

  const notFound = path.resolve(__dirname, '../src/not-found.js');

  const maintenance = path.resolve(__dirname, '../src/maintenance.js');

  /**
   * There is multiple entry points
   */
  webpackConfig.entry = {
    App: entry,
    Logout: logout,
    NotFound: notFound,
    Maintenance: maintenance,
  };

  /**
   * We also require html loader to parse multiple entries
   */
  webpackConfig.module.rules.push({
    test: /app.*\.html$/,
    loader: 'raw',
  });
  return webpackConfig;
}

module.exports = mutateConfig;

/**
 *
 */
