const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function mutatePlugins(plugins) {
  /**
   * We need multiple html plugins for mulriple entry points
   */
  const NotFound = new HtmlWebpackPlugin({
    title: 'Page not found - cloud.redhat.com',
    filename: '404.html',
    chunks: ['NotFound', 'vendor'],
    template: path.resolve(__dirname, '../src/not-signed.html'),
  });
  plugins.push(NotFound);

  const Maintenance = new HtmlWebpackPlugin({
    title: 'Maintenance in progress - cloud.redhat.com',
    filename: 'maintenance.html',
    chunks: ['Maintenance', 'vendor'],
    template: path.resolve(__dirname, '../src/not-signed.html'),
  });
  plugins.push(Maintenance);

  const CheckSSO = new HtmlWebpackPlugin({
    title: 'Authenticating - cloud.redhat.com',
    filename: 'silent-check-sso.html',
    chunks: [''],
    template: path.resolve(__dirname, '../src/silent-check-sso.html'),
  });
  plugins.push(CheckSSO);

  return plugins;
}

module.exports = mutatePlugins;
