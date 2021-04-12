const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const mutateConfig = require('./mutateConfig');
const mutatePlugins = require('./mutatePlugins');
const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  skipChrome2: true,
  /**
   * We need to override the index template to only include APP and vendors chunk
   * Otherwise we may have multiple ReactDOM.render calls in one template
   */
  htmlPlugin: {
    title: 'Home - cloud.redhat.com',
    filename: 'index.html',
    chunks: ['App', 'vendor'],
    template: resolve(__dirname, '../src/index.html'),
  },
});

plugins.push(require('./modules.config'));

module.exports = {
  ...mutateConfig(webpackConfig),
  plugins: mutatePlugins(plugins),
};
